package com.despensaitu.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@DiscriminatorValue("ADICIONALES")
@Getter
@Setter
@NoArgsConstructor
public class Adicionales extends Alimento {
}
