"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, FileText } from "lucide-react"

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#techstack", label: "Tech Stack" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [active, setActive] = useState("#home") // Track active section

  const highlightColor = "#8B71DE" // header text & hover color

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY
          const goingDown = y > lastY
          setHidden(y >= 64 && goingDown)
          lastY = y
          ticking = false

          // Update active section safely
          const scrollPos = window.scrollY + 100 // offset for sticky header
          for (let i = navItems.length - 1; i >= 0; i--) {
            const sec = document.querySelector(navItems[i].href)
            if (sec instanceof HTMLElement && scrollPos >= sec.offsetTop) {
              setActive(navItems[i].href)
              break
            }
          }
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-300 will-change-transform ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="grid grid-cols-3 items-center px-4 py-3 md:py-4">
        {/* Left side - GitHub + LinkedIn + Resume */}
        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/sammy-ryed"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="p-1"
          >
            <Github className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
            <span className="sr-only">GitHub</span>
          </Link>

          <Link
            href="https://www.linkedin.com/in/samarth-ryan-edward-a51047352/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
            className="p-1"
          >
            <Linkedin className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
            <span className="sr-only">LinkedIn</span>
          </Link>

          {/* Desktop Resume Button */}
          <Link
            href="/Samarth Ryan Edward CV.pdf"
            download
            aria-label="Download Resume"
            className="hidden md:flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground border border-border bg-transparent transition-colors"
            style={{ transition: "background-color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = highlightColor)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <FileText className="h-5 w-5 text-white" />
            <span style={{ color: "white" }}>Resume</span>
          </Link>
        </div>

        {/* Center - SRE text */}
        <div className="flex justify-center">
          <span className="text-3xl md:text-3xl font-extrabold" style={{ color: highlightColor }}>
            ;)
          </span>
        </div>

        {/* Right - Desktop nav + mobile menu */}
        <div className="flex justify-end items-center gap-2">
          <nav aria-label="Primary" className="hidden gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active === item.href ? "text-primary" : "text-foreground"
                } hover:text-primary`}
              >
                <span className="relative z-10">{item.label}</span>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-2 bottom-1 h-[2px] scale-x-0 transform bg-accent transition-transform duration-300 group-hover:scale-x-100"
                />
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="outline"
            className="md:hidden bg-transparent"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
          >
            Menu
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div id="mobile-nav" className="border-t border-border md:hidden">
          <div className="flex flex-col px-4 py-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-3 transition-colors ${
                  active === item.href ? "text-primary" : "text-foreground"
                } hover:bg-muted hover:text-foreground`}
              >
                {item.label}
              </Link>
            ))}
            {/* Mobile Resume link */}
            <Link
              href="/Samarth Ryan Edward CV.pdf"
              download
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              Resume
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
