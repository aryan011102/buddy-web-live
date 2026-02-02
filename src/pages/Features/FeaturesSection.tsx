import { useEffect, useState } from "react";
import { FEATURES } from "./features.constants";
import FeatureCard from "../../components/FeatureCard/FeatureCard";
import { useInViewport } from "../../hooks/useInViewport";
import "./features.css";

export default function FeaturesSection() {
  const { ref, inView } = useInViewport();
  const [resetKey, setResetKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <section ref={ref} className="features-section" id="features">
      <h2 className="features-title">
        Features that <span>separate</span> us from the chaos
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
