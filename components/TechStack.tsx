"use client"

import { FC } from "react"

interface TechStackProps {
  title?: string
}

const techStack = [
  {
    category: "Languages",
    items: [
      "Python",
      "FastAPI",
      "SQL",
      "Java",
      "C",
      "C++",
    ],
  },
  {
    category: "Tools & Platforms",
    items: [
      "GitHub",
      "LeetCode",
      "Codeforces",
      "HackerRank",
      "Linux",
      "VS Code",
      "Spyder",
      "Code::Blocks",
    ],
  },
  {
    category: "Concepts",
    items: ["OOP", "DSA"],
  },
]

// Map items to URLs
const linkMap: Record<string, string> = {
  GitHub: "https://github.com/sammy-ryed",
  LeetCode: "https://leetcode.com/u/sammy_ryed/",
  Codeforces: "https://codeforces.com/profile/sammy_ryed",
  HackerRank: "https://www.hackerrank.com/profile/edwardsamarth",
}

export const TechStack: FC<TechStackProps> = ({ title = "Tech Stack" }) => {
  return (
    <section
      id="techstack"
      className="mx-auto max-w-6xl px-4 py-12 bg-background/80 backdrop-blur rounded-xl my-8"
    >
      {/* Heading with skewed accent bar */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-balance text-3xl font-extrabold tracking-tight md:text-4xl">
          {title}
        </h2>
        <div aria-hidden className="hidden h-2 w-24 -skew-x-12 bg-accent md:block" />
      </div>

      {/* Grid of categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {techStack.map((category) => (
          <div key={category.category} className="flex flex-col items-start">
            <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
            <ul className="flex flex-col gap-2">
              {category.items.map((item) => {
                const url = linkMap[item]
                return url ? (
                  <a
                    key={item}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 rounded-md transition-colors hover:bg-[#9580E0] text-[#8B71DE] md:text-white"
                  >
                    {item}
                  </a>
                ) : (
                  <li
                    key={item}
                    className="px-3 py-1 rounded-md transition-colors cursor-default hover:bg-[#9580E0]"
                  >
                    {item}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
