"use client";

import { motion } from "framer-motion";
import ContractAddress from "./ContractAddress";
import BuyButton from "./BuyButton";
import { HOW_TO_BUY_STEPS, SITE } from "@/lib/constants";

export default function HowToBuy() {
  return (
    <section
      id="how-to-buy"
      className="relative overflow-hidden bg-lagoon-deep px-6 py-24 text-sand-light dark:bg-night"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <span className="font-display text-sm font-bold uppercase tracking-[0.25em] text-rhgreen">
            Join the Patrol
          </span>
          <h2 className="section-heading mt-3 text-4xl sm:text-5xl">
            How to Buy {""}
            <span className="text-gold">$PEARL</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sand-light/70">
            Four steps on Robinhood Chain. No badge required.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_TO_BUY_STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass relative flex flex-col gap-3 rounded-2xl p-6 shadow-glass"
            >
              <span className="absolute right-4 top-4 font-display text-xs font-bold text-seafoam/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-3xl">{step.emoji}</span>
              <h3 className="font-display text-lg font-bold">{step.title}</h3>
              <p className="text-sm text-sand-light/75">{step.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          <BuyButton className="px-8 py-3.5 text-base">
            Buy {SITE.ticker} on DexScreener
          </BuyButton>
          <ContractAddress />
        </motion.div>
      </div>
    </section>
  );
}
