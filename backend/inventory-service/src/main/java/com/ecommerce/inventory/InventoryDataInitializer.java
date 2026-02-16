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
            List<Inventory> inventoryList = List.of(
                // Electronics
                Inventory.builder().skuCode("elec_macbook_m3").quantity(50).build(),
                Inventory.builder().skuCode("elec_sony_headphones").quantity(100).build(),
                Inventory.builder().skuCode("elec_samsung_monitor").quantity(30).build(),
                Inventory.builder().skuCode("elec_dji_drone").quantity(20).build(),
                Inventory.builder().skuCode("elec_ps5_console").quantity(40).build(),
                Inventory.builder().skuCode("elec_switch_oled").quantity(60).build(),
                Inventory.builder().skuCode("elec_kindle_pw").quantity(100).build(),
                Inventory.builder().skuCode("elec_ipad_air").quantity(70).build(),
                Inventory.builder().skuCode("elec_gopro_12").quantity(80).build(),
                Inventory.builder().skuCode("elec_anker_pb").quantity(200).build(),

                // Men's (Including new)
                Inventory.builder().skuCode("men_cotton_tee").quantity(100).build(),
                Inventory.builder().skuCode("men_slim_denim").quantity(100).build(),
                Inventory.builder().skuCode("men_suit_black").quantity(50).build(),
                Inventory.builder().skuCode("men_knit_polo").quantity(60).build(),
                Inventory.builder().skuCode("men_hiking_boots").quantity(40).build(),
                Inventory.builder().skuCode("men_cargo_joggers").quantity(120).build(),
                
                // Women's (Including new)
                Inventory.builder().skuCode("women_floral_dress").quantity(100).build(),
                Inventory.builder().skuCode("women_wrap_dress").quantity(80).build(),
                Inventory.builder().skuCode("women_pleated_skirt").quantity(90).build(),
                Inventory.builder().skuCode("women_toe_flats").quantity(110).build(),

                // Kids'
                Inventory.builder().skuCode("kids_graphic_tee").quantity(200).build(),
                Inventory.builder().skuCode("kids_hoodie").quantity(100).build(),

                // Home
                Inventory.builder().skuCode("home_lamp").quantity(100).build(),
                Inventory.builder().skuCode("home_vase_set").quantity(100).build()
            );

            for (Inventory inv : inventoryList) {
                if (!inventoryRepository.existsBySkuCode(inv.getSkuCode())) {
                    inventoryRepository.save(inv);
                }
            }
            System.out.println("--- MASSIVE INVENTORY SEEDING COMPLETE (" + inventoryList.size() + " ENTRIES) ---");
        };
    }
}
