
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
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";
import type { ReactNode } from "react";

function RevealSection({ children }: { children: ReactNode }) {
  const { ref, visible } = useRevealOnScroll();
  return (
    <div ref={ref} className={`reveal ${visible ? "visible" : ""}`}>
      {children}
    </div>
  );
}

export default function Landing() {
  return (
    <div>
      <HeroSection />
      <RevealSection>
        <QuestionsSection />
      </RevealSection>
      <RevealSection>
        <FeaturesSection />
      </RevealSection>
     
        <StepsSection />
      <RevealSection>
        <CategoriesSection />
      </RevealSection>
    
     
   
      <RevealSection>
        <BuddyIdentitySection />
      </RevealSection>
    
        <FaqSection />

        <ReasonsSection />

      <RevealSection>
        <CTASection />
      </RevealSection>
      <RevealSection>
        <ContactSection />
      </RevealSection>
    </div>
  );
}
