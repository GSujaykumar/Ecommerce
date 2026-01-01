
export const fetchProducts = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

export const fetchProductById = async (id) => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
};

export const fetchProductsByCategory = async (category) => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching products for category ${category}:`, error);
        return [];
    }
};
