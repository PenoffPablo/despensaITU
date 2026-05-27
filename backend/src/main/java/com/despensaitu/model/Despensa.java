package com.despensaitu.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "despensa")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Despensa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_despensa")
    private Integer idDespensa;

    @Column(name = "id_gerente", insertable = false, updatable = false)
    private Integer idGerenteFK;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_gerente", referencedColumnName = "id_gerente")
    private Gerente gerente;
}
