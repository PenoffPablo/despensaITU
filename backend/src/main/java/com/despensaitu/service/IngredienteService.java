package com.despensaitu.service;

import com.despensaitu.dto.ActualizarStockRequest;
import com.despensaitu.dto.CrearIngredienteRequest;
import com.despensaitu.dto.IngredienteDTO;
import com.despensaitu.model.Despensa;
import com.despensaitu.model.DespensaIngrediente;
import com.despensaitu.model.DespensaIngredienteId;
import com.despensaitu.model.Ingrediente;
import com.despensaitu.repository.DespensaIngredienteRepository;
import com.despensaitu.repository.DespensaRepository;
import com.despensaitu.repository.IngredienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IngredienteService {

    private final IngredienteRepository ingredienteRepository;
    private final DespensaIngredienteRepository despensaIngredienteRepository;
    private final DespensaRepository despensaRepository;

    @Transactional(readOnly = true)
    public List<IngredienteDTO> listarTodos(Integer despensaId) {
        return despensaIngredienteRepository.findByIdIdDespensa(despensaId)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public IngredienteDTO obtenerPorId(Integer idIngrediente, Integer despensaId) {
        DespensaIngredienteId id = new DespensaIngredienteId(despensaId, idIngrediente);
        DespensaIngrediente di = despensaIngredienteRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Ingrediente con ID " + idIngrediente + " no encontrado en la despensa " + despensaId + "."));
        return toDTO(di);
    }

    @Transactional
    public IngredienteDTO agregar(Integer despensaId, CrearIngredienteRequest request) {
        String descMayuscula = request.descripcion().trim().toUpperCase();

        if (descMayuscula.matches("^\\d+$")) {
            throw new IllegalArgumentException("La descripción del ingrediente no puede consistir solo de números.");
        }

        // Buscar si ya existe el ingrediente en el catálogo por su descripción normalizada
        Ingrediente ingrediente = ingredienteRepository.findByDescripcion(descMayuscula)
                .orElseGet(() -> {
                    Ingrediente nuevo = new Ingrediente();
                    nuevo.setDescripcion(descMayuscula);
                    return ingredienteRepository.save(nuevo);
                });

        DespensaIngredienteId relId = new DespensaIngredienteId(despensaId, ingrediente.getIdIngrediente());
        if (despensaIngredienteRepository.existsById(relId)) {
            throw new IllegalStateException("El ingrediente '" + descMayuscula + "' ya está registrado en la despensa " + despensaId + ".");
        }

        Despensa despensa = despensaRepository.findById(despensaId)
                .orElseThrow(() -> new IllegalArgumentException("Despensa con ID " + despensaId + " no encontrada."));

        DespensaIngrediente di = new DespensaIngrediente(relId, despensa, ingrediente, request.cantidadStock());
        DespensaIngrediente guardado = despensaIngredienteRepository.save(di);

        return toDTO(guardado);
    }

    @Transactional
    public IngredienteDTO actualizarStock(Integer idIngrediente, Integer despensaId, ActualizarStockRequest request) {
        DespensaIngredienteId id = new DespensaIngredienteId(despensaId, idIngrediente);
        DespensaIngrediente di = despensaIngredienteRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Relación despensa-ingrediente no encontrada."));

        di.setCantidadStock(request.cantidadStock());
        DespensaIngrediente actualizado = despensaIngredienteRepository.save(di);
        return toDTO(actualizado);
    }

    @Transactional
    public void borrar(Integer idIngrediente, Integer despensaId) {
        DespensaIngredienteId id = new DespensaIngredienteId(despensaId, idIngrediente);
        if (!despensaIngredienteRepository.existsById(id)) {
            throw new IllegalArgumentException("El ingrediente con ID " + idIngrediente + " no está asociado a la despensa " + despensaId + ".");
        }
        
        // Primero eliminar todas las relaciones de stock de este ingrediente para evitar fallas de FK al borrar de ingrediente
        despensaIngredienteRepository.deleteByIdIdIngrediente(idIngrediente);

        if (ingredienteRepository.existsById(idIngrediente)) {
            ingredienteRepository.deleteById(idIngrediente);
        }
    }

    private IngredienteDTO toDTO(DespensaIngrediente di) {
        return new IngredienteDTO(
                di.getIngrediente().getIdIngrediente(),
                di.getCantidadStock(),
                di.getIngrediente().getDescripcion()
        );
    }
}
