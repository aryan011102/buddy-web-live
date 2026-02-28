import { useEffect, useState } from "react";
import { FEATURES } from "./features.constants";
import FeatureCard from "../../components/FeatureCard/FeatureCard";
import { useInViewport } from "../../hooks/useInViewport";
import "./features.css";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";


export default function FeaturesSection() {
  const [resetKey, setResetKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
const { ref: viewportRef, inView } = useInViewport();
const { ref: revealRef, visible } = useRevealOnScroll();

  useEffect(() => {
    const handler = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    if (!inView) {
      setResetKey(k => k + 1);
    }
  }, [inView]);

  function setRefs(el: HTMLElement | null) {
  viewportRef.current = el;
  revealRef.current = el;
}

  return (
   <section
ref={setRefs}
  className={`features-section reveal ${visible ? "visible" : ""}`}
  id="features"
>
      <h2 className="features-title">
        That’s why we made Buddy, an app in which you can...

      </h2>

      <div
        className={
          isMobile
            ? "features-stack"
            : "features-playground"
        }
      >
        {FEATURES.map((f) => (
          <FeatureCard
            key={`${resetKey}-${f.id}`}
            data={f}
            draggable={!isMobile}
          />
        ))}
      </div>
    </section>
  );
}

