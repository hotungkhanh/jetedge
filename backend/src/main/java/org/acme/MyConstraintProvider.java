package org.acme;

import ai.timefold.solver.core.api.score.buildin.hardsoft.HardSoftScore;
import ai.timefold.solver.core.api.score.stream.Constraint;
import ai.timefold.solver.core.api.score.stream.ConstraintFactory;
import ai.timefold.solver.core.api.score.stream.ConstraintProvider;
import ai.timefold.solver.core.api.score.stream.Joiners;

import java.util.function.Function;

import static ai.timefold.solver.core.api.score.stream.Joiners.equal;
import static ai.timefold.solver.core.api.score.stream.Joiners.overlapping;

public class MyConstraintProvider implements ConstraintProvider {

    @Override
    public Constraint[] defineConstraints(ConstraintFactory constraintFactory) {
        return new Constraint[] {
//                overlaps(constraintFactory),
                hardUnitStudentConflict(constraintFactory),
                roomConflict(constraintFactory),
                roomCapacity(constraintFactory),
                labConstraint(constraintFactory)
        };
    }

    private Constraint overlaps(ConstraintFactory constraintFactory) {
        return constraintFactory.forEachUniquePair(Unit.class,
                        overlapping(Unit::getStart, Unit::getEnd))
                .filter((unit1, unit2) -> unit1.getDayOfWeek() == unit2.getDayOfWeek())
                .penalize(HardSoftScore.ONE_HARD)
                .asConstraint("overlaps");
    }

    private Constraint hardStudentConstraint(ConstraintFactory constraintFactory) {
        return  constraintFactory.forEachUniquePair(Unit.class,
                        overlapping(Unit::getStart, Unit::getEnd))
                .filter(Unit::hasSameStudent)
                .filter((unit1, unit2) -> unit1.getDayOfWeek() == unit2.getDayOfWeek())
                .penalize(HardSoftScore.ONE_HARD)
                .asConstraint("hardStudentConstraint");
    }

    private Constraint softStudentConstraint(ConstraintFactory constraintFactory) {
        return  constraintFactory.forEachUniquePair(Unit.class,
                        overlapping(Unit::getStart, Unit::getEnd))
                .filter((unit1, unit2) -> unit1.getDayOfWeek() == unit2.getDayOfWeek())
                .penalize(HardSoftScore.ofSoft(1), Unit::numSameStudent)
                .asConstraint("softStudentConstraint");
    }

    private Constraint hardUnitStudentConflict(ConstraintFactory constraintFactory) {
        return  constraintFactory.forEach(ConflictingUnit.class)
                .join(Unit.class, Joiners.equal(ConflictingUnit::getUnit1, Function.identity()))
                .join(Unit.class, Joiners.equal((conflictingUnit, unit1) -> conflictingUnit.getUnit2(), Function.identity()),
                        Joiners.equal((conflictingUnit, unit1) -> unit1.getDayOfWeek(), Unit::getDayOfWeek),
                        Joiners.overlapping((conflictingUnit, unit1) -> unit1.getStart(),
                                (conflictingUnit, unit1) -> unit1.getEnd(),
                                Unit::getStart, Unit::getEnd))
//                .filter((conflictingUnit, unit1, unit2) -> unit1.getDayOfWeek() == unit2.getDayOfWeek())
                .penalize(HardSoftScore.ONE_HARD)
                .asConstraint("Hard unit student conflict");

    }

    private Constraint softUnitStudentConflict(ConstraintFactory constraintFactory) {
        return  constraintFactory.forEach(ConflictingUnit.class)
                .join(Unit.class, Joiners.equal(ConflictingUnit::getUnit1, Function.identity()))
                .join(Unit.class, Joiners.equal((conflictingUnit, unit1) -> conflictingUnit.getUnit2(), Function.identity()),
                        Joiners.overlapping((conflictingUnit, unit1) -> unit1.getStart(),
                                (conflictingUnit, unit1) -> unit1.getEnd(),
                                Unit::getStart, Unit::getEnd))
                .filter((conflictingUnit, unit1, unit2) -> unit1.getDayOfWeek() == unit2.getDayOfWeek())
                .penalize(HardSoftScore.ofHard(1), (conflictingUnit, unit1, unit2) -> conflictingUnit.getNumStudent())
                .asConstraint("Soft unit student conflict");

    }

    Constraint roomConflict(ConstraintFactory constraintFactory) {
        // A room can accommodate at most one lesson at the same time.
        return constraintFactory
                // Select each pair of 2 different lessons ...
                .forEachUniquePair(Unit.class,
                        Joiners.equal(Unit::getDayOfWeek),
                        // ... in the same timeslot ...
                        overlapping(Unit::getStart, Unit::getEnd),
                        // ... in the same room ...
                        Joiners.equal(Unit::getRoom))
//                .filter((unit1, unit2) -> unit1.getDayOfWeek() == unit2.getDayOfWeek())
                // ... and penalize each pair with a hard weight.
                .penalize(HardSoftScore.ONE_HARD)
                .asConstraint("Room conflict");
    }

    Constraint roomCapacity(ConstraintFactory constraintFactory) {
        return constraintFactory.forEach(Unit.class)
                .filter(unit -> unit.getStudentSize() > unit.getRoom().getCapacity())
                .penalize(HardSoftScore.ofSoft(1), unit -> unit.getStudentSize() - unit.getRoom().getCapacity())
                .asConstraint("Room Capacity Constraint");
    }

    Constraint labConstraint(ConstraintFactory constraintFactory) {
        return constraintFactory.forEach(Unit.class)
                .filter(unit -> unit.isLab() == true)
                .filter(unit -> unit.getRoom().isLab() == false)
                .penalize(HardSoftScore.ofSoft(1))
                .asConstraint("Lab Constraint");
    }
}