export interface BasePackage {
    name: string;
    description: string;
    basePricePerPerson: number;
    duration: number; // in days
    inclusions: string[];
}

export interface AccommodationOption {
    name: string;
    pricePerNight: number;
    description: string;
    extraCostPerPerson?: number;
    category?: string;
    amenities?: string[];
}

export interface MealOption {
    name: string;
    pricePerDay: number;
    description: string;
}

export interface TransportOption {
    name: string;
    pricePerDay: number;
    description: string;
    extraCostPerPerson?: number;
}

export interface AddOnService {
    name: string;
    price?: number;
    pricePerDay?: number;
    description: string;
    extraCostPerPerson?: number;
}

export interface Destination {
    name: string;
    description: string;
    availablePackages: Record<string, BasePackage>;
    accommodationOptions: Record<string, AccommodationOption>;
    mealOptions: Record<string, MealOption>;
    addOnServices: Record<string, AddOnService>;
}

export interface SeasonalPricing {
    name: string;
    multiplier: number;
    description: string;
}

export interface GroupDiscount {
    name: string;
    multiplier: number;
}

export interface Coupon {
    code: string;
    name: string;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    isActive: boolean;
    minAmount?: number;
    maxDiscount?: number;
    expiryDate?: string;
}

export interface PricingConfig {
    destinations: Record<string, Destination>;
    seasonalPricing: Record<string, SeasonalPricing>;
    groupDiscounts: Record<string, GroupDiscount>;
    coupons?: Record<string, Coupon>;
}

export interface BookingSelection {
    destination: string;
    selectedPackages: string[];
    accommodation: string;
    meals: string;
    addOns: string[];
    numberOfPeople: number;
    numberOfChildren: number; // Children under 11 years
    numberOfRooms: number;
    startDate: string;
    season: string;
    appliedCoupon?: string;
}

export interface PriceBreakdown {
    basePackagePrice: number;
    accommodationPrice: number;
    accommodationUpgradeCost: number;
    mealPrice: number;
    addOnPrice: number;
    subtotal: number;
    seasonalAdjustment: number;
    groupDiscount: number;
    couponDiscount: number;
    finalTotal: number;
    pricePerPerson: number;
    roomDetails: {
        totalRooms: number;
        peoplePerRoom: number[];
        roomRate: number;
        totalAccommodationCost: number;
    };
    childrenDiscount: number;
    childrenAccommodationDiscount: number;
}
