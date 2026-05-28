package com.despensaitu.repository;

import com.despensaitu.model.DespensaIngrediente;
import com.despensaitu.model.DespensaIngredienteId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DespensaIngredienteRepository extends JpaRepository<DespensaIngrediente, DespensaIngredienteId> {
    List<DespensaIngrediente> findByIdIdDespensa(Integer idDespensa);
    void deleteByIdIdIngrediente(Integer idIngrediente);
}
