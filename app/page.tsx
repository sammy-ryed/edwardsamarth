import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { ProjectsSection } from "@/components/projects-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"


export default function Page() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:bg-primary focus:text-primary-foreground focus:px-3 focus:py-2 focus:rounded-md"
      >
        Skip to Projects
      </a>
      <SiteHeader />
      <Hero />
      <ProjectsSection />
      
      <AboutSection />
      <ContactSection />
      <footer className="border-t border-border py-8 text-right text-sm px-4 md:px-8">
        <p className="text-muted-foreground">
          {/* © {new Date().getFullYear()} Samarth Ryan Edward. All rights reserved. */}
          Poopy Pants
          </p>
      </footer>
    </main>
  )
}
