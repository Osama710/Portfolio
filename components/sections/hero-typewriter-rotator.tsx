import { HeroTypewriterDisplay } from "@/components/sections/hero-typewriter-display";
import { cn } from "@/lib/utils";

type HeroTypewriterRotatorProps = {
  items: readonly string[];
  className?: string;
};

export function HeroTypewriterRotator({ items, className }: HeroTypewriterRotatorProps) {
  return (
    <p
      className={cn(
        "hero-rotator-line flex min-h-[1rem] flex-wrap items-baseline gap-x-2 text-xlg font-medium leading-tight sm:min-h-[1rem] sm:text-xlg lg:text-[1.2rem]",
        className,
      )}
    >
      <span className="text-ink-muted">I build</span>
      <HeroTypewriterDisplay items={items} />
    </p>
  );
}
