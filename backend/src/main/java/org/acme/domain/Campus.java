package org.acme.domain;

// import java.util.List;
import jakarta.persistence.*;
import io.quarkus.hibernate.orm.panache.PanacheEntity;

@Entity
public class Campus extends PanacheEntity {

    public String name;

    public Campus() {
    }

    public Campus(String name) {
        this.name = name;
    }

}