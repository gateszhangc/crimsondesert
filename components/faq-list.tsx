"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <Accordion
      defaultValue={items[0] ? [items[0].question] : []}
      multiple
      className="gap-2"
    >
      {items.map((item) => (
        <AccordionItem
          key={item.question}
          value={item.question}
          className="rounded-[1.2rem] border border-white/8 bg-black/18 px-4"
        >
          <AccordionTrigger className="gap-4 py-4 text-base font-medium text-white hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="pb-4 text-sm leading-7 text-white/66">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
