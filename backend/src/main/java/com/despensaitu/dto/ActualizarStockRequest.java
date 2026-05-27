package com.despensaitu.dto;

import jakarta.validation.constraints.PositiveOrZero;

/**
 * Request body para actualizar el stock de un ingrediente.
 */
public record ActualizarStockRequest(
        @PositiveOrZero(message = "El stock debe ser cero o positivo")
        Double cantidadStockKilos
) {
}
