package com.despensaitu.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "empleado")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@PrimaryKeyJoinColumn(name = "id_persona")
public class Empleado extends Persona {

    @Column(name = "fecha_vinculacion")
    private LocalDate fechaVinculacion;

    @Column(name = "hora_ingreso")
    private LocalTime horaIngreso;

    @Column(name = "hora_salida")
    private LocalTime horaSalida;

    /**
     * Registra la hora de entrada del empleado.
     */
    public void registrarEntrada(LocalTime horaEntrada) {
        this.horaIngreso = horaEntrada;
    }

    /**
     * Registra la hora de salida del empleado.
     */
    public void registrarSalida(LocalTime horaSalida) {
        this.horaSalida = horaSalida;
    }
}
