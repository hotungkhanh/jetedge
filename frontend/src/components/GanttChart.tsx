import { memo, useEffect, useRef } from "react";
import { Id } from "vis-data/declarations/data-interface";
import { DataGroupCollectionType, DataItemCollectionType, DataSet, Timeline, TimelineItem } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.min.css";
import "../styles/ganttUnassignable.css";

import {
  findCampusSolution,
  GanttGroup,
  GanttItem,
  GanttItems,
  getGanttItems,
  rawDate,
  toRawDate,
} from "../scripts/solutionParsing";
import { Room, TimetableSolution, Unit } from "../scripts/api";
import { useParams } from "react-router-dom";

export default memo(function GanttChart() {
  const params = useParams();
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const items = useRef(new DataSet<GanttItem>());
  const groups = useRef(new DataSet<GanttGroup>());
  let moddedUnits: Unit[] = [];

  let campusSolutions: TimetableSolution[];
  let check: string | null = sessionStorage.getItem("campusSolutions");
  if (check !== null) {
    campusSolutions = JSON.parse(check);
  } else {
    throw new Error("campusSolutions is not in campus, in GanttChart");
  }

  const solution: TimetableSolution | null = params?.location ? findCampusSolution(
    params.location,
    campusSolutions
  ): null;
  if (solution === null) {
    throw new Error("solution is null after findCampusSolution (possibly an error related to campus name)")
  }

  let timelineData: GanttItems = getGanttItems(solution);
  console.log("processed data in Gantt", timelineData);
  groups.current.clear();
  groups.current.add(timelineData.buildings);
  groups.current.add(timelineData.rooms);
  items.current.clear()
  items.current.add(timelineData.activities);

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
        items.current as DataItemCollectionType,
        groups.current as DataGroupCollectionType,
        options
      );

      const hasOverlap = (newItem: GanttItem | null) => {
        const existingItems = items.current.get();
        return existingItems.some((item: GanttItem) => {
          if (
            newItem == null ||
            item.id === newItem.id ||
            item.group !== newItem.group ||
            item.type === "background"
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

      const validGroup = (item: GanttItem | null) => {
        if (item == null) return true;
        const group: GanttGroup|null = groups.current.get(item.group as Id);
        return (group !== null && group.treeLevel === 2);
        
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
          if (!overlaps && inRoom) {
            let rawStartDate: rawDate = toRawDate(items.current.get(prevSelected)?.start as Date);
            let rawEndDate: rawDate = toRawDate(
              items.current.get(prevSelected)?.end as Date
            );
            const modded: Unit = {
              unitId: items.current.get(prevSelected)?.UnitId,
              room: {
                campus: items.current.get(prevSelected)?.campus,
                buildingId: groups.current.get(groups.current.get(items.current.get(prevSelected)?.group as Id)?.parent as Id)?.originalId,
                roomCode: groups.current.get(items.current.get(prevSelected)?.group as Id)?.originalId,
              },
              dayOfWeek: rawStartDate.dayOfWeek,
              startTime: rawStartDate.time,
              end: rawEndDate.time,
            };
            const index = moddedUnits.findIndex(item => item.unitId === modded.unitId);
            if (index !== -1) {
              moddedUnits.splice(index, 1);
            }
            moddedUnits.push(modded);
            console.log(moddedUnits);
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
      const start = item.start.toString();
      const end = item.end ? item.end.toString() : "";
      csvContent += `${item.id},${item.content},${start},${end},${groups.current.get(item.group as Id)?.content}\n`;
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

  const saveData = async () => {
    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(moddedUnits),
      });

      if (!response.ok) {
        throw new Error("Failed to save data, error in GanttChart.tsx");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div>
      <div ref={timelineRef} />
      <button onClick={downloadCSV}> Download Timetable </button>
      <button onClick={saveData}>Save Changes</button>
    </div>
  );
})
