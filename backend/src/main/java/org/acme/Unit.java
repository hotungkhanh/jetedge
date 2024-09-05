package org.acme;

import ai.timefold.solver.core.api.domain.entity.PlanningEntity;
import ai.timefold.solver.core.api.domain.lookup.PlanningId;
import ai.timefold.solver.core.api.domain.variable.PlanningVariable;

import java.time.Duration;
import java.time.LocalTime;
import java.util.List;

@PlanningEntity
public class Unit {

    @PlanningId
    String name;

    Duration duration;

    @PlanningVariable
    LocalTime start;

    List<Student> students;

    public Unit() {
    };

    public Unit(String name, Duration duration, List<Student> students) {
        this.name = name;
        this.duration = duration;
        this.students = students;
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
}
