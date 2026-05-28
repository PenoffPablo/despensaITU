package com.despensaitu.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "menu")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_menu")
    private Integer idMenu;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_gerente", referencedColumnName = "id_persona")
    private Gerente miGerente;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "menu_alimento",
            joinColumns = @JoinColumn(name = "id_menu"),
            inverseJoinColumns = @JoinColumn(name = "id_alimento")
    )
    private List<Alimento> alimentos = new ArrayList<>();
}
