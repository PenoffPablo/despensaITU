package com.despensaitu.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cliente")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@PrimaryKeyJoinColumn(name = "id_persona")
public class Cliente extends Persona {

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Pedido> pedidos = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "cliente_alimento",
            joinColumns = @JoinColumn(name = "id_cliente"),
            inverseJoinColumns = @JoinColumn(name = "id_alimento")
    )
    private List<Alimento> alimentos = new ArrayList<>();

    /**
     * Registra al cliente con los datos proporcionados.
     */
    public void registrarse(String[] datos) {
        // Lógica de negocio delegada al servicio
    }

    /**
     * Reserva una mesa para el cliente.
     */
    public void reservarMesa() {
        // Lógica de negocio delegada al servicio
    }

    /**
     * Cancela la reservación del cliente.
     */
    public void cancelarReservacion() {
        // Lógica de negocio delegada al servicio
    }
}
