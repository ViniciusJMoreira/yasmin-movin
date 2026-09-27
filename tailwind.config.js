/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    // Exact 1:1 breakpoints matching the original max-width media queries
    // (desktop-first overrides, not Tailwind's default min-width scale).
    screens: {
      tab: { max: "960px" },
      mob: { max: "480px" },
    },
    extend: {
      colors: {
        ink: "var(--ink)",
        deep: "var(--deep)",
        brown: "var(--brown)",
        warm: "var(--warm)",
        tan: "var(--tan)",
        gold: "var(--gold)",
        "sage-lt": "var(--sage-lt)",
        "sage-md": "var(--sage-md)",
        sand: "var(--sand)",
        cream: "var(--cream)",
        white: "var(--white)",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
      },
      transitionTimingFunction: {
        brand: "var(--ease)",
        brand2: "var(--ease2)",
      },
      keyframes: {
        grainA: {
          "0%": { backgroundPosition: "0 0" },
          "25%": { backgroundPosition: "-30px 10px" },
          "50%": { backgroundPosition: "15px -20px" },
          "75%": { backgroundPosition: "-10px 25px" },
        },
        charUp: {
          to: { opacity: "1", transform: "none" },
        },
        slideL: {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "none" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(22px)" },
          to: { opacity: "1", transform: "none" },
        },
        barFill: {
          to: { width: "100%" },
        },
        preOut: {
          to: { transform: "translateY(-100%)" },
        },
        glowP: {
          from: { opacity: "0.7" },
          to: { opacity: "1" },
        },
        driftX: {
          from: { transform: "translateX(-2%)" },
          to: { transform: "translateX(2%)" },
        },
        ringRot: {
          "0%": { transform: "rotate(0deg) scale(1)", borderColor: "rgba(200, 149, 74, 0.2)" },
          "25%": { borderColor: "rgba(200, 149, 74, 0.6)" },
          "50%": { transform: "rotate(180deg) scale(1.015)", borderColor: "rgba(200, 149, 74, 0.2)" },
          "75%": { borderColor: "rgba(200, 149, 74, 0.6)" },
          "100%": { transform: "rotate(360deg) scale(1)", borderColor: "rgba(200, 149, 74, 0.2)" },
        },
        ringRot2: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
        floatFrame: {
          from: { transform: "translateY(0px)" },
          to: { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "250% 0" },
          "100%": { backgroundPosition: "-250% 0" },
        },
        orbF: {
          from: { transform: "translate(0, 0) scale(1)" },
          to: { transform: "translate(8px, -10px) scale(1.05)" },
        },
        sFill: {
          "0%": { transform: "scaleX(0)", opacity: "0" },
          "30%": { opacity: "1" },
          "80%": { transform: "scaleX(1)", opacity: "1" },
          "100%": { transform: "scaleX(1)", opacity: "0" },
        },
        vRipple: {
          "0%": { boxShadow: "0 0 0 0 rgba(200, 149, 74, 0.25)" },
          "70%": { boxShadow: "0 0 0 24px rgba(200, 149, 74, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(200, 149, 74, 0)" },
        },
      },
      animation: {
        grainA: "grainA 0.4s steps(1) infinite",
        charUp: "charUp 0.7s var(--ease) forwards",
        "charUp-slow": "charUp 0.95s var(--ease) forwards",
        slideL: "slideL 0.7s 0.3s var(--ease) forwards",
        fadeUp: "fadeUp 0.8s var(--ease) forwards",
        barFill: "barFill 1.6s 0.4s var(--ease2) forwards",
        preOut: "preOut 0.9s var(--ease2) forwards",
        glowP: "glowP 8s ease-in-out infinite alternate",
        driftX: "driftX 22s ease-in-out infinite alternate",
        ringRot: "ringRot 22s linear infinite",
        ringRot2: "ringRot2 15s linear infinite",
        floatFrame: "floatFrame 6s ease-in-out infinite alternate",
        shimmer: "shimmer 4s ease-in-out infinite",
        orbF: "orbF 7s ease-in-out infinite alternate",
        "orbF-rev": "orbF 10s ease-in-out infinite alternate-reverse",
        sFill: "sFill 2.2s ease-in-out infinite",
        vRipple: "vRipple 2.5s ease-in-out infinite",
      },
    },
  },
  // Preflight is off on purpose: the project already ships its own full
  // reset (`*,*::before,*::after{box-sizing;margin:0;padding:0}`) and every
  // element sets its own explicit styles, so Preflight would only risk
  // silently changing defaults (list markers, form control chrome, etc.)
  // that this migration must not touch.
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
