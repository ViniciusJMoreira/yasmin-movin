"use client";
import { useEffect, useRef, useState } from "react";

export default function Preloader() {
  const [pct, setPct] = useState(0);
  const [out, setOut] = useState(false);

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

  const letters = ["Y", "a", "s", "m", "i", "n", " ", "M", "o", "v", "i", "n"];

  return (
    <div className={`preloader${out ? " out" : ""}`}>
      <div style={{ textAlign: "center" }}>
        <div className="pre-logo">
          {letters.map((l, i) => (
            <span key={i} style={{ animationDelay: `${0.05 + i * 0.06}s` }}>
              {l === " " ? "\u00a0" : l}
            </span>
          ))}
        </div>
        <div className="pre-bar-wrap">
          <div className="pre-bar" />
        </div>
      </div>
      <div className="pre-pct">{pct}%</div>
    </div>
  );
}
