"use client";

import { Download, Github, Linkedin, Menu, PanelRight } from "lucide-react";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";

interface EditorTopBarProps {
  onToggleHierarchy: () => void;
  onToggleInspector: () => void;
  hierarchyOpen: boolean;
  inspectorOpen: boolean;
}

export function EditorTopBar({
  onToggleHierarchy,
  onToggleInspector,
  hierarchyOpen,
  inspectorOpen,
}: EditorTopBarProps) {
  return (
    <header className="editor-top-bar z-50 flex h-12 shrink-0 items-center justify-between border-b border-white/10 bg-surface px-3 sm:px-4">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onToggleHierarchy}
          className={cn(
            "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 text-ink-muted transition-colors hover:border-editor-blue/40 hover:text-editor-blue xl:hidden",
            hierarchyOpen && "border-editor-blue/50 bg-editor-blue/10 text-editor-blue",
          )}
          aria-label={hierarchyOpen ? "Close hierarchy panel" : "Open hierarchy panel"}
          aria-expanded={hierarchyOpen}
        >
          <Menu className="h-4 w-4" aria-hidden="true" />
        </button>

        <a href="#hero" className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-editor-blue/30 bg-editor-blue/10 font-mono text-[0.6rem] font-medium text-editor-blue">
            {profile.initials}
          </span>
          <span className="hidden min-w-0 flex-col sm:flex">
            <span className="truncate font-display text-sm font-semibold leading-tight text-ink">
              {profile.name}
            </span>
            <span className="truncate font-mono text-[0.58rem] text-ink-faint">
              {profile.title}
            </span>
          </span>
        </a>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer noopener"
          className="hidden h-8 w-8 items-center justify-center rounded-md border border-transparent text-ink-muted transition-colors hover:border-white/10 hover:text-ink sm:inline-flex"
          aria-label="GitHub"
        >
          <Github className="h-4 w-4" aria-hidden="true" />
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer noopener"
          className="hidden h-8 w-8 items-center justify-center rounded-md border border-transparent text-ink-muted transition-colors hover:border-white/10 hover:text-ink sm:inline-flex"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-4 w-4" aria-hidden="true" />
        </a>

        <a
          href="#projects"
          className="inline-flex items-center gap-1.5 rounded-md border border-editor-blue/40 bg-editor-blue/15 px-2.5 py-1.5 font-mono text-xs font-medium text-editor-blue transition-colors hover:bg-editor-blue/25 sm:px-3"
        >
          <span aria-hidden="true">▶</span>
          Run
        </a>

        <a
          href={profile.resumeFile}
          download
          className="hidden items-center gap-1.5 rounded-md border border-white/10 bg-surface-2 px-3 py-1.5 font-mono text-xs text-ink-muted transition-colors hover:border-editor-orange/40 hover:text-ink sm:inline-flex"
        >
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          Resume
        </a>

        <button
          type="button"
          onClick={onToggleInspector}
          className={cn(
            "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 text-ink-muted transition-colors hover:border-editor-blue/40 hover:text-editor-blue xl:hidden",
            inspectorOpen && "border-editor-blue/50 bg-editor-blue/10 text-editor-blue",
          )}
          aria-label={inspectorOpen ? "Close inspector panel" : "Open inspector panel"}
          aria-expanded={inspectorOpen}
        >
          <PanelRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
