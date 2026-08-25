"use client";

import { useEffect, useState } from "react";
import { editorSceneChildren } from "@/lib/editor-nav";
import { EditorHierarchy } from "@/components/layout/editor-hierarchy";
import { EditorInspector } from "@/components/layout/editor-inspector";
import { EditorTopBar } from "@/components/layout/editor-top-bar";

export function EditorShell({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState("#hero");
  const [hierarchyOpen, setHierarchyOpen] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(false);

  useEffect(() => {
    const viewport = document.getElementById("main-content");
    if (!viewport) return;

    const sections = editorSceneChildren
      .map((node) => viewport.querySelector<HTMLElement>(node.href))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        root: viewport,
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (hierarchyOpen || inspectorOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [hierarchyOpen, inspectorOpen]);

  return (
    <div className="editor-shell flex h-[100dvh] flex-col bg-void">
      <EditorTopBar
        onToggleHierarchy={() => {
          setHierarchyOpen((open) => !open);
          setInspectorOpen(false);
        }}
        onToggleInspector={() => {
          setInspectorOpen((open) => !open);
          setHierarchyOpen(false);
        }}
        hierarchyOpen={hierarchyOpen}
        inspectorOpen={inspectorOpen}
      />

      <div className="relative flex min-h-0 flex-1">
        <EditorHierarchy
          activeSection={activeSection}
          open={hierarchyOpen}
          onNavigate={() => setHierarchyOpen(false)}
        />

        <main
          id="main-content"
          className="editor-viewport min-w-0 flex-1 overflow-y-auto overscroll-contain"
        >
          {children}
        </main>

        <EditorInspector
          activeSection={activeSection}
          open={inspectorOpen}
          onClose={() => setInspectorOpen(false)}
        />
      </div>
    </div>
  );
}
