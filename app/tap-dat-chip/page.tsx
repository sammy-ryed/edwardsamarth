"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"

const NFC_CATEGORIES = [
  {
    id: "wifi",
    label: "Wi-Fi Password",
    record: `NDEF Record Type: "application/vnd.wfa.wsc"\nSSID: "YourNetworkName"\nAuth: WPA2-PSK\nKey: "hunter2_but_actually_good"`,
    quip: "Guests will never ask for the password again. You're welcome.",
  },
  {
    id: "url",
    label: "Open a URL",
    record: `NDEF Record Type: TNF_WELL_KNOWN\nType: "U" (URI)\nPayload: "https://edwardsamarth.vercel.app"\nPrefix: 0x04 (https://)`,
    quip: "You just sent someone to a website with a sticker. Peak 2025.",
  },
  {
    id: "vcard",
    label: "Share Contact Info",
    record: `NDEF Record Type: "text/vcard"\nBEGIN:VCARD\nVERSION:3.0\nFN:Samarth Ryan Edward\nTEL:+91-XXX-XXX-XXXX\nEMAIL:edwardsamarth@gmail.com\nEND:VCARD`,
    quip: "Your card is now a sticker. Save trees. Confuse boomers.",
  },
  {
    id: "text",
    label: "Display Text",
    record: `NDEF Record Type: TNF_WELL_KNOWN\nType: "T" (Text)\nLanguage: "en"\nPayload: "You just got NFC'd. Go touch grass."`,
    quip: "Make someone's phone say whatever you want. The power.",
  },
  {
    id: "app",
    label: "Launch an App",
    record: `NDEF Record Type: TNF_EXTERNAL\nType: "android.com:pkg"\nPayload: "com.spotify.music"\n--- or ---\nUniversal Link: "https://open.spotify.com"`,
    quip: "Tap sticker, open app. 43 bytes of wizardry.",
  },
  {
    id: "location",
    label: "Open a Location",
    record: `NDEF Record Type: TNF_WELL_KNOWN\nType: "U" (URI)\nPayload: "geo:12.8231,80.0444"\nAlternate: "https://maps.google.com/?q=..."`,
    quip: "Put this on your dashboard. 'Where are you?' texts become extinct.",
  },
  {
    id: "payment",
    label: "UPI / Payment Link",
    record: `NDEF Record Type: TNF_WELL_KNOWN\nType: "U" (URI)\nPayload: "upi://pay?pa=you@upi&pn=YourName&am=100"\nPrefix: custom URI scheme`,
    quip: "Stick this on your desk. Passive-aggressive debt collection at its finest.",
  },
  {
    id: "automation",
    label: "Trigger Automation",
    record: `NDEF Record Type: TNF_WELL_KNOWN\nType: "U" (URI)\nPayload: "shortcuts://run-shortcut?name=MorningRoutine"\n--- or ---\nTasker Intent / IFTTT Webhook`,
    quip: "Tap nightstand chip, phone goes DND, lights dim. You're not lazy, you're automated.",
  },
]

const SETUP_STEPS = [
  {
    step: 1,
    headline: "Get Yourself a Chip",
    body: "NFC stickers, cards, keychains. NTAG215 is the sweet spot. Amazon, Flipkart, AliExpress. Dirt cheap.",
    note: "NTAG213 = 144 bytes, NTAG215 = 504 bytes (sweet spot), NTAG216 = 888 bytes",
  },
  {
    step: 2,
    headline: "Download an NFC Writer App",
    body: "You need an app to write records to the chip. Use one that works:",
    apps: true,
  },
  {
    step: 3,
    headline: "Write Your Record",
    body: "Open app, pick record type, fill details, hold chip to back of phone, wait for the vibration. Done.",
    note: "Hold the chip still. If it fails, try again. NFC antennas are in weird spots on some phones.",
  },
  {
    step: 4,
    headline: "Lock It (Optional)",
    body: "Most apps let you lock the chip so nobody overwrites it. Good for public chips. Skip for ones you want to reprogram.",
    note: "Locking is PERMANENT. No undo. Choose wisely.",
  },
]

