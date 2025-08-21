import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordian"
import { faqItems } from '@/constants'


const FaqSection = () => {
  return (
      <section
          className="py-24 bg-background text-foreground border-b border-border"
          id="faqs"
      >

          <div
              className="text-center space-y-4 px-4"
          >
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
                  FAQs{" "}
                  <span className="text-blue-500"> for NeuroNote</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
                  Answers to common questions about using NeuroNote and and its features.
              </p>
          </div>
         <div className='mt-7 w-full text-start'>
              <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  defaultValue="item-1"
              >
                  {faqItems.map((faqItem, index) => (
                      <AccordionItem value={`item-${index}`} key={index}>
                          <AccordionTrigger>{faqItem.label}</AccordionTrigger>
                          <AccordionContent className="flex flex-col gap-4 text-balance">
                              <p>
                                  {faqItem.description}
                              </p>
                          </AccordionContent>
                      </AccordionItem>

                  ))}
              </Accordion>
         </div>
      </section>
  )
}

export default FaqSection

