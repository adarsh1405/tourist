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

interface TourPackage {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    image: string;
    inclusions: string[];
    exclusions: string[];
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
            id: 'bhubaneshwar',
            name: 'Bhubaneshwar City',
            images: [
                '/images/destinations/dhauli.jpg',
                '/images/destinations/khandagiri.jpg',
                '/images/destinations/lingaraj.jpg',
                '/images/destinations/nandankanan.jpg'
            ],
            description: 'Capital city known for its temples, vibrant markets, and rich cultural heritage.',
            highlights: ['Temples', 'Cultural Heritage', 'Vibrant Markets', 'Historical Sites'],
            rating: 4.5,
            reviews: 1345,
            googleMapsLink: 'https://maps.google.com/?q=Bhubaneshwar+Odisha'
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
            highlights: ['Appliqué Work', 'Traditional Art', 'Cultural Heritage', 'Handicrafts', 'Shopping'],
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

    const tourPackages: TourPackage[] = [
        {
            id: 'golden-triangle',
            name: 'Golden Triangle Package',
            description: 'Complete 3-days of Puri , Konark , Bhubaneshwar circuit with accommodation',
            price: 8950,
            duration: 3,
            image: '/images/destinations/jagannath-temple-1.jpg',
            inclusions: [
                'All major temples visit',
                'Puri , Konark , Bhubaneshwar sightseeing',
                '2 nights accommodation in a standard room in Puri',
                'AC transportation',
                'Parking fees covered',
                'Surprise gifts for guests'
            ],
            exclusions: [
                'Personal Expense',
                'Entry fees',
                'Travel insurance',
                'Extra sightseeing'
            ]
        },
        {
            id: 'ultimate-package',
            name: 'Ultimate Package',
            description: 'Complete 4-day Odisha visit with Chilika Lake and Raghurajpur village',
            price: 13500,
            duration: 4,
            image: '/images/destinations/jagannath-temple-3.jpg',
            inclusions: [
                'All major temples visit',
                'Puri , Konark , Bhubaneshwar sightseeing',
                '4 nights accommodation in a standard room in Puri',
                'AC transportation',
                'Parking fees covered',
                'Surprise gifts for guests'
            ],
            exclusions: [
                'Personal Expense',
                'Entry fees',
                'Travel insurance',
                'Extra sightseeing'
            ]
        },
        {
            id: 'chilika-tour',
            name: 'Chilika Lake Tour',
            description: 'Experience Asia\'s largest brackish water lagoon with dolphin watching',
            price: 4000,
            duration: 2,
            image: '/images/destinations/chilika-lake-dolphins.jpg',
            inclusions: [
                'Chilika Lake boat ride (Dolphin,migratory birds watching)',
                "1 Night Accommodation with standard room in puri",
                'Professional guide',
                'Transportation to/from lake',
                'Life jackets provided',
                'Parking fees'
            ],
            exclusions: [
                'Personal expenses',
                'Food and beverages',
                'Camera charges',
                'Extra boat rides'
            ]
        },
        {
            id: 'konark-tour',
            name: 'Konark Sun Temple Tour',
            description: 'Explore the UNESCO World Heritage Site and architectural marvel',
            price: 3500,
            duration: 2,
            image: '/images/destinations/konark-temple-front.jpg',
            inclusions: [
                "Konark Sun Temple , Ramchandi Temple",
                "Chandrabhaga Beach",
                "Beleswar Secret Beach or Sand Art Museum",
                "Archaeological museum",
                "Transportation",
                "Laser light show",
                "Parking fees"
            ],
            exclusions: [
                'Personal shopping',
                'Meals and snacks',
                'Photography fees',
                'Sand Art Museum entry fees'
            ]
        },
        {
            id: 'puri-night-stay',
            name: 'Puri Night Stay',
            description: 'Enjoy a relaxing night stay in Puri with beach access with day sightseeing',
            price: 3000,
            duration: 2,
            image: '/images/destinations/puri-beach-sunrise.jpg',
            inclusions: [
                "1 Night Accommodation with standard room",
                "Local sightseeing (Lighthouse, Laxmi's house, etc)",
                "Local guide services",
                "Jagannath Temple visit",
                "Puri Beach exploration",
                "Parking fees"
            ],
            exclusions: [
                "Personal expenses",
                "Meals (lunch/dinner)",
                "Shopping costs",
                "Tips for guide"
            ]
        },

        {
            id: 'cultural-heritage',
            name: 'Cultural Heritage Tour',
            description: 'Explore traditional art villages and handicraft centers',
            price: 3250,
            duration: 2,
            image: '/images/destinations/raghurajpur-pattachitra.jpg',
            inclusions: [
                'Raghurajpur village visit',
                'Pipili applique workshop',
                'Traditional art demonstration',
                'Interaction with artists',
                'Cultural guide',
                'Transportation'
            ],
            exclusions: [
                'Art purchases',
                'Personal expenses',
                'Meals',
                'Photography charges'
            ]
        },
        {
            id: 'spiritual-journey',
            name: 'Spiritual Journey',
            description: 'Experience the spiritual essence of Odisha temples',
            price: 4100,
            duration: 2,
            image: '/images/destinations/lingaraj.jpg',
            inclusions: [
                'Multiple temple visits',
                'Spiritual guide service',
                'Aarti participation',
                'Overnight accommodation',
                'Vegetarian meals',
                'Transportation',
                'Religious ceremonies'
            ],
            exclusions: [
                'Non-vegetarian meals',
                'Personal offerings',
                'Shopping expenses',
                'Extra temple visits'
            ]
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

    // Auto-scroll for destinations (changed from 5s to 10s)
    useEffect(() => {
        const destinationInterval = setInterval(() => {
            setCurrentDestinationIndex(prev => (prev + 1) % popularDestinations.length);
        }, 10000);

        return () => clearInterval(destinationInterval);
    }, [popularDestinations.length]);

    // Auto-scroll for reviews (changed from 5s to 10s)
    useEffect(() => {
        const reviewInterval = setInterval(() => {
            setCurrentReviewIndex(prev => (prev + 1) % customerReviews.length);
        }, 10000);

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
            <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Cultural Background Illustrations */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Konark Sun Temple Wheel - Top Right */}
                    <div className="absolute top-10 right-10 opacity-10">
                        <svg width="200" height="200" viewBox="0 0 200 200" className="text-orange-400">
                            <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="2" />
                            <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1" />
                            <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="1" />
                            {/* Spokes */}
                            {Array.from({ length: 8 }).map((_, i) => (
                                <line
                                    key={i}
                                    x1="100"
                                    y1="10"
                                    x2="100"
                                    y2="190"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    transform={`rotate(${i * 45} 100 100)`}
                                />
                            ))}
                            {/* Decorative elements */}
                            {Array.from({ length: 16 }).map((_, i) => (
                                <circle
                                    key={i}
                                    cx="100"
                                    cy="30"
                                    r="3"
                                    fill="currentColor"
                                    transform={`rotate(${i * 22.5} 100 100)`}
                                />
                            ))}
                        </svg>
                    </div>

                    {/* Temple Silhouette - Left Side */}
                    <div className="absolute left-5 top-20 opacity-8">
                        <svg width="150" height="180" viewBox="0 0 150 180" className="text-blue-400">
                            {/* Main temple structure */}
                            <rect x="50" y="100" width="50" height="80" fill="currentColor" />
                            {/* Temple top */}
                            <polygon points="75,60 45,100 105,100" fill="currentColor" />
                            {/* Smaller spires */}
                            <polygon points="30,80 20,100 40,100" fill="currentColor" />
                            <polygon points="120,80 110,100 130,100" fill="currentColor" />
                            {/* Flag */}
                            <line x1="75" y1="60" x2="75" y2="40" stroke="currentColor" strokeWidth="2" />
                            <rect x="75" y="40" width="15" height="8" fill="currentColor" />
                            {/* Steps */}
                            <rect x="40" y="170" width="70" height="5" fill="currentColor" />
                            <rect x="45" y="165" width="60" height="5" fill="currentColor" />
                        </svg>
                    </div>

                    {/* Ocean Waves - Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 opacity-6">
                        <svg width="100%" height="100" viewBox="0 0 1200 100" className="text-blue-300">
                            <path
                                d="M0,50 Q300,20 600,50 T1200,50 V100 H0 Z"
                                fill="currentColor"
                            />
                            <path
                                d="M0,60 Q200,30 400,60 T800,60 T1200,60 V100 H0 Z"
                                fill="currentColor"
                                opacity="0.7"
                            />
                        </svg>
                    </div>

                    {/* Traditional Patterns - Scattered */}
                    <div className="absolute top-32 left-1/4 opacity-5">
                        <svg width="80" height="80" viewBox="0 0 80 80" className="text-orange-300">
                            {/* Pattachitra style flower */}
                            <circle cx="40" cy="40" r="35" fill="none" stroke="currentColor" strokeWidth="2" />
                            {Array.from({ length: 8 }).map((_, i) => (
                                <ellipse
                                    key={i}
                                    cx="40"
                                    cy="15"
                                    rx="8"
                                    ry="15"
                                    fill="currentColor"
                                    transform={`rotate(${i * 45} 40 40)`}
                                />
                            ))}
                            <circle cx="40" cy="40" r="8" fill="currentColor" />
                        </svg>
                    </div>

                    <div className="absolute bottom-32 right-1/4 opacity-5">
                        <svg width="60" height="60" viewBox="0 0 60 60" className="text-blue-300">
                            {/* Traditional motif */}
                            <rect x="10" y="10" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" />
                            <circle cx="30" cy="30" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
                            <path d="M15,30 Q30,15 45,30 Q30,45 15,30" fill="currentColor" opacity="0.3" />
                        </svg>
                    </div>

                    {/* Flying Birds */}
                    <div className="absolute top-40 right-1/3 opacity-8">
                        <svg width="100" height="60" viewBox="0 0 100 60" className="text-gray-400">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <g key={i} transform={`translate(${i * 25}, ${i * 8})`}>
                                    <path d="M10,20 Q15,15 20,20 Q15,25 10,20" fill="currentColor" />
                                    <path d="M20,20 Q25,15 30,20 Q25,25 20,20" fill="currentColor" />
                                </g>
                            ))}
                        </svg>
                    </div>

