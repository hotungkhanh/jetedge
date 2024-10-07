package org.acme.security.jpa;

import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.transaction.Transactional;

import org.eclipse.microprofile.config.Config;

@Singleton
public class Startup {
    @Inject
    Config config;

    @Transactional
    public void loadUsers(@Observes StartupEvent evt) {
        String username = config.getValue("frontend.username", String.class);
        String password = config.getValue("frontend.password", String.class);

        // reset and load user
        User.deleteAll();
        User.add(username, password, "user");
    }
}