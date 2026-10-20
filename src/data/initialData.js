export const INITIAL_BRANCHES = [
  {
    id: "borrowdale",
    code: "HQ",
    name: "Branch A - Borrowdale (HQ)",
    shortName: "Borrowdale HQ",
    type: "Master Cluster",
    status: "ONLINE",
    cams: 6,
    activeMembers: 148,
    totalMembers: 2240,
    latency: "8ms",
    syncedAgo: "0s"
  },
  {
    id: "avondale",
    code: "B2",
    name: "Branch B - Avondale Club",
    shortName: "Avondale Club",
    type: "Edge Node",
    status: "ONLINE",
    cams: 5,
    activeMembers: 94,
    totalMembers: 1530,
    latency: "11ms",
    syncedAgo: "2s"
  },
  {
    id: "cbd",
    code: "B3",
    name: "Branch C - CBD Express",
    shortName: "CBD Express",
    type: "Edge Node",
    status: "ONLINE",
    cams: 4,
    activeMembers: 72,
    totalMembers: 1050,
    latency: "14ms",
    syncedAgo: "1s"
  }
];

export const INITIAL_ZONES = [
  {
    id: "turnstile",
    name: "Gym Floor & Turnstiles",
    short: "Gym Floor",
    camCode: "CAM-01",
    icon: "Dumbbell",
    description: "Strength zone, cardio amphitheater & functional turf"
  },
  {
    id: "vip",
    name: "VIP Executive Lounge",
    short: "VIP Lounge",
    camCode: "CAM-04",
    icon: "Crown",
    description: "Private workstations, espresso bar & high-performance recovery"
  },
  {
    id: "baths",
    name: "Hydrotherapy & Sauna Baths",
    short: "Sauna & Baths",
    camCode: "CAM-07",
    icon: "Waves",
    description: "Infrared sauna, Finnish steam & contrast ice-baths"
  },
  {
    id: "canteen",
    name: "Smart Canteen Token Kiosk",
    short: "Canteen Kiosk",
    camCode: "CAM-09",
    icon: "Utensils",
    description: "Biometric one-tap shake dispenser & nutritional kitchen"
  },
  {
    id: "carwash",
    name: "Carwash Express Valet Bay",
    short: "Valet Bay",
    camCode: "CAM-12",
    icon: "Car",
    description: "Complimentary VIP vehicle detailing & express foam wash"
  }
];

export const INITIAL_MEMBERS = [
  {
    id: "TF-8824",
    name: "Tarie Mafusire",
    tier: "VIP",
    email: "tarie.mafusire@totalfitness.co.zw",
    phone: "+263 77 241 8824",
    branch: "borrowdale",
    balance: 165.50,
    plate: "AEF-4921",
    status: "ACTIVE",
    joinedDate: "2025-01-12",
    lastVisit: "Just now",
    biometricQuality: 99.8,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    visitsThisMonth: 22
  },
  {
    id: "TF-3109",
    name: "Samantha Moyo",
    tier: "VIP",
    email: "samantha.m@apexholdings.co.zw",
    phone: "+263 78 332 3109",
    branch: "cbd",
    balance: 92.00,
    plate: "BCH-1029",
    status: "ACTIVE",
    joinedDate: "2025-03-20",
    lastVisit: "3 mins ago",
    biometricQuality: 99.6,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    visitsThisMonth: 18
  },
  {
    id: "TF-5521",
    name: "Tendai Mutasa",
    tier: "VIP",
    email: "t.mutasa@frontiercapital.com",
    phone: "+263 71 890 5521",
    branch: "avondale",
    balance: 240.00,
    plate: "ACX-7714",
    status: "ACTIVE",
    joinedDate: "2024-11-05",
    lastVisit: "12 mins ago",
    biometricQuality: 99.5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    visitsThisMonth: 26
  },
  {
    id: "TF-7740",
    name: "Rumbidzai Ncube",
    tier: "CORPORATE",
    email: "rumbi.ncube@oldmutual.co.zw",
    phone: "+263 77 443 7740",
    branch: "borrowdale",
    balance: 55.00,
    plate: "ADZ-5591",
    status: "ACTIVE",
    joinedDate: "2025-06-14",
    lastVisit: "28 mins ago",
    biometricQuality: 98.9,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    visitsThisMonth: 14
  },
  {
    id: "TF-4091",
    name: "John Doe",
    tier: "STANDARD",
    email: "j.doe@techzw.com",
    phone: "+263 77 111 4091",
    branch: "avondale",
    balance: 18.00,
    plate: "ABA-1123",
    status: "ACTIVE",
    joinedDate: "2025-08-01",
    lastVisit: "1 hour ago",
    biometricQuality: 97.4,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    visitsThisMonth: 10
  },
  {
    id: "TF-9012",
    name: "Michael Chen",
    tier: "STANDARD",
    email: "michael.chen@sinotech.co.zw",
    phone: "+263 73 992 9012",
    branch: "borrowdale",
    balance: 0.00,
    plate: "CDE-8832",
    status: "ACTIVE",
    joinedDate: "2025-09-10",
    lastVisit: "2 hours ago",
    biometricQuality: 98.2,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    visitsThisMonth: 8
  },
  {
    id: "TF-6218",
    name: "Farai Chiwara",
    tier: "CORPORATE",
    email: "farai.chiwara@econet.co.zw",
    phone: "+263 77 621 8000",
    branch: "cbd",
    balance: 42.50,
    plate: "AFG-3390",
    status: "ACTIVE",
    joinedDate: "2025-04-18",
    lastVisit: "Yesterday",
    biometricQuality: 99.1,
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    visitsThisMonth: 16
  }
];

