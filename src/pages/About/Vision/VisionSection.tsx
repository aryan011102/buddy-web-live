import { useState } from "react";
import DriveCard from "../components/DriveCard";
import { DRIVE_CARDS } from "./vision.data";
import "./vision.css";

export default function VisionSection() {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const activeCard = DRIVE_CARDS.find(card => card.id === activeCardId) ?? null;

  return (
    <section className="vision-section" aria-label="What drives Buddy">
      <h2>It all started with a move. Quite literally.</h2>

      <div className={`vision-stage ${activeCard ? "has-active-card" : ""}`}>
        {DRIVE_CARDS.map(card => (
          <DriveCard key={card.id} card={card} onOpen={setActiveCardId} />
        ))}

        {activeCard ? (
          <>
            <button
              type="button"
              className="vision-backdrop"
              aria-label="Close vision card"
              onClick={() => setActiveCardId(null)}
            />
            <div className="vision-expanded-card">
              <DriveCard
                card={activeCard}
                isActive
                onClose={() => setActiveCardId(null)}
              />
            </div>
          </>
        ) : null}
      </div>

      <p className="vision-hint">tap to know</p>
    </section>
  );
}
