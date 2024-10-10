package org.acme.domain;

import ai.timefold.solver.core.api.domain.lookup.PlanningId;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Represents a room.
 *
 * @author Jet Edge
 */
@Entity
public class Room extends PanacheEntity {

    @PlanningId
    public String roomCode;

    public String buildingId;

    public String campus;

    public int capacity;

    public boolean isLab;

    /**
     * A list of units that are taught in a Room
     */
    @JsonIgnoreProperties("room")
    @OneToMany(mappedBy = "room", orphanRemoval = false)
    @JsonIgnore
    public List<Unit> units = new ArrayList<Unit>();

    /**
     * A list of timetables that the Room is a part of
     */
    @JsonIgnoreProperties("rooms")
    @ManyToMany(mappedBy = "rooms", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    public List<Timetable> timetables = new ArrayList<Timetable>();

    public Room() {
    }

    /**
     * Creates a room with its ID and capacity.
     *
     * @param id         The room’s id.
     * @param buildingId The building that the room belongs to.
     * @param campus     The campus that the room belongs to.
     * @param capacity   The room's capacity.
     * @param isLab      Whether the room is a laboratory.
     */
    public Room(String id, String buildingId, String campus, int capacity, boolean isLab) {
        this.roomCode = id;
        this.buildingId = buildingId;
        this.campus = campus;
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