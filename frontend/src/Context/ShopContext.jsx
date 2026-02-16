import React, { createContext, useState, useEffect } from 'react';
import { addToCart as apiAddToCart, getCart as apiGetCart } from '../api';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
    // Auth State
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });

    // Cart State
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('cartItems');
        return saved ? JSON.parse(saved) : [];
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    // Favorites & Orders (Local only for now)
    const [favoriteItems, setFavoriteItems] = useState(() => {
        const saved = localStorage.getItem('favoriteItems');
        return saved ? JSON.parse(saved) : [];
    });
    const [orders, setOrders] = useState(() => {
        const saved = localStorage.getItem('orders');
        return saved ? JSON.parse(saved) : [];
    });

    // --- EFFECTS ---
    useEffect(() => {
        if (user) localStorage.setItem('user', JSON.stringify(user));
        else localStorage.removeItem('user');
    }, [user]);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
    }, [favoriteItems]);

    useEffect(() => {
        // When User logs in, sync cart and orders from Backend
        if (user) {
            const syncCart = async () => {
                const backendCart = await apiGetCart();
                if (backendCart && backendCart.items) {
                    const mappedItems = backendCart.items.map(item => ({
                        id: item.skuCode, // usage sku as ID
                        title: item.productName,
                        price: item.price,
                        image: item.imageUrl,
                        quantity: item.quantity
                    }));
                    setCartItems(mappedItems);
                }
            };
            syncCart();

            const syncOrders = async () => {
                try {
                    const { getMyOrders } = await import('../api');
                    const backendOrders = await getMyOrders();
                    if (backendOrders) {
                        // Map Backend OrderResponse -> Frontend Order Structure
                        const mappedOrders = backendOrders.map(o => ({
                            id: o.orderNumber,
                            date: o.placedAt ? new Date(o.placedAt).toLocaleDateString() : 'N/A',
                            total: `$${o.totalPrice}`,
                            status: o.status,
                            paymentMethod: 'Credit Card', // Mock
                            shippingAddress: { // Backend doesn't store this yet, use placeholders
                                name: "You",
                                address: "Saved Address",
                                city: "-",
                                zip: "-",
                                email: user.email || ""
                            },
                            items: (o.items || []).map(i => ({
                                id: i.skuCode,
                                title: i.skuCode,
                                name: i.skuCode, // Compatibility with OrderHistory
                                price: i.price,
                                priceFormatted: `$${i.price}`,
                                quantity: i.quantity,
                                image: "https://via.placeholder.com/150"
                            }))
                        }));
                        // Sort by date desc (if possible) or just reverse
                        setOrders(mappedOrders.reverse());
                    }
                } catch (e) {
                    console.error("Failed to sync orders", e);
                }
            };
            syncOrders();
        }
    }, [user]);

    // --- ACTIONS ---

    const addToCart = async (product) => {
        // Optimistic UI Update first
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

        // Backend Sync
        if (user) {
            await apiAddToCart(product, 1);
        }
    };

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
        // TODO: Call API to remove
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

    const login = (userData, token) => {
        setUser(userData);
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        setCartItems([]);
        setFavoriteItems([]);
        setOrders([]);
    };

    return (
        <ShopContext.Provider
            value={{
                cartItems,
                favoriteItems,
                orders,
                user,
                login,
                logout,
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
