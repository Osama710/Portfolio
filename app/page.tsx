import { Backdrop } from "@/components/ui/backdrop";
import { ScanlineOverlay } from "@/components/ui/scanline-overlay";
import { ConsoleBezel } from "@/components/ui/console-bezel";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SiteChrome } from "@/components/layout/site-chrome";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <SiteChrome>
      <Backdrop />
      <ScanlineOverlay />
      <ConsoleBezel />
      <div className="relative z-10">
        <Navbar />
        <main id="main-content">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </SiteChrome>
  );
}