                    {/* Lotus Pattern - Top Left */}
                    <div className="absolute top-16 left-16 opacity-6">
                        <svg width="120" height="120" viewBox="0 0 120 120" className="text-pink-300">
                            <g transform="translate(60,60)">
                                {Array.from({ length: 12 }).map((_, i) => (
                                    <ellipse
                                        key={i}
                                        cx="0"
                                        cy="-40"
                                        rx="6"
                                        ry="20"
                                        fill="currentColor"
                                        transform={`rotate(${i * 30})`}
                                        opacity="0.7"
                                    />
                                ))}
                                <circle cx="0" cy="0" r="12" fill="currentColor" />
                            </g>
                        </svg>
                    </div>

                    {/* Traditional Border Pattern - Right Edge */}
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-4">
                        <svg width="50" height="300" viewBox="0 0 50 300" className="text-orange-200">
                            {Array.from({ length: 10 }).map((_, i) => (
                                <g key={i} transform={`translate(25, ${i * 30 + 15})`}>
                                    <circle cx="0" cy="0" r="8" fill="currentColor" />
                                    <circle cx="0" cy="0" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
                                </g>
                            ))}
                        </svg>
                    </div>

                    {/* Dancing Figure Silhouette */}
                    <div className="absolute bottom-20 left-20 opacity-6">
                        <svg width="80" height="100" viewBox="0 0 80 100" className="text-purple-300">
                            {/* Simplified Odissi dancer silhouette */}
                            <ellipse cx="40" cy="15" rx="8" ry="10" fill="currentColor" /> {/* Head */}
                            <rect x="35" y="25" width="10" height="25" fill="currentColor" /> {/* Torso */}
                            <ellipse cx="40" cy="60" rx="15" ry="8" fill="currentColor" /> {/* Hip */}
                            {/* Arms */}
                            <ellipse cx="25" cy="35" rx="12" ry="4" fill="currentColor" transform="rotate(-30 25 35)" />
                            <ellipse cx="55" cy="35" rx="12" ry="4" fill="currentColor" transform="rotate(30 55 35)" />
                            {/* Legs */}
                            <ellipse cx="32" cy="85" rx="4" ry="15" fill="currentColor" />
                            <ellipse cx="48" cy="85" rx="4" ry="15" fill="currentColor" />
                        </svg>
                    </div>
                </div>

