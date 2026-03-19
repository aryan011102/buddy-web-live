import type { DriveCardItem } from "../Vision/vision.data";
import { Cross } from "lucide-react";
type Props = {
  card: DriveCardItem;
  isActive?: boolean;
  onOpen?: (id: string) => void;
  onClose?: () => void;
};

export default function DriveCard({ card, isActive = false, onOpen, onClose }: Props) {
  const TagName = onOpen ? "button" : "article";

  return (
    <TagName
      type={TagName === "button" ? "button" : undefined}
      className={`drives-card drives-card--${card.theme.align} ${isActive ? "is-active" : ""}`}
      onClick={onOpen ? () => onOpen(card.id) : undefined}
      aria-expanded={onOpen ? isActive : undefined}
      style={
        {
          ["--drive-accent" as string]: card.theme.accent,
          ["--drive-border" as string]: card.theme.border,
          ["--drive-panel" as string]: card.theme.panel,
          ["--drive-rotation" as string]: card.theme.rotation,
          ["--drive-shadow" as string]: card.theme.shadow,
          ["--drive-z" as string]: card.theme.zIndex,
        }
      }
    >
      <div className="drives-card-panel">
        <div className="drives-card-heading">
          <h3>{card.title}</h3>
        </div>
        {isActive && onClose ? (
          <button type="button" className="drives-card-close" onClick={onClose} aria-label={`Close ${card.title}`}>
             <Cross size={20} style={{ transform: 'rotate(45deg)' }} />
          
          </button>
        ) : null}
        {isActive ? (
          <div className="drives-card-copy">
            {card.lines.map(line => (
              <p key={line}>{line}</p>
            ))}
          </div>
        ) : null}
        <div className={`drives-card-illustration drives-card-illustration--${card.id}`} aria-hidden="true">
          <img className="drives-card-artwork" src={card.artwork} alt="" />
        </div>
      </div>
    </TagName>
  );
}
