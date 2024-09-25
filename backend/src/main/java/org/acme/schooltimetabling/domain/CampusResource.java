package org.acme.schooltimetabling.domain;

import java.util.List;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/campuses")
public class CampusResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Campus> list() {
        return Campus.listAll();
    }

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createCampus(Campus campus) {
        campus.persist();
        return Response.status(Response.Status.CREATED).entity(campus).build();
    }
}