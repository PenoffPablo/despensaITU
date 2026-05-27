package com.despensaitu.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ingrediente")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ingrediente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ingrediente")
    private Integer idIngrediente;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "cantidad_stock_kilos", nullable = false)
    private Double cantidadStockKilos;
}
