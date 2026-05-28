package com.despensaitu.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "mesero")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@PrimaryKeyJoinColumn(name = "id_persona")
public class Mesero extends Empleado {

    @Column(name = "salario")
    private double salario;

    @OneToMany(mappedBy = "mesero", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Pedido> pedidos = new ArrayList<>();

    /**
     * Toma un pedido con los alimentos indicados.
     */
    public void tomarPedido(String[] alimentos) {
        // Lógica de negocio delegada al servicio
    }

    /**
     * Cancela un pedido por su identificador.
     */
    public void cancelarPedido(String idPedido) {
        // Lógica de negocio delegada al servicio
    }

    /**
     * Modifica un pedido existente.
     */
    public void modificarPedido(String idPedido) {
        // Lógica de negocio delegada al servicio
    }

    /**
     * Entrega un pedido al cliente.
     */
    public void entregarPedido(String idPedido) {
        // Lógica de negocio delegada al servicio
    }
}
