# Database
DATABASE_URL="mysql://username:password@localhost:3306/doctor_platform"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl-rand-base64-32"

# JWT
JWT_SECRET="your-jwt-secret-here"
JWT_EXPIRES_IN="7d"

# Email Configuration (Nodemailer)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
EMAIL_FROM="Doctor Platform <noreply@doctorplatform.com>"

# Cloudinary (Image Upload)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Application
APP_NAME="Doctor Blog & Medical Platform"
APP_URL="http://localhost:3000"
NODE_ENV="development"

# Admin Credentials (First Admin)
ADMIN_EMAIL="admin@doctorplatform.com"
ADMIN_PASSWORD="Admin@123"

# Rate Limiting
RATE_LIMIT_WINDOW="15m"
RATE_LIMIT_MAX_REQUESTS="100"

# File Upload
MAX_FILE_SIZE="5242880" # 5MB in bytes
ALLOWED_IMAGE_TYPES="image/jpeg,image/png,image/webp"

# Pagination
DEFAULT_PAGE_SIZE="10"
MAX_PAGE_SIZE="100"
