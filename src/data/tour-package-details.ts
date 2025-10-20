export interface ItineraryDay {
    day: number;
    title: string;
    description: string;
    activities: string[];
    meals: string[];
    accommodation?: string;
    highlights: string[];
    estimatedTime?: string;
}

export interface TourPackageDetails {
    id: string;
    name: string;
    shortDescription: string;
    detailedDescription: string;
    duration: number;
    price: number;
    images: {
        hero: string;
        gallery: string[];
    };
    itinerary: ItineraryDay[];
    inclusions: string[];
    exclusions: string[];
    highlights: string[];
    bookingNotes: string[];
    cancellationPolicy: string;
    importantInfo: string[];
    tags: string[];
}

export const tourPackageDetails: Record<string, TourPackageDetails> = {
    'golden-triangle': {
        id: 'golden-triangle',
        name: 'Golden Triangle Package',
        shortDescription: 'Complete 3-days of Puri, Konark, Bhubaneshwar circuit with accommodation',
        detailedDescription: 'Experience the spiritual and architectural wonders of Odisha with our comprehensive 3-day Golden Triangle tour. This carefully crafted itinerary covers the holy city of Puri, the architectural marvel of Konark, and the temple city of Bhubaneshwar, offering you a perfect blend of spirituality, history, and culture.',
        duration: 3,
        price: 8950,
        images: {
            hero: '/images/destinations/jagannath-temple-1.jpg',
            gallery: [
                '/images/destinations/jagannath-temple-1.jpg',
                '/images/destinations/jagannath-temple-2.jpg',
                '/images/destinations/konark-temple-front.jpg',
                '/images/destinations/lingaraj.jpg',
                '/images/destinations/puri-beach-sunrise.jpg'
            ]
        },
        itinerary: [
            {
                day: 1,
                title: 'Arrival in Puri - Temple Visit & Beach Time',
                description: 'Begin your spiritual journey with arrival in the holy city of Puri',
                activities: [
                    'Check-in to hotel and freshen up',
                    'Visit to Lord Jagannath Temple',
                    'Darshan and temple tour with guide',
                    'Evening at Puri Beach',
                    'Witness beautiful sunset at Golden Beach'
                ],
                meals: ['Lunch', 'Dinner'],
                accommodation: 'Standard hotel in Puri',
                highlights: [
                    'Sacred Jagannath Temple darshan',
                    'Golden Beach sunset experience',
                    'Local temple rituals observation'
                ],
                estimatedTime: '10:00 AM - 8:00 PM'
            },
            {
                day: 2,
                title: 'Konark Sun Temple & Chandrabhaga Beach',
                description: 'Explore the architectural wonder of Konark and pristine beaches',
                activities: [
                    'Early morning departure to Konark (1.5 hrs drive)',
                    'Guided tour of Konark Sun Temple',
                    'Archaeological Museum visit',
                    'Visit to Chandrabhaga Beach',
                    'Ramchandi Temple visit',
                    'Return to Puri in evening'
                ],
                meals: ['Breakfast', 'Lunch'],
                highlights: [
                    'UNESCO World Heritage Site exploration',
                    'Intricate stone carvings and sculptures',
                    'Chandrabhaga Beach pristine waters',
                    'Ancient maritime trading history'
                ],
                estimatedTime: '7:00 AM - 7:00 PM'
            },
            {
                day: 3,
                title: 'Bhubaneshwar Temple Tour & Departure',
                description: 'Discover the temple city of Bhubaneshwar before departure',
                activities: [
                    'Check-out and departure to Bhubaneshwar',
                    'Lingaraj Temple visit and tour',
                    'Mukteshwar Temple complex',
                    'Rajarani Temple (Love Temple)',
                    'Khandagiri and Udayagiri Caves',
                    'Departure to your destination'
                ],
                meals: ['Breakfast', 'Lunch'],
                highlights: [
                    'Ancient Kalinga architecture',
                    '1000+ year old temple structures',
                    'Jain and Buddhist cave heritage',
                    'Historical significance learning'
                ],
                estimatedTime: '8:00 AM - 6:00 PM'
            }
        ],
        inclusions: [
            'All major temples visit',
            'Puri, Konark, Bhubaneshwar sightseeing',
            '2 nights accommodation in a standard room in Puri',
            'AC transportation throughout the tour',
            'Professional local guide services',
            'Parking fees covered',
            'Surprise gifts for guests',
            'All applicable taxes'
        ],
        exclusions: [
            'Personal expenses and shopping',
            'Entry fees to monuments and museums',
            'Travel insurance',
            'Camera charges at temples',
            'Extra sightseeing not mentioned in itinerary',
            'Tips and gratuities',
            'Any meals not mentioned in inclusions'
        ],
        highlights: [
            'Sacred Jagannath Temple darshan',
            'UNESCO World Heritage Konark Sun Temple',
            'Ancient Lingaraj Temple complex',
            'Pristine Chandrabhaga Beach',
            'Professional guided tours',
            'Comfortable AC transportation'
        ],
        bookingNotes: [
            'Minimum 2 adults required for booking',
            'Children below 5 years are complimentary',
            'Room sharing basis: 2 adults per room',
            'Temple dress code must be followed',
            'Photography restrictions apply in some temples'
        ],
        cancellationPolicy: 'Free cancellation up to 48 hours before tour start. 50% refund for cancellations within 24-48 hours. No refund for same-day cancellations.',
        importantInfo: [
            'Carry valid ID proof for temple entries',
            'Dress modestly for temple visits',
            'Remove leather items before entering temples',
            'Follow photography guidelines',
            'Respect local customs and traditions'
        ],
        tags: ['Spiritual', 'Heritage', 'Beach', 'Architecture', 'UNESCO Site']
    },
    'ultimate-package': {
        id: 'ultimate-package',
        name: 'Ultimate Package',
        shortDescription: 'Complete 4-day Odisha visit with Chilika Lake and Raghurajpur village',
        detailedDescription: 'Our most comprehensive Odisha experience covering spiritual temples, architectural marvels, pristine beaches, Asia\'s largest brackish water lagoon, and traditional art villages. Perfect for those who want to experience the complete essence of Odisha in one memorable journey.',
        duration: 4,
        price: 13500,
        images: {
            hero: '/images/destinations/jagannath-temple-3.jpg',
            gallery: [
                '/images/destinations/jagannath-temple-3.jpg',
                '/images/destinations/chilika-lake-dolphins.jpg',
                '/images/destinations/raghurajpur-pattachitra.jpg',
                '/images/destinations/konark-temple-sculptures.jpg',
                '/images/destinations/chilika-lake-sunset.jpg'
            ]
        },
        itinerary: [
            {
                day: 1,
                title: 'Arrival & Puri Temple Tour',
                description: 'Sacred beginning of your ultimate Odisha journey',
                activities: [
                    'Airport/Station pickup and hotel check-in',
                    'Visit to Lord Jagannath Temple',
                    'Temple museum and heritage walk',
                    'Evening beach activities at Puri Beach',
                    'Local market exploration'
                ],
                meals: ['Lunch', 'Dinner'],
                accommodation: 'Standard hotel in Puri',
                highlights: [
                    'Jagannath Temple sacred darshan',
                    'Temple architecture appreciation',
                    'Beach sunset photography'
                ],
                estimatedTime: '10:00 AM - 8:00 PM'
            },
            {
                day: 2,
                title: 'Chilika Lake Dolphin Safari',
                description: 'Wildlife and nature exploration at Asia\'s largest lagoon',
                activities: [
                    'Early departure to Chilika Lake',
                    'Boat safari for dolphin watching',
                    'Bird watching at Nalaban Island',
                    'Kalijai Temple visit on island',
                    'Fresh seafood lunch by the lake',
                    'Return to Puri evening'
                ],
                meals: ['Breakfast', 'Lunch', 'Dinner'],
                highlights: [
                    'Irrawaddy dolphins sighting',
                    'Migratory bird watching',
                    'Pristine lagoon ecosystem',
                    'Island temple experience'
                ],
                estimatedTime: '6:00 AM - 8:00 PM'
            },
            {
                day: 3,
                title: 'Konark & Raghurajpur Art Village',
                description: 'Architectural wonders and traditional art exploration',
                activities: [
                    'Visit to Konark Sun Temple',
                    'Archaeological museum tour',
                    'Chandrabhaga Beach activities',
                    'Raghurajpur artist village visit',
                    'Pattachitra painting demonstration',
                    'Traditional craft shopping'
                ],
                meals: ['Breakfast', 'Lunch'],
                highlights: [
                    'UNESCO World Heritage site',
                    'Live Pattachitra art demonstration',
                    'Traditional village lifestyle',
                    'Handicraft shopping opportunity'
                ],
                estimatedTime: '8:00 AM - 7:00 PM'
            },
            {
                day: 4,
                title: 'Bhubaneshwar Heritage & Departure',
                description: 'Temple city exploration and journey conclusion',
                activities: [
                    'Lingaraj Temple complex visit',
                    'Mukteshwar and Rajarani temples',
                    'Khandagiri Udayagiri caves',
                    'State Museum visit (optional)',
                    'Shopping at Ekamra Haat',
                    'Departure transfer'
                ],
                meals: ['Breakfast', 'Lunch'],
                highlights: [
                    'Ancient Kalinga architecture',
                    'Buddhist and Jain heritage',
                    'Local handicrafts shopping',
                    'Cultural immersion'
                ],
                estimatedTime: '8:00 AM - 6:00 PM'
            }
        ],
        inclusions: [
            'All major temples and attractions visit',
            'Puri, Konark, Bhubaneshwar, Chilika sightseeing',
            '3 nights accommodation in standard rooms',
            'AC transportation throughout',
            'Professional guide services',
            'Boat safari at Chilika Lake',
            'All parking and entry fees covered',
            'Welcome gifts and souvenirs',
            'All applicable taxes'
        ],
        exclusions: [
            'Personal expenses and shopping',
            'Camera charges at some locations',
            'Travel insurance',
            'Extra activities not in itinerary',
            'Tips and gratuities',
            'Any meals not mentioned',
            'Alcoholic beverages'
        ],
        highlights: [
            'Complete Odisha cultural experience',
            'Dolphin safari at Chilika Lake',
            'Traditional art village visit',
            'UNESCO heritage sites',
            'Wildlife and nature exploration',
            'Expert guided tours'
        ],
        bookingNotes: [
            'Best package for first-time visitors',
            'Suitable for all age groups',
            'Advanced booking recommended for peak season',
            'Customizable itinerary available',
            'Group discounts available for 6+ people'
        ],
        cancellationPolicy: 'Free cancellation up to 72 hours before tour. 25% cancellation fee for 48-72 hours. 50% fee for 24-48 hours. No refund for same-day cancellation.',
        importantInfo: [
            'Chilika visit depends on weather conditions',
            'Dolphin sighting not guaranteed but highly probable',
            'Carry sun protection for boat safari',
            'Respect wildlife and maintain distance',
            'Follow eco-tourism guidelines'
        ],
        tags: ['Complete Tour', 'Wildlife', 'Heritage', 'Art & Culture', 'Beach', 'Spiritual']
    },
    'chilika-tour': {
        id: 'chilika-tour',
        name: 'Chilika Lake Tour',
        shortDescription: 'Experience Asia\'s largest brackish water lagoon with dolphin watching',
        detailedDescription: 'Discover the natural wonders of Chilika Lake, Asia\'s largest brackish water lagoon and a paradise for wildlife enthusiasts. This eco-tourism adventure offers spectacular dolphin watching, bird watching, and pristine island experiences in one of India\'s most important wetland ecosystems.',
        duration: 2,
        price: 4000,
        images: {
            hero: '/images/destinations/chilika-lake-dolphins.jpg',
            gallery: [
                '/images/destinations/chilika-lake-dolphins.jpg',
                '/images/destinations/chilika-lake-boat.jpg',
                '/images/destinations/chilika-lake-sunset.jpg',
                '/images/destinations/chilika-lake-birds.jpg'
            ]
        },
        itinerary: [
            {
                day: 1,
                title: 'Puri Arrival & Chilika Lake Safari',
                description: 'Wildlife adventure begins at Asia\'s largest brackish water lagoon',
                activities: [
                    'Early morning departure from Puri to Chilika Lake',
                    'Boat safari for Irrawaddy dolphin watching',
                    'Visit to Nalaban Island bird sanctuary',
                    'Kalijai Temple visit on the island',
                    'Fishing village interaction',
                    'Sunset viewing at the lake'
                ],
                meals: ['Breakfast', 'Lunch'],
                accommodation: 'Standard hotel in Puri',
                highlights: [
                    'Irrawaddy dolphins in natural habitat',
                    'Over 160 bird species spotting',
                    'Pristine island temple experience',
                    'Traditional fishing community visit'
                ],
                estimatedTime: '6:00 AM - 7:00 PM'
            },
            {
                day: 2,
                title: 'Extended Lake Exploration & Departure',
                description: 'Deeper exploration of Chilika ecosystem and local culture',
                activities: [
                    'Early morning bird watching expedition',
                    'Visit to different islands in the lagoon',
                    'Sea mouth (where lake meets Bay of Bengal)',
                    'Local handicraft shopping',
                    'Fresh seafood lunch by the lake',
                    'Return journey to Puri'
                ],
                meals: ['Breakfast', 'Lunch'],
                highlights: [
                    'Migratory birds observation (seasonal)',
                    'Unique ecosystem exploration',
                    'Sea mouth natural phenomenon',
                    'Authentic seafood experience'
                ],
                estimatedTime: '7:00 AM - 6:00 PM'
            }
        ],
        inclusions: [
            'Chilika Lake boat ride with dolphin watching',
            '1 Night accommodation in standard room in Puri',
            'Professional naturalist guide',
            'Transportation to/from lake',
            'Life jackets and safety equipment',
            'All parking fees',
            'Island hopping boat tours',
            'Bird watching equipment (binoculars)'
        ],
        exclusions: [
            'Personal expenses and shopping',
            'Food and beverages (except mentioned)',
            'Camera charges at some locations',
            'Extra boat rides beyond itinerary',
            'Tips for guide and boat staff',
            'Travel insurance'
        ],
        highlights: [
            'Irrawaddy dolphin sighting opportunity',
            'Asia\'s largest brackish water lagoon',
            'Rich biodiversity and bird watching',
            'Island temple visits',
            'Eco-tourism experience',
            'Photography opportunities'
        ],
        bookingNotes: [
            'Dolphin sighting subject to weather conditions',
            'Best time: October to March',
            'Early morning departure recommended',
            'Suitable for nature and wildlife enthusiasts',
            'Camera and binoculars recommended'
        ],
        cancellationPolicy: 'Free cancellation up to 24 hours. Weather-dependent activities may be rescheduled.',
        importantInfo: [
            'Wear comfortable clothing and sun protection',
            'Dolphins sighting is highly probable but not guaranteed',
            'Follow eco-tourism guidelines',
            'Respect wildlife and maintain safe distance',
            'Carry motion sickness medication if needed'
        ],
        tags: ['Wildlife', 'Nature', 'Eco-tourism', 'Bird Watching', 'Dolphins', 'Photography']
    },
    'konark-tour': {
        id: 'konark-tour',
        name: 'Konark Sun Temple Tour',
        shortDescription: 'Explore the UNESCO World Heritage Site and architectural marvel',
        detailedDescription: 'Step into the world of ancient Indian architecture and spirituality with our comprehensive Konark Sun Temple tour. This UNESCO World Heritage Site represents the pinnacle of Kalinga architecture and offers insights into India\'s rich cultural heritage, combined with pristine beach experiences.',
        duration: 2,
        price: 3500,
        images: {
            hero: '/images/destinations/konark-temple-front.jpg',
            gallery: [
                '/images/destinations/konark-temple-front.jpg',
                '/images/destinations/konark-temple-sculptures.jpg',
                '/images/destinations/konark-temple-wheels.jpg',
                '/images/destinations/konark-temple-sunset.jpg'
            ]
        },
        itinerary: [
            {
                day: 1,
                title: 'Konark Sun Temple & Heritage Exploration',
                description: 'UNESCO World Heritage Site and architectural wonder exploration',
                activities: [
                    'Departure from Puri to Konark (35 km drive)',
                    'Guided tour of Konark Sun Temple complex',
                    'Archaeological Museum visit',
                    'Detailed explanation of temple architecture',
                    'Stone carving and sculpture appreciation',
                    'Temple history and mythology session'
                ],
                meals: ['Breakfast', 'Lunch'],
                accommodation: 'Day tour - return to Puri',
                highlights: [
                    '13th-century architectural masterpiece',
                    'Intricate stone carvings and sculptures',
                    'Solar temple unique design',
                    'UNESCO World Heritage significance'
                ],
                estimatedTime: '8:00 AM - 4:00 PM'
            },
            {
                day: 2,
                title: 'Chandrabhaga Beach & Cultural Sites',
                description: 'Beach experience and additional cultural exploration',
                activities: [
                    'Visit to Chandrabhaga Beach',
                    'Beach activities and photography',
                    'Ramchandi Temple visit',
                    'Local artisan village tour',
                    'Sand art demonstration (if available)',
                    'Sunset viewing at the beach'
                ],
                meals: ['Breakfast', 'Lunch'],
                highlights: [
                    'Pristine golden sand beach',
                    'Ancient Ramchandi Temple',
                    'Local art and craft traditions',
                    'Spectacular sunset views'
                ],
                estimatedTime: '9:00 AM - 6:00 PM'
            }
        ],
        inclusions: [
            'Konark Sun Temple guided tour',
            'Ramchandi Temple visit',
            'Chandrabhaga Beach access',
            'Archaeological museum entry',
            'Professional guide services',
            'AC transportation',
            'Parking fees at all locations',
            'All applicable taxes'
        ],
        exclusions: [
            'Personal shopping and expenses',
            'Meals and snacks (though lunch is included)',
            'Photography fees at monuments',
            'Sand Art Museum entry fees',
            'Tips and gratuities',
            'Any activities not mentioned in itinerary'
        ],
        highlights: [
            'UNESCO World Heritage Site exploration',
            '13th-century Kalinga architecture',
            'Detailed stone carving appreciation',
            'Pristine Chandrabhaga Beach',
            'Expert archaeological guidance',
            'Cultural and historical immersion'
        ],
        bookingNotes: [
            'Perfect for history and architecture enthusiasts',
            'Photography allowed in most areas',
            'Comfortable walking shoes recommended',
            'Best time: Early morning or late afternoon',
            'Can be combined with other Puri tours'
        ],
        cancellationPolicy: 'Free cancellation up to 24 hours before tour start.',
        importantInfo: [
            'Dress modestly for temple visits',
            'Remove shoes before entering temple premises',
            'Photography restrictions in certain areas',
            'Temple is partially in ruins - watch your step',
            'Carry sun protection for outdoor exploration'
        ],
        tags: ['Heritage', 'UNESCO', 'Architecture', 'Beach', 'Culture', 'Photography']
    },
    'puri-night-stay': {
        id: 'puri-night-stay',
        name: 'Puri Night Stay',
        shortDescription: 'Enjoy a relaxing night stay in Puri with beach access and day sightseeing',
        detailedDescription: 'Experience the spiritual and serene atmosphere of Puri with our comfortable night stay package. Perfect for those seeking a peaceful retreat with temple visits, beach relaxation, and local sightseeing, all while enjoying the sacred ambiance of this holy city.',
        duration: 2,
        price: 3000,
        images: {
            hero: '/images/destinations/puri-beach-sunrise.jpg',
            gallery: [
                '/images/destinations/puri-beach-sunrise.jpg',
                '/images/destinations/puri-beach-sunset.jpg',
                '/images/destinations/jagannath-temple-1.jpg',
                '/images/destinations/puri-beach-fishing.jpg'
            ]
        },
        itinerary: [
            {
                day: 1,
                title: 'Puri Arrival & Temple Exploration',
                description: 'Sacred city welcome and spiritual journey begins',
                activities: [
                    'Check-in to comfortable accommodation',
                    'Lord Jagannath Temple visit and darshan',
                    'Temple complex guided tour',
                    'Local market exploration near temple',
                    'Evening at Puri Golden Beach',
                    'Sunset photography session'
                ],
                meals: ['Lunch', 'Dinner'],
                accommodation: 'Standard room in Puri',
                highlights: [
                    'Sacred Jagannath Temple darshan',
                    'Temple architecture and history',
                    'Golden Beach sunset experience',
                    'Local spiritual atmosphere'
                ],
                estimatedTime: '11:00 AM - 8:00 PM'
            },
            {
                day: 2,
                title: 'Local Sightseeing & Beach Activities',
                description: 'Comprehensive Puri exploration and departure',
                activities: [
                    'Early morning beach walk and sunrise viewing',
                    'Visit to Puri Lighthouse',
                    'Laxmi\'s house (traditional heritage home)',
                    'Local handicraft shopping',
                    'Beach activities and relaxation',
                    'Check-out and departure'
                ],
                meals: ['Breakfast'],
                highlights: [
                    'Spectacular sunrise at Golden Beach',
                    'Historic Puri Lighthouse climb',
                    'Traditional architecture appreciation',
                    'Local culture immersion'
                ],
                estimatedTime: '6:00 AM - 2:00 PM'
            }
        ],
        inclusions: [
            '1 night accommodation in standard room',
            'Local sightseeing as per itinerary',
            'Jagannath Temple guided visit',
            'Puri Beach access and activities',
            'Local guide services',
            'All parking fees',
            'Welcome refreshments',
            'Room service availability'
        ],
        exclusions: [
            'Personal expenses and shopping',
            'Meals not mentioned in itinerary',
            'Extra temple visits beyond scheduled',
            'Shopping costs and souvenirs',
            'Tips for guide and hotel staff',
            'Laundry and room service charges'
        ],
        highlights: [
            'Comfortable overnight stay in holy Puri',
            'Sacred Jagannath Temple experience',
            'Beautiful Golden Beach access',
            'Local sightseeing and culture',
            'Peaceful spiritual atmosphere',
            'Value-for-money package'
        ],
        bookingNotes: [
            'Ideal for budget-conscious travelers',
            'Perfect for short spiritual retreat',
            'Single/double/triple occupancy available',
            'Additional nights can be arranged',
            'Temple entry subject to timings and rituals'
        ],
        cancellationPolicy: 'Free cancellation up to 24 hours. 50% refund for same-day cancellation.',
        importantInfo: [
            'Temple dress code must be followed',
            'No leather items allowed in temple',
            'Photography restrictions in temple',
            'Respect local customs and traditions',
            'Beach safety guidelines to be followed'
        ],
        tags: ['Budget-Friendly', 'Spiritual', 'Beach', 'Local Culture', 'Short Stay', 'Peaceful']
    },
    'cultural-heritage': {
        id: 'cultural-heritage',
        name: 'Cultural Heritage Tour',
        shortDescription: 'Immerse in Odisha\'s rich cultural heritage with traditional arts and crafts',
        detailedDescription: 'Dive deep into Odisha\'s vibrant cultural tapestry with our specialized heritage tour. Experience traditional art forms, visit master craftsmen, explore heritage villages, and witness the living traditions that have been passed down through generations in this culturally rich state.',
        duration: 3,
        price: 7500,
        images: {
            hero: '/images/destinations/raghurajpur-pattachitra.jpg',
            gallery: [
                '/images/destinations/raghurajpur-pattachitra.jpg',
                '/images/destinations/raghurajpur-artists.jpg',
                '/images/destinations/raghurajpur-village.jpg',
                '/images/destinations/pipili-applique.jpg',
                '/images/destinations/pipili-handicrafts.jpg'
            ]
        },
        itinerary: [
            {
                day: 1,
                title: 'Raghurajpur Heritage Village',
                description: 'Explore the artistic village famous for Pattachitra paintings',
                activities: [
                    'Journey to Raghurajpur heritage village',
                    'Meet master Pattachitra artists',
                    'Live painting demonstration',
                    'Try your hand at traditional painting',
                    'Visit traditional thatched-roof homes',
                    'Interact with local artisan families'
                ],
                meals: ['Breakfast', 'Lunch', 'Dinner'],
                accommodation: 'Heritage homestay in village',
                highlights: [
                    'UNESCO recognized art village',
                    'Live Pattachitra art demonstration',
                    'Traditional village lifestyle',
                    'Master artist interactions'
                ],
                estimatedTime: '9:00 AM - 7:00 PM'
            },
            {
                day: 2,
                title: 'Pipili Applique Art & Traditional Crafts',
                description: 'Discover the colorful world of applique work and traditional crafts',
                activities: [
                    'Visit to Pipili applique village',
                    'Colorful applique art workshops',
                    'Traditional fabric painting techniques',
                    'Local artisan market exploration',
                    'Handicraft shopping experience',
                    'Traditional Odia lunch with local family'
                ],
                meals: ['Breakfast', 'Lunch', 'Dinner'],
                accommodation: 'Traditional guesthouse',
                highlights: [
                    'Vibrant applique art tradition',
                    'Hands-on craft workshops',
                    'Authentic village dining',
                    'Traditional textile techniques'
                ],
                estimatedTime: '8:00 AM - 6:00 PM'
            },
            {
                day: 3,
                title: 'Stone Carving & Cultural Museums',
                description: 'Ancient stone carving traditions and cultural heritage preservation',
                activities: [
                    'Visit to stone carving workshops',
                    'Traditional sculpture techniques',
                    'Odisha State Museum exploration',
                    'Tribal Museum visit',
                    'Cultural performance (if available)',
                    'Farewell dinner with cultural show'
                ],
                meals: ['Breakfast', 'Lunch', 'Dinner'],
                highlights: [
                    'Ancient stone carving techniques',
                    'Tribal art and culture',
                    'Museum cultural artifacts',
                    'Traditional dance performances'
                ],
                estimatedTime: '9:00 AM - 8:00 PM'
            }
        ],
        inclusions: [
            'All cultural site visits and workshops',
            '2 nights heritage accommodation',
            'Professional cultural guide',
            'All art demonstration sessions',
            'Traditional meal experiences',
            'Craft workshop materials',
            'Cultural performance tickets',
            'All transportation and parking'
        ],
        exclusions: [
            'Personal art purchases and shopping',
            'Extra workshop sessions',
            'Additional cultural shows',
            'Tips for artisans and guides',
            'Travel insurance',
            'Personal expenses'
        ],
        highlights: [
            'UNESCO recognized art village visit',
            'Live traditional art demonstrations',
            'Hands-on craft workshops',
            'Heritage village homestay',
            'Cultural immersion experience',
            'Master artisan interactions'
        ],
        bookingNotes: [
            'Perfect for art and culture enthusiasts',
            'Suitable for photography enthusiasts',
            'Advance booking recommended',
            'Workshop materials provided',
            'Cultural performance subject to availability'
        ],
        cancellationPolicy: 'Free cancellation up to 72 hours. Workshop bookings non-refundable within 48 hours.',
        importantInfo: [
            'Respect local customs and photography rules',
            'Dress modestly in villages',
            'Participate respectfully in workshops',
            'Support local artisans through purchases',
            'Follow village etiquette and guidelines'
        ],
        tags: ['Culture', 'Art', 'Heritage', 'Workshops', 'Villages', 'Traditional Crafts']
    }
    // Add more packages as needed...
};
