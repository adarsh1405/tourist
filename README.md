# Puri Tourist Package Website

A modern, responsive web application for customizing and booking tourist packages for Puri, Odisha. Built with Next.js, TypeScript, and Tailwind CSS.

## ⚡ Quick Start

**One-command setup** (requires Make):
```bash
make setup
```

This will install dependencies and start the development server at [http://localhost:3000](http://localhost:3000).

## 🌟 Features

### Core Features
- **Dynamic Pricing System**: Real-time price calculation based on user selections
- **Multi-Package Selection**: Choose multiple packages with intelligent dropdown interface
- **Configurable Packages**: Easy-to-modify pricing through JSON configuration
- **Responsive Design**: Clean, modern UI that works on all devices
- **Scalable Architecture**: Designed to easily add more destinations in the future
- **Seasonal Pricing**: Automatic seasonal adjustments based on travel dates
- **Group Discounts**: Automatic discounts for larger groups

### UI/UX Features
- **Animated Particle Background**: Dynamic tourist-themed particles with interactive effects
- **Professional Homepage**: Company information, contact details, and customer reviews
- **Navigation Menu**: Clean menubar with links to Home, Gallery, Payment Details, and Terms & Conditions
- **Dedicated Gallery Page**: Separate page showcasing destination photos with filtering options
- **Static Information Pages**: Dedicated pages for Payment Details and Terms & Conditions
- **Scrollable Destinations**: Horizontally scrollable popular destinations with hover popups
- **Google Maps Integration**: Direct links to destination locations
- **Smart Date Selection**: Single start date input with automatic duration calculation
- **Dropdown Package Selection**: Multi-select dropdown with search and category filtering
- **Real-time Price Updates**: Instant price recalculation as selections change

## 🏖️ Tour Packages Available

### Temple & Spiritual Tour (1 day)
- Jagannath Temple visit with priority darshan
- Expert spiritual guide
- AC transportation
- All entry fees included

### Beach & Heritage Tour (2 days)
- Puri Beach activities and water sports
- Konark Sun Temple with archaeological guide
- Local handicraft shopping
- Comfortable accommodation
- All meals included

### Complete Puri Experience (3 days)
- All temple visits including hidden gems
- Beach activities and sunset viewing
- Konark Sun Temple detailed tour
- Local cuisine experience with cooking demo
- Cultural shows and folk performances
- Heritage walk through old Puri
- Professional photography session
- 2 nights luxury accommodation

### Adventure & Nature (2 days)
- Chilika Lake boat safari
- Bird watching expedition
- Beach cycling and water sports
- Nature photography workshop
- Eco-friendly accommodation

### Spiritual Retreat (4 days)
- Extended temple visits and rituals
- Meditation and yoga sessions
- Spiritual discourse with local saints
- Participation in traditional ceremonies
- Vegetarian satvik meals
- Ashram-style accommodation

## 🎯 Customization Options

### Accommodation Options
- **Budget**: Clean, comfortable stays with essential amenities
- **Standard**: Mid-range hotels with modern facilities and room service
- **Luxury**: Premium resorts with spa, pool, and concierge services

### Meal Preferences
- **Vegetarian**: Traditional Odia vegetarian cuisine
- **Non-vegetarian**: Local seafood and meat specialties
- **Premium**: Fine dining with chef's special menu

### Transportation
- **AC Car**: Private sedan for up to 4 passengers
- **Tempo Traveller**: Spacious vehicle for groups of 6-12
- **Luxury Coach**: Premium bus with entertainment system for larger groups

### Add-on Services
- **Professional Photography**: Dedicated photographer for your journey
- **Expert Guide**: Knowledgeable local guide with historical insights
- **Cultural Performances**: Private cultural shows and folk dances
- **Cooking Classes**: Learn traditional Odia cooking techniques

## ⚙️ Configuration Management

All pricing and package details are managed through the `src/data/pricing-config.json` file. This allows for easy updates without code changes:

- **Base package prices** with seasonal variations
- **Accommodation rates** across different categories
- **Meal pricing** for various dietary preferences
- **Transportation costs** for different vehicle types
- **Add-on service prices** for enhanced experiences
- **Seasonal multipliers** for peak/off-season pricing
- **Group discount rates** for cost optimization
- **Package categories** for organized selection
- **Duration calculations** for automatic itinerary planning

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 with App Router and React 18
- **Styling**: Tailwind CSS with custom animations
- **Language**: TypeScript for type safety
- **Icons**: Lucide React for consistent iconography
- **UI Components**: Custom components with Headless UI
- **Animations**: Custom particle system with Canvas API
- **Build Tool**: Turbopack for fast development
- **Maps Integration**: Google Maps for location services

## 🚀 Getting Started

### Website Structure
The website consists of the following main pages:

- **Home Page** (`/`): Main landing page with booking form, destinations, reviews, and company information
- **Gallery** (`/gallery`): Photo gallery showcasing destinations with category filtering and lightbox view
- **Payment Details** (`/payment-details`): Comprehensive information about payment methods, security, and billing
- **Terms & Conditions** (`/terms-conditions`): Complete terms of service, cancellation policies, and legal information

All pages except the home page open in new tabs to maintain the user's booking session.

### Option 1: Quick Setup (Recommended)
If you have Make installed:
```bash
make setup
```

### Option 2: Manual Setup
1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and visit [http://localhost:3000](http://localhost:3000)

### Available Makefile Commands
- `make setup` - One-command install and start
- `make install` - Install dependencies only
- `make dev` - Start development server
- `make build` - Build for production
- `make start` - Start production server
- `make clean` - Clean installation
- `make help` - Show all available commands

## 📋 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## 📁 Project Structure

```
src/
├── app/                          # Next.js app directory
│   ├── globals.css              # Global styles and Tailwind directives
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                # Main page with HomePage/BookingForm routing
│   ├── gallery/                # Photo gallery page
│   │   └── page.tsx            # Dedicated gallery with image filtering
│   ├── payment-details/        # Payment information page
│   │   └── page.tsx            # Static payment details and methods
│   └── terms-conditions/       # Terms and conditions page
│       └── page.tsx            # Static terms, conditions, and policies
├── components/                  # React components
│   ├── BookingForm.tsx         # Smart booking form with multi-select
│   ├── HomePage.tsx            # Professional homepage with all sections
│   ├── Navigation.tsx          # Main navigation menu component
│   ├── ParticleBackground.tsx  # Animated particle background
│   └── ui/                     # Reusable UI components
│       ├── Button.tsx          # Styled button component
│       └── Card.tsx            # Card layout component
├── data/                       # Configuration files
│   └── pricing-config.json     # Complete pricing and package configuration
├── types/                      # TypeScript type definitions
│   └── booking.ts             # Booking and configuration interfaces
└── utils/                     # Utility functions
    └── pricing-calculator.ts  # Advanced pricing calculation logic
```

## 🎨 Key Components

### Navigation
- Clean menubar with company logo and brand name
- Links to Home, Gallery, Payment Details, and Terms & Conditions
- All links except Home open in new tabs for better user experience
- Responsive design with hover effects and proper iconography

### ParticleBackground
- Canvas-based particle animation system
- Tourist-themed interactive elements
- Responsive design with performance optimization
- Mouse interaction and dynamic effects

### BookingForm
- Multi-package selection with searchable dropdown
- Real-time price calculation and updates
- Smart date handling with duration auto-calculation
- Validation and error handling
- Mobile-responsive design

### HomePage
- Professional company presentation
- Scrollable destinations with hover effects
- Customer reviews and testimonials
- Contact information and footer
- Call-to-action sections
- Google Maps integration for destinations

### Static Pages
- **Gallery Page**: Dedicated photo gallery with category filtering and lightbox view
- **Payment Details Page**: Comprehensive payment information, accepted methods, and security details
- **Terms & Conditions Page**: Complete terms, policies, cancellation rules, and legal information

## 🌍 Adding New Destinations

To add a new destination, extend the `pricing-config.json` file:

1. **Add destination data** following the existing structure
2. **Define available packages** with pricing and inclusions
3. **Set accommodation options** for different budgets
4. **Configure transportation** options and pricing
5. **Add destination to HomePage** destinations array
6. **Include Google Maps** integration for the new location

Example structure:
```json
{
  "destinations": {
    "new-destination": {
      "name": "New Destination",
      "description": "Description of the destination",
      "availablePackages": { ... },
      "accommodationOptions": { ... },
      "transportOptions": { ... },
      "addOnServices": { ... }
    }
  }
}
```

## 💰 Modifying Prices

Update the `src/data/pricing-config.json` file to modify:
- **Package base prices** for different tour types
- **Accommodation rates** across budget categories
- **Meal pricing** for dietary preferences
- **Transportation costs** for vehicle types
- **Add-on service prices** for enhanced experiences
- **Seasonal multipliers** for dynamic pricing
- **Group discount rates** for bulk bookings

## 🎯 Features in Development

- **Payment Integration**: Stripe and Razorpay payment gateways
- **Booking Management**: Admin dashboard for booking management
- **Customer Portal**: User accounts with booking history
- **Review System**: Integrated review and rating system
- **Multi-language**: Support for Hindi and Odia languages
- **Mobile App**: React Native companion app
- **Advanced Filters**: Enhanced search and filtering options

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
