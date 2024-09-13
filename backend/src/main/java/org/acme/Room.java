package org.acme;

import ai.timefold.solver.core.api.domain.lookup.PlanningId;

/** Represents a room.
 * @author Jet Edge
 */
public class Room {
    @PlanningId
    private String id;
    private int capacity;

    public Room() {}

    /** Creates a room with its ID and capacity.
     * @param id The room’s id.
     * @param capacity The room's capacity.
     */
    public Room(String id, int capacity) {
        this.id = id;
        this.capacity = capacity;
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
}