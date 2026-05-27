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
    public ResponseEntity<List<IngredienteDTO>> listarTodos() {
        return ResponseEntity.ok(ingredienteService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<IngredienteDTO> obtenerPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(ingredienteService.obtenerPorId(id));
    }

    @PostMapping
    public ResponseEntity<IngredienteDTO> agregar(@Valid @RequestBody CrearIngredienteRequest request) {
        IngredienteDTO creado = ingredienteService.agregar(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<IngredienteDTO> actualizarStock(
            @PathVariable Integer id,
            @Valid @RequestBody ActualizarStockRequest request) {
        return ResponseEntity.ok(ingredienteService.actualizarStock(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> borrar(@PathVariable Integer id) {
        ingredienteService.borrar(id);
        return ResponseEntity.noContent().build();
    }
}
