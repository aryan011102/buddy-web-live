import { useState } from "react";
import "./faqAccordion.css";
import type { FaqItem } from "../../pages/FAQs/faq.data.ts";
import { ChevronDown } from "lucide-react";

type Props = {
  items: FaqItem[];
};

export default function FaqAccordion({ items }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const open = item.id === openId;
        const alt = index % 2 === 0;

        return (
          <div
            key={item.id}
            className={`faq-item ${alt ? "pink" : "gray"} ${
              open ? "open" : ""
            }`}
            onClick={() =>
              setOpenId(open ? null : item.id)
            }
          >
            <div className="faq-header">
              <span>{item.question}</span>
            <ChevronDown className="chevron-icon"/>

            </div>

            <div className="faq-body">
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
