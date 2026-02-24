import { motion } from "framer-motion";
import type { FeatureCardData } from "../../pages/Features/features.types";
import "./featureCard.css";

type Props = {
  data: FeatureCardData;
  draggable: boolean;
};

export default function FeatureCard({ data, draggable }: Props) {
  return (
  <motion.div
  className="feature-card-outer"
  data-id={data.id}
  drag={draggable}
  dragMomentum={false}
  dragElastic={0.2}
  style={{
    ["--card-x" as any]: `${data.initialX}%`,
    ["--card-y" as any]: `${data.initialY}%`,
    transform: "translate(-50%, -50%)",
    ["--edge" as any]: data.borderColor
  }}
>

  <div
  className="feature-card-inner"
  style={{
    ["--bg" as any]: data.bgColor
  }}
>
        <div className="feature-text">
          <h3>{data.title}</h3>
          <p>{data.description}</p>
        </div>

        <img src={data.image} alt={data.title} />
      </div>
    </motion.div>
  );
}
