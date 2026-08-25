import { cn } from "@/lib/utils";

interface StatusDotProps {
  color?: "mint" | "blue" | "orange";
  className?: string;
}

const colorMap: Record<NonNullable<StatusDotProps["color"]>, string> = {
  mint: "bg-mint",
  blue: "bg-editor-blue",
  orange: "bg-editor-orange",
};

export function StatusDot({ color = "blue", className }: StatusDotProps) {
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
