package org.acme.domain;

import ai.timefold.solver.core.api.domain.lookup.PlanningId;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;

/**
 * Represents a room.
 *
 * @author Jet Edge
 */
@Entity
public class Room extends PanacheEntity {
    @PlanningId
    private String roomCode;

    public String buildingId;

    public int capacity;

    public boolean isLab;

    @OneToOne
    public Unit unit;

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
        this.roomCode = id;
        this.capacity = capacity;
        this.isLab = isLab;
    }

    public String getRoomCode() {
        return roomCode;
    }

    public void setRoomCode(String id) {
        this.roomCode = id;
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