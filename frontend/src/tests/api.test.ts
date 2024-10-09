import { describe, it, expect } from 'vitest';
import { fetchTimetableSolution, LOCAL_API_URL, TimetableProblem } from '../scripts/api';
import moment from 'moment';
import { AuthHeader } from '../security/AuthContext';

/**
 * Test fetchTimetableSolution API method.
 * Check if connection to backend is working.
 * Check that output matches expected output.
 */
describe('fetchTimetableSolution', { timeout: 200000 }, () => {
  /**
   * Validate end-to-end scheduling and data consistency of 1 API method call.
   */
  it('return TimetableSolution', async () => {
    const problem: TimetableProblem = {
      campusName: "Geelong",
      units: [{ campus: "Geelong", course: "B", unitId: 0, name: "Unit0", duration: 1200, students: [], wantsLab: true }],
      daysOfWeek: ["MONDAY"],
      startTimes: ["11:00:00"],
      rooms: [{ campus: "Geelong", buildingId: "01", roomCode: "Room A", capacity: 10, lab: true }]
    };

    const authHeader: AuthHeader = `Basic ${btoa(`${import.meta.env.VITE_FRONTEND_USERNAME}:${import.meta.env.VITE_FRONTEND_PASSWORD}`)}`;

    const solution = await fetchTimetableSolution(problem, authHeader, LOCAL_API_URL);
    expect(solution).not.toBeNull();
    expect(solution?.units[0].dayOfWeek).toEqual(problem.daysOfWeek[0]);
    expect(solution?.units[0].startTime).toEqual(problem.startTimes[0]);
    expect(solution?.units[0].end).toEqual(addSecondsToTimeString(problem.startTimes[0], problem.units[0].duration));
    expect(solution?.units[0].room).toHaveProperty("roomCode", problem.rooms[0].roomCode);
    expect(solution?.daysOfWeek).toEqual(problem.daysOfWeek);
    expect(solution?.startTimes).toEqual(problem.startTimes);
    
  });

  /**
   * Validate that backend server can handle multiple solve requests concurrently.
   */
  it ('can be called multiple times', async () => {
    const problem0: TimetableProblem = {
      campusName: "Adelaide",
      units: [{ campus: "Adelaide", course: "C", unitId: 0, name: "Unit0", duration: 1200, students: [], wantsLab: true }],
      daysOfWeek: ["MONDAY"],
      startTimes: ["11:00:00"],
      rooms: [{ campus: "Adelaide", buildingId: "02", roomCode: "Room A", capacity: 10, lab: true }]
    };

    const problem1: TimetableProblem = {
      campusName: "Melbourne",
      units: [{ campus: "Melbourne", course: "C", unitId: 0, name: "Unit0", duration: 1200, students: [], wantsLab: true }],
      daysOfWeek: ["MONDAY"],
      startTimes: ["11:00:00"],
      rooms: [{ campus: "Melbourne", buildingId: "02", roomCode: "Room A", capacity: 10, lab: true }]
    };

    const authHeader: AuthHeader = `Basic ${btoa(`${import.meta.env.VITE_FRONTEND_USERNAME}:${import.meta.env.VITE_FRONTEND_PASSWORD}`)}`;
    const solutions = await Promise.all([fetchTimetableSolution(problem0, authHeader, LOCAL_API_URL), fetchTimetableSolution(problem1, authHeader, LOCAL_API_URL)]);
    
    for (let i = 0; i < solutions.length; i++) {
      expect(solutions[i]).not.toBeNull();
    }

  });
  
});

/**
 * Helper function.
 * Add a string representing time with a number representing number of seconds to add.
 * 
 * @param timeString string representing time
 * @param secondsToAdd number in seconds
 * @returns string representing time after specified seconds have been added to it
 */
function addSecondsToTimeString(timeString: string, secondsToAdd: number) {
  const time = moment(timeString, 'HH:mm:ss');
  time.add(secondsToAdd, 'seconds');
  return time.format('HH:mm:ss');
}