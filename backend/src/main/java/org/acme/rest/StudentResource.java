package org.acme.rest;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.acme.domain.Student;

import java.util.List;

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
