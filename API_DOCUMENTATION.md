# API Documentation
## Doctor Blog & Medical Information Platform

---

## Base URL
```
Development: http://localhost:3000/api
Production: https://yourdomain.com/api
```

---

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## 🔐 Authentication APIs

### Register User
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "fullName": "John Doe",
  "phone": "+1234567890",
  "role": "PATIENT" // or "DOCTOR"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Registration successful. Please verify your email.",
  "data": {
    "userId": "uuid",
    "email": "user@example.com",
    "fullName": "John Doe"
  }
}
```

---

### Login
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt-token-here",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "fullName": "John Doe",
      "role": "PATIENT"
    }
  }
}
```

---

### Logout
```http
POST /api/auth/logout
```

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### Get Current User
```http
GET /api/auth/me
```

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "PATIENT",
    "isVerified": true
  }
}
```

---

## 👨‍⚕️ Doctor APIs

### List All Doctors
```http
GET /api/doctors?page=1&limit=10&specialization=Cardiology&search=John
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `specialization` (optional): Filter by specialization
- `search` (optional): Search by name

**Response (200):**
```json
{
  "success": true,
  "data": {
    "doctors": [
      {
        "id": "uuid",
        "fullName": "Dr. John Smith",
        "specialization": "Cardiology",
        "qualification": "MBBS, MD",
        "profilePicture": "url",
        "clinicName": "Heart Care Clinic",
        "experienceYears": 15,
        "averageRating": 4.5,
        "totalReviews": 120
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "itemsPerPage": 10
    }
  }
}
```

---

### Get Doctor Profile
```http
GET /api/doctors/:id
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "fullName": "Dr. John Smith",
    "email": "doctor@example.com",
    "specialization": "Cardiology",
    "qualification": "MBBS, MD, DM (Cardiology)",
    "registrationNumber": "MED123456",
    "experienceYears": 15,
    "profilePicture": "url",
    "clinicLogo": "url",
    "clinicName": "Heart Care Clinic",
    "clinicAddress": "123 Medical Street, City",
    "bio": "Experienced cardiologist...",
    "consultationFee": 500,
    "averageRating": 4.5,
    "totalReviews": 120,
    "totalBlogs": 25,
    "approvalStatus": "APPROVED"
  }
}
```

---

### Create Doctor Profile
```http
POST /api/doctors
```

**Headers:** `Authorization: Bearer <token>`

**Request Body (multipart/form-data):**
```json
{
  "qualification": "MBBS, MD",
  "specialization": "Cardiology",
  "registrationNumber": "MED123456",
  "experienceYears": 15,
  "clinicName": "Heart Care Clinic",
  "clinicAddress": "123 Medical Street",
  "bio": "Experienced cardiologist...",
  "consultationFee": 500,
  "profilePicture": "<file>",
  "clinicLogo": "<file>"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Doctor profile created. Pending admin approval.",
  "data": {
    "id": "uuid",
    "approvalStatus": "PENDING"
  }
}
```

---

### Update Doctor Profile
```http
PUT /api/doctors/:id
```

**Headers:** `Authorization: Bearer <token>`

**Request Body (multipart/form-data):**
```json
{
  "bio": "Updated bio...",
  "consultationFee": 600,
  "profilePicture": "<file>"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "uuid",
    "bio": "Updated bio...",
    "consultationFee": 600
  }
}
```

---

### Rate Doctor
```http
POST /api/doctors/:id/rate
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "rating": 5
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Rating submitted successfully",
  "data": {
    "rating": 5,
    "newAverageRating": 4.6
  }
}
```

---

### Get Doctor Ratings
```http
GET /api/doctors/:id/ratings
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "averageRating": 4.5,
    "totalRatings": 120,
    "ratingDistribution": {
      "5": 80,
      "4": 30,
      "3": 7,
      "2": 2,
      "1": 1
    }
  }
}
```

---

## 📝 Blog APIs

### List All Blogs
```http
GET /api/blogs?page=1&limit=10&category=diabetes&search=diet
```

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `category` (optional): Filter by category slug
- `search` (optional): Search in title/content
- `doctorId` (optional): Filter by doctor

**Response (200):**
```json
{
  "success": true,
  "data": {
    "blogs": [
      {
        "id": "uuid",
        "title": "Managing Diabetes Through Diet",
        "slug": "managing-diabetes-through-diet",
        "excerpt": "Learn how to control diabetes...",
        "featuredImage": "url",
        "category": {
          "id": "uuid",
          "name": "Diabetes",
          "slug": "diabetes"
        },
        "doctor": {
          "id": "uuid",
          "fullName": "Dr. John Smith",
          "specialization": "Endocrinology",
          "profilePicture": "url"
        },
        "viewsCount": 1250,
        "publishedAt": "2026-01-01T10:00:00Z",
        "tags": ["diabetes", "diet", "health"]
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalItems": 100
    }
  }
}
```

---

### Get Blog by Slug
```http
GET /api/blogs/:slug
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Managing Diabetes Through Diet",
    "slug": "managing-diabetes-through-diet",
    "content": "<full blog content in HTML>",
    "excerpt": "Learn how to control diabetes...",
    "featuredImage": "url",
    "category": {
      "id": "uuid",
      "name": "Diabetes",
      "slug": "diabetes"
    },
    "doctor": {
      "id": "uuid",
      "fullName": "Dr. John Smith",
      "specialization": "Endocrinology",
      "profilePicture": "url",
      "clinicName": "Diabetes Care Center"
    },
    "viewsCount": 1251,
    "publishedAt": "2026-01-01T10:00:00Z",
    "tags": ["diabetes", "diet", "health"],
    "relatedBlogs": []
  }
}
```

---

### Create Blog
```http
POST /api/blogs
```

**Headers:** `Authorization: Bearer <token>` (Doctor only)

**Request Body (multipart/form-data):**
```json
{
  "title": "Managing Diabetes Through Diet",
  "content": "<blog content in HTML>",
  "excerpt": "Learn how to control diabetes...",
  "categoryId": "uuid",
  "tags": ["diabetes", "diet", "health"],
  "status": "PENDING",
  "featuredImage": "<file>"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Blog created successfully. Pending admin approval.",
  "data": {
    "id": "uuid",
    "slug": "managing-diabetes-through-diet",
    "status": "PENDING",
    "approvalStatus": "PENDING"
  }
}
```

---

### Update Blog
```http
PUT /api/blogs/:id
```

**Headers:** `Authorization: Bearer <token>` (Doctor/Admin only)

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "<updated content>",
  "status": "PUBLISHED"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Blog updated successfully",
  "data": {
    "id": "uuid",
    "title": "Updated Title"
  }
}
```

---

### Delete Blog
```http
DELETE /api/blogs/:id
```

**Headers:** `Authorization: Bearer <token>` (Doctor/Admin only)

**Response (200):**
```json
{
  "success": true,
  "message": "Blog deleted successfully"
}
```

---

### Add Blog Comment
```http
POST /api/blogs/:id/comments
```

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "commentText": "Great article! Very helpful.",
  "parentCommentId": "uuid" // optional, for replies
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Comment added successfully. Pending approval.",
  "data": {
    "id": "uuid",
    "commentText": "Great article!",
    "isApproved": false
  }
}
```

---

## 📂 Category APIs

### List All Categories
```http
GET /api/categories
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Diabetes",
      "slug": "diabetes",
      "description": "Information about diabetes management",
      "icon": "url",
      "isActive": true,
      "blogCount": 45
    }
  ]
}
```

---

### Get Category Details
```http
GET /api/categories/:slug
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Diabetes",
    "slug": "diabetes",
    "description": "Information about diabetes management",
    "icon": "url",
    "isActive": true,
    "blogCount": 45,
    "recentBlogs": []
  }
}
```

---

### Create Category
```http
POST /api/categories
```

**Headers:** `Authorization: Bearer <token>` (Admin only)

**Request Body:**
```json
{
  "name": "Diabetes",
  "slug": "diabetes",
  "description": "Information about diabetes management",
  "icon": "url"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "id": "uuid",
    "name": "Diabetes",
    "slug": "diabetes"
  }
}
```

---

## 🥗 Food & Medical Guide APIs

### List All Food Items
```http
GET /api/foods?type=VEGETABLE&search=carrot&page=1
```

**Query Parameters:**
- `type` (optional): VEGETABLE, FRUIT, FOOD
- `search` (optional): Search by name
- `page` (optional): Page number

