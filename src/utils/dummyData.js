export const destinations = [
    {
        id: 1,
        name: 'Santorini',
        country: 'Greece',
        subtitle: 'Stunning Sunsets & Blue Domes',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
        bestSeason: 'Spring & Fall',
        avgCostDay: 150,
        rating: 4.8,
        climate: 'Mediterranean',
        type: 'Relax',
        description: 'Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape.',
        attractions: [
            { name: 'Oia Sunset', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=400&q=60' },
            { name: 'Akrotiri', image: 'https://images.unsplash.com/photo-1601581875309-fad3c4373449?auto=format&fit=crop&w=400&q=60' },
            { name: 'Red Beach', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=60' }
        ],
        foods: ['Souvlaki', 'Moussaka', 'Fava', 'Saganaki'],
        safety: 'Generally very safe, exercise normal precautions.'
    },
    {
        id: 2,
        name: 'Kyoto',
        country: 'Japan',
        subtitle: 'Temples, Gardens & Traditions',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
        bestSeason: 'Spring & Autumn',
        avgCostDay: 120,
        rating: 4.9,
        climate: 'Temperate',
        type: 'Culture',
        description: 'Kyoto, once the capital of Japan, is a city on the island of Honshu. It’s famous for its numerous classical Buddhist temples, gardens, imperial palaces, and traditional wooden houses.',
        attractions: [
            { name: 'Fushimi Inari-taisha', image: 'https://images.unsplash.com/photo-1475189351455-233b815f32e2?auto=format&fit=crop&w=400&q=60' },
            { name: 'Arashiyama Bamboo Grove', image: 'https://images.unsplash.com/photo-1542931287-023b922fa89b?auto=format&fit=crop&w=400&q=60' },
            { name: 'Kinkaku-ji', image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=400&q=60' }
        ],
        foods: ['Ramen', 'Kaiseki', 'Matcha Sweets', 'Yatsuhashi'],
        safety: 'Very high safety standards.'
    },
    {
        id: 3,
        name: 'Bali',
        country: 'Indonesia',
        subtitle: 'Tropical Paradise & Spirit',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
        bestSeason: 'April to October',
        avgCostDay: 45,
        rating: 4.7,
        climate: 'Tropical',
        type: 'Adventure',
        description: 'Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.',
        attractions: [
            { name: 'Uluwatu Temple', image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=400&q=60' }
        ],
        foods: ['Nasi Goreng', 'Babi Guling', 'Sate Lilit'],
        safety: 'Safe, but be cautious with local transport and street food.'
    },
    {
        id: 4,
        name: 'Paris',
        country: 'France',
        subtitle: 'The City of Light',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
        bestSeason: 'Summer & Holidays',
        avgCostDay: 180,
        rating: 4.6,
        climate: 'Temperate',
        type: 'Culture',
        description: 'Paris, France’s capital, is a major European city and a global center for art, fashion, gastronomy and culture.',
        attractions: [
            { name: 'Eiffel Tower', image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee87?auto=format&fit=crop&w=400&q=60' }
        ],
        foods: ['Croissants', 'Escargot', 'Macarons'],
        safety: 'Moderate, beware of pickpockets in tourist areas.'
    },
    {
        id: 5,
        name: 'Reykjavik',
        country: 'Iceland',
        subtitle: 'Land of Fire & Ice',
        image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&w=800&q=80',
        bestSeason: 'Summer (Midnight Sun) or Winter (Aurora)',
        avgCostDay: 200,
        rating: 4.8,
        climate: 'Cold',
        type: 'Adventure',
        description: 'Iceland, a Nordic island nation, is defined by its dramatic landscape with volcanoes, geysers, hot springs and lava fields.',
        attractions: [
            { name: 'Blue Lagoon', image: 'https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?auto=format&fit=crop&w=400&q=60' }
        ],
        foods: ['Skyr', 'Plokkfiskur', 'Fermented Shark'],
        safety: 'Extremely safe.'
    }
];

export const packingTemplates = {
    Adventure: ['Hiking Boots', 'Backpack', 'Weatherproof Jacket', 'Reusable Water Bottle', 'First Aid Kit'],
    Relax: ['Sunscreen', 'Swimwear', 'Beach Towel', 'Flip Flops', 'Sunglasses', 'Books'],
    Culture: ['Walking Shoes', 'Modest Clothing', 'Camera', 'City Map', 'Portable Charger'],
    Urban: ['Stylish Outfits', 'Credit Cards', 'Public Transport Pass', 'Smartphone', 'Comfortable Shoes']
};

export const expenseCategories = [
    'Transport', 'Accommodation', 'Food', 'Activities', 'Shopping', 'Other'
];

export const sampleTrips = [
    {
        id: 'test-trip-1',
        name: 'Greek Summer Getaway',
        destination: 'Santorini',
        startDate: '2026-07-15',
        endDate: '2026-07-22',
        style: 'Relax',
        budget: 1500,
        activities: [
            { id: 1, day: 1, time: '09:00', activity: 'Arrival & Hotel Check-in', location: 'Santorini Airport' },
            { id: 2, day: 1, time: '18:00', activity: 'Sunset Dinner', location: 'Oia' }
        ],
        expenses: [
            { id: 1, category: 'Transport', amount: 450, note: 'Flight' },
            { id: 2, category: 'Accommodation', amount: 600, note: 'Boutique Hotel' }
        ],
        packing: [
            { id: 1, item: 'Passport', category: 'Documents', packed: true },
            { id: 2, item: 'Sunscreen', category: 'Essentials', packed: false }
        ]
    }
];
