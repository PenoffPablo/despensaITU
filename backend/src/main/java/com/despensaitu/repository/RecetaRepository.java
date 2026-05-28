package com.despensaitu.repository;

import com.despensaitu.model.Receta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecetaRepository extends JpaRepository<Receta, Integer> {

    List<Receta> findByNombreChefIdPersona(Integer idChef);
}
