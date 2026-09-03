/** Empty span — stepped count-up is pure CSS via ::after (no JS, no hydration mismatch). */
export function HeroAnimatedCounter({
  value,
  suffix = "+",
  counterId,
}: {
  value: string;
  suffix?: string;
  counterId: string;
}) {
  const target = Number(value) || 0;

  return (
    <span
      className="hero-count"
      data-value={value}
      data-suffix={suffix}
      data-counter-id={counterId}
      aria-label={`${target}${suffix}`}
    />
  );
}
