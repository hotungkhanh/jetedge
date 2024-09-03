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

        Student alex = new Student("alex");
        Student bob = new Student("bob");


        var problem = new Schedule(
                List.of(
                        new Class("math", Duration.ofHours(1), List.of(bob)),
                        new Class("science", Duration.ofHours(4), List.of(bob)),
                        new Class("physics", Duration.ofMinutes(70), List.of(bob))
                        ),
                List.of(LocalTime.of(15,0),
                        LocalTime.of(16,0),
                        LocalTime.of(17,0),
                        LocalTime.of(18,0))
        );

        Schedule solution = solverManager.solve("job 1", problem).getFinalBestSolution();
        return solution;
    }

}
