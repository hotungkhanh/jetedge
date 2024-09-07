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
//                overlaps(constraintFactory)
                hardUnitStudentConflict(constraintFactory)
        };
    }

    private Constraint overlaps(ConstraintFactory constraintFactory) {
        return constraintFactory.forEachUniquePair(Unit.class,
                        overlapping(Unit::getStart, Unit::getEnd))
                .penalize(HardSoftScore.ONE_HARD)
                .asConstraint("overlaps");
    }

    private Constraint hardStudentConstraint(ConstraintFactory constraintFactory) {
        return  constraintFactory.forEachUniquePair(Unit.class,
                        overlapping(Unit::getStart, Unit::getEnd))
                .filter(Unit::hasSameStudent)
                .penalize(HardSoftScore.ONE_HARD)
                .asConstraint("hardStudentConstraint");
    }

    private Constraint softStudentConstraint(ConstraintFactory constraintFactory) {
        return  constraintFactory.forEachUniquePair(Unit.class,
                        overlapping(Unit::getStart, Unit::getEnd))
                .penalize(HardSoftScore.ofSoft(1), Unit::numSameStudent)
                .asConstraint("softStudentConstraint");
    }

    private Constraint hardUnitStudentConflict(ConstraintFactory constraintFactory) {
        return  constraintFactory.forEach(ConflictingUnit.class)
                .join(Unit.class, Joiners.equal(ConflictingUnit::getUnit1, Function.identity()))
                .join(Unit.class, Joiners.equal((conflictingUnit, unit2) -> conflictingUnit.getUnit2(), Function.identity()),
                        Joiners.overlapping((conflictingUnit, unit2) -> unit2.getStart(),
                                (conflictingUnit, unit2) -> unit2.getEnd(),
                                Unit::getStart, Unit::getEnd))
                .penalize(HardSoftScore.ONE_HARD)
                .asConstraint("Hard unit student conflict");

    }

    private Constraint softUnitStudentConflict(ConstraintFactory constraintFactory) {
        return  constraintFactory.forEach(ConflictingUnit.class)
                .join(Unit.class, Joiners.equal(ConflictingUnit::getUnit1, Function.identity()))
                .join(Unit.class, Joiners.equal((conflictingUnit, unit2) -> conflictingUnit.getUnit2(), Function.identity()),
                        Joiners.overlapping((conflictingUnit, unit2) -> unit2.getStart(),
                                (conflictingUnit, unit2) -> unit2.getEnd(),
                                Unit::getStart, Unit::getEnd))
                .penalize(HardSoftScore.ofSoft(1))
                .asConstraint("Soft unit student conflict");

    }

}
