package com.ecommerce.inventory;

import com.ecommerce.inventory.model.Inventory;
import com.ecommerce.inventory.repository.InventoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class InventoryDataInitializer {

    @Bean
    public CommandLineRunner loadInventoryData(InventoryRepository inventoryRepository) {
        return args -> {
            if (inventoryRepository.count() == 0) {
                inventoryRepository.save(Inventory.builder().skuCode("iphone_15-1").quantity(100).build());
                inventoryRepository.save(Inventory.builder().skuCode("samsung_galaxy_s24-2").quantity(100).build());
                inventoryRepository.save(Inventory.builder().skuCode("sony_headphones-3").quantity(50).build());
                inventoryRepository.save(Inventory.builder().skuCode("macbook_pro-4").quantity(10).build());
            }
        };
    }
}
