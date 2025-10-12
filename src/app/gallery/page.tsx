'use client';

import React, { useState } from 'react';
import { Camera, ArrowLeft, Filter } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface GalleryImage {
    src: string;
    title: string;
    category: string;
    description?: string;
}

const galleryImages: GalleryImage[] = [
    { src: '/images/gallery/jagannath-temple-sunset.jpg', title: 'Jagannath Temple at Sunset', category: 'Temples', description: 'The magnificent Jagannath Temple glowing in the golden hour' },
    { src: '/images/gallery/puri-beach-morning.jpg', title: 'Puri Beach Morning', category: 'Beaches', description: 'Serene morning waves at the famous Puri Beach' },
    { src: '/images/gallery/konark-wheels.jpg', title: 'Konark Sun Temple Wheels', category: 'Heritage', description: 'Intricate stone wheels of the UNESCO World Heritage Site' },
    { src: '/images/gallery/chilika-birds.jpg', title: 'Migratory Birds at Chilika', category: 'Nature', description: 'Thousands of migratory birds at Asia\'s largest brackish water lagoon' },
    { src: '/images/gallery/rath-yatra-festival.jpg', title: 'Rath Yatra Festival', category: 'Culture', description: 'The grand chariot festival of Lord Jagannath' },
    { src: '/images/gallery/local-cuisine.jpg', title: 'Traditional Odia Cuisine', category: 'Food', description: 'Authentic flavors of Odisha\'s rich culinary heritage' },
    { src: '/images/gallery/handicrafts.jpg', title: 'Local Handicrafts', category: 'Crafts', description: 'Beautiful handcrafted items by local artisans' },
    { src: '/images/gallery/beach-activities.jpg', title: 'Beach Water Sports', category: 'Adventure', description: 'Exciting water sports and beach activities' },
    { src: '/images/gallery/temple-architecture.jpg', title: 'Ancient Architecture', category: 'Heritage', description: 'Stunning examples of ancient Kalinga architecture' },
    { src: '/images/gallery/cultural-dance.jpg', title: 'Traditional Dance', category: 'Culture', description: 'Classical Odissi dance performances' },
    { src: '/images/gallery/fishing-boats.jpg', title: 'Traditional Fishing', category: 'Lifestyle', description: 'Local fishermen with their traditional boats' },
    { src: '/images/gallery/market-scene.jpg', title: 'Local Markets', category: 'Shopping', description: 'Vibrant local markets with fresh produce and crafts' },
    { src: '/images/gallery/sunrise-beach.jpg', title: 'Sunrise at Puri', category: 'Beaches', description: 'Breathtaking sunrise over the Bay of Bengal' },
    { src: '/images/gallery/temple-rituals.jpg', title: 'Temple Rituals', category: 'Culture', description: 'Sacred rituals and ceremonies at local temples' },
    { src: '/images/gallery/chilika-sunset.jpg', title: 'Chilika Lake Sunset', category: 'Nature', description: 'Magical sunset reflections on Chilika Lake' },
    { src: '/images/gallery/street-food.jpg', title: 'Street Food Delights', category: 'Food', description: 'Popular street food and local delicacies' }
];

const categories = ['All', 'Temples', 'Beaches', 'Heritage', 'Nature', 'Culture', 'Food', 'Crafts', 'Adventure', 'Lifestyle', 'Shopping'];

export default function Gallery() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    const filteredImages = selectedCategory === 'All'
        ? galleryImages
        : galleryImages.filter(img => img.category === selectedCategory);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                                <ArrowLeft className="h-5 w-5" />
                                <span>Back to Home</span>
                            </Link>
                        </div>
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-gray-900">Photo Gallery</h1>
                            <p className="text-gray-600 mt-2">Discover the beauty of Puri through our lens</p>
                        </div>
                        <div className="w-24"></div> {/* Spacer for centering */}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Category Filter */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                    <Filter className="h-5 w-5 text-gray-500 mr-2" />
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCategory(category)}
                            className={`${selectedCategory === category
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                } border transition-colors`}
                        >
                            {category}
                        </Button>
                    ))}
                </div>

                {/* Image Count */}
                <div className="text-center mb-6">
                    <p className="text-gray-600">
                        Showing {filteredImages.length} {filteredImages.length === 1 ? 'photo' : 'photos'}
                        {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                    </p>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredImages.map((image, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                            onClick={() => setSelectedImage(image)}
                        >
                            <div className="aspect-square bg-gradient-to-br from-blue-200 to-orange-200 flex items-center justify-center">
                                <Camera className="h-16 w-16 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
                            </div>

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                                <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                                    <h3 className="font-bold text-lg mb-2">{image.title}</h3>
                                    <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">{image.category}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No results message */}
                {filteredImages.length === 0 && (
                    <div className="text-center py-12">
                        <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No photos found</h3>
                        <p className="text-gray-500">Try selecting a different category</p>
                    </div>
                )}
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        <div className="aspect-video bg-gradient-to-br from-blue-200 to-orange-200 flex items-center justify-center">
                            <Camera className="h-24 w-24 text-gray-400" />
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-2xl font-bold text-gray-900">{selectedImage.title}</h2>
                                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">{selectedImage.category}</span>
                            </div>
                            {selectedImage.description && (
                                <p className="text-gray-600">{selectedImage.description}</p>
                            )}
                            <div className="mt-4 flex justify-end">
                                <Button onClick={() => setSelectedImage(null)} variant="outline">
                                    Close
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
