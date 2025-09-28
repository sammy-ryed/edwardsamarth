"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

// List of fun placeholder questions
const funQuestions = [
  "What's the most random skill you’ve secretly mastered?",
  "If your project had a theme song, what would it be?",
  "Tell me about the weirdest bug you’ve ever fixed.",
  "Coffee or Tea — what fuels your coding?",
  "If you could code in any universe, which one would it be?",
  "What’s a small thing that made your day awesome recently?",
  "If your computer could talk, what would it say about you?",
  "What's a challenge you wish I could help you solve?",
  "Which emoji describes your current mood?",
  "Pineapple on pizza: yes or no?",
  "What's a skill you wish everyone had?",
  "If you had one superpower while coding, what would it be?",
  "Name one app you couldn’t live without.",
  "Tell me your dream project in 3 words.",
  "What's the weirdest error message you’ve ever seen?",
  "If you could code for any fictional company, which one?",
  "What's your go-to productivity hack?",
  "Share a coding joke that always makes you laugh.",
  "If you could automate one daily task, what would it be?",
  "What's your favorite programming snack?",
  "Tell me about a small win you’re proud of.",
  "Which programming language would you marry (if you could)?",
  "Describe your coding style in one word.",
  "Cats or dogs - who’s better at debugging?",
  "What’s a tech trend you’re secretly excited about?",
  "If your life was a repo, what would its README say?",
  "Name one dream collaboration project you’d like to do.",
  "What's a tool or library you think everyone should know?",
  "Share a one-line life hack that’s pure gold.",
  "If your keyboard could speak, what would it confess?",
  "What made you smile today?",
  "Tell me something intersting",
  
]

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  // Pick a random question once on component mount
  const [placeholder] = useState(
    funQuestions[Math.floor(Math.random() * funQuestions.length)]
  )

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setError(null)
    const form = e.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Request failed")
      setStatus("success")
      form.reset()
    } catch (err: any) {
      setStatus("error")
      setError("Something went wrong. Please try again.")
    }
  }

  const accentLinkClasses =
    "underline decoration-accent underline-offset-4 hover:text-primary transition-colors"

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      {/* Heading with skewed accent bar */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-balance text-3xl font-extrabold tracking-tight md:text-4xl">
          Get in Touch
        </h2>
        <div aria-hidden className="hidden h-2 w-24 -skew-x-12 bg-accent md:block" />
      </div>

      <p className="mt-2 text-muted-foreground">
        Email:{" "}
        <a href="mailto:edwardsamarth@gmail.com" className={accentLinkClasses}>
          edwardsamarth@gmail.com
        </a>
      </p>

      <ul className="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
        <li>
          <Link className={accentLinkClasses} href="https://www.linkedin.com/in/samarth-ryan-edward-a51047352/" target="_blank" rel="noreferrer noopener">
            LinkedIn
          </Link>
        </li>
        <li>
          <Link className={accentLinkClasses} href="https://github.com/sammy-ryed" target="_blank" rel="noreferrer noopener">
            GitHub
          </Link>
        </li>
        <li>
          <Link className={accentLinkClasses} href="https://leetcode.com/u/sammy_ryed/" target="_blank" rel="noreferrer noopener">
            LeetCode
          </Link>
        </li>
        <li>
          <Link className={accentLinkClasses} href="https://www.hackerrank.com/profile/edwardsamarth" target="_blank" rel="noreferrer noopener">
            HackerRank
          </Link>
        </li>
        <li>
          <Link className={accentLinkClasses} href="https://codeforces.com/profile/sammy_ryed" target="_blank" rel="noreferrer noopener">
            Codeforces
          </Link>
        </li>
      </ul>

      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 gap-4 rounded-lg border border-border bg-card/70 p-4 md:grid-cols-2 md:p-6 mt-6"
      >
        <div className="col-span-1">
          <label htmlFor="name" className="mb-1 block text-sm text-muted-foreground">
            Name
          </label>
          <Input id="name" name="name" required placeholder="Your name" />
        </div>
        <div className="col-span-1">
          <label htmlFor="email" className="mb-1 block text-sm text-muted-foreground">
            Email
          </label>
          <Input id="email" name="email" type="email" required placeholder="you@example.com" />
        </div>
        <div className="col-span-1 md:col-span-2">
          <label htmlFor="message" className="mb-1 block text-sm text-muted-foreground">
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            required
            placeholder={placeholder} // <-- Random fun question here
            className="min-h-32"
          />
        </div>
        <div className="col-span-1 md:col-span-2 flex items-center gap-3">
          <Button
            disabled={status === "loading"}
            type="submit"
            className="bg-primary text-primary-foreground hover:opacity-90"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </Button>
          {status === "success" && (
            <p role="status" className="text-sm text-accent">
              Thanks! I’ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="text-sm text-destructive">
              {error || "An error occurred."}
            </p>
          )}
        </div>
      </form>
    </section>
  )
}
