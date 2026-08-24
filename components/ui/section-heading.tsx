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
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {channel ? (
        <p
          className={cn(
            "channel-tag mb-3",
            align === "center" && "justify-center",
          )}
        >
          <span className="h-px w-4 bg-phosphor/40" aria-hidden="true" />
          {channel}
        </p>
      ) : null}
      <span
        className={cn("eyebrow", align === "center" && "justify-center")}
      >
        <span className="h-px w-6 bg-phosphor/50" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 className="section-display mt-5">{title}</h2>
      {description ? (
        <p className="mt-5 text-balance text-base leading-relaxed text-ink-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </ScrollReveal>
  );
}
