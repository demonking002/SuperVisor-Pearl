"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import BuyButton from "./BuyButton";

const LINKS = [
  { href: "#story", label: "Story" },
  { href: "#roadmap", label: "Tides" },
  { href: "#how-to-buy", label: "How to Buy" },
  { href: "#dashboard", label: "Dashboard" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 transition-all duration-500 sm:px-6 ${
          scrolled ? "glass-solid mx-3 shadow-glass py-2 sm:mx-6" : "py-1"
        }`}
      >
        <a href="#top" className="focus-ring flex items-center gap-2">
          <Logo size={34} priority wordmarkClassName="text-lg text-lagoon-deep dark:text-seafoam" />
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="focus-ring rounded-md px-1 font-body text-sm font-semibold text-ink/70 transition-colors hover:text-coral dark:text-sand/80 dark:hover:text-coral"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <BuyButton className="hidden px-4 py-2 text-sm sm:inline-flex" />
          <ThemeToggle />
          <button
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-full glass md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="text-lg">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {open && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="glass-solid mx-3 mt-2 flex flex-col gap-1 rounded-2xl p-4 shadow-glass md:hidden"
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="focus-ring rounded-lg px-3 py-2 font-semibold text-ink/80 hover:bg-white/40 dark:text-sand dark:hover:bg-white/10"
            >
              {link.label}
            </a>
          ))}
          <BuyButton
            className="mt-1 w-full px-3 py-2"
            onClick={() => setOpen(false)}
          />
        </motion.nav>
      )}
    </motion.header>
  );
}
