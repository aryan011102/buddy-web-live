export type CategoryItem = {
  id: string;
  label: string;
  icon: string;   
  lightColor: string;  
  darkColor: string;  
};

export type CircleContent =
  | { type: "icon"; category: CategoryItem }
  | { type: "text"; category: CategoryItem }
  | { type: "empty" };
