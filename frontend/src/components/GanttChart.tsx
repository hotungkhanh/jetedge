import { useEffect, useRef, useState } from "react";
import { Id } from "vis-data/declarations/data-interface";
import {
  DataGroupCollectionType,
  DataItemCollectionType,
  DataSet,
  Timeline,
} from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.min.css";
import "../styles/ganttUnassignable.css";
import { useAuthContext } from "../security/AuthContext";
import LoadingModal from "./LoadingModel";

import {
  findCampusSolution,
  GanttGroup,
  GanttItem,
  GanttItems,
  getGanttItems,
  rawDate,
  toRawDate,
} from "../scripts/solutionParsing";
import { REMOTE_API_URL, TimetableSolution, Unit } from "../scripts/api";
import { useParams } from "react-router-dom";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Button } from "@mui/material";

/**
 * Component for displaying a Gantt chart with interactive functionalities.
 * Retrieves timetable solutions, initializes the timeline, handles item
 * selection, CSV conversion, downloading, and saving data.
 *
 * Throws errors if timetable solutions are missing in the database or if there
 * are issues during data saving.
 */
export default function GanttChart() {
  const params = useParams();
  const { authHeader } = useAuthContext();
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const items = useRef(new DataSet<GanttItem>());
  const groups = useRef(new DataSet<GanttGroup>());
  const moddedUnits = useRef<Unit[]>([]);
  const [open, setOpen] = useState(false);
  let campusSolutions: TimetableSolution[];
  let check: string | null = sessionStorage.getItem("campusSolutions");
  if (check !== null) {
    campusSolutions = JSON.parse(check);
  } else {
    throw new Error("campusSolutions is not in campus, in GanttChart");
  }
  const solution: TimetableSolution | null = params?.location
    ? findCampusSolution(params.location, campusSolutions)
    : null;
  if (solution === null) {
    throw new Error(
      "solution is null after findCampusSolution (possibly an error related to campus name)"
    );
  }

  let timelineData: GanttItems = getGanttItems(solution);
  groups.current.clear();
  groups.current.add(timelineData.buildings);
  groups.current.add(timelineData.rooms);
  items.current.clear();
  items.current.add(timelineData.activities);

  useEffect(() => {
    if (timelineRef.current) {
      let prevSelected: Id | null = null;

      const options = {
        start: "2024-10-14",
        end: "2024-10-19",
        min: "2024-10-14",
        max: "2024-10-19",
        editable: {
          add: false, // add new items by double tapping
          updateTime: true, // drag items horizontally
          updateGroup: true, // drag items from one group to another
          remove: false, // delete an item by tapping the delete button top right
          overrideItems: false, // allow these options to override item.editable
        },
        showCurrentTime: false,
      };

      // Initialize the timeline
      const timeline = new Timeline(
        timelineRef.current,
        items.current as DataItemCollectionType,
        groups.current as DataGroupCollectionType,
        options
      );

      /**
       * Checks if an unit overlaps with existing units in the Gantt chart.
       *
       * @param newItem The new unit to check for overlap
       * @returns Boolean indicating if there is an overlap
       */
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

      /**
       * Checks if the given unit belongs to a room rather than a building.
       * @param item - The unit to be validated.
       * @returns True if the item belongs to a room, false otherwise.
       */
      const validGroup = (item: GanttItem | null) => {
        if (item == null) return true;
        const group: GanttGroup | null = groups.current.get(item.group as Id);
        return group !== null && group.treeLevel === 2;
      };

      /**
       * Handles the selection event on the timeline,
       * checks for overlaps and valid room assignments,
       * and updates the list of modified units accordingly.
       */
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
            let rawStartDate: rawDate = toRawDate(
              items.current.get(prevSelected)?.start as Date
            );
            let rawEndDate: rawDate = toRawDate(
              items.current.get(prevSelected)?.end as Date
            );
            let unitId: number | undefined =
              items.current.get(prevSelected)?.UnitId;
            let campus: string | undefined =
              items.current.get(prevSelected)?.campus;
            let buildingId: string | undefined = groups.current.get(
              groups.current.get(items.current.get(prevSelected)?.group as Id)
                ?.parent as Id
            )?.originalId;
            let roomCode: string | undefined = groups.current.get(
              items.current.get(prevSelected)?.group as Id
            )?.originalId;
            if (
              unitId !== undefined &&
              campus !== undefined &&
              buildingId !== undefined &&
              roomCode !== undefined
            ) {
              const modded: Unit = {
                campus: "",
                name: "",
                course: "",
                duration: -1,
                students: [],
                wantsLab: false,
                unitId: unitId,
                room: {
                  campus: campus,
                  buildingId: buildingId,
                  roomCode: roomCode,
                  capacity: -1,
                  lab: false,
                },
                dayOfWeek: rawStartDate.dayOfWeek,
                startTime: rawStartDate.time,
                end: rawEndDate.time,
              };
              const index = moddedUnits.current.findIndex(
                (item) => item.unitId === modded.unitId
              );
              if (index !== -1) {
                moddedUnits.current.splice(index, 1);
              }
              moddedUnits.current.push(modded);
            }
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

  /**
   * Converts the items related to a specific course into CSV format.
   *
   * @param course - The course for which items need to be converted to CSV.
   * @returns A string representing the items related to the course in CSV format.
   */
  const convertToCSV = (course: string) => {
    let csvContent = "id,name,start,end,room,building\n";
    const itemList = items.current.get();
    itemList.forEach((item) => {
      if (item.course === course) {
        const start = item.start.toString();
        const end = item.end ? item.end.toString() : "";
        csvContent += `${item.id},${item.content},${start},${end},${
          groups.current.get(item.group as Id)?.content
        }, ${
          groups.current.get(groups.current.get(item.group as Id)?.parent as Id)
            ?.originalId
        }\n`;
      }
    });

    return csvContent;
  };

  /**
   * Downloads a zip file containing CSV files for each unique course in the
   * items list.
   */
  const downloadCSV = () => {
    const zip = new JSZip();
    const uniqueNames = new Set(items.current.map((obj) => obj.course));
    uniqueNames.forEach((course) => {
      if (course) {
        const csvData = convertToCSV(course);
        zip.file(
          (params.location as string).replace(/[^a-zA-Z0-9]/g, "_") +
            "-" +
            course.replace(/[^a-zA-Z0-9]/g, "_") +
            ".csv",
          csvData.replace(/\u00A0/g, " ")
        );
      }
    });

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(
        content,
        (params.location as string).replace(/[^a-zA-Z0-9]/g, "_") + ".zip"
      );
    });
  };

  /**
   * Asynchronously saves data to the remote API backend.
   * Opens a loading modal during the save operation.
   * Handles PUT and GET requests to update and view timetable data.
   * Parses the JSON response and stores timetable solutions in sessionStorage.
   * Catches and logs any errors that occur during the save operation.
   */
  const saveData = async () => {
    try {
      setOpen(true);
      const response = await fetch(REMOTE_API_URL + "/timetabling/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(moddedUnits.current),
      });

      if (!response.ok) {
        throw new Error("Failed to save data, error in GanttChart.tsx");
      }

      moddedUnits.current = [];

      const viewResponse = await fetch(REMOTE_API_URL + "/timetabling/view", {
        headers: { Authorization: authHeader },
      });

      if (!viewResponse.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await viewResponse.json();
      const timetableSolutions: TimetableSolution[] =
        data as TimetableSolution[];
      sessionStorage.setItem(
        "campusSolutions",
        JSON.stringify(timetableSolutions)
      );
      setOpen(false);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div>
      <div
        style={{
          padding: 10,
          overflowY: "scroll",
          height: "60vh",
        }}
      >
        <div ref={timelineRef} />
      </div>
      <Button
        onClick={downloadCSV}
        variant="outlined"
        size="small"
        sx={{
          color: "black",
          borderColor: "black",
          "&:hover": {
            color: "#f05a22",
            borderColor: "#f05a22",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
          borderRadius: "3px",
          marginTop: "5px",
        }}
      >
        Download Timetable
      </Button>
      <Button
        onClick={saveData}
        variant="outlined"
        size="small"
        sx={{
          color: "black",
          borderColor: "black",
          "&:hover": {
            color: "#f05a22",
            borderColor: "#f05a22",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
          borderRadius: "3px",
          marginTop: "5px",
          marginLeft: "7px",
        }}
      >
        Save Changes
      </Button>
      <LoadingModal open={open}></LoadingModal>
    </div>
  );
}
