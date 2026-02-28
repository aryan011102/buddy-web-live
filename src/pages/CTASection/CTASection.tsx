import "./cta.css";
import phone1 from "../../assets/png/c1.png";
import phone2 from "../../assets/png/c2.png";
import phoneMockup from "../../assets/png/phone-mockup-cta.png";
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
                 href="https://forms.gle/3xvxfkFvcDmjKh2L9"
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 Join Waitlist
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

