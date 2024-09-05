package org.acme;

import ai.timefold.solver.core.api.score.buildin.hardsoft.HardSoftScore;
import ai.timefold.solver.core.api.score.stream.Constraint;
import ai.timefold.solver.core.api.score.stream.ConstraintFactory;
import ai.timefold.solver.core.api.score.stream.ConstraintProvider;

import static ai.timefold.solver.core.api.score.stream.Joiners.equal;
import static ai.timefold.solver.core.api.score.stream.Joiners.overlapping;

public class MyConstraintProvider implements ConstraintProvider {

    @Override
    public Constraint[] defineConstraints(ConstraintFactory constraintFactory) {
        return new Constraint[] {
//                overlaps(constraintFactory)
                softStudentConstraint(constraintFactory)
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

}
