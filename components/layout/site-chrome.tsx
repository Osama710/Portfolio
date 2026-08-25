"use client";

import { BootSequence } from "@/components/ui/boot-sequence";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <BootSequence />
    </>
  );
}
