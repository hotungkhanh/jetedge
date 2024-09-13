package org.acme;

import ai.timefold.solver.core.api.solver.SolverManager;


import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.time.Duration;
import java.time.LocalTime;
import java.time.DayOfWeek;

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

        Room r1 = new Room("Room1", 1);
        Room r2 = new Room("Room2", 2);
        Room r3 = new Room("Room3", 3);

        var problem = new Schedule(
                List.of(
                        new Unit(1, "1", Duration.ofHours(2), List.of(a)),
                        new Unit(2, "2", Duration.ofHours(2), List.of(a)),
                        new Unit(3, "3", Duration.ofHours(2), List.of(a)),
                        new Unit(4, "4", Duration.ofHours(2), List.of(a)),
                        new Unit(5, "5", Duration.ofHours(2), List.of(a)),
                        new Unit(6, "6", Duration.ofHours(2), List.of(a)),
                        new Unit(7, "7", Duration.ofMinutes(120), List.of(h))
                ),
                List.of(
                        LocalTime.of(8,0),
                        LocalTime.of(10,0)
                ),
                List.of(
                        DayOfWeek.MONDAY,
                        DayOfWeek.TUESDAY,
                        DayOfWeek.WEDNESDAY
                ),
                List.of(r1)
        );


        Schedule solution = solverManager.solve("job 1", problem).getFinalBestSolution();
        return solution;
    }

}