import { profile } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-surface">
      <div className="mx-auto flex max-w-3xl flex-col gap-2 px-5 py-4 font-mono text-[0.62rem] text-ink-faint sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {year} {profile.name}
        </p>
        <p>
          Built with Next.js · {profile.location}
        </p>
      </div>
    </footer>
  );
}
