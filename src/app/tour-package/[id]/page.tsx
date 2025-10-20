'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { tourPackageDetails } from '@/data/tour-package-details';
import {
    Clock,
    Users,
    Star,
    Check,
    X,
    ArrowLeft,
    ChevronRight
} from 'lucide-react';

interface TourPackagePageProps {
    params: Promise<{
        id: string;
    }>;
}

export default function TourPackagePage({ params }: TourPackagePageProps) {
    const resolvedParams = React.use(params);
    const packageDetails = tourPackageDetails[resolvedParams.id];

    if (!packageDetails) {
        notFound();
    }

    const scrollToBooking = () => {
        // Redirect to plan your journey page
        window.location.href = '/#booking';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header with Back Button */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/"
                            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5 mr-2" />
                            Back to Home
                        </Link>
                        <Button
                            onClick={scrollToBooking}
                            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2"
                        >
                            Plan Your Journey
                        </Button>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="relative h-[50vh] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${packageDetails.images.hero})`
                    }}
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-6">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">{packageDetails.name}</h1>
                    <p className="text-xl md:text-2xl mb-6 max-w-2xl">{packageDetails.shortDescription}</p>
                    <div className="flex flex-wrap items-center justify-center gap-6 text-lg">
                        <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-2" />
                            {packageDetails.duration} Days
                        </div>
                        <div className="flex items-center">
                            <Users className="h-5 w-5 mr-2" />
                            Starting from ₹{packageDetails.price.toLocaleString()}
                        </div>
                        <div className="flex items-center">
                            <Star className="h-5 w-5 mr-2 text-yellow-400" />
                            4.8/5 Rating
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Overview */}
                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Package Overview</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">{packageDetails.detailedDescription}</p>
                        </section>

                        {/* Highlights */}
                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Tour Highlights</h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                {packageDetails.highlights.map((highlight, index) => (
                                    <div key={index} className="flex items-start">
                                        <Star className="h-5 w-5 text-yellow-500 mr-3 mt-1 flex-shrink-0" />
                                        <span className="text-gray-700">{highlight}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Detailed Itinerary */}
                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Detailed Itinerary</h2>
                            <div className="space-y-8">
                                {packageDetails.itinerary.map((day, index) => (
                                    <div key={day.day} className="relative">
                                        {/* Timeline connector */}
                                        {index < packageDetails.itinerary.length - 1 && (
                                            <div className="absolute left-12 top-16 w-0.5 h-full bg-gray-300"></div>
                                        )}

                                        <Card className="relative z-10 overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                            <CardContent className="p-0">
                                                <div className="flex">
                                                    {/* Day Number Circle */}
                                                    <div className="flex-shrink-0 flex items-center justify-center p-6">
                                                        <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center">
                                                            <span className="text-xl font-bold text-white">
                                                                {day.day}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Day Content */}
                                                    <div className="flex-1 p-6">
                                                        <div className="flex items-start justify-between mb-4">
                                                            <div>
                                                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                                    Day {day.day}: {day.title}
                                                                </h3>
                                                                <p className="text-gray-600 mb-4">{day.description}</p>
                                                                {day.estimatedTime && (
                                                                    <div className="flex items-center text-sm text-gray-500 mb-4">
                                                                        <Clock className="h-4 w-4 mr-2" />
                                                                        {day.estimatedTime}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Activities Timeline */}
                                                        <div className="mb-6">
                                                            <h4 className="font-semibold text-gray-900 mb-3">Activities & Schedule</h4>
                                                            <div className="space-y-3">
                                                                {day.activities.map((activity, actIndex) => (
                                                                    <div key={actIndex} className="flex items-start">
                                                                        <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2 mr-4"></div>
                                                                        <span className="text-gray-700">{activity}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Highlights */}
                                                        <div className="mb-6">
                                                            <h4 className="font-semibold text-gray-900 mb-3">Day Highlights</h4>
                                                            <div className="flex flex-wrap gap-2">
                                                                {day.highlights.map((highlight, highlightIndex) => (
                                                                    <span
                                                                        key={highlightIndex}
                                                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800"
                                                                    >
                                                                        <Star className="h-3 w-3 mr-1" />
                                                                        {highlight}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Meals & Accommodation */}
                                                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                                                            <div>
                                                                <span className="font-semibold text-gray-900">Meals: </span>
                                                                <span className="text-gray-600">{day.meals.join(', ')}</span>
                                                            </div>
                                                            {day.accommodation && (
                                                                <div>
                                                                    <span className="font-semibold text-gray-900">Stay: </span>
                                                                    <span className="text-gray-600">{day.accommodation}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Inclusions & Exclusions */}
                        <section>
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Inclusions */}
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center">
                                            <Check className="h-5 w-5 mr-2" />
                                            What&apos;s Included
                                        </h3>
                                        <ul className="space-y-2">
                                            {packageDetails.inclusions.map((item, index) => (
                                                <li key={index} className="flex items-start">
                                                    <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-700 text-sm">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>

                                {/* Exclusions */}
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center">
                                            <X className="h-5 w-5 mr-2" />
                                            What&apos;s Not Included
                                        </h3>
                                        <ul className="space-y-2">
                                            {packageDetails.exclusions.map((item, index) => (
                                                <li key={index} className="flex items-start">
                                                    <X className="h-4 w-4 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-700 text-sm">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Booking Card */}
                            <Card>
                                <CardContent className="p-6">
                                    <div className="text-center mb-6">
                                        <div className="text-3xl font-bold text-orange-600 mb-2">
                                            ₹{packageDetails.price.toLocaleString()}
                                        </div>
                                        <div className="text-gray-600">per person</div>
                                        <div className="text-sm text-gray-500 mt-1">
                                            {packageDetails.duration} days tour package
                                        </div>
                                    </div>

                                    <Button
                                        onClick={scrollToBooking}
                                        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 text-lg font-semibold"
                                    >
                                        Plan Your Journey
                                    </Button>

                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <div className="flex items-center text-sm text-gray-600 mb-2">
                                            <Check className="h-4 w-4 text-green-500 mr-2" />
                                            Free cancellation up to 48 hours
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600 mb-2">
                                            <Check className="h-4 w-4 text-green-500 mr-2" />
                                            Instant confirmation
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Check className="h-4 w-4 text-green-500 mr-2" />
                                            Professional guide included
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Important Information */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Important Information</h3>
                                    <ul className="space-y-2">
                                        {packageDetails.importantInfo.map((info, index) => (
                                            <li key={index} className="flex items-start text-sm">
                                                <ChevronRight className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-700">{info}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Tags */}
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Tour Categories</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {packageDetails.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-blue-600 to-orange-600 py-16">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to Experience {packageDetails.name}?
                    </h2>
                    <p className="text-xl text-white mb-8">
                        Book now and create unforgettable memories in beautiful Odisha
                    </p>
                    <Button
                        onClick={scrollToBooking}
                        className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
                    >
                        Plan Your Journey
                    </Button>
                </div>
            </div>
        </div>
    );
}
