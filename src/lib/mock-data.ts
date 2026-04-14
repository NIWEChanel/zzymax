export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  duration: string;
  rating: number;
  year: number;
  price: number;
  isFeatured?: boolean;
  isTrending?: boolean;
  isNewRelease?: boolean;
}

export const categories = [
  "Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", "Thriller", "Documentary"
];

export const movies: Movie[] = [
  {
    id: "1",
    title: "Crimson Horizon",
    description: "A lone warrior must cross a war-torn landscape to save the last city standing. Epic battles and breathtaking visuals await.",
    thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    category: "Action",
    duration: "2h 15m",
    rating: 8.7,
    year: 2024,
    price: 500,
    isFeatured: true,
    isTrending: true,
  },
  {
    id: "2",
    title: "Whispers in the Dark",
    description: "When a family moves into an ancient mansion, they discover that the walls hold secrets that refuse to stay buried.",
    thumbnail: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    category: "Horror",
    duration: "1h 48m",
    rating: 7.9,
    year: 2024,
    price: 500,
    isTrending: true,
    isNewRelease: true,
  },
  {
    id: "3",
    title: "Love in Lagos",
    description: "Two strangers meet during a chaotic rainstorm in Lagos and discover that fate has a funny way of bringing people together.",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    category: "Romance",
    duration: "1h 55m",
    rating: 8.2,
    year: 2023,
    price: 300,
    isTrending: true,
  },
  {
    id: "4",
    title: "Neon Rebellion",
    description: "In a dystopian future where corporations rule, a group of hackers ignites a revolution that will change everything.",
    thumbnail: "https://images.unsplash.com/photo-1518676590747-1e3dcf5a4e27?w=400&h=600&fit=crop",
    category: "Sci-Fi",
    duration: "2h 22m",
    rating: 9.1,
    year: 2024,
    price: 700,
    isTrending: true,
    isNewRelease: true,
  },
  {
    id: "5",
    title: "The Last Laugh",
    description: "A retired comedian returns to the stage one final time, navigating the chaos of modern humor and his own troubled past.",
    thumbnail: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    category: "Comedy",
    duration: "1h 42m",
    rating: 7.5,
    year: 2023,
    price: 300,
  },
  {
    id: "6",
    title: "Shadows of Kigali",
    description: "A gripping drama about resilience, forgiveness, and the unbreakable bonds of family against the backdrop of a changing city.",
    thumbnail: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
    category: "Drama",
    duration: "2h 05m",
    rating: 8.9,
    year: 2024,
    price: 500,
    isNewRelease: true,
  },
  {
    id: "7",
    title: "Operation Thunder",
    description: "An elite military unit embarks on a covert mission that pushes them to their limits in the heart of the jungle.",
    thumbnail: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&h=600&fit=crop",
    category: "Action",
    duration: "2h 10m",
    rating: 8.0,
    year: 2023,
    price: 500,
    isTrending: true,
  },
  {
    id: "8",
    title: "Beyond the Stars",
    description: "An astronaut stranded on a distant planet must find her way home while uncovering an ancient alien civilization.",
    thumbnail: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=400&h=600&fit=crop",
    category: "Sci-Fi",
    duration: "2h 30m",
    rating: 8.8,
    year: 2024,
    price: 700,
    isNewRelease: true,
  },
  {
    id: "9",
    title: "The Silent Witness",
    description: "A deaf detective uses her unique abilities to solve a murder that has baffled the entire city's police force.",
    thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    category: "Thriller",
    duration: "1h 58m",
    rating: 8.4,
    year: 2023,
    price: 500,
    isTrending: true,
  },
  {
    id: "10",
    title: "Earth Untold",
    description: "A stunning documentary exploring the most remote and untouched corners of our planet through breathtaking cinematography.",
    thumbnail: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=400&h=600&fit=crop",
    category: "Documentary",
    duration: "1h 35m",
    rating: 9.0,
    year: 2024,
    price: 300,
    isNewRelease: true,
  },
  {
    id: "11",
    title: "Midnight Chase",
    description: "A getaway driver gets caught up in a heist gone wrong and must outrun both the police and the criminals who hired him.",
    thumbnail: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop",
    category: "Thriller",
    duration: "1h 52m",
    rating: 7.8,
    year: 2023,
    price: 500,
  },
  {
    id: "12",
    title: "Funny Business",
    description: "When two rival food truck owners are forced to share a prime location, culinary war and unexpected love ensue.",
    thumbnail: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&h=600&fit=crop",
    category: "Comedy",
    duration: "1h 38m",
    rating: 7.2,
    year: 2024,
    price: 300,
    isNewRelease: true,
  },
];

export const subscriptionPlans = [
  {
    id: "daily",
    name: "Daily Pass",
    price: 500,
    currency: "RWF",
    duration: "24 hours",
    features: ["Watch any movie", "HD Quality", "1 device"],
  },
  {
    id: "weekly",
    name: "Weekly Pass",
    price: 2000,
    currency: "RWF",
    duration: "7 days",
    features: ["Watch any movie", "HD Quality", "2 devices", "Download movies"],
  },
  {
    id: "monthly",
    name: "Monthly Premium",
    price: 5000,
    currency: "RWF",
    duration: "30 days",
    features: ["Unlimited movies", "4K Quality", "4 devices", "Download movies", "No ads"],
  },
];
