"use client";

import { useEffect } from "react";

export default function ConsoleEasterEgg() {
  useEffect(() => {
    const styles = "color: #3FAF9C; font-size: 14px; font-weight: bold;";
    console.log("%c🐚 You found the console. Pearl says hi.", styles);
    console.log(
      "%cPsst... click Pearl seven times on the page for a surprise.",
      "color:#FF6B7A; font-size:12px;"
    );
  }, []);

  return null;
}
