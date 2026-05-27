package com.despensaitu.dto;

/**
 * DTO de salida para datos del gerente.
 */
public record GerenteDTO(
        Integer idGerente,
        String nombre,
        String apellido
) {
}
