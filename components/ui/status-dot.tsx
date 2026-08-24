import { cn } from "@/lib/utils";

interface StatusDotProps {
  color?: "mint" | "cyan" | "violet";
  className?: string;
}

const colorMap: Record<NonNullable<StatusDotProps["color"]>, string> = {
  mint: "bg-mint",
  cyan: "bg-cyan",
  violet: "bg-violet",
};

export function StatusDot({ color = "mint", className }: StatusDotProps) {
  return (
    <span className={cn("relative flex h-2 w-2", className)}>
      <span
        className={cn(
          "absolute inline-flex h-full w-full animate-ping rounded-full opacity-60",
          colorMap[color],
        )}
      />
      <span
        className={cn(
          "relative inline-flex h-2 w-2 rounded-full",
          colorMap[color],
        )}
      />
    </span>
  );
}
