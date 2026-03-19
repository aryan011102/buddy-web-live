import type { CategoryItem } from "../../Categories/categories.types";
import art from "../../../assets/svg/art.svg";
import health from "../../../assets/svg/health.svg";
import sports from "../../../assets/svg/fitness.svg";
import music from "../../../assets/svg/music.svg";
import travel from "../../../assets/svg/travel.svg";
import food from "../../../assets/svg/cooking.svg";
import gaming from "../../../assets/svg/gaming.svg";
import popCulture from "../../../assets/svg/popCulture.svg";
import books from "../../../assets/svg/books.svg";
import fashion from "../../../assets/svg/fashion.svg";
import tech from "../../../assets/svg/tech.svg";
import adventure from "../../../assets/svg/adventure.svg";

import type { TeamInterestId } from "./knowTeam.types";

export const TEAM_INTERESTS: Record<TeamInterestId, CategoryItem> = {
  art: {
    id: "art",
    label: "Arts & Design",
    icon: art,
    lightColor: "#FFF5BE",
    darkColor: "#F6D307",
  },
  health: {
    id: "health",
    label: "Health & Wellness",
    icon: health,
    lightColor: "#E3FFAF",
    darkColor: "#98D81E",
  },
  sports: {
    id: "sports",
    label: "Sports & Fitness",
    icon: sports,
    lightColor: "#FFDDFF",
    darkColor: "#FFB9FF",
  },
  music: {
    id: "music",
    label: "Music",
    icon: music,
    lightColor: "#C8E8FF",
    darkColor: "#64BDFF",
    iconInlineStyle: { width: "12px", height: "12px" },
  },
  travel: {
    id: "travel",
    label: "Travel & Exploration",
    icon: travel,
    lightColor: "#E3FFAF",
    darkColor: "#98D81E",
  },
  food: {
    id: "food",
    label: "Food & Culinary Arts",
    icon: food,
    lightColor: "#FFF5BE",
    darkColor: "#F6D307",
    iconInlineStyle: { width: "16px", height: "16px" },
  },
  gaming: {
    id: "gaming",
    label: "Gaming & E-sports",
    icon: gaming,
    lightColor: "#DEDEFF",
    darkColor: "#8D8DFF",
  },
  popCulture: {
    id: "popCulture",
    label: "Pop Culture & Entertainment",
    icon: popCulture,
    lightColor: "#C8E8FF",
    darkColor: "#64BDFF",
  },
  books: {
    id: "books",
    label: "Books & Literature",
    icon: books,
    lightColor: "#FFDDFF",
    darkColor: "#FFB9FF",
  },
  fashion: {
    id: "fashion",
    label: "Fashion & Lifestyle",
    icon: fashion,
    lightColor: "#FFF5BE",
    darkColor: "#F6D307",
  },
  tech: {
    id: "tech",
    label: "Technology & Gadgets",
    icon: tech,
    lightColor: "#DEDEFF",
    darkColor: "#8D8DFF",
  },
  adventure: {
    id: "adventure",
    label: "Adventure & Outdoor Activity",
    icon: adventure,
    lightColor: "#E3FFAF",
    darkColor: "#98D81E",
  },
};
