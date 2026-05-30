package com.despensaitu.exception;

import com.despensaitu.dto.ErrorResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Recurso no encontrado o argumento inválido.
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponseDTO> handleNotFound(IllegalArgumentException ex) {
        return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    /**
     * Violación de regla de negocio (ej: ingrediente duplicado).
     */
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ErrorResponseDTO> handleConflict(IllegalStateException ex) {
        return buildResponse(HttpStatus.CONFLICT, ex.getMessage());
    }

    /**
     * Errores de validación de @Valid (Bean Validation).
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseDTO> handleValidation(MethodArgumentNotValidException ex) {
        String errors = ex.getBindingResult().getFieldErrors()
                .stream()
                .map(e -> e.getField() + ": " + e.getDefaultMessage())
                .collect(Collectors.joining("; "));
        return buildResponse(HttpStatus.BAD_REQUEST, errors);
    }

    /**
     * Catch-all para errores no manejados.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDTO> handleGeneral(Exception ex) {
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Error interno del servidor: " + ex.getMessage());
    }

    private ResponseEntity<ErrorResponseDTO> buildResponse(HttpStatus status, String message) {
        ErrorResponseDTO body = new ErrorResponseDTO(
                LocalDateTime.now(),
                status.value(),
                status.getReasonPhrase(),
                message
        );
        return ResponseEntity.status(status).body(body);
    }
}
