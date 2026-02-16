import { useState, useEffect } from 'react';

const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Try fetching from real backend
                const response = await fetch('http://localhost:8080/api/products');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error("Failed to fetch products from backend, using mock data", err);
                // Fallback to mock data if backend is down
                setProducts([
                    { id: 1, name: "Mock iPhone 15", description: "Backend might be down", price: 999, imageUrl: "https://placehold.co/400" },
                    { id: 2, name: "Mock Galaxy", description: "Start the Spring Boot backend!", price: 899, imageUrl: "https://placehold.co/400" }
                ]);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error };
};

export default useProducts;
