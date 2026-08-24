/**
 * Fixed full-viewport CRT scanline texture.
 * Layer order: Backdrop (-z-10) → ScanlineOverlay (z-[1]) → content (z-10).
 */
export function ScanlineOverlay() {
  return (
    <div
      className="crt-scanlines pointer-events-none fixed inset-0 z-[1]"
      aria-hidden="true"
    />
  );
}
