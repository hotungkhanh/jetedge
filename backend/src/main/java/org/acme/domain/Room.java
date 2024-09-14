package org.acme.domain;

import ai.timefold.solver.core.api.domain.lookup.PlanningId;

/**
 * Represents a room.
 *
 * @author Jet Edge
 */
public class Room {
    @PlanningId
    private String id;

    private int capacity;
    private boolean isLab;

    public Room() {
    }

    /**
     * Creates a room with its ID and capacity.
     *
     * @param id       The room’s id.
     * @param capacity The room's capacity.
     * @param isLab    Whether the room is a laboratory.
     */
    public Room(String id, int capacity, boolean isLab) {
        this.id = id;
        this.capacity = capacity;
        this.isLab = isLab;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public boolean isLab() {
        return isLab;
    }

    public void setLab(boolean lab) {
        isLab = lab;
    }
}