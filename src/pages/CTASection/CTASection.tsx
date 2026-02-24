import "./cta.css";
import phone1 from "../../assets/svg/mockup1.svg";
import phone2 from "../../assets/svg/mockup2.svg";
import phoneMockup from "../../assets/svg/phone-mockup.svg";
const CTASection = () => {
  return (
    <section className="cta-section">
      <div className="cta-container">

        <div className="cta-left">
         <h2>
  Ready to make your <br />
  move?
</h2>

          <div className="cta-buttons">
            <button className="cta-btn">App Store</button>
            <button className="cta-btn">Play Store</button>
          </div>
        </div>

        <div className="cta-right">
          <div className="phones desktop-only">
            <img src={phone2} className="phone phone-back" />
            <img src={phone1} className="phone phone-front" />
          </div>

          <img src={phoneMockup} className="phone-mobile mobile-only" />
        </div>

      </div>
    </section>
  );
};

export default CTASection;
