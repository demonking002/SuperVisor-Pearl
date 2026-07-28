"use client";

import { motion } from "framer-motion";
import { ROADMAP } from "@/lib/constants";
import PearlPortrait from "./PearlPortrait";

export default function Roadmap() {
  const hasContent = ROADMAP.length > 0;

  return (
    <section
      id="roadmap"
      className="relative overflow-hidden bg-gradient-to-b from-seafoam-light to-sand-light px-6 py-24 dark:from-lagoon-deep dark:to-night"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <span className="font-display text-sm font-bold uppercase tracking-[0.25em] text-coral">
            The Journey Ahead
          </span>
          <h2 className="section-heading mt-3 text-4xl text-lagoon-deep dark:text-seafoam sm:text-5xl">
            Roadmap
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-ink/70 dark:text-sand/70">
            Pearl&apos;s patrol moves island to island — each stop marks the
            next leg of the journey across Robinhood Chain.
          </p>
        </div>

        {hasContent ? (
          <div className="relative">
            <div
              className="absolute left-6 top-0 hidden h-full w-1 rounded-full bg-gradient-to-b from-seafoam via-rhgreen to-gold sm:block md:left-1/2 md:-translate-x-1/2"
              aria-hidden="true"
            />
            <ol className="space-y-10">
              {ROADMAP.map((phase, i) => (
                <motion.li
                  key={phase.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative flex flex-col gap-4 sm:pl-16 md:w-1/2 md:pl-0 ${
                    i % 2 === 0
                      ? "md:pr-14 md:text-right"
                      : "md:ml-auto md:pl-14"
                  }`}
                >
                  <span
                    className={`absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full glass text-xl shadow-glass ${
                      i % 2 === 0
                        ? "md:left-auto md:right-[-24px]"
                        : "md:left-[-24px]"
                    }`}
                  >
                    🏝️
                  </span>
                  <div className="glass rounded-2xl p-6 shadow-glass">
                    <span className="font-display text-xs font-bold uppercase tracking-widest text-coral">
                      {phase.island}
                    </span>
                    <h3 className="mt-1 font-display text-2xl font-bold text-ink dark:text-sand">
                      {phase.title}
                    </h3>
                    <p className="mt-2 text-ink/75 dark:text-sand/75">
                      {phase.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-[2rem] p-10 text-center shadow-glass"
          >
            <PearlPortrait size={110} />
            <h3 className="font-display text-xl font-bold text-ink dark:text-sand">
              The island journey is being mapped
            </h3>
            <p className="text-ink/70 dark:text-sand/70">
              This section is reserved for the real roadmap. Once it&apos;s
              provided, each stop renders here as an island on Pearl&apos;s
              patrol route.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
