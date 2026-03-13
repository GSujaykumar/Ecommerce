import axios from 'axios';

// GATEWAY URL (Routes to all microservices)
const GATEWAY_URL = 'http://localhost:8080';

// API endpoints handled via Gateway routes
const USER_URL = GATEWAY_URL;
const PRODUCT_URL = GATEWAY_URL;
const ORDER_URL = GATEWAY_URL;
const CART_URL = GATEWAY_URL;
const PAYMENT_URL = GATEWAY_URL;
const NOTIFICATION_URL = GATEWAY_URL;
const GRAPHQL_URL = `${GATEWAY_URL}/graphql`;

// GraphQL Queries
const PRODUCT_DETAILS_QUERY = `
  query GetProductDetails($id: ID!) {
    productDetails(id: $id) {
      id
      name
      description
      price
      category
      imageUrl
      stockStatus
      activeViewers
    }
  }
`;

export const fetchProductDetailsGraphQL = async (id) => {
    try {
        const response = await axios.post(GRAPHQL_URL, {
            query: PRODUCT_DETAILS_QUERY,
            variables: { id }
        });
        const data = response.data.data.productDetails;
        return {
            ...mapBackendProductToFrontend(data),
            stockStatus: data.stockStatus,
            activeViewers: data.activeViewers
        };
    } catch (error) {
        console.error("GraphQL Error:", error);
        return null;
    }
};

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
                if (userObj) {
                    const userId = userObj.id || userObj.keycloakId || "fallback-user-id";
                    config.headers['X-User-Id'] = userId;
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
    skuCode: p.skuCode,
    price: p.price,
    image: p.imageUrl,
    category: p.category || "General",
    subCategory: p.subCategory,
    rating: { rate: 4.5, count: 10 }
});

// --- PRODUCTS ---
export const fetchProductById = async (id) => {
    try {
        const response = await productApi.get(`/api/products/${id}`);
        return mapBackendProductToFrontend(response.data);
    } catch (error) {
        console.error("Backend Error (Product By ID):", error);
        return null;
    }
};

export const getAllProducts = async () => {
    try {
        const response = await productApi.get('/api/products');
        return response.data.map(mapBackendProductToFrontend);
    } catch (error) {
        console.error("Backend Error (Products):", error);
        return [];
    }
};

export const fetchProductsByCategory = async (category, subCategory = '') => {
    try {
        let url = '/api/products';
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
        const response = await productApi.get('/api/products/categories');
        return response.data;
    } catch (error) {
        console.error("Backend Error (Get Categories):", error);
        return [];
    }
};

export const fetchSubCategoriesByCategory = async (category) => {
    try {
        const response = await productApi.get(`/api/products/sub-categories/${category}`);
        return response.data;
    } catch (error) {
        console.error("Backend Error (Get Sub Categories):", error);
        return [];
    }
};

// --- AUTH ---
export const loginUser = async (username, password, fullName = "New User", address = "Unknown") => {
    try {
        // 1. Get Token from Keycloak (Direct Access Grant)
        const tokenParams = new URLSearchParams();
        tokenParams.append('client_id', 'ecommerce-client');
        tokenParams.append('grant_type', 'password');
        tokenParams.append('username', username);
        tokenParams.append('password', password);

        const tokenResponse = await axios.post(
            'http://localhost:8181/realms/ecommerce-realm/protocol/openid-connect/token',
            tokenParams,
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        const accessToken = tokenResponse.data.access_token;

        // 2. Sync with User Service to get/create profile
        const syncResponse = await userApi.post('/api/users/login', {
            email: username,
            fullName: fullName,
            address: address
        }, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        return {
            token: accessToken,
            user: syncResponse.data
        };
    } catch (error) {
        console.error("Keycloak Login Error:", error.response?.data || error.message);
        throw new Error("Invalid credentials or security server unreachable.");
    }
};

// --- CART ---
export const getCart = async () => {
    try {
        const response = await cartApi.get('/api/cart');
        return response.data;
    } catch (error) {
        console.warn("Backend Error (Cart):", error);
        return { items: [], totalAmount: 0 };
    }
};

export const addToCart = async (product, quantity = 1) => {
    try {
        const item = {
            skuCode: product.skuCode || (product.title.toLowerCase().replace(/\s+/g, '_') + "-" + product.id),
            productName: product.title,
            quantity: quantity,
            price: product.price,
            imageUrl: product.image
        };
        const response = await cartApi.post('/api/cart', item);
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
                skuCode: item.skuCode || item.id?.toString() || item.productName,
                price: item.price,
                quantity: item.quantity
            })),
            email: email,
            mobileNumber: mobileNumber
        };
        console.log('Placing order with request:', JSON.stringify(orderRequest));
        const response = await orderApi.post('/api/orders', orderRequest);
        return response.data;
    } catch (error) {
        console.error("Backend Error (Order):", error);
        throw error;
    }
};

export const getMyOrders = async () => {
    try {
        const response = await orderApi.get('/api/orders');
        return response.data;
    } catch (error) {
        console.warn("Backend Error (Get Orders):", error);
        return [];
    }
};

// --- PAYMENT ---
export const makePaymentApi = async (orderId, amount, userId) => {
    try {
        const response = await paymentApi.post('/api/payment', { amount, orderId, userId });
        return response.data;
    } catch (error) {
        console.error("Backend Error (Payment):", error);
        throw error;
    }
};

export const getPaymentByOrderId = async (orderId) => {
    try {
        const response = await paymentApi.get(`/api/payment/order/${orderId}`);
        return response.data;
    } catch (error) {
        console.warn("Backend Error (Get Payment):", error);
        return null;
    }
};

// Fallback Logic
export const fetchProducts = async () => getAllProducts();

export const checkBackendHealth = async () => {
    try {
        await productApi.get('/api/products');
        console.log("Backend connection successful");
        return true;
    } catch (e) {
        console.error("Backend connection failed:", e.message);
        return false;
    }
};
