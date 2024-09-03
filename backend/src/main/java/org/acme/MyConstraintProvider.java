package org.acme;

import ai.timefold.solver.core.api.score.buildin.hardsoft.HardSoftScore;
import ai.timefold.solver.core.api.score.stream.Constraint;
import ai.timefold.solver.core.api.score.stream.ConstraintFactory;
import ai.timefold.solver.core.api.score.stream.ConstraintProvider;
import ai.timefold.solver.core.api.score.stream.bi.BiJoiner;
import ai.timefold.solver.core.impl.util.ConstantLambdaUtils;

import static ai.timefold.solver.core.api.score.stream.Joiners.equal;
import static ai.timefold.solver.core.api.score.stream.Joiners.overlapping;

public class MyConstraintProvider implements ConstraintProvider {

    @Override
    public Constraint[] defineConstraints(ConstraintFactory constraintFactory) {
        return new Constraint[] {
//                overlaps(constraintFactory)
                studentConstraint(constraintFactory)
        };
    }

    private Constraint overlaps(ConstraintFactory constraintFactory) {
        return constraintFactory.forEachUniquePair(Class.class,
                        overlapping(Class::getStart, Class::getEnd))
                .penalize(HardSoftScore.ONE_HARD)
                .asConstraint("overlaps");
    }

    private Constraint studentConstraint(ConstraintFactory constraintFactory) {
        return  constraintFactory.forEachUniquePair(Class.class,
                equal(Class::getStudents), overlapping(Class::getStart, Class::getEnd))
                .penalize(HardSoftScore.ONE_HARD)
                .asConstraint("studentConstraint");
    }

}
