package org.acme.domain;

import ai.timefold.solver.core.api.domain.solution.PlanningEntityCollectionProperty;
import ai.timefold.solver.core.api.domain.solution.PlanningScore;
import ai.timefold.solver.core.api.domain.solution.PlanningSolution;
import ai.timefold.solver.core.api.domain.solution.ProblemFactCollectionProperty;
import ai.timefold.solver.core.api.domain.valuerange.ValueRangeProvider;
import ai.timefold.solver.core.api.score.buildin.hardsoft.HardSoftScore;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Represents a timetable, the solution from the program.
 *
 * @author Jet Edge
 */
@PlanningSolution
public class Timetable {

    @ValueRangeProvider
    private List<DayOfWeek> daysOfWeek;
    @ValueRangeProvider
    private List<LocalTime> startTimes;

    @ProblemFactCollectionProperty
    @ValueRangeProvider
    private List<Room> rooms;

    @PlanningEntityCollectionProperty
    private List<Unit> units;

    @PlanningScore
    private HardSoftScore score;

    public Timetable() {

    }

    /**
     * Creates a timetable.
     *
     * @param units      The list of units to be allocated.
     * @param startTimes The list of available starting times.
     */
    public Timetable(List<Unit> units, List<LocalTime> startTimes) {
        this.units = units;
        this.startTimes = startTimes;
    }

    /**
     * Creates a timetable.
     *
     * @param units      The list of units to be allocated.
     * @param startTimes The list of available starting times.
     * @param rooms      The list of available rooms.
     */
    public Timetable(List<Unit> units, List<LocalTime> startTimes, List<Room> rooms) {
        this.units = units;
        this.startTimes = startTimes;
        this.rooms = rooms;
    }

    /**
     * Creates a timetable.
     *
     * @param units      The list of units to be allocated.
     * @param daysOfWeek The list of available days of the week.
     * @param startTimes The list of available starting times.
     * @param rooms      The list of available rooms.
     */
    public Timetable(List<Unit> units, List<DayOfWeek> daysOfWeek, List<LocalTime> startTimes, List<Room> rooms) {
        this.units = units;
        this.daysOfWeek = daysOfWeek;
        this.startTimes = startTimes;
        this.rooms = rooms;
    }

    public List<DayOfWeek> getDaysOfWeek() {
        return daysOfWeek;
    }

    public void setDaysOfWeek(List<DayOfWeek> daysOfWeek) {
        this.daysOfWeek = daysOfWeek;
    }

    public List<LocalTime> getStartTimes() {
        return startTimes;
    }

    public void setStartTimes(List<LocalTime> startTimes) {
        this.startTimes = startTimes;
    }

    public List<Room> getRooms() {
        return rooms;
    }

    public void setRooms(List<Room> rooms) {
        this.rooms = rooms;
    }

    public List<Unit> getUnits() {
        return units;
    }

    public void setUnits(List<Unit> units) {
        this.units = units;
    }

    public HardSoftScore getScore() {
        return score;
    }

    public void setScore(HardSoftScore score) {
        this.score = score;
    }

    /**
     * Identify conflicting units having common students at the same time.
     *
     * @return A list of conflicting units.
     */
    @ProblemFactCollectionProperty
    public List<ConflictingUnit> calculateSoftUnitConflictList() {
        ArrayList<ConflictingUnit> out = new ArrayList<ConflictingUnit>();
        for (var first : units) {
            for (var second : units) {
                if (first.getUnitID() >= second.getUnitID()) {
                    continue;
                }
                int numStudents = 0;
                for (Student firstStudent : first.getStudents()) {
                    if (second.getStudents().contains(firstStudent)) {
                        numStudents++;
                    }
                }
                if (numStudents > 0) {
                    out.add(new ConflictingUnit(first, second, numStudents));
                }
            }
        }
        return out;
    }

}