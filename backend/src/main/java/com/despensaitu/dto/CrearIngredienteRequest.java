package com.despensaitu.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;

public record CrearIngredienteRequest(
        @PositiveOrZero(message = "El stock debe ser cero o positivo")
        double cantidadStock,

        @NotBlank(message = "La descripción es obligatoria")
        @Pattern(regexp = "^(?!\\\\d+$).+$", message = "La descripción no puede consistir solo de números")
        String descripcion
) {
}
