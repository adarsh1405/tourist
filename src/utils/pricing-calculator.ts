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
                // Children under 11 get 50% discount on package price
                const adultPrice = pkg.basePricePerPerson * (selection.numberOfPeople);
                const childPrice = pkg.basePricePerPerson * selection.numberOfChildren * 0.5;
                basePackagePrice = adultPrice + childPrice;
            }
        } else if (selection.selectedPackages.length > 1) {
            // Multiple packages - sum up all durations (assuming they're sequential)
            selection.selectedPackages.forEach(packageKey => {
                const pkg = destination.availablePackages[packageKey];
                if (pkg) {
                    totalDays += pkg.duration;
                    // Children under 11 get 50% discount on package price
                    const adultPrice = pkg.basePricePerPerson * (selection.numberOfPeople);
                    const childPrice = pkg.basePricePerPerson * selection.numberOfChildren * 0.5;
                    basePackagePrice += adultPrice + childPrice;
                }
            });
        }

        // Calculate nights needed (totalDays - 1, but at least 0)
        const nights = Math.max(0, totalDays - 1);
        const days = totalDays;

        // Calculate accommodation price based on rooms logic
        const accommodation = destination.accommodationOptions[selection.accommodation];
        let accommodationPrice = 0;
        let accommodationUpgradeCost = 0;
        const roomDetails = {
            totalRooms: selection.numberOfRooms,
            peoplePerRoom: [] as number[],
            roomRate: accommodation.pricePerNight,
            totalAccommodationCost: 0
        };

        if (nights > 0 && selection.accommodation !== 'none') {
            // Calculate room allocation (max 3 people per room)
            const totalPeople = selection.numberOfPeople + selection.numberOfChildren;
            roomDetails.peoplePerRoom = this.calculateRoomAllocation(totalPeople, selection.numberOfRooms);
            accommodationPrice = accommodation.pricePerNight * nights * selection.numberOfRooms;

            // Add per-person upgrade cost
            if (accommodation.extraCostPerPerson) {
                accommodationUpgradeCost = accommodation.extraCostPerPerson * totalPeople * nights;
                accommodationPrice += accommodationUpgradeCost;
            }

            roomDetails.totalAccommodationCost = accommodationPrice;
        }

        // Calculate meal price (children under 11 get 50% discount)
        const meal = destination.mealOptions[selection.meals];
        const adultMealPrice = meal.pricePerDay * days * (selection.numberOfPeople - selection.numberOfChildren);
        const childMealPrice = meal.pricePerDay * days * selection.numberOfChildren * 0.5;
        const mealPrice = adultMealPrice + childMealPrice;        // Calculate add-on services price (including transportation)
        let addOnPrice = 0;

        selection.addOns.forEach(addOnKey => {
            const addOn = destination.addOnServices[addOnKey];

            if (addOn) {
                // Add base price (either per day or fixed)
                if (addOn.pricePerDay) {
                    addOnPrice += addOn.pricePerDay * days;
                } else if (addOn.price) {
                    addOnPrice += addOn.price;
                }

                // Add per-person upgrade/downgrade cost for transportation add-ons
                if (addOnKey.startsWith('transport-') && addOn.extraCostPerPerson) {
                    const totalPeople = selection.numberOfPeople + selection.numberOfChildren;
                    const transportCost = addOn.extraCostPerPerson * totalPeople * days;
                    addOnPrice += transportCost;
                }
            }
        });

        // Calculate children discount amount
        const childrenPackageDiscount = selection.selectedPackages.reduce((total, packageKey) => {
            const pkg = destination.availablePackages[packageKey];
            if (pkg) {
                return total + (pkg.basePricePerPerson * selection.numberOfChildren * 0.5);
            }
            return total;
        }, 0);
        const childrenMealDiscount = meal.pricePerDay * days * selection.numberOfChildren * 0.5;
        const childrenDiscount = childrenPackageDiscount + childrenMealDiscount;

        // Calculate subtotal
        const subtotal = basePackagePrice + accommodationPrice + mealPrice + addOnPrice;

        // Apply seasonal pricing
        const seasonalMultiplier = this.config.seasonalPricing[selection.season]?.multiplier || 1;
        const seasonalAdjustment = subtotal * (seasonalMultiplier - 1);

        // Apply group discount
        const groupDiscountKey = this.getGroupDiscountKey(selection.numberOfPeople + selection.numberOfChildren);
        const groupMultiplier = this.config.groupDiscounts[groupDiscountKey]?.multiplier || 1;
        const afterSeasonal = subtotal + seasonalAdjustment;
        const groupDiscount = afterSeasonal * (1 - groupMultiplier);

        // Apply coupon discount
        const couponDiscount = this.calculateCouponDiscount(selection, afterSeasonal - groupDiscount);

        // Calculate final total
        const finalTotal = afterSeasonal - groupDiscount - couponDiscount;
        const pricePerPerson = finalTotal / (selection.numberOfPeople + selection.numberOfChildren);

        return {
            basePackagePrice,
            accommodationPrice,
            mealPrice,
            addOnPrice,
            subtotal,
            seasonalAdjustment,
            groupDiscount,
            couponDiscount,
            finalTotal,
            pricePerPerson,
            roomDetails,
            childrenDiscount
        };
    }

    private calculateRoomAllocation(totalPeople: number, requestedRooms: number): number[] {
        const peoplePerRoom: number[] = [];
        let remainingPeople = totalPeople;

        // Distribute people across rooms (max 3 per room)
        for (let i = 0; i < requestedRooms; i++) {
            if (remainingPeople <= 0) {
                peoplePerRoom.push(0);
            } else if (remainingPeople <= 3) {
                peoplePerRoom.push(remainingPeople);
                remainingPeople = 0;
            } else {
                peoplePerRoom.push(3);
                remainingPeople -= 3;
            }
        }

        return peoplePerRoom;
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
