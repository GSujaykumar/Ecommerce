package com.ecommerce.inventory.service;

import com.ecommerce.inventory.grpc.InventoryRequest;
import com.ecommerce.inventory.grpc.InventoryResponse;
import com.ecommerce.inventory.grpc.InventoryServiceGrpc;
import com.ecommerce.inventory.grpc.StockInfo;
import com.ecommerce.inventory.repository.InventoryRepository;
import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import net.devh.boot.grpc.server.service.GrpcService;

import java.util.List;
import java.util.stream.Collectors;

@GrpcService
@RequiredArgsConstructor
public class InventoryGrpcService extends InventoryServiceGrpc.InventoryServiceImplBase {

    private final InventoryRepository inventoryRepository;

    @Override
    public void isInStock(InventoryRequest request, StreamObserver<InventoryResponse> responseObserver) {
        List<String> skuCodes = request.getSkuCodeList();
        
        List<StockInfo> stockInfos = inventoryRepository.findBySkuCodeIn(skuCodes).stream()
                .map(inventory -> StockInfo.newBuilder()
                        .setSkuCode(inventory.getSkuCode())
                        .setIsInStock(inventory.getQuantity() > 0)
                        .build())
                .collect(Collectors.toList());

        // Handle missing SKU codes (return not in stock)
        skuCodes.stream()
            .filter(code -> stockInfos.stream().noneMatch(si -> si.getSkuCode().equals(code)))
            .forEach(code -> stockInfos.add(StockInfo.newBuilder()
                    .setSkuCode(code)
                    .setIsInStock(false)
                    .build()));

        InventoryResponse response = InventoryResponse.newBuilder()
                .addAllStockInfo(stockInfos)
                .build();

        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}
