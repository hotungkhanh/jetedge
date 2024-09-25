package org.acme.domain;

/**
 * Represents a pair of conflicting units, which are units with common students.
 *
 * @author Jet Edge
 */
public class ConflictingUnit {
    private Unit unit1;

    private Unit unit2;

    private int numStudent;

    /**
     * Creates a pair of conflicting units.
     *
     * @param first  The first unit.
     * @param second The second unit.
     */
    public ConflictingUnit(Unit first, Unit second) {
        this.unit1 = first;
        this.unit2 = second;
    }

    /**
     * Creates a pair of conflicting units.
     *
     * @param first      The first unit.
     * @param second     The second unit.
     * @param numStudent The number of common students.
     */
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