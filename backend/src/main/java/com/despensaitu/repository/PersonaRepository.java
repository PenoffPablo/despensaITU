package com.despensaitu.repository;

import com.despensaitu.model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PersonaRepository extends JpaRepository<Persona, Integer> {

    Optional<Persona> findByUsuario(String usuario);

    Optional<Persona> findByCedula(String cedula);

    boolean existsByCedula(String cedula);
}
