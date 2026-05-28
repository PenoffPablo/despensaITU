package com.despensaitu.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@DiscriminatorValue("PLATO_FUERTE")
@Getter
@Setter
@NoArgsConstructor
public class PlatoFuerte extends Alimento {
}