                <div className="text-center max-w-4xl mx-auto z-10">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6">
                        Discover
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">
                            Puri, Odisha
                        </span>
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-2">
                        Experience the spiritual heart of India with our premium tour packages.
                        From sacred temples to pristine beaches, create memories that last a lifetime.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={onStartBooking}
                            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 sm:px-8 py-3 sm:py-4 text-lg font-semibold rounded-lg shadow-lg transform transition hover:scale-105"
                        >
                            <Calendar className="h-5 w-5 mr-2" />
                            Plan Your Journey
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-3 sm:py-4 text-lg font-semibold rounded-lg"
                            onClick={() => document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            <MapPin className="h-5 w-5 mr-2" />
                            Explore Destinations
                        </Button>
                    </div>
                </div>
            </section>

            {/* Popular Destinations Section */}
            <section id="destinations" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-sm relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Popular Destinations</h2>
                        <p className="text-lg sm:text-xl text-gray-600">Discover the most enchanting places in and around Puri</p>
                    </div>

                    <div className="relative">
                        {/* Navigation buttons - hidden on mobile, shown on larger screens */}
                        <div className="hidden md:flex items-center justify-between mb-6">
                            <Button
                                variant="outline"
                                onClick={scrollLeft}
                                className="p-3 rounded-full shadow-md hover:shadow-lg text-black hover-alt-text"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </Button>
                            <Button
                                variant="outline"
                                onClick={scrollRight}
                                className="p-3 rounded-full shadow-md hover:shadow-lg text-black hover-alt-text"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </Button>
                        </div>

                        <div
                            ref={scrollContainerRef}
                            className="flex overflow-x-auto space-x-4 sm:space-x-6 pb-4 scrollbar-hide"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {popularDestinations.map((destination) => (
                                <div
                                    key={destination.id}
                                    className="flex-none w-80 sm:w-96 relative"
                                >
                                    <Card className="h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                        {/* Image Carousel Section */}
                                        <div className="h-40 sm:h-48 relative overflow-hidden">
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

            {/* Tour Packages Section */}
            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Tour Packages</h2>
                        <p className="text-lg sm:text-xl text-gray-600">Choose from our carefully crafted tour packages</p>
                    </div>

                    <div className="relative">
                        {/* Navigation buttons - hidden on mobile */}
                        <div className="hidden md:flex items-center justify-between mb-6">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    const container = document.getElementById('packages-container');
                                    if (container) {
                                        container.scrollBy({ left: -420, behavior: 'smooth' });
                                    }
                                }}
                                className="p-3 rounded-full shadow-md hover:shadow-lg text-black hover-alt-text"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    const container = document.getElementById('packages-container');
                                    if (container) {
                                        container.scrollBy({ left: 420, behavior: 'smooth' });
                                    }
                                }}
                                className="p-3 rounded-full shadow-md hover:shadow-lg text-black hover-alt-text"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </Button>
                        </div>

