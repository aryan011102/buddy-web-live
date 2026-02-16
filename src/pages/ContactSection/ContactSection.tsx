import "./contact.css"
import ContactForm from "../../components/Contact/ContactForm"
import BoxesIllustration from "../../components/Illustration/BoxesIllustration"

export default function ContactSection() {
    
  return (
    <section className="contact-section">
      <div className="contact-container">
        <ContactForm />
        <BoxesIllustration />
      </div>
    </section>
  )
}
