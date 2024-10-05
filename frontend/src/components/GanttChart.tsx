import { useEffect, useRef } from "react";
import { Id } from "vis-data/declarations/data-interface";
import { DataSet, Timeline } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.min.css";
import { GanttItems } from "../scripts/solutionParsing";
import { TimetableSolution } from "../scripts/api";

interface GanttProp {
  solution: TimetableSolution;
}

var sdt = {
  rooms: [
    { id: 12, treeLevel: 3, content: "1A1" },
    { id: 13, treeLevel: 3, content: "1A2" },
    { id: 14, treeLevel: 3, content: "2A1" },
    { id: 15, treeLevel: 3, content: "2A2" },
    { id: 16, treeLevel: 3, content: "3A1" },
    { id: 17, treeLevel: 3, content: "3A2" },
    { id: 18, treeLevel: 3, content: "1B1" },
    { id: 19, treeLevel: 3, content: "1B2" },
  ],
  grandParents: [
    { id: 1, content: "Building A", treeLevel: 1, nestedGroups: [5, 6, 7] },
    { id: 2, content: "Building B", treeLevel: 1, nestedGroups: [8, 9] },
    { id: 3, content: "Building C", treeLevel: 1, nestedGroups: [10, 11] },
  ],
  parents: [
    { id: 5, treeLevel: 2, content: "Floor 1A", nestedGroups: [12, 13] },
    { id: 6, treeLevel: 2, content: "Floor 2A", nestedGroups: [14, 15] },
    { id: 7, treeLevel: 2, content: "Floor 3A", nestedGroups: [16, 17] },
    { id: 8, treeLevel: 2, content: "Floor 1B", nestedGroups: [18, 19] },
    { id: 9, treeLevel: 2, content: "Floor 2B" },
    { id: 10, treeLevel: 2, content: "Floor 1C" },
    { id: 11, treeLevel: 2, content: "Floor 1C" },
  ],
};

export default function GanttChart({ solution }: GanttProp) {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const items = useRef(new DataSet<TimelineItem>());
  const groups = useRef(new DataSet());
  groups.current.add(sdt.grandParents);
  groups.current.add(sdt.parents);
  groups.current.add(sdt.rooms);
  items.current.add([
    {
      id: 1,
      content: "Lecture",
      start: new Date("2000-01-01T05:00:00"),
      end: new Date("2000-01-01T09:00:00"),
      group: 1,
    },
    {
      id: 2,
      content: "Tutorial",
      start: new Date("2000-01-04T06:00:00"),
      end: new Date("2000-01-04T08:00:00"),
      group: 2,
    },
    {
      id: 3,
      content: "Lab 1",
      start: new Date("2000-01-05T18:00:00"),
      end: new Date("2000-01-05T20:00:00"),
      group: 3,
    },
    {
      id: 4,
      content: "Lab 2",
      start: new Date("2000-01-06T18:00:00"),
      end: new Date("2000-01-06T20:00:00"),
      group: 4,
    },
  ]);

  useEffect(() => {
    if (timelineRef.current) {
      let prevSelected: Id | null = null;

      const options = {
        start: "2000-01-01",
        end: "2000-01-06",
        min: "2000-01-01",
        max: "2000-01-07",
        editable: true,
      };

      // Initialize the timeline
      const timeline = new Timeline(
        timelineRef.current,
        items.current,
        groups.current,
        options
      );

      const hasOverlap = (newItem: TimelineItem | null) => {
        const existingItems = items.current.get();
        return existingItems.some((item: TimelineItem) => {
          if (
            newItem == null ||
            item.id === newItem.id ||
            item.group !== newItem.group
          )
            return false;

          const newStart = new Date(newItem.start).getTime();
          const newEnd = newItem.end
            ? new Date(newItem.end).getTime()
            : newStart;
          const itemStart = new Date(item.start).getTime();
          const itemEnd = item.end ? new Date(item.end).getTime() : itemStart;
          return newStart < itemEnd && newEnd > itemStart;
        });
      };

      const validGroup = (item: TimelineItem | null) => {
        if (item == null) return true;
        const group = groups.current.get(item.group);
        return group.treeLevel === 3;
      };

      timeline.on("select", (properties) => {
        if (prevSelected !== null) {
          const overlaps = hasOverlap(items.current.get(prevSelected));
          const inRoom = validGroup(items.current.get(prevSelected));
          if (overlaps) {
            alert("OVERLAPPED");
          }
          if (!inRoom) {
            alert("ASSIGN ACTIVITIES TO ROOMS ONLY");
          }
        }

        if (properties.items.length > 0) {
          prevSelected = properties.items[0];
        } else {
          prevSelected = null;
        }
      });

      return () => {
        timeline.destroy();
      };
    }
  }, []);

  const convertToCSV = () => {
    let csvContent = "id,content,start,end,group\n";
    const itemList = items.current.get();
    itemList.forEach((item) => {
      const start = item.start.toISOString();
      const end = item.end ? item.end.toISOString() : "";
      csvContent += `${item.id},${item.content},${start},${end},${item.group}\n`;
    });

    return csvContent;
  };

  const downloadCSV = () => {
    const csvData = convertToCSV();
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "timetable.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div ref={timelineRef} />
      <button onClick={downloadCSV}> Download Timetable </button>
    </div>
  );
}
