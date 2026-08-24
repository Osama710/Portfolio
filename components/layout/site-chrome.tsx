"use client";

import { BootSequence } from "@/components/ui/boot-sequence";
import { ChannelControl } from "@/components/ui/channel-control";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <BootSequence />
      <ChannelControl />
    </>
  );
}
