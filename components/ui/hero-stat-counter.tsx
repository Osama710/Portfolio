/**
 * Counter text is driven by the inline boot script in layout.tsx (runs on DOMContentLoaded).
 * React must not set text children so hydration does not reset a finished count-up.
 */
export function HeroStatCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  return (
    <span
      suppressHydrationWarning
      className="hero-count"
      data-value={value}
      data-suffix={suffix}
      data-duration="700"
    />
  );
}
