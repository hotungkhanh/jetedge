package org.acme.domain;

import ai.timefold.solver.core.api.domain.solution.PlanningEntityCollectionProperty;
import ai.timefold.solver.core.api.domain.solution.PlanningScore;
import ai.timefold.solver.core.api.domain.solution.PlanningSolution;
import ai.timefold.solver.core.api.domain.solution.ProblemFactCollectionProperty;
import ai.timefold.solver.core.api.domain.valuerange.ValueRangeProvider;
import ai.timefold.solver.core.api.score.buildin.hardsoft.HardSoftScore;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Represents a timetable, the solution from the program.
 *
 * @author Jet Edge
 */
@Entity
@PlanningSolution
public class Timetable extends PanacheEntity {

    public String campusName;

    @ElementCollection
    @ValueRangeProvider
    public List<DayOfWeek> daysOfWeek;

    @ElementCollection
    @ValueRangeProvider
    public List<LocalTime> startTimes;

    /*
     * Rooms can belong to multiple timetables because timetables are generated
     * on a per-campus basis, and although each room can only belong to one 
     * campus, the user may choose to generate multiple timetables for each
     * campus, hence the many-to-many relationship
     */
    @JsonIgnoreProperties("timetables")
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
        name = "room_timetable",
        joinColumns = @JoinColumn(name = "timetable_id"),
        inverseJoinColumns = @JoinColumn(name = "room_id")
    )
    @ProblemFactCollectionProperty
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @ValueRangeProvider
    public List<Room> rooms;

    /*
     * Units can belong to multiple timetables because again, timetables are
     * generated on a per-campus basis, but each unit can be taught across
     * multiple campuses, so may appear in multiple timetables
     */
    @JsonIgnoreProperties("timetables")
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
        name = "unit_timetable",
        joinColumns = @JoinColumn(name = "timetable_id"),
        inverseJoinColumns = @JoinColumn(name = "unit_id")
    )
    @PlanningEntityCollectionProperty
    public List<Unit> units;

    @PlanningScore
    public HardSoftScore score;

    public Timetable() {

    }

    /**
     * Creates a timetable.
     *
     * @param units      The list of units to be allocated.
     * @param startTimes The list of available starting times.
     */
    public Timetable(String campusName, List<Unit> units, List<LocalTime> startTimes) {
        this.campusName = campusName;
        this.units = units;
        this.startTimes = startTimes;
        this.setUnitTimetable();
    }

    /**
     * Creates a timetable.
     *
     * @param units      The list of units to be allocated.
     * @param startTimes The list of available starting times.
     * @param rooms      The list of available rooms.
     */
    public Timetable(String campusName, List<Unit> units, List<LocalTime> startTimes, List<Room> rooms) {
        this.campusName = campusName;
        this.units = units;
        this.startTimes = startTimes;
        this.rooms = rooms;
        this.setUnitTimetable();
        this.setRoomTimetable();
    }

    /**
     * Creates a timetable.
     *
     * @param units      The list of units to be allocated.
     * @param daysOfWeek The list of available days of the week.
     * @param startTimes The list of available starting times.
     * @param rooms      The list of available rooms.
     */
    public Timetable(String campusName, List<Unit> units, List<DayOfWeek> daysOfWeek, List<LocalTime> startTimes, List<Room> rooms) {
        this.campusName = campusName;
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

    public void setUnitTimetable() {
        for (Unit unit : this.units) {
            unit.timetables.add(this);
        }
    }

    public void setRoomTimetable() {
        for (Room room : this.rooms) {
            room.timetables.add(this);
        }
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
                if (first.getUnitId() >= second.getUnitId()) {
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