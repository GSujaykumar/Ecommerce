
const FAKESTORE_URL = 'https://fakestoreapi.com/products';
const DUMMYJSON_URL = 'https://dummyjson.com/products';

// Helper to normalize FakeStoreAPI data
const normalizeFakeStore = (product) => ({
    id: `fs-${product.id}`, // specific prefix to avoid collision
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.image,
    rating: product.rating
});

// Helper to normalize DummyJSON data
const normalizeDummyJSON = (product) => ({
    id: `dj-${product.id}`,
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.thumbnail, // Mapping thumbnail to image
    rating: { rate: product.rating, count: product.stock } // normalizing rating structure roughly
});

export const fetchProducts = async () => {
    try {
        const response = await fetch(FAKESTORE_URL);
        const data = await response.json();
        return data.map(normalizeFakeStore);
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

export const fetchProductById = async (id) => {
    // Determine source based on ID prefix or try both
    try {
        if (String(id).startsWith('dj-')) {
            const realId = id.replace('dj-', '');
            const response = await fetch(`${DUMMYJSON_URL}/${realId}`);
            const data = await response.json();
            return normalizeDummyJSON(data);
        } else {
            const realId = String(id).replace('fs-', '');
            const response = await fetch(`${FAKESTORE_URL}/${realId}`);
            const data = await response.json();
            return normalizeFakeStore(data);
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
};

export const fetchProductsByCategory = async (category) => {
    try {
        const response = await fetch(`${FAKESTORE_URL}/category/${category}`);
        const data = await response.json();
        return data.map(normalizeFakeStore);
    } catch (error) {
        console.error(`Error fetching products for category ${category}:`, error);
        return [];
    }
};

// Specialized fetchers for Routes
export const fetchMensProducts = async () => {
    try {
        const response = await fetch(`${FAKESTORE_URL}/category/men's clothing`);
        const data = await response.json();
        return data.map(normalizeFakeStore);
    } catch (error) {
        return [];
    }
};

export const fetchWomensProducts = async () => {
    try {
        const response = await fetch(`${FAKESTORE_URL}/category/women's clothing`);
        const data = await response.json();
        return data.map(normalizeFakeStore);
    } catch (error) {
        return [];
    }
};

export const fetchKidsProducts = async () => {
    try {
        // Using DummyJSON 'tops' and 'sunglasses' mixed as 'Kids' for demo
        const [res1, res2] = await Promise.all([
            fetch(`${DUMMYJSON_URL}/category/tops`),
            fetch(`${DUMMYJSON_URL}/category/sunglasses`)
        ]);
        const data1 = await res1.json();
        const data2 = await res2.json();
        
        const combined = [...data1.products, ...data2.products];
        return combined.map(normalizeDummyJSON);
    } catch (error) {
        console.error("Error fetching kids products:", error);
        return [];
    }
};
