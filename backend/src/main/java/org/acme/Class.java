package org.acme;

import ai.timefold.solver.core.api.domain.entity.PlanningEntity;
import ai.timefold.solver.core.api.domain.lookup.PlanningId;
import ai.timefold.solver.core.api.domain.variable.PlanningListVariable;
import ai.timefold.solver.core.api.domain.variable.PlanningVariable;

import java.time.Duration;
import java.time.LocalTime;
import java.util.List;

@PlanningEntity
public class Class {

    @PlanningId
    String name;

    Duration duration;

    @PlanningVariable
    LocalTime start;

    List<Student> students;

    public Class() {
    };

    public Class(String name, Duration duration, List<Student> students) {
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
}
