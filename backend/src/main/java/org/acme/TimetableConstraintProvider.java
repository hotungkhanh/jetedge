package org.acme;

import ai.timefold.solver.core.api.score.buildin.hardsoft.HardSoftScore;
import ai.timefold.solver.core.api.score.stream.Constraint;
import ai.timefold.solver.core.api.score.stream.ConstraintFactory;
import ai.timefold.solver.core.api.score.stream.ConstraintProvider;
import ai.timefold.solver.core.api.score.stream.Joiners;
import org.acme.domain.ConflictingUnit;
import org.acme.domain.Unit;

import java.util.function.Function;

import static ai.timefold.solver.core.api.score.stream.Joiners.overlapping;

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
                studentConflict(constraintFactory),
                roomConflict(constraintFactory),
                roomCapacity(constraintFactory)
        };
    }

    /**
     * Penalize 1 hard score for each student with overlapping units.
     */
    private Constraint studentConflict(ConstraintFactory constraintFactory) {
        return constraintFactory.forEach(ConflictingUnit.class)
                .join(Unit.class, Joiners.equal(ConflictingUnit::getUnit1, Function.identity()))
                .join(Unit.class, Joiners.equal((conflictingUnit, unit1) -> conflictingUnit.getUnit2(), Function.identity()),
                        overlapping((conflictingUnit, unit1) -> unit1.getStart(),
                                (conflictingUnit, unit1) -> unit1.getEnd(),
                                Unit::getStart, Unit::getEnd))
                .penalize(HardSoftScore.ofHard(1), (conflictingUnit, unit1, unit2) -> conflictingUnit.getNumStudent())
                .asConstraint("Student conflict");

    }

    /**
     * Penalize 1 hard score for each room with overlapping units.
     */
    Constraint roomConflict(ConstraintFactory constraintFactory) {
        // A room can accommodate at most one lesson at the same time.
        return constraintFactory
                // Select each pair of 2 different lessons ...
                .forEachUniquePair(Unit.class,
                        // ... in the same timeslot ...
                        overlapping(Unit::getStart, Unit::getEnd),
                        // ... in the same room ...
                        Joiners.equal(Unit::getRoom))
                // ... and penalize each pair with a hard weight.
                .penalize(HardSoftScore.ofHard(1))
                .asConstraint("Room conflict");
    }

    /**
     * Penalize 1 soft score for each student overflowing the capacity of the room.
     */
    Constraint roomCapacity(ConstraintFactory constraintFactory) {
        return constraintFactory.forEach(Unit.class)
                .filter(unit -> unit.getStudentSize() > unit.getRoom().getCapacity())
                .penalize(HardSoftScore.ofSoft(1), unit -> unit.getStudentSize() - unit.getRoom().getCapacity())
                .asConstraint("Room capacity conflict");
    }

}