export default function TapDatChipPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [freeText, setFreeText] = useState("")
  const [showFreeTextResult, setShowFreeTextResult] = useState(false)
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null)
  const [showPopup, setShowPopup] = useState(true)
  const recordRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Custom cursor
    const cur = document.getElementById("nfc-cur")
    const moveCursor = (e: MouseEvent) => {
      if (cur) {
        cur.style.left = e.clientX + "px"
        cur.style.top = e.clientY + "px"
      }
    }
    document.addEventListener("mousemove", moveCursor)

    // Glitch animation on the hero title
    const heroEl = document.getElementById("nfc-hero-title")
    if (heroEl) {
      const text = heroEl.textContent || ""
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&!?"
      let revealed = 0
      const iv = setInterval(() => {
        if (revealed >= text.length) {
          heroEl.textContent = text
          clearInterval(iv)
          return
        }
        heroEl.textContent = text
          .split("")
          .map((c, i) => {
            if (i < revealed) return c
            if (c === " " || c === "\n") return c
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join("")
        revealed++
      }, 40)

      // Click/tap to scramble again
      heroEl.addEventListener("click", () => {
        heroEl.style.height = heroEl.offsetHeight + "px"
        let j = 0
        const original = "TAP DAT CHIP"
        const scrambleIv = setInterval(() => {
          if (j >= 14) {
            heroEl.textContent = original
            heroEl.style.height = ""
            clearInterval(scrambleIv)
            return
          }
          heroEl.textContent = original
            .split("")
            .map((c) =>
              c === " " ? " " : chars[Math.floor(Math.random() * chars.length)]
            )
            .join("")
          j++
        }, 55)
      })
    }

    // Pulse animation for the NFC icon
    const pulseEl = document.getElementById("nfc-pulse-ring")
    if (pulseEl) {
      pulseEl.classList.add("nfc-pulsing")
    }

    return () => {
      document.removeEventListener("mousemove", moveCursor)
    }
  }, [])

  useEffect(() => {
    if (activeCategory && recordRef.current) {
      recordRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [activeCategory])

  const selectedCat = NFC_CATEGORIES.find((c) => c.id === activeCategory)

  const generateFreeTextRecord = (input: string) => {
    const trimmed = input.trim().toLowerCase()
    if (trimmed.includes("wifi") || trimmed.includes("wi-fi") || trimmed.includes("password")) {
      return {
        record: `NDEF Record Type: "application/vnd.wfa.wsc"\nSSID: "${input.replace(/wifi|wi-fi|password|setup|share/gi, "").trim() || "YourNetworkHere"}"\nAuth: WPA2-PSK\nKey: "your_password_here"`,
        quip: "Wi-Fi handshake without the awkward conversation. Respect.",
      }
    }
    if (trimmed.includes("http") || trimmed.includes("url") || trimmed.includes("website") || trimmed.includes("link")) {
      const urlMatch = input.match(/(https?:\/\/[^\s]+)/i)
      return {
        record: `NDEF Record Type: TNF_WELL_KNOWN\nType: "U" (URI)\nPayload: "${urlMatch ? urlMatch[1] : "https://your-url-here.com"}"\nPrefix: 0x04 (https://)`,
        quip: "A URL on a chip. Simple. Slightly unnecessary. But here we are.",
      }
    }
    if (trimmed.includes("call") || trimmed.includes("phone") || trimmed.includes("contact") || trimmed.includes("vcard")) {
      return {
        record: `NDEF Record Type: "text/vcard"\nBEGIN:VCARD\nVERSION:3.0\nFN:${input.replace(/call|phone|contact|vcard|share/gi, "").trim() || "Your Name"}\nTEL:+91-XXX-XXX-XXXX\nEND:VCARD`,
        quip: "Digital contact card. Never runs out, never gets thrown away.",
      }
    }
    if (trimmed.includes("spotify") || trimmed.includes("music") || trimmed.includes("song") || trimmed.includes("playlist")) {
      return {
        record: `NDEF Record Type: TNF_WELL_KNOWN\nType: "U" (URI)\nPayload: "https://open.spotify.com/playlist/your_playlist_id"\nPrefix: 0x04 (https://)`,
        quip: "Someone taps your chip and gets hit with your taste in music. Bold move.",
      }
    }
    if (trimmed.includes("insta") || trimmed.includes("social") || trimmed.includes("follow")) {
      return {
        record: `NDEF Record Type: TNF_WELL_KNOWN\nType: "U" (URI)\nPayload: "https://instagram.com/your_handle"\nPrefix: 0x04 (https://)`,
        quip: "'Follow me' but contactless. The future of clout-chasing is a sticker.",
      }
    }
    if (trimmed.includes("rickroll") || trimmed.includes("prank") || trimmed.includes("troll")) {
      return {
        record: `NDEF Record Type: TNF_WELL_KNOWN\nType: "U" (URI)\nPayload: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"\nPrefix: 0x04 (https://)\n\n// yes. this is what you think it is.`,
        quip: "You absolute menace. Stick this under someone's desk and wait.",
      }
    }
    return {
      record: `NDEF Record Type: TNF_WELL_KNOWN\nType: "T" (Text)\nLanguage: "en"\nPayload: "${input}"`,
      quip: `A chip that says "${input.length > 40 ? input.slice(0, 40) + '...' : input}". Bold choice.`,
    }
  }

  const freeTextResult = showFreeTextResult ? generateFreeTextRecord(freeText) : null

  return (
    <>
      <div id="nfc-cur"></div>

      {/* POPUP */}
      {showPopup && (
        <div className="nfc-popup-backdrop" onClick={() => setShowPopup(false)}>
          <div className="nfc-popup" onClick={(e) => e.stopPropagation()}>
            <div className="nfc-popup-kicker">oh hey, you tapped the sticker on my card</div>
            <div className="nfc-popup-title">what brings you here?</div>
            <div className="nfc-popup-options">
              <Link href="/" className="nfc-popup-btn nfc-popup-btn-primary">
                <div className="nfc-popup-btn-title">show me what you build</div>
                <div className="nfc-popup-btn-sub">portfolio, projects, the whole thing</div>
              </Link>
              <button
                className="nfc-popup-btn nfc-popup-btn-secondary"
                onClick={() => {
                  setShowPopup(false)
                  document.getElementById('nfc-guide')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <div className="nfc-popup-btn-title">what&apos;s this sticker on your card?</div>
                <div className="nfc-popup-btn-sub">it&apos;s yours now — customize it however you want</div>
              </button>
            </div>
            <button className="nfc-popup-dismiss" onClick={() => setShowPopup(false)}>
              i&apos;ll just look around
            </button>
          </div>
        </div>
      )}

      {/* HERO: NFC LANDING */}
      <div className="nfc-hero">
        <div className="nfc-hero-badge">
          <div className="nfc-pulse-container">
            <div className="nfc-pulse-ring" id="nfc-pulse-ring"></div>
            <div className="nfc-pulse-ring nfc-pulse-ring-2"></div>
            <div className="nfc-pulse-ring nfc-pulse-ring-3"></div>
            <div className="nfc-icon-circle">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8.32a7.43 7.43 0 0 1 0 7.36" />
                <path d="M9.46 6.21a11.76 11.76 0 0 1 0 11.58" />
                <path d="M12.91 4.1a16.08 16.08 0 0 1 0 15.8" />
                <path d="M16.37 2a20.4 20.4 0 0 1 0 20" />
              </svg>
            </div>
          </div>
        </div>
        <div className="nfc-hero-text">
          <div className="nfc-hero-kicker">YOU TAPPED THE NFC STICKER ON MY CARD</div>
          <h1 className="nfc-hero-title" id="nfc-hero-title" title="Click me">TAP DAT CHIP</h1>
          <a href="https://edwardsamarth.vercel.app/" target="_blank" className="nfc-hero-sub" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer', transition: 'opacity 0.2s', display: 'inline-block' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'} onTouchStart={(e) => e.currentTarget.style.opacity = '0.7'} onTouchEnd={(e) => e.currentTarget.style.opacity = '1'}>
            <span className="overprint" data-shadow="SAMARTH">SAMARTH</span>{" "}
            <span className="italic-bit">RYAN</span>&nbsp;EDWARD
          </a>
          <div className="nfc-hero-oneliner">Builder of things that work. Sometimes even on purpose.</div>
        </div>
        <div className="nfc-hero-scroll-hint">
          <span>scroll down</span>
          <div className="nfc-scroll-arrow">&#8595;</div>
        </div>
      </div>



      {/* YELLOW BANNER */}
      <div className="yellow-banner" id="nfc-guide">
        <div className="banner-label">NFC</div>
        <div className="banner-scroll">
          <div className="banner-track">
            <span>YES, THAT STICKER ON MY CARD IS A TINY COMPUTER</span>
            <span>NFC = NEAR FIELD COMMUNICATION</span>
            <span>13.56 MHz / NO BATTERY / NO BLUETOOTH / JUST VIBES</span>
            <span>SAME TECH AS YOUR METRO CARD AND APPLE PAY</span>
            <span>IT'S YOURS NOW. CUSTOMIZE IT. YOU CAN'T STEAL WHAT'S A GIFT.</span>
            <span>YES, THAT STICKER ON MY CARD IS A TINY COMPUTER</span>
            <span>NFC = NEAR FIELD COMMUNICATION</span>
            <span>13.56 MHz / NO BATTERY / NO BLUETOOTH / JUST VIBES</span>
            <span>SAME TECH AS YOUR METRO CARD AND APPLE PAY</span>
            <span>IT'S YOURS NOW. CUSTOMIZE IT. YOU CAN'T STEAL WHAT'S A GIFT.</span>
          </div>
        </div>
      </div>

      {/* SECTION: WTF IS NFC */}
      <div className="nfc-section">
        <hr className="section-rule" style={{ margin: "0" }} />
        <div className="section-head">
          <span>What the Chip? / NFC Explained</span>
          <span>No PhD required</span>
        </div>
        <div className="nfc-explainer">
          <div className="nfc-explainer-left">
            <div className="headline-l">
              YOU TAPPED<br />THE <em>STICKER</em><br />ON MY<br /><em>CARD.</em>
            </div>
            <div className="byline">
              <span>Technology Desk</span>
              <span>Beginner-friendly</span>
            </div>
            <div className="body">
              <p>The sticker on my card is an NFC chip. Tiny antenna, microchip, ~500 bytes of memory. Your phone got close, powered the chip, and it sent you here. No battery. No pairing. Just proximity.</p>
              <p>That sticker? It&apos;s yours now. You can&apos;t steal what&apos;s a gift. Peel it off, stick it wherever you want, and reprogram it to do literally anything. Keep reading to find out how.</p>
            </div>
          </div>
          <div className="nfc-explainer-right">
            <div className="nfc-spec-card">
              <div className="nfc-spec-title">NFC AT A GLANCE</div>
              <div className="stack-row">
                <div className="stack-box"><div className="sk-label">Frequency</div><div className="sk-val" style={{ fontSize: "1rem" }}>13.56 MHz</div></div>
                <div className="stack-box"><div className="sk-label">Range</div><div className="sk-val" style={{ fontSize: "1rem" }}>~4 cm</div></div>
              </div>
              <div className="stack-row">
                <div className="stack-box"><div className="sk-label">Battery</div><div className="sk-val" style={{ fontSize: "1rem", color: "var(--red)" }}>None.</div></div>
                <div className="stack-box"><div className="sk-label">Speed</div><div className="sk-val" style={{ fontSize: "1rem" }}>424 kbps</div></div>
              </div>
              <div className="stack-row">
                <div className="stack-box"><div className="sk-label">Memory</div><div className="sk-val" style={{ fontSize: "1rem" }}>504 bytes</div></div>
                <div className="stack-box"><div className="sk-label">Rewrites</div><div className="sk-val" style={{ fontSize: "1rem" }}>100,000+</div></div>
              </div>
              <div className="stack-row">
                <div className="stack-box" style={{ flex: "1" }}><div className="sk-label">Lifespan</div><div className="sk-val" style={{ fontSize: "1rem" }}>10+ years</div></div>
                <div className="stack-box" style={{ flex: "1" }}><div className="sk-label">Cost</div><div className="sk-val" style={{ fontSize: "1rem" }}>Rs. 10-50</div></div>
              </div>
            </div>
            <div className="pullquote" style={{ borderColor: "var(--red)" }}>
              <p>&quot;A sticker that runs code when you touch it.&quot;</p>
              <cite>-- The NFC Desk, being dramatic</cite>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: HOW TO SET UP YOUR OWN */}
      <hr className="section-rule" style={{ margin: "0 2rem" }} />
      <div className="section-head">
        <span>Setup Guide / Program the Sticker From My Card (or Any Chip)</span>
        <span>4 steps</span>
      </div>
      <div className="nfc-setup-section">
        {SETUP_STEPS.map((s) => (
          <div key={s.step} className="nfc-setup-step">
            <div className="nfc-step-number">{String(s.step).padStart(2, "0")}</div>
            <div className="nfc-step-content">
              <div className="headline-m">{s.headline}</div>
              <div className="body" style={{ marginTop: "0.5rem" }}>
                <p>{s.body}</p>
              </div>
              {s.apps && (
                <div className="nfc-app-grid">
                  <div className="nfc-app-card">
                    <div className="nfc-app-platform">ANDROID</div>
                    <div className="nfc-app-name">NFC Tools</div>
                    <div className="nfc-app-dev">by wakdev</div>
                    <div className="nfc-app-desc">The gold standard. Read, write, program. Free version does 90% of what you need.</div>
                    <a href="https://play.google.com/store/apps/details?id=com.wakdev.wdnfc" target="_blank" className="nfc-app-link">
                      <span>Play Store</span><span>&#8599;</span>
                    </a>
                  </div>
                  <div className="nfc-app-card">
                    <div className="nfc-app-platform">iOS</div>
                    <div className="nfc-app-name">NFC Tools</div>
                    <div className="nfc-app-dev">by wakdev</div>
                    <div className="nfc-app-desc">Same app, Apple flavor. iPhone 7 and above. Gets the job done.</div>
                    <a href="https://apps.apple.com/app/nfc-tools/id1252962749" target="_blank" className="nfc-app-link">
                      <span>App Store</span><span>&#8599;</span>
                    </a>
                  </div>
                  <div className="nfc-app-card nfc-app-card-alt">
                    <div className="nfc-app-platform">BACKUP</div>
                    <div className="nfc-app-name">NFC TagWriter</div>
                    <div className="nfc-app-dev">by NXP (the people who make the chips)</div>
                    <div className="nfc-app-desc">Made by the manufacturer. More technical, less pretty.</div>
                    <a href="https://play.google.com/store/apps/details?id=com.nxp.nfc.tagwriter" target="_blank" className="nfc-app-link">
                      <span>Play Store</span><span>&#8599;</span>
                    </a>
                  </div>
                </div>
              )}
              {s.note && (
                <div className="nfc-step-note">
                  <span className="nfc-note-label">NOTE</span>
                  {s.note}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* YouTube tutorial */}
        <div className="nfc-setup-step nfc-video-step">
          <div className="nfc-step-number" style={{ color: "var(--red)" }}>&#9654;</div>
          <div className="nfc-step-content">
            <div className="headline-m">Prefer Video?</div>
            <div className="nfc-video-card">
              <a href="https://www.youtube.com/results?search_query=how+to+program+NFC+tags+beginner+tutorial" target="_blank" className="nfc-video-link">
                <div className="nfc-video-meta">
                  <div className="nfc-video-title">Search: &quot;How to Program NFC Tags&quot;</div>
                  <div className="nfc-video-channel">YouTube / top results</div>
                  <div className="nfc-video-cta">Find a tutorial &#8599;</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: WHAT WOULD YOU PROGRAM? */}
      <hr className="section-rule" style={{ margin: "0 2rem" }} />
      <div className="section-head">
        <span>What Would YOU Program This To? / Interactive</span>
        <span>Pick one or go rogue</span>
      </div>
      <div className="nfc-playground">
        <div className="nfc-playground-intro">
          <div className="headline-l">
            OK BUT<br />WHAT<br /><em>CAN</em> YOU<br /><em>DO</em> WITH IT?
          </div>
          <div className="body" style={{ marginTop: "1rem" }}>
            <p>Pick a category to see the NFC record structure, or type your own idea.</p>
          </div>
        </div>

        {/* Category Picker */}
        <div className="nfc-category-grid">
          {NFC_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`nfc-category-btn ${activeCategory === cat.id ? "nfc-cat-active" : ""}`}
              onClick={() => {
                setActiveCategory(activeCategory === cat.id ? null : cat.id)
                setShowFreeTextResult(false)
              }}
            >
              <span className="nfc-cat-label">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Free text input */}
        <div className="nfc-free-text">
          <div className="nfc-free-text-label">OR DESCRIBE WHAT YOU WANT</div>
          <div className="nfc-free-text-row">
            <input
              type="text"
              className="nfc-free-input"
              placeholder='e.g. "rickroll my coworker", "share my spotify playlist"'
              value={freeText}
              onChange={(e) => setFreeText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && freeText.trim()) {
                  setShowFreeTextResult(true)
                  setActiveCategory(null)
                }
              }}
            />
            <button
              className="nfc-free-submit"
              onClick={() => {
                if (freeText.trim()) {
                  setShowFreeTextResult(true)
                  setActiveCategory(null)
                }
              }}
            >
              GENERATE &#8594;
            </button>
          </div>
        </div>

        {/* Result display */}
        {(selectedCat || freeTextResult) && (
          <div className="nfc-record-display" ref={recordRef}>
            <div className="nfc-record-header">
              <div className="nfc-record-title">
                {selectedCat ? (
                  <>{selectedCat.label}</>
                ) : (
                  <>Custom: &quot;{freeText.length > 30 ? freeText.slice(0, 30) + "..." : freeText}&quot;</>
                )}
              </div>
              <button
                className="nfc-copy-btn"
                onClick={() => {
                  const text = selectedCat ? selectedCat.record : freeTextResult?.record || ""
                  navigator.clipboard.writeText(text)
                  setCopyFeedback("Copied!")
                  setTimeout(() => setCopyFeedback(null), 2000)
                }}
              >
                {copyFeedback || "COPY"}
              </button>
            </div>
            <pre className="nfc-record-code">
              {selectedCat ? selectedCat.record : freeTextResult?.record}
            </pre>
            <div className="nfc-record-quip">
              {selectedCat ? selectedCat.quip : freeTextResult?.quip}
            </div>
          </div>
        )}
      </div>

      {/* SECTION: IDEAS */}
      <hr className="section-rule" style={{ margin: "0 2rem" }} />
      <div className="section-head">
        <span>Ideas That Slap / Actually Useful Things</span>
        <span>Steal these</span>
      </div>
      <div className="nfc-ideas-section">
        <div className="nfc-ideas-grid">
          <div className="nfc-idea-card nfc-idea-useful">
            <div className="nfc-idea-tag">USEFUL</div>
            <div className="nfc-idea-title">Wi-Fi Password Chip</div>
            <div className="nfc-idea-body">Stick near your router. Guests tap, auto-connect. No more spelling out passwords.</div>
          </div>
          <div className="nfc-idea-card nfc-idea-funny">
            <div className="nfc-idea-tag nfc-tag-funny">CHAOS</div>
            <div className="nfc-idea-title">The Rickroll Chip</div>
            <div className="nfc-idea-body">Hide it under a &quot;Free Wi-Fi&quot; sticker. Wait. Watch. Collect tears.</div>
          </div>
          <div className="nfc-idea-card nfc-idea-useful">
            <div className="nfc-idea-tag">USEFUL</div>
            <div className="nfc-idea-title">Nightstand Automator</div>
            <div className="nfc-idea-body">Tap before bed: phone goes DND, alarm sets, lights dim. Tap in the morning: reverse it all.</div>
          </div>
          <div className="nfc-idea-card nfc-idea-funny">
            <div className="nfc-idea-tag nfc-tag-funny">CHAOS</div>
            <div className="nfc-idea-title">The Bathroom Reader</div>
            <div className="nfc-idea-body">Chip in the bathroom that opens a random Wikipedia article. Guests will spend 45 minutes in there.</div>
          </div>
          <div className="nfc-idea-card nfc-idea-useful">
            <div className="nfc-idea-tag">USEFUL</div>
            <div className="nfc-idea-title">Digital Contact Card</div>
            <div className="nfc-idea-body">vCard on a chip. Tap and your contact info auto-saves. Literally what brought you here.</div>
          </div>
          <div className="nfc-idea-card nfc-idea-funny">
            <div className="nfc-idea-tag nfc-tag-funny">CHAOS</div>
            <div className="nfc-idea-title">The UPI Revenge</div>
            <div className="nfc-idea-body">Friend owes you money? UPI chip on their water bottle. Every pickup = payment reminder.</div>
          </div>
        </div>
      </div>

      {/* BACK TO PORTFOLIO */}
      <div className="nfc-back-section">
        <div className="nfc-back-content">
          <div className="headline-m" style={{ marginBottom: "0.5rem" }}>That&apos;s the chip talk.</div>
          <div className="body">
            <p>Want to see what else I build? Check the main portfolio.</p>
          </div>
          <Link href="/" className="nfc-portfolio-link">
            <span>&#8592; Back to the Gazette</span>
          </Link>
        </div>
        <div className="nfc-back-links">
          <div style={{ fontSize: "0.6rem", letterSpacing: ".15em", textTransform: "uppercase", opacity: 0.4, marginBottom: ".75rem", fontFamily: "var(--font-mono)" }}>Elsewhere</div>
          <a href="https://github.com/sammy-ryed" target="_blank"><span>GitHub</span><span>@sammy-ryed &#8599;</span></a>
          <a href="https://www.linkedin.com/in/samarth-ryan-edward-a51047352/" target="_blank"><span>LinkedIn</span><span>/in/samarth-ryan-edward &#8599;</span></a>
          <a href="https://instagram.com/sammy_ryed" target="_blank"><span>Instagram</span><span>@sammy_ryed &#8599;</span></a>
          <a href="mailto:edwardsamarth@gmail.com"><span>Email</span><span>edwardsamarth@gmail.com &#8599;</span></a>
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <span><s style={{ opacity: 0.35 }}>&copy;</s> 2026 Samarth Ryan Edward / All Lefts Reserved</span>
        <span className="footer-center">Printed on <em>recycled NFC signals</em></span>
        <span>Poopy Pants <em>(tradition)</em></span>
      </footer>
    </>
  )
}
