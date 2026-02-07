export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const FAQS: FaqItem[] = [
  {
    id: "1",
    question: "Does the app require a subscription?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo conseq"
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
