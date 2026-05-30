package com.despensaitu.repository;

import com.despensaitu.model.DespensaIngrediente;
import com.despensaitu.model.DespensaIngredienteId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DespensaIngredienteRepository extends JpaRepository<DespensaIngrediente, DespensaIngredienteId> {
    List<DespensaIngrediente> findByIdIdDespensa(Integer idDespensa);
    Page<DespensaIngrediente> findByIdIdDespensa(Integer idDespensa, Pageable pageable);
    void deleteByIdIdIngrediente(Integer idIngrediente);
}
