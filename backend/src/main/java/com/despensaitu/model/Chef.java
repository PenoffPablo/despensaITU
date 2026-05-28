package com.despensaitu.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "chef")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@PrimaryKeyJoinColumn(name = "id_persona")
public class Chef extends Empleado {

    @Column(name = "salario")
    private double salario;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "chef_ingrediente",
            joinColumns = @JoinColumn(name = "id_chef"),
            inverseJoinColumns = @JoinColumn(name = "id_ingrediente")
    )
    private List<Ingrediente> misIngredientes = new ArrayList<>();

    @OneToMany(mappedBy = "nombreChef", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Receta> recetas = new ArrayList<>();
}
