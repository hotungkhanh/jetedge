package org.acme.rest;

import jakarta.annotation.security.RolesAllowed;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.acme.domain.Room;

import java.util.List;

@Path("/rooms")
@RolesAllowed({"user"})
public class RoomResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Room> list() {
        return Room.listAll();
    }

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createCampus(Room room) {
        room.persist();
        return Response.status(Response.Status.CREATED).entity(room).build();
    }

}
