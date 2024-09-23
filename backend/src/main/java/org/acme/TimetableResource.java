package org.acme;

import ai.timefold.solver.core.api.solver.SolverManager;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
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
import java.util.ArrayList;
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

    @Path("/view")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Timetable> view() {
        return Timetable.listAll();
    }

    @GET
    @Transactional
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

        Unit u1 = new Unit(1, "1", Duration.ofHours(2), List.of(a, b), true);
        Unit u2 = new Unit(2, "2", Duration.ofHours(2), List.of(a, c, d, e), true);
        Unit u3 = new Unit(3, "3", Duration.ofHours(2), List.of(f, g, h, i), false);
        Unit u4 = new Unit(4, "4", Duration.ofHours(2), List.of(a, b), false);

        // a.persist();
        // b.persist();
        // c.persist();
        // d.persist();
        // e.persist();
        // f.persist();
        // g.persist();
        // h.persist();
        // i.persist();

        // r1.persist();
        // r2.persist();
        // r3.persist();

        // u1.persist();
        // u2.persist();
        // u3.persist();
        // u4.persist();

        var problem = new Timetable(
                List.of(
                        u1, u2, u3, u4
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

        // problem.persist();

        // currenttly working
        System.out.println("problem created!!!!!!\n\n\n");

        /*
         * During this solving phase, any modifications to any Java class that
         * extend PanacheEntity, will become detached
         * 
         * i.e. whatever was already stored in the database is not being 
         * updated when the solver modifies them. When this occurs, the Java
         * object in our program goes into 'detached' state
         */
        Timetable solution = solverManager.solve("job 1", problem).getFinalBestSolution();

        solution.persist();
        // System.out.println("UNITS START: \n\n");
        // List<Unit> scheduled_units = new ArrayList<Unit>();
        // for (Unit unit : solution.units) {
        //     Unit db_unit = Unit.findById(unit.id);
        //     System.out.print(db_unit.startTime);
        //     System.out.print(unit.startTime);
        //     db_unit.dayOfWeek = unit.dayOfWeek;
        //     db_unit.startTime = unit.startTime;
        //     System.out.println("\ncheck persistence: ");
        //     System.out.print(unit.room.isPersistent());     // true
        //     System.out.print(db_unit.isPersistent());       // true
        //     db_unit.setRoom(unit.room);
        //     scheduled_units.add(unit);
        // }
        // System.out.println("UNITS DONE \n\n");

        // List<Room> scheduled_rooms = new ArrayList<Room>();
        // for (Room room : solution.rooms) {
        //     scheduled_rooms.add(room);
        // }

        // Timetable result = new Timetable(
        //     scheduled_units,
        //     List.of(
        //                 DayOfWeek.MONDAY,
        //                 DayOfWeek.TUESDAY,
        //                 DayOfWeek.WEDNESDAY
        //     ),
        //     List.of(
        //         LocalTime.of(15, 0)
        //     ),
        //     scheduled_rooms
        // );

        // result.persist();


        // for (Unit unit : solution.units) {
        //     System.out.println("unit:\n");
        //     System.out.print(unit.startTime);
        // }
        // problem.persist();

        // DEBUGGING detached entity solution
        // solution.persist();
        // Timetable.getEntityManager().clear();
        // solution = Timetable.getEntityManager().merge(solution);
        // solution.persist();
        System.out.println("finished!!!!!!");

        return solution;
    }

}