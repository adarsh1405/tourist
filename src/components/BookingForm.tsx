'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Listbox, Transition } from '@headlessui/react';
import { BookingSelection, PriceBreakdown, PricingConfig } from '@/types/booking';
import { PricingCalculator } from '@/utils/pricing-calculator';
import { Calendar, Users, MapPin, Car, Camera, User, Music, ArrowLeft, Check, ChevronsUpDown, Ticket, ChevronDown, ChevronUp, Bed, Settings } from 'lucide-react';
import pricingConfigData from '@/data/pricing-config.json';

interface BookingFormProps {
    onBackToHome: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onBackToHome }) => {
    const [selection, setSelection] = useState<BookingSelection>({
        destination: 'puri',
        selectedPackages: [],
        accommodation: 'none',
        meals: 'included',
        addOns: [],
        numberOfPeople: 2,
        numberOfChildren: 0,
        numberOfRooms: 1,
        startDate: '',
        season: 'normal',
        appliedCoupon: undefined
    });

    const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown | null>(null);
    const [couponCode, setCouponCode] = useState<string>('');
    const [couponError, setCouponError] = useState<string>('');
    const [couponSuccess, setCouponSuccess] = useState<string>('');

    // State for managing card expansion
    const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({
        travelDetails: true,  // Start with travel details expanded since it's most important
        packages: false,
        accommodation: false,
        addOns: false
    });

    // Type cast the imported JSON to our interface
    const pricingConfig = useMemo(() => pricingConfigData as PricingConfig, []);
    const calculator = useMemo(() => new PricingCalculator(pricingConfig), [pricingConfig]);

    // Auto-detect season when start date changes
    useEffect(() => {
        if (selection.startDate) {
            const detectedSeason = calculator.getSeason(selection.startDate);
            if (selection.season !== detectedSeason) {
                setSelection(prev => ({ ...prev, season: detectedSeason }));
            }
        }
    }, [selection.startDate, selection.season, calculator]);

    // Calculate price when relevant selection properties change
    useEffect(() => {
        if (selection.startDate && selection.selectedPackages.length > 0) {
            try {
                const breakdown = calculator.calculatePrice(selection);
                setPriceBreakdown(breakdown);
            } catch (error) {
                console.error('Error calculating price:', error);
                setPriceBreakdown(null);
            }
        } else {
            // Reset price breakdown if conditions not met
            setPriceBreakdown(null);
        }
    }, [
        selection,
        selection.startDate,
        selection.selectedPackages,
        selection.numberOfPeople,
        selection.numberOfChildren,
        selection.numberOfRooms,
        selection.accommodation,
        selection.meals,
        selection.addOns,
        selection.season,
        selection.appliedCoupon,
        calculator
    ]);

    const handleApplyCoupon = () => {
        setCouponError('');
        setCouponSuccess('');

        if (!couponCode.trim()) {
            setCouponError('Please enter a coupon code');
            return;
        }

        if (!pricingConfig.coupons || !pricingConfig.coupons[couponCode.toUpperCase()]) {
            setCouponError('Invalid coupon code');
            return;
        }

        const coupon = pricingConfig.coupons[couponCode.toUpperCase()];
        if (!coupon.isActive) {
            setCouponError('This coupon is no longer active');
            return;
        }

        // Check if minimum amount requirement is met
        if (priceBreakdown && coupon.minAmount && priceBreakdown.subtotal < coupon.minAmount) {
            setCouponError(`Minimum order amount of ${formatPrice(coupon.minAmount)} required for this coupon`);
            return;
        }

        setSelection(prev => ({ ...prev, appliedCoupon: couponCode.toUpperCase() }));
        setCouponSuccess(`Coupon "${coupon.name}" applied successfully!`);
        setCouponCode('');
    };

    const handleRemoveCoupon = () => {
        setSelection(prev => ({ ...prev, appliedCoupon: undefined }));
        setCouponError('');
        setCouponSuccess('');
    };

    const toggleCardExpansion = (cardKey: string) => {
        setExpandedCards(prev => ({
            ...prev,
            [cardKey]: !prev[cardKey]
        }));
    };

    const getCardSummary = (cardKey: string) => {
        switch (cardKey) {
            case 'travelDetails':
                return selection.startDate
                    ? `${formatDateDisplay(selection.startDate)} • ${selection.numberOfPeople} adults, ${selection.numberOfChildren} children • ${selection.numberOfRooms} room${selection.numberOfRooms > 1 ? 's' : ''}`
                    : 'Select travel date, group size, and rooms';
            case 'packages':
                return selection.selectedPackages.length > 0
                    ? `${selection.selectedPackages.length} package${selection.selectedPackages.length > 1 ? 's' : ''} selected`
                    : 'No packages selected'; case 'accommodation':
                const acc = destination.accommodationOptions[selection.accommodation];
                if (selection.accommodation === 'none') {
                    return '';
                }
                return `${acc.name}${acc.extraCostPerPerson && acc.extraCostPerPerson > 0 ? ` (+${formatPrice(acc.extraCostPerPerson)}/person)` : ''} - ${formatPrice(acc.pricePerNight)}/night`;
            case 'addOns':
                return selection.addOns.length > 0
                    ? `${selection.addOns.length} add-on${selection.addOns.length > 1 ? 's' : ''} selected`
                    : 'No add-ons selected';
            default:
                return '';
        }
    };

    const destination = pricingConfig.destinations[selection.destination];

    const handleInputChange = (field: keyof BookingSelection, value: string | number | string[]) => {
        setSelection(prev => ({ ...prev, [field]: value }));
    };

    const handleAddOnToggle = (addOnKey: string) => {
        setSelection(prev => ({
            ...prev,
            addOns: prev.addOns.includes(addOnKey)
                ? prev.addOns.filter(key => key !== addOnKey)
                : [...prev.addOns, addOnKey]
        }));
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    const formatDateForInput = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const formatDateDisplay = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    // Calculate total duration from selected packages
    const calculateTotalDuration = () => {
        if (selection.selectedPackages.length === 0) return { days: 0, nights: 0 };

        let totalDays = 0;
        if (selection.selectedPackages.length === 1) {
            // Single package
            const pkg = destination.availablePackages[selection.selectedPackages[0]];
            totalDays = pkg?.duration || 0;
        } else {
            // Multiple packages - sum durations
            selection.selectedPackages.forEach(pkgKey => {
                const pkg = destination.availablePackages[pkgKey];
                if (pkg) totalDays += pkg.duration;
            });
        }

        const nights = Math.max(0, totalDays - 1);
        return { days: totalDays, nights };
    };

    const { days: totalDays, nights: totalNights } = calculateTotalDuration();

    // Check if accommodation is needed (only for multi-day tours with nights)
    const isAccommodationNeeded = totalNights > 0;

    // Auto-select "No Accommodation" when only day tours are selected
    useEffect(() => {
        if (!isAccommodationNeeded && selection.accommodation !== 'none') {
            setSelection(prev => ({ ...prev, accommodation: 'none' }));
        }
    }, [isAccommodationNeeded, selection.accommodation]);

    const handleDateChange = (value: string) => {
        handleInputChange('startDate', value);
    };

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                <Button
                    variant="outline"
                    onClick={onBackToHome}
                    className="flex items-center gap-2 text-black hover-alt-text"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Button>
                <div className="text-center flex-1 sm:flex-none">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Customize Your Journey</h1>
                    <p className="text-lg sm:text-xl text-gray-600">Select your preferred packages and options</p>
                </div>
                <div className="hidden sm:block"></div> {/* Spacer for flex layout - only on larger screens */}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Booking Form */}
                <div className="space-y-6">
                    {/* Travel Details */}
                    <Card>
                        <CardHeader
                            className="cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => toggleCardExpansion('travelDetails')}
                        >
                            <CardTitle className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    Travel Details
                                </div>
                                <div className="flex items-center gap-2">
                                    {!expandedCards.travelDetails && (
                                        <span className="hidden sm:inline text-sm text-gray-600 font-normal">
                                            {getCardSummary('travelDetails')}
                                        </span>
                                    )}
                                    {expandedCards.travelDetails ? (
                                        <ChevronUp className="h-4 w-4 text-gray-500" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4 text-gray-500" />
                                    )}
                                </div>
                            </CardTitle>
                        </CardHeader>
                        {expandedCards.travelDetails && (
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Start Date</label>
                                        <input
                                            type="date"
                                            value={formatDateForInput(selection.startDate)}
                                            onChange={(e) => handleDateChange(e.target.value)}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        {selection.startDate && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                Selected: {formatDateDisplay(selection.startDate)}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                                            <Users className="h-4 w-4" />
                                            Number of Adults
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="50"
                                            value={selection.numberOfPeople}
                                            onChange={(e) => handleInputChange('numberOfPeople', parseInt(e.target.value) || 1)}
                                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                                            <User className="h-4 w-4" />
                                            Children (under 11 years)
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="20"
                                            value={selection.numberOfChildren}
                                            onChange={(e) => handleInputChange('numberOfChildren', parseInt(e.target.value) || 0)}
                                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">50% discount on packages & meals</p>
                                    </div>
                                    <div className={!isAccommodationNeeded ? 'opacity-50' : ''}>
                                        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                                            <Bed className="h-4 w-4" />
                                            Number of Rooms
                                            {!isAccommodationNeeded && (
                                                <span className="text-xs text-yellow-600">(Not needed for day tours)</span>
                                            )}
                                        </label>
                                        <input
                                            type="number"
                                            min={Math.ceil((selection.numberOfPeople + selection.numberOfChildren) / 3)}
                                            max="20"
                                            value={selection.numberOfRooms}
                                            onChange={(e) => handleInputChange('numberOfRooms', parseInt(e.target.value) || 1)}
                                            disabled={!isAccommodationNeeded}
                                            className={`w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isAccommodationNeeded ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            {isAccommodationNeeded ? 'Max 3 people per room' : 'Room selection disabled for day tours'}
                                        </p>
                                    </div>
                                </div>

                                {/* Room allocation display */}
                                {(selection.numberOfPeople + selection.numberOfChildren > 0) && selection.numberOfRooms > 0 && isAccommodationNeeded && (
                                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                                        <h4 className="text-sm font-medium text-blue-900 mb-2">Room Allocation:</h4>
                                        <div className="text-sm text-blue-800">
                                            Total People: {selection.numberOfPeople + selection.numberOfChildren} ({selection.numberOfPeople} adults + {selection.numberOfChildren} children)
                                            <br />
                                            Recommended Rooms: {Math.ceil((selection.numberOfPeople + selection.numberOfChildren) / 3)}
                                            {selection.numberOfRooms < Math.ceil((selection.numberOfPeople + selection.numberOfChildren) / 3) && (
                                                <div className="text-red-600 mt-1">
                                                    ⚠️ Warning: You may need more rooms (max 3 people per room)
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Day tour info display */}
                                {!isAccommodationNeeded && selection.selectedPackages.length > 0 && (
                                    <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                                        <h4 className="text-sm font-medium text-green-900 mb-2">Day Tour Information:</h4>
                                        <div className="text-sm text-green-800">
                                            Total People: {selection.numberOfPeople + selection.numberOfChildren} ({selection.numberOfPeople} adults + {selection.numberOfChildren} children)
                                            <br />
                                            Duration: {totalDays} day{totalDays > 1 ? 's' : ''} • No overnight stay required
                                            <br />
                                            Transportation: Included in all day tours
                                        </div>
                                    </div>
                                )}

                                {selection.season && (
                                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                                        <p className="text-sm">
                                            <strong>Season:</strong> {pricingConfig.seasonalPricing[selection.season].name}
                                        </p>
                                        <p className="text-xs text-gray-600 mt-1">
                                            {pricingConfig.seasonalPricing[selection.season].description}
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        )}
                    </Card>

                    {/* Package Selection */}
                    <Card>
                        <CardHeader
                            className="cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => toggleCardExpansion('packages')}
                        >
                            <CardTitle className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5" />
                                    Choose Your Packages
                                </div>
                                <div className="flex items-center gap-2">
                                    {!expandedCards.packages && (
                                        <span className="hidden sm:inline text-sm text-gray-600 font-normal">
                                            {getCardSummary('packages')}
                                        </span>
                                    )}
                                    {expandedCards.packages ? (
                                        <ChevronUp className="h-4 w-4 text-gray-500" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4 text-gray-500" />
                                    )}
                                </div>
                            </CardTitle>
                            {expandedCards.packages && (
                                <CardDescription>Select one or more tour packages from the dropdown</CardDescription>
                            )}
                        </CardHeader>
                        {expandedCards.packages && (
                            <CardContent className="space-y-4">
                                <Listbox value={selection.selectedPackages} onChange={(value) => handleInputChange('selectedPackages', value)} multiple>
                                    <div className="relative">
                                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-3 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 border border-gray-300">
                                            <span className="block truncate">
                                                {selection.selectedPackages.length === 0
                                                    ? 'Select tour packages...'
                                                    : `${selection.selectedPackages.length} package${selection.selectedPackages.length > 1 ? 's' : ''} selected`
                                                }
                                            </span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                <ChevronsUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </Listbox.Button>
                                        <Transition
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                                                {Object.entries(destination.availablePackages).map(([key, pkg]) => (
                                                    <Listbox.Option
                                                        key={key}
                                                        className={({ active }) =>
                                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                                                            }`
                                                        }
                                                        value={key}
                                                    >
                                                        {({ selected }) => (
                                                            <>
                                                                <div className="flex flex-col">
                                                                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                                        {pkg.name}
                                                                    </span>
                                                                    <span className="text-sm text-gray-500">
                                                                        {pkg.duration} day{pkg.duration > 1 ? 's' : ''} • {formatPrice(pkg.basePricePerPerson)}/person
                                                                    </span>
                                                                    <span className="text-xs text-gray-400 mt-1">
                                                                        {pkg.description}
                                                                    </span>
                                                                </div>
                                                                {selected ? (
                                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                                                        <Check className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </Listbox>

                                {/* Selected Packages Display */}
                                {selection.selectedPackages.length > 0 && (
                                    <div className="mt-4">
                                        <h4 className="font-medium text-sm text-gray-700 mb-2">Selected Packages:</h4>
                                        <div className="space-y-2">
                                            {selection.selectedPackages.map(pkgKey => {
                                                const pkg = destination.availablePackages[pkgKey];
                                                return (
                                                    <div key={pkgKey} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-md">
                                                        <div>
                                                            <span className="font-medium text-blue-900">{pkg.name}</span>
                                                            <span className="text-sm text-blue-700 ml-2">
                                                                ({pkg.duration} day{pkg.duration > 1 ? 's' : ''})
                                                            </span>
                                                        </div>
                                                        <span className="font-semibold text-blue-900">{formatPrice(pkg.basePricePerPerson)}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        )}
                    </Card>

                    {/* Accommodation */}
                    <Card className={!isAccommodationNeeded ? 'opacity-60' : ''}>
                        <CardHeader
                            className={`cursor-pointer transition-colors ${!isAccommodationNeeded ? 'cursor-not-allowed' : 'hover:bg-gray-50'}`}
                            onClick={() => isAccommodationNeeded && toggleCardExpansion('accommodation')}
                        >
                            <CardTitle className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Bed className="h-5 w-5" />
                                    Accommodation
                                </div>
                                <div className="flex items-center gap-2">
                                    {!expandedCards.accommodation && (
                                        <span className="hidden sm:inline text-sm text-gray-600 font-normal">
                                            {getCardSummary('accommodation')}
                                        </span>
                                    )}
                                    {isAccommodationNeeded && (
                                        expandedCards.accommodation ? (
                                            <ChevronUp className="h-4 w-4 text-gray-500" />
                                        ) : (
                                            <ChevronDown className="h-4 w-4 text-gray-500" />
                                        )
                                    )}
                                </div>
                            </CardTitle>
                        </CardHeader>
                        {expandedCards.accommodation && isAccommodationNeeded && (
                            <CardContent>
                                <div className="space-y-6">
                                    {/* Deluxe Category */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                                            Deluxe Category
                                        </h3>
                                        <div className="space-y-3">
                                            {Object.entries(destination.accommodationOptions)
                                                .filter(([, option]) => option.category === 'deluxe')
                                                .map(([key, option]) => (
                                                    <div
                                                        key={key}
                                                        className={`p-4 border rounded-lg cursor-pointer transition-all ${selection.accommodation === key
                                                            ? 'border-blue-500 bg-blue-50 shadow-md'
                                                            : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                                                            }`}
                                                        onClick={() => handleInputChange('accommodation', key)}
                                                    >
                                                        <div className="flex justify-between items-start">
                                                            <div className="flex-1 pr-4">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <h4 className="font-semibold text-gray-900">{option.name}</h4>
                                                                    {option.extraCostPerPerson && option.extraCostPerPerson > 0 && (
                                                                        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                                                                            +{formatPrice(option.extraCostPerPerson)}/person
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                                                                <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                                                                    {option.amenities?.map((amenity: string, index: number) => (
                                                                        <div key={index} className="flex items-center gap-1">
                                                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                                                            {amenity}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-xl font-bold text-blue-600">{formatPrice(option.pricePerNight)}</p>
                                                                <p className="text-sm text-gray-500">per night</p>
                                                                {option.extraCostPerPerson && option.extraCostPerPerson > 0 && (
                                                                    <p className="text-xs text-orange-600 mt-1">+{formatPrice(option.extraCostPerPerson)}/person</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>

                                    {/* Superior Category */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                            <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                                            Superior Category
                                        </h3>
                                        <div className="space-y-3">
                                            {Object.entries(destination.accommodationOptions)
                                                .filter(([, option]) => option.category === 'superior')
                                                .map(([key, option]) => (
                                                    <div
                                                        key={key}
                                                        className={`p-4 border rounded-lg cursor-pointer transition-all ${selection.accommodation === key
                                                            ? 'border-purple-500 bg-purple-50 shadow-md'
                                                            : 'border-gray-200 hover:border-purple-300 hover:shadow-sm'
                                                            }`}
                                                        onClick={() => handleInputChange('accommodation', key)}
                                                    >
                                                        <div className="flex justify-between items-start">
                                                            <div className="flex-1 pr-4">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <h4 className="font-semibold text-gray-900">{option.name}</h4>
                                                                    {option.extraCostPerPerson && option.extraCostPerPerson > 0 && (
                                                                        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                                                                            +{formatPrice(option.extraCostPerPerson)}/person
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                                                                <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                                                                    {option.amenities?.map((amenity: string, index: number) => (
                                                                        <div key={index} className="flex items-center gap-1">
                                                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                                                            {amenity}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-xl font-bold text-purple-600">{formatPrice(option.pricePerNight)}</p>
                                                                <p className="text-sm text-gray-500">per night</p>
                                                                {option.extraCostPerPerson && option.extraCostPerPerson > 0 && (
                                                                    <p className="text-xs text-orange-600 mt-1">+{formatPrice(option.extraCostPerPerson)}/person</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>

                                    {/* Luxury Category */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                            <span className="w-3 h-3 bg-gold-500 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></span>
                                            Luxury Category
                                        </h3>
                                        <div className="space-y-3">
                                            {Object.entries(destination.accommodationOptions)
                                                .filter(([, option]) => option.category === 'luxury')
                                                .map(([key, option]) => (
                                                    <div
                                                        key={key}
                                                        className={`p-4 border rounded-lg cursor-pointer transition-all ${selection.accommodation === key
                                                            ? 'border-yellow-500 bg-yellow-50 shadow-md'
                                                            : 'border-gray-200 hover:border-yellow-300 hover:shadow-sm'
                                                            }`}
                                                        onClick={() => handleInputChange('accommodation', key)}
                                                    >
                                                        <div className="flex justify-between items-start">
                                                            <div className="flex-1 pr-4">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <h4 className="font-semibold text-gray-900">{option.name}</h4>
                                                                    {option.extraCostPerPerson && option.extraCostPerPerson > 0 && (
                                                                        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                                                                            +{formatPrice(option.extraCostPerPerson)}/person
                                                                        </span>
                                                                    )}
                                                                    <span className="text-xs bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-2 py-1 rounded-full">
                                                                        Premium
                                                                    </span>
                                                                </div>
                                                                <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                                                                <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                                                                    {option.amenities?.map((amenity: string, index: number) => (
                                                                        <div key={index} className="flex items-center gap-1">
                                                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                                                            {amenity}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-xl font-bold text-yellow-600">{formatPrice(option.pricePerNight)}</p>
                                                                <p className="text-sm text-gray-500">per night</p>
                                                                {option.extraCostPerPerson && option.extraCostPerPerson > 0 && (
                                                                    <p className="text-xs text-orange-600 mt-1">+{formatPrice(option.extraCostPerPerson)}/person</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        )}
                        {!isAccommodationNeeded && (
                            <CardContent>
                                <div className="text-center py-6 bg-grey-50 border border-black-200 rounded-lg">
                                    <p className="text-sm text-gray-700 font-bold mb-2">Upgrade Your Experience</p>
                                    <p className="text-sm text-gray-600">
                                        Please select a package to view upgrade options <br />
                                        Current selection: ({totalDays} day{totalDays > 1 ? 's' : ''}, 0 nights).
                                    </p>
                                </div>
                            </CardContent>
                        )}
                    </Card>

                    {/* Add-on Services */}
                    <Card>
                        <CardHeader
                            className="cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => toggleCardExpansion('addOns')}
                        >
                            <CardTitle className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Settings className="h-5 w-5" />
                                    Additional Services
                                </div>



                                <div className="flex items-center gap-2">
                                    {!expandedCards.addOns && (
                                        <span className="hidden sm:inline text-sm text-gray-600 font-normal">
                                            {getCardSummary('addOns')}
                                        </span>
                                    )}
                                    {expandedCards.addOns ? (
                                        <ChevronUp className="h-4 w-4 text-gray-500" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4 text-gray-500" />
                                    )}
                                </div>
                            </CardTitle>
                            {expandedCards.addOns && (
                                <CardDescription>Enhance your experience with these optional services</CardDescription>
                            )}
                        </CardHeader>
                        {expandedCards.addOns && (
                            <CardContent>
                                <div className="space-y-3">
                                    {Object.entries(destination.addOnServices).map(([key, service]) => (
                                        <div
                                            key={key}
                                            className={`p-3 border rounded-lg cursor-pointer transition-all ${selection.addOns.includes(key)
                                                ? 'border-green-500 bg-green-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            onClick={() => handleAddOnToggle(key)}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-3">
                                                    {key === 'photography' && <Camera className="h-5 w-5" />}
                                                    {key === 'guide' && <User className="h-5 w-5" />}
                                                    {key === 'cultural-show' && <Music className="h-5 w-5" />}
                                                    {key.startsWith('transport-') && <Car className="h-5 w-5" />}
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <h4 className="font-medium">{service.name}</h4>
                                                            {key.startsWith('transport-') && service.extraCostPerPerson && (
                                                                <span className={`text-xs px-2 py-1 rounded-full ${service.extraCostPerPerson < 0
                                                                    ? 'bg-green-100 text-green-600'
                                                                    : 'bg-orange-100 text-orange-600'
                                                                    }`}>
                                                                    {service.extraCostPerPerson < 0 ? '' : '+'}{formatPrice(service.extraCostPerPerson)}/person
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-gray-600">{service.description}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold">
                                                        {service.price ? formatPrice(service.price) : formatPrice(service.pricePerDay || 0)}
                                                        {service.pricePerDay && '/day'}
                                                    </p>
                                                    {key.startsWith('transport-') && service.extraCostPerPerson && (
                                                        <p className="text-xs text-gray-500">
                                                            Per person {service.extraCostPerPerson < 0 ? 'discount' : 'upgrade'}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        )}
                    </Card>
                </div>

                {/* Price Summary */}
                <div className="lg:sticky lg:top-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg sm:text-xl">Price Summary</CardTitle>
                            <CardDescription>Your customized package details</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {priceBreakdown && selection.selectedPackages.length > 0 ? (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-start">
                                            <span className="text-sm sm:text-base">Selected Packages ({selection.numberOfPeople} adults{selection.numberOfChildren > 0 ? `, ${selection.numberOfChildren} children` : ''})</span>
                                            <span className="font-medium text-sm sm:text-base">{formatPrice(priceBreakdown.basePackagePrice)}</span>
                                        </div>
                                        {selection.numberOfChildren > 0 && (
                                            <div className="text-sm text-green-600 ml-4">
                                                • Children discount applied: 50% off packages & meals
                                            </div>
                                        )}
                                        <div className="text-sm text-gray-600 ml-4">
                                            {selection.selectedPackages.map(pkgKey => {
                                                const pkg = destination.availablePackages[pkgKey];
                                                return (
                                                    <div key={pkgKey}>• {pkg.name} ({pkg.duration} day{pkg.duration > 1 ? 's' : ''})</div>
                                                );
                                            })}
                                            <div className="font-medium mt-1">
                                                Total Duration: {totalDays} day{totalDays > 1 ? 's' : ''}
                                                {totalNights > 0 && `, ${totalNights} night${totalNights > 1 ? 's' : ''}`}
                                            </div>
                                        </div>
                                        {priceBreakdown.accommodationUpgradeCost > 0 && (
                                            <div className="flex justify-between items-start">
                                                <span className="text-sm sm:text-base">Room Upgrade Cost</span>
                                                <span className="font-medium text-sm sm:text-base">{formatPrice(priceBreakdown.accommodationUpgradeCost)}</span>
                                            </div>
                                        )}
                                        {priceBreakdown.childrenAccommodationDiscount > 0 && (
                                            <div className="flex justify-between items-start text-green-600">
                                                <span className="text-sm sm:text-base">Children Room Upgrade Discount (50%)</span>
                                                <span className="font-medium text-sm sm:text-base">-{formatPrice(priceBreakdown.childrenAccommodationDiscount)}</span>
                                            </div>
                                        )}
                                        {priceBreakdown.accommodationPrice > 0 && (
                                            <div className="text-sm text-gray-600 ml-4">
                                                • {destination.accommodationOptions[selection.accommodation].name} - {destination.accommodationOptions[selection.accommodation].description}
                                                <br />• {totalNights} night{totalNights > 1 ? 's' : ''} × {selection.numberOfRooms} room{selection.numberOfRooms > 1 ? 's' : ''} × {formatPrice(destination.accommodationOptions[selection.accommodation].pricePerNight)}/night
                                                {destination.accommodationOptions[selection.accommodation].extraCostPerPerson && (
                                                    <>
                                                        <br />• Upgrade cost: {formatPrice(destination.accommodationOptions[selection.accommodation].extraCostPerPerson!)}/person/night
                                                        {selection.numberOfChildren > 0 && (
                                                            <span className="text-green-600"> (Children get 50% off)</span>
                                                        )}
                                                    </>
                                                )}
                                                <br />• Room allocation: {priceBreakdown.roomDetails.peoplePerRoom.map((people, index) =>
                                                    `Room ${index + 1}: ${people} ${people === 1 ? 'person' : 'people'}`
                                                ).join(', ')}
                                                {selection.numberOfRooms < Math.ceil((selection.numberOfPeople + selection.numberOfChildren) / 3) && (
                                                    <div className="text-red-600">
                                                        ⚠️ Consider booking {Math.ceil((selection.numberOfPeople + selection.numberOfChildren) / 3)} rooms for comfort
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        {selection.accommodation === 'none' && (
                                            <div className="text-sm text-gray-500 ml-4">
                                                • Day tours only - no overnight accommodation
                                            </div>
                                        )}
                                        {selection.addOns.length > 0 && (
                                            <>
                                                <div className="flex justify-between">
                                                    <span>Additional Services</span>
                                                    <span className={priceBreakdown.addOnPrice < 0 ? 'text-green-600' : ''}>
                                                        {priceBreakdown.addOnPrice < 0 ? '' : '+'}{formatPrice(priceBreakdown.addOnPrice)}
                                                    </span>
                                                </div>
                                                <div className="text-sm text-gray-600 ml-4">
                                                    {selection.addOns.map(addOnKey => (
                                                        <div key={addOnKey}>• {destination.addOnServices[addOnKey].name} - {destination.addOnServices[addOnKey].description}</div>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                        <hr className="my-2" />
                                        <div className="flex justify-between">
                                            <span>Subtotal</span>
                                            <span>{formatPrice(priceBreakdown.subtotal)}</span>
                                        </div>
                                        {priceBreakdown.seasonalAdjustment !== 0 && (
                                            <div className="flex justify-between text-blue-600">
                                                <span>Seasonal Adjustment</span>
                                                <span>
                                                    {priceBreakdown.seasonalAdjustment > 0 ? '+' : ''}
                                                    {formatPrice(priceBreakdown.seasonalAdjustment)}
                                                </span>
                                            </div>
                                        )}
                                        {priceBreakdown.groupDiscount > 0 && (
                                            <div className="flex justify-between text-green-600">
                                                <span>Group Discount</span>
                                                <span>-{formatPrice(priceBreakdown.groupDiscount)}</span>
                                            </div>
                                        )}
                                        {priceBreakdown.childrenDiscount > 0 && (
                                            <div className="flex justify-between text-green-600">
                                                <span>Children Discount (50% off)</span>
                                                <span>-{formatPrice(priceBreakdown.childrenDiscount)}</span>
                                            </div>
                                        )}

                                        {/* Coupon Section */}
                                        <div className="border-t border-gray-200 pt-3 mt-3">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Ticket className="h-4 w-4 text-purple-600" />
                                                <span className="font-medium text-sm">Have a Coupon?</span>
                                            </div>

                                            {!selection.appliedCoupon ? (
                                                <div className="space-y-2">
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            placeholder="Enter coupon code"
                                                            value={couponCode}
                                                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                                            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                                            onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                                                        />
                                                        <Button
                                                            size="sm"
                                                            onClick={handleApplyCoupon}
                                                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700"
                                                        >
                                                            Apply
                                                        </Button>
                                                    </div>
                                                    {couponError && (
                                                        <p className="text-xs text-red-600">{couponError}</p>
                                                    )}
                                                    {couponSuccess && (
                                                        <p className="text-xs text-green-600">{couponSuccess}</p>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-between p-2 bg-purple-50 border border-purple-200 rounded-md">
                                                    <div className="flex items-center gap-2">
                                                        <Ticket className="h-4 w-4 text-purple-600" />
                                                        <span className="text-sm font-medium text-purple-800">
                                                            {pricingConfig.coupons?.[selection.appliedCoupon]?.name || selection.appliedCoupon}
                                                        </span>
                                                    </div>
                                                    <button
                                                        onClick={handleRemoveCoupon}
                                                        className="text-xs text-purple-600 hover:text-purple-800 underline"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {priceBreakdown.couponDiscount > 0 && (
                                            <div className="flex justify-between text-purple-600">
                                                <span>Coupon Discount</span>
                                                <span>-{formatPrice(priceBreakdown.couponDiscount)}</span>
                                            </div>
                                        )}

                                        <hr className="my-2" />
                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total</span>
                                            <span>{formatPrice(priceBreakdown.finalTotal)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Per Person</span>
                                            <span>{formatPrice(priceBreakdown.pricePerPerson)}</span>
                                        </div>
                                    </div>

                                    <Button className="w-full py-3 sm:py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] transition-all duration-200" size="lg">
                                        Book Now
                                    </Button>

                                    <p className="text-xs sm:text-sm text-gray-500 text-center px-2">
                                        Final price may vary based on availability and special offers
                                    </p>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">
                                        {!selection.startDate
                                            ? 'Select your travel date to see pricing'
                                            : selection.selectedPackages.length === 0
                                                ? 'Select at least one package to see pricing'
                                                : ''
                                        }
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default BookingForm;
