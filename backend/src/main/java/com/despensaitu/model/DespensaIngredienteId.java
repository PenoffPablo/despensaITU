package com.despensaitu.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class DespensaIngredienteId implements Serializable {

    @Column(name = "id_despensa")
    private Integer idDespensa;

    @Column(name = "id_ingrediente")
    private Integer idIngrediente;
}
