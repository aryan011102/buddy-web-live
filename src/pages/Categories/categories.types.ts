import type { CSSProperties } from "react";

export type CategoryItem = {
  id: string;
  label: string;
  icon: string;
  lightColor: string;
  darkColor: string;
  iconInlineStyle?: CSSProperties;
};

export type CircleContent =
  | { type: "icon"; category: CategoryItem }
  | { type: "text"; category: CategoryItem }
  | { type: "empty" };
