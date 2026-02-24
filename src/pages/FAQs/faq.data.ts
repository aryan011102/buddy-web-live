export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  bullets?: string[];
};

export const FAQS: FaqItem[] = [
  {
    id: "1",
    question: "Does the app require a subscription?",
    answer:
      "No, the app is completely free to use. We do offer an optional premium plan with added features, which you can choose anytime if you’d like an enhanced experience. But you can explore, connect, and join communities without paying."
  },
  {
    id: "2",
    question: "Is this a dating app?",
    answer:
      "No. We’re not a dating platform. We’re built around community, shared interests, and real-life support — whether that’s finding a buddy, joining hobby-based groups, discovering events, or getting trusted recommendations. This is about belonging in a new city, not swiping."
  },
  {
    id: "3",
    question: "I’m not moving out. Can I still use the app?",
    answer:
      "Absolutely. Buddy is for anyone who wants to expand their circle and make their city feel more connected."
  },
  {
    id: "4",
    question: "Can I be part of more than one community?",
    answer:
      "Yes, as many as you like. You can join multiple interest-based communities, explore different groups, attend events across categories, and connect with people from all kinds of spaces."
  },
  {
    id: "5",
    question: "Which cities are you live in?",
    answer:
      "We’re currently live in Gurgaon. Bangalore is coming soon. More cities on the way."
  },
  {
    id: "6",
    question: "Can anyone become a buddy?",
    answer:
      "Yes, anyone can create a profile so others can discover them as a buddy. If you’ve explored the city, found great spots, or simply want to help others settle in, you can offer support, share your experience, and guide someone through their transition. You earn points for being an active buddy, which can be redeemed for events and community experiences on the app."
  },
  {
    id: "7",
    question: "How do points work?",
    answer: "You earn points by:",
    bullets: [
      "Being a buddy for someone on the app and actually helping them",
      "Participating in communities",
      "Hosting or joining events"
    ]
  },
  {
    id: "8",
    question: "How do you ensure safety?",
    answer: "We have:",
    bullets: [
      "Verified profiles",
      "A zero-tolerance policy for misconduct",
      "Active removal of reported profiles",
      "Community moderation"
    ]
  },
  {
    id: "9",
    question: "Can I find and book flats directly on the app?",
    answer:
      "Not just yet. Right now, you can discover trusted recommendations and leads shared by users. In our upcoming version, you’ll be able to:",
    bullets: [
      "Explore the best PGs and flats",
      "See real reviews and ratings",
      "Connect directly for availability and bookings"
    ]
  },
  {
    id: "10",
    question: "How do I find a flatmate?",
    answer:
      "You can post a Nudge with your requirements: location, budget, move-in date, preferences. From there, you can:",
    bullets: [
      "View profiles",
      "Check mutual interests",
      "Start a conversation"
    ]
  },
  {
    id: "11",
    question: "What do you mean by 'Post a Nudge'?",
    answer: "Post a Nudge lets you quickly put out spontaneous plans, like:",
    bullets: [
      "Looking for a flatmate",
      "Exploring a new café",
      "Finding a gym partner",
      "Company for a concert"
    ]
  }
];