export const INITIAL_LOGS = [
  {
    id: "LOG-1001",
    memberId: "TF-8824",
    name: "Tarie Mafusire",
    tier: "VIP",
    zone: "VIP Lounge",
    branch: "Borrowdale HQ",
    status: "GRANTED",
    latency: "0.22s",
    timestamp: new Date(Date.now() - 30 * 1000).toISOString(),
    confidence: 99.8,
    action: "Fast-Track Entry"
  },
  {
    id: "LOG-1002",
    memberId: "TF-4091",
    name: "John Doe",
    tier: "STANDARD",
    zone: "Gym Floor",
    branch: "Avondale Club",
    status: "GRANTED",
    latency: "0.26s",
    timestamp: new Date(Date.now() - 95 * 1000).toISOString(),
    confidence: 98.4,
    action: "Turnstile Gate 2"
  },
  {
    id: "LOG-1003",
    memberId: "TF-3109",
    name: "Samantha Moyo",
    tier: "VIP",
    zone: "Sauna & Baths",
    branch: "CBD Express",
    status: "GRANTED",
    latency: "0.24s",
    timestamp: new Date(Date.now() - 180 * 1000).toISOString(),
    confidence: 99.6,
    action: "Thermal Door Unlock"
  },
  {
    id: "LOG-1004",
    memberId: "TF-9012",
    name: "Michael Chen",
    tier: "STANDARD",
    zone: "VIP Lounge",
    branch: "Borrowdale HQ",
    status: "DENIED",
    latency: "0.19s",
    timestamp: new Date(Date.now() - 240 * 1000).toISOString(),
    confidence: 98.7,
    action: "Tier Restriction (Standard)"
  },
  {
    id: "LOG-1005",
    memberId: "TF-5521",
    name: "Tendai Mutasa",
    tier: "VIP",
    zone: "Valet Bay",
    branch: "Avondale Club",
    status: "GRANTED",
    latency: "0.31s",
    timestamp: new Date(Date.now() - 360 * 1000).toISOString(),
    confidence: 99.5,
    action: "Bay 2 Foam Wash Assigned"
  },
  {
    id: "LOG-1006",
    memberId: "TF-7740",
    name: "Rumbidzai Ncube",
    tier: "CORPORATE",
    zone: "Canteen Kiosk",
    branch: "Borrowdale HQ",
    status: "GRANTED",
    latency: "0.25s",
    timestamp: new Date(Date.now() - 540 * 1000).toISOString(),
    confidence: 99.1,
    action: "Face Token Paid: $7.50"
  }
];

export const INITIAL_CANTEEN_MENU = [
  {
    id: "shake-01",
    name: "Signature Gold Whey Isolate",
    category: "Protein Shakes",
    price: 6.50,
    calories: "280 kcal",
    protein: "35g Protein",
    description: "Cold-filtered whey isolate, raw honey, almond milk, and Himalayan pink salt",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "shake-02",
    name: "Keto Collagen Berry Blast",
    category: "Protein Shakes",
    price: 7.25,
    calories: "240 kcal",
    protein: "24g Collagen",
    description: "Wild blueberries, grass-fed collagen peptides, coconut cream, chia seeds",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "meal-01",
    name: "High-Protein Teriyaki Beef Bowl",
    category: "Fresh Meals",
    price: 12.00,
    calories: "540 kcal",
    protein: "48g Protein",
    description: "Lean grass-fed beef sirloin, quinoa, steamed broccoli florets, sesame glaze",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "drink-01",
    name: "Electrolyte Ion Nitro Chill",
    category: "Hydration",
    price: 4.00,
    calories: "15 kcal",
    protein: "0g Sugar",
    description: "Magnesium, potassium, and sodium citrate infused with cold-pressed lime",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=300&auto=format&fit=crop&q=80"
  },
  {
    id: "shot-01",
    name: "Cellular Nitric Boost Pre-Shot",
    category: "Supplements",
    price: 3.50,
    calories: "35 kcal",
    protein: "3000mg Beta-Alanine",
    description: "Citrulline malate, organic beetroot juice extract & B-complex energy blend",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&auto=format&fit=crop&q=80"
  }
];

export const INITIAL_VALET_QUEUE = [
  {
    id: "VAL-201",
    memberId: "TF-8824",
    memberName: "Tarie Mafusire",
    plate: "AEF-4921",
    vehicle: "Mercedes-AMG G63 (Obsidian Black)",
    service: "Executive Interior & Foam Wash",
    bay: "Bay 1",
    status: "WASHING",
    progress: 65,
    estimatedTime: "12 mins",
    branch: "borrowdale"
  },
  {
    id: "VAL-202",
    memberId: "TF-5521",
    memberName: "Tendai Mutasa",
    plate: "ACX-7714",
    vehicle: "Range Rover Sport (Santorini Black)",
    service: "Exterior Foam & Wheel Ceramic",
    bay: "Bay 2",
    status: "DETAILING",
    progress: 90,
    estimatedTime: "4 mins",
    branch: "avondale"
  },
  {
    id: "VAL-203",
    memberId: "TF-3109",
    memberName: "Samantha Moyo",
    plate: "BCH-1029",
    vehicle: "Porsche Cayenne GTS (Chalk White)",
    service: "Express Rinse & Dry",
    bay: "Bay 3",
    status: "READY",
    progress: 100,
    estimatedTime: "Ready for Pickup",
    branch: "cbd"
  }
];

export const INITIAL_PERMISSIONS = {
  VIP: {
    turnstile: true,
    vip: true,
    baths: true,
    canteen: true,
    carwash: true
  },
  CORPORATE: {
    turnstile: true,
    vip: true,
    baths: true,
    canteen: true,
    carwash: false
  },
  STANDARD: {
    turnstile: true,
    vip: false,
    baths: false,
    canteen: true, // Pay with card or wallet
    carwash: false
  }
};
