package org.acme.security.jpa;

import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import org.apache.http.HttpStatus;
import org.eclipse.microprofile.config.Config;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.get;
import static io.restassured.RestAssured.given;
import static org.hamcrest.core.Is.is;

@QuarkusTest
public class JpaSecurityRealmTest {
    @Inject
    Config config;

    @Test
    void shouldNotAccessLoginWhenAnonymous() {
        get("/login")
                .then()
                .statusCode(HttpStatus.SC_UNAUTHORIZED);
    }

    @Test
    void shouldNotAccessRoomsWhenAnonymous() {
        get("/rooms")
                .then()
                .statusCode(HttpStatus.SC_UNAUTHORIZED);
    }

    @Test
    void shouldNotAccessUnitsWhenAnonymous() {
        get("/units")
                .then()
                .statusCode(HttpStatus.SC_UNAUTHORIZED);
    }

    @Test
    void shouldAccessLoginWhenUserAuthenticated() {
        String username = config.getValue("frontend.username", String.class);
        String password = config.getValue("frontend.password", String.class);

        given()
                .auth().preemptive().basic(username, password)
                .when()
                .get("/login")
                .then()
                .statusCode(HttpStatus.SC_OK)
                .body(is(username));
    }

    @Test
    void shouldAccessRoomsWhenUserAuthenticated() {
        String username = config.getValue("frontend.username", String.class);
        String password = config.getValue("frontend.password", String.class);

        given()
                .auth().preemptive().basic(username, password)
                .when()
                .get("/rooms")
                .then()
                .statusCode(HttpStatus.SC_OK);
    }

    @Test
    void shouldAccessUnitsWhenUserAuthenticated() {
        String username = config.getValue("frontend.username", String.class);
        String password = config.getValue("frontend.password", String.class);

        given()
                .auth().preemptive().basic(username, password)
                .when()
                .get("/units")
                .then()
                .statusCode(HttpStatus.SC_OK);
    }

}