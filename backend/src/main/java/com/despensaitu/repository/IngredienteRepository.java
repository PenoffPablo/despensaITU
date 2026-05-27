package com.despensaitu.repository;

import com.despensaitu.model.Ingrediente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IngredienteRepository extends JpaRepository<Ingrediente, Integer> {

    Optional<Ingrediente> findByNombre(String nombre);

    boolean existsByNombre(String nombre);
}
