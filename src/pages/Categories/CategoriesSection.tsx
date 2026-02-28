import "./categories.css";
import { makeBgVariant } from "../../theme/bgVariant";
import CategoryStage from "../../components/CategoryStage/CategoryStage";

export default function CategoriesSection() {
  const variant = makeBgVariant({
    lightBg: "#FFFFFF",
    darkBg: "#000000",
    lightTitle: "#000000",
    darkTitle: "#F6DDE1",
  });

  return (
     <section
      className="categories-section"
      id="categories"
      style={{
        ["--categories-bg" as any]: variant.pageBg,
        ["--categories-title" as any]: variant.titleColor,
      }}
    >
      <CategoryStage>
        <h2 className="categories-title">
          We also built communities around what you love

        </h2>
      </CategoryStage>
    </section>
  );
}

