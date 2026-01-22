"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Shipping & Delivery",
    answer: "We ship worldwide using premium carriers. Standard delivery takes 5-7 business days. Express shipping (2-3 business days) is available at checkout. All watches are insured during transit and require signature upon delivery.",
  },
  {
    question: "Returns & Exchanges",
    answer: "We offer a 14-day return policy for unworn watches in original packaging. Exchanges are available for different models or sizes. Contact our support team to initiate a return. Custom or engraved pieces are final sale.",
  },
  {
    question: "Payment Methods (Demo)",
    answer: "This is a demo site using Solana Devnet. Transactions are for demonstration purposes only and use test SOL. In production, we accept USDT (SPL token) on Solana mainnet. Connect your Phantom or Solflare wallet to complete purchases.",
  },
  {
    question: "Authenticity & Verification",
    answer: "Each GLITCH TIME watch comes with on-chain verification. Your purchase is recorded on the Solana blockchain, providing immutable proof of ownership and authenticity. Access your verification certificate through your order confirmation.",
  },
]

export function SupportSection() {
  return (
    <section id="support" className="py-24 px-4 bg-black">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-neon-cyan mb-4">
            Support
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to know about GLITCH TIME
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-muted rounded-lg px-6 hover:border-neon-cyan/50 transition-colors"
            >
              <AccordionTrigger className="text-left text-white hover:text-neon-cyan">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

