package com.despensaitu.repository;

import com.despensaitu.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Integer> {

    List<Pedido> findByClienteIdPersona(Integer idCliente);

    List<Pedido> findByMeseroIdPersona(Integer idMesero);

    List<Pedido> findByEstado(boolean estado);
}
