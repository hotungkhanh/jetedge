import { AuthHeader } from "../security/AuthContext";

/* Timetable solver backend endpoint URL */
export const REMOTE_API_URL = "https://jetedge-backend-e1eeff4b0c04.herokuapp.com";
export const LOCAL_API_URL = "http://localhost:8080";

/* =========================================== Defining types =========================================== */

export type TimetableProblem = TimetableBase & {
  units: Unit[],
}

export type TimetableSolution = TimetableBase & {
  units: Required<Unit>[],
}

export type TimetableBase = {
  campusName: string,
  daysOfWeek: Weekday[],
  startTimes: Time[],
  rooms: Room[]
}

export type Unit = {
  campus: string,
  course: string,
  unitId: number,
  name: string,
  duration: number,
  students: Student[],
  wantsLab: boolean,
  // fields to be assigned by backend's algorithm
  room?: Room,
  studentSize?: number
  dayOfWeek?: Weekday,
  startTime?: Time,
  end?: Time,
};

export type Student = {
  name: string
};

export type Room = {
  campus: string,
  buildingId: string,
  roomCode: string,
  capacity: number,
  lab: boolean
}

export type Weekday = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY"

export type Time = string;

/* ====================================================================================================== */


/**
 * Sends the timetabling problem to backend for solving. Return the solution received.
 * 
 * @param problem A TimetableProblem is a list of units with no allocated time and room.
 * @returns A TimetableSolution with all units allocated a time and a room.
 */
export async function fetchTimetableSolution(problem: TimetableProblem, authHeader: AuthHeader, url?: string): Promise<TimetableSolution | null> {
  try {
    let api_url = REMOTE_API_URL;
    if (url !== undefined) {
      api_url = url;
    }
    const response = await fetch(api_url+"/timetabling", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      body: JSON.stringify(problem)
    });

    if (!response.ok) {
      if (response.status === 500) {
        alert(response.statusText + " " + response.status + ": server was not able to solve the problem.");
      }
      throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
    }

    const solution: TimetableSolution = await response.json();
    return solution;
  }
  catch (error) {
    console.log(error);
    return null;
  }
}