package org.acme;

import ai.timefold.solver.core.api.score.buildin.hardsoft.HardSoftScore;
import ai.timefold.solver.core.api.score.stream.Constraint;
import ai.timefold.solver.core.api.score.stream.ConstraintFactory;
import ai.timefold.solver.core.api.score.stream.ConstraintProvider;
import ai.timefold.solver.core.api.score.stream.Joiners;

import java.util.function.Function;

/**
 * Provides the constraints for the timetabling problem.
 *
 * @author Jet Edge
 */
public class TimetableConstraintProvider implements ConstraintProvider {

    /**
     * Enable the various implemented constraints.
     *
     * @return A list of constraints.
     */
    @Override
    public Constraint[] defineConstraints(ConstraintFactory constraintFactory) {
        return new Constraint[]{
                studentConflict(constraintFactory)

        };
    }

    /**
     * Penalize 1 hard score for each student with overlapping units.
     */
    private Constraint studentConflict(ConstraintFactory constraintFactory) {
        return constraintFactory.forEach(ConflictingUnit.class)
                .join(Unit.class, Joiners.equal(ConflictingUnit::getUnit1, Function.identity()))
                .join(Unit.class, Joiners.equal((conflictingUnit, unit1) -> conflictingUnit.getUnit2(), Function.identity()),
                        Joiners.overlapping((conflictingUnit, unit1) -> unit1.getStart(),
                                (conflictingUnit, unit1) -> unit1.getEnd(),
                                Unit::getStart, Unit::getEnd))
                .penalize(HardSoftScore.ofHard(1), (conflictingUnit, unit1, unit2) -> conflictingUnit.getNumStudent())
                .asConstraint("Student conflict");

    }


}