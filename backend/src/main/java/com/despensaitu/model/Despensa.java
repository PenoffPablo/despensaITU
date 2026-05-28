package com.despensaitu.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

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

    @OneToOne(mappedBy = "despensa", fetch = FetchType.LAZY)
    private Gerente gerente;

    @OneToMany(mappedBy = "despensa", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DespensaIngrediente> despensaIngredientes = new ArrayList<>();
}
