import { ProjectCard } from "./project-card"

const projects = [
  {
    name: "MusAIc",
    description: "AI-powered music recommender detecting mood from text & facial expressions, plays Spotify songs.",
    tech: "FastAPI, Hugging Face GPT-2, OpenCV, Spotify API",
    github: "https://github.com/sammy-ryed/MusAIc---Feel-the-Music-of-Your-Mood",
    demo: "https://github.com/sammy-ryed/MusAIc---Feel-the-Music-of-Your-Mood/blob/main/README.md",
  },
  {
    name: "Bunker",
    description: "Apocalypse survival simulation with priority queues. Hosted on Vercel & Railway.",
    tech: "Next.js, FastAPI, MySQL, Vercel, Railway",
    github: "https://github.com/sammy-ryed/Bunker",
    demo: "https://bunker-five.vercel.app/",
  },
  {
    name: "Bhandi",
    description: "Flappy Bird–inspired browser game with custom physics & scoring.",
    tech: "JavaScript, HTML, CSS",
    github: "https://github.com/sammy-ryed/Bhandi",
    demo: "https://bhandi.vercel.app/",
  },
  {
    name: "endie",
    description: "Java GUI tool for encrypting/decrypting text. Beginner-friendly, cross-platform.",
    tech: "Java, Swing",
    github: "https://github.com/sammy-ryed/endie",
    demo: "https://github.com/sammy-ryed/endie/blob/main/README.md",
  },
  {
    name: "Indian Roulette",
    description: "Python “guess the number” game inspired by Roadmap.sh project ideas.",
    tech: "Python",
    github: "https://github.com/sammy-ryed/Indian-Roulette",
    demo: "https://github.com/sammy-ryed/Indian-Roulette/blob/main/README.md",
  },
] as const

export function ProjectsSection() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-balance text-3xl font-extrabold tracking-tight md:text-4xl">Featured Projects</h2>
        <div aria-hidden className="hidden h-2 w-24 -skew-x-12 bg-accent md:block" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </div>
    </section>
  )
}
