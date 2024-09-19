package org.acme.domain;

import java.util.Objects;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

/**
 * Represents a student.
 *
 * @author Jet Edge
 */
@Entity
public class Student extends PanacheEntity{

    //    String studentID;

    public String name;

    @ManyToOne
    public Unit unit;

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