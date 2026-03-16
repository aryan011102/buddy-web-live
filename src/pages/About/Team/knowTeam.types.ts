import type { TeamAvatarKey } from "../teamAvatars.constants";

export type TeamInterestId =
  | "art"
  | "health"
  | "sports"
  | "music"
  | "travel"
  | "food"
  | "gaming"
  | "popCulture"
  | "books"
  | "fashion"
  | "tech"
  | "adventure";

export type TeamMember = {
  id: string;
  name: string;
  age: number;
  title: string;
  locationLabel: string;
  shortBio: string;
  avatarUrl?: string;
  avatarKey?: TeamAvatarKey;
  interests: TeamInterestId[];
  superpower: string;
  buddyUse: string;
  favoriteFeature: string;
  favoriteBuddy: string;
  roleColor?: string;
};
