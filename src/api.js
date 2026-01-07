import axios from 'axios';

// DIRECT SERVICE URLS (Bypassing Gateway)
const PRODUCT_URL = 'http://localhost:8082/api';
const ORDER_URL = 'http://localhost:8083/api';
const CART_URL = 'http://localhost:8084/api';

// Helper to create axios instances
const createServiceApi = (baseUrl) => {
    const instance = axios.create({
        baseURL: baseUrl,
        headers: { 'Content-Type': 'application/json' },
    });
    instance.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    });
    return instance;
};

const productApi = createServiceApi(PRODUCT_URL);
const orderApi = createServiceApi(ORDER_URL);
const cartApi = createServiceApi(CART_URL);

// --- HELPER MAPPERS ---
const mapBackendProductToFrontend = (p) => ({
    id: p.id,
    title: p.name,
    description: p.description,
    price: p.price,
    image: p.imageUrl,
    category: "General",
    rating: { rate: 4.5, count: 10 }
});

// --- PRODUCTS ---
export const getAllProducts = async () => {
    try {
        const response = await productApi.get('/products');
        return response.data.map(mapBackendProductToFrontend);
    } catch (error) {
        console.error("Backend Error (Products):", error);
        return [];
    }
};

export const fetchProductsByCategory = async (category) => {
    const products = await getAllProducts();
    if (!category || category === 'all') return products;
    return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
};

// --- AUTH ---
export const loginUser = async (username, password) => {
    return {
        token: "mock-jwt-token-access-granted",
        user: { name: "Test User", email: "user@example.com", id: "user-123" }
    };
};

// --- CART ---
export const getCart = async () => {
    try {
        const response = await cartApi.get('/cart');
        return response.data;
    } catch (error) {
        console.warn("Backend Error (Cart):", error);
        return { items: [], totalAmount: 0 };
    }
};

export const addToCart = async (product, quantity = 1) => {
    try {
        const item = {
            skuCode: product.title.toLowerCase().replace(/\s+/g, '_') + "-" + product.id,
            productName: product.title,
            quantity: quantity,
            price: product.price,
            imageUrl: product.image
        };
        const response = await cartApi.post('/cart', item);
        return response.data;
    } catch (error) {
        console.error("Backend Error (AddToCart):", error);
        throw error;
    }
};

// --- ORDERS ---
export const placeOrder = async (cartItems, total) => {
    try {
        const orderRequest = {
            orderLineItemsDtoList: cartItems.map(item => ({
                skuCode: item.skuCode || item.id || item.productName,
                price: item.price,
                quantity: item.quantity
            }))
        };
        const response = await orderApi.post('/orders', orderRequest);
        return response.data;
    } catch (error) {
        console.error("Backend Error (Order):", error);
        throw error;
    }
};

export const getMyOrders = async () => {
    try {
        const response = await orderApi.get('/orders');
        return response.data;
    } catch (error) {
        console.warn("Backend Error (Get Orders):", error);
        return [];
    }
};

// Fallback Logic
export const fetchProducts = async () => getAllProducts();

export const checkBackendHealth = async () => {
    try {
        await productApi.get('/products');
        return true;
    } catch (e) {
        return false;
    }
};
