# Image Requirements for Header Component

The Header component requires the following images in the `/public/images/` directory:

## Required Images:

1. **header.jpg** - Main hero slider image (first slide)
   - Recommended size: 1920x1080px
   - Should show organic food/vegetables

2. **slide.jpg** - Second slider image
   - Recommended size: 1920x1080px
   - Should show fresh organic products

## How to Add Images:

1. Create the `/public/images/` directory if it doesn't exist
2. Add your images with the exact names above
3. Or update the image paths in `src/component/Header.js` to match your existing images

## Alternative:

You can use your existing images from `/public/image/` by updating the Header.js file:

```javascript
const slides = [
  {
    title: "Tasty & Healthy Organic Food",
    subtitle: "UP TO 50% OFF TODAY ONLY!",
    image: "/image/your-image-name.png", // Update this
  },
  {
    title: "Fresh Organic Products",
    subtitle: "NATURAL & HEALTHY",
    image: "/image/your-other-image.png", // Update this
  },
];
```

## Current Status:
✅ Header component created
✅ Integrated into home page
⚠️ Images need to be added or paths updated
