import "./about.css";
import PacmanGame from "./Pacman/PacmanGame";
import KnowTeamSection from "./Team/KnowTeamSection";
import VisionSection from "./Vision/VisionSection";
import FriendsChainSection from "./FriendsChainSection";

export default function About() {
  return (
    <main className="about-page">
      <KnowTeamSection />
      <VisionSection />
      <PacmanGame />
      <FriendsChainSection />
    </main>
  );
}
