package org.acme;

import ai.timefold.solver.core.api.solver.SolverManager;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.acme.domain.Room;
import org.acme.domain.Student;
import org.acme.domain.Timetable;
import org.acme.domain.Unit;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalTime;
import java.util.List;
import java.util.concurrent.ExecutionException;

/**
 * Entry to the timetabling program.
 * Receives a timetabling problem and outputs the solution
 * with the best optimised scores according to the provided constraints.
 *
 * @author Jet Edge
 */
@Path("/timetabling")
public class TimetableResource {

    @Inject
    SolverManager<Timetable, String> solverManager;

    @POST
    public Timetable handleRequest(Timetable problem) throws ExecutionException, InterruptedException {

        Timetable solution = solverManager.solve("job 1", problem).getFinalBestSolution();
        return solution;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Timetable hello() throws ExecutionException, InterruptedException {

        Student a = new Student("a");
        Student b = new Student("b");
        Student c = new Student("c");
        Student d = new Student("d");
        Student e = new Student("e");
        Student f = new Student("f");
        Student g = new Student("g");
        Student h = new Student("h");
        Student i = new Student("i");

        Room r1 = new Room("Room1", 2, true);
        Room r2 = new Room("Room2", 4, false);
        Room r3 = new Room("Room3", 4, false);

        var problem = new Timetable(
                List.of(
                        new Unit(1, "1", Duration.ofHours(2), List.of(a, b), true),
                        new Unit(2, "2", Duration.ofHours(2), List.of(a, c, d, e), true),
                        new Unit(3, "3", Duration.ofHours(2), List.of(f, g, h, i), false),
                        new Unit(4, "4", Duration.ofHours(2), List.of(a, b), false)
//                        new Unit(5, "5", Duration.ofHours(2), List.of(c, d, e)),
//                        new Unit(6, "6", Duration.ofHours(2), List.of(f, g, h, i))
                ),

                List.of(
                        DayOfWeek.MONDAY,
                        DayOfWeek.TUESDAY,
                        DayOfWeek.WEDNESDAY
//                        DayOfWeek.THURSDAY,
//                        DayOfWeek.FRIDAY
                ),

                List.of(
                        LocalTime.of(15, 0)
//                        LocalTime.of(17, 0)
//                        LocalTime.of(16,0),
//                        LocalTime.of(23,0)
                ),
                List.of(r1, r2, r3)
        );

        Timetable solution = solverManager.solve("job 1", problem).getFinalBestSolution();

        return solution;
    }

}