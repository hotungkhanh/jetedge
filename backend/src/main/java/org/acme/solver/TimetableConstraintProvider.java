package org.acme.solver;

import ai.timefold.solver.core.api.score.buildin.hardsoft.HardSoftScore;
import ai.timefold.solver.core.api.score.stream.Constraint;
import ai.timefold.solver.core.api.score.stream.ConstraintFactory;
import ai.timefold.solver.core.api.score.stream.ConstraintProvider;
import org.acme.domain.ConflictingUnit;
import org.acme.domain.Unit;

import java.util.function.Function;

import static ai.timefold.solver.core.api.score.stream.Joiners.equal;
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
                roomCapacity(constraintFactory),
                labPreference(constraintFactory)
        };
    }

    /**
     * Penalize 1 hard score for each student with overlapping units.
     */
    private Constraint studentConflict(ConstraintFactory constraintFactory) {
        // A student can be in at most one unit at the same time.
        return constraintFactory
                // Select each pair of conflicting units.
                .forEach(ConflictingUnit.class)
                // Find the first unit.
                .join(Unit.class, equal(ConflictingUnit::getUnit1, Function.identity()))
                // Find the second unit.
                .join(Unit.class, equal((conflictingUnit, unit1) -> conflictingUnit.getUnit2(), Function.identity()),
                        // Check if the 2 units are on the same weekday ...
                        equal((conflictingUnit, unit1) -> unit1.getDayOfWeek(), Unit::getDayOfWeek),
                        // ... in the same timeslot ...
                        overlapping((conflictingUnit, unit1) -> unit1.getStartTime(),
                                (conflictingUnit, unit1) -> unit1.getEnd(),
                                Unit::getStartTime, Unit::getEnd))
                // ... and penalize each pair with a hard weight.
                .penalize(HardSoftScore.ofHard(1),
                        (conflictingUnit, unit1, unit2) -> conflictingUnit.getNumStudent())
                .asConstraint("Student conflict");

    }

    /**
     * Penalize 1 hard score for each room with overlapping units.
     */
    Constraint roomConflict(ConstraintFactory constraintFactory) {
        // A room can accommodate at most one unit at the same time.
        return constraintFactory
                // Select each pair of 2 different units ...
                .forEachUniquePair(Unit.class,
                        // ... on the same weekday ...
                        equal(Unit::getDayOfWeek),
                        // ... in the same timeslot ...
                        overlapping(Unit::getStartTime, Unit::getEnd),
                        // ... in the same room ...
                        equal(Unit::getRoom))
                // ... and penalize each pair with a hard weight.
                .penalize(HardSoftScore.ofHard(1))
                .asConstraint("Room conflict");
    }

    /**
     * Penalize 1 soft score for each student overflowing the capacity of the room.
     */
    Constraint roomCapacity(ConstraintFactory constraintFactory) {
        // A room cannot accommodate more students than its capacity.
        return constraintFactory
                .forEach(Unit.class)
                .filter(unit -> unit.getStudentSize() > unit.getRoom().getCapacity())
                .penalize(HardSoftScore.ofSoft(1),
                        unit -> unit.getStudentSize() - unit.getRoom().getCapacity())
                .asConstraint("Room capacity conflict");
    }

    /**
     * Penalize 1 soft score for each laboratory unit not assigned to a laboratory.
     */
    Constraint labPreference(ConstraintFactory constraintFactory) {
        // Some units prefer to have a laboratory room.
        return constraintFactory
                .forEach(Unit.class)
                // Select a laboratory unit ...
                .filter(Unit::isWantsLab)
                // ... in a non-lab room ...
                .filter(unit -> !unit.getRoom().isLab())
                .penalize(HardSoftScore.ofSoft(1))
                .asConstraint("Unit laboratory preference");
    }

}