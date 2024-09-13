package org.acme.domain;

import java.util.Objects;

/**
 * Represents a student.
 *
 * @author Jet Edge
 */
public class Student {

    //    String studentID;
//    @PlanningId
    String name;

    public Student() {
    }

    /**
     * Creates a student with the specified name.
     *
     * @param name The student’s name.
     */
    public Student(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return Objects.equals(name, student.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}