**Response (200):**
```json
{
  "success": true,
  "data": {
    "foods": [
      {
        "id": "uuid",
        "name": "Carrot",
        "slug": "carrot",
        "type": "VEGETABLE",
        "image": "url",
        "description": "Rich in beta-carotene...",
        "isVerified": true,
        "verifiedByDoctor": {
          "fullName": "Dr. Jane Smith",
          "specialization": "Nutrition"
        }
      }
    ],
    "pagination": {}
  }
}
```

---

### Get Food Item Details
```http
GET /api/foods/:slug
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Carrot",
    "slug": "carrot",
    "type": "VEGETABLE",
    "image": "url",
    "description": "Rich in beta-carotene...",
    "nutritionalInfo": {
      "calories": 41,
      "protein": "0.9g",
      "carbs": "9.6g",
      "fiber": "2.8g",
      "vitamins": ["A", "K", "C"]
    },
    "benefits": [
      {
        "diseaseCategory": "Diabetes",
        "benefits": "Helps regulate blood sugar...",
        "recommendedQuantity": "1 cup daily",
        "warnings": "Consume in moderation...",
        "preparationTips": "Best consumed raw or steamed"
      }
    ],
    "isVerified": true,
    "verifiedByDoctor": {
      "fullName": "Dr. Jane Smith",
      "specialization": "Nutrition"
    }
  }
}
```

---

### Get Foods by Disease
```http
GET /api/foods/disease/:categorySlug
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "category": {
      "name": "Diabetes",
      "slug": "diabetes"
    },
    "foods": [
      {
        "id": "uuid",
        "name": "Carrot",
        "slug": "carrot",
        "type": "VEGETABLE",
        "image": "url",
        "benefits": "Helps regulate blood sugar...",
        "recommendedQuantity": "1 cup daily"
      }
    ]
  }
}
```

---

## 🔧 Admin APIs

### Get Pending Doctor Approvals
```http
GET /api/admin/doctors/pending
```

**Headers:** `Authorization: Bearer <token>` (Admin only)

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "fullName": "Dr. John Smith",
      "email": "doctor@example.com",
      "specialization": "Cardiology",
      "qualification": "MBBS, MD",
      "registrationNumber": "MED123456",
      "experienceYears": 15,
      "profilePicture": "url",
      "clinicLogo": "url",
      "approvalStatus": "PENDING",
      "createdAt": "2026-01-01T10:00:00Z"
    }
  ]
}
```

---

### Approve Doctor
```http
POST /api/admin/doctors/:id/approve
```

**Headers:** `Authorization: Bearer <token>` (Admin only)

**Response (200):**
```json
{
  "success": true,
  "message": "Doctor approved successfully",
  "data": {
    "id": "uuid",
    "approvalStatus": "APPROVED",
    "approvedAt": "2026-01-01T12:00:00Z"
  }
}
```

---

### Reject Doctor
```http
POST /api/admin/doctors/:id/reject
```

**Headers:** `Authorization: Bearer <token>` (Admin only)

**Request Body:**
```json
{
  "rejectionReason": "Invalid credentials"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Doctor rejected",
  "data": {
    "id": "uuid",
    "approvalStatus": "REJECTED",
    "rejectionReason": "Invalid credentials"
  }
}
```

---

### Get Platform Analytics
```http
GET /api/admin/analytics
```

**Headers:** `Authorization: Bearer <token>` (Admin only)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalDoctors": 150,
    "activeDoctors": 120,
    "pendingDoctors": 10,
    "totalPatients": 5000,
    "totalBlogs": 500,
    "publishedBlogs": 450,
    "pendingBlogs": 30,
    "totalReviews": 2000,
    "pendingReviews": 50,
    "totalFoodItems": 200,
    "monthlyStats": {
      "newDoctors": 15,
      "newPatients": 300,
      "newBlogs": 50,
      "totalViews": 50000
    }
  }
}
```

---

## 📊 Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Validation error",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "Forbidden",
  "message": "You don't have permission to access this resource"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Not found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "Something went wrong"
}
```

---

## 🔒 Rate Limiting

- **General APIs:** 100 requests per 15 minutes
- **Authentication APIs:** 5 requests per 15 minutes
- **File Upload APIs:** 10 requests per hour

---

## 📝 Notes

1. All timestamps are in ISO 8601 format (UTC)
2. File uploads support: JPG, PNG, WebP (max 5MB)
3. Pagination default: 10 items per page, max 100
4. Search is case-insensitive
5. All responses include CORS headers
