"use client";
import React from 'react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import './productcard.css';

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
            className="product-card group"
        >
            <div className="product-image-wrapper">
                <Link href={`/productdetail?id=${product._id || product.id}`} className="w-full h-full">
                    <Image
                        src={product.image || '/placeholder.png'}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="product-image"
                        priority={index < 4}
                    />
                </Link>

                {/* Wishlist Heart Icon (Glassmorphism) */}
                <button
                    onClick={handleWishlist}
                    className="wishlist-btn"
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                    <Heart
                        size={20}
                        className={`heart-icon ${isWishlisted ? 'heart-filled' : 'text-gray-400'}`}
                    />
                </button>

                {/* Hover overlay with larger shopping bag icon */}
                <div className="cart-overlay">
                    <button
                        onClick={handleAddToCart}
                        className="cart-btn"
                        aria-label="Add to cart"
                    >
                        <Image src="/Bag.png" alt="Cart" width={27} height={27} className="bag-icon" />
                    </button>
                </div>

                {/* Badges */}
                {product.discount && (
                    <div className="badge badge-discount">{product.discount}</div>
                )}
                {product.badge && (
                    <div className="badge badge-new">{product.badge}</div>
                )}
            </div>

            <div className="product-info">
                <Link href={`/productdetail?id=${product._id || product.id}`}>
                    <h3 className="product-name">{product.name}</h3>
                </Link>

                {/* New Section: Best For & Recommended Quantity */}
                <div className="mt-1 mb-4 flex flex-col gap-2">
                    {product.bestFor && (
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">Best For:</span>
                            <span className="text-xs font-bold text-gray-600 italic line-clamp-1">{product.bestFor}</span>
                        </div>
                    )}
                    {product.recommendedQty && (
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">Usage:</span>
                            <span className="text-xs font-bold text-gray-500">{product.recommendedQty}</span>
                        </div>
                    )}
                </div>

                <div className="price-wrapper">
                    <p className="current-price">${product.price}</p>
                    {product.originalPrice && (
                        <p className="original-price">${product.originalPrice}</p>
                    )}
                </div>

                <div className="rating-wrapper">
                    <div className="stars">
                        {renderStars(product.rating)}
                    </div>
                    <span className="reviews-count">({product.reviews || 0})</span>
                    <Link
                        href={`/productdetail?id=${product._id || product.id}`}
                        className="view-details-pill"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductItem;
