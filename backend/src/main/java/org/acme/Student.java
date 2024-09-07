package org.acme;

import ai.timefold.solver.core.api.domain.entity.PlanningEntity;
import ai.timefold.solver.core.api.domain.lookup.PlanningId;
import ai.timefold.solver.core.api.domain.solution.PlanningEntityCollectionProperty;
import ai.timefold.solver.core.api.domain.variable.PlanningListVariable;
import ai.timefold.solver.core.api.domain.variable.PlanningVariable;

import java.util.List;

//@PlanningEntity
public class Student {

//    String studentID;
//    @PlanningId
    String name;

//    @PlanningListVariable
//    List<Class> classes;

    public Student() {
    }

    public Student(String name) {
        this.name = name;
    }

//    public List<Class> getClasses() {
//        return classes;
//    }
//
//    public void setClasses(List<Class> classes) {
//        this.classes = classes;
//    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
