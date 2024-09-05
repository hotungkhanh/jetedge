package org.acme;

import ai.timefold.solver.core.api.domain.solution.PlanningEntityCollectionProperty;
import ai.timefold.solver.core.api.domain.solution.PlanningScore;
import ai.timefold.solver.core.api.domain.solution.PlanningSolution;
import ai.timefold.solver.core.api.domain.valuerange.ValueRangeProvider;
import ai.timefold.solver.core.api.score.buildin.hardsoft.HardSoftScore;

import java.time.LocalTime;
import java.util.List;

@PlanningSolution
public class Schedule {

////    @PlanningEntityCollectionProperty
//    List<Student> students;

    @PlanningEntityCollectionProperty
    List<Unit> units;

    @ValueRangeProvider
    List<LocalTime> startTimes;

    @PlanningScore
    HardSoftScore score;

    public Schedule() {

    }

    public Schedule(List<Unit> units, List<LocalTime> startTimes) {
        this.units = units;
        this.startTimes = startTimes;
//        this.students = students;
    }

//    public List<Student> getStudents() {
//        return students;
//    }
//
//    public void setStudents(List<Student> students) {
//        this.students = students;
//    }

    public List<Unit> getClasses() {
        return units;
    }

    public void setClasses(List<Unit> units) {
        this.units = units;
    }

    public List<LocalTime> getStartTimes() {
        return startTimes;
    }

    public void setStartTimes(List<LocalTime> startTimes) {
        this.startTimes = startTimes;
    }

    public HardSoftScore getScore() {
        return score;
    }

    public void setScore(HardSoftScore score) {
        this.score = score;
    }

}
