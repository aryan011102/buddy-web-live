import BuddyIdentitySection from "../BuddyIdentity/BuddyIdentitySection";
import CategoriesSection from "../Categories/CategoriesSection";
import ContactSection from "../ContactSection/ContactSection";
import CTASection from "../CTASection/CTASection";
import FaqSection from "../FAQs/FaqSection";
import { FeaturesSection } from "../Features";
import HeroSection from "../Hero/HeroSection";
import QuestionsSection from "../Questions/QuestionsSection";
import ReasonsSection from "../Reasons/ReasonsSection";
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
      <ReasonsSection/>
      <CTASection/>
      <ContactSection/>
    </div>
  );
}
