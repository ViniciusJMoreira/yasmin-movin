"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// Carousel slides for the hero background — add more entries here and the
// rotation/progress-bar logic just picks them up (infinite loop, first
// slide held longer than the rest). Slides after the first carry their own
// h1 (`title`) positioned via `titleClass`, mirroring where the word sits in
// the original artwork.
const HERO_SLIDES = [
  { src: "/images/background-image.png" },
  {
    src: "/images/background-image-2.png",
    tabletSrc: "/images/bg-tablet-2.png",
    mobileSrc: "/images/bg-mobile-2.png",
    title: [{ text: "BELEZA" }],
    titleClass: "top-1/2 -translate-y-1/2 right-[9%] text-right text-gold",
    positionClass: "bg-left",
  },

  {
    src: "/images/background-image-3.png",
    tabletSrc: "/images/bg-tablet-3.png",
    mobileSrc: "/images/bg-mobile-3.png",
    title: [{ text: "AUTOCUIDADO" }],
    titleClass: "top-[77%] -translate-y-1/2 left-[4%] text-white",
  },
];

// Hero h1 with the masked line-by-line reveal: each line slides up out of
// an overflow-hidden wrapper, staggered by 0.15s.
function HeroTitle({ lines, className = "", style }) {
  return (
    <h1
      className={`font-cormorant font-light text-[clamp(4.5rem,8.5vw,10.5rem)] leading-[0.9] ${className}`}
      style={style}
    >
      {lines.map(({ text, gold }, i) => (
        <span key={text} className="block overflow-hidden">
          <span
            className={`block opacity-0 translate-y-[115%] animate-charUp-slow${gold ? " text-gold" : ""}`}
            style={{ animationDelay: `${0.45 + i * 0.15}s` }}
          >
            {text}
          </span>
        </span>
      ))}
    </h1>
  );
}

const FIRST_SLIDE_MS = 8000;
const SLIDE_MS = 5000;
const slideDuration = (i) => (i === 0 ? FIRST_SLIDE_MS : SLIDE_MS);

// Counter animation hook
function useCounter(ref, target, suffix, duration = 1800) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        const isDecimal = !Number.isInteger(target);
        const step = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent =
            (isDecimal
              ? (eased * target).toFixed(1)
              : Math.floor(eased * target)) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, target, suffix, duration]);
}

export default function Hero() {
  const ctr1 = useRef(null);
  const ctr2 = useRef(null);
  const ctr3 = useRef(null);

  useCounter(ctr1, 93, "K");
  useCounter(ctr2, 830, "K");
  useCounter(ctr3, 87, "%");

  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      setSlide((s) => (s + 1) % HERO_SLIDES.length);
    }, slideDuration(slide));
    return () => clearTimeout(t);
  }, [slide]);

  return (
    <section className="min-h-screen grid grid-cols-2 items-center relative overflow-hidden pt-20 tab:grid-cols-1">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={slide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Full-bleed cover across the whole section — the site-wide
                max-width wrapper (app/page.js) is what keeps these 1920px
                photos from ever being upscaled, not a cap here.
                Tablet/mobile swap in their own crops when a slide has them. */}
            <div
              className={`absolute inset-0 bg-no-repeat bg-cover ${HERO_SLIDES[slide].positionClass ?? "bg-center"} [background-image:var(--bg)] tab:[background-image:var(--bg-tab)] mob:[background-image:var(--bg-mob)]`}
              style={{
                "--bg": `url(${HERO_SLIDES[slide].src})`,
                "--bg-tab": `url(${HERO_SLIDES[slide].tabletSrc ?? HERO_SLIDES[slide].src})`,
                "--bg-mob": `url(${HERO_SLIDES[slide].mobileSrc ?? HERO_SLIDES[slide].tabletSrc ?? HERO_SLIDES[slide].src})`,
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute inset-0 z-0 pointer-events-none [background:radial-gradient(ellipse_55%_70%_at_72%_48%,rgba(106,61,26,0.28)_0%,transparent_65%),radial-gradient(ellipse_35%_35%_at_15%_75%,rgba(58,28,9,0.22)_0%,transparent_55%)] animate-glowP" />
      <div className="absolute bottom-[-0.05em] left-[-0.01em] z-0 pointer-events-none font-cormorant text-[clamp(12rem,26vw,34rem)] font-semibold italic text-[rgba(242,232,216,0.02)] leading-none whitespace-nowrap animate-driftX">
        Yasmin
      </div>

      {/* LEFT — text: tied to the first slide only. */}
      {slide === 0 && (
      <div className="relative z-[2] flex flex-col justify-center pt-24 pr-12 pb-24 pl-20 text-white tab:pt-12 tab:px-6 tab:pb-16">
        <div className="flex items-center gap-[0.8rem] mb-10 opacity-0 animate-slideL">
          <div className="w-7 h-px bg-white shrink-0" />
          <span className="text-[0.6rem] tracking-[0.4em] uppercase">
            Fashion · Lifestyle · Content Creator
          </span>
        </div>

        <HeroTitle
          lines={[{ text: "YASMIN" }, { text: "TALITA", gold: true }]}
          className="mb-10"
        />
      </div>
      )}

      {/* Per-slide h1 for the remaining slides — keyed on the slide so the
          reveal replays every time the carousel lands on it. On tablet/mobile
          the cover crop hides the artwork's text area, so the title drops to
          the bottom-left in white and shrinks until its longest line fits the
          viewport (--fit ≈ longest line's width in em). */}
      {HERO_SLIDES[slide].title && (
        <div
          key={slide}
          className={`absolute z-[2] ${HERO_SLIDES[slide].titleClass} tab:top-auto tab:bottom-16 tab:right-6 tab:translate-y-0 tab:text-left tab:text-white tab:[text-shadow:0_2px_24px_rgba(0,0,0,0.35)]`}
        >
          <HeroTitle
            lines={HERO_SLIDES[slide].title}
            className="tab:text-[min(14vw,calc((100vw_-_3rem)/var(--fit)))]"
            style={{
              "--fit":
                Math.max(...HERO_SLIDES[slide].title.map((l) => l.text.length)) * 0.72,
            }}
          />
        </div>
      )}

      {/* Carousel progress indicator — the one Hero element that persists
          across every slide, regardless of which slide's content is showing. */}
      <div className="absolute bottom-10 left-20 z-[3] flex items-center gap-4 opacity-0 [animation:fadeUp_0.8s_1.6s_var(--ease)_forwards] tab:hidden">
        <div className="w-[60px] h-px overflow-hidden bg-[rgba(200,149,74,0.15)]">
          <motion.div
            key={slide}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: slideDuration(slide) / 1000, ease: "linear" }}
            className="h-full bg-gold origin-left"
          />
        </div>
      </div>
    </section>
  );
}
