export function Backdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-void" />
      <div className="grid-mask absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="absolute -left-40 top-[-10%] h-[36rem] w-[36rem] rounded-full bg-glow-violet opacity-70 blur-3xl" />
      <div className="absolute -right-32 top-[18%] h-[30rem] w-[30rem] rounded-full bg-glow-cyan opacity-80 blur-3xl" />
      <div
        className="absolute bottom-[-15%] left-1/3 h-[28rem] w-[28rem] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(57,255,20,0.15), transparent 70%)",
        }}
      />
      <div className="noise-layer absolute inset-0 opacity-[0.04]" />
    </div>
  );
}
