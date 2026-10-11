"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// Carousel slides for the hero background — add more entries here and the
// rotation/progress-bar logic just picks them up (infinite loop). Each slide
// describes its own content: `title` (h1 lines), optional `eyebrow` and
// `cta`, and a `layout` key from SLIDE_LAYOUTS saying where it sits. Text and
// progress bar are white everywhere; `barTone: "gold"` turns the bar gold,
// and `outline: true` draws a thin gold stroke around each title letter.
const HERO_SLIDES = [
  {
    src: "/images/background-image.png",
    eyebrow: "Fashion · Lifestyle · Content Creator",
    title: [{ text: "YASMIN" }, { text: "TALITA", gold: true }],
    layout: "left",
    barTone: "gold",
  },
  {
    src: "/images/bg-image-1.jpg",
    tabletSrc: "/images/bg-tablet-1.jpg",
    mobileSrc: "/images/bg-mobile-1.jpg",
    title: [{ text: "MODA & LIFE STYLE" }],
    layout: "right",
  },
  {
    src: "/images/bg-image-2.jpg",
    tabletSrc: "/images/bg-image-2.jpg",
    mobileSrc: "/images/bg-mobile-2.jpg",
    title: [{ text: "BELEZA" }],
    layout: "bottomLeft",
  },
  {
    src: "/images/bg-image-3.jpg",
    tabletSrc: "/images/bg-image-3.jpg",
    mobileSrc: "/images/bg-mobile-3.jpg",
    title: [{ text: "AUTOCUIDADO" }],
    layout: "bottomLeft",
  },
  {
    src: "/images/bg-image-4.jpg",
    tabletSrc: "/images/bg-image-4.jpg",
    mobileSrc: "/images/bg-image-4.jpg",
    title: [{ text: "VAMOS TRABALHAR" }, { text: "JUNTOS ?" }],
    cta: { label: "Enviar proposta", href: "#contact" },
    layout: "center",
    outline: true,
  },
];

// On tablet/mobile the cover crop hides the artwork's text area, so the
// side-positioned titles drop to the bottom-left in white.
const TAB_BOTTOM =
  "tab:top-auto tab:bottom-16 tab:right-6 tab:translate-y-0 tab:text-left tab:[text-shadow:0_2px_24px_rgba(0,0,0,0.35)]";

// Where a slide's content block sits. `bar` places the progress indicator:
// "fixed" keeps it in the section's bottom-left corner, "text" hangs it right
// under the title (used whenever the title itself sits at the bottom), and
// "textOnTab" is fixed on desktop / under the title on tablet and mobile.
const SLIDE_LAYOUTS = {
  left: {
    box: "relative flex flex-col justify-center pt-24 pr-12 pb-24 pl-20 tab:pt-12 tab:px-6 tab:pb-16",
    bar: "fixed",
  },
  right: {
    box: `absolute top-1/2 -translate-y-1/2 right-[9%] text-right ${TAB_BOTTOM}`,
    bar: "textOnTab",
  },
  bottomLeft: {
    box: `absolute top-[77%] -translate-y-1/2 left-[4%] ${TAB_BOTTOM}`,
    bar: "text",
  },
  center: {
    box: "absolute inset-0 flex flex-col items-center justify-center pt-20 px-6 text-center",
    bar: "fixed",
  },
};

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
// The first slide and any slide with a CTA are held longer than the rest.
const slideDuration = (i) =>
  i === 0 || HERO_SLIDES[i].cta ? FIRST_SLIDE_MS : SLIDE_MS;

// Carousel progress indicator: a thin track filling over the slide's
// duration, frozen while the carousel is paused.
function ProgressBar({ slide, paused, tone }) {
  return (
    <div
      className={`relative w-[72px] h-[2px] overflow-hidden ${
        tone === "gold"
          ? "text-gold"
          : "text-white [filter:drop-shadow(0_0_4px_rgba(0,0,0,0.45))]"
      }`}
    >
      <div className="absolute inset-0 bg-current opacity-30" />
      <div
        key={slide}
        className="relative h-full w-0 bg-current [animation:barFill_linear_forwards]"
        style={{
          animationDuration: `${slideDuration(slide)}ms`,
          animationPlayState: paused ? "paused" : "running",
        }}
      />
    </div>
  );
}

