interface WatermelonProps {
  size?: number;
  variant?: "whole" | "slice";
  className?: string;
}

export default function Watermelon({
  size = 64,
  variant = "whole",
  className = "",
}: WatermelonProps) {
  if (variant === "slice") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className={className}
        aria-hidden="true"
      >
        <path
          d="M50 8 A42 42 0 0 1 92 50 L8 50 A42 42 0 0 1 50 8 Z"
          fill="#3FAF9C"
        />
        <path
          d="M50 16 A34 34 0 0 1 84 50 L16 50 A34 34 0 0 1 50 16 Z"
          fill="#FDF8EC"
        />
        <path
          d="M50 24 A26 26 0 0 1 76 50 L24 50 A26 26 0 0 1 50 24 Z"
          fill="#FF6B7A"
        />
        <circle cx="40" cy="40" r="2.4" fill="#0B2E33" />
        <circle cx="60" cy="38" r="2.4" fill="#0B2E33" />
        <circle cx="50" cy="46" r="2.4" fill="#0B2E33" />
        <circle cx="34" cy="46" r="2.2" fill="#0B2E33" />
        <circle cx="66" cy="46" r="2.2" fill="#0B2E33" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="46" fill="#0F6B6B" />
      <path
        d="M50 4 C74 4 94 24 94 50 C 70 40 30 40 6 50 C6 24 26 4 50 4 Z"
        fill="#3FAF9C"
        opacity="0.55"
      />
      <path
        d="M50 4 C74 4 94 24 94 50 C 94 76 74 96 50 96 C 26 96 6 76 6 50 C6 24 26 4 50 4 Z"
        fill="none"
        stroke="#0B4A4A"
        strokeWidth="2"
        opacity="0.4"
      />
      <ellipse cx="34" cy="30" rx="10" ry="6" fill="#B7EEE1" opacity="0.5" />
    </svg>
  );
}
