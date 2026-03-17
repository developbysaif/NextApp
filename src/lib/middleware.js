import { verifyToken, extractToken } from './auth';
import { ApiResponse } from './api-utils';
import dbConnect from './db';
import User from '@/models/User';

/**
 * Middleware to verify JWT token and attach user to request
 */
export async function authenticateUser(req) {
    const authHeader = req.headers.get('authorization');
    const token = extractToken(authHeader);

    if (!token) {
        throw new Error('No token provided');
    }

    const decoded = verifyToken(token);

    if (!decoded) {
        throw new Error('Invalid or expired token');
    }

    await dbConnect();
    // Get user from database
    const user = await User.findById(decoded.userId).select('id email name role isActive').lean();

    if (!user) {
        throw new Error('User not found');
    }

    // if (!user.isActive) {
    //     throw new Error('Account is deactivated');
    // }

    return {
        ...user,
        id: user._id.toString(),
        fullName: user.name
    };
}

/**
 * Middleware to check if user has required role
 */
export function requireRole(...allowedRoles) {
    return (user) => {
        if (!user) {
            throw new Error('Authentication required');
        }

        if (!allowedRoles.includes(user.role)) {
            throw new Error('Insufficient permissions');
        }

        return true;
    };
}

/**
 * Check if user is admin
 */
export function isAdmin(user) {
    return user && user.role === 'ADMIN';
}

/**
 * Check if user is doctor
 */
export function isDoctor(user) {
    return user && user.role === 'DOCTOR';
}

/**
 * Check if user is patient
 */
export function isPatient(user) {
    return user && user.role === 'PATIENT';
}

/**
 * Get doctor profile for authenticated doctor
 */
export async function getDoctorProfile(userId) {
    // const doctor = await prisma.doctor.findUnique({
    //     where: { userId },
    //     include: {
    //         user: {
    //             select: {
    //                 id: true,
    //                 email: true,
    //                 fullName: true,
    //             },
    //         },
    //     },
    // });

    // if (!doctor) {
    //     throw new Error('Doctor profile not found');
    // }

    // return doctor;
    return null;
}

/**
 * Check if doctor is approved
 */
export async function isDoctorApproved(userId) {
    // const doctor = await prisma.doctor.findUnique({
    //     where: { userId },
    //     select: { approvalStatus: true },
    // });

    // return doctor && doctor.approvalStatus === 'APPROVED';
    return false;
}

/**
 * Verify resource ownership
 */
export async function verifyOwnership(resourceType, resourceId, userId) {
    // let resource;

    // switch (resourceType) {
    //     case 'blog':
    //         resource = await prisma.blog.findUnique({
    //             where: { id: resourceId },
    //             select: { doctor: { select: { userId: true } } },
    //         });
    //         return resource?.doctor?.userId === userId;

    //     case 'review':
    //         resource = await prisma.review.findUnique({
    //             where: { id: resourceId },
    //             select: { userId: true },
    //         });
    //         return resource?.userId === userId;

    //     case 'comment':
    //         resource = await prisma.blogComment.findUnique({
    //             where: { id: resourceId },
    //             select: { userId: true },
    //         });
    //         return resource?.userId === userId;

    //     default:
    //         return false;
    // }
    return true;
}

/**
 * Rate limiting check (simple in-memory implementation)
 * For production, use Redis or similar
 */
const rateLimitMap = new Map();

export function checkRateLimit(identifier, maxRequests = 100, windowMs = 15 * 60 * 1000) {
    const now = Date.now();
    const userRequests = rateLimitMap.get(identifier) || [];

    // Remove old requests outside the window
    const recentRequests = userRequests.filter((timestamp) => now - timestamp < windowMs);

    if (recentRequests.length >= maxRequests) {
        return {
            allowed: false,
            retryAfter: Math.ceil((recentRequests[0] + windowMs - now) / 1000),
        };
    }

    // Add current request
    recentRequests.push(now);
    rateLimitMap.set(identifier, recentRequests);

    return {
        allowed: true,
        remaining: maxRequests - recentRequests.length,
    };
}

/**
 * Clean up old rate limit entries (call periodically)
 */
export function cleanupRateLimits() {
    const now = Date.now();
    const windowMs = 15 * 60 * 1000;

    for (const [identifier, requests] of rateLimitMap.entries()) {
        const recentRequests = requests.filter((timestamp) => now - timestamp < windowMs);

        if (recentRequests.length === 0) {
            rateLimitMap.delete(identifier);
        } else {
            rateLimitMap.set(identifier, recentRequests);
        }
    }
}

// Clean up rate limits every 5 minutes
if (typeof window === 'undefined') {
    setInterval(cleanupRateLimits, 5 * 60 * 1000);
}
