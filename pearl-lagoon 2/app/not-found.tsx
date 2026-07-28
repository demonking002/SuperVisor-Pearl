import Link from "next/link";
import PearlPortrait from "@/components/PearlPortrait";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b from-sand-light to-seafoam-light px-6 text-center dark:from-night dark:to-lagoon-deep">
      <PearlPortrait size={160} />
      <h1 className="section-heading text-4xl text-lagoon-deep dark:text-seafoam">
        Pearl hasn&apos;t patrolled this far yet
      </h1>
      <p className="max-w-md text-ink/70 dark:text-sand/70">
        This page must be off the beaten trench. Let&apos;s get you back to
        HQ.
      </p>
      <Link
        href="/"
        className="focus-ring rounded-full bg-coral px-6 py-3 font-display font-bold text-white shadow-lg transition-transform hover:scale-105"
      >
        Back to Supervisor Pearl HQ
      </Link>
    </div>
  );
}
