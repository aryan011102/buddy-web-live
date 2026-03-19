import founderGuy from "../../../assets/svg/founder-guy.svg";
import missionGuy from "../../../assets/svg/mission-guy.svg";
import visionGuy from "../../../assets/svg/vision-guy.svg";

export type DriveCardTheme = {
  accent: string;
  border: string;
  panel: string;
  rotation: string;
  shadow: string;
  align: "left" | "center" | "right";
  zIndex: number;
};

export type DriveCardItem = {
  id: string;
  title: string;
  artwork: string;
  lines: string[];
  theme: DriveCardTheme;
};

export const DRIVE_CARDS: DriveCardItem[] = [
  {
    id: "vision",
    title: "Our Vision",
    artwork: visionGuy,
    lines: [
      "We are building a world where no one has to do life alone.",
      "A world where moving to a new city doesn't feel like starting from zero, where finding your people is as natural as finding your way. Where loneliness is reduced not by chance, but by design.",
      "At the same time, we envision a more transparent, trustworthy, and organised living ecosystem, where finding a PG or flat isn't overwhelming, uncertain, or transactional, but simple, reliable, and human. Because moving out isn't just about changing addresses.",
      "It's about starting a new chapter. And honestly, that deserves a better system.",
    ],
    theme: {
      accent: "#7777E5",
      border: "#8D8DFF",
      panel: "#B9B9FF",
      rotation: "-11.4deg",
      shadow: "1.5px 1.5px 0px 0.15px #8D8DFF",
      align: "left",
      zIndex: 1,
    },
  },
  {
    id: "founders-corner",
    title: "Founder's Note",
    artwork: founderGuy,
    lines: [
      "I moved cities once, and I hated it. Not because the city was bad, but because starting over is harder than anyone prepares you for.",
      "Finding a place is chaotic. Finding your people is even harder. And somewhere along the way, you realise how easy it is to feel alone in a city full of people. There were moments I really wished things were easier. That I didn't have to figure everything out on my own.",
     
      "Buddy was born from that experience. If we get this right, fewer people will feel alone when they move. And more people will find a sense of belonging, a little sooner.",
    
      "- Pritika",
    ],
    theme: {
      accent: "#33ABFF",
      border: "#64BDFF",
      panel: "#ADDCFF",
      rotation: "0deg",
      shadow: "1.5px 1.5px 0px 0.15px #64BDFF",
      align: "center",
      zIndex: 2,
    },
  },
  {
    id: "mission",
    title: "Our Mission",
    artwork: missionGuy,
    lines: [
      "Our mission is to make moving to a new city feel less like a disruption and more like an opportunity, by:",
      "•⁠  ⁠Helping people find meaningful, real-world connections from day one",
      "•⁠  ⁠Reducing the emotional friction of relocation - loneliness, uncertainty, and lack of belonging",
      "•⁠  ⁠Bringing structure, trust, and simplicity to the fragmented PG and flat-sharing ecosystem",
      "We’re building tools, systems, and experiences that support both - your life outside your room, and the space you come back to.",

    ],
    theme: {
      accent: "#E769CE",
      border: "#FFB9FF",
      panel: "#FFDAFF",
      rotation: "8.5deg",
      shadow: "1.5px 1.5px 0px 0.15px #FFB9FF",
      align: "right",
      zIndex: 1,
    },
  },
];
