package com.despensaitu.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@DiscriminatorValue("POSTRES")
@Getter
@Setter
@NoArgsConstructor
public class Postres extends Alimento {
}
