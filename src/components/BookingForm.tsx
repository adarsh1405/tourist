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
        accommodation: 'standard',
        meals: 'included',
        transport: 'ac-car',
        addOns: [],
        numberOfPeople: 2,
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
        transportation: false,
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
        }
    }, [
        selection.startDate,
        selection.selectedPackages,
        selection.numberOfPeople,
        selection.accommodation,
        selection.meals,
        selection.transport,
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
                    ? `${formatDateDisplay(selection.startDate)} • ${selection.numberOfPeople} people` 
                    : 'Select travel date and group size';
            case 'packages':
                return selection.selectedPackages.length > 0 
                    ? `${selection.selectedPackages.length} package${selection.selectedPackages.length > 1 ? 's' : ''} selected`
                    : 'No packages selected';
            case 'accommodation':
                const acc = destination.accommodationOptions[selection.accommodation];
                return `${acc.name} - ${formatPrice(acc.pricePerNight)}/night`;
            case 'transportation':
                const transport = destination.transportOptions[selection.transport];
                return `${transport.name} - ${formatPrice(transport.pricePerDay)}/day`;
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

    const handleDateChange = (value: string) => {
        handleInputChange('startDate', value);
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <div className="flex items-center justify-between">
                <Button
                    variant="outline"
                    onClick={onBackToHome}
                    className="flex items-center gap-2 text-black hover-alt-text"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Button>
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900">Customize Your Journey</h1>
                    <p className="text-xl text-gray-600">Select your preferred packages and options</p>
                </div>
                <div></div> {/* Spacer for flex layout */}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                                        <span className="text-sm text-gray-600 font-normal">
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
                                <div className="grid grid-cols-2 gap-4">
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
                                            <p className="text-sm text-gray-600 mt-1">
                                                Selected: {formatDateDisplay(selection.startDate)}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                                            <Users className="h-4 w-4" />
                                            Number of People
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
                                        <span className="text-sm text-gray-600 font-normal">
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
                    <Card>
                        <CardHeader 
                            className="cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => toggleCardExpansion('accommodation')}
                        >
                            <CardTitle className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Bed className="h-5 w-5" />
                                    Accommodation
                                </div>                                
                                <div className="flex items-center gap-2">
                                    {!expandedCards.accommodation && (
                                        <span className="text-sm text-gray-600 font-normal">
                                            {getCardSummary('accommodation')}
                                        </span>
                                    )}
                                    {expandedCards.accommodation ? (
                                        <ChevronUp className="h-4 w-4 text-gray-500" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4 text-gray-500" />
                                    )}
                                </div>
                            </CardTitle>
                        </CardHeader>
                        {expandedCards.accommodation && (
                            <CardContent>
                                <div className="space-y-3">
                                    {Object.entries(destination.accommodationOptions).map(([key, option]) => (
                                        <div
                                            key={key}
                                            className={`p-3 border rounded-lg cursor-pointer transition-all ${selection.accommodation === key
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            onClick={() => handleInputChange('accommodation', key)}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h4 className="font-medium">{option.name}</h4>
                                                    <p className="text-sm text-gray-600">{option.description}</p>
                                                </div>
                                                <p className="font-semibold">{formatPrice(option.pricePerNight)}/night</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        )}
                    </Card>

                    {/* Transportation */}
                    <Card>
                        <CardHeader 
                            className="cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => toggleCardExpansion('transportation')}
                        >
                            <CardTitle className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Car className="h-5 w-5" />
                                    Transportation
                                </div>
                                <div className="flex items-center gap-2">
                                    {!expandedCards.transportation && (
                                        <span className="text-sm text-gray-600 font-normal">
                                            {getCardSummary('transportation')}
                                        </span>
                                    )}
                                    {expandedCards.transportation ? (
                                        <ChevronUp className="h-4 w-4 text-gray-500" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4 text-gray-500" />
                                    )}
                                </div>
                            </CardTitle>
                        </CardHeader>
                        {expandedCards.transportation && (
                            <CardContent>
                                <div className="space-y-3">
                                    {Object.entries(destination.transportOptions).map(([key, option]) => (
                                        <div
                                            key={key}
                                            className={`p-3 border rounded-lg cursor-pointer transition-all ${selection.transport === key
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            onClick={() => handleInputChange('transport', key)}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h4 className="font-medium">{option.name}</h4>
                                                    <p className="text-sm text-gray-600">{option.description}</p>
                                                </div>
                                                <p className="font-semibold">{formatPrice(option.pricePerDay)}/day</p>
                                            </div>
                                        </div>
                                    ))}
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
                                        <span className="text-sm text-gray-600 font-normal">
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
                                                    <div>
                                                        <h4 className="font-medium">{service.name}</h4>
                                                        <p className="text-sm text-gray-600">{service.description}</p>
                                                    </div>
                                                </div>
                                                <p className="font-semibold">
                                                    {service.price ? formatPrice(service.price) : formatPrice(service.pricePerDay || 0)}
                                                    {service.pricePerDay && '/day'}
                                                </p>
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
                            <CardTitle>Price Summary</CardTitle>
                            <CardDescription>Your customized package details</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {priceBreakdown && selection.selectedPackages.length > 0 ? (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>Selected Packages ({selection.numberOfPeople} people)</span>
                                            <span>{formatPrice(priceBreakdown.basePackagePrice)}</span>
                                        </div>
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
                                        <div className="flex justify-between">
                                            <span>Accommodation</span>
                                            <span>{priceBreakdown.accommodationPrice > 0 ? formatPrice(priceBreakdown.accommodationPrice) : 'Not Required'}</span>
                                        </div>
                                        {priceBreakdown.accommodationPrice > 0 && (
                                            <div className="text-sm text-gray-600 ml-4">
                                                • {destination.accommodationOptions[selection.accommodation].name} - {destination.accommodationOptions[selection.accommodation].description}
                                                <br />• {totalNights} night{totalNights > 1 ? 's' : ''} × {Math.ceil(selection.numberOfPeople / 2)} room{Math.ceil(selection.numberOfPeople / 2) > 1 ? 's' : ''} × {formatPrice(destination.accommodationOptions[selection.accommodation].pricePerNight)}/night
                                            </div>
                                        )}
                                        {priceBreakdown.accommodationPrice === 0 && (
                                            <div className="text-sm text-gray-500 ml-4">
                                                • No overnight stay required for day tours
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <span>Transportation</span>
                                            <span>{formatPrice(priceBreakdown.transportPrice)}</span>
                                        </div>
                                        <div className="text-sm text-gray-600 ml-4">
                                            • {destination.transportOptions[selection.transport].name} - {destination.transportOptions[selection.transport].description}
                                        </div>
                                        {priceBreakdown.addOnPrice > 0 && (
                                            <>
                                                <div className="flex justify-between">
                                                    <span>Additional Services</span>
                                                    <span>{formatPrice(priceBreakdown.addOnPrice)}</span>
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

                                    <Button className="w-full" size="lg">
                                        Book Now
                                    </Button>

                                    <p className="text-xs text-gray-500 text-center">
                                        Final price may vary based on availability and special offers
                                    </p>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">
                                        {selection.selectedPackages.length === 0
                                            ? 'Select at least one package to see pricing'
                                            : 'Select your travel date to see pricing'
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
