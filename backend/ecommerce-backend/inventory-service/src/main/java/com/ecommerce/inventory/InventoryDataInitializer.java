package com.ecommerce.inventory;

import com.ecommerce.inventory.model.Inventory;
import com.ecommerce.inventory.repository.InventoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class InventoryDataInitializer {

    @Bean
    public CommandLineRunner loadInventoryData(InventoryRepository inventoryRepository) {
        return args -> {
            if (inventoryRepository.count() == 0) {
                List<Inventory> inventoryList = List.of(
                    Inventory.builder().skuCode("iphone_15_pro_max").quantity(100).build(),
                    Inventory.builder().skuCode("macbook_air_m3").quantity(50).build(),
                    Inventory.builder().skuCode("sony_wh1000xm5").quantity(200).build(),
                    Inventory.builder().skuCode("samsung_s24_ultra").quantity(100).build(),
                    Inventory.builder().skuCode("nike_air_jordan_1").quantity(500).build(),
                    Inventory.builder().skuCode("adidas_ultraboost").quantity(300).build(),
                    Inventory.builder().skuCode("rolex_submariner").quantity(5).build(),
                    Inventory.builder().skuCode("dyson_v15").quantity(30).build(),
                    Inventory.builder().skuCode("nespresso_vertuo").quantity(150).build(),
                    Inventory.builder().skuCode("ps5_console").quantity(75).build()
                );

                inventoryRepository.saveAll(inventoryList);
                System.out.println("--- INVENTORY DATA SEEDED ---");
            }
        };
    }
}
