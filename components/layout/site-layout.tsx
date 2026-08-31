import { AmbientBackground } from "@/components/ui/ambient-background";
import { GsapRoot } from "@/components/gsap/gsap-root";
import { SmoothScroll } from "@/components/gsap/smooth-scroll";
import { ScrollChapters } from "@/components/ui/scroll-chapters";
import { SiteNav } from "@/components/layout/site-nav";
import { Footer } from "@/components/layout/footer";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <GsapRoot />
      <SmoothScroll />
      <AmbientBackground />
      <SiteNav />
      <ScrollChapters />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
