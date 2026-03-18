import "./sidebar.css";import { useNavigate, useLocation } from "react-router-dom";import stairs from "../../assets/svg/staircaseImg.svg";import instagram from "../../assets/svg/instaIcon.svg";import twitter from "../../assets/svg/twitterIcon.svg";import linkedin from "../../assets/svg/linkedinIcon.svg";import buddyText from "../../assets/svg/buddy-text.svg";import buddyAppIcon from "../../assets/svg/buddy-app-icon.svg";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ open, onClose }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

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

  function goAbout() {
    navigate("/about");
    onClose();
  }

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

        <div className="sidebar-header">
           <button className="sidebar-close" onClick={onClose}>
            ☰
          </button>
          <img className="sidebar-brand" src={buddyText} alt="buddy" />

        </div>

        <img
          src={stairs}
          className="sidebar-stairs"
          alt=""
        />

        <nav className="sidebar-nav">
          <button onClick={goHome}>Home</button>
          <button onClick={goAbout}>About Us</button>
          <button onClick={() => scrollTo("features")}>Features</button>
          <button onClick={() => scrollTo("steps")}>Steps</button>
          <button onClick={() => scrollTo("categories")}>Categories</button>
          <button onClick={() => scrollTo("faq")}>FAQs</button>
          <button onClick={() => scrollTo("contact-section")}>Contact Us</button>
        </nav>

        <a
          className="sidebar-cta"
          href="https://forms.gle/3xvxfkFvcDmjKh2L9"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join Waitlist
        </a>

        <div className="sidebar-footer">
          <span className="sidebar-copyright">
            <span>©</span>
            <img className="sidebar-copyright-icon" src={buddyAppIcon} alt="buddy" />
          </span>

          <div className="socials">
            <a
              href="https://www.instagram.com/buddyapp.co.in?igsh=eXY4c2prd2J4ZHA0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Buddy on Instagram"
            >
              <img src={instagram} alt="Instagram" />
            </a>
            <a
              href="https://www.linkedin.com/company/buddytechindia/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Buddy on LinkedIn"
            >
              <img src={linkedin} alt="LinkedIn" />
            </a>
            <a
              href="https://x.com/buildinbuddy?s=21"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Buddy on X"
            >
              <img src={twitter} alt="X" />
            </a>
          </div>
        </div>

      </aside>
    </>
  );
}
