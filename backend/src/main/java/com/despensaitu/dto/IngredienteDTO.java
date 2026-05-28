package com.despensaitu.dto;

/**
 * DTO de salida para ingredientes.
 */
public record IngredienteDTO(
        Integer idIngrediente,
        double cantidadStock,
        String descripcion
) {
}
