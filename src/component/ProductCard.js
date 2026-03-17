import React from 'react';
import Link from 'next/link';
import './productcard.css';
import ProductItem from './ProductItem';

const BestSellerProducts = () => {
    // Products data array
    const products = [
        // ... (keeping existing products for breadcrumb/demo)
        { id: 1, image: 'Fruits.png', name: 'Organic Apples', price: 4.50, rating: 5, reviews: 150, category: 'Fruit', season: 'Winter' },
        { id: 2, image: 'Anar.png', name: 'Pomegranate', price: 6.00, rating: 5, reviews: 88, category: 'Fruit', season: 'Winter' },
        { id: 3, image: 'Limes.png', name: 'Fresh Mango', price: 8.50, rating: 5, reviews: 210, category: 'Fruit', season: 'Summer' },
        { id: 4, image: 'Shake.png', name: 'Strawberries', price: 5.00, rating: 4, reviews: 120, category: 'Fruit', season: 'Summer' },
        { id: 101, image: 'Mint.png', name: 'Organic Spinach', price: 3.00, rating: 5, reviews: 140, category: 'Vegetable', season: 'Winter' },
        { id: 102, image: 'Lime.png', name: 'Crunchy Carrots', price: 2.00, rating: 4, reviews: 95, category: 'Vegetable', season: 'Winter' },
        { id: 103, image: 'Mint.png', name: 'Fresh Broccoli', price: 4.50, rating: 5, reviews: 220, category: 'Vegetable', season: 'Winter' },
        { id: 104, image: 'P-1.png', name: 'Summer Cucumber', price: 1.50, rating: 4, reviews: 180, category: 'Vegetable', season: 'Summer' },
    ];

    return (
        <section className="best-seller-section">
            <div className="container mx-auto">
                {/* Header Section */}
                <div className="section-header">
                    <h2 className="section-title">
                        Best Seller Products
                    </h2>
                    <p className="section-description">
                        Curated from our finest harvests. Experience the peak of organic quality and natural taste, preferred by our most discerning customers.
                    </p>
                    <div className="show-more-wrapper">
                        <Link href="/products" className="show-more-link">
                            <span>Explore Collection</span>
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="products-grid">
                    {products.map((product, index) => (
                        <ProductItem
                            key={product.id}
                            index={index}
                            product={{
                                _id: product.id,
                                image: product.image.startsWith('/') ? product.image : `/${product.image}`,
                                name: product.name,
                                price: product.price,
                                originalPrice: product.originalPrice,
                                discount: product.discount,
                                badge: product.badge,
                                rating: product.rating,
                                reviews: product.reviews,
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BestSellerProducts;
