package org.acme.domain;

import java.util.List;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/students")
public class StudentResource {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Student> list() {
        return Student.listAll();
    }

    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createCampus(Student student) {
        student.persist();
        return Response.status(Response.Status.CREATED).entity(student).build();
    }
}
