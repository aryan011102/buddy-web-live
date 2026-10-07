import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./sharedLink.css";
import sharedChar from "../../assets/svg/404-char.svg";

// Same download page the landing CTA uses.
const DOWNLOAD_URL = "https://buddy-app-co.github.io/buddy-get/";

type SharedLinkProps = {
  kind: "event" | "nudge";
};

const COPY: Record<SharedLinkProps["kind"], { title: string; body: string }> = {
  event: {
    title: "You've been invited to an event on Buddy",
    body: "Get the Buddy app to see the details, check who's going and grab your spot.",
  },
  nudge: {
    title: "Someone wants you to join their plan on Buddy",
    body: "Get the Buddy app to see the nudge and join in.",
  },
};

/**
 * Landing page for links shared from the app (/e/:id and /n/:id).
 * Once App Links / Universal Links are set up, these URLs open the app
 * directly and this page only shows for people without the app.
 */
export default function SharedLink({ kind }: SharedLinkProps) {
  const { title, body } = COPY[kind];

  return (
    <main className="shared-link">
      <div className="shared-link-content">
        <h1 className="shared-link-title">{title}</h1>
        <p className="shared-link-body">{body}</p>
        <div className="shared-link-actions">
          <a
            className="shared-link-btn shared-link-btn--primary"
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Buddy
          </a>
          <Link className="shared-link-btn" to="/">
            What is Buddy?
          </Link>
        </div>
      </div>
      <motion.img
        className="shared-link-char"
        src={sharedChar}
        alt=""
        aria-hidden="true"
        animate={{ y: [10, -5, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </main>
  );
}
