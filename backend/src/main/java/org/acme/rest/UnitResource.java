package org.acme.rest;

import jakarta.annotation.security.RolesAllowed;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.acme.domain.Unit;

import java.util.List;

@Path("/units")
@RolesAllowed({"user"})
public class UnitResource {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Unit> list() {
        return Unit.listAll();
    }

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createCampus(Unit unit) {
        unit.persist();
        return Response.status(Response.Status.CREATED).entity(unit).build();
    }
}
