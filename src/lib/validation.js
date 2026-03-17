import { z } from 'zod';

// ==================== USER VALIDATION ====================

export const registerSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    fullName: z.string().min(2, 'Full name must be at least 2 characters').max(255),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number').optional(),
    role: z.enum(['PATIENT', 'DOCTOR']).default('PATIENT'),
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

// ==================== DOCTOR VALIDATION ====================

export const doctorProfileSchema = z.object({
    qualification: z.string().min(5, 'Qualification is required').max(500),
    specialization: z.string().min(2, 'Specialization is required').max(255),
    registrationNumber: z.string().min(5, 'Registration number is required').max(100),
    experienceYears: z.number().int().min(0, 'Experience must be 0 or more').max(70),
    clinicName: z.string().max(255).optional(),
    clinicAddress: z.string().optional(),
    bio: z.string().max(2000).optional(),
    consultationFee: z.number().positive('Consultation fee must be positive').optional(),
});

export const updateDoctorProfileSchema = z.object({
    bio: z.string().max(2000).optional(),
    clinicName: z.string().max(255).optional(),
    clinicAddress: z.string().optional(),
    consultationFee: z.number().positive().optional(),
});

// ==================== BLOG VALIDATION ====================

export const createBlogSchema = z.object({
    title: z.string().min(10, 'Title must be at least 10 characters').max(500),
    content: z.string().min(100, 'Content must be at least 100 characters'),
    excerpt: z.string().max(500).optional(),
    categoryId: z.string().uuid('Invalid category ID'),
    tags: z.array(z.string()).max(10, 'Maximum 10 tags allowed').optional(),
    status: z.enum(['DRAFT', 'PENDING', 'PUBLISHED']).default('PENDING'),
});

export const updateBlogSchema = z.object({
    title: z.string().min(10).max(500).optional(),
    content: z.string().min(100).optional(),
    excerpt: z.string().max(500).optional(),
    categoryId: z.string().uuid().optional(),
    tags: z.array(z.string()).max(10).optional(),
    status: z.enum(['DRAFT', 'PENDING', 'PUBLISHED']).optional(),
});

// ==================== CATEGORY VALIDATION ====================

export const categorySchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    slug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
    description: z.string().max(1000).optional(),
    icon: z.string().url('Invalid icon URL').optional(),
});

// ==================== RATING & REVIEW VALIDATION ====================

export const ratingSchema = z.object({
    rating: z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
});

export const reviewSchema = z.object({
    reviewText: z.string().min(10, 'Review must be at least 10 characters').max(2000),
});

// ==================== FOOD ITEM VALIDATION ====================

export const foodItemSchema = z.object({
    name: z.string().min(2, 'Name is required').max(255),
    slug: z.string().min(2).max(255).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens'),
    type: z.enum(['VEGETABLE', 'FRUIT', 'FOOD']),
    description: z.string().max(2000).optional(),
    nutritionalInfo: z.object({
        calories: z.number().optional(),
        protein: z.string().optional(),
        carbs: z.string().optional(),
        fiber: z.string().optional(),
        vitamins: z.array(z.string()).optional(),
        minerals: z.array(z.string()).optional(),
    }).optional(),
});

export const foodBenefitSchema = z.object({
    foodItemId: z.string().uuid('Invalid food item ID'),
    diseaseCategoryId: z.string().uuid('Invalid category ID'),
    benefits: z.string().min(20, 'Benefits description is required'),
    recommendedQuantity: z.string().max(255).optional(),
    warnings: z.string().max(1000).optional(),
    preparationTips: z.string().max(1000).optional(),
});

// ==================== COMMENT VALIDATION ====================

export const commentSchema = z.object({
    commentText: z.string().min(5, 'Comment must be at least 5 characters').max(1000),
    parentCommentId: z.string().uuid().optional(),
});

// ==================== QUERY VALIDATION ====================

export const paginationSchema = z.object({
    page: z.number().int().positive().default(1),
    limit: z.number().int().positive().max(100).default(10),
});

export const searchSchema = z.object({
    search: z.string().max(255).optional(),
    category: z.string().optional(),
    specialization: z.string().optional(),
    type: z.enum(['VEGETABLE', 'FRUIT', 'FOOD']).optional(),
});

// ==================== HELPER FUNCTIONS ====================

/**
 * Validate data against a schema
 * @param {z.ZodSchema} schema - Zod schema
 * @param {any} data - Data to validate
 * @returns {object} { success: boolean, data?: any, errors?: array }
 */
export function validate(schema, data) {
    try {
        const validatedData = schema.parse(data);
        return { success: true, data: validatedData };
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errors = error.errors.map((err) => ({
                field: err.path.join('.'),
                message: err.message,
            }));
            return { success: false, errors };
        }
        return { success: false, errors: [{ field: 'unknown', message: 'Validation failed' }] };
    }
}

/**
 * Generate slug from string
 * @param {string} text - Text to convert to slug
 * @returns {string} Slug
 */
export function generateSlug(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
