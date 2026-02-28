import type { FeatureCardData } from "./features.types";
import findBuddy from "../../assets/svg/findBuddy.svg";
import becomeBuddy from "../../assets/svg/becomeBuddy.svg";
import joinCommunity from "../../assets/svg/joincommunity.svg";
import postNudge from "../../assets/svg/postNudge.svg";
import explore from "../../assets/svg/exploreRecommendation.svg";

export const FEATURES: FeatureCardData[] = [
  {
    id: "find",
    title: "Find A Buddy",
    description:
      "Find people who’ve been there, done that and can help you through a personalised recommendation system",
    image: findBuddy,
    bgColor: "#E3FFAF",
    borderColor: "#98D81E",
    initialX: 10,
    initialY: 0,
  },
  {
    id: "become",
    title: "Become A Buddy",
    description:
      "Create a profile for people to discover you as their buddy",
    image: becomeBuddy,
    bgColor: "#B9B9FF",
    borderColor: "#8D8DFF",
    initialX: 50,
    initialY: 0,
  },
  {
    id: "communities",
    title: "Join Buddy Communities",
    description:
      "Join different communities and interest groups and join or create events",
    image:joinCommunity,
    bgColor: "#FFF2A4",
    borderColor: "#F6D307",
    initialX: 90,
    initialY: 0,
  },
  {
    id: "nudge",
    title: "Post A Nudge",
    description:
      "Find flat mates, and buddies to accompany you in spontaneous plans",
    image: postNudge,
    bgColor: "#FFDAFF",
    borderColor: "#FFB9FF",
    initialX: 30,
    initialY: 55,
  },
  {
    id: "explore",
    title: "Explore Top Recommendations",
    description:
      "Discover the best options, rated and reviewed by people just like you",
    image: explore,
    bgColor: "#ADDCFF",
    borderColor: "#64BDFF",
    initialX: 70,
    initialY: 55,
  },
];

