package com.despensaitu.service;

import com.despensaitu.dto.GerenteDTO;
import com.despensaitu.model.Despensa;
import com.despensaitu.model.Gerente;
import com.despensaitu.repository.DespensaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DespensaService {

    private final DespensaRepository despensaRepository;

    @Transactional(readOnly = true)
    public GerenteDTO obtenerGerenteDeDespensa(Integer idDespensa) {
        Despensa despensa = despensaRepository.findById(idDespensa)
                .orElseThrow(() -> new IllegalArgumentException("Despensa con ID " + idDespensa + " no encontrada."));

        Gerente gerente = despensa.getGerente();
        if (gerente == null) {
            throw new IllegalStateException("La despensa " + idDespensa + " no tiene gerente asignado.");
        }

        return new GerenteDTO(
                gerente.getIdGerente(),
                gerente.getNombre(),
                gerente.getApellido()
        );
    }
}
