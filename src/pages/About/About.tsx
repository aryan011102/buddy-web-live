import "./about.css";
import PacmanGame from "./Pacman/PacmanGame";
import KnowTeamSection from "./Team/KnowTeamSection";

export default function About() {
  return (
    <main className="about-page">
       <KnowTeamSection />
      <PacmanGame />
     
    </main>
  );
}
