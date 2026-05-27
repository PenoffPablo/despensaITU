package com.despensaitu.service;

import com.despensaitu.dto.ActualizarStockRequest;
import com.despensaitu.dto.CrearIngredienteRequest;
import com.despensaitu.dto.IngredienteDTO;
import com.despensaitu.model.Ingrediente;
import com.despensaitu.repository.IngredienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IngredienteService {

    private final IngredienteRepository ingredienteRepository;

    @Transactional(readOnly = true)
    public List<IngredienteDTO> listarTodos() {
        return ingredienteRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public IngredienteDTO obtenerPorId(Integer id) {
        Ingrediente ing = ingredienteRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Ingrediente con ID " + id + " no encontrado."));
        return toDTO(ing);
    }

    @Transactional
    public IngredienteDTO agregar(CrearIngredienteRequest request) {
        if (ingredienteRepository.existsByNombre(request.nombre())) {
            throw new IllegalStateException("Ya existe un ingrediente con el nombre '" + request.nombre() + "'.");
        }

        Ingrediente nuevo = new Ingrediente();
        nuevo.setNombre(request.nombre());
        nuevo.setCantidadStockKilos(request.cantidadStockKilos());

        Ingrediente guardado = ingredienteRepository.save(nuevo);
        return toDTO(guardado);
    }

    @Transactional
    public IngredienteDTO actualizarStock(Integer id, ActualizarStockRequest request) {
        Ingrediente ing = ingredienteRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Ingrediente con ID " + id + " no encontrado."));

        ing.setCantidadStockKilos(request.cantidadStockKilos());
        Ingrediente actualizado = ingredienteRepository.save(ing);
        return toDTO(actualizado);
    }

    @Transactional
    public void borrar(Integer id) {
        if (!ingredienteRepository.existsById(id)) {
            throw new IllegalArgumentException("Ingrediente con ID " + id + " no encontrado.");
        }
        ingredienteRepository.deleteById(id);
    }

    private IngredienteDTO toDTO(Ingrediente ing) {
        return new IngredienteDTO(
                ing.getIdIngrediente(),
                ing.getNombre(),
                ing.getCantidadStockKilos()
        );
    }
}
