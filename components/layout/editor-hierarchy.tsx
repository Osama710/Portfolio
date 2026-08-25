"use client";

import { ChevronDown, ChevronRight, File, FolderOpen } from "lucide-react";
import { useState } from "react";
import { editorSceneChildren } from "@/lib/editor-nav";
import { cn } from "@/lib/utils";

interface EditorHierarchyProps {
  activeSection: string;
  open: boolean;
  onNavigate: () => void;
}

export function EditorHierarchy({
  activeSection,
  open,
  onNavigate,
}: EditorHierarchyProps) {
  const [sceneExpanded, setSceneExpanded] = useState(true);

  function scrollToSection(href: string) {
    const viewport = document.getElementById("main-content");
    const target = viewport?.querySelector<HTMLElement>(href);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
    onNavigate();
  }

  const panel = (
    <aside className="editor-panel flex h-full w-56 shrink-0 flex-col border-r border-white/10 bg-surface">
      <div className="flex h-9 shrink-0 items-center border-b border-white/10 px-3">
        <span className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] text-ink-faint">
          Hierarchy
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto p-2" aria-label="Scene hierarchy">
        <button
          type="button"
          onClick={() => setSceneExpanded((value) => !value)}
          className="flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left font-mono text-xs text-ink-muted transition-colors hover:bg-white/[0.04] hover:text-ink"
        >
          {sceneExpanded ? (
            <ChevronDown className="h-3.5 w-3.5 shrink-0 text-ink-faint" aria-hidden="true" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-ink-faint" aria-hidden="true" />
          )}
          <FolderOpen className="h-3.5 w-3.5 shrink-0 text-editor-orange" aria-hidden="true" />
          <span>Scene</span>
        </button>

        {sceneExpanded ? (
          <ul className="mt-0.5 space-y-0.5 pl-4">
            {editorSceneChildren.map((node) => {
              const isActive = activeSection === node.href;
              return (
                <li key={node.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(node.href)}
                    className={cn(
                      "flex w-full items-center gap-1.5 rounded-md border-l-2 px-2 py-1.5 text-left font-mono text-xs transition-colors",
                      isActive
                        ? "border-editor-blue bg-editor-blue/10 text-editor-blue"
                        : "border-transparent text-ink-muted hover:bg-white/[0.04] hover:text-ink",
                    )}
                    aria-current={isActive ? "location" : undefined}
                  >
                    <File className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden="true" />
                    <span className="truncate">{node.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </nav>
    </aside>
  );

  return (
    <>
      <div className="hidden xl:block">{panel}</div>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/50 xl:hidden"
            aria-label="Close hierarchy panel"
            onClick={onNavigate}
          />
          <div className="fixed inset-y-12 left-0 z-50 w-56 xl:hidden">{panel}</div>
        </>
      ) : null}
    </>
  );
}
