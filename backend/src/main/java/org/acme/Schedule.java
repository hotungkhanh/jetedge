package org.acme;

import ai.timefold.solver.core.api.domain.solution.PlanningEntityCollectionProperty;
import ai.timefold.solver.core.api.domain.solution.PlanningScore;
import ai.timefold.solver.core.api.domain.solution.PlanningSolution;
import ai.timefold.solver.core.api.domain.solution.ProblemFactCollectionProperty;
import ai.timefold.solver.core.api.domain.valuerange.ValueRangeProvider;
import ai.timefold.solver.core.api.score.buildin.hardsoft.HardSoftScore;
import com.fasterxml.jackson.databind.BeanProperty;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@PlanningSolution
public class Schedule {

////    @PlanningEntityCollectionProperty
//    List<Student> students;

    @PlanningEntityCollectionProperty
    List<Unit> units;

    @ValueRangeProvider
    List<LocalTime> startTimes;

    @ProblemFactCollectionProperty
    @ValueRangeProvider
    private List<Room> rooms;

    @PlanningScore
    HardSoftScore score;

    public Schedule() {

    }

    public Schedule(List<Unit> units, List<LocalTime> startTimes, List<Room> rooms) {
        this.units = units;
        this.startTimes = startTimes;
        this.rooms = rooms;
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


//    @ProblemFactCollectionProperty
//    public List<ConflictingUnit> calculateHardUnitConflictList() {
//        ArrayList<ConflictingUnit> out = new ArrayList<ConflictingUnit>();
//        for (var first : units) {
//            for (var second : units) {
//                if (first.getUnitID() >= second.getUnitID()) {
//                    continue;
//                }
//                if (!Collections.disjoint(first.getStudents(), second.getStudents())) {
//                    out.add(new ConflictingUnit(first, second));
//                }
//            }
//        }
//        return out;
//    }

    @ProblemFactCollectionProperty
    public List<ConflictingUnit> calculateSoftUnitConflictList() {
        ArrayList<ConflictingUnit> out = new ArrayList<ConflictingUnit>();
        for (var first : units) {
            for (var second : units) {
                if (first.getUnitID() >= second.getUnitID()) {
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
