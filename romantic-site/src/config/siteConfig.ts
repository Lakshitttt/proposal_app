// src/config/siteConfig.ts
// Edit this file to customize the website without touching any logic

export const siteConfig = {
  // ── Personalization ──────────────────────────────────────────────────────
  defaultName: "Tum",          // Used when no ?from= query param
  paramKey: "from",            // URL param: ?from=Laksh

  // ── Colors ───────────────────────────────────────────────────────────────
  colors: {
    dustyRose: "#D9A0A7",
    mutedPink: "#E7B8C4",
    mauve: "#C7A6C9",
    beige: "#F4E7D3",
    paper: "#EADCC8",
    cream: "#FFF8F0",
    wine: "#8B3A4A",
    burgundy: "#7D3948",
  },

  // ── Questions (shown in order, then cycled) ──────────────────────────────
  questions: [
    "Kya tum mujhe pasand karti ho? ❤️",
    "Kya tum sure ho? 🥺",
    "Ek baar aur soch lo ❤️",
    "Galti se No dab gaya kya? 😏",
    "Mujhe lagta hai tum Yes karna chahti ho 👀",
    "Dil todna achhi baat nahi hoti 😭",
    "Mummy ne mana kiya hai kya? 😭",
    "Ab to maan bhi jao 🌹",
    "System kehta hai Yes better option hai 😌",
    "Ek mauka to do 🥺",
    "Kya tum itni ziddi ho sach mein? 😏",
    "Main wait kar sakta hoon 😌",
    "Dil ki baat sunna chahiye na? 💭",
    "Error: No button should not be pressed again 🛑",
    "Yaar seriously? 😭",
    "Main hurt ho raha hoon literally 😔",
    "Kya tumhe pata hai Yes kitna achha lagta? 🌸",
    "Try kar ke dekho, kuch nahi bigdega 😊",
    "Tumhara phone bhi Yes bol raha hai shayad 📱",
    "Stars bhi Yes bol rahe hain aaj raat ✨",
    "Ek cup chai ke badle ek Yes? ☕",
    "Main promise karta hoon kuch nahi kahunga... zyaada 😌",
    "Tum itna drama kyun kar rahi ho 😭❤️",
    "Google Maps bhi Yes ki taraf point kar raha hai 📍",
    "Mera WiFi bhi tumse connected hona chahta hai 📶",
    "Aaj ka weather: Yes ke liye perfect ☁️🌸",
    "Scientifically proven: Yes bolne se khushi milti hai 🔬",
    "Breaking News: Ladki ne abhi bhi No click kiya 📰",
    "Update available: Yes version 2.0 🔄",
    "Kya tum actually test kar rahi ho mujhe? 🤔",
    "Main samajh gaya, tum dramatic ho 💀",
    "Okay okay, thodi der aur sahi... 😮‍💨",
    "Tum jeet nahi sakti, main itna cute hoon 😌",
    "Haath jod ke request kar raha hoon 🙏",
    "Mera heart app crash ho raha hai 💔📲",
    "Ye No button broken hai shayad, Yes try karo 🔧",
    "Tumhara horoscope kehta hai Yes ♈",
    "Aaj lucky number hai: Y-E-S 🍀",
    "Agar Yes click kiya toh ek wish milegi ⭐",
    "Main already tumhara favorite hoon, officially karo bas 😇",
    "Bhagwan bhi Yes bol rahe hain abhi 🙏✨",
    "Tum itni strong ho, ek Yes toh de sakti ho 💪",
    "Mummy ko bataunga kya? 😭",
    "Last chance with full discount: FREE ❤️",
    "Okay I'll stop... sirf ek Yes ke baad 🥺",
    "Tumne meri puri evening barbaad kar di 😂❤️",
    "Shakespeare bhi yahi kehte: Just say Yes 📜",
    "Main tumhara hero ban sakta hoon, ek Yes pe 🦸",
    "Dil ki awaaz suno, wo bhi Yes bol rahi hai 💗",
    "Okay fine... tum actually jeet rahi ho 😭",
    "Please? 🥺👉👈",
  ],

  // ── Milestone Messages ───────────────────────────────────────────────────
  milestones: {
    5:  { text: "Ab to mujhe thoda bura lag raha hai 😭", emoji: "💔" },
    10: { text: "Yaar kitni ziddi ho 😭", emoji: "😭" },
    15: { text: "Achievement Unlocked: World's Toughest Crush 💀", emoji: "🏆" },
    20: { text: "System Recommendation: YES ❤️", emoji: "🖥️" },
    30: { text: "NASA bhi itna determination nahi dikhata 🚀", emoji: "🚀" },
    40: { text: "Legendary Resistance Detected ⚠️", emoji: "⚡" },
  },

  // ── Yes Screen Messages ──────────────────────────────────────────────────
  yesMessages: {
    zeroClicks: "Waah, pehli hi baar mein samajh gayi 😌❤️",
    manyClicks: "Aapko pehle hi Yes kar dena chahiye tha 😏🌹",
    story: [
      "Main haar maan sakta tha...",
      "Par tum bhi itni easily nahi maani.",
      "Shayad isi liye interesting ho.",
      "Kahani ka ending shayad pehle se likha hua tha.",
      "Ab Hinge pe jaake mujhe bata bhi do 😌",
    ],
    thankYou: "Thank you for making my day ❤️",
  },

  // ── Easter Egg (50 clicks) ───────────────────────────────────────────────
  easterEgg: {
    lines: [
      "50 baar No?",
      "Seriously?",
      "Main impress ho gaya.",
      "NASA bhi itna determination nahi dikhata 🚀",
      "Theek hai.",
      "Tum jeet gayi.",
    ],
    achievement: "Professional Rejector",
    afterLines: [
      "Mujhe lagta hai tum sirf dekhna chahti thi ki aage kya hoga 😭",
      "Waise...",
      "Ab jab itna time spend kar hi diya hai...",
      "Ek baar Yes bhi try kar lo 😌🌹",
    ],
  },

  // ── Stay No Ending ───────────────────────────────────────────────────────
  stayNoEnding: [
    "Fair enough.",
    "At least tum honest ho.",
    "Ye quality achhi lagi.",
    "Ab Hinge pe jaake mujhe bata dena ki tum yahan tak pahunch gayi thi.",
  ],

  // ── Share ─────────────────────────────────────────────────────────────────
  share: {
    text: "Ek chhota sa sawaal tumhare liye ❤️",
    hashtags: ["romantic", "cute"],
  },

  // ── Audio ────────────────────────────────────────────────────────────────
  audio: {
    bgMusic:   "/audio/bg-music.mp3",
    noSound:   "/audio/no.mp3",
    yesSound:  "/audio/yes.mp3",
    success:   "/audio/success.mp3",
    ending:    "/audio/ending.mp3",
    defaultMusicVolume: 0.35,
    defaultSfxVolume:   0.7,
  },
};
