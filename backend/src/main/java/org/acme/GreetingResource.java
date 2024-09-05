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


        var problem = new Schedule(
                List.of(
                        new Unit("math", Duration.ofHours(2), List.of(a,b,c)),
                        new Unit("science", Duration.ofHours(4), List.of(a,b,c,d,g)),
                        new Unit("physics", Duration.ofMinutes(70), List.of(f,e,g,h,i))
                        ),
                List.of(LocalTime.of(15,0),
                        LocalTime.of(16,0),
                        LocalTime.of(17,0))
//                        LocalTime.of(18,0))
        );

        Schedule solution = solverManager.solve("job 1", problem).getFinalBestSolution();
        return solution;
    }

}
