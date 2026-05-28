package com.despensaitu.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pedido")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pedido")
    private Integer idPedido;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cliente", referencedColumnName = "id_persona")
    private Cliente cliente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_mesero", referencedColumnName = "id_persona")
    private Mesero mesero;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "pedido_alimento",
            joinColumns = @JoinColumn(name = "id_pedido"),
            inverseJoinColumns = @JoinColumn(name = "id_alimento")
    )
    private List<Alimento> alimentosAdquiridos = new ArrayList<>();

    @Column(name = "fecha_pedido")
    private LocalDate fechaPedido;

    @Column(name = "hora_pedido")
    private LocalTime horaPedido;

    @Column(name = "precio_total_pedido")
    private double precioTotalPedido;

    @Column(name = "estado")
    private boolean estado;
}
