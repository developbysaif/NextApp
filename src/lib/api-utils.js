/**
 * Standard API response format
 */
export class ApiResponse {
    /**
     * Success response
     * @param {any} data - Response data
     * @param {string} message - Success message
     * @param {number} statusCode - HTTP status code
     */
    static success(data = null, message = 'Success', statusCode = 200) {
        return {
            response: {
                success: true,
                message,
                data,
            },
            statusCode,
        };
    }

    /**
     * Error response
     * @param {string} error - Error message
     * @param {number} statusCode - HTTP status code
     * @param {any} details - Additional error details
     */
    static error(error = 'An error occurred', statusCode = 500, details = null) {
        return {
            response: {
                success: false,
                error,
                ...(details && { details }),
            },
            statusCode,
        };
    }

    /**
     * Validation error response
     * @param {array} errors - Array of validation errors
     */
    static validationError(errors) {
        return this.error('Validation error', 400, errors);
    }

    /**
     * Unauthorized error response
     * @param {string} message - Error message
     */
    static unauthorized(message = 'Unauthorized') {
        return this.error(message, 401);
    }

    /**
     * Forbidden error response
     * @param {string} message - Error message
     */
    static forbidden(message = 'Forbidden') {
        return this.error(message, 403);
    }

    /**
     * Not found error response
     * @param {string} message - Error message
     */
    static notFound(message = 'Resource not found') {
        return this.error(message, 404);
    }

    /**
     * Conflict error response
     * @param {string} message - Error message
     */
    static conflict(message = 'Resource already exists') {
        return this.error(message, 409);
    }
}

/**
 * Pagination helper
 */
export class Pagination {
    /**
     * Calculate pagination metadata
     * @param {number} page - Current page
     * @param {number} limit - Items per page
     * @param {number} totalItems - Total number of items
     */
    static getMeta(page, limit, totalItems) {
        const totalPages = Math.ceil(totalItems / limit);
        return {
            currentPage: page,
            totalPages,
            totalItems,
            itemsPerPage: limit,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        };
    }

    /**
     * Get skip value for database query
     * @param {number} page - Current page
     * @param {number} limit - Items per page
     */
    static getSkip(page, limit) {
        return (page - 1) * limit;
    }
}

/**
 * Async handler wrapper for API routes
 * Catches errors and returns proper error responses
 */
export function asyncHandler(handler) {
    return async (req, res) => {
        try {
            await handler(req, res);
        } catch (error) {
            console.error('API Error:', error);

            const { response, statusCode } = ApiResponse.error(
                error.message || 'Internal server error',
                error.statusCode || 500
            );

            return res.status(statusCode).json(response);
        }
    };
}

/**
 * Extract query parameters with defaults
 */
export function extractQueryParams(query) {
    const page = parseInt(query.page) || 1;
    const limit = Math.min(parseInt(query.limit) || 10, 100);
    const search = query.search || '';
    const category = query.category || '';
    const specialization = query.specialization || '';
    const type = query.type || '';

    return { page, limit, search, category, specialization, type };
}

/**
 * Generate unique filename for uploads
 */
export function generateUniqueFilename(originalName) {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const extension = originalName.split('.').pop();
    return `${timestamp}-${random}.${extension}`;
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input) {
    if (typeof input !== 'string') return input;

    return input
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

/**
 * Format date to readable string
 */
export function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

/**
 * Calculate average rating
 */
export function calculateAverageRating(ratings) {
    if (!ratings || ratings.length === 0) return 0;

    const sum = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return (sum / ratings.length).toFixed(1);
}

/**
 * Get rating distribution
 */
export function getRatingDistribution(ratings) {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    ratings.forEach((rating) => {
        distribution[rating.rating]++;
    });

    return distribution;
}
