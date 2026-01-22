# Assets Placement Guide

## 📁 File Structure

Place your assets in the following structure:

```
/public
  /media
    /video
      hero.mp4              ← Main hero video (full-width background)
      ambient-loop.mp4      ← Ambient video for marketing section
    /images
      product-main.jpg      ← Primary product images (used for products 1, 3, 5, 7)
      product-alt.jpg       ← Alternate product images (used for products 2, 4, 6, 8)
      checkout-support.jpg  ← Background image for checkout page
      marketing.jpg         ← Marketing section background image
```

## 🎬 Video Assets

### `/media/video/hero.mp4`
- **Location**: Hero section (full-width background)
- **Usage**: Main homepage hero video
- **Recommended**: 1920x1080, muted, looped, cyberpunk aesthetic
- **Component**: `components/hero-video.tsx`

### `/media/video/ambient-loop.mp4`
- **Location**: Marketing section background
- **Usage**: Subtle ambient video loop
- **Recommended**: 1920x1080, muted, looped, subtle motion
- **Component**: `app/page.tsx` (marketing section)

## 🖼️ Image Assets

### `/media/images/product-main.jpg`
- **Usage**: Primary product image
- **Used by**: Products 1, 3, 5, 7 (NEXUS CHRONO, QUANTUM EDGE, DIGITAL SHADOW, VOID TIMER)
- **Component**: `components/product-card.tsx`

### `/media/images/product-alt.jpg`
- **Usage**: Alternate product image
- **Used by**: Products 2, 4, 6, 8 (CYBER PULSE, NEON DRIVE, GLITCH MASTER, CYBER CROWN)
- **Component**: `components/product-card.tsx`

### `/media/images/checkout-support.jpg`
- **Usage**: Checkout page background (subtle, low opacity)
- **Component**: `app/checkout/page.tsx`

### `/media/images/marketing.jpg`
- **Usage**: Marketing section background
- **Component**: `app/page.tsx` (marketing section)

## ✅ Current Implementation

All asset paths have been updated in the codebase:

- ✅ Hero video: `/media/video/hero.mp4`
- ✅ Ambient loop: `/media/video/ambient-loop.mp4`
- ✅ Product images: `/media/images/product-main.jpg` and `product-alt.jpg`
- ✅ Checkout support: `/media/images/checkout-support.jpg`
- ✅ Marketing image: `/media/images/marketing.jpg`

## 📝 Notes

- All images are referenced using Next.js Image component for optimization
- Videos use standard HTML5 video elements
- Fallback gradients are in place if assets don't load
- Assets are served from the `/public` directory (Next.js convention)

