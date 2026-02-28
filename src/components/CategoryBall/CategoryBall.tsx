
import "./categoryBall.css";
import type { CategoryItem } from "../../pages/Categories/categories.types";
import { useMemo } from "react";

type Props = {
  category?: CategoryItem;
  variant?: "icon" | "text";
  size?: number;
};

export default function CategoryBall({
  category,
  variant = "icon",
  size = 140,
}: Props) {
  const fillerColors = [
    "#FFB9FF",
    "#8D8DFF",
    "#98D81E",
    "#F6D307",
  ];

  const fillerColor = useMemo(() => {
    return fillerColors[
      Math.floor(Math.random() * fillerColors.length)
    ];
  }, []);

  if (!category) {
    return (
      <div
        className="category-ball filler"
        style={{
          ["--ball-size" as any]: `${size}px`,
          backgroundColor: fillerColor,
        }}
      />
    );
  }

  const frontBg =
    variant === "icon"
      ? category.lightColor
      : category.darkColor;

  const backBg =
    variant === "icon"
      ? category.darkColor
      : category.lightColor;

  return (
    <div
      className="category-ball flip"
      style={{ ["--ball-size" as any]: `${size}px` }}
    >
      <div className="ball-inner">

        <div
          className="ball-face front"
          style={{ backgroundColor: frontBg }}
        >
          {variant === "icon" ? (
            <img src={category.icon} alt="" />
          ) : (
            <span>{category.label}</span>
          )}
        </div>

        <div
          className="ball-face back"
          style={{ backgroundColor: backBg }}
        >
          {variant === "icon" ? (
            <span>{category.label}</span>
          ) : (
            <img src={category.icon} alt="" />
          )}
        </div>
      </div>
    </div>
  );
}

