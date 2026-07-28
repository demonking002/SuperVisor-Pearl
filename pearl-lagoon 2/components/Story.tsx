"use client";

import { motion } from "framer-motion";
import PearlPortrait from "./PearlPortrait";
import Watermelon from "./Watermelon";
import { STORY_CHAPTERS } from "@/lib/constants";

export default function Story() {
  const hasContent = STORY_CHAPTERS.length > 0;

  return (
    <section
      id="story"
      className="relative overflow-hidden bg-sand-light px-6 py-24 dark:bg-night"
    >
      <div className="absolute -left-16 top-10 opacity-20">
        <Watermelon size={140} />
      </div>
      <div className="absolute -right-10 bottom-10 opacity-10">
        <Watermelon size={180} />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <span className="font-display text-sm font-bold uppercase tracking-[0.25em] text-coral">
            Guardian Origin
          </span>
          <h2 className="section-heading mt-3 text-4xl text-lagoon-deep dark:text-seafoam sm:text-5xl">
            How Pearl Took the Watch
          </h2>
        </div>

        {hasContent ? (
          <div className="grid gap-10 md:grid-cols-2 md:gap-14">
            <div className="flex flex-col justify-center gap-8">
              {STORY_CHAPTERS.map((chapter, i) => (
                <motion.div
                  key={chapter.title}
                  initial={{ opacity: 0, x: -40, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
                  className="glass rounded-2xl p-6 shadow-glass"
                >
                  <h3 className="font-display text-xl font-bold text-ink dark:text-sand">
                    {chapter.title}
                  </h3>
                  <p className="mt-2 font-body text-ink/75 dark:text-sand/75">
                    {chapter.text}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative flex items-center justify-center"
            >
              <div className="glass flex aspect-square w-full max-w-sm flex-col items-center justify-center gap-4 rounded-[2.5rem] p-10 shadow-glass">
                <PearlPortrait size={180} floating breathing />
                <span className="text-sm font-semibold text-ink/50 dark:text-sand/50">
                  — Pearl, on duty
                </span>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-[2rem] p-10 text-center shadow-glass"
          >
            <PearlPortrait size={120} />
            <h3 className="font-display text-xl font-bold text-ink dark:text-sand">
              Pearl&apos;s origin story is being written
            </h3>
            <p className="text-ink/70 dark:text-sand/70">
              This section is reserved for the real founding story of
              Supervisor Pearl HQ. Once the team provides it, it renders here
              with the cinematic scroll reveal already built into this
              component.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
