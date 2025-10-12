import { PricingConfig, BookingSelection, PriceBreakdown } from '@/types/booking';

export class PricingCalculator {
    private config: PricingConfig;

    constructor(config: PricingConfig) {
        this.config = config;
    }

    calculatePrice(selection: BookingSelection): PriceBreakdown {
        const destination = this.config.destinations[selection.destination];
        if (!destination) {
            throw new Error('Invalid destination');
        }

        // Calculate total days from selected packages
        let totalDays = 0;
        let basePackagePrice = 0;

        if (selection.selectedPackages.length === 1) {
            // Single package - use its duration
            const packageKey = selection.selectedPackages[0];
            const pkg = destination.availablePackages[packageKey];
            if (pkg) {
                totalDays = pkg.duration;
                basePackagePrice = pkg.basePricePerPerson * selection.numberOfPeople;
            }
        } else if (selection.selectedPackages.length > 1) {
            // Multiple packages - sum up all durations (assuming they're sequential)
            selection.selectedPackages.forEach(packageKey => {
                const pkg = destination.availablePackages[packageKey];
                if (pkg) {
                    totalDays += pkg.duration;
                    basePackagePrice += pkg.basePricePerPerson * selection.numberOfPeople;
                }
            });
        }

        // Calculate nights needed (totalDays - 1, but at least 0)
        const nights = Math.max(0, totalDays - 1);
        const days = totalDays;

        // Calculate accommodation price based on nights needed
        const accommodation = destination.accommodationOptions[selection.accommodation];
        let accommodationPrice = 0;
        if (nights > 0) {
            // Calculate rooms needed (assuming 2 people per room)
            const roomsNeeded = Math.ceil(selection.numberOfPeople / 2);
            accommodationPrice = accommodation.pricePerNight * nights * roomsNeeded;
        }

        // Calculate meal price
        const meal = destination.mealOptions[selection.meals];
        const mealPrice = meal.pricePerDay * days * selection.numberOfPeople;

        // Calculate transport price
        const transport = destination.transportOptions[selection.transport];
        const transportPrice = transport.pricePerDay * days;

        // Calculate add-on services price
        let addOnPrice = 0;
        selection.addOns.forEach(addOnKey => {
            const addOn = destination.addOnServices[addOnKey];
            if (addOn) {
                if (addOn.pricePerDay) {
                    addOnPrice += addOn.pricePerDay * days;
                } else if (addOn.price) {
                    addOnPrice += addOn.price;
                }
            }
        });

        // Calculate subtotal
        const subtotal = basePackagePrice + accommodationPrice + mealPrice + transportPrice + addOnPrice;

        // Apply seasonal pricing
        const seasonalMultiplier = this.config.seasonalPricing[selection.season]?.multiplier || 1;
        const seasonalAdjustment = subtotal * (seasonalMultiplier - 1);

        // Apply group discount
        const groupDiscountKey = this.getGroupDiscountKey(selection.numberOfPeople);
        const groupMultiplier = this.config.groupDiscounts[groupDiscountKey]?.multiplier || 1;
        const afterSeasonal = subtotal + seasonalAdjustment;
        const groupDiscount = afterSeasonal * (1 - groupMultiplier);

        // Apply coupon discount
        const couponDiscount = this.calculateCouponDiscount(selection, afterSeasonal - groupDiscount);

        // Calculate final total
        const finalTotal = afterSeasonal - groupDiscount - couponDiscount;
        const pricePerPerson = finalTotal / selection.numberOfPeople;

        return {
            basePackagePrice,
            accommodationPrice,
            mealPrice,
            transportPrice,
            addOnPrice,
            subtotal,
            seasonalAdjustment,
            groupDiscount,
            couponDiscount,
            finalTotal,
            pricePerPerson
        };
    }

    private calculateCouponDiscount(selection: BookingSelection, amountAfterOtherDiscounts: number): number {
        if (!selection.appliedCoupon || !this.config.coupons) {
            return 0;
        }

        const coupon = this.config.coupons[selection.appliedCoupon];
        if (!coupon || !coupon.isActive) {
            return 0;
        }

        // Check minimum amount requirement
        if (coupon.minAmount && amountAfterOtherDiscounts < coupon.minAmount) {
            return 0;
        }

        let discount = 0;
        if (coupon.discountType === 'percentage') {
            discount = amountAfterOtherDiscounts * (coupon.discountValue / 100);
            // Apply maximum discount limit if specified
            if (coupon.maxDiscount && discount > coupon.maxDiscount) {
                discount = coupon.maxDiscount;
            }
        } else if (coupon.discountType === 'fixed') {
            discount = coupon.discountValue;
        }

        // Ensure discount doesn't exceed the total amount
        return Math.min(discount, amountAfterOtherDiscounts);
    }

    private calculateNights(startDate: string, endDate: string): number {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const timeDiff = end.getTime() - start.getTime();
        return Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));
    }

    private getGroupDiscountKey(numberOfPeople: number): string {
        if (numberOfPeople >= 16) return '16+';
        if (numberOfPeople >= 9) return '9-15';
        if (numberOfPeople >= 5) return '5-8';
        return '2-4';
    }

    getSeason(date: string): string {
        const month = new Date(date).getMonth() + 1; // 1-12

        // Peak season: Oct-Feb (10, 11, 12, 1, 2)
        if (month >= 10 || month <= 2) return 'peak';

        // Off season: Jul-Aug (7, 8)
        if (month >= 7 && month <= 8) return 'off';

        // Normal season: Mar-Jun, Sep (3, 4, 5, 6, 9)
        return 'normal';
    }
}
