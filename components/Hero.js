"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

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
  const photoRef = useRef(null);
  const heroRRef = useRef(null);
  const magRef = useRef(null);
  const ctr1 = useRef(null);
  const ctr2 = useRef(null);
  const ctr3 = useRef(null);

  useCounter(ctr1, 93, "K");
  useCounter(ctr2, 830, "K");
  useCounter(ctr3, 87, "%");

  // 3D tilt on photo
  useEffect(() => {
    const heroR = heroRRef.current;
    const tilt = photoRef.current;
    if (!heroR || !tilt) return;

    const onMove = (e) => {
      const r = heroR.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      tilt.style.animation = "none";
      tilt.style.transform = `perspective(900px) rotateY(${x * 16}deg) rotateX(${-y * 12}deg) translateZ(16px)`;
      tilt.style.transition = "transform .08s";
    };
    const onLeave = () => {
      tilt.style.animation = "";
      tilt.style.transform = "";
      tilt.style.transition = "transform .9s cubic-bezier(.22,1,.36,1)";
    };
    heroR.addEventListener("mousemove", onMove);
    heroR.addEventListener("mouseleave", onLeave);
    return () => {
      heroR.removeEventListener("mousemove", onMove);
      heroR.removeEventListener("mouseleave", onLeave);
    };
  }, []);

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
            <span>Yasmin</span>
          </span>
          <span className="h1-row">
            <span>Movin</span>
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

      {/* RIGHT — photo frame */}
      <div className="hero-right" ref={heroRRef}>
        <div className="photo-tilt" ref={photoRef}>
          <div className="p-orb1" />
          <div className="p-orb2" />
          <div className="photo-ring-outer" />
          <div className="photo-ring-mid" />
          <div className="photo-ring-inner" />
          <div className="corner tl" />
          <div className="corner tr" />
          <div className="corner bl" />
          <div className="corner br" />
          <div className="photo-frame">
            <Image
              src="/images/yasmin.jpg"
              alt="Yasmin Movin"
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
              priority
            />
            <div className="photo-shimmer" />
          </div>
          <div className="photo-tag">@sereiamovin</div>
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
