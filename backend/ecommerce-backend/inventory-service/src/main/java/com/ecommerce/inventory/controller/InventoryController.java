package com.ecommerce.inventory.controller;

import com.ecommerce.inventory.dto.InventoryResponse;
import com.ecommerce.inventory.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    // http://localhost:8082/api/inventory?skuCode=iphone-13&skuCode=iphone-13-red
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<InventoryResponse> isInStock(@RequestParam List<String> skuCode) {
        return inventoryService.isInStock(skuCode);
    }
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public String addStock(@RequestBody com.ecommerce.inventory.dto.InventoryRequest inventoryRequest) {
        inventoryService.addStock(inventoryRequest.skuCode(), inventoryRequest.quantity());
        return "Stock added";
    }
}
record InventoryRequest(String skuCode, Integer quantity) {}
