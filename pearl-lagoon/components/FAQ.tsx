"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FAQS } from "@/lib/constants";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-gradient-to-b from-sand-light to-seafoam-light px-6 py-24 dark:from-ink dark:to-lagoon-deep"
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-14 text-center">
          <span className="font-display text-sm font-bold uppercase tracking-[0.25em] text-coral">
            Questions From the Shore
          </span>
          <h2 className="section-heading mt-3 text-4xl text-lagoon-deep dark:text-seafoam sm:text-5xl">
            Frequently Asked
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {FAQS.length > 0 ? (
            FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.question}
                className="glass overflow-hidden rounded-2xl shadow-glass"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="focus-ring flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base font-bold text-ink dark:text-sand sm:text-lg">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-coral/15 text-coral"
                    aria-hidden="true"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="px-6 pb-5 text-ink/75 dark:text-sand/75">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
            })
          ) : (
            <div className="glass rounded-2xl p-8 text-center shadow-glass">
              <p className="font-display text-lg font-bold text-ink dark:text-sand">
                Questions are being gathered
              </p>
              <p className="mt-2 text-ink/70 dark:text-sand/70">
                This section is reserved for the real FAQ. Send over the
                questions you want answered and they&apos;ll appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
