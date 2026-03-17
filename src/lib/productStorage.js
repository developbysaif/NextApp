// Helper functions for managing products in localStorage
// This is a temporary solution until database is connected

const PRODUCTS_STORAGE_KEY = 'admin_products';

/**
 * Get all products from localStorage
 */
export function getStoredProducts() {
    if (typeof window === 'undefined') return [];

    try {
        const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error reading products from localStorage:', error);
        return [];
    }
}

/**
 * Save products to localStorage
 */
export function saveProductsToStorage(products) {
    if (typeof window === 'undefined') return false;

    try {
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
        return true;
    } catch (error) {
        console.error('Error saving products to localStorage:', error);
        return false;
    }
}

/**
 * Add a new product
 */
export function addProduct(productData) {
    const products = getStoredProducts();

    // Generate new ID
    const newId = products.length > 0
        ? Math.max(...products.map(p => p.id || 0)) + 1
        : 1;

    const newProduct = {
        id: newId,
        ...productData,
        createdAt: new Date().toISOString(),
        stock: productData.stock || 0
    };

    products.push(newProduct);
    saveProductsToStorage(products);

    return newProduct;
}

/**
 * Update an existing product
 */
export function updateProduct(id, updates) {
    const products = getStoredProducts();
    const index = products.findIndex(p => p.id === id || p._id === id);

    if (index === -1) return null;

    products[index] = {
        ...products[index],
        ...updates,
        updatedAt: new Date().toISOString()
    };

    saveProductsToStorage(products);
    return products[index];
}

/**
 * Delete a product
 */
export function deleteProduct(id) {
    const products = getStoredProducts();
    const filtered = products.filter(p => p.id !== id && p._id !== id);

    saveProductsToStorage(filtered);
    return filtered.length < products.length;
}

/**
 * Get a single product by ID
 */
export function getProductById(id) {
    const products = getStoredProducts();
    return products.find(p => p.id === id || p._id === id || p.id?.toString() === id || p._id?.toString() === id);
}

/**
 * Initialize storage with default products from data file
 */
export function initializeProductsFromData(defaultProducts) {
    const stored = getStoredProducts();

    // Only initialize if storage is empty
    if (stored.length === 0 && defaultProducts && defaultProducts.length > 0) {
        saveProductsToStorage(defaultProducts);
        return defaultProducts;
    }

    return stored;
}
