interface SectionWaveProps {
  className?: string;
  fill?: string;
  flip?: boolean;
}

export default function SectionWave({
  className = "",
  fill = "fill-sand-light dark:fill-night",
  flip = false,
}: SectionWaveProps) {
  return (
    <div
      className={`wave-divider pointer-events-none relative w-full leading-none ${
        flip ? "rotate-180" : ""
      } ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path
          className={fill}
          d="M0,64 C240,120 480,0 720,32 C960,64 1200,120 1440,64 L1440,120 L0,120 Z"
        />
      </svg>
    </div>
  );
}
