export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const FAQS: FaqItem[] = [
  {
    id: "1",
    question: "Does the app require a subscription?",
    answer: "Not just yet.\nRight now, you can discover trusted recommendations and leads shared by the users on the app.\nIn our upcoming version, you’ll be able to:\nExplore the best PGs and flats\nSee real reviews and ratings from people on the app\nConnect directly for availability and bookings\nWe’re building a more transparent, community-powered way to find housing. Stay tuned."
  },
  {
    id: "2",
    question: "How do I find a buddy?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo conseq"
  },
  {
    id: "3",
    question: "Is my location shared?",
    answer: "Only approximate area. Exact address is never shown."
  },
  {
    id: "4",
    question: "Can I block someone?",
    answer: "Yes. Blocking instantly hides both profiles."
  },
  {
    id: "5",
    question: "Is chat moderated?",
    answer: "Yes. Safety systems run continuously."
  },
  {
    id: "6",
    question: "Can I report bad behavior?",
    answer: "Yes, directly from chat or profile."
  }
];
