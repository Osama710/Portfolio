import { cn } from "@/lib/utils";

export function TechPill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[0.7rem] font-medium text-ink-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
