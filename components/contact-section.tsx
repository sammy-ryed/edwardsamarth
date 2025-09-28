"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

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

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="mb-6">
        <h2 className="text-balance text-3xl font-extrabold tracking-tight md:text-4xl">Get in Touch</h2>
        <p className="mt-2 text-muted-foreground">
          Email: {" "}
          <a
            href="mailto:edwardsamarth@gmail.com"
            className="underline decoration-accent underline-offset-4 hover:text-primary"
          >
            edwardsamarth@gmail.com
          </a>
        </p>
        <ul className="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
          <li>
            <Link
              className="hover:text-primary"
              href="https://www.linkedin.com/in/samarth-ryan-edward-a51047352/"
              target="_blank"
              rel="noreferrer noopener"
            >
              LinkedIn
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-primary"
              href="https://github.com/sammy-ryed"
              target="_blank"
              rel="noreferrer noopener"
            >
              GitHub
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-primary"
              href="https://leetcode.com/u/sammy_ryed/"
              target="_blank"
              rel="noreferrer noopener"
            >
              LeetCode
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-primary"
              href="https://www.hackerrank.com/profile/edwardsamarth"
              target="_blank"
              rel="noreferrer noopener"
            >
              HackerRank
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-primary"
              href="https://codeforces.com/profile/sammy_ryed"
              target="_blank"
              rel="noreferrer noopener"
            >
              Codeforces
            </Link>
          </li>
        </ul>
      </div>

      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 gap-4 rounded-lg border border-border bg-card/70 p-4 md:grid-cols-2 md:p-6"
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
            placeholder="Tell me about your project..."
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
