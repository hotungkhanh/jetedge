package org.acme;

import ai.timefold.solver.core.api.domain.lookup.PlanningId;

public class Room {
    @PlanningId
    private String id;

    public Room() {}

    public Room(String id) {
        this.id = id;
    }

    //-----------------Getters and Setters--------------------//

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
