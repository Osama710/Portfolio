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
        "inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[0.7rem] text-ink-muted transition-colors",
        className,
      )}
    >
      {children}
    </span>
  );
}
