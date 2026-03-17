# 🏥 Doctor Blog & Medical Information Platform

> A comprehensive multi-doctor blogging platform where doctors can share medical knowledge, patients can find trusted healthcare information, and everyone can learn about the healing power of natural foods.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![Prisma](https://img.shields.io/badge/Prisma-7.2-2D3748)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## 🌟 Features

### For Patients/Users
- 🔍 **Search & Discover** - Find doctors by specialization, disease, or category
- 📚 **Medical Blogs** - Read verified medical articles from certified doctors
- ⭐ **Rate & Review** - Share your experience with doctors
- 🥗 **Food Medicine Guide** - Learn which foods help with specific diseases
- 📱 **Mobile Responsive** - Access from any device

### For Doctors
- 👤 **Professional Profile** - Showcase credentials, specialization, and experience
- ✍️ **Blog Publishing** - Share medical knowledge with patients
- 📊 **Dashboard** - Track views, ratings, and reviews
- 🖼️ **Media Upload** - Add profile pictures and clinic logos
- ✅ **Verified Status** - Admin-approved profiles for trust

### For Administrators
- ✅ **Approval System** - Review and approve doctor registrations
- 📝 **Content Moderation** - Manage blog posts and reviews
- 📂 **Category Management** - Organize medical topics
- 🥗 **Food Database** - Manage nutritional information
- 📊 **Analytics** - Monitor platform activity

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MySQL 8.0+ installed
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project**
   ```bash
   cd "c:\Users\saif\OneDrive\Desktop\next.js project\my-project"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   
   Create `.env.local` file:
   ```env
   DATABASE_URL="mysql://root:password@localhost:3306/doctor_platform"
   JWT_SECRET="your-secret-key-here"
   NEXTAUTH_SECRET="another-secret-key"
   ```

4. **Setup database**
   ```bash
   # Create database
   mysql -u root -p
   CREATE DATABASE doctor_platform;
   exit;

   # Generate Prisma client
   npm run db:generate

   # Push schema to database
   npm run db:push

   # Seed initial data
   npm run db:seed
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

---

## 📁 Project Structure

```
my-project/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.js                # Seed data script
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   │   └── auth/          # Authentication endpoints
│   │   ├── page.js            # Home page
│   │   └── layout.js          # Root layout
│   ├── components/            # React components
│   ├── lib/                   # Utilities
│   │   ├── prisma.js          # Database client
│   │   ├── auth.js            # Auth utilities
│   │   ├── validation.js      # Validation schemas
│   │   ├── api-utils.js       # API helpers
│   │   └── middleware.js      # Middleware
│   └── context/               # React context
├── public/                    # Static files
├── .env.local                 # Environment variables
└── package.json               # Dependencies

Documentation Files:
├── PROJECT_SUMMARY.md         # Complete project overview
├── DOCTOR_PLATFORM_PLAN.md    # Detailed development plan
├── API_DOCUMENTATION.md       # API reference guide
├── IMPLEMENTATION_GUIDE.md    # Step-by-step implementation
├── QUICK_START.md             # Quick reference guide
└── README.md                  # This file
```

---

## 🗄️ Database Schema

The platform uses **10 interconnected tables**:

1. **users** - User accounts (patients, doctors, admins)
2. **doctors** - Doctor profiles and credentials
3. **categories** - Health categories (Diabetes, Heart Disease, etc.)
4. **blogs** - Medical articles and posts
5. **ratings** - Doctor ratings (1-5 stars)
6. **reviews** - Doctor reviews and testimonials
7. **food_items** - Nutritional food database
8. **food_benefits** - Disease-wise food recommendations
9. **blog_comments** - Blog comments and discussions
10. **sessions** - User authentication sessions

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Doctors (Coming Soon)
- `GET /api/doctors` - List all doctors
- `GET /api/doctors/:id` - Get doctor profile
- `POST /api/doctors` - Create doctor profile
- `POST /api/doctors/:id/rate` - Rate a doctor

### Blogs (Coming Soon)
- `GET /api/blogs` - List all blogs
- `GET /api/blogs/:slug` - Get blog details
- `POST /api/blogs` - Create new blog

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API reference.

---

## 🎨 Design System

### Colors
- **Primary:** Medical Blue (#0066CC)
- **Secondary:** Trust Green (#00A86B)
- **Accent:** Warm Orange (#FF6B35)

### Typography
- **Font:** Inter (Google Fonts)
- **Headings:** Bold, 600-700 weight
- **Body:** Regular, 400 weight

### Components
- Modern card designs with hover effects
- Gradient backgrounds
- Smooth animations
- Responsive layouts

---

## 🔐 Security Features

- ✅ **Password Hashing** - bcrypt with 12 salt rounds
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Role-Based Access** - Admin, Doctor, Patient roles
- ✅ **Input Validation** - Zod schema validation
- ✅ **SQL Injection Prevention** - Prisma ORM
- ✅ **Rate Limiting** - API request throttling
- ✅ **XSS Protection** - Input sanitization

---

## 🧪 Testing

### Test Authentication APIs

**Register:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@123","fullName":"Test User","role":"PATIENT"}'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@123"}'
```

---

## 🔑 Default Login Credentials

After running `npm run db:seed`:

**Admin:**
- Email: `admin@doctorplatform.com`
- Password: `Admin@123`

**Doctor:**
- Email: `dr.sarah.johnson@example.com`
- Password: `Doctor@123`

**Patient:**
- Email: `patient1@example.com`
- Password: `Patient@123`

---

## 📊 NPM Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with initial data
npm run db:studio    # Open Prisma Studio (database GUI)
```

---

## 📚 Documentation

- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Complete project overview
- **[DOCTOR_PLATFORM_PLAN.md](./DOCTOR_PLATFORM_PLAN.md)** - Detailed development plan
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - API reference guide
- **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)** - Step-by-step guide
- **[QUICK_START.md](./QUICK_START.md)** - Quick reference

---

## 🛠️ Technology Stack

### Backend
- **Framework:** Next.js 16 (App Router)
- **Database:** MySQL 8.0
- **ORM:** Prisma 7.2
- **Authentication:** JWT + bcrypt
- **Validation:** Zod

### Frontend
- **Framework:** React 19
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Animations:** Framer Motion

### DevOps
- **Package Manager:** npm
- **Version Control:** Git
- **Deployment:** Vercel (recommended)

---

## 📈 Roadmap

### ✅ Phase 1: Foundation (Complete)
- [x] Database schema
- [x] Authentication system
- [x] Core utilities
- [x] Home page UI
- [x] Documentation

### 🔄 Phase 2: Core Features (In Progress)
- [ ] Doctor APIs
- [ ] Blog APIs
- [ ] Category management
- [ ] Food guide APIs

### 📋 Phase 3: Frontend (Planned)
- [ ] Doctor listing page
- [ ] Doctor profile page
- [ ] Blog pages
- [ ] Medical food guide
- [ ] Authentication pages

### 🎨 Phase 4: Advanced (Planned)
- [ ] File upload (Cloudinary)
- [ ] Rich text editor
- [ ] Email notifications
- [ ] Search functionality
- [ ] Admin dashboard

---

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Check if MySQL is running
# Verify DATABASE_URL in .env.local
# Ensure database exists
```

### Prisma Client Not Generated
```bash
npm run db:generate
```

### Module Not Found
```bash
npm install
```

See [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) for more troubleshooting tips.

---

## 🤝 Contributing

This is a private project. For questions or issues, contact the development team.

---

## 📄 License

This project is proprietary and confidential.

---

## 👨‍💻 Development Team

**Senior Full-Stack Developer**
- Next.js & React Development
- Database Design & Architecture
- API Development
- UI/UX Design

---

## 📞 Support

For technical support or questions:
- Check the documentation files
- Review the implementation guide
- Contact the development team

---

## 🎯 Project Status

**Current Version:** 1.0.0  
**Status:** Foundation Complete ✅  
**Next Milestone:** Core APIs Implementation  
**Estimated Completion:** 6-7 weeks  

---

## ⭐ Acknowledgments

Built with:
- Next.js
- Prisma
- Tailwind CSS
- MySQL
- And many other amazing open-source tools

---

**Made with ❤️ for better healthcare information**

