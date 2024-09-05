package org.acme;

public class ConflictingUnit {
    Unit unit;

    Unit conflict;

    public ConflictingUnit(Unit first, Unit second) {
        this.unit = first;
        this.conflict = second;

    }

    public Unit getUnit() {
        return unit;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }

    public Unit getConflict() {
        return conflict;
    }

    public void setConflict(Unit conflict) {
        this.conflict = conflict;
    }
}
