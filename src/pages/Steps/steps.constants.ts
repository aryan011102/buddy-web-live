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
      { icon: icon1, text: "Find people who’ve been there, done that and match with them" },
      { icon: icon2, text: "Receive personalised recommendations based on your needs and interests." },
      { icon: icon3, text: "Ask questions and get real advice, not generic internet answers." },
  
    ],
     pageBg: "#64BDFF",
    imageBg: "#E3F3FF",
  },
  {
    id: "connect",
    title: "CONNECT",
    image: step2,
   items: [
      { icon: icon1, text: "Post your requirements & connect with the right people who have been there, done that" },
      { icon: icon2, text: "Discover trusted PG and housing recommendations from buddies" },
      { icon: icon3, text: "Explore local recommendations for furniture, cooks, carpooling and tiffin services" },
    ],
     pageBg: "#FFB9FF",
    imageBg: "#FFF1FF",
  },

  {
    id: "visit",
    title: "VISIT",
    image: step3,
     items: [
      { icon: icon1, text: "Get local hacks and insights from people who truly know the city" },
      { icon: icon2, text: "Make better everyday decisions, from cafés to co-working spots" },
      { icon: icon3, text: "Settle into your new city with confidence from day zero, ready to build a new life" },

    ],
     pageBg: "#F6D307",
    imageBg: "#FFFBE2",
  },

  {
    id: "decide",
    title: "DECIDE",
    image: step4,
    items: [
      { icon: icon1, text: "Join interest-based communities like music, pop-culture, travel, tech etc." },
      { icon: icon2, text: "Make social life simple again, attend or host events around hobbies and passions." },
      { icon: icon3, text: "Put out spontaneous plans and find people to accompany you" },

    ],
     pageBg: "#8D8DFF",
    imageBg: "#E9E9FF",
  },

  {
    id: "move",
    title: "MOVE",
    image: step5,
    items: [
      { icon: icon1, text: "Share your experiences and help others navigating the city" },
      { icon: icon2, text: "Earn points for being active and redeem them for events and experiences" },
      { icon: icon3, text: "Stay connected as you move jobs or relocate again and build your network" },
   
    ],
     pageBg: "#98D81E",
    imageBg: "#EEFFCC",
  },
];
