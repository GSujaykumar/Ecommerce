import axios from 'axios';

// DIRECT SERVICE URLS (Via Gateway)
const GATEWAY_URL = 'http://localhost:8080/api';
const USER_URL = GATEWAY_URL;
const PRODUCT_URL = 'http://localhost:8082/api';
const ORDER_URL = GATEWAY_URL;
const CART_URL = GATEWAY_URL;
const PAYMENT_URL = GATEWAY_URL;
const NOTIFICATION_URL = GATEWAY_URL;

// Helper to create axios instances
const createServiceApi = (baseUrl) => {
    const instance = axios.create({
        baseURL: baseUrl,
        headers: { 'Content-Type': 'application/json' },
    });
    instance.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        if (token) config.headers.Authorization = `Bearer ${token}`;

        // Pass User ID explicitly to bypass stateless JWT extraction issues in backend dev mode
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const userObj = JSON.parse(storedUser);
                if (userObj.id) {
                    config.headers['X-User-Id'] = userObj.id;
                    // Also generic user-id header just in case
                    config.headers['user-id'] = userObj.id;
                }
            } catch (e) {
                console.error("Error parsing stored user", e);
            }
        }
        return config;
    });
    return instance;
};

const userApi = createServiceApi(USER_URL);
const productApi = createServiceApi(PRODUCT_URL);
const orderApi = createServiceApi(ORDER_URL);
const cartApi = createServiceApi(CART_URL);
const paymentApi = createServiceApi(PAYMENT_URL);

// --- HELPER MAPPERS ---
const mapBackendProductToFrontend = (p) => ({
    id: p.id,
    title: p.name,
    description: p.description,
    price: p.price,
    image: p.imageUrl,
    category: p.category || "General",
    subCategory: p.subCategory,
    rating: { rate: 4.5, count: 10 }
});

// --- PRODUCTS ---
export const fetchProductById = async (id) => {
    try {
        const response = await productApi.get(`/products/${id}`);
        return mapBackendProductToFrontend(response.data);
    } catch (error) {
        console.error("Backend Error (Product By ID):", error);
        return null;
    }
};

export const getAllProducts = async () => {
    try {
        const response = await productApi.get('/products');
        return response.data.map(mapBackendProductToFrontend);
    } catch (error) {
        console.error("Backend Error (Products):", error);
        return [];
    }
};

export const fetchProductsByCategory = async (category, subCategory = '') => {
    try {
        let url = '/products';
        const params = new URLSearchParams();
        if (category && category !== 'all') params.append('category', category);
        if (subCategory) params.append('subCategory', subCategory);

        const queryString = params.toString();
        if (queryString) url += `?${queryString}`;

        const response = await productApi.get(url);
        return response.data.map(mapBackendProductToFrontend);
    } catch (error) {
        console.error("Backend Error (Products by Category):", error);
        return [];
    }
};

export const fetchMensProducts = () => fetchProductsByCategory('men');
export const fetchWomensProducts = () => fetchProductsByCategory('women');
export const fetchKidsProducts = () => fetchProductsByCategory('kids');
export const fetchHomeProducts = () => fetchProductsByCategory('home');
export const fetchElectronicsProducts = () => fetchProductsByCategory('electronics');

// Sub-category fetchers
export const fetchMenShirts = () => fetchProductsByCategory('men', 'shirts');
export const fetchMenPants = () => fetchProductsByCategory('men', 'pants');
export const fetchMenTShirts = () => fetchProductsByCategory('men', 't-shirts');
export const fetchMenShoes = () => fetchProductsByCategory('men', 'shoes');
export const fetchMenSlippers = () => fetchProductsByCategory('men', 'slippers');

export const getAllCategories = async () => {
    try {
        const response = await productApi.get('/products/categories');
        return response.data;
    } catch (error) {
        console.error("Backend Error (Get Categories):", error);
        return [];
    }
};

export const fetchSubCategoriesByCategory = async (category) => {
    try {
        const response = await productApi.get(`/products/sub-categories/${category}`);
        return response.data;
    } catch (error) {
        console.error("Backend Error (Get Sub Categories):", error);
        return [];
    }
};

// --- AUTH ---
export const loginUser = async (username, password, fullName = "New User", address = "Unknown") => {
    try {
        // Dynamic Login against User Service
        const response = await userApi.post('/users/login', {
            email: username,
            password: password,
            fullName: fullName,
            address: address
        });
        return {
            token: "mock-jwt-token-access-granted", // Placeholder until full Auth Server is up
            user: response.data
        };
    } catch (error) {
        // Fallback for registration/simulation if user not found (or 404)
        if (error.response && error.response.status === 404) {
            const registerResponse = await userApi.post('/users/register', {
                email: username,
                fullName: fullName !== "New User" ? fullName : username.split('@')[0],
                address: address
            });
            return {
                token: "mock-jwt-token-access-granted",
                user: registerResponse.data
            };
        }
        throw error;
    }
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
export const placeOrder = async (cartItems, total, email, mobileNumber) => {
    try {
        const orderRequest = {
            orderLineItemsDtoList: cartItems.map(item => ({
                skuCode: item.skuCode || item.id || item.productName,
                price: item.price,
                quantity: item.quantity
            })),
            email: email,
            mobileNumber: mobileNumber
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

// --- PAYMENT ---
export const makePaymentApi = async (orderId, amount) => {
    try {
        const response = await paymentApi.post('/payment', { amount, orderId });
        return response.data;
    } catch (error) {
        console.error("Backend Error (Payment):", error);
        throw error;
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
