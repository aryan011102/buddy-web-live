import "./categories.css";
import CategoryStage from "../../components/CategoryStage/CategoryStage";

export default function CategoriesSection() {


  return (
     <section className="categories-section" id="categories">
      <h2 className="categories-title">
        Features that <span>separate</span> us from the chaos
      </h2>

      <CategoryStage />
    </section>
  );
}
