'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BookingSelection, PriceBreakdown, PricingConfig } from '@/types/booking';
import { PricingCalculator } from '@/utils/pricing-calculator';
import { Calendar, Users, MapPin, Car, Camera, User, Music, ArrowLeft, Check } from 'lucide-react';
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
        season: 'normal'
    });

    const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown | null>(null);

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
        calculator
    ]);

    const destination = pricingConfig.destinations[selection.destination];

    const handleInputChange = (field: keyof BookingSelection, value: string | number | string[]) => {
        setSelection(prev => ({ ...prev, [field]: value }));
    };

    const handlePackageToggle = (packageKey: string) => {
        setSelection(prev => ({
            ...prev,
            selectedPackages: prev.selectedPackages.includes(packageKey)
                ? prev.selectedPackages.filter(key => key !== packageKey)
                : [...prev.selectedPackages, packageKey]
        }));
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

    const handleDateChange = (value: string) => {
        handleInputChange('startDate', value);
    };

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-8">
            <div className="flex items-center justify-between">
                <Button
                    variant="outline"
                    onClick={onBackToHome}
                    className="flex items-center gap-2"
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
                    {/* Package Selection */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5" />
                                Choose Your Packages
                            </CardTitle>
                            <CardDescription>Select one or more tour packages (you can combine multiple tours)</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {Object.entries(destination.availablePackages).map(([key, pkg]) => (
                                <div
                                    key={key}
                                    className={`p-4 border rounded-lg cursor-pointer transition-all ${selection.selectedPackages.includes(key)
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    onClick={() => handlePackageToggle(key)}
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                {selection.selectedPackages.includes(key) && (
                                                    <Check className="h-5 w-5 text-blue-600" />
                                                )}
                                                <h3 className="font-semibold">{pkg.name}</h3>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1">{pkg.description}</p>
                                            <p className="text-sm text-gray-500 mt-2">Duration: {pkg.duration} day{pkg.duration > 1 ? 's' : ''}</p>
                                            <div className="mt-2">
                                                <p className="text-xs text-gray-500 font-medium">Includes:</p>
                                                <ul className="text-xs text-gray-600 mt-1">
                                                    {pkg.inclusions.slice(0, 3).map((inclusion, idx) => (
                                                        <li key={idx}>• {inclusion}</li>
                                                    ))}
                                                    {pkg.inclusions.length > 3 && (
                                                        <li>+ {pkg.inclusions.length - 3} more...</li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="text-right ml-4">
                                            <p className="font-bold text-lg">{formatPrice(pkg.basePricePerPerson)}</p>
                                            <p className="text-sm text-gray-500">per person</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Travel Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Travel Details
                            </CardTitle>
                        </CardHeader>
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
                    </Card>

                    {/* Accommodation */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Accommodation</CardTitle>
                        </CardHeader>
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
                    </Card>

                    {/* Transportation */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Car className="h-5 w-5" />
                                Transportation
                            </CardTitle>
                        </CardHeader>
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
                    </Card>

                    {/* Add-on Services */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Additional Services</CardTitle>
                            <CardDescription>Enhance your experience with these optional services</CardDescription>
                        </CardHeader>
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
                                            {selection.selectedPackages.map(pkgKey => (
                                                <div key={pkgKey}>• {destination.availablePackages[pkgKey].name}</div>
                                            ))}
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Accommodation</span>
                                            <span>{formatPrice(priceBreakdown.accommodationPrice)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Transportation</span>
                                            <span>{formatPrice(priceBreakdown.transportPrice)}</span>
                                        </div>
                                        {priceBreakdown.addOnPrice > 0 && (
                                            <div className="flex justify-between">
                                                <span>Additional Services</span>
                                                <span>{formatPrice(priceBreakdown.addOnPrice)}</span>
                                            </div>
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
