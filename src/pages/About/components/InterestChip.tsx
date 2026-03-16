import type { CategoryItem } from "../../Categories/categories.types";

type InterestChipProps = {
  category: CategoryItem;
};

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const normalized = clean.length === 3
    ? clean.split("").map(c => c + c).join("")
    : clean;
  const int = Number.parseInt(normalized, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function InterestChip({ category }: InterestChipProps) {
  const borderColor = category.darkColor;
  const fillColor = hexToRgba(borderColor, 0.1);

  return (
    <span
      className="team-interest-chip"
      style={{
        ["--chip-fill" as string]: fillColor,
        ["--chip-border" as string]: borderColor,
      }}
    >
      <img src={category.icon} alt="" aria-hidden="true" />
      <span>{category.label}</span>
    </span>
  );
}
