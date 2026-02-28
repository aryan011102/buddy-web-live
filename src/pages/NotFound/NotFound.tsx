import { Link } from "react-router-dom";
import "./notFound.css";
import notFoundChar from "../../assets/svg/404-char.svg";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found-content">
        <h1 className="not-found-title">You look lost let me help you</h1>
        <Link className="not-found-cta" to="/">
          Return to Buddy
        </Link>
      </div>
      <motion.img
        className="not-found-char"
        src={notFoundChar}
        alt=""
        aria-hidden="true"
        animate={{ y: [10, -5, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </main>
  );
}

