"use client";
import { memo, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "motion/react";
import useReveal from "../hooks/useReveal";
import { useI18n } from "../i18n/I18nProvider";

const EASE_OUT = [0.22, 1, 0.36, 1];
const SWAP_MS = 2800;

const feats = [
  {
    n: "01",
    h: "Estética própria",
    p: "Paleta terrosa, identidade visual consistente em todos os conteúdos.",
  },
  {
    n: "02",
    h: "Conteúdo nativo",
    p: "Vídeos TikTok com linguagem autêntica e alta retenção.",
  },
  {
    n: "03",
    h: "Engajamento real",
    p: "Comunidade ativa e fiel, construída organicamente.",
  },
  {
    n: "04",
    h: "Parcerias sérias",
    p: "Colaborações alinhadas à identidade e ao público.",
  },
];

const FeatCard = memo(function FeatCard({ n, h, p }) {
  const ref = useRef(null);

  useEffect(() => {
    const card = ref.current;
    if (!card) return;
    const onMove = (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) translateZ(8px)`;
      card.style.transition = "transform .08s";
    };
    const onLeave = () => {
      card.style.transform = "";
      card.style.transition = "transform .7s cubic-bezier(.22,1,.36,1)";
    };
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      className="group py-10 px-8 bg-cream border border-solid border-[rgba(58,28,9,0.08)] relative overflow-hidden [transform-style:preserve-3d] will-change-transform transition-[box-shadow,border-color] duration-[400ms] hover:border-[rgba(200,149,74,0.3)] hover:[box-shadow:0_32px_64px_rgba(58,28,9,0.12),0_0_0_1px_rgba(200,149,74,0.15)] after:content-[''] after:absolute after:inset-0 after:[background:linear-gradient(135deg,rgba(200,149,74,0.07)_0%,transparent_60%)] after:opacity-0 after:transition-opacity after:duration-[400ms] hover:after:opacity-100"
      ref={ref}
    >
      <div className="absolute top-0 left-[-100%] w-3/5 h-full [background:linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)] [transform:skewX(-20deg)] transition-[left] duration-[600ms] ease-brand group-hover:left-[150%]" />
      <div className="font-cormorant text-[4rem] font-light italic text-[rgb(200,149,74)] leading-none mb-[0.8rem] transition-colors duration-[400ms] group-hover:text-[rgba(200,150,74,0.6)]">
        {n}
      </div>
      <div className="text-[0.82rem] font-medium tracking-[0.08em] text-ink mb-[0.4rem]">
        {h}
      </div>
      <div className="text-xs leading-[1.85] text-warm">{p}</div>
    </div>
  );
});

// One line of the skills column: number and label on the left, the skill in
// large type on the right. A list of values rolls from one to the next
// while the line is on screen. The skills themselves are in the dictionary
// (t.about.skills), taken from the bio on the left.
function SkillRow({ label, value, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.6 });
  const reduce = useReducedMotion();
  const values = Array.isArray(value) ? value : [value];
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (values.length < 2 || !inView || reduce) return;
    const t = setInterval(() => setShown((i) => (i + 1) % values.length), SWAP_MS);
    return () => clearInterval(t);
  }, [values.length, inView, reduce]);

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: EASE_OUT }}
      className="group grid grid-cols-[7.4rem_minmax(0,1fr)] items-baseline gap-x-4 py-7 border-0 border-t border-solid border-t-[rgba(58,28,9,0.14)] last:border-b last:border-b-[rgba(58,28,9,0.14)] mob:grid-cols-1 mob:gap-y-3 mob:py-6"
    >
      <span className="flex items-baseline gap-3 text-[0.58rem] tracking-[0.3em] uppercase text-warm">
        <span className="text-[rgba(58,28,9,0.35)] tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        {label}
      </span>
      <span
        className="relative block overflow-hidden font-cormorant font-light text-ink leading-[1.15] text-[clamp(1.3rem,2.3vw,2.75rem)] mob:text-[1.9rem] transition-transform duration-700 ease-brand group-hover:translate-x-2"
        aria-label={values.join(" · ")}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={shown}
            aria-hidden="true"
            className={`block whitespace-nowrap ${shown % 2 ? "italic text-warm" : ""}`}
            initial={{ y: "70%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-70%", opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
          >
            {values[shown]}
          </motion.span>
        </AnimatePresence>
      </span>
    </motion.li>
  );
}

export default function About() {
  const { t } = useI18n();
  const leftRef = useReveal("rvl");
  const rightRef = useReveal("rvr");

  return (
    <section id="about" className="bg-white">
      <div className="pb-36 pt-10 px-20 max-w-[1400px] mx-auto tab:pb-20  tab:pt-5 tab:px-6">
        <div className="grid grid-cols-2 gap-24 items-center tab:grid-cols-1 tab:gap-12">
          <div ref={leftRef} className="rvl">
            <span className="text-[0.58rem] tracking-[0.38em] uppercase text-warm block mb-4">
              {t.about.eyebrow}
            </span>
            <h2 className="font-cormorant text-[clamp(2.8rem,5vw,6rem)] font-light leading-[0.95] text-ink">
              {t.about.title.pre}
              <em className="italic text-warm">{t.about.title.em}</em>
              {t.about.title.post}
              <br />
              {t.about.title.line2}
            </h2>
            <div className="w-[44px] h-px bg-warm mt-8 mb-14" />
            <div>
              {t.about.paragraphs.map((text) => (
                <p key={text} className="text-[0.88rem] leading-[2.2] text-warm mb-[1.2rem]">
                  {text}
                </p>
              ))}
            </div>
          </div>
          {/* Right column: her skills as large type, with two slow rings
              turning behind them (desktop only) so the half never sits
              empty. Under 960px the list simply follows the text. */}
          <div ref={rightRef} className="rvr relative">
            <div
              aria-hidden="true"
              className="absolute top-1/2 right-[-14%] w-[92%] aspect-square -translate-y-1/2 pointer-events-none tab:hidden"
            >
              <div className="absolute inset-0 rounded-full border border-solid border-[rgba(200,149,74,0.2)] animate-ringRot">
                <span className="absolute top-0 left-1/2 w-[7px] h-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
              </div>
              <div className="absolute inset-[16%] rounded-full border border-dashed border-[rgba(200,149,74,0.3)] animate-ringRot2" />
            </div>

            <ul className="relative list-none">
              {t.about.skills.map((skill, i) => (
                <SkillRow key={skill.label} index={i} {...skill} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
