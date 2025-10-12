'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import {
    MapPin,
    Star,
    Phone,
    Mail,
    Clock,
    Users,
    Shield,
    ChevronLeft,
    ChevronRight,
    Calendar,
    Camera,
    Car
} from 'lucide-react';

interface HomePageProps {
    onStartBooking: () => void;
}

interface Destination {
    id: string;
    name: string;
    images: string[];
    description: string;
    highlights: string[];
    rating: number;
    reviews: number;
    googleMapsLink: string;
}

interface Review {
    id: string;
    name: string;
    rating: number;
    comment: string;
    date: string;
    location: string;
}

const HomePage: React.FC<HomePageProps> = ({ onStartBooking }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const reviewsScrollContainerRef = useRef<HTMLDivElement>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState<Record<string, number>>({});
    const [currentDestinationIndex, setCurrentDestinationIndex] = useState(0);
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

    const popularDestinations: Destination[] = [
        {
            id: 'jagannath-temple',
            name: 'Jagannath Temple',
            images: [
                '/images/destinations/jagannath-temple-1.jpg',
                '/images/destinations/jagannath-temple-2.jpg',
                '/images/destinations/jagannath-temple-3.jpg',
                '/images/destinations/jagannath-rath-yatra.jpg'
            ],
            description: 'One of the four sacred Dhams in Hinduism, famous for its annual Rath Yatra festival.',
            highlights: ['Sacred Dham', 'Rath Yatra', 'Ancient Architecture', 'Spiritual Experience'],
            rating: 4.8,
            reviews: 2847,
            googleMapsLink: 'https://maps.google.com/?q=Jagannath+Temple+Puri'
        },
        {
            id: 'puri-beach',
            name: 'Puri Beach',
            images: [
                '/images/destinations/puri-beach-sunrise.jpg',
                '/images/destinations/puri-beach-activities.jpg',
                '/images/destinations/puri-beach-fishing.jpg',
                '/images/destinations/puri-beach-sunset.jpg'
            ],
            description: 'Golden sandy beach perfect for sunrise views, beach activities, and local seafood.',
            highlights: ['Golden Sand', 'Sunrise Views', 'Beach Sports', 'Fresh Seafood'],
            rating: 4.6,
            reviews: 1923,
            googleMapsLink: 'https://maps.google.com/?q=Puri+Beach+Odisha'
        },
        {
            id: 'konark-sun-temple',
            name: 'Konark Sun Temple',
            images: [
                '/images/destinations/konark-temple-front.jpg',
                '/images/destinations/konark-temple-wheels.jpg',
                '/images/destinations/konark-temple-sculptures.jpg',
                '/images/destinations/konark-temple-sunset.jpg'
            ],
            description: 'UNESCO World Heritage Site, magnificent 13th-century temple dedicated to the Sun God.',
            highlights: ['UNESCO Site', 'Ancient Marvel', 'Intricate Carvings', 'Historical Significance'],
            rating: 4.9,
            reviews: 3156,
            googleMapsLink: 'https://maps.google.com/?q=Konark+Sun+Temple+Odisha'
        },
        {
            id: 'chilika-lake',
            name: 'Chilika Lake',
            images: [
                '/images/destinations/chilika-lake-dolphins.jpg',
                '/images/destinations/chilika-lake-birds.jpg',
                '/images/destinations/chilika-lake-boat.jpg',
                '/images/destinations/chilika-lake-sunset.jpg'
            ],
            description: 'Asia\'s largest brackish water lagoon, famous for migratory birds and Irrawaddy dolphins.',
            highlights: ['Migratory Birds', 'Dolphin Spotting', 'Boat Rides', 'Natural Beauty'],
            rating: 4.7,
            reviews: 1654,
            googleMapsLink: 'https://maps.google.com/?q=Chilika+Lake+Odisha'
        },
        {
            id: 'raghurajpur',
            name: 'Raghurajpur Village',
            images: [
                '/images/destinations/raghurajpur-pattachitra.jpg',
                '/images/destinations/raghurajpur-artists.jpg',
                '/images/destinations/raghurajpur-village.jpg',
                '/images/destinations/raghurajpur-crafts.jpg'
            ],
            description: 'Heritage crafts village known for Pattachitra paintings and traditional art forms.',
            highlights: ['Pattachitra Art', 'Traditional Crafts', 'Cultural Heritage', 'Artist Village'],
            rating: 4.5,
            reviews: 892,
            googleMapsLink: 'https://maps.google.com/?q=Raghurajpur+Village+Puri'
        },
        {
            id: 'pipili',
            name: 'Pipili',
            images: [
                '/images/destinations/pipili-applique.jpg',
                '/images/destinations/pipili-craftsmen.jpg',
                '/images/destinations/pipili-market.jpg',
                '/images/destinations/pipili-handicrafts.jpg'
            ],
            description: 'Famous for colorful appliqué work and traditional Odishan handicrafts.',
            highlights: ['Appliqué Work', 'Handicrafts', 'Traditional Art', 'Shopping'],
            rating: 4.4,
            reviews: 567,
            googleMapsLink: 'https://maps.google.com/?q=Pipili+Puri+Odisha'
        }
    ];

    const customerReviews: Review[] = [
        {
            id: '1',
            name: 'Priya Sharma',
            rating: 5,
            comment: 'Absolutely amazing experience! The tour was well-organized and the guide was very knowledgeable. Visiting Jagannath Temple was a spiritual journey I\'ll never forget.',
            date: '2024-01-15',
            location: 'Delhi'
        },
        {
            id: '2',
            name: 'Rajesh Kumar',
            rating: 5,
            comment: 'Perfect family vacation! The accommodations were comfortable and the food was delicious. Highly recommend the Konark Sun Temple visit.',
            date: '2024-01-10',
            location: 'Mumbai'
        },
        {
            id: '3',
            name: 'Anita Patel',
            rating: 4,
            comment: 'Great value for money. The beach resort stay was fantastic and the children loved the dolphin spotting at Chilika Lake.',
            date: '2024-01-05',
            location: 'Ahmedabad'
        },
        {
            id: '4',
            name: 'Vikram Singh',
            rating: 5,
            comment: 'Professional service from start to finish. The cultural village tour was the highlight of our trip. Will definitely book again!',
            date: '2023-12-28',
            location: 'Bangalore'
        }
    ];

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            const newIndex = currentDestinationIndex > 0 ? currentDestinationIndex - 1 : popularDestinations.length - 1;
            setCurrentDestinationIndex(newIndex);
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            const newIndex = (currentDestinationIndex + 1) % popularDestinations.length;
            setCurrentDestinationIndex(newIndex);
        }
    };

    const scrollReviewsLeft = () => {
        const newIndex = currentReviewIndex > 0 ? currentReviewIndex - 1 : customerReviews.length - 1;
        setCurrentReviewIndex(newIndex);
    };

    const scrollReviewsRight = () => {
        const newIndex = (currentReviewIndex + 1) % customerReviews.length;
        setCurrentReviewIndex(newIndex);
    };

    const nextImage = (destinationId: string, totalImages: number) => {
        setCurrentImageIndex(prev => ({
            ...prev,
            [destinationId]: ((prev[destinationId] || 0) + 1) % totalImages
        }));
    };

    const prevImage = (destinationId: string, totalImages: number) => {
        setCurrentImageIndex(prev => ({
            ...prev,
            [destinationId]: ((prev[destinationId] || 0) - 1 + totalImages) % totalImages
        }));
    };

    const getCurrentImageIndex = (destinationId: string) => {
        return currentImageIndex[destinationId] || 0;
    };

    // Auto-scroll for destinations
    useEffect(() => {
        const destinationInterval = setInterval(() => {
            setCurrentDestinationIndex(prev => (prev + 1) % popularDestinations.length);
        }, 5000);

        return () => clearInterval(destinationInterval);
    }, [popularDestinations.length]);

    // Auto-scroll for reviews
    useEffect(() => {
        const reviewInterval = setInterval(() => {
            setCurrentReviewIndex(prev => (prev + 1) % customerReviews.length);
        }, 5000);

        return () => clearInterval(reviewInterval);
    }, [customerReviews.length]);

    // Scroll destinations container when index changes
    useEffect(() => {
        if (scrollContainerRef.current) {
            const cardWidth = 384 + 24; // w-96 (384px) + gap (24px)
            scrollContainerRef.current.scrollTo({
                left: currentDestinationIndex * cardWidth,
                behavior: 'smooth'
            });
        }
    }, [currentDestinationIndex]);

    // Scroll reviews container when index changes
    useEffect(() => {
        if (reviewsScrollContainerRef.current) {
            const cardWidth = 320; // Approximate review card width + gap
            reviewsScrollContainerRef.current.scrollTo({
                left: currentReviewIndex * cardWidth,
                behavior: 'smooth'
            });
        }
    }, [currentReviewIndex]);

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
        ));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-6">
                <div className="text-center max-w-4xl mx-auto z-10">
                    <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
                        Discover
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">
                            Puri, Odisha
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                        Experience the spiritual heart of India with our premium tour packages.
                        From sacred temples to pristine beaches, create memories that last a lifetime.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={onStartBooking}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg transform transition hover:scale-105"
                        >
                            <Calendar className="h-5 w-5 mr-2" />
                            Plan Your Journey
                        </Button>
                        <Button
                            variant="outline"
                            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-lg"
                            onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            <MapPin className="h-5 w-5 mr-2" />
                            Explore Destinations
                        </Button>
                    </div>
                </div>
            </section>

            {/* Popular Destinations Section */}
            <section id="destinations" className="py-20 px-6 bg-white/80 backdrop-blur-sm relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
                        <p className="text-xl text-gray-600">Discover the most enchanting places in and around Puri</p>
                    </div>

                    <div className="relative">
                        <div className="flex items-center justify-between mb-6">
                            <Button
                                variant="outline"
                                onClick={scrollLeft}
                                className="p-3 rounded-full shadow-md hover:shadow-lg"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </Button>
                            <Button
                                variant="outline"
                                onClick={scrollRight}
                                className="p-3 rounded-full shadow-md hover:shadow-lg"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </Button>
                        </div>

                        <div
                            ref={scrollContainerRef}
                            className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {popularDestinations.map((destination) => (
                                <div
                                    key={destination.id}
                                    className="flex-none w-96 relative"
                                >
                                    <Card className="h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                        {/* Image Carousel Section */}
                                        <div className="h-48 relative overflow-hidden">
                                            {/* Current Image */}
                                            <div
                                                className="h-full bg-gradient-to-br from-blue-200 to-orange-200 flex items-center justify-center transition-all duration-500"
                                                style={{
                                                    backgroundImage: destination.images[getCurrentImageIndex(destination.id)]
                                                        ? `url(${destination.images[getCurrentImageIndex(destination.id)]})`
                                                        : undefined,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}
                                            >
                                                {/* Fallback camera icon if image doesn't load */}
                                                <Camera className="h-16 w-16 text-gray-400 opacity-50" />
                                            </div>

                                            {/* Image Navigation */}
                                            {destination.images.length > 1 && (
                                                <>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            prevImage(destination.id, destination.images.length);
                                                        }}
                                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 transition-opacity"
                                                    >
                                                        <ChevronLeft className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            nextImage(destination.id, destination.images.length);
                                                        }}
                                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 transition-opacity"
                                                    >
                                                        <ChevronRight className="h-4 w-4" />
                                                    </button>
                                                </>
                                            )}

                                            {/* Rating Badge */}
                                            <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center space-x-1">
                                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                <span className="text-sm font-semibold">{destination.rating}</span>
                                            </div>

                                            {/* Image Indicators */}
                                            {destination.images.length > 1 && (
                                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                                    {destination.images.map((_, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setCurrentImageIndex(prev => ({
                                                                    ...prev,
                                                                    [destination.id]: index
                                                                }));
                                                            }}
                                                            className={`w-2 h-2 rounded-full transition-colors ${getCurrentImageIndex(destination.id) === index
                                                                ? 'bg-white'
                                                                : 'bg-white bg-opacity-50'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                            )}

                                            {/* Image Counter */}
                                            {destination.images.length > 1 && (
                                                <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                                                    {getCurrentImageIndex(destination.id) + 1} / {destination.images.length}
                                                </div>
                                            )}
                                        </div>

                                        {/* Content Section */}
                                        <CardContent className="p-6">
                                            {/* Header */}
                                            <div className="mb-4">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">{destination.name}</h3>
                                                <div className="flex items-center mb-3">
                                                    <div className="flex items-center space-x-1 mr-3">
                                                        {renderStars(destination.rating)}
                                                    </div>
                                                    <span className="text-sm text-gray-600">
                                                        ({destination.reviews} reviews)
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-gray-700 text-sm mb-4 leading-relaxed line-clamp-3">
                                                {destination.description}
                                            </p>

                                            {/* Highlights */}
                                            <div className="mb-4">
                                                <h4 className="font-semibold text-sm text-gray-900 mb-2">Highlights:</h4>
                                                <div className="flex flex-wrap gap-1">
                                                    {destination.highlights.slice(0, 3).map((highlight, index) => (
                                                        <span
                                                            key={index}
                                                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                                                        >
                                                            {highlight}
                                                        </span>
                                                    ))}
                                                    {destination.highlights.length > 3 && (
                                                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                                                            +{destination.highlights.length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex gap-2">
                                                <a
                                                    href={destination.googleMapsLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 bg-blue-600 text-white text-center py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
                                                >
                                                    <MapPin className="h-4 w-4" />
                                                    View Maps
                                                </a>
                                                <button
                                                    onClick={onStartBooking}
                                                    className="flex-1 bg-orange-600 text-white text-center py-2 px-3 rounded-lg hover:bg-orange-700 transition-colors text-sm"
                                                >
                                                    Book Now
                                                </button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Company Features */}
            <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-orange-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Puri Tours?</h2>
                        <p className="text-xl text-gray-600">Experience the difference with our premium services</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <Shield className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Safe & Secure</h3>
                            <p className="text-gray-600 text-sm">Fully licensed and insured tours with experienced guides</p>
                        </Card>

                        <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                            <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <Users className="h-8 w-8 text-orange-600" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Expert Guides</h3>
                            <p className="text-gray-600 text-sm">Local experts with deep knowledge of culture and history</p>
                        </Card>

                        <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <Clock className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
                            <p className="text-gray-600 text-sm">Round-the-clock customer support for peace of mind</p>
                        </Card>

                        <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <Car className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Comfortable Travel</h3>
                            <p className="text-gray-600 text-sm">AC vehicles and premium accommodations for your comfort</p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Customer Reviews */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
                        <p className="text-xl text-gray-600">Real experiences from real travelers</p>
                    </div>

                    <div className="relative">
                        <div className="flex items-center justify-between mb-6">
                            <Button
                                variant="outline"
                                onClick={scrollReviewsLeft}
                                className="p-3 rounded-full shadow-md hover:shadow-lg"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </Button>
                            <Button
                                variant="outline"
                                onClick={scrollReviewsRight}
                                className="p-3 rounded-full shadow-md hover:shadow-lg"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </Button>
                        </div>

                        <div
                            ref={reviewsScrollContainerRef}
                            className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {customerReviews.map((review) => (
                                <div key={review.id} className="flex-none w-80">
                                    <Card className="p-6 hover:shadow-lg transition-shadow h-full">
                                        <div className="flex items-center mb-4">
                                            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold mr-3">
                                                {review.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">{review.name}</h4>
                                                <p className="text-sm text-gray-500">{review.location}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center mb-3">
                                            {renderStars(review.rating)}
                                        </div>

                                        <p className="text-gray-600 text-sm mb-3 line-clamp-4">{review.comment}</p>

                                        <p className="text-xs text-gray-400">
                                            {new Date(review.date).toLocaleDateString('en-IN', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Information */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
                        <p className="text-xl text-gray-600">We&apos;re here to help plan your perfect journey</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                            <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-2">Phone</h3>
                            <p className="text-gray-600">+91 9876543210</p>
                            <p className="text-gray-600">+91 9876543211</p>
                        </Card>

                        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                            <Mail className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-2">Email</h3>
                            <p className="text-gray-600">info@puritours.com</p>
                            <p className="text-gray-600">booking@puritours.com</p>
                        </Card>

                        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                            <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-2">Office</h3>
                            <p className="text-gray-600 text-sm">123 Marine Drive</p>
                            <p className="text-gray-600 text-sm">Puri, Odisha 752001</p>
                        </Card>
                    </div>
                </div>
            </section>



            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Puri Tours</h3>
                            <p className="text-gray-300 mb-4">
                                Your trusted partner for exploring the spiritual and cultural heritage of Puri, Odisha.
                            </p>
                            <div className="flex space-x-4">
                                <div className="bg-blue-600 rounded-full p-2">
                                    <Phone className="h-4 w-4" />
                                </div>
                                <div className="bg-orange-600 rounded-full p-2">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <div className="bg-green-600 rounded-full p-2">
                                    <MapPin className="h-4 w-4" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-gray-300">
                                <li><a href="#destinations" className="hover:text-white">Destinations</a></li>
                                <li><a href="#" className="hover:text-white">Tour Packages</a></li>
                                <li><a href="#" className="hover:text-white">About Us</a></li>
                                <li><a href="#" className="hover:text-white">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-gray-300">
                                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white">Cancellation Policy</a></li>
                                <li><a href="#" className="hover:text-white">Travel Insurance</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 Puri Tours. All rights reserved. | Licensed Tour Operator</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
