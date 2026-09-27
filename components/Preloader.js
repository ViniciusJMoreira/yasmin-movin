"use client";
import { useEffect, useRef, useState } from "react";

export default function Preloader() {
  const [pct, setPct] = useState(0);
  const [out, setOut] = useState(false);

  // The site is a single scroll-reveal page: it should always open on the
  // Hero, not wherever the browser's native scroll restoration or an
  // incoming #hash (both can apply *after* this effect runs) would
  // otherwise land it — so pin to the top a few times across the load.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    const toTop = () => window.scrollTo(0, 0);
    toTop();
    const raf = requestAnimationFrame(toTop);
    const t1 = setTimeout(toTop, 0);
    const t2 = setTimeout(toTop, 300);
    const t3 = setTimeout(toTop, 1900);
    window.addEventListener("load", toTop);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("load", toTop);
    };
  }, []);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 12;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
      }
      setPct(Math.floor(current));
    }, 80);

    const timer = setTimeout(() => setOut(true), 1800);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const letters = [
    "Y", "a", "s", "m", "i", "n", " ", "T", "a", "l", "i", "t", "a",
  ];

  return (
    <div
      className={`fixed inset-0 w-[100dvw] h-[100dvh] max-h-[100dvh] z-[9900] bg-sage-lt bg-[url('/images/background-body.png')] bg-center bg-no-repeat bg-cover flex flex-col items-center justify-center gap-10 overflow-hidden${out ? " animate-preOut" : ""}`}
    >
      <div className="text-center">
        <div className="font-cormorant text-[clamp(2.5rem,7vw,5.5rem)] italic font-light text-ink tracking-wider overflow-hidden">
          {letters.map((l, i) => (
            <span
              key={i}
              className="text-white inline-block translate-y-[110%] opacity-0 animate-charUp"
              style={{ animationDelay: `${0.05 + i * 0.06}s` }}
            >
              {l === " " ? "\u00a0" : l}
            </span>
          ))}
        </div>
        <div className="w-full h-px bg-[rgba(200,149,74,0.18)] overflow-hidden mt-8">
          <div className="h-full bg-gold w-0 animate-barFill" />
        </div>
      </div>
      <div className="absolute bottom-12 text-[0.62rem] tracking-[0.3em] uppercase text-[rgba(58,28,9,0.5)]">
        {pct}%
      </div>
    </div>
  );
}
