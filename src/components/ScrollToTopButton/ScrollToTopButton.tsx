import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import "./scrollToTopButton.css";

const PHONE_MEDIA_QUERY = "(max-width: 640px)";

export default function ScrollToTopButton() {
  const [isPhone, setIsPhone] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(PHONE_MEDIA_QUERY).matches
      : false
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(PHONE_MEDIA_QUERY);
    const onViewportChange = () => setIsPhone(media.matches);

    onViewportChange();
    media.addEventListener("change", onViewportChange);

    return () => media.removeEventListener("change", onViewportChange);
  }, []);

  useEffect(() => {
    if (isPhone) {
      setVisible(true);
      return;
    }

    const onScroll = () => {
      setVisible(window.scrollY > 240);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [isPhone]);

  if (!visible) return null;

  return (
    <button
      type="button"
      className="scroll-to-top-btn"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp size={20} strokeWidth={2.4} />
    </button>
  );
}
