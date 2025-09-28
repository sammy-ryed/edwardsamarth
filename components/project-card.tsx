import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Project = {
  name: string
  description: string
  tech: string
  github?: string
  demo?: string
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card
      className="group relative -rotate-1 border-border bg-card/80 transition-all duration-300 hover:-rotate-0 hover:shadow-[8px_8px_0px_0px_var(--color-accent)]"
      style={{ transformOrigin: "center" }}
    >
      <CardHeader>
        <CardTitle className="text-xl">
          <span className="relative">
            <span className="relative z-10">{project.name}</span>
            <span aria-hidden className="absolute -bottom-1 left-0 right-0 h-[6px] bg-accent/40" />
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{project.description}</p>
        <p className="text-xs">
          <span className="font-mono text-muted-foreground">Tech:</span>{" "}
          <span className="text-foreground">{project.tech}</span>
        </p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        {project.github && (
          <Button
            asChild
            variant="outline"
            className="group border-border bg-transparent hover:bg-accent hover:text-primary-foreground"
          >
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors group-hover:text-primary-foreground"
            >
              GitHub
            </a>
          </Button>
        )}
        {project.demo && (
          <Button className="bg-primary text-primary-foreground hover:opacity-90" asChild>
            <a href={project.demo} target="_blank" rel="noreferrer noopener">
              Live Demo
            </a>
          </Button>
        )}
      </CardFooter>
      <span aria-hidden className="pointer-events-none absolute -right-2 -top-2 h-3 w-3 rotate-45 bg-accent" />
    </Card>
  )
}
