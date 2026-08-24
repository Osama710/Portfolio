/**
 * Step 2 — Console bezel framing.
 * Fixed decorative overlay (z-15): above content, below channel/boot chrome.
 * Corner brackets + edge tick marks; restrained, not a thick TV frame.
 */
export function ConsoleBezel() {
  return (
    <div
      className="console-bezel-frame pointer-events-none fixed inset-0 z-[15]"
      aria-hidden="true"
    >
      <span className="console-bezel-corner console-bezel-corner-tl" />
      <span className="console-bezel-corner console-bezel-corner-tr" />
      <span className="console-bezel-corner console-bezel-corner-bl" />
      <span className="console-bezel-corner console-bezel-corner-br" />

      <span className="console-bezel-ticks console-bezel-ticks-top" />
      <span className="console-bezel-ticks console-bezel-ticks-bottom" />
      <span className="console-bezel-ticks console-bezel-ticks-left" />
      <span className="console-bezel-ticks console-bezel-ticks-right" />

      <span className="console-bezel-inset" />
    </div>
  );
}
