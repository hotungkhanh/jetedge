import { TimetableSolution, Weekday } from "./api";
import { TimelineGroup, TimelineItem } from "vis-timeline/standalone";

export type GanttItem = TimelineItem & {
  UnitId: number;
  campus: string;
  course: string;
};

export type GanttGroup = TimelineGroup & {
  treeLevel: number;
  originalId: string;
  parent: number;
};

export type GanttItems = {
  activities: GanttItem[];
  rooms: GanttGroup[];
  buildings: GanttGroup[];
};

export type rawDate = {
  dayOfWeek: Weekday;
  time: string;
};

const startDate = "2024-10-14";
/**
 * Format the given backend solution into suitable format for displaying in the
 * Ganttchart.
 *
 * @param campusSolution The timetable solution for a specific campus.
 * @returns GanttItems containing activities, rooms, and buildings for
 * visualization.
 */
export function getGanttItems(campusSolution: TimetableSolution): GanttItems {
  let ganttActivities: GanttItem[] = [];
  let ganttRooms: GanttGroup[] = [];
  let ganttBuildings: GanttGroup[] = [];
  const buildingLookup = new Map<string, GanttGroup>();
  let _return: GanttItems;
  const activityEnum = new Map<number, number>();
  const groupEnum = new Map<string, number>();
  let counter = 1;

  campusSolution.units.forEach((activity) => {
    if (!activityEnum.has(activity.unitId)) {
      activityEnum.set(activity.unitId, counter);
      counter++;
    }
    let newRoom: boolean;
    let newBuilding: boolean;
    newRoom = false;
    newBuilding = false;
    if (!groupEnum.has(activity.room.roomCode)) {
      groupEnum.set(activity.room.roomCode, counter);
      counter++;
      newRoom = true;
    }
    if (!groupEnum.has(activity.room.buildingId)) {
      groupEnum.set(activity.room.buildingId, counter);
      counter++;
      newBuilding = true;
    }
    //=============================Handle Rooms=================================
    if (newRoom) {
      const ganttRoom: GanttGroup = {
        originalId: activity.room.roomCode,
        id: groupEnum.get(activity.room.roomCode) || 0,
        content: activity.room.roomCode,
        treeLevel: 2,
        parent: groupEnum.get(activity.room.buildingId) || -2,
      };
      ganttRooms.push(ganttRoom);
    }
    //=============================Handle Activities============================
    const ganttActivity: GanttItem = {
      campus: campusSolution.campusName,
      id: activityEnum.get(activity.unitId) || 0,
      content: activity.name,
      course: activity.course,
      start: parseDate(startDate, activity.dayOfWeek, activity.startTime),
      end: parseDate(startDate, activity.dayOfWeek, activity.end),
      group: groupEnum.get(activity.room.roomCode) || 0,
      UnitId: activity.unitId,
    };
    ganttActivities.push(ganttActivity);
    //=============================Handle Buildings=============================
    if (newBuilding) {
      const ganttBuilding: GanttGroup = {
        originalId: activity.room.buildingId,
        id: groupEnum.get(activity.room.buildingId) || 0,
        content: activity.room.buildingId,
        treeLevel: 1,
        nestedGroups: [groupEnum.get(activity.room.roomCode) ?? -1],
        parent: -1,
      };
      buildingLookup.set(activity.room.buildingId, ganttBuilding);
      ganttBuildings.push(ganttBuilding);

      const unassignable: GanttItem = {
        campus: campusSolution.campusName,
        id: counter++,
        content: "",
        course: "",
        start: new Date("1000-01-01T05:00:00"),
        end: new Date("3000-01-01T05:00:00"),
        group: ganttBuilding.id,
        type: "background",
        className: "negative",
        UnitId: -1,
      };
      ganttActivities.push(unassignable);
    }

    const buildingCheck = buildingLookup.get(activity.room.buildingId);
    const roomGroup = groupEnum.get(activity.room.roomCode);
    if (buildingCheck && roomGroup) {
      if (
        buildingCheck.nestedGroups !== undefined &&
        !buildingCheck.nestedGroups.includes(roomGroup)
      ) {
        buildingCheck.nestedGroups.push(roomGroup);
      }
    } else {
      throw new Error("LOGIC ERROR IN getGanttItems");
    }
  });

  _return = {
    activities: ganttActivities,
    rooms: ganttRooms,
    buildings: ganttBuildings,
  };
  return _return;
}

/**
 * Parses the output backend date format into suitable frontend format for
 * displaying
 *
 * @param startDate The starting date in string format (e.g., '2024-10-14')
 * @param dayOfWeek The day of the week in string format (e.g., 'MONDAY').
 * @param startTime The starting time in string format (e.g., 'HH:MM:SS').
 * @returns The calculated final date based on the input parameters.
 */
function parseDate(
  startDate: string,
  dayOfWeek: string,
  startTime: string
): Date {
  const daysOfWeek = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  const baseDate = new Date(startDate);

  const targetDayIndex = daysOfWeek.indexOf(dayOfWeek.toUpperCase());
  const currentDayIndex = baseDate.getDay();

  const dayDifference = (targetDayIndex + 7 - currentDayIndex) % 7;

  const [hours, minutes, seconds] = startTime.split(":").map(Number);

  const finalDate = new Date(baseDate);
  finalDate.setDate(baseDate.getDate() + dayDifference);
  finalDate.setHours(hours, minutes, seconds, 0);
  return finalDate;
}

/**
 * Converts a JavaScript Date object to the correct format for the backend
 * framework.
 * @param date The Date object to convert.
 * @returns The rawDate object with the day of the week (as Weekday enum) and
 * the time in "HH:MM:SS" format.
 */
export function toRawDate(date: Date): rawDate {
  const daysOfWeek = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  // Get the day of the week
  const dayOfWeek = daysOfWeek[date.getDay()];

  // Get the time in "HH:MM:SS" format
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const startTime = `${hours}:${minutes}:${seconds}`;

  return { dayOfWeek: dayOfWeek as Weekday, time: startTime };
}

/**
 * Finds a specific campus solution from a list of timetable solutions.
 * @param campus - The name of the campus to search for.
 * @param solutions - An array of timetable solutions to search within.
 * @returns The timetable solution corresponding to the specified campus,
 * or null if not found.
 */
export function findCampusSolution(
  campus: string,
  solutions: TimetableSolution[]
): TimetableSolution | null {
  let _return: TimetableSolution | null = null;
  solutions.forEach((campusSolution) => {
    if (campusSolution.campusName.toLowerCase() === campus) {
      _return = campusSolution;
    }
  });
  return _return;
}
