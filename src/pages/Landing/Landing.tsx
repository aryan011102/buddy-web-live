
import BuddyIdentitySection from "../BuddyIdentity/BuddyIdentitySection";
import CategoriesSection from "../Categories/CategoriesSection";
import FaqSection from "../FAQs/FaqSection";
import { FeaturesSection } from "../Features";
import HeroSection from "../Hero/HeroSection";
import QuestionsSection from "../Questions/QuestionsSection";
import StepsSection from "../Steps/StepsSection";

export default function Landing() {
  return (
    <div>
      <HeroSection />
      <QuestionsSection />
      <FeaturesSection />
      <StepsSection/>
      <CategoriesSection/>
      <BuddyIdentitySection/>
      <FaqSection/>
    </div>
  );
}
