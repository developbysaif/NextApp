"use client";

import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem("wishlist");
        if (stored) {
            try {
                setWishlist(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse wishlist", e);
            }
        }
    }, []);

    const addToWishlist = (product) => {
        // Validating product has an id
        const productWithId = { ...product, _id: product._id || product.id };

        const exists = wishlist.some(p => (p._id || p.id) === (productWithId._id || productWithId.id));
        let updated;
        if (exists) {
            updated = wishlist.filter(p => (p._id || p.id) !== (productWithId._id || productWithId.id));
        } else {
            updated = [...wishlist, productWithId];
        }

        setWishlist(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));
    };

    const isInWishlist = (id) => {
        return wishlist.some(p => (p._id || p.id) === id);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    return useContext(WishlistContext);
}