                        <div
                            id="packages-container"
                            className="flex overflow-x-auto space-x-4 sm:space-x-6 pb-4 scrollbar-hide"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {tourPackages.map((pkg: TourPackage) => (
                                <div key={pkg.id} className="flex-none w-80 sm:w-[420px] relative h-[400px] sm:h-[480px] perspective-1000">
                                    <div className="flip-card w-full h-full relative transform-style-preserve-3d transition-transform duration-700 hover:rotate-y-180">
                                        {/* Front of Card */}
                                        <div className="flip-card-front absolute w-full h-full backface-hidden">
                                            <Card className="h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                                <div
                                                    className="h-44 sm:h-56 bg-gradient-to-br from-blue-200 to-orange-200 flex items-center justify-center relative"
                                                    style={{
                                                        backgroundImage: pkg.image ? `url(${pkg.image})` : undefined,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center'
                                                    }}
                                                >
                                                    {/* Fallback content if image doesn't load */}
                                                    {!pkg.image && (
                                                        <div className="text-center text-white">
                                                            <MapPin className="h-12 w-12 mx-auto mb-2" />
                                                            <p className="text-sm font-medium">Tour Package</p>
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                                                    <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1">
                                                        <span className="text-sm font-semibold text-gray-900">{pkg.duration} Day{pkg.duration > 1 ? 's' : ''}</span>
                                                    </div>
                                                </div>
                                                <CardContent className="p-6">
                                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{pkg.name}</h3>
                                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{pkg.description}</p>
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className="text-2xl font-bold text-orange-600">
                                                            ₹{pkg.price.toLocaleString()}
                                                            <span className="text-sm text-gray-500 font-normal">/person</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <span className="text-sm text-gray-500 italic">Hover to see details</span>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>

                                        {/* Back of Card */}
                                        <div className="flip-card-back absolute w-full h-full backface-hidden rotate-y-180">
                                            <Card className="h-full overflow-hidden shadow-lg">
                                                <CardContent className="p-6 h-full flex flex-col">
                                                    <h3 className="text-lg font-bold text-gray-900 mb-4">{pkg.name}</h3>

                                                    {/* Inclusions */}
                                                    <div className="mb-4 flex-1">
                                                        <h4 className="font-semibold text-green-600 mb-2 flex items-center">
                                                            <span className="mr-2">✓</span>
                                                            Inclusions
                                                        </h4>
                                                        <ul className="text-sm text-gray-600 space-y-1">
                                                            {pkg.inclusions.slice(0, 6).map((item: string, index: number) => (
                                                                <li key={index} className="flex items-start">
                                                                    <span className="text-green-500 mr-2 mt-1">•</span>
                                                                    {item}
                                                                </li>
                                                            ))}
                                                            {pkg.inclusions.length > 6 && (
                                                                <li className="text-gray-400 text-xs">
                                                                    +{pkg.inclusions.length - 6} more items
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>

                                                    {/* Exclusions */}
                                                    <div className="mb-4">
                                                        <h4 className="font-semibold text-red-600 mb-2 flex items-center">
                                                            <span className="mr-2">✗</span>
                                                            Exclusions
                                                        </h4>
                                                        <ul className="text-sm text-gray-600 space-y-1">
                                                            {pkg.exclusions.slice(0, 4).map((item: string, index: number) => (
                                                                <li key={index} className="flex items-start">
                                                                    <span className="text-red-500 mr-2 mt-1">•</span>
                                                                    {item}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* Book Now Button */}
                                                    <button
                                                        onClick={onStartBooking}
                                                        className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
                                                    >
                                                        Book Now - ₹{pkg.price.toLocaleString()}
                                                    </button>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Terms & Conditions Note */}
                    <div className="mt-5 text-center">
                        <div className="max-w-2xl mx-auto text-xs text-gray-500 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-300">
                            <strong className="text-gray-700">Terms & Conditions:</strong> All package prices are calculated for 2 adults sharing 1 single room or 2 adults with 1 child. Additional charges may apply for extra occupancy, room upgrades, or special requirements.
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
            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">What Our Customers Say</h2>
                        <p className="text-lg sm:text-xl text-gray-600">Real experiences from real travelers</p>
                    </div>

                    <div className="relative">
                        {/* Navigation buttons - hidden on mobile */}
                        <div className="hidden md:flex items-center justify-between mb-6">
                            <Button
                                variant="outline"
                                onClick={scrollReviewsLeft}
                                className="p-3 rounded-full shadow-md hover:shadow-lg text-black hover-alt-text"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </Button>
                            <Button
                                variant="outline"
                                onClick={scrollReviewsRight}
                                className="p-3 rounded-full shadow-md hover:shadow-lg text-black hover-alt-text"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </Button>
                        </div>

                        <div
                            ref={reviewsScrollContainerRef}
                            className="flex overflow-x-auto space-x-4 sm:space-x-6 pb-4 scrollbar-hide"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {customerReviews.map((review) => (
                                <div key={review.id} className="flex-none w-72 sm:w-80">
                                    <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow h-full">
                                        <div className="flex items-center mb-4">
                                            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center text-white font-bold mr-3">
                                                {review.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-sm sm:text-base">{review.name}</h4>
                                                <p className="text-xs sm:text-sm text-gray-500">{review.location}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center mb-3">
                                            {renderStars(review.rating)}
                                        </div>

                                        <p className="text-gray-600 text-sm mb-3 line-clamp-4">{review.comment}</p>

                                        <p className="text-xs text-gray-400">
                                            {new Date(review.date).toLocaleDateString('en-IN', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric'
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
            <footer className="bg-gray-900 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        <div className="sm:col-span-2 lg:col-span-1">
                            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Puri Tours</h3>
                            <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                                Your trusted partner for exploring the spiritual and cultural heritage of Puri, Odisha.
                            </p>
                            <div className="flex space-x-3 sm:space-x-4">
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
                            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h4>
                            <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                                <li><a href="#destinations" className="hover:text-white transition-colors">Destinations</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Tour Packages</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Legal</h4>
                            <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Cancellation Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Travel Insurance</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400">
                        <p className="text-xs sm:text-sm">&copy; 2024 Puri Tours. All rights reserved. | Licensed Tour Operator</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
