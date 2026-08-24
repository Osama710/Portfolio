"use client";

import { BootSequence } from "@/components/ui/boot-sequence";
import { ChannelControl } from "@/components/ui/channel-control";
import { CrtOverlay } from "@/components/ui/crt-overlay";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <BootSequence />
      <CrtOverlay />
      <ChannelControl />
    </>
  );
}
