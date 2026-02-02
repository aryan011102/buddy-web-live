import "./stepCard.css";
import type { StepData } from "../../pages/Steps/steps.constants";

type Props = {
  data: StepData;
};
export default function StepCard({ data }: Props) {
  return (
    <div className="step-card">
      <div className="step-left">
        <div className="step-image-wrap">
          <img src={data.image} alt={data.title} />
        </div>
      </div>

      <div className="step-right">
        <h3>{data.title}</h3>

        <ul>
          {data.items.map((item, i) => (
            <li key={i}>
              <img src={item.icon} alt="" />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
