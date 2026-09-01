import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({ label, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("section-heading-block max-w-2xl text-left", className)}>
      <span className="section-label">
        <span className="section-label-dot" aria-hidden="true" />
        {label}
      </span>
      <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl lg:leading-[1.12]">
        <span className="gradient-text-shimmer">{title}</span>
      </h2>
      {description ? (
        <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-base">{description}</p>
      ) : null}
    </div>
  );
}
