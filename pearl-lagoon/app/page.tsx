"use client";

import { useCallback, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Roadmap from "@/components/Roadmap";
import HowToBuy from "@/components/HowToBuy";
import GuardianDashboard from "@/components/GuardianDashboard";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import EasterEgg from "@/components/EasterEgg";
import KonamiReveal from "@/components/KonamiReveal";
import ConsoleEasterEgg from "@/components/ConsoleEasterEgg";
import SectionWave from "@/components/SectionWave";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import AchievementToast from "@/components/AchievementToast";
import WatermelonRain from "@/components/WatermelonRain";
import { usePopTracker } from "@/hooks/usePopTracker";
import { useKonamiCode } from "@/hooks/useKonamiCode";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [secretOpen, setSecretOpen] = useState(false);
  const [konamiOpen, setKonamiOpen] = useState(false);
  const [rainActive, setRainActive] = useState(false);

  const { count, activeMilestone, registerPop, dismissMilestone } =
    usePopTracker();

  useKonamiCode(useCallback(() => setKonamiOpen(true), []));

  const handlePop = useCallback(() => {
    registerPop();
  }, [registerPop]);

  // Trigger the watermelon rain the moment the 100-pop milestone unlocks.
  const handleMilestoneSeen = useCallback(() => {
    if (activeMilestone?.id === "watermelon-rain-100") {
      setRainActive(true);
    }
    dismissMilestone();
  }, [activeMilestone, dismissMilestone]);

  return (
    <>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <CustomCursor />
      <main className="relative">
        <ConsoleEasterEgg />
        <Navbar />
        <Hero onSecret={() => setSecretOpen(true)} onPop={handlePop} />
        <SectionWave fill="fill-sand-light dark:fill-night" />
        <Story />
        <Roadmap />
        <SectionWave fill="fill-lagoon-deep dark:fill-night" />
        <HowToBuy />
        <SectionWave fill="fill-sand-light dark:fill-ink" flip />
        <GuardianDashboard />
        <FAQ />
        <Footer />

        <EasterEgg open={secretOpen} onClose={() => setSecretOpen(false)} />
        <KonamiReveal open={konamiOpen} onClose={() => setKonamiOpen(false)} />
        <AchievementToast
          milestone={activeMilestone}
          onDismiss={handleMilestoneSeen}
        />
        <WatermelonRain
          active={rainActive}
          onComplete={() => setRainActive(false)}
        />

        <span className="sr-only" role="status">
          {count} watermelons popped across Guardian HQ
        </span>
      </main>
    </>
  );
}
