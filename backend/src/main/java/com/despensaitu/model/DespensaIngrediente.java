package com.despensaitu.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "despensa_ingrediente")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DespensaIngrediente {

    @EmbeddedId
    private DespensaIngredienteId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("idDespensa")
    @JoinColumn(name = "id_despensa")
    private Despensa despensa;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("idIngrediente")
    @JoinColumn(name = "id_ingrediente")
    private Ingrediente ingrediente;

    @Column(name = "cantidad_stock", nullable = false)
    private double cantidadStock;
}
