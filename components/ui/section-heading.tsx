import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  channel?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  channel,
  className,
}: SectionHeadingProps) {
  return (
    <ScrollReveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {channel ? (
        <p className="channel-tag mb-3">
          <span className="h-px w-4 bg-phosphor/40" aria-hidden="true" />
          {channel}
        </p>
      ) : null}
      <span className="eyebrow">
        <span className="h-px w-6 bg-phosphor/50" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-balance text-base leading-relaxed text-ink-muted">
          {description}
        </p>
      ) : null}
    </ScrollReveal>
  );
}
