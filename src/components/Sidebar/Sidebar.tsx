import "./sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";

import stairs from "../../assets/svg/staircaseImg.svg";

import instagram from "../../assets/svg/instaIcon.svg";
import whatsapp from "../../assets/svg/whatsappIcon.svg";
import linkedin from "../../assets/svg/linkedinIcon.svg";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ open, onClose }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  // ------------------------
  // HOME (smart behavior)
  // ------------------------

  function goHome() {
    if (location.pathname === "/") {
      const hero = document.getElementById("hero-section");
      hero?.scrollIntoView({ behavior: "smooth" });
      onClose();
    } else {
      navigate("/");
      setTimeout(() => {
        const hero = document.getElementById("hero-section");
        hero?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }, 200);
    }
  }

  // ------------------------
  // ABOUT
  // ------------------------

  function goAbout() {
    navigate("/about");
    onClose();
  }

  // ------------------------
  // SCROLL TO SECTION
  // ------------------------

  function scrollTo(id: string) {
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      onClose();
    } else {
      navigate("/");
      setTimeout(() => {
        const el2 = document.getElementById(id);
        el2?.scrollIntoView({ behavior: "smooth" });
        onClose();
      }, 200);
    }
  }

  return (
    <>
      {open && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside className={`sidebar ${open ? "open" : ""}`}>

        {/* HEADER */}
        <div className="sidebar-header">
          <div className="sidebar-brand">buddy</div>

          <button className="sidebar-close" onClick={onClose}>
            ☰
          </button>
        </div>

        {/* STAIRCASE */}
        <img
          src={stairs}
          className="sidebar-stairs"
          alt=""
        />

        {/* NAV */}
        <nav className="sidebar-nav">
          <button onClick={goHome}>Home</button>
          <button onClick={goAbout}>About Us</button>
          <button onClick={() => scrollTo("features")}>Features</button>
          <button onClick={() => scrollTo("steps")}>Steps</button>
          <button onClick={() => scrollTo("categories")}>Categories</button>
          <button onClick={() => scrollTo("faq")}>FAQ’s</button>
          <button onClick={() => scrollTo("contact")}>Contact Us</button>
        </nav>

        {/* CTA */}
        <button className="sidebar-cta">Try Buddy</button>

        {/* FOOTER */}
        <div className="sidebar-footer">
          <span>© buddy</span>

          <div className="socials">
            <img src={instagram} alt="Instagram" />
            <img src={linkedin} alt="LinkedIn" />
            <img src={whatsapp} alt="WhatsApp" />
          </div>
        </div>

      </aside>
    </>
  );
}
