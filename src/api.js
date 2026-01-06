import axios from 'axios';

// GATEWAY URL
const API_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// --- HELPER MAPPERS ---
const mapBackendProductToFrontend = (p) => ({
    id: p.id,
    title: p.name,          // Backend: name, Frontend: title
    description: p.description,
    price: p.price,
    image: p.imageUrl,      // Backend: imageUrl, Frontend: image
    category: "General",    // Backend doesn't have category yet
    rating: { rate: 4.5, count: 10 } // Mock rating
});

// --- PRODUCTS ---
export const getAllProducts = async () => {
    try {
        const response = await api.get('/products');
        return response.data.map(mapBackendProductToFrontend);
    } catch (error) {
        console.error("Backend Error (Products):", error);
        return fetchFallbackProducts(); // Fallback
    }
};

export const fetchProductsByCategory = async (category) => {
    // For now, fetch all and filtr since backend doesn't support category filtering yet
    const products = await getAllProducts();
    if (!category || category === 'all') return products;
    return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
};

// --- AUTH ---
export const loginUser = async (username, password) => {
    // START: MOCK LOGIN (Replace with Keycloak JS later)
    // We return a real JWT structure if possible, or a placeholder
    return {
        token: "mock-jwt-token-access-granted",
        user: {
            name: "Test User",
            email: "user@example.com",
            id: "user-123"
        }
    };
    // END: MOCK LOGIN
};

// --- CART ---
export const getCart = async () => {
    try {
        const response = await api.get('/cart');
        // Map backend cart items to frontend structure if needed
        return response.data;
    } catch (error) {
        console.warn("Backend Error (Cart):", error);
        return { items: [], totalAmount: 0 };
    }
};

export const addToCart = async (product, quantity = 1) => {
    try {
        // Map Frontend Product -> Backend CartItem Request
        const item = {
            skuCode: product.title.toLowerCase().replace(/\s+/g, '_') + "-" + product.id,
            productName: product.title,
            quantity: quantity,
            price: product.price,
            imageUrl: product.image
        };
        const response = await api.post('/cart', item);
        return response.data;
    } catch (error) {
        console.error("Backend Error (AddToCart):", error);
        // Fallback for demo: Return a mock cart
        return { items: [item], totalAmount: product.price * quantity };
    }
};

// --- ORDERS ---
export const placeOrder = async (cartItems, total) => {
    try {
        const orderRequest = {
            orderLineItemsDtoList: cartItems.map(item => ({
                skuCode: item.skuCode || item.id || item.productName, // Preferred: skuCode, then id (which is skuCode in ShopContext), then name
                price: item.price,
                quantity: item.quantity
            }))
        };
        const response = await api.post('/orders', orderRequest);
        return response.data; // Order Number
    } catch (error) {
        console.error("Backend Error (Order):", error);
        // Fallback:
        return "ORD-" + Math.floor(Math.random() * 100000);
    }
};

export const getMyOrders = async () => {
    try {
        const response = await api.get('/orders');
        return response.data;
    } catch (error) {
        console.warn("Backend Error (Get Orders):", error);
        return [];
    }
};


// Fallback Logic
export const fetchProducts = async () => getAllProducts(); // Alias for old code

const fetchFallbackProducts = async () => {
    try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        return data.map(p => ({
            id: p.id,
            title: p.title,
            description: p.description,
            price: p.price,
            image: p.image,
            category: p.category,
            rating: p.rating
        }));
    } catch (e) {
        return [];
    }
};
