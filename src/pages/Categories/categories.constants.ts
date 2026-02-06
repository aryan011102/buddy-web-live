import type { CategoryItem } from "./categories.types";

// --- ICON IMPORTS ---

import art from "../../assets/svg/art.svg";
import health from "../../assets/svg/health.svg";
import sports from "../../assets/svg/fitness.svg";
import music from "../../assets/svg/music.svg";
import travel from "../../assets/svg/travel.svg";
import food from "../../assets/svg/cooking.svg";
import gaming from "../../assets/svg/gaming.svg";
import popCulture from "../../assets/svg/popCulture.svg";
import books from "../../assets/svg/books.svg";
import fashion from "../../assets/svg/fashion.svg";
import tech from "../../assets/svg/tech.svg";
import adventure from "../../assets/svg/adventure.svg";

// --- DATA ---
export const CATEGORIES: CategoryItem[] = [
  {
    id: "music",
    label: "Music",
    icon: music,
    lightColor: "#C8E8FF",
    darkColor: "#64BDFF",
  },
  {
    id: "sports",
    label: "Sports & Fitness",
    icon: sports,
    lightColor: "#FFDDFF",
    darkColor: "#FFB9FF",
  },
  {
    id: "gaming",
    label: "Gaming & E-sports",
    icon: gaming,
    lightColor: "#DEDEFF",
    darkColor: "#8D8DFF",
  },
  {
    id: "travel",
    label: "Travel & Exploration",
    icon: travel,
    lightColor: "#E3FFAF",
    darkColor: "#98D81E",
  },
  {
    id: "art",
    label: "Art & Design",
    icon: art,
    lightColor: "#FFF5BE",
    darkColor: "#F6D307",
  },
  {
    id: "adventure",
    label: "Adventure & Outdoor Activity",
    icon: adventure,
    lightColor: "#E3FFAF",
    darkColor: "#98D81E",
  },
  {
    id: "pop",
    label: "Pop Culture & Entertainment",
    icon: popCulture,
    lightColor: "#C8E8FF",
    darkColor: "#64BDFF",
  },
  {
    id: "tech",
    label: "Tech & Gadgets",
    icon: tech,
    lightColor: "#DEDEFF",
    darkColor: "#8D8DFF",
  },
  {
    id: "books",
    label: "Books & Literature",
    icon: books,
    lightColor: "#FFDDFF",
    darkColor: "#FFB9FF",
  },
  {
    id: "fashion",
    label: "Fashion & Lifestyle",
    icon: fashion,
    lightColor: "#FFF5BE",
    darkColor: "#F6D307",
  },
  {
    id: "health",
    label: "Health & Wellness",
    icon: health,
    lightColor: "#E3FFAF",
    darkColor: "#98D81E",
  },
  {
    id: "food",
    label: "Food & Culinary Arts",
    icon: food,
    lightColor: "#FFF5BE",
    darkColor: "#F6D307",
  },
];