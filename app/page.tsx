"use client"

import { useEffect } from "react"

export default function Page() {
  useEffect(() => {
    const cur = document.getElementById('cur')
    document.addEventListener('mousemove', (e) => {
      if (cur) {
        cur.style.left = e.clientX + 'px'
        cur.style.top = e.clientY + 'px'
      }
    })

    // Today's date in masthead
    const dateEl = document.getElementById('today-date')
    if (dateEl) {
      dateEl.textContent = new Date().toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).toUpperCase()
    }

    // Click name to scramble
    const nameEl = document.getElementById('scramble-name')
    const originalHTML = nameEl?.innerHTML
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&!?'
    nameEl?.addEventListener('click', () => {
      if (!nameEl || !originalHTML) return
      // Lock height before animation to prevent layout shift
      nameEl.style.height = nameEl.offsetHeight + 'px'
      let i = 0
      const original = 'SAMARTH RYAN EDWARD'
      const iv = setInterval(() => {
        if (i >= 14) {
          nameEl.innerHTML = originalHTML
          nameEl.style.height = ''
          clearInterval(iv)
          return
        }
        nameEl.textContent = original.split('').map(c =>
          c === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]
        ).join('')
        i++
      }, 55)
    })
  }, [])

  return (
    <>
      <div id="cur"></div>

      {/* MASTHEAD */}
      <div className="masthead">
        <div className="masthead-top">
          <span>EST. 2006 · AGRA/CHENGALPATTU, INDIA</span>
          <span id="today-date" style={{ opacity: .5 }}></span>
          <span className="masthead-edition">PORTFOLIO GAZETTE · VOL. II</span>
        </div>
        <div className="masthead-name" id="scramble-name" title="Click me">
          <span className="overprint" data-shadow="SAMARTH">SAMARTH</span>{' '}<span className="italic-bit">RYAN</span>&thinsp;EDWARD
        </div>
        <div className="masthead-sub">
          <span className="masthead-tagline">&quot;average at everything he does :D&quot;</span>
          <span>BUILDER · AI · FULLSTACK · GAMES · TOOLS · DSA · MISCHIEF</span>
          <div className="masthead-links">
            <a href="https://github.com/sammy-ryed" target="_blank">GitHub</a>
            <a href="https://www.linkedin.com/in/samarth-ryan-edward-a51047352/" target="_blank">LinkedIn</a>
            <a href="https://instagram.com/sammy_ryed" target="_blank">Instagram</a>
            <a href="/Samarth Ryan Edward CV.pdf" target="_blank">Résumé</a>
          </div>
        </div>
      </div>

      {/* YELLOW BANNER */}
      <div className="yellow-banner">
        <div className="banner-label">Breaking</div>
        <div className="banner-scroll">
          <div className="banner-track">
            <span>LOCAL DEV WRITES BACKEND CODE THAT ACTUALLY WORKS</span>
            <span>BUNKER PROJECT RAISES QUESTIONS ABOUT APOCALYPSE PREPAREDNESS</span>
            <span>MUSAIC APP DETECTS MOOD — USERS REPORT CRYING</span>
            <span>BHANDI GAME CAUSES PRODUCTIVITY LOSS ACROSS ENTIRE OFFICE</span>
            <span>SAMARTH RYAN EDWARD DESCRIBES HIMSELF AS &quot;AVERAGE&quot; IN UNPRECEDENTED ACT OF HONESTY</span>
            <span>LOCAL DEV WRITES BACKEND CODE THAT ACTUALLY WORKS</span>
            <span>BUNKER PROJECT RAISES QUESTIONS ABOUT APOCALYPSE PREPAREDNESS</span>
            <span>MUSAIC APP DETECTS MOOD — USERS REPORT CRYING</span>
            <span>BHANDI GAME CAUSES PRODUCTIVITY LOSS ACROSS ENTIRE OFFICE</span>
            <span>SAMARTH RYAN EDWARD DESCRIBES HIMSELF AS &quot;AVERAGE&quot; IN UNPRECEDENTED ACT OF HONESTY</span>
          </div>
        </div>
        <div className="stamp">Open to Work</div>
      </div>

      {/* FRONT PAGE — 3 COLS */}
      <div className="broadsheet">
        {/* LEFT */}
        <div className="col" style={{ paddingTop: '2rem' }}>
          <div className="headline-l">BUILDER.<br />NOT<br /><em>JUST</em><br />BACKEND.<br />FRONTEND.<br /><em>AI.</em><br />EVERYTHING.</div>
          <div className="byline"><span>By Samarth R. Edward</span><span>Staff Reporter</span></div>
          <div className="body">
            <p>Sources confirmed Thursday that local developer Samarth Ryan Edward has been building AI tools, fullstack platforms, desktop apps, browser games, productivity systems, and simulators — sometimes all in the same semester.</p>
            <p>&quot;I don&apos;t want to do one thing,&quot; Edward reportedly said. &quot;I want to do everything.&quot; Nobody in the room disagreed.</p>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ fontSize: '0.6rem', letterSpacing: '.1em', textTransform: 'uppercase', opacity: 0.4, marginBottom: '.4rem', fontFamily: 'var(--font-mono)' }}>Status Board</div>
            <div className="stack-row">
              <div className="stack-box"><div className="sk-label">Location</div><div className="sk-val" style={{ fontSize: '1rem' }}>India 🇮🇳</div></div>
              <div className="stack-box"><div className="sk-label">Status</div><div className="sk-val" style={{ fontSize: '.9rem', color: 'var(--red)' }}>Hiring?</div></div>
            </div>
            <div className="stack-row">
              <div className="stack-box"><div className="sk-label">Specialty</div><div className="sk-val" style={{ fontSize: '.95rem' }}>Backend</div></div>
              <div className="stack-box"><div className="sk-label">Obsession</div><div className="sk-val" style={{ fontSize: '.95rem' }}>DSA</div></div>
            </div>
          </div>
          <div className="vert-ticker">
            <div className="vert-ticker-inner">&quot;Making APIs sing, databases behave, services stick together with sprinkles of mischief.&quot;</div>
          </div>
        </div>

        <div className="col-divider"></div>

        {/* CENTRE */}
        <div className="col">
          <div className="headline-xl">LOCAL<br />DEV<br /><em>BUILDS</em><br />8+ THINGS<br />THAT<br />WORK.</div>
          <div className="byline"><span>Projects Desk</span><span>Full coverage below</span></div>
          <div className="pullquote">
            <p>&quot;I want to do everything. AI. Fullstack. Games. Tools. All of it.&quot;</p>
            <cite>— S.R. Edward, personal statement</cite>
          </div>
          <div className="body">
            <figure className="img-float">
              <img src="/images/pro.jpeg" alt="Samarth Ryan Edward" className="img-portrait" />
              <figcaption>The developer, Tamil Nadu, 2025.</figcaption>
            </figure>
            <p>Developer known online as <span className="hl">sammy_ryed</span> has produced a catalogue that refuses to stay in one lane: AI mood detection, apocalypse simulators, browser games, CPU schedulers, translation desktops, roommate finders, productivity systems, and logic simulators.</p>
            <p>The projects include <span className="annotation" data-note="mood detection + Spotify">MusAIc</span>, <span className="annotation" data-note="apocalypse sim, priority queues">Bunker</span>, <span className="annotation" data-note="flappy bird. yes really.">Bhandi</span>, <span className="annotation" data-note="CPU scheduling visualiser">BurstTime Chronicles</span>, and <span className="annotation" data-note="Hinge-style roommate finder for SRM">FlatMate</span>. Each one a different genre. Same unhinged energy throughout.</p>
          </div>
        </div>

        <div className="col-divider"></div>

        {/* RIGHT */}
        <div className="col" style={{ paddingTop: '2rem' }}>
          <div className="headline-m" style={{ marginBottom: '.6rem' }}>LANGUAGES SPOKEN:</div>
          <div className="stack-row">
            <div className="stack-box"><div className="sk-label">AI / ML</div><div className="sk-val">Python</div></div>
            <div className="stack-box"><div className="sk-label">Fullstack</div><div className="sk-val">Next.js</div></div>
          </div>
          <div className="stack-row">
            <div className="stack-box"><div className="sk-label">Backend</div><div className="sk-val">FastAPI</div></div>
            <div className="stack-box"><div className="sk-label">Database</div><div className="sk-val">MySQL</div></div>
          </div>
          <div className="stack-row">
            <div className="stack-box"><div className="sk-label">Desktop</div><div className="sk-val">Java</div></div>
            <div className="stack-box"><div className="sk-label">Systems</div><div className="sk-val">C / C++</div></div>
          </div>
          <div className="stack-row">
            <div className="stack-box"><div className="sk-label">Frontend</div><div className="sk-val">HTML/JS</div></div>
            <div className="stack-box"><div className="sk-label">OS</div><div className="sk-val">Linux</div></div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--grey)', margin: '1.25rem 0' }} />
          <div className="headline-m" style={{ marginBottom: '.6rem' }}>COMPETITIVE RECORD</div>
          <div className="body" style={{ marginBottom: '.75rem' }}><p>Active competitor on LeetCode, Codeforces, HackerRank — platforms where devs voluntarily give themselves headaches for sport.</p></div>
          <a href="https://leetcode.com/u/sammy_ryed/" target="_blank" style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '.7rem', color: 'var(--blue)', textDecoration: 'none', padding: '.4rem 0', borderBottom: '1px solid var(--grey)' }}>LeetCode<span>↗</span></a>
          <a href="https://codeforces.com/profile/sammy_ryed" target="_blank" style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '.7rem', color: 'var(--blue)', textDecoration: 'none', padding: '.4rem 0', borderBottom: '1px solid var(--grey)' }}>Codeforces<span>↗</span></a>
          <a href="https://www.hackerrank.com/profile/edwardsamarth" target="_blank" style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '.7rem', color: 'var(--blue)', textDecoration: 'none', padding: '.4rem 0', borderBottom: '1px solid var(--grey)' }}>HackerRank<span>↗</span></a>

          <div style={{ marginTop: '1.25rem', background: 'var(--ink)', color: 'var(--paper)', padding: '1.2rem', fontFamily: 'var(--font-mono)', fontSize: '.7rem', lineHeight: 1.7 }}>
            <div style={{ fontSize: '.58rem', letterSpacing: '.1em', textTransform: 'uppercase', opacity: 0.4, marginBottom: '.4rem' }}>Editor&apos;s Note</div>
            &quot;He says he&apos;s average. His projects say otherwise. We&apos;re not sure who to believe.&quot;<br />
            <span style={{ opacity: .4, fontSize: '.62rem' }}>— The Board</span>
          </div>
        </div>
      </div>

      {/* PROJECTS SECTION */}
      <hr className="section-rule" />
      <div className="section-head">
        <span>Projects · Full Report</span>
        <span>All works verified by the dev himself</span>
      </div>
      <div className="proj-wrap">
        <table className="proj-table">
          <thead>
            <tr>
              <th style={{ width: '4%' }}>#</th>
              <th style={{ width: '14%' }}>Project</th>
              <th style={{ width: '35%' }}>What the hell is it</th>
              <th style={{ width: '28%' }}>Technologies</th>
              <th style={{ width: '9%' }}>Status</th>
              <th style={{ width: '10%' }}>Links</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ opacity: .4, fontFamily: 'var(--font-mono)' }}>001</td>
              <td><div className="proj-name"><em>FlatMate</em></div></td>
              <td>Hinge-style roommate finder for SRM KTR students. Swipe on personality, not just faces. Fullstack, real auth, real database.</td>
              <td>Next.js · TypeScript · MySQL · NextAuth · Tailwind</td>
              <td><span className="status status-stable">Private</span></td>
              <td><span style={{ opacity: .3, fontSize: '.65rem' }}>Private repo</span></td>
            </tr>
            <tr>
              <td style={{ opacity: .4, fontFamily: 'var(--font-mono)' }}>002</td>
              <td><div className="proj-name"><em>The Woven Guild</em></div></td>
              <td>Built a website for a friend&apos;s creative community. Guild missions, roster, and activities. The work reflects the name.</td>
              <td>Next.js · Tailwind · Vercel</td>
              <td><span className="status status-live">Live</span></td>
              <td><a href="https://thewovenguild.space" target="_blank">Live ↗</a> &nbsp;<a href="https://thewovenguild.space/about" target="_blank">About ↗</a></td>
            </tr>
            <tr>
              <td style={{ opacity: .4, fontFamily: 'var(--font-mono)' }}>003</td>
              <td><div className="proj-name"><em>Here!</em></div></td>
              <td>AI-powered face recognition attendance system. Point a camera at a classroom of 40+ students, get attendance marked in seconds. RetinaFace detects, Facenet512 recognises, nobody signs a register.</td>
              <td>Next.js · TypeScript · Python · Flask · RetinaFace · SQLite</td>
              <td><span className="status status-live">Live</span></td>
              <td><a href="https://github.com/sammy-ryed/Here-" target="_blank">GitHub ↗</a></td>
            </tr>
            <tr>
              <td style={{ opacity: .4, fontFamily: 'var(--font-mono)' }}>004</td>
              <td><div className="proj-name"><em>MusAIc</em></div></td>
              <td>AI reads your mood from face + text, plays a Spotify track at you. Invasive. Accurate. Weirdly touching.</td>
              <td>FastAPI · HuggingFace GPT-2 · OpenCV · Spotify API</td>
              <td><span className="status status-live">Live</span></td>
              <td><a href="https://github.com/sammy-ryed/MusAIc---Feel-the-Music-of-Your-Mood" target="_blank">GitHub ↗</a></td>
            </tr>
            <tr>
              <td style={{ opacity: .4, fontFamily: 'var(--font-mono)' }}>005</td>
              <td><div className="proj-name" style={{ color: 'var(--red)' }}>FlowState</div></td>
              <td>Anti-overwhelm productivity system. Break tasks into steps, run focus sprints, build streaks. Protects your dopamine.</td>
              <td>HTML · CSS · JavaScript</td>
              <td><span className="status status-live">Live</span></td>
              <td><a href="https://github.com/sammy-ryed/FlowState" target="_blank">GitHub ↗</a></td>
            </tr>
            <tr>
              <td style={{ opacity: .4, fontFamily: 'var(--font-mono)' }}>006</td>
              <td><div className="proj-name"><em>Bhandi</em></div></td>
              <td>Flappy Bird in a browser, from scratch. Named with zero explanation. Physics included. Dignity optional.</td>
              <td>JavaScript · HTML · CSS</td>
              <td><span className="status status-live">Live</span></td>
              <td><a href="https://bhandi.vercel.app/" target="_blank">Play ↗</a> &nbsp;<a href="https://github.com/sammy-ryed/Bhandi" target="_blank">GitHub ↗</a></td>
            </tr>
            <tr>
              <td style={{ opacity: .4, fontFamily: 'var(--font-mono)' }}>007</td>
              <td><div className="proj-name" style={{ color: 'var(--red)' }}>Bunker</div></td>
              <td>Apocalypse sim. You decide who survives using priority queues. Ethically questionable. Technically solid.</td>
              <td>Next.js · FastAPI · MySQL · Vercel · Railway</td>
              <td><span className="status status-live">Live</span></td>
              <td><a href="https://bunker-five.vercel.app/" target="_blank">Demo ↗</a> &nbsp;<a href="https://github.com/sammy-ryed/Bunker" target="_blank">GitHub ↗</a></td>
            </tr>
            <tr>
              <td style={{ opacity: .4, fontFamily: 'var(--font-mono)' }}>008</td>
              <td><div className="proj-name"><em>BurstTime Chronicles</em></div></td>
              <td>CPU scheduling simulator with a personality. Visualises FCFS, SJF, Round Robin. Processes arrive, suffer, and run.</td>
              <td>Python · Tkinter · sv-ttk</td>
              <td><span className="status status-live">Live</span></td>
              <td><a href="https://github.com/sammy-ryed/BurstTime-Chronicles" target="_blank">GitHub ↗</a></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ABOUT SECTION */}
      <hr className="section-rule" style={{ marginTop: '2.5rem' }} />
      <div className="section-head">
        <span>About the Developer · Profile</span>
        <span>Reported from Chengalpattu</span>
      </div>
      <div className="broadsheet" style={{ borderTop: 'none', borderBottom: 'none' }}>
        <div className="col">
          <div className="headline-l">WHO<br />IS THIS<br /><em>GUY?</em></div>
          <div className="byline"><span>Feature Desk</span><span>Exclusive</span></div>
        </div>
        <div className="col-divider"></div>
        <div className="col" style={{ paddingTop: '2rem' }}>
          <div className="body">
            <p>Samarth Ryan Edward is a B.Tech CSE student at SRMIST (2028) who refuses to be put in a box. He builds AI apps, fullstack platforms, desktop tools, browser games, productivity systems, and OS-level simulators — sometimes all in the same month.</p>
            <p>His quirky sense of humor seeps, unprompted, into everything he touches. He is not a backend developer. He is not a frontend developer. He builds things. All kinds of things. Constantly.</p>
          </div>
          <div className="pullquote" style={{ borderColor: 'var(--ink)', marginTop: '1rem' }}>
            <p>&quot;I believe there&apos;s always a smarter, funnier way to solve a problem.&quot;</p>
            <cite>— S.R. Edward, personal statement</cite>
          </div>
        </div>
        <div className="col-divider"></div>
        <div className="col" style={{ paddingTop: '2rem' }}>
          <div className="pullquote" style={{ borderColor: 'var(--red)' }}>
            <p>&quot;My quirky sense of humor and creativity often seeps into my work, making it truly one of a kind.&quot;</p>
            <cite>— S.R. Edward, personal statement, 2025</cite>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
            <span className="stamp">Available</span>
            <span className="stamp" style={{ transform: 'rotate(2deg)', borderColor: 'var(--blue)', color: 'var(--blue)' }}>Builder</span>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <div className="contact-section">
        <div>
          <div style={{ fontSize: '.6rem', letterSpacing: '.15em', textTransform: 'uppercase', opacity: .4, marginBottom: '.75rem', fontFamily: 'var(--font-mono)' }}>Get in Touch</div>
          <div className="contact-big">DROP<br />A<br /><em>LINE.</em></div>
          <div style={{ marginTop: '1rem', fontFamily: 'var(--font-mono)', fontSize: '.75rem', color: '#555', lineHeight: 1.7 }}>
            Inbox response time: fast.<br />
            Existential availability: immediate.<br />
            Coffee conversations: welcome.
          </div>
        </div>
        <div className="contact-info">
          <a href="mailto:edwardsamarth@gmail.com"><span>Email</span><span>edwardsamarth@gmail.com ↗</span></a>
          <a href="https://www.linkedin.com/in/samarth-ryan-edward-a51047352/" target="_blank"><span>LinkedIn</span><span>/in/samarth-ryan-edward ↗</span></a>
          <a href="https://github.com/sammy-ryed" target="_blank"><span>GitHub</span><span>@sammy-ryed ↗</span></a>
          <a href="https://instagram.com/sammy_ryed" target="_blank"><span>Instagram</span><span>@sammy_ryed ↗</span></a>
          <a href="/Samarth Ryan Edward CV.pdf" target="_blank"><span>Résumé</span><span>Download PDF ↗</span></a>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <span><s style={{opacity:.35}}>©</s> 2026 Samarth Ryan Edward · All Lefts Reserved</span>
        <span className="footer-center">Printed on <em>recycled pixels</em></span>
        <span>Poopy Pants <em>(tradition)</em></span>
      </footer>
    </>
  )
}
