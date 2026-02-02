import step1 from "../../assets/svg/step1.svg";
import step2 from "../../assets/svg/step2.svg";
import step3 from "../../assets/svg/step3.svg";
import step4 from "../../assets/svg/step4.svg";
import step5 from "../../assets/svg/step5.svg";
import icon1 from "../../assets/svg/circleIcon.svg";
import icon2 from "../../assets/svg/squareIcon.svg";
import icon3 from "../../assets/svg/circleBicon.svg";
import icon4 from "../../assets/svg/squareYicon.svg";

export type StepItem = {
  icon: string;
  text: string;
};

export type StepData = {
  id: string;
  title: string;
  image: string;
  items: StepItem[];
   pageBg: string;       // NEW
  imageBg: string;   
};

export const STEPS: StepData[] = [
  {
    id: "find",
    title: "FIND",
    image: step1,
    items: [
      { icon: icon1, text: "Explore trusted local recommendations" },
      { icon: icon2, text: "Get guidance on safe areas & housing options" },
      { icon: icon3, text: "Discover verified listings" },
      { icon: icon4, text: "Shortlist easily" },
    ],
     pageBg: "#64BDFF",
    imageBg: "#E3F3FF",
  },
  {
    id: "connect",
    title: "CONNECT",
    image: step2,
   items: [
      { icon: icon1, text: "Explore trusted local recommendations" },
      { icon: icon2, text: "Get guidance on safe areas & housing options" },
      { icon: icon3, text: "Discover verified listings" },
      { icon: icon4, text: "Shortlist easily" },
    ],
     pageBg: "#FFB9FF",
    imageBg: "#FFF1FF",
  },

  {
    id: "visit",
    title: "VISIT",
    image: step3,
     items: [
      { icon: icon1, text: "Explore trusted local recommendations" },
      { icon: icon2, text: "Get guidance on safe areas & housing options" },
      { icon: icon3, text: "Discover verified listings" },
      { icon: icon4, text: "Shortlist easily" },
    ],
     pageBg: "#F6D307",
    imageBg: "#FFFBE2",
  },

  {
    id: "decide",
    title: "DECIDE",
    image: step4,
    items: [
      { icon: icon1, text: "Explore trusted local recommendations" },
      { icon: icon2, text: "Get guidance on safe areas & housing options" },
      { icon: icon3, text: "Discover verified listings" },
      { icon: icon4, text: "Shortlist easily" },
    ],
     pageBg: "#8D8DFF",
    imageBg: "#E9E9FF",
  },

  {
    id: "move",
    title: "MOVE",
    image: step5,
    items: [
      { icon: icon1, text: "Explore trusted local recommendations" },
      { icon: icon2, text: "Get guidance on safe areas & housing options" },
      { icon: icon3, text: "Discover verified listings" },
      { icon: icon4, text: "Shortlist easily" },
    ],
     pageBg: "#98D81E",
    imageBg: "#EEFFCC",
  },
];
