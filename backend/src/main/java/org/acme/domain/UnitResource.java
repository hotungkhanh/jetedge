package org.acme.domain;

import java.util.List;

import jakarta.annotation.security.RolesAllowed;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

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
