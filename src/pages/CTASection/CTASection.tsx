import "./cta.css";
import phone1 from "../../assets/img/c1.png";
import phone2 from "../../assets/img/c2.png";
import phoneMockup from "../../assets/img/phone-mockup-cta.png";
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
               <a
                 className="cta-btn"
                 href="https://buddy-app-co.github.io/buddy-get/"
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 Download now
               </a>

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

