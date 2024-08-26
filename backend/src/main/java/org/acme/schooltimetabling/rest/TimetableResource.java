package org.acme.schooltimetabling.rest;

import java.util.UUID;
import java.util.concurrent.ExecutionException;
import jakarta.inject.Inject;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;

import org.acme.schooltimetabling.domain.Timetable;
import ai.timefold.solver.core.api.solver.SolverJob;
import ai.timefold.solver.core.api.solver.SolverManager;

@Path("/timetables")
public class TimetableResource {

    @Inject
    SolverManager<Timetable, UUID> solverManager;

    @POST
    @Path("/solve")
    public Timetable solve(Timetable problem) {
        UUID problemId = UUID.randomUUID();
        // Submit the problem to start solving
        SolverJob<Timetable, UUID> solverJob = solverManager.solve(problemId, problem);
        Timetable solution;
        try {
            // Wait until the solving ends
            solution = solverJob.getFinalBestSolution();
        } catch (InterruptedException | ExecutionException e) {
            throw new IllegalStateException("Solving failed.", e);
        }
        return solution;
    }

}