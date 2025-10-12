# Image Requirements for Puri Tourist Website

## Required Images by Location

### Destinations (for HomePage carousel)

#### Jagannath Temple
- `/images/jagannath-temple-1.jpg`
- `/images/jagannath-temple-2.jpg` 
- `/images/jagannath-temple-3.jpg`
- `/images/jagannath-rath-yatra.jpg`

#### Puri Beach
- `/images/puri-beach-sunrise.jpg`
- `/images/puri-beach-activities.jpg`
- `/images/puri-beach-fishing.jpg`
- `/images/puri-beach-sunset.jpg`

#### Konark Sun Temple
- `/images/konark-temple-front.jpg`
- `/images/konark-temple-wheels.jpg`
- `/images/konark-temple-sculptures.jpg`
- `/images/konark-temple-sunset.jpg`

#### Chilika Lake
- `/images/chilika-lake-dolphins.jpg`
- `/images/chilika-lake-birds.jpg`
- `/images/chilika-lake-boat.jpg`
- `/images/chilika-lake-sunset.jpg`

#### Raghurajpur Village
- `/images/raghurajpur-pattachitra.jpg`
- `/images/raghurajpur-artists.jpg`
- `/images/raghurajpur-village.jpg`
- `/images/raghurajpur-crafts.jpg`

#### Pipili Village
- `/images/pipili-applique.jpg`
- `/images/pipili-craftsmen.jpg`
- `/images/pipili-textiles.jpg`
- `/images/pipili-market.jpg`

### Gallery Page Images
(Located in `/gallery` page)
- Various high-quality images of all destinations
- Organized by categories: Temples, Beaches, Heritage, Nature, Culture

## Image Specifications

### Recommended Sizes:
- **Destination carousel**: 800x600px or 1200x800px
- **Gallery images**: 1200x900px or higher
- **Hero/banner images**: 1920x1080px

### Formats:
- **Preferred**: `.jpg` for photos, `.png` for graphics with transparency
- **Alternative**: `.webp` for better compression (Next.js will auto-optimize)

### Optimization:
- Next.js automatically optimizes images when using the `Image` component
- Keep original file sizes reasonable (under 2MB each)
- Use descriptive filenames

## How to Add Images

1. **Place images** in the appropriate folders under `/public/images/`
2. **Reference them** in code using `/images/folder/filename.jpg`
3. **Use Next.js Image component** for better performance:
   ```jsx
   import Image from 'next/image'
   
   <Image 
     src="/images/destinations/puri-beach-sunrise.jpg"
     alt="Beautiful sunrise at Puri Beach"
     width={800}
     height={600}
   />
   ```

## Current Status
- ❌ Most destination images are missing (404 errors in console)
- ✅ Folder structure is set up
- ✅ Code is ready to display images once added

## Quick Start
1. Add at least one image per destination to see the carousel working
2. Focus on main attractions first: Jagannath Temple, Puri Beach, Konark Temple
3. Use high-quality, tourism-appropriate images
