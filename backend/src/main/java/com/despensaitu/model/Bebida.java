package com.despensaitu.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@DiscriminatorValue("BEBIDA")
@Getter
@Setter
@NoArgsConstructor
public class Bebida extends Alimento {
}
