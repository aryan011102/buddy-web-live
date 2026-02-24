import ScrollStackSimple from "../../components/ScrollStackSimple/ScrollStackSimple";
import ScrollStackItem from "../../components/ScrollStackSimple/ScrollStackItem";
import StepCard from "../../components/StepCard/StepCard";
import { STEPS } from "./steps.constants";
import "./steps.css";

export default function StepsSection() {
  return (
    <section className="steps-section" id="steps">
      <h2 className="steps-title">
        How Buddy helps you find your place
      </h2>

    <ScrollStackSimple count={STEPS.length}>
  {STEPS.map((step) => (
    <ScrollStackItem
      key={step.title}
      pageBg={step.pageBg}
      imageBg={step.imageBg}
    >
      <StepCard data={step} />
    </ScrollStackItem>
  ))}
</ScrollStackSimple>

    </section>
  );
}
