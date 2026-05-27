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
}
