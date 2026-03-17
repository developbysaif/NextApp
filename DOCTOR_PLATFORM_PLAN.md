# Doctor Blog & Medical Information Platform
## Complete Development Plan

---

## 🎯 PROJECT OVERVIEW

A comprehensive multi-doctor blogging platform where:
- **Doctors** can register, create profiles, and publish medical blogs
- **Patients/Users** can search doctors, read blogs, rate and review
- **Admin** manages content, approvals, and platform moderation
- **Medical Food Guide** provides disease-wise nutritional recommendations

---

## 👥 USER ROLES

### 1. **Admin**
- Approve/reject doctor registrations
- Approve/reject blog posts
- Manage categories
- Manage food & vegetable medical content
- Moderate ratings and reviews
- View analytics and reports

### 2. **Doctor**
- Register with credentials
- Create and manage profile (photo, logo, qualifications)
- Create, edit, delete blog posts
- View ratings and reviews
- Respond to patient comments
- Dashboard analytics

### 3. **Patient/Public User**
- Browse doctors by specialization/disease
- Read blogs without login
- Search and filter content
- Rate doctors (requires login)
- Write reviews (requires login)
- Access medical food guide

---

## 🗄️ DATABASE SCHEMA

### **1. users**
```sql
id (PK, UUID)
email (UNIQUE, NOT NULL)
password_hash (NOT NULL)
role (ENUM: 'admin', 'doctor', 'patient')
full_name (VARCHAR 255)
phone (VARCHAR 20)
is_verified (BOOLEAN, DEFAULT false)
is_active (BOOLEAN, DEFAULT true)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
last_login (TIMESTAMP)
```

### **2. doctors**
```sql
id (PK, UUID)
user_id (FK -> users.id, UNIQUE)
qualification (VARCHAR 500)
specialization (VARCHAR 255)
registration_number (VARCHAR 100, UNIQUE)
experience_years (INT)
profile_picture (VARCHAR 500)
clinic_logo (VARCHAR 500)
clinic_name (VARCHAR 255)
clinic_address (TEXT)
bio (TEXT)
consultation_fee (DECIMAL)
approval_status (ENUM: 'pending', 'approved', 'rejected')
approved_by (FK -> users.id, NULL)
approved_at (TIMESTAMP, NULL)
rejection_reason (TEXT, NULL)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### **3. categories**
```sql
id (PK, UUID)
name (VARCHAR 100, UNIQUE)
slug (VARCHAR 100, UNIQUE)
description (TEXT)
icon (VARCHAR 255)
is_active (BOOLEAN, DEFAULT true)
created_by (FK -> users.id)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

**Default Categories:**
- Diabetes
- Heart Disease
- Skin Care
- Women Health
- Children Health
- Mental Health
- Digestive Health

