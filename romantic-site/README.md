# 💌 Romantic Interactive Website

A dreamy, vintage-aesthetic interactive website built at "2 AM energy." Share it via a link and watch someone smile.

## ✨ Features

- 50+ Hindi questions (English script) that get funnier as "No" is clicked
- Shrinking/fleeing No button with viewport-safe movement
- Milestone toasts at 5, 10, 15, 20, 30, 40 clicks
- Secret Easter Egg at 50 clicks
- Animated yes-screen with romantic story
- Full audio system (bg music + SFX) with settings panel
- URL personalization: `?from=Laksh`
- Progress saved in localStorage (refresh-safe)
- Animated background: gradient + film grain + petals + sparkles + glows
- Vintage paper card aesthetic
- Fully responsive & mobile-first
- Vercel-ready (static export)

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🌐 Personalization

```
http://localhost:3000/?from=Priya
```

This shows: **"Priya ke liye ek chhota sa sawaal ❤️"**

---

## 🎵 Audio Setup

Place audio files in `public/audio/`:

| File | Purpose |
|------|---------|
| `bg-music.mp3` | Looping romantic background music |
| `no.mp3` | Plays on No click |
| `yes.mp3` | Plays on Yes click |
| `success.mp3` | Plays during Yes celebration |
| `ending.mp3` | Plays on final story ending |

Missing files are silently ignored (no site breakage).

> **Tip:** Use royalty-free piano/lo-fi music from [pixabay.com](https://pixabay.com/music/) or [freesound.org](https://freesound.org)

---

## 🎨 Customization

Edit `src/config/siteConfig.ts` to change:
- Name / URL param key
- All questions (50+)
- Milestone messages
- Yes/No ending messages
- Colors
- Share text
- Audio paths & volumes

---

## 📦 Deploy to Vercel

```bash
# Option 1: Vercel CLI
npm i -g vercel
vercel

# Option 2: GitHub
# Push to GitHub → import repo at vercel.com → deploy
```

No environment variables needed. Works out of the box.

---

## 📁 Folder Structure

```
src/
  app/
    layout.tsx       ← Fonts, metadata
    page.tsx         ← Server entry
    PageClient.tsx   ← URL param reader
    globals.css      ← Base styles
  components/
    MainApp.tsx          ← Phase router
    BackgroundLayers.tsx ← Animated background
    StartScreen.tsx      ← Main Q&A screen
    NoButton.tsx         ← Fleeing No button
    YesScreen.tsx        ← Romantic story ending
    EasterEggScreen.tsx  ← 50-click secret
    StayNoScreen.tsx     ← Stay No path
    Celebration.tsx      ← Hearts & confetti
    MilestoneToast.tsx   ← Milestone popups
    SettingsPanel.tsx    ← Audio controls
    ShareButton.tsx      ← Copy/share link
  config/
    siteConfig.ts    ← All customizable content
  hooks/
    useAudio.ts      ← Audio manager
    useProgress.ts   ← Click count & phase state
public/
  audio/             ← Place MP3s here
  images/            ← Optional custom images
```

---

## 🛠 Tech Stack

- **Next.js 15** (App Router, static export)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Google Fonts** (Playfair Display, Inter, Caveat)

---

Made with ❤️ at 2 AM.
