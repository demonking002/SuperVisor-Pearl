import SocialLinks from "./SocialLinks";
import Logo from "./Logo";
import { SITE, GUARDIAN_COPY } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink px-6 pb-10 pt-16 text-sand-light dark:bg-night-deep">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
        <Logo size={48} wordmarkClassName="text-2xl" />
        <p className="max-w-md text-sm text-sand-light/60">
          {SITE.tagline}
        </p>

        <SocialLinks variant="grid" />

        <div className="h-px w-full max-w-md bg-sand-light/10" />

        <p className="max-w-lg text-xs leading-relaxed text-sand-light/40">
          {GUARDIAN_COPY.disclaimer}
        </p>

        <p className="text-xs text-sand-light/30">
          © {new Date().getFullYear()} {SITE.name}. Pearl is on patrol.
        </p>
      </div>
    </footer>
  );
}
