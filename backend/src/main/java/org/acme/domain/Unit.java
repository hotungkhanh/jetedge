package org.acme.domain;

import ai.timefold.solver.core.api.domain.entity.PlanningEntity;
import ai.timefold.solver.core.api.domain.lookup.PlanningId;
import ai.timefold.solver.core.api.domain.variable.PlanningVariable;

import java.time.Duration;
import java.time.LocalTime;
import java.util.List;


/**
 * Represents a unit.
 *
 * @author Jet Edge
 */
@PlanningEntity
public class Unit {

    @PlanningId
    int unitID;

    String name;

    Duration duration;

    @PlanningVariable
    LocalTime start;
    List<Student> students;
    @PlanningVariable
    private Room room;

    public Unit() {
    }

    ;

    /**
     * Creates a unit.
     *
     * @param unitID   The unit’s ID.
     * @param name     The unit’s ID.
     * @param duration The unit’s duration.
     * @param students The list of students enrolled in the unit.
     */
    public Unit(int unitID, String name, Duration duration, List<Student> students) {
        this.unitID = unitID;
        this.name = name;
        this.duration = duration;
        this.students = students;
    }

    /**
     * Creates a unit.
     *
     * @param unitID   The unit’s ID.
     * @param name     The unit’s ID.
     * @param duration The unit’s duration.
     * @param students The list of students enrolled in the unit.
     * @param room     The room assigned to the unit.
     */
    public Unit(int unitID, String name, Duration duration, List<Student> students, Room room) {
        this.unitID = unitID;
        this.name = name;
        this.duration = duration;
        this.students = students;
        this.room = room;
    }

    public int getUnitID() {
        return unitID;
    }

    public void setUnitID(int unitID) {
        this.unitID = unitID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Duration getDuration() {
        return duration;
    }

    public void setDuration(Duration duration) {
        this.duration = duration;
    }

    public LocalTime getStart() {
        return start;
    }

    public void setStart(LocalTime start) {
        this.start = start;
    }

    public LocalTime getEnd() {
        return start.plus(duration);
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }

    /**
     * Get the number of students enrolled in the unit.
     *
     * @return An int representing the number of students.
     */
    public int getStudentSize() {
        return students.size();
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }
}