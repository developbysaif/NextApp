"use client";
import React, { use } from 'react';
import CategoryPage from '../products/page';

// Reuse the master Products page but with a preset category
export default function CategoryDynamicPage({ params }) {
    const { category } = use(params);

    // We can just render the CategoryPage component and it will handle state, 
    // but better to pass the initial category.
    // However, the current CategoryPage handles its own state. 
    // For a quick solution, I'll update CategoryPage to accept an initialCategory prop.

    return <CategoryPage initialCategory={category} />;
}
