import { TimetableSolution, Unit } from "./api";
import {
  TimelineGroup,
  TimelineItem,
} from "vis-timeline/standalone";


export type GanttGroup = TimelineGroup & {
  treeLevel: number;
};

// export type GanttGroup = {
//   id: number,
//   content: string,
//   treeLevel: number;
//   nestedGroup?: number[];
// };

// export type TimelineItem = {
//   id: number;
//   content: string;
//   start: string;
//   end: string;
//   group: number;
// };

export type GanttItems = {
  activities: TimelineItem[];
  rooms: GanttGroup[];
  buildings: GanttGroup[];
};

const startDate = "2000-01-03";

export function getGanttItems(campusSolution: TimetableSolution): GanttItems {
  let ganttActivities: TimelineItem[] = [];
  let ganttRooms: GanttGroup[] = [];
  let ganttBuildings: GanttGroup[] = [];
  const seenRoom = new Set<string>();
  const buildingLookup = new Map<string, GanttGroup>();
  let _return: GanttItems;
  const activityEnum = new Map<number, number>();
  const groupEnum = new Map<string, number>();
  let counter = 1; // Global counter for unique IDs across buildings, rooms, and activities


  campusSolution.units.forEach((activity) => {
    //=============================Handle Rooms=================================
    if (!groupEnum.has(activity.room.roomCode)) {
      groupEnum.set(activity.room.roomCode, counter);
      counter++;

      const ganttRoom: GanttGroup = {
        id: groupEnum.get(activity.room.roomCode) || 0,
        content: activity.room.roomCode,
        treeLevel: 2,
      };
      seenRoom.add(activity.room.roomCode);
      ganttRooms.push(ganttRoom);
    }
    //=============================Handle Activities============================
    if (!activityEnum.has(activity.unitId)) {
      activityEnum.set(activity.unitId, counter);
      counter++;
    }

    const ganttActivity: TimelineItem = {
      id: activityEnum.get(activity.unitId) || 0,
      content: activity.name,
      start: translateToDate(startDate, activity.dayOfWeek, activity.startTime),
      end: translateToDate(startDate, activity.dayOfWeek, activity.end),
      group: groupEnum.get(activity.room.roomCode) || 0,
    };
    ganttActivities.push(ganttActivity);
    //=============================Handle Buildings=============================
    if (!groupEnum.has(activity.room.buildingId)) {
      groupEnum.set(activity.room.buildingId, counter);
      counter++;
      const ganttBuilding: GanttGroup = {
        id: groupEnum.get(activity.room.buildingId) || 0,
        content: activity.room.buildingId,
        treeLevel: 1,
        nestedGroups: [groupEnum.get(activity.room.roomCode) ?? -1],
      };
      buildingLookup.set(activity.room.buildingId, ganttBuilding);
      ganttBuildings.push(ganttBuilding);

      const unassignable: TimelineItem = {
        id: counter++,
        content: "",
        start: new Date("1000-01-01T05:00:00"),
        end: new Date("3000-01-01T05:00:00"),
        group: ganttBuilding.id,
        type: "background",
        className: "negative",
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
        buildingCheck.nestedGroups = buildingCheck.nestedGroups || [];
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

function translateToDate(startDate: string, dayOfWeek: string, startTime: string):Date {
  const daysOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

  const baseDate = new Date(startDate);

  const targetDayIndex = daysOfWeek.indexOf(dayOfWeek.toUpperCase());
  const currentDayIndex = baseDate.getDay();

  const dayDifference = (targetDayIndex + 7 - currentDayIndex) % 7;

  const [hours, minutes, seconds] = startTime.split(':').map(Number);

  const finalDate = new Date(baseDate);
  finalDate.setDate(baseDate.getDate() + dayDifference);
  finalDate.setHours(hours, minutes, seconds, 0); 
  console.log(finalDate);
  return finalDate;
}

function dateToDayOfWeekAndTime(date: Date) {
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

  return { dayOfWeek, startTime };
}

//TODO: Parse data to send to backend
// export function formatSolution2Save(
//   items: GanttItems): TimetableSolution {

//   let _return:TimetableSolution;
//   let units:Unit[] = [];
//   items.activities.forEach((activity)=>{
//     let unit: Unit = {
//       unitId:
//       name:
//       campus:
//       course:

//     }
//   })
// }

//TODO: Parse data for downloading
export function format2CSV(items: GanttItems) {
  items
}

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
