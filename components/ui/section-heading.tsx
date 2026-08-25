import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
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
      <span className={cn("section-label", align === "center" && "justify-center")}>
        <span className="section-label-dot" aria-hidden="true" />
        {label}
      </span>
      <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        <span className="gradient-text">{title}</span>
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </ScrollReveal>
  );
}
