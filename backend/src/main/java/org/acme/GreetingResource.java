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

@Path("/hello")
public class GreetingResource {

    @Inject
    SolverManager<Schedule, String> solverManager;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Schedule hello() throws ExecutionException, InterruptedException {

        Student a = new Student("a");
        Student b = new Student("b");
        Student c = new Student("c");
        Student d = new Student("d");
        Student e = new Student("e");
        Student f = new Student("f");
        Student g = new Student("g");
        Student h = new Student("h");
        Student i = new Student("i");

        Room r1 = new Room("Room1");
        Room r2 = new Room("Room2");
        Room r3 = new Room("Room3");

        var problem = new Schedule(
                List.of(
                        new Unit(1, "1", Duration.ofHours(2), List.of(a)),
                        new Unit(2, "2", Duration.ofHours(2), List.of(a)),
                        new Unit(3, "3", Duration.ofHours(2), List.of(b)),
                        new Unit(4, "4", Duration.ofHours(2), List.of(b)),
                        new Unit(5, "5", Duration.ofHours(2), List.of(c)),
                        new Unit(6, "6", Duration.ofHours(2), List.of(c)),
                        new Unit(7, "7", Duration.ofMinutes(120), List.of(d))
                        ),
                List.of(
                        LocalTime.of(15,0),
                        LocalTime.of(17,0)
//                        LocalTime.of(16,0),
//                        LocalTime.of(23,0)
                ),
                List.of(r1, r2, r3)
        );


        Schedule solution = solverManager.solve("job 1", problem).getFinalBestSolution();
        return solution;
    }

}
