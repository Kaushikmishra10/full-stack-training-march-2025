// ─── Stat Cards ───────────────────────────────────────────
export const analyticsStats = [
  { label: "Menus Today", value: "346", radial: 70 },
  { label: "Customer Today", value: "221", radial: 55 },
  { label: "Total Revenue", value: "$ 951.52", radial: 80 },
  { label: "Employee", value: "98", radial: 45 },
];

// ─── Sales Statistic (Grouped Bar) ────────────────────────
export const salesStatisticData = {
  tabs: ["Weekly", "Monthly", "Yearly"],
  beverages: 569,
  food: 1567,
  series: [
    {
      name: "Beverages",
      data: [85, 70, 60, 90, 55, 45],
    },
    {
      name: "Food",
      data: [100, 95, 110, 80, 30, 70],
    },
  ],
  categories: [
    "Week 01",
    "Week 02",
    "Week 03",
    "Week 04",
    "Week 05",
    "Week 06",
  ],
};

// ─── Customer Map (Bar Chart) ──────────────────────────────
export const customerMapData = {
  series: [
    { name: "Customers", data: [20, 35, 50, 30, 45, 60, 40, 70, 55, 80] },
  ],
  categories: ["4", "5", "6", "7", "8", "9", "10", "11", "12", "13"],
};

// ─── Sales Summary (Radial + Stats) ───────────────────────
export const salesSummaryData = {
  tabs: ["Monthly", "Weekly", "Yearly"],
  radialSeries: [75, 55, 35],
  radialLabels: ["Revenue", "Sale", "Menu"],
  stats: [
    { label: "Menu Sold", value: "63,876", color: "#1a1a2e" },
    { label: "Sale (20%)", value: "$97,125", color: "#f26522" },
    { label: "Revenue", value: "$872,335", color: "#f26522" },
    { label: "Revenue", value: "$872,335", color: "#f26522" },
  ],
};

// ─── Loyal Customers ──────────────────────────────────────
export const loyalCustomers = [
  { name: "Cloudyo Chintia", orders: 881, label: "Times Order" },
  { name: "Jean Reves", orders: 356, label: "Times Order" },
  { name: "Kevin Hard", orders: 125, label: "Times Order" },
  { name: "Dave Jev Bosh", orders: 78, label: "Order" },
];

// ─── Best Seller Menus ────────────────────────────────────
export const bestSellerMenus = [
  {
    name: "Spinach with Roasted Crab",
    price: "$6.73",
    likes: "256k",
    sales: "6,723",
    image:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=120&q=80",
  },
  {
    name: "Chicken Teriyaki Khas Haji Muhidin Malang",
    price: "$6.73",
    likes: "256k",
    sales: "6,723",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=120&q=80",
  },
  {
    name: "Fried Chicken Roll Extra Spicy with Mozarella",
    price: "$6.73",
    likes: "256k",
    sales: "6,723",
    image:
      "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=120&q=80",
  },
];

// ─── Most Favorites Items ─────────────────────────────────
export const favoritesCategories = [
  "All Categories",
  "Main Course",
  "Pizza",
  "Drink",
  "Dessert",
  "More",
];

export const favoritesItems = [
  {
    name: "Creamy Parmesan Cheese with Chicken Teriyaki Egg",
    rating: 4,
    reviews: "4454 reviews",
    likes: "256k like it",
    interest: 45,
    totalSales: 6732,
    radial: 75,
    sparkData: [10, 25, 15, 30, 20, 35, 25, 40],
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=120&q=80",
  },
  {
    name: "Mini Donuts with Variant Topping (Chocolate)",
    rating: 3,
    reviews: "4454 reviews",
    likes: "256k like it",
    interest: 26,
    totalSales: 5721,
    radial: 62,
    sparkData: [30, 20, 35, 15, 25, 10, 20, 15],
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=120&q=80",
  },
  {
    name: "Cappucino Latte",
    rating: 3,
    reviews: "4454 reviews",
    likes: "256k like it",
    interest: 17,
    totalSales: 3515,
    radial: 52,
    sparkData: [25, 30, 20, 35, 15, 25, 20, 30],
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=120&q=80",
  },
];

// ─── Daily Trending Menus ─────────────────────────────────
export const dailyTrendingMenus = [
  {
    name: "Watermelon juice with ice",
    orders: 67,
    price: "$4.8",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=80&q=80",
  },
  {
    name: "Chicken curry special with cucumber",
    orders: 88,
    price: "$5.6",
    image:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=80&q=80",
  },
  {
    name: "Italiano pizza with garlic",
    orders: 89,
    price: "$12.6",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=80&q=80",
  },
  {
    name: "Tuna soup spinach with himalaya salt",
    orders: 49,
    price: "$3.6",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=80&q=80",
  },
  {
    name: "Medium Spagetti Italiano",
    orders: 49,
    price: "$4.2",
    image:
      "https://imgs.search.brave.com/B94XpV7yF8dD_SmiAeP5ZCDk7Fq32bnWuwRbnJUt-D8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zcGFn/aGV0dGlzdG9yZS5j/aC93cC1jb250ZW50/L3VwbG9hZHMvMjAy/NC8wMi9wYXN0YS1z/cGFnaGV0dGktcG9t/b2Rvcm8tZS1iYXNp/bGljby1zcGFnaGV0/dGktc3RvcmUtcmlz/dG9yYW50ZS1pdGFs/aWFuby0xLmpwZw",
  },
];
