package org.acme.domain;

import ai.timefold.solver.core.api.domain.entity.PlanningEntity;
import ai.timefold.solver.core.api.domain.lookup.PlanningId;
import ai.timefold.solver.core.api.domain.variable.PlanningVariable;

import java.time.DayOfWeek;
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

    private List<Student> students;
    @PlanningId
    private int unitID;
    private String name;
    private Duration duration;
    @PlanningVariable
    private DayOfWeek dayOfWeek;
    @PlanningVariable
    private LocalTime startTime;
    @PlanningVariable
    private Room room;

    private boolean wantsLab;

    public Unit() {
    }

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
     * @param wantsLab Whether the unit wants a laboratory room.
     */
    public Unit(int unitID, String name, Duration duration, List<Student> students, boolean wantsLab) {
        this.unitID = unitID;
        this.name = name;
        this.duration = duration;
        this.students = students;
        this.wantsLab = wantsLab;
    }

    /**
     * Creates a unit.
     *
     * @param unitID   The unit’s ID.
     * @param name     The unit’s ID.
     * @param duration The unit’s duration.
     * @param students The list of students enrolled in the unit.
     * @param wantsLab Whether the unit wants a laboratory room.
     * @param room The unit's room.
     */
    public Unit(int unitID, String name, Duration duration, List<Student> students, boolean wantsLab, Room room) {
        this.unitID = unitID;
        this.name = name;
        this.duration = duration;
        this.students = students;
        this.wantsLab = wantsLab;
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

    public DayOfWeek getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(DayOfWeek dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEnd() {
        return startTime.plus(duration);
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

    public boolean isWantsLab() {
        return wantsLab;
    }

    public void setWantsLab(boolean wantsLab) {
        this.wantsLab = wantsLab;
    }
}