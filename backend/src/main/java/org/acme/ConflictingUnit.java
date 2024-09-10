package org.acme;

public class ConflictingUnit {
    Unit unit1;

    Unit unit2;

    int numStudent;

    public ConflictingUnit(Unit first, Unit second) {
        this.unit1 = first;
        this.unit2 = second;

    }

    public ConflictingUnit(Unit first, Unit second, int numStudent) {
        this.unit1 = first;
        this.unit2 = second;
        this.numStudent = numStudent;

    }

    public Unit getUnit1() {
        return unit1;
    }

    public void setUnit1(Unit unit1) {
        this.unit1 = unit1;
    }

    public Unit getUnit2() {
        return unit2;
    }

    public void setUnit2(Unit unit2) {
        this.unit2 = unit2;
    }

    public int getNumStudent() {
        return numStudent;
    }

    public void setNumStudent(int numStudent) {
        this.numStudent = numStudent;
    }
}