package com.despensaitu.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "persona")
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Persona {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_persona")
    private Integer idPersona;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "cedula")
    private String cedula;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "correo")
    private String correo;

    @Column(name = "usuario")
    private String usuario = null;

    @Column(name = "contrasenia")
    private String contrasenia = null;

    /**
     * Restablece la contraseña del usuario.
     */
    public void restablecerContrasenia() {
        this.contrasenia = null;
    }

    /**
     * Inicia sesión con las credenciales proporcionadas.
     * @param credenciales arreglo con [usuario, contrasenia]
     * @return true si las credenciales coinciden
     */
    public boolean iniciarSesion(String[] credenciales) {
        if (credenciales == null || credenciales.length < 2) {
            return false;
        }
        return credenciales[0].equals(this.usuario)
                && credenciales[1].equals(this.contrasenia);
    }
}
