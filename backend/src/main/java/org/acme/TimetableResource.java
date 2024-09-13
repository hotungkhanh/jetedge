package org.acme;

import ai.timefold.solver.core.api.solver.SolverManager;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

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

        Room r1 = new Room("Room1", 1);
        Room r2 = new Room("Room2", 2);
        Room r3 = new Room("Room3", 3);

        var problem = new Timetable(
                List.of(
                        new Unit(1, "1", Duration.ofHours(2), List.of(a, b)),
                        new Unit(2, "2", Duration.ofHours(2), List.of(c, d, e)),
                        new Unit(3, "3", Duration.ofHours(2), List.of(f, g, h, i)),
                        new Unit(4, "4", Duration.ofHours(2), List.of(a, b)),
                        new Unit(5, "5", Duration.ofHours(2), List.of(c, d, e)),
                        new Unit(6, "6", Duration.ofHours(2), List.of(f, g, h, i))
                ),
                List.of(
                        LocalTime.of(15, 0),
                        LocalTime.of(17, 0)
//                        LocalTime.of(16,0),
//                        LocalTime.of(23,0)
                ),
                List.of(r1, r2, r3)
        );


        Timetable solution = solverManager.solve("job 1", problem).getFinalBestSolution();
        return solution;
    }

}