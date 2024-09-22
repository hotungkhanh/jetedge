const API_URL = 'http://localhost:8080/timetabling';

export type TimetableProblem = TimetableBase & {
  units: Unit[],
}

export type TimetableSolution = TimetableBase & {
  units: Required<Unit>,
}

export type TimetableBase = {
  daysOfWeek: Weekday[],
  startTimes: Time[],
  rooms: Room[]
}

export type Unit = {
  unitID: number,
  name: string,
  duration: number,
  students: Student[],
  wantsLab: boolean,
  // fields to be assigned by backend's algorithm
  room?: Room,
  studentSize?: number
  dayOfWeek?: Weekday,
  start?: Time,
  end?: Time,
};

export type Student = {
  name: string
};

export type Room = {
  id: string,
  capacity: number,
  lab: boolean
}

export type Weekday = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY"

export type Time = string;


// API function(s)
export async function fetchTimetableSolution(problem: TimetableProblem): Promise<TimetableSolution | null> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(problem)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
    }

    const solution: TimetableSolution = await response.json();
    console.log(solution);
    return solution;
  }
  catch (error) {
    console.log(error);
    return null;
  }
}