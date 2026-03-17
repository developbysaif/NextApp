# Product Management System - Admin Panel

## Overview (Urdu)
Yeh system admin panel mein products add karne ke liye banaya gaya hai. Images `public/uploads` folder mein save hoti hain aur products dynamically display hote hain.

## Features

### 1. Image Upload System
- **Location**: Images save hoti hain `public/uploads/` folder mein
- **Format**: Timestamp ke saath unique filename (e.g., `1736001234567-product-image.jpg`)
- **API**: `/api/upload` - Local file system mein save karta hai (Cloudinary ki jagah)

### 2. Product Add Form
**Path**: `/admin/products/add`

**Fields**:
- **Product Title** (name): Product ka naam
- **Description**: Product ki tafseel
- **Image**: Upload button se image select karein
- **Category**: Vegetable, Fruit, Meat, etc.
- **Season**: Summer, Winter, All Season
- **Tags**: Comma-separated tags (e.g., "Organic, Fresh, Premium")
- **Price**: Dollar mein price
- **Stock**: Inventory quantity

### 3. How It Works

#### Image Upload Process:
```javascript
1. User clicks upload area
2. File select hoti hai
3. API call hoti hai `/api/upload`
4. Image save hoti hai `public/uploads/` mein
5. URL return hota hai (e.g., `/uploads/1736001234567-image.jpg`)
6. Form mein image URL set ho jata hai
```

#### Product Save Process:
```javascript
1. Form submit hota hai
2. API call `/api/products` (POST)
3. Product data process hota hai
4. New product dynamicProducts array mein add hota hai
5. Success response aata hai
6. Redirect to `/admin/products`
```

### 4. Product Display

#### Admin Panel (`/admin/products`):
- Table format mein sab products show hote hain
- Static products (from `products.js`) + Dynamic products (admin added)
- Edit aur Delete buttons
- Image thumbnail display

#### Public Products Page (`/products`):
- Grid layout mein products
- Filter by category aur season
- Search functionality
- Product cards with images

### 5. Data Storage

**Current Implementation**:
- Static products: `src/data/products.js` file se
- Dynamic products: Server memory mein (restart pe reset ho jayenge)

**Future Enhancement**:
- MongoDB ya database mein permanent storage
- LocalStorage for client-side persistence

### 6. API Endpoints

#### GET `/api/products`
```javascript
// Sab products return karta hai (static + dynamic)
// Query params: ?category=Fruit&season=Summer
```

#### POST `/api/products`
```javascript
// Naya product create karta hai
// Body: { name, description, price, image, category, season, stock, tags }
```

#### POST `/api/upload`
```javascript
// Image upload karta hai
// Returns: { success: true, url: "/uploads/filename.jpg" }
```

## Usage Instructions (Urdu)

### Product Add Karne Ka Tareeqa:

1. **Admin Panel Kholen**: `/admin/products` pe jayen
2. **Add Product Click Karein**: Top right corner mein button hai
3. **Form Fill Karein**:
   - Product ka naam likhen
   - Description add karein
   - Image upload karein (click on upload area)
   - Category select karein
   - Season select karein
   - Price aur Stock enter karein
   - Tags add karein (optional)
4. **Save Product**: "Save Product" button click karein
5. **Verification**: Product list mein naya product dikhai dega

### Image Upload Tips:
- Supported formats: JPG, PNG, GIF, SVG
- Max size: 5MB recommended
- Images automatically save hoti hain `public/uploads/` mein
- Preview immediately dikhai deta hai

## File Structure

```
my-project/
├── public/
│   └── uploads/              # Uploaded images yahan save hoti hain
│       └── .gitkeep
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   └── products/
│   │   │       ├── page.js          # Products list
│   │   │       ├── add/
│   │   │       │   └── page.js      # Add product form
│   │   │       └── edit/[id]/
│   │   │           └── page.js      # Edit product form
│   │   ├── api/
│   │   │   ├── products/
│   │   │   │   ├── route.js         # Products API
│   │   │   │   └── [id]/
│   │   │   │       └── route.js     # Single product API
│   │   │   └── upload/
│   │   │       └── route.js         # Image upload API
│   │   └── products/
│   │       └── page.js              # Public products page
│   ├── data/
│   │   └── products.js              # Static products data
│   └── lib/
│       └── productStorage.js        # Helper functions (future use)
```

## Important Notes

1. **Server Restart**: Dynamic products server restart pe reset ho jayenge (database nahi hai abhi)
2. **Images**: Public folder mein save hoti hain, permanent hain
3. **Production**: Database integration zaroori hai for permanent storage
4. **Security**: File upload validation add karein production mein

## Next Steps (Future Enhancements)

1. MongoDB integration for permanent product storage
2. Image optimization and resizing
3. Multiple image upload support
4. Product categories management
5. Bulk product import/export
6. Product analytics and reporting

---

**Created**: January 2026
**Version**: 1.0
**Status**: Development (Local storage only)
