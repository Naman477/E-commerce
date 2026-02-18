export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  isOrganic: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  tags: string[];
  nutritionFacts?: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
  };
  origin?: string;
  weight?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: "fruits",
    name: "Fresh Fruits",
    icon: "🍎",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop",
    productCount: 24,
  },
  {
    id: "vegetables",
    name: "Vegetables",
    icon: "🥬",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
    productCount: 32,
  },
  {
    id: "dairy",
    name: "Dairy & Eggs",
    icon: "🥛",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&h=300&fit=crop",
    productCount: 18,
  },
  {
    id: "bakery",
    name: "Bakery",
    icon: "🍞",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
    productCount: 15,
  },
  {
    id: "beverages",
    name: "Beverages",
    icon: "🧃",
    image: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=400&h=300&fit=crop",
    productCount: 21,
  },
  {
    id: "pantry",
    name: "Pantry",
    icon: "🫙",
    image: "https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=400&h=300&fit=crop",
    productCount: 28,
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Red Kotgarh Apples",
    description: "Crisp and sweet organic apples, freshly picked from our partner farms in Himachal. Perfect for snacking, baking, or adding to your favorite salads. These apples are grown without synthetic pesticides or fertilizers.",
    price: 425,
    originalPrice: 595,
    category: "fruits",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584306670957-acf935f5033c?w=600&h=600&fit=crop",
    ],
    rating: 4.8,
    reviews: 124,
    inStock: true,
    isOrganic: true,
    isBestseller: true,
    tags: ["organic", "fresh", "himachal"],
    nutritionFacts: {
      calories: "52 kcal",
      protein: "0.3g",
      carbs: "14g",
      fat: "0.2g",
      fiber: "2.4g",
    },
    origin: "Shimla, Himachal Pradesh",
    weight: "1 kg",
  },
  {
    id: "2",
    name: "Farm Fresh Desi Eggs",
    description: "Free-range eggs from happy hens raised on organic feed. Rich in omega-3 and vitamin D. Perfect for breakfast, baking, or any recipe that calls for eggs.",
    price: 550,
    category: "dairy",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=600&h=600&fit=crop",
    ],
    rating: 4.9,
    reviews: 89,
    inStock: true,
    isOrganic: true,
    isBestseller: true,
    tags: ["free-range", "omega-3", "protein"],
    nutritionFacts: {
      calories: "70 kcal",
      protein: "6g",
      carbs: "0.6g",
      fat: "5g",
      fiber: "0g",
    },
    origin: "Local Farm, Punjab",
    weight: "12 eggs",
  },
  {
    id: "3",
    name: "Organic Palak (Spinach)",
    description: "Tender and nutritious baby spinach leaves, perfect for salads, smoothies, or sautéing. Packed with iron, vitamins, and antioxidants.",
    price: 340,
    category: "vegetables",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=600&h=600&fit=crop",
    ],
    rating: 4.7,
    reviews: 67,
    inStock: true,
    isOrganic: true,
    isNew: true,
    tags: ["organic", "superfood", "iron-rich"],
    nutritionFacts: {
      calories: "23 kcal",
      protein: "2.9g",
      carbs: "3.6g",
      fat: "0.4g",
      fiber: "2.2g",
    },
    origin: "Nasik, Maharashtra",
    weight: "250g",
  },
  {
    id: "4",
    name: "Artisan Sourdough Bread",
    description: "Handcrafted sourdough bread made with organic flour and traditional fermentation methods. Crusty exterior with a soft, tangy interior.",
    price: 510,
    category: "bakery",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1585478259715-1c359ec40d23?w=600&h=600&fit=crop",
    ],
    rating: 4.9,
    reviews: 156,
    inStock: true,
    isOrganic: true,
    isBestseller: true,
    tags: ["artisan", "fermented", "whole-grain"],
    origin: "Local Bakery, Bangalore",
    weight: "1 loaf",
  },
  {
    id: "5",
    name: "Mahabaleshwar Strawberries",
    description: "Sweet and juicy organic strawberries, hand-picked at peak ripeness. Perfect for desserts, smoothies, or enjoying fresh.",
    price: 465,
    originalPrice: 680,
    category: "fruits",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1543528176-61b239494933?w=600&h=600&fit=crop",
    ],
    rating: 4.6,
    reviews: 98,
    inStock: true,
    isOrganic: true,
    tags: ["seasonal", "antioxidants", "vitamin-c"],
    nutritionFacts: {
      calories: "32 kcal",
      protein: "0.7g",
      carbs: "7.7g",
      fat: "0.3g",
      fiber: "2g",
    },
    origin: "Mahabaleshwar",
    weight: "500g",
  },
  {
    id: "6",
    name: "Organic Avocados",
    description: "Creamy, perfectly ripe Hass avocados. Rich in healthy fats and perfect for guacamole, toast, or salads.",
    price: 255,
    category: "fruits",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1601039641847-7857b994d704?w=600&h=600&fit=crop",
    ],
    rating: 4.8,
    reviews: 203,
    inStock: true,
    isOrganic: true,
    isBestseller: true,
    tags: ["healthy-fats", "potassium", "keto-friendly"],
    nutritionFacts: {
      calories: "160 kcal",
      protein: "2g",
      carbs: "9g",
      fat: "15g",
      fiber: "7g",
    },
    origin: "Kodaikanal",
    weight: "each",
  },
  {
    id: "7",
    name: "Cold Pressed Orange Juice",
    description: "100% pure orange juice, cold-pressed to preserve nutrients and fresh taste. No added sugar or preservatives.",
    price: 680,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&h=600&fit=crop",
    ],
    rating: 4.7,
    reviews: 76,
    inStock: true,
    isOrganic: true,
    isNew: true,
    tags: ["cold-pressed", "no-sugar", "vitamin-c"],
    nutritionFacts: {
      calories: "110 kcal",
      protein: "2g",
      carbs: "26g",
      fat: "0g",
      fiber: "0.5g",
    },
    origin: "Nagpur, Maharashtra",
    weight: "1 Litre",
  },
  {
    id: "8",
    name: "Desi Gajar (Carrots)",
    description: "Sweet and crunchy organic carrots, perfect for snacking, cooking, or juicing. Rich in beta-carotene and fiber.",
    price: 210,
    category: "vegetables",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=600&h=600&fit=crop",
    ],
    rating: 4.5,
    reviews: 54,
    inStock: true,
    isOrganic: true,
    tags: ["beta-carotene", "crunchy", "kid-friendly"],
    nutritionFacts: {
      calories: "41 kcal",
      protein: "0.9g",
      carbs: "10g",
      fat: "0.2g",
      fiber: "2.8g",
    },
    origin: "Ooty",
    weight: "1 kg",
  },
  {
    id: "9",
    name: "Greek Yogurt",
    description: "Thick and creamy organic Greek yogurt. High in protein and probiotics for a healthy gut. Perfect for breakfast or snacking.",
    price: 510,
    category: "dairy",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=600&fit=crop",
    ],
    rating: 4.8,
    reviews: 112,
    inStock: true,
    isOrganic: true,
    tags: ["probiotics", "high-protein", "gut-health"],
    nutritionFacts: {
      calories: "100 kcal",
      protein: "17g",
      carbs: "6g",
      fat: "0.7g",
      fiber: "0g",
    },
    origin: "Local Farm",
    weight: "500g",
  },
  {
    id: "10",
    name: "Organic Wild Honey",
    description: "Raw, unfiltered organic honey from local beekeepers. Rich in antioxidants and natural sweetness.",
    price: 1100,
    category: "pantry",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&h=600&fit=crop",
    ],
    rating: 4.9,
    reviews: 89,
    inStock: true,
    isOrganic: true,
    isBestseller: true,
    tags: ["raw", "unfiltered", "natural-sweetener"],
    origin: "Coorg, Karnataka",
    weight: "500g",
  },
  {
    id: "11",
    name: "Fresh Blueberries",
    description: "Plump and sweet organic blueberries, bursting with antioxidants. Perfect for breakfast, baking, or snacking.",
    price: 595,
    category: "fruits",
    image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=600&h=600&fit=crop",
    ],
    rating: 4.7,
    reviews: 145,
    inStock: true,
    isOrganic: true,
    tags: ["antioxidants", "brain-health", "superfood"],
    nutritionFacts: {
      calories: "57 kcal",
      protein: "0.7g",
      carbs: "14g",
      fat: "0.3g",
      fiber: "2.4g",
    },
    origin: "Imports",
    weight: "250g",
  },
  {
    id: "12",
    name: "Organic Broccoli",
    description: "Fresh, crisp organic broccoli florets. Packed with vitamins C and K, fiber, and cancer-fighting compounds.",
    price: 295,
    category: "vegetables",
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&h=600&fit=crop",
    ],
    rating: 4.6,
    reviews: 78,
    inStock: true,
    isOrganic: true,
    tags: ["vitamin-c", "fiber", "cruciferous"],
    nutritionFacts: {
      calories: "34 kcal",
      protein: "2.8g",
      carbs: "7g",
      fat: "0.4g",
      fiber: "2.6g",
    },
    origin: "Pune, Maharashtra",
    weight: "1 bunch",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    role: "Health Enthusiast",
    content: "Farmisian has completely changed how I shop for groceries. The produce is always fresh, and I love knowing exactly where my food comes from.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    role: "Home Chef",
    content: "As someone who cooks daily, quality ingredients make all the difference. Farmisian delivers restaurant-quality produce right to my door.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    role: "Busy Mom",
    content: "With three kids, I need convenient shopping without compromising on quality. Farmisian gives me both, plus the kids love the fresh fruits!",
    rating: 5,
  },
];

export const stats = [
  { value: "5000+", label: "Happy Customers" },
  { value: "100%", label: "Organic Products" },
  { value: "50+", label: "Local Farms" },
  { value: "24h", label: "Fresh Delivery" },
];
