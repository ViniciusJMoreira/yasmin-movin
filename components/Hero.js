"use client";
import { useEffect, useRef } from "react";

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
  const magRef = useRef(null);
  const ctr1 = useRef(null);
  const ctr2 = useRef(null);
  const ctr3 = useRef(null);

  useCounter(ctr1, 93, "K");
  useCounter(ctr2, 830, "K");
  useCounter(ctr3, 87, "%");

  // Magnetic button
  useEffect(() => {
    const btn = magRef.current;
    if (!btn) return;
    const onMove = (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.4;
      const y = (e.clientY - r.top - r.height / 2) * 0.4;
      btn.style.transform = `translate(${x}px,${y}px)`;
      btn.style.transition = "transform .1s";
    };
    const onLeave = () => {
      btn.style.transform = "";
      btn.style.transition = "transform .7s cubic-bezier(.22,1,.36,1)";
    };
    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero-glow" />
      <div className="hero-bg-word">Yasmin</div>

      {/* LEFT — text */}
      <div className="hero-left">
        <div className="hero-eyebrow">
          <div className="ey-line" />
          <span className="ey-text">Fashion · Lifestyle · Content Creator</span>
        </div>

        <h1 className="hero-h1">
          <span className="h1-row">
            <span>YASMIN</span>
          </span>
          <span className="h1-row">
            <span>TALITA</span>
          </span>
        </h1>

        <p className="hero-desc">
          A forma antecede a voz, e a autencidade é o caminho.
        </p>

        {/* <div className="hero-stats">
          <div className="hs">
            <span className="hs-n" ref={ctr1}>
              0
            </span>
            <span className="hs-l">Followers TikTok</span>
          </div>
          <div className="hs">
            <span className="hs-n" ref={ctr2}>
              0
            </span>
            <span className="hs-l">Total Likes</span>
          </div>
          <div className="hs">
            <span className="hs-n" ref={ctr3}>
              0
            </span>
            <span className="hs-l">Engagement</span>
          </div>
        </div> */}

        <div className="hero-cta-wrap">
          <a href="#contact" className="mag-btn" ref={magRef}>
            <div className="mag-btn-circle">→</div>
            <span className="mag-btn-label">Proposta de parceria</span>
          </a>
        </div>
      </div>

      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="scroll-track">
          <div className="scroll-fill" />
        </div>
      </div>
    </section>
  );
}
