"use client";

import { heroStats, profile } from "@/lib/data";
import { getEditorNodeLabel } from "@/lib/editor-nav";
import { StatusDot } from "@/components/ui/status-dot";

interface EditorInspectorProps {
  activeSection: string;
  open: boolean;
  onClose: () => void;
}

const inspectorRows = [
  { label: "Name", value: profile.name },
  { label: "Role", value: profile.title },
  { label: "Location", value: profile.location },
  {
    label: "Experience",
    value: `${heroStats[0]?.value}${heroStats[0]?.suffix ?? ""} years`,
  },
  { label: "Focus", value: "Fintech · Full Stack Web" },
];

export function EditorInspector({
  activeSection,
  open,
  onClose,
}: EditorInspectorProps) {
  const panel = (
    <aside className="editor-panel flex h-full w-64 shrink-0 flex-col border-l border-white/10 bg-surface">
      <div className="flex h-9 shrink-0 items-center border-b border-white/10 px-3">
        <span className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] text-ink-faint">
          Inspector
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-faint">
          Transform
        </p>
        <div className="mt-2 space-y-0.5">
          {inspectorRows.map((row) => (
            <div
              key={row.label}
              className="inspector-row flex items-start justify-between gap-3 rounded px-2 py-1.5"
            >
              <span className="shrink-0 font-mono text-[0.65rem] text-ink-faint">
                {row.label}
              </span>
              <span className="text-right font-mono text-[0.65rem] leading-snug text-ink">
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <div className="my-3 h-px bg-white/10" />

        <p className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-faint">
          Scene
        </p>
        <div className="mt-2 space-y-0.5">
          <div className="inspector-row flex items-start justify-between gap-3 rounded px-2 py-1.5">
            <span className="shrink-0 font-mono text-[0.65rem] text-ink-faint">
              Active Node
            </span>
            <span className="text-right font-mono text-[0.65rem] text-editor-blue">
              {getEditorNodeLabel(activeSection)}
            </span>
          </div>
          <div className="inspector-row flex items-center justify-between gap-3 rounded px-2 py-1.5">
            <span className="font-mono text-[0.65rem] text-ink-faint">Status</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] text-mint">
              <StatusDot color="mint" className="scale-75" />
              Available
            </span>
          </div>
        </div>
      </div>
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
            aria-label="Close inspector panel"
            onClick={onClose}
          />
          <div className="fixed inset-y-12 right-0 z-50 w-64 xl:hidden">{panel}</div>
        </>
      ) : null}
    </>
  );
}
