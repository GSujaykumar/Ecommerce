import com.ecommerce.product.dto.ProductResponse;
import com.ecommerce.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.ChatClient;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.embedding.EmbeddingClient;
import org.springframework.ai.vectorstore.SearchRequest;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products/ai")
@RequiredArgsConstructor
public class AiChatController {

    private final ChatClient chatClient;
    private final ProductService productService;
    private final VectorStore vectorStore;
    private final EmbeddingClient embeddingClient;

    @GetMapping("/chat")
    public String chat(@RequestParam(value = "message") String message) {
        // Simple RAG implementation: Inject product context into AI
        String productNames = productService.getAllProducts(null, null).stream()
                .map(p -> p.name() + " (" + p.category() + ")")
                .collect(Collectors.joining(", "));

        String systemPrompt = "You are a helpful E-commerce assistant for ObitoStore. " +
                "The current products in stock are: " + productNames + ". " +
                "Answer the customer's question based ONLY on these products. " +
                "If they ask for something we don't have, politely suggest the closest match or say we don't have it yet.";

        Prompt prompt = new Prompt(List.of(
                new org.springframework.ai.chat.messages.SystemMessage(systemPrompt),
                new UserMessage(message)
        ));

        return chatClient.call(prompt).getResult().getOutput().getContent();
    }

    @GetMapping("/semantic-search")
    public List<ProductResponse> semanticSearch(@RequestParam("q") String query) {
        // High-level AI Vector Search: Understands meaning, not just keywords
        return vectorStore.similaritySearch(
                SearchRequest.query(query)
                        .withTopK(5)
                        .withSimilarityThreshold(0.7)
        ).stream()
        .map(doc -> productService.getProductById(Long.parseLong(doc.getId())))
        .collect(Collectors.toList());
    }
}
