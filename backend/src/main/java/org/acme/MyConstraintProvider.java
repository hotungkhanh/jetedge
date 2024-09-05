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
                unitStudentConflict(constraintFactory)
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

    private Constraint unitStudentConflict(ConstraintFactory constraintFactory) {
        return  constraintFactory.forEach(ConflictingUnit.class)
                .join(Unit.class, Joiners.equal(ConflictingUnit::getUnit, Function.identity()))
                .join(Unit.class, Joiners.equal((conflictingUnit, conflict) -> conflictingUnit.getConflict(), Function.identity()),
                        Joiners.overlapping((conflictingUnit, conflict) -> conflict.getStart(),
                                (conflictingUnit, conflict) -> conflict.getEnd(),
                                Unit::getStart, Unit::getEnd))
                .penalize(HardSoftScore.ONE_HARD)
                .asConstraint("Unit student conflict");

    }

}
