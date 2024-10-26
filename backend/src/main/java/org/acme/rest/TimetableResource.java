package org.acme.rest;

import ai.timefold.solver.core.api.solver.SolverManager;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import org.acme.domain.Room;
import org.acme.domain.Student;
import org.acme.domain.Timetable;
import org.acme.domain.Unit;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;
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
    @RolesAllowed({"user"})
    @Transactional
    public Timetable handleRequest(Timetable problem) throws ExecutionException, InterruptedException {
        UUID uuid = UUID.randomUUID();
        String uuidAsString = uuid.toString();

        System.out.println("Your UUID is: " + uuidAsString);
        String name = "Job" + uuidAsString;

        findByCampusAndDelete(problem.campusName);

        // generate solution timetable with TimeFold Solver
        Timetable solution = solverManager.solve(name, problem).getFinalBestSolution();

        // store the solution timetable to the database
        solution.persist();

        return solution;
    }

    /**
     * Takes a list of Units as input to updates exisiting timetable once users 
     * make drag-and-drop modifications in frontend
     * 
     * @param updatedUnits  List of all Unit updates
     * @return              A Response object indicating status
     */
    @Path("/update")
    @PUT
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public Response timetableUpdate(List<Unit> updatedUnits) {
        List<Unit> dbUnits = Unit.listAll();
        for (Unit updatedUnit : updatedUnits) {
            if (unitUpdate(updatedUnit, dbUnits) == null) {
                return Response.serverError().build();
            }
        }
        return Response.ok().build();
    }

    /**
     * Update the time/location of a unit
     * 
     * @param updatedUnit   Unit object with updated time/location
     * @param dbUnits       List of all Unit objects in the database
     * @return              The updated Unit, null otherwise
     */
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public Unit unitUpdate(Unit updatedUnit, List<Unit> dbUnits) {
        // find existing Unit obj in db by unitId
        for (Unit unit : dbUnits) {
            if (updatedUnit.unitId == unit.unitId) {
                assert(unit.isPersistent());
                // update day of week
                unit.dayOfWeek = updatedUnit.dayOfWeek;
                // update startTime
                unit.startTime = updatedUnit.startTime;
                // if room is different
                if (unit.room.roomCode != updatedUnit.room.roomCode 
                || !unit.room.buildingId.equals(updatedUnit.room.buildingId)) {
                    // update room
                    Room newRoom;
                    if ((newRoom = findRoom(updatedUnit.room)) == null) {
                        throw new WebApplicationException("Room with building ID " + updatedUnit.room.buildingId + ", and room code " + updatedUnit.room.roomCode + " not found", 404);
                    }
                    unit.room = newRoom;
                }
                return unit;
            }
        }
        return null;
    }
    
    /**
     * Find existing Room object inside the database with 
     * desired buildingId and roomCode
     * 
     * @param inputRoom     Room object with buildingId and roomCode of desired Room
     * @return              Room object meeting the input criteria, null otherwise
     */
    public Room findRoom(Room inputRoom) {
        List<Room> rooms = Room.listAll();
        for (Room room : rooms) {
            if (room.roomCode.equals(inputRoom.roomCode) 
            && room.buildingId.equals(inputRoom.buildingId)) {
                assert(room.isPersistent());
                return room;
            }
        }
        return null;
    }

    @GET
    @RolesAllowed({"user"})
    @Produces(MediaType.APPLICATION_JSON)
    public List<Timetable> view() {
        return Timetable.listAll();
    }

    public void findByCampusAndDelete(String campusName) {
        List<Timetable> timetables = Timetable.listAll();
        for (Timetable timetable : timetables) {
            if (campusName.equals(timetable.campusName)) {
                timetable.delete();
            }
        }
    }

    @Path("/example")
    @GET
    @RolesAllowed({"user"})
    @Transactional
    @Produces(MediaType.APPLICATION_JSON)
    public Timetable solveExample() throws ExecutionException, InterruptedException {

        Student a = new Student("a");
        Student b = new Student("b");
        Student c = new Student("c");
        Student d = new Student("d");
        Student e = new Student("e");
        Student f = new Student("f");
        Student g = new Student("g");
        Student h = new Student("h");
        Student i = new Student("i");

        Room r1 = new Room("Room1", "Building1", "Adelaide", 2, true);
        Room r2 = new Room("Room2", "Building2", "Adelaide", 4, false);
        Room r3 = new Room("Room3", "Building3", "Adelaide", 4, false);

        Unit u1 = new Unit(1, "This", "Course A", Duration.ofHours(2), List.of(a, b), true);
        Unit u2 = new Unit(2, "Is", "Course A", Duration.ofHours(2), List.of(a, c, d, e), true);
        Unit u3 = new Unit(3, "A", "Course B", Duration.ofHours(2), List.of(f, g, h, i), false);
        Unit u4 = new Unit(4, "Test", "Course C", Duration.ofHours(2), List.of(a, b), false);

        var problem = new Timetable("Adelaide",
                List.of(
                        u1, u2, u3, u4
                ),

                List.of(
                        DayOfWeek.MONDAY,
                        DayOfWeek.TUESDAY,
                        DayOfWeek.WEDNESDAY,
                        DayOfWeek.THURSDAY,
                        DayOfWeek.FRIDAY
                ),

                List.of(
                        LocalTime.of(15, 0),
                        LocalTime.of(17, 0),
                        LocalTime.of(16,0),
                        LocalTime.of(23,0)
                ),
                List.of(r1, r2, r3)
        );

        findByCampusAndDelete(problem.campusName);

        Timetable solution = solverManager.solve("job 1", problem).getFinalBestSolution();

        // saves the solution timetable and all related entities to database
        solution.persist();

        return solution;
    }

}