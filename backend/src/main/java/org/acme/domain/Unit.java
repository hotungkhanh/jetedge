package org.acme.domain;

import ai.timefold.solver.core.api.domain.entity.PlanningEntity;
import ai.timefold.solver.core.api.domain.lookup.PlanningId;
import ai.timefold.solver.core.api.domain.variable.PlanningVariable;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Represents a unit.
 *
 * @author Jet Edge
 */
@Entity
@PlanningEntity
public class Unit extends PanacheEntity {

    @PlanningId
    public int unitId;

    public String name;

    public String course;

    public Duration duration;

    @PlanningVariable
    public DayOfWeek dayOfWeek;

    @PlanningVariable
    public LocalTime startTime;

    // TODO: change unit to be the owner, rather than the student being owner
    @Transient
    @JsonIgnoreProperties("units")
    @ManyToMany(mappedBy = "units", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    public List<Student> students;

    public int studentSize;

    /*
     * currently each unit only has 1 'slot' on the timetable, so it can only
     * be associated with one room, but in the final product, we would most
     * likely have to change this to a many-to-many relationship
     * i.e. list of Rooms, because we might want to separate lecture/tutorial
     * etc.
     */
    @JsonIgnoreProperties("units")
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "room_id")
    @PlanningVariable
    public Room room;

    public boolean wantsLab;

    /*
     * The timetables that the Unit object belongs to
     */
    @JsonIgnoreProperties("units")
    @ManyToMany(mappedBy = "units", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    public List<Timetable> timetables = new ArrayList<Timetable>();

    public Unit() {
    }

    /**
     * Creates a unit.
     *
     * @param unitID   The unit’s ID.
     * @param name     The unit’s name.
     * @param course   The course that the unit belongs to.
     * @param duration The unit’s duration.
     * @param students The list of students enrolled in the unit.
     */
    public Unit(int unitID, String name, String course, Duration duration, List<Student> students) {
        this.unitId = unitID;
        this.name = name;
        this.course = course;
        this.duration = duration;
        this.students = students;
        this.studentSize = this.students.size();
        this.setStudentsUnits();
    }

    /**
     * Creates a unit.
     *
     * @param unitID   The unit’s ID.
     * @param name     The unit’s name.
     * @param course   The course that the unit belongs to.
     * @param duration The unit’s duration.
     * @param students The list of students enrolled in the unit.
     * @param wantsLab Whether the unit wants a laboratory room.
     */
    public Unit(int unitID, String name, String course, Duration duration, List<Student> students, boolean wantsLab) {
        this.unitId = unitID;
        this.name = name;
        this.course = course;
        this.duration = duration;
        this.students = students;
        this.studentSize = this.students.size();
        this.wantsLab = wantsLab;
        this.setStudentsUnits();
    }

    /**
     * Creates a unit.
     *
     * @param unitID   The unit’s ID.
     * @param name     The unit’s name.
     * @param course   The course that the unit belongs to.
     * @param duration The unit’s duration.
     * @param students The list of students enrolled in the unit.
     * @param wantsLab Whether the unit wants a laboratory room.
     * @param room     The unit's room.
     */
    public Unit(int unitID, String name, String course, DayOfWeek dayOfWeek, LocalTime startTime, Duration duration, List<Student> students, boolean wantsLab, Room room) {
        this.unitId = unitID;
        this.name = name;
        this.course = course;
        this.dayOfWeek = dayOfWeek;
        this.startTime = startTime;
        this.duration = duration;
        this.students = students;
        this.studentSize = this.students.size();
        this.wantsLab = wantsLab;
        this.room = room;
    }

    public int getUnitId() {
        return unitId;
    }

    public void setUnitId(int unitID) {
        this.unitId = unitID;
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
        if (startTime == null) return null;
        return startTime.plus(duration);
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
        this.setStudentsUnits();
    }

    /**
     * This is to ensure that many-to-many relationship can be properly setup
     * in the database
     */
    public void setStudentsUnits() {
        for (Student student : this.students) {
            student.units.add(this);
        }
    }

    /**
     * Get the number of students enrolled in the unit.
     *
     * @return An int representing the number of students.
     */
    public int getStudentSize() {
        return this.studentSize;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
        this.room.units.add(this);
    }

    public boolean isWantsLab() {
        return wantsLab;
    }

    public void setWantsLab(boolean wantsLab) {
        this.wantsLab = wantsLab;
    }

}