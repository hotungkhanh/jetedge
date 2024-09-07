package org.acme.testendpoints;

import java.time.Duration;
import java.time.LocalTime;
import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import ai.timefold.solver.core.api.solver.SolverManager;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import org.acme.Schedule;
import org.acme.Student;
import org.acme.Unit;

@Path("/timetable")
public class AEightCFour {

    private List<Schedule> responses = new ArrayList<>();
    private List<LocalTime> times = new ArrayList<>();

    @Inject
    SolverManager<Schedule, String> solverManager;

    @POST
    public Schedule handleRequest(Schedule problem) throws ExecutionException, InterruptedException {
        Schedule solution = solverManager.solve("job 1", problem).getFinalBestSolution();
        responses.add(solution);
        times = problem.getStartTimes();
        return solution;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Schedule> getResponses() {
        return responses;
    }

    @GET
    @Path("/localtime")
    @Produces(MediaType.APPLICATION_JSON)
    public List<LocalTime> getTimes() {
        List<LocalTime> sortedTimes = times.stream()
                .sorted()  // or .sorted(Comparator.naturalOrder())
                .collect(Collectors.toList());
        return sortedTimes;
    }
}
