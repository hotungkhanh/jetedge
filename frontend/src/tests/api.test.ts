import { describe, it, expect } from 'vitest';
import { fetchTimetableSolution, TimetableProblem } from '../scripts/api';
import moment from 'moment';

/**
 * Test fetchTimetableSolution API method.
 * Check if connection to backend is working.
 * Check that output matches expected output.
 */
describe('fetchTimetableSolution', () => {
  /**
   * Validate end-to-end scheduling and data consistency of 1 API method call.
   */
  it('return TimetableSolution', async () => {
    const problem: TimetableProblem = {
      units: [{ unitID: 0, name: "Unit0", duration: 1200, students: [], wantsLab: true }],
      daysOfWeek: ["MONDAY"],
      startTimes: ["11:00:00"],
      rooms: [{ id: "Room A", capacity: 10, lab: true }]
    };
    
    const solution = await fetchTimetableSolution(problem);
    expect(solution).not.toBeNull();
    expect(solution?.units[0].dayOfWeek).toEqual(problem.daysOfWeek[0]);
    expect(solution?.units[0].startTime).toEqual(problem.startTimes[0]);
    expect(solution?.units[0].end).toEqual(addSecondsToTimeString(problem.startTimes[0], problem.units[0].duration));
    expect(solution?.units[0].room).toEqual(problem.rooms[0]);
    expect(solution?.daysOfWeek).toEqual(problem.daysOfWeek);
    expect(solution?.startTimes).toEqual(problem.startTimes);
    expect(solution?.rooms).toEqual(problem.rooms);
    
  });

  /**
   * Validate that backend server can handle multiple solve requests concurrently.
   */
  it ('can be called multiple times', async () => {
    const problem: TimetableProblem = {
      units: [{ unitID: 0, name: "Unit0", duration: 1200, students: [], wantsLab: true }],
      daysOfWeek: ["MONDAY"],
      startTimes: ["11:00:00"],
      rooms: [{ id: "Room A", capacity: 10, lab: true }]
    };

    const solutions = await Promise.all([fetchTimetableSolution(problem), fetchTimetableSolution(problem), fetchTimetableSolution(problem)]);
    
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