package org.acme;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.acme.domain.Unit;
import org.acme.domain.Room;
import org.acme.domain.Student;
import org.acme.domain.Timetable;
import org.acme.domain.ConflictingUnit;

import jakarta.inject.Inject;
import ai.timefold.solver.test.api.score.stream.ConstraintVerifier;
import org.acme.solver.TimetableConstraintProvider;
import org.junit.jupiter.api.Test;

import io.quarkus.test.junit.QuarkusTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@QuarkusTest
public class TimetableConstraintProviderTest {
    private static final Room ROOM1 = new Room("1", 2, true);
    private static final Room ROOM2 = new Room("2", 2, false);
    private static final Room ROOM3 = new Room("3", 2, true);
    private static final Student STUDENT1 = new Student("student1");
    private static final Student STUDENT2 = new Student("student2");
    private static final Student STUDENT3 = new Student("student3");
    private static final Student STUDENT4 = new Student("student4");
    private static final Student STUDENT5 = new Student("student5");
    private static final DayOfWeek DAY_OF_WEEK = DayOfWeek.MONDAY;
    private static final LocalTime START_TIME = LocalTime.of(8, 0);
    private static final Duration DURATION = Duration.ofMinutes(120);

    @Inject
    ConstraintVerifier<TimetableConstraintProvider, Timetable> constraintVerifier;

    /**
     * Student Constraint: Penalize 1 if a student is attending two units at the same time.
     */
//    @Test
//    void studentConflict() {
//        Unit unit1 = new Unit(1, "unit1", DAY_OF_WEEK, START_TIME, DURATION, List.of(STUDENT1),true, ROOM1);
//        Unit unit2 = new Unit(2, "unit2", DAY_OF_WEEK, START_TIME, DURATION, List.of(STUDENT1),false, ROOM2);
//        Unit unit3 = new Unit(3, "unit3", DAY_OF_WEEK, START_TIME, DURATION, List.of(STUDENT3),true, ROOM3);
//
//        constraintVerifier.verifyThat(TimetableConstraintProvider::studentConflict)
//                .given(unit1, unit2, unit3)
//                .penalizesBy(1);
//    }


    /**
     * Room Constraint: Penalize 1 if a room is occupied by two units at the same time.
     */
    @Test
    void roomConflict() {
        Unit firstUnit = new Unit(1, "unit1", DAY_OF_WEEK, START_TIME, DURATION, List.of(STUDENT1),true, ROOM1);
        Unit conflictingUnit = new Unit(2, "unit2", DAY_OF_WEEK, START_TIME, DURATION, List.of(STUDENT2),true, ROOM1);
        Unit nonConflictingUnit = new Unit(3, "unit3", DAY_OF_WEEK, START_TIME, DURATION, List.of(STUDENT3),false, ROOM2);
        constraintVerifier.verifyThat(TimetableConstraintProvider::roomConflict)
                .given(firstUnit, conflictingUnit, nonConflictingUnit)
                .penalizesBy(1);
    }

    /**
     * Room Capacity Constraint: Penalize 1 if a room is occupied by more students than its capacity.
     */
    @Test
    void roomCapacityConflict() {
        Unit firstUnit = new Unit(1, "unit1", DAY_OF_WEEK, START_TIME, DURATION, List.of(STUDENT1),true, ROOM1);
        Unit conflictingUnit = new Unit(2, "unit2", DAY_OF_WEEK, START_TIME, DURATION, List.of(STUDENT2, STUDENT3, STUDENT4),false, ROOM2);
        Unit nonConflictingUnit = new Unit(3, "unit3", DAY_OF_WEEK, START_TIME, DURATION, List.of(STUDENT5),true, ROOM3);
        constraintVerifier.verifyThat(TimetableConstraintProvider::roomCapacity)
                .given(firstUnit, conflictingUnit, nonConflictingUnit)
                .penalizesBy(1);
    }
}
