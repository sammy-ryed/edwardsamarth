export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      {/* Heading with skewed accent bar */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-balance text-3xl font-extrabold tracking-tight md:text-4xl">
          About Me
        </h2>
        <div aria-hidden className="hidden h-2 w-24 -skew-x-12 bg-accent md:block" />
      </div>

      <p className="mt-4 max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
        I’m an aspiring Software Engineer with a special interest in Backend Development and Data Structures & Algorithms. My quirky sense of humor and creativity often seeps into my work, making it truly one of a kind. Whether it’s making APIs sing, persuading databases to behave, or gluing services together with a sprinkle of mischief, I build performant solutions that don’t just work - they delight. <br /><br />

        I’m always eager to learn new skills and take on projects that challenge me to grow. I enjoy working in Python and SQL, and I’m also proficient in Java and C, ready to tackle problems across multiple languages and paradigms.
        <br /><br />
        I aim to craft solutions that are not only efficient but also elegant, and I believe there’s always a smarter, funnier way to solve a problem.
      </p>
    </section>
  )
}
