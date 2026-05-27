package com.despensaitu.controller;

import com.despensaitu.dto.GerenteDTO;
import com.despensaitu.service.DespensaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/despensa")
@RequiredArgsConstructor
public class DespensaController {

    private final DespensaService despensaService;

    @GetMapping("/{id}/gerente")
    public ResponseEntity<GerenteDTO> obtenerGerente(@PathVariable Integer id) {
        return ResponseEntity.ok(despensaService.obtenerGerenteDeDespensa(id));
    }
}
