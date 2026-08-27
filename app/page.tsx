import { SiteLayout } from "@/components/layout/site-layout";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Capabilities } from "@/components/sections/capabilities";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <SiteLayout>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Capabilities />
      <Education />
      <Contact />
    </SiteLayout>
  );
}
