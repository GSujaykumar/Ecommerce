import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('cartItems');
        return saved ? JSON.parse(saved) : [];
    });
    const [favoriteItems, setFavoriteItems] = useState(() => {
        const saved = localStorage.getItem('favoriteItems');
        return saved ? JSON.parse(saved) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    const [orders, setOrders] = useState(() => {
        const saved = localStorage.getItem('orders');
        return saved ? JSON.parse(saved) : [];
    });

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
    }, [favoriteItems]);

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return removeFromCart(id);
        setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
    };

    const clearCart = () => setCartItems([]);

    const toggleFavorite = (product) => {
        setFavoriteItems((prev) => {
            if (prev.find((item) => item.id === product.id)) {
                return prev.filter((item) => item.id !== product.id);
            }
            return [...prev, product];
        });
    };

    const addOrder = (order) => {
        setOrders(prev => [order, ...prev]);
    };

    return (
        <ShopContext.Provider
            value={{
                cartItems,
                favoriteItems,
                orders,
                addToCart,
                removeFromCart,
                updateQuantity,
                toggleFavorite,
                addOrder,
                isCartOpen,
                setIsCartOpen,
                clearCart,
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};
