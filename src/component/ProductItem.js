"use client";
import React from 'react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import './productcard.css';

const LeafDecoration = () => (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[1.5rem]">
        {/* Blurry Shadow Overlay to match photo aesthetic */}
        <svg viewBox="0 0 200 300" className="absolute -top-16 -right-16 w-56 h-72 sm:w-64 sm:h-80 text-[#21492f] opacity-[0.06] blur-[12px] transform rotate-[110deg]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M 120 300 C 120 250 140 150 150 50" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M 128 250 C 60 230 30 200 40 150 C 80 150 110 190 135 220" />
            <path d="M 140 180 C 70 160 20 120 30 70 C 70 70 110 120 145 150" />
            <path d="M 146 110 C 80 90 40 50 60 10 C 100 20 130 60 150 85" />
            <path d="M 132 230 C 180 220 200 190 190 140 C 160 140 140 170 138 200" />
            <path d="M 142 160 C 190 140 210 100 210 50 C 180 50 150 90 146 130" />
            <path d="M 148 90 C 180 70 190 30 170 -10 C 150 10 140 40 149 70" />
            <path d="M 150 50 C 140 10 150 -30 170 -40 C 175 0 165 20 150 50" />
        </svg>

        {/* Foreground Minimalist Leaf */}
        <svg viewBox="0 0 200 300" className="absolute -bottom-10 -right-6 w-44 h-60 sm:w-48 sm:h-64 text-[#8baa95] opacity-30 transform rotate-[-20deg] scale-x-[-1]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M 120 300 C 120 250 140 150 150 50" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M 128 250 C 60 230 30 200 40 150 C 80 150 110 190 135 220" />
            <path d="M 140 180 C 70 160 20 120 30 70 C 70 70 110 120 145 150" />
            <path d="M 146 110 C 80 90 40 50 60 10 C 100 20 130 60 150 85" />
            <path d="M 132 230 C 180 220 200 190 190 140 C 160 140 140 170 138 200" />
            <path d="M 142 160 C 190 140 210 100 210 50 C 180 50 150 90 146 130" />
            <path d="M 148 90 C 180 70 190 30 170 -10 C 150 10 140 40 149 70" />
            <path d="M 150 50 C 140 10 150 -30 170 -40 C 175 0 165 20 150 50" />
        </svg>
    </div>
);

const ProductItem = ({ product, index = 0 }) => {
    const { addToCart } = useCart();
    const router = useRouter();
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product._id || product.id);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        router.push('/cart');
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isWishlisted) {
            removeFromWishlist(product._id || product.id);
        } else {
            addToWishlist(product);
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        const r = rating || 5;
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <svg
                    key={i}
                    className={`star ${i <= r ? 'filled' : 'empty'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }
        return stars;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.34, 1.56, 0.64, 1]
            }}
            className="product-card group relative"
        >
            <LeafDecoration />

            <div className="product-image-wrapper relative z-10">
                <Link href={`/productdetail?id=${product._id || product.id}`} className="w-full h-full block">
                    <Image
                        src={product.image || '/placeholder.png'}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="product-image"
                        priority={index < 4}
                    />
                </Link>

                {/* Wishlist Heart Icon */}
                <button
                    onClick={handleWishlist}
                    className="wishlist-btn"
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                    <Heart
                        size={18}
                        className={`heart-icon ${isWishlisted ? 'heart-filled' : 'text-gray-300'}`}
                    />
                </button>

                {/* Badges */}
                {product.discount && (
                    <div className="badge badge-discount">{product.discount}</div>
                )}
                {product.badge && (
                    <div className="badge badge-new">{product.badge}</div>
                )}
            </div>

            <div className="product-info flex flex-col flex-grow relative z-10">
                <Link href={`/productdetail?id=${product._id || product.id}`}>
                    <h3 className="product-name">{product.name}</h3>
                </Link>

                <div className="rating-wrapper mb-2">
                    <div className="stars flex text-[#1b442b]">
                        {renderStars(product.rating)}
                    </div>
                    {/* <span className="reviews-count font-bold text-[#1b442b] ml-1 text-xs">{product.rating || 5}.0</span> */}
                    <span className="reviews-count text-[#4a5d53] ml-1 text-[10px] font-bold">120+</span>
                </div>

                <div className="mb-2">
                    <p className="text-[11px] font-bold text-gray-400">
                        {product.weight || "1 Kg"}
                    </p>
                </div>

                <div className="price-cart-wrapper mt-auto">
                    <div className="price-wrapper mb-0">
                        <p className="current-price">₹{product.price}</p>
                    </div>
                    <button onClick={handleAddToCart} className="add-to-cart-pill">
                        ADD TO CART
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductItem;
