import "./cta.css"
import phone1 from "../../assets/svg/mockup1.svg"
import phone2 from "../../assets/svg/mockup2.svg"
import phoneMockup from "../../assets/svg/phone-mockup.svg"

const CTASection = () => {
  return (
    <section className="cta-section">
      <div className="cta-container">

        <div className="cta-left">
          <h2>
            Ready to make your move?
          </h2>

          <div className="cta-buttons">
            <button className="cta-btn">Apple Store</button>
            <button className="cta-btn">Play Store</button>
          </div>
        </div>

        <div className="cta-right">
          <img
            src={phone1}
            className="phone phone-front desktop-only"
            alt="App preview front"
          />
          <img
            src={phone2}
            className="phone phone-back desktop-only"
            alt="App preview back"
          />
          <img
            src={phoneMockup}
            className="phone-mobile mobile-only"
            alt="App mobile preview"
          />
        </div>

      </div>
    </section>
  )
}

export default CTASection