// One slide's content block: eyebrow, h1, CTA and (when the title sits at
// the bottom) the progress bar tucked under it. Hovering/focusing the CTA
// pauses the carousel so the button can't rotate away mid-click.
function SlideContent({ index, paused, onPause }) {
  const { eyebrow, title, cta, layout, barTone, outline } = HERO_SLIDES[index];
  const { box, bar } = SLIDE_LAYOUTS[layout];
  return (
    <div className={`z-[2] text-white ${box}`}>
      {eyebrow && (
        <div className="flex items-center gap-[0.8rem] mb-10 opacity-0 animate-slideL">
          <div className="w-7 h-px bg-current shrink-0" />
          <span className="text-[0.6rem] tracking-[0.4em] uppercase">
            {eyebrow}
          </span>
        </div>
      )}

      {/* Slides after the first shrink on tablet/mobile until the longest
          line fits the viewport (--fit ≈ longest line's width in em). */}
      <HeroTitle
        lines={title}
        className={`${
          index === 0
            ? "mb-10"
            : "tab:text-[min(14vw,calc((100vw_-_3rem)/var(--fit)))]"
        }${
          // paint-order keeps the stroke behind the fill, so it only shows
          // outside the letter and doesn't thin the light-weight glyphs
          outline
            ? " [-webkit-text-stroke:2px_var(--gold)] [paint-order:stroke_fill] tab:[-webkit-text-stroke-width:1.5px]"
            : ""
        }`}
        style={
          index === 0
            ? undefined
            : { "--fit": Math.max(...title.map((l) => l.text.length)) * 0.72 }
        }
      />

      {cta && (
        <a
          href={cta.href}
          onMouseEnter={() => onPause(true)}
          onMouseLeave={() => onPause(false)}
          onFocus={() => onPause(true)}
          onBlur={() => onPause(false)}
          className="inline-flex items-center gap-3 mt-12 py-[0.95rem] px-9 rounded-full bg-white text-gold text-[0.68rem] font-medium tracking-[0.2em] uppercase no-underline border border-solid border-[rgba(200,149,74,0.55)] transition-colors duration-300 ease-brand hover:bg-gold hover:text-white opacity-0 [animation:fadeUp_0.8s_1.1s_var(--ease)_forwards] tab:mt-8"
        >
          <span>{cta.label}</span>
          <span aria-hidden="true">→</span>
        </a>
      )}

      {bar !== "fixed" && (
        <div
          className={`absolute top-full left-0 mt-6 opacity-0 [animation:fadeUp_0.8s_1.1s_var(--ease)_forwards] tab:mt-5 ${bar === "textOnTab" ? "hidden tab:block" : ""}`}
        >
          <ProgressBar slide={index} paused={paused} tone={barTone} />
        </div>
      )}
    </div>
  );
}

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
  const [paused, setPaused] = useState(false);
  // Time left on the current slide — kept across a pause so resuming
  // carries on from where it stopped instead of restarting the slide.
  const remaining = useRef(null);

  useEffect(() => {
    if (paused) return;
    if (remaining.current == null) remaining.current = slideDuration(slide);
    const startedAt = performance.now();
    const t = setTimeout(() => {
      remaining.current = null;
      setSlide((s) => (s + 1) % HERO_SLIDES.length);
    }, remaining.current);
    return () => {
      clearTimeout(t);
      if (remaining.current != null)
        remaining.current -= performance.now() - startedAt;
    };
  }, [slide, paused]);

  const barPlacement = SLIDE_LAYOUTS[HERO_SLIDES[slide].layout].bar;

  return (
    <section className="h-dvh grid grid-cols-2 items-center relative overflow-hidden pt-20 tab:grid-cols-1">
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
      {/* Short fade into the page background, so the photo melts into the
          partner-logo strip that follows instead of ending on a hard edge. */}
      <div className="absolute inset-x-0 bottom-0 h-24 z-[1] pointer-events-none [background:linear-gradient(to_top,var(--white)_0%,rgba(250,245,238,0.55)_30%,rgba(250,245,238,0.18)_62%,transparent_100%)] tab:h-16" />
      <div className="absolute bottom-[-0.05em] left-[-0.01em] z-0 pointer-events-none font-cormorant text-[clamp(12rem,26vw,34rem)] font-semibold italic text-[rgba(242,232,216,0.02)] leading-none whitespace-nowrap animate-driftX">
        Yasmin
      </div>

      {/* Per-slide content — keyed on the slide so the reveal replays every
          time the carousel lands on it. */}
      <SlideContent
        key={slide}
        index={slide}
        paused={paused}
        onPause={setPaused}
      />

      {/* Carousel progress indicator — the one Hero element that persists
          across every slide. It steps aside (invisible, so its entrance
          animation doesn't replay) on slides that carry the bar under their
          own title instead. */}
      <div
        className={`absolute bottom-10 left-20 z-[3] opacity-0 [animation:fadeUp_0.8s_1.6s_var(--ease)_forwards] tab:bottom-8 tab:left-6 ${
          barPlacement === "text"
            ? "invisible"
            : barPlacement === "textOnTab"
              ? "tab:invisible"
              : ""
        }`}
      >
        <ProgressBar
          slide={slide}
          paused={paused}
          tone={HERO_SLIDES[slide].barTone}
        />
      </div>
    </section>
  );
}
