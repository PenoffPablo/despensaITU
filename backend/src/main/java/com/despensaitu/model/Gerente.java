package com.despensaitu.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "gerente")
@Getter
@Setter
@NoArgsConstructor
@PrimaryKeyJoinColumn(name = "id_persona")
public class Gerente extends Persona {

    @Column(name = "id_gerente", unique = true)
    private Integer idGerente;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_despensa", referencedColumnName = "id_despensa", unique = true)
    private Despensa despensa;

    /**
     * Agrega un nuevo empleado al sistema.
     */
    public void agregarEmpleado() {
        // Lógica de negocio delegada al servicio
    }

    /**
     * Borra un empleado del sistema.
     */
    public void borrarEmpleado() {
        // Lógica de negocio delegada al servicio
    }

    /**
     * Modifica los datos de un empleado.
     */
    public void modificarEmpleado() {
        // Lógica de negocio delegada al servicio
    }

    /**
     * Visualiza las ventas del restaurante.
     */
    public void visualizarVentas() {
        // Lógica de negocio delegada al servicio
    }

    /**
     * Visualiza los pedidos actuales.
     */
    public void visualizarPedidos() {
        // Lógica de negocio delegada al servicio
    }

    /**
     * Genera el pago de un empleado.
     */
    public void generarPagoEmpleado(String idEmpleado) {
        // Lógica de negocio delegada al servicio
    }

    /**
     * Agrega ingredientes a la despensa.
     */
    public void agregarEnDespensa(String[] ingredientes) {
        // Lógica de negocio delegada al servicio
    }

    /**
     * Elimina ingredientes de la despensa.
     */
    public void eliminarEnDespensa(String[] ingredientes) {
        // Lógica de negocio delegada al servicio
    }
}
