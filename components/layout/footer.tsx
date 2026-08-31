import { profile } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-surface/50">
      <div className="site-container flex flex-col items-center justify-between gap-4 py-10 sm:flex-row">
        <p className="text-sm text-ink-muted">
          © {year} {profile.name}. {profile.title}.
        </p>
        <p className="text-sm text-ink-faint">
          Karachi, Pakistan · Open to relocation
        </p>
      </div>
    </footer>
  );
}
