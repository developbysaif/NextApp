"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]); // cart items array
    const [loading, setLoading] = useState(true);

    // Initialize Cart (LocalStorage ONLY for now to avoid Auth errors)
    useEffect(() => {
        const initializeCart = () => {
            // Fetch from LocalStorage
            const localCart = localStorage.getItem("cart");
            if (localCart) {
                try {
                    setCart(JSON.parse(localCart));
                } catch (e) {
                    console.error("Failed to parse cart", e);
                }
            }
            setLoading(false);
        };

        initializeCart();
    }, []);

    // Sync to LocalStorage
    useEffect(() => {
        if (!loading) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart, loading]);

    const addToCart = async (product, quantity = 1) => {
        setCart((prev) => {
            const productId = product._id || product.id;
            const existing = prev.find((item) => (item._id || item.id) === productId);
            if (existing) {
                return prev.map((item) =>
                    (item._id || item.id) === productId
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity, _id: productId, id: productId }];
        });
    };

    const removeFromCart = async (productId) => {
        setCart((prev) => prev.filter((item) => (item._id || item.id) !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCart(prevCart =>
            prevCart.map(item =>
                (item._id || item.id) === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
    };

    const getCartCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount, loading }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
