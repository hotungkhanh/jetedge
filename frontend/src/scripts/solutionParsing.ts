import GanttChart from "../components/GanttChart";
import Room from "../pages/spreadsheets/Room";
import { TimetableSolution } from "./api";

export type GanttRoom = {
  id: string;
  content: string;
  treeLevel: 2;
};

export type GanttBuilding = {
  id: string;
  content: string;
  treeLevel: 1;
  nestedGroups: string[];
};

export type GanttActivity = {
  id: number;
  content: string;
  start: Date;
  end: Date;
  group: number|string;
};

export type GanttItems = {
  activities: GanttActivity[],
  rooms: GanttRoom[],
  buildings: GanttBuilding[]
}

export function getGanttItems(campusSolution: TimetableSolution): GanttItems {
  let ganttActivities: GanttActivity[] = [];
  let ganttRooms: GanttRoom[] = [];
  let ganttBuildings: GanttBuilding[] = [];
  const seenRoom = new Set<string>();
  const buildingLookup = new Map<string, GanttBuilding>()
  let _return: GanttItems;
  campusSolution.units.forEach((activity) => {
    //=============================Handle Activities============================
    const ganttActivity: GanttActivity = {
      id: activity.unitId,
      content: activity.name,
      start: new Date("2000-01-01T05:00:00"),
      end: new Date("2000-01-01T05:00:00"),
      group: activity.room.roomCode,
    };
    ganttActivities.push(ganttActivity);

    //=============================Handle Buildings=============================
    // if not seen building before, initiate it in the dict
    if (buildingLookup.get(activity.room.buildingId) === undefined) {
      const ganttBuilding: GanttBuilding = {
        id: activity.room.buildingId,
        content: activity.room.buildingId,
        treeLevel: 1,
        nestedGroups: [activity.room.roomCode],
      }
      buildingLookup.set(activity.room.buildingId, ganttBuilding);
      ganttBuildings.push(ganttBuilding);

    // if seen it before, add room to list
    } else {
      buildingLookup.get(activity.room.buildingId)?.nestedGroups.push(activity.room.roomCode);
    }

    //=============================Handle Room==================================
    if (!seenRoom.has(activity.room.roomCode)) {
      const ganttRoom: GanttRoom = {
        id: activity.room.roomCode,
        content: activity.room.roomCode,
        treeLevel: 2,
      };
      seenRoom.add(activity.room.roomCode);
      ganttRooms.push(ganttRoom);
    }
  });
  _return = {
    activities: ganttActivities,
    rooms: ganttRooms,
    buildings: ganttBuildings,
  };
  return _return;
}

export function formatSolution(
  Buildings: GanttBuilding[],
  Rooms: GanttRoom[],
  activities: GanttActivity
): any {}

export function findCampusSolution(
  campus: string,
  solutions: TimetableSolution[]
): TimetableSolution|null {
  let _return: TimetableSolution|null = null;
  solutions.forEach((campusSolution) => {
    if (campusSolution.campusName === campus) {
      _return = campusSolution;
    }
  });
  return _return;
}
