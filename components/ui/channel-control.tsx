"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Radio } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import {
  channelMarker,
  channels,
  getChannelByHref,
  type Channel,
} from "@/lib/channels";
import { cn } from "@/lib/utils";

function scrollToChannel(channel: Channel) {
  const el = document.querySelector<HTMLElement>(channel.href);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function ChannelControl() {
  const shouldReduceMotion = useReducedMotion();
  const [activeHref, setActiveHref] = useState<string>("#hero");
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    function handleChange() {
      if (mq.matches) setCollapsed(false);
    }
    handleChange();
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const sections = channels
      .map((ch) => document.querySelector<HTMLElement>(ch.href))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const activeChannel = getChannelByHref(activeHref);
  const activeIndex = channels.findIndex((ch) => ch.href === activeHref);

  const goTo = useCallback((index: number) => {
    const channel = channels[index];
    if (channel) scrollToChannel(channel);
  }, []);

  const goPrev = useCallback(() => {
    const next = activeIndex <= 0 ? channels.length - 1 : activeIndex - 1;
    goTo(next);
  }, [activeIndex, goTo]);

  const goNext = useCallback(() => {
    const next = activeIndex >= channels.length - 1 ? 0 : activeIndex + 1;
    goTo(next);
  }, [activeIndex, goTo]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable
      ) {
        return;
      }

      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      } else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  return (
    <div
      className={cn(
        "channel-control fixed bottom-4 right-4 z-[70] sm:bottom-6 sm:right-6",
        collapsed && "channel-control-collapsed",
      )}
      role="group"
      aria-label="Section channel control"
    >
      <div className="channel-control-panel">
        <button
          type="button"
          onClick={() => setCollapsed((open) => !open)}
          className="channel-control-toggle sm:hidden"
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Expand channel control" : "Collapse channel control"}
        >
          <Radio className="h-3.5 w-3.5" aria-hidden="true" />
        </button>

        <div className={cn("channel-control-body", collapsed && "hidden sm:flex")}>
          <div className="channel-control-status">
            <span
              className={cn(
                "channel-signal-dot",
                !shouldReduceMotion && "channel-signal-dot-live",
              )}
              aria-hidden="true"
            />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-phosphor/60">
              Signal: strong
            </span>
          </div>

          <p className="channel-control-label" aria-live="polite">
            {channelMarker(activeChannel)}
          </p>
          <p className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-ink-faint">
            Now viewing
          </p>

          <div className="channel-control-buttons">
            <button
              type="button"
              onClick={goPrev}
              className="channel-control-btn"
              aria-label="Previous section"
            >
              <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <span className="font-mono text-[0.6rem] text-ink-faint">
              {activeChannel.number}/{channels.length.toString().padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={goNext}
              className="channel-control-btn"
              aria-label="Next section"
            >
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
