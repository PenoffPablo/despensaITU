package com.despensaitu.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "receta")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Receta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_receta")
    private Integer idReceta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_chef", referencedColumnName = "id_persona")
    private Chef nombreChef;

    @Column(name = "nombre_receta", nullable = false)
    private String nombreReceta;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "receta_ingrediente",
            joinColumns = @JoinColumn(name = "id_receta"),
            inverseJoinColumns = @JoinColumn(name = "id_ingrediente")
    )
    private List<Ingrediente> ingredientes = new ArrayList<>();

    @Column(name = "descripcion_proceso", columnDefinition = "TEXT")
    private String descripcionProceso;
}
