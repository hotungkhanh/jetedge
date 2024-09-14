package org.acme;

import ai.timefold.solver.core.api.domain.entity.PlanningEntity;
import ai.timefold.solver.core.api.domain.lookup.PlanningId;
import ai.timefold.solver.core.api.domain.variable.PlanningVariable;

import java.time.Duration;
import java.time.LocalTime;
import java.time.DayOfWeek;
import java.util.List;

@PlanningEntity
public class Unit {

    @PlanningId
    int unitID;

    @PlanningVariable
    LocalTime start;

    @PlanningVariable
    DayOfWeek dayOfWeek;

    @PlanningVariable
    private Room room;

    String name;

    Duration duration;

    List<Student> students;

    boolean isLab;

    public Unit() {
    };

    public Unit(int unitID, String name, Duration duration, boolean isLab, List<Student> students) {
        this.unitID = unitID;
        this.name = name;
        this.duration = duration;
        this.isLab = isLab;
        this.students = students;
    }

    public Unit(int unitID, String name, Duration duration, List<Student> students, Room room) {
        this.unitID = unitID;
        this.name = name;
        this.duration = duration;
        this.students = students;
        this.room = room;
    }

    public boolean hasSameStudent(Unit otherUnit) {
        for (Student student : students) {
            if (otherUnit.getStudents().contains(student)) {
                return true;
            }
        }
        return false;
    }

    public int numSameStudent(Unit otherUnit) {
        int num = 0;

        for (Student student : students) {
            if (otherUnit.getStudents().contains(student)) {
                num++;
            }
        }
        return num;
    }

    public int getStudentSize() {
        return students.size();
    }


    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
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

    public Duration getDuration() {
        return duration;
    }

    public void setDuration(Duration duration) {
        this.duration = duration;
    }

    public boolean isLab() {
        return isLab;
    }

    public void setLab(boolean lab) {
        isLab = lab;
    }

    public void setStart(LocalTime start) {
        this.start = start;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalTime getStart() {
        return start;
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

    public DayOfWeek getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(DayOfWeek dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }
}