package org.acme.domain;

import ai.timefold.solver.core.api.domain.entity.PlanningEntity;
import ai.timefold.solver.core.api.domain.lookup.PlanningId;
import ai.timefold.solver.core.api.domain.variable.PlanningVariable;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;


/**
 * Represents a unit.
 *
 * @author Jet Edge
 */
@Entity
@PlanningEntity
public class Unit extends PanacheEntity {

    // TODO: change unit to be the owner, rather than the student being owner
    @JsonIgnoreProperties("units")
    @ManyToMany(mappedBy = "units", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    @JsonManagedReference
    public List<Student> students;

    @PlanningId
    public int unitID;

    public String name;

    public Duration duration;

    @PlanningVariable
    public DayOfWeek dayOfWeek;

    @PlanningVariable
    public LocalTime startTime;

    /* 
        currently each unit only has 1 'slot' on the timetable, so it can only
        be associated with one room, but in the final product, we would most 
        likely have to change this to a many-to-many relationship 
        i.e. list of Rooms
    */
    @JsonIgnoreProperties("units")
    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "room_id")
    @JsonManagedReference
    @PlanningVariable
    public Room room;

    public boolean wantsLab;

    @JsonIgnoreProperties("units")
    @ManyToMany(mappedBy = "units", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    @JsonManagedReference
    @JsonIgnore
    public List<Timetable> timetables = new ArrayList<Timetable>();

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
        this.setStudentsUnits();
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
        this.setStudentsUnits();
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
        if (startTime == null) return null;
        return startTime.plus(duration);
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
        this.setStudentsUnits();;
    }

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
        return students.size();
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