package com.despensaitu.repository;

import com.despensaitu.model.Despensa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DespensaRepository extends JpaRepository<Despensa, Integer> {
}
