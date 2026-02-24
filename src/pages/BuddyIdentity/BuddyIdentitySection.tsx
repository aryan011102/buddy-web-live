import { useEffect, useRef, useState } from "react";
import "./buddyIdentity.css";
import { BUDDY_IDENTITIES, IDENTITY_COLORS } from "./buddyIdentity.constants";
import type { BuddyIdentity } from "./buddyIdentity.types";

import IdentityText from "../../components/IdentityText/IdentityText";
import DiceButton from "../../components/DiceButton/DiceButton";
import spark1 from "../../assets/svg/spark-pink.svg";
import spark2 from "../../assets/svg/spark-pair.svg";
import diceSound from "../../assets/sound/dice-sound.mp3";
export default function BuddyIdentitySection() {
  const [currentBuddy, setCurrentBuddy] = useState<BuddyIdentity>(
    BUDDY_IDENTITIES[0],
  );

  const [rolling, setRolling] = useState(false);

  const [color, setColor] = useState(IDENTITY_COLORS[0]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(diceSound);
    audioRef.current.volume = 0.7;
  }, []);

  function rollIdentity() {
    if (rolling) return;

    setRolling(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      void audioRef.current.play();
    }

    const next =
      BUDDY_IDENTITIES[Math.floor(Math.random() * BUDDY_IDENTITIES.length)];

    const nextColor =
      IDENTITY_COLORS[Math.floor(Math.random() * IDENTITY_COLORS.length)];

    setTimeout(() => {
      setCurrentBuddy(next);
      setColor(nextColor);
      setRolling(false);
    }, 450);
  }

  return (
    <section className="buddy-identity">
      <div className="buddy-content">
        <p className="buddy-eyebrow">With Buddy you can be anyone...</p>

        <div className="identity-row">
          <img src={spark1} className="spark left" alt="" />

          <IdentityText
            identity={currentBuddy.label}
            color={color}
            rolling={rolling}
            onRoll={rollIdentity}
          />

          <img src={spark2} className="spark right" alt="" />
        </div>

        <div className="buddy-sub-row">
          <span>Roll the dice to find out what kind of a buddy you are</span>

          <DiceButton onClick={rollIdentity} rolling={rolling} />
        </div>
      </div>
    </section>
  );
}
