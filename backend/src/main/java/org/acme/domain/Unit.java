package org.acme.domain;

import ai.timefold.solver.core.api.domain.entity.PlanningEntity;
import ai.timefold.solver.core.api.domain.lookup.PlanningId;
import ai.timefold.solver.core.api.domain.variable.PlanningVariable;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalTime;
import java.util.List;


/**
 * Represents a unit.
 *
 * @author Jet Edge
 */
@Entity
@PlanningEntity
public class Unit extends PanacheEntity {

    @OneToMany(mappedBy = "unit", orphanRemoval = false)
    public List<Student> students;

    @PlanningId
    public int unitID;

    public String name;

    public Duration duration;

    @PlanningVariable
    public DayOfWeek dayOfWeek;

    @PlanningVariable
    public LocalTime startTime;

    @OneToOne(mappedBy = "unit", orphanRemoval = false)
    @PlanningVariable
    public Room room;

    public boolean wantsLab;

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