### **4. blogs**
```sql
id (PK, UUID)
doctor_id (FK -> doctors.id)
title (VARCHAR 500, NOT NULL)
slug (VARCHAR 500, UNIQUE)
content (LONGTEXT)
excerpt (TEXT)
featured_image (VARCHAR 500)
category_id (FK -> categories.id)
tags (JSON)
status (ENUM: 'draft', 'pending', 'published', 'rejected')
approval_status (ENUM: 'pending', 'approved', 'rejected')
approved_by (FK -> users.id, NULL)
approved_at (TIMESTAMP, NULL)
rejection_reason (TEXT, NULL)
views_count (INT, DEFAULT 0)
is_featured (BOOLEAN, DEFAULT false)
published_at (TIMESTAMP, NULL)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### **5. ratings**
```sql
id (PK, UUID)
doctor_id (FK -> doctors.id)
user_id (FK -> users.id)
rating (INT, CHECK: 1-5)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
UNIQUE(doctor_id, user_id)
```

### **6. reviews**
```sql
id (PK, UUID)
doctor_id (FK -> doctors.id)
user_id (FK -> users.id)
review_text (TEXT)
is_approved (BOOLEAN, DEFAULT false)
approved_by (FK -> users.id, NULL)
approved_at (TIMESTAMP, NULL)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### **7. food_items**
```sql
id (PK, UUID)
name (VARCHAR 255, NOT NULL)
slug (VARCHAR 255, UNIQUE)
type (ENUM: 'vegetable', 'fruit', 'food')
image (VARCHAR 500)
description (TEXT)
nutritional_info (JSON)
created_by (FK -> users.id)
verified_by_doctor (FK -> doctors.id, NULL)
is_verified (BOOLEAN, DEFAULT false)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### **8. food_benefits**
```sql
id (PK, UUID)
food_item_id (FK -> food_items.id)
disease_category_id (FK -> categories.id)
benefits (TEXT)
recommended_quantity (VARCHAR 255)
warnings (TEXT)
preparation_tips (TEXT)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### **9. blog_comments**
```sql
id (PK, UUID)
blog_id (FK -> blogs.id)
user_id (FK -> users.id)
parent_comment_id (FK -> blog_comments.id, NULL)
comment_text (TEXT)
is_approved (BOOLEAN, DEFAULT false)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### **10. sessions**
```sql
id (PK, UUID)
user_id (FK -> users.id)
token (VARCHAR 500, UNIQUE)
expires_at (TIMESTAMP)
created_at (TIMESTAMP)
```

---

## 🔌 API STRUCTURE

### **Authentication APIs**
```
POST   /api/auth/register          - User registration
POST   /api/auth/login             - User login
POST   /api/auth/logout            - User logout
POST   /api/auth/forgot-password   - Password reset request
POST   /api/auth/reset-password    - Reset password
GET    /api/auth/verify-email      - Email verification
GET    /api/auth/me                - Get current user
```

### **Doctor APIs**
```
GET    /api/doctors                - List all approved doctors
GET    /api/doctors/:id            - Get doctor profile
POST   /api/doctors                - Doctor registration (requires auth)
PUT    /api/doctors/:id            - Update doctor profile (requires auth)
DELETE /api/doctors/:id            - Delete doctor (admin only)
GET    /api/doctors/search         - Search doctors by specialization/disease
GET    /api/doctors/:id/blogs      - Get doctor's blogs
GET    /api/doctors/:id/ratings    - Get doctor's ratings
POST   /api/doctors/:id/rate       - Rate a doctor (requires auth)
```

### **Blog APIs**
```
GET    /api/blogs                  - List all published blogs
GET    /api/blogs/:slug            - Get blog by slug
POST   /api/blogs                  - Create blog (doctor only)
PUT    /api/blogs/:id              - Update blog (doctor only)
DELETE /api/blogs/:id              - Delete blog (doctor/admin)
GET    /api/blogs/category/:slug   - Get blogs by category
POST   /api/blogs/:id/comment      - Add comment (requires auth)
GET    /api/blogs/:id/comments     - Get blog comments
```

### **Category APIs**
```
GET    /api/categories             - List all categories
GET    /api/categories/:slug       - Get category details
POST   /api/categories             - Create category (admin only)
PUT    /api/categories/:id         - Update category (admin only)
DELETE /api/categories/:id         - Delete category (admin only)
```

### **Food & Medical Guide APIs**
```
GET    /api/foods                  - List all food items
GET    /api/foods/:slug            - Get food item details
GET    /api/foods/type/:type       - Get foods by type (vegetable/fruit/food)
GET    /api/foods/disease/:slug    - Get foods for specific disease
POST   /api/foods                  - Create food item (admin/doctor)
PUT    /api/foods/:id              - Update food item (admin/doctor)
DELETE /api/foods/:id              - Delete food item (admin only)
```

### **Admin APIs**
```
GET    /api/admin/doctors/pending  - Get pending doctor approvals
POST   /api/admin/doctors/:id/approve - Approve doctor
POST   /api/admin/doctors/:id/reject  - Reject doctor
GET    /api/admin/blogs/pending    - Get pending blog approvals
POST   /api/admin/blogs/:id/approve   - Approve blog
POST   /api/admin/blogs/:id/reject    - Reject blog
GET    /api/admin/reviews/pending  - Get pending reviews
POST   /api/admin/reviews/:id/approve - Approve review
GET    /api/admin/analytics        - Get platform analytics
```

### **Review APIs**
```
POST   /api/reviews                - Create review (requires auth)
GET    /api/reviews/doctor/:id     - Get doctor reviews
PUT    /api/reviews/:id            - Update review (owner only)
DELETE /api/reviews/:id            - Delete review (owner/admin)
```

---

## 📄 PAGES STRUCTURE

### **Public Pages**
1. **Home Page** (`/`)
   - Hero section with search
   - Featured doctors
   - Latest blogs
   - Categories showcase
   - Medical food highlights
   - Testimonials

2. **Doctor Listing** (`/doctors`)
   - Search and filters
   - Doctor cards with ratings
   - Pagination
   - Sort options

3. **Doctor Profile** (`/doctors/[id]`)
   - Doctor information
   - Ratings and reviews
   - Published blogs
   - Contact information

4. **Blog Listing** (`/blogs`)
   - Category filters
   - Search functionality
   - Blog cards
   - Pagination

5. **Blog Detail** (`/blogs/[slug]`)
   - Full blog content
   - Author information
   - Related blogs
   - Comments section

6. **Food & Medical Guide** (`/medical-guide`)
   - Food categories
   - Disease-wise recommendations
   - Search functionality
   - Detailed food benefits

7. **Food Detail** (`/medical-guide/[slug]`)
   - Nutritional information
   - Disease benefits
   - Preparation tips
   - Warnings

8. **Category Page** (`/category/[slug]`)
   - Category description
   - Related blogs
   - Related doctors

### **Authentication Pages**
9. **Login** (`/login`)
10. **Register** (`/register`)
11. **Forgot Password** (`/forgot-password`)
12. **Reset Password** (`/reset-password`)

### **Doctor Dashboard** (Protected)
13. **Doctor Dashboard** (`/doctor/dashboard`)
    - Statistics overview
    - Recent ratings
    - Blog management

14. **Create/Edit Blog** (`/doctor/blogs/new`, `/doctor/blogs/edit/[id]`)
15. **Profile Settings** (`/doctor/profile`)
16. **My Blogs** (`/doctor/blogs`)

### **Patient Dashboard** (Protected)
17. **Patient Profile** (`/profile`)
18. **My Reviews** (`/profile/reviews`)

### **Admin Dashboard** (Protected)
19. **Admin Dashboard** (`/admin/dashboard`)
    - Platform statistics
    - Quick actions

20. **Manage Doctors** (`/admin/doctors`)
21. **Manage Blogs** (`/admin/blogs`)
22. **Manage Categories** (`/admin/categories`)
23. **Manage Food Items** (`/admin/foods`)
24. **Manage Reviews** (`/admin/reviews`)
25. **Analytics** (`/admin/analytics`)

---

## 🛠️ TECHNOLOGY STACK

### **Backend**
- **Framework:** Next.js 14+ (App Router with API Routes)
- **Database:** MySQL 8.0+
- **ORM:** Prisma
- **Authentication:** NextAuth.js (JWT)
- **File Upload:** Cloudinary / AWS S3
- **Validation:** Zod
- **Email:** Nodemailer / SendGrid

### **Frontend**
- **Framework:** Next.js 14+ (React 18+)
- **Styling:** Tailwind CSS + Custom CSS
- **UI Components:** Shadcn/ui
- **State Management:** React Context API / Zustand
- **Forms:** React Hook Form
- **Rich Text Editor:** TipTap / Quill
- **Icons:** Lucide React
- **Animations:** Framer Motion

### **DevOps & Tools**
- **Version Control:** Git
- **Package Manager:** npm
- **Code Quality:** ESLint, Prettier
- **Testing:** Jest, React Testing Library
- **Deployment:** Vercel / AWS / DigitalOcean

---

## 🔒 SECURITY BEST PRACTICES

1. **Authentication & Authorization**
   - JWT-based authentication
   - Role-based access control (RBAC)
   - Secure password hashing (bcrypt)
   - Session management
   - Email verification

2. **Data Protection**
   - Input validation and sanitization
   - SQL injection prevention (Prisma ORM)
   - XSS protection
   - CSRF tokens
   - Rate limiting

3. **File Upload Security**
   - File type validation
   - File size limits
   - Virus scanning
   - Secure file storage
   - CDN integration

4. **API Security**
   - API rate limiting
   - Request validation
   - Error handling (no sensitive data exposure)
   - CORS configuration
   - HTTPS enforcement

5. **Database Security**
   - Prepared statements
   - Least privilege principle
   - Regular backups
   - Encryption at rest

---

## 📱 RESPONSIVE DESIGN

- **Mobile First:** Design for mobile, enhance for desktop
- **Breakpoints:**
  - Mobile: 320px - 640px
  - Tablet: 641px - 1024px
  - Desktop: 1025px+
- **Touch-friendly:** Minimum 44px touch targets
- **Performance:** Lazy loading, image optimization

---

## 🎨 UI/UX DESIGN PRINCIPLES

1. **Color Scheme**
   - Primary: Medical blue (#0066CC)
   - Secondary: Trust green (#00A86B)
   - Accent: Warm orange (#FF6B35)
   - Neutral: Grays for text and backgrounds

2. **Typography**
   - Headings: Inter (Bold)
   - Body: Inter (Regular)
   - Medical terms: Monospace

3. **Components**
   - Doctor cards with hover effects
   - Blog cards with featured images
   - Rating stars (interactive)
   - Search with autocomplete
   - Responsive navigation
   - Loading states
   - Error states

4. **Accessibility**
   - WCAG 2.1 AA compliance
   - Keyboard navigation
   - Screen reader support
   - Alt text for images
   - Proper heading hierarchy

---

## 📊 SEO OPTIMIZATION

1. **Technical SEO**
   - Server-side rendering (SSR)
   - Meta tags (title, description)
   - Open Graph tags
   - Schema.org markup (Doctor, Article)
   - Sitemap.xml
   - Robots.txt
   - Canonical URLs

2. **Content SEO**
   - SEO-friendly URLs (slugs)
   - Keyword optimization
   - Internal linking
   - Image optimization (alt text, lazy loading)
   - Mobile-friendly

3. **Performance**
   - Core Web Vitals optimization
   - Image optimization (WebP, responsive)
   - Code splitting
   - Caching strategies

---

## 🚀 DEVELOPMENT PHASES

### **Phase 1: Setup & Planning (Week 1)**
- [x] Project structure
- [ ] Database schema design
- [ ] Prisma setup
- [ ] Authentication setup
- [ ] Base UI components

### **Phase 2: Core Features (Week 2-3)**
- [ ] User registration/login
- [ ] Doctor registration & approval
- [ ] Doctor profile management
- [ ] Blog CRUD operations
- [ ] Category management

### **Phase 3: Advanced Features (Week 4-5)**
- [ ] Rating & review system
- [ ] Food & medical guide
- [ ] Search & filters
- [ ] Admin panel
- [ ] Email notifications

### **Phase 4: Polish & Testing (Week 6)**
- [ ] UI/UX refinement
- [ ] Performance optimization
- [ ] Security audit
- [ ] Testing (unit, integration)
- [ ] Documentation

### **Phase 5: Deployment (Week 7)**
- [ ] Production build
- [ ] Database migration
- [ ] Deployment setup
- [ ] Monitoring setup
- [ ] Launch

---

## 📦 DELIVERABLES

1. ✅ Complete database schema
2. ✅ API documentation
3. ✅ Page layouts and wireframes
4. ✅ Admin panel functionality
5. [ ] Clean, documented code
6. [ ] Mobile-responsive design
7. [ ] Security implementation
8. [ ] Deployment guide
9. [ ] User manual

---

## 🎯 SUCCESS METRICS

- **Performance:** Page load < 3s
- **Accessibility:** WCAG 2.1 AA
- **SEO:** Lighthouse score > 90
- **Security:** No critical vulnerabilities
- **Mobile:** Fully responsive on all devices
- **Uptime:** 99.9% availability

---

**Project Status:** Ready for Implementation
**Last Updated:** 2026-01-01
