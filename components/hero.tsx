import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section id="home" className="relative mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-16 md:py-24">
      <div className="flex w-full flex-col items-center gap-6 text-center">
        <div className="space-y-3">
          <h1 className="text-balance font-sans text-4xl font-extrabold tracking-tight md:text-6xl">
            Samarth Ryan Edward
          </h1>
          <p className="text-pretty text-base text-muted-foreground md:text-lg">
            {"Backend dev who makes APIs sing and databases behave."}
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-2 -skew-x-3 -rotate-1 rounded-xl bg-accent/10" aria-hidden />
          <Image
            src="/images/pro.jpeg"
            alt="Samarth smiling, night portrait"
            width={320}
            height={320}
            className="relative z-10 rounded-xl border border-border object-cover"
            priority
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild className="group">
            <Link href="#projects">
              View Projects
              <span aria-hidden className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="group border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
          >
            <Link href="#contact">
              Contact Me
              <span aria-hidden className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">
                ✉
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
