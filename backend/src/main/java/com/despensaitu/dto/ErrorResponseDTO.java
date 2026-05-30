package com.despensaitu.dto;

import java.time.LocalDateTime;

/**
 * DTO para estandarizar la forma en que el backend devuelve errores al frontend.
 */
public record ErrorResponseDTO(
        LocalDateTime timestamp,
        int status,
        String error,
        String message
) {
}
