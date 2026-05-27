package com.despensaitu.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record CrearIngredienteRequest(
        @NotBlank(message = "El nombre es obligatorio")
        String nombre,

        @Positive(message = "El stock debe ser un número positivo")
        Double cantidadStockKilos
) {
}
