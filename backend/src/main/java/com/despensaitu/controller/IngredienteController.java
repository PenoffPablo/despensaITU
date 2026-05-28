package com.despensaitu.controller;

import com.despensaitu.dto.ActualizarStockRequest;
import com.despensaitu.dto.CrearIngredienteRequest;
import com.despensaitu.dto.IngredienteDTO;
import com.despensaitu.service.IngredienteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ingredientes")
@RequiredArgsConstructor
public class IngredienteController {

    private final IngredienteService ingredienteService;

    @GetMapping
    public ResponseEntity<List<IngredienteDTO>> listarTodos(
            @RequestParam(required = false, defaultValue = "1") Integer despensaId) {
        return ResponseEntity.ok(ingredienteService.listarTodos(despensaId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<IngredienteDTO> obtenerPorId(
            @PathVariable Integer id,
            @RequestParam(required = false, defaultValue = "1") Integer despensaId) {
        return ResponseEntity.ok(ingredienteService.obtenerPorId(id, despensaId));
    }

    @PostMapping
    public ResponseEntity<IngredienteDTO> agregar(
            @RequestParam(required = false, defaultValue = "1") Integer despensaId,
            @Valid @RequestBody CrearIngredienteRequest request) {
        IngredienteDTO creado = ingredienteService.agregar(despensaId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<IngredienteDTO> actualizarStock(
            @PathVariable Integer id,
            @RequestParam(required = false, defaultValue = "1") Integer despensaId,
            @Valid @RequestBody ActualizarStockRequest request) {
        return ResponseEntity.ok(ingredienteService.actualizarStock(id, despensaId, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> borrar(
            @PathVariable Integer id,
            @RequestParam(required = false, defaultValue = "1") Integer despensaId) {
        ingredienteService.borrar(id, despensaId);
        return ResponseEntity.noContent().build();
    }
}
