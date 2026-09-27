"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

const links = [
  { href: "#about", label: "About" },
  { href: "#video", label: "Vídeo" },
  { href: "#catalog", label: "Catálogo" },
  { href: "#collabs", label: "Collabs" },
  { href: "#mediakit", label: "Media Kit" },
  { href: "#contact", label: "Contato" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  const mobDelays = [0.1, 0.17, 0.24, 0.31, 0.38, 0.45];

  // The page wrapper uses `transform`, which would make `fixed` relative to it
  // (so the nav scrolled away). Portal to <body> to stay fixed to the viewport.
  if (!mounted) return null;

  return createPortal(
    <>
      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[400] bg-sage-lt flex flex-col items-center justify-center gap-10 transition-[clip-path] duration-[750ms] ease-brand2 ${
          open
            ? "[clip-path:circle(170%_at_calc(100%_-_54px)_44px)] [pointer-events:all]"
            : "[clip-path:circle(0%_at_calc(100%_-_54px)_44px)] pointer-events-none"
        }`}
      >
        <div
          className={`w-[50px] h-px bg-gold [transition:opacity_0.4s_0.5s] ${open ? "opacity-100" : "opacity-0"}`}
        />
        {links.map((l, i) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={close}
            style={{ transitionDelay: open ? `${mobDelays[i]}s` : undefined }}
            className={`font-cormorant text-[clamp(2.5rem,8vw,4rem)] italic font-light text-ink no-underline [transition:color_0.3s,opacity_0.5s,transform_0.5s] hover:text-gold ${
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
            }`}
          >
            {l.label}
          </Link>
        ))}
        <div
          className={`w-[50px] h-px bg-gold [transition:opacity_0.4s_0.5s] ${open ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      <nav
        className={`group fixed top-0 left-0 right-0 max-w-[1920px] mx-auto z-[500] flex justify-between items-center transition-[padding,background] duration-500 tab:px-6 ${
          scrolled
            ? "scrolled py-[1.1rem] px-16 tab:py-[0.9rem] bg-[rgba(233,228,210,0.88)] backdrop-blur-[28px] border-b border-solid border-b-[rgba(200,149,74,0.07)]"
            : "py-8 px-16 tab:py-[1.2rem]"
        }`}
      >
        <Link
          className="font-cormorant text-[1.2rem] italic tracking-wider text-white no-underline transition-colors duration-300 relative z-[700] group-[.scrolled]:text-ink hover:!text-gold"
          href="#"
        >
          Yasmin Talita
        </Link>

        <ul className="flex gap-10 list-none tab:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-[0.6rem] tracking-[0.3em] uppercase text-white no-underline relative transition-colors duration-300 group-[.scrolled]:text-ink hover:!text-gold after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-px after:bg-gold after:transition-[width] after:duration-[350ms] after:ease-brand hover:after:w-full"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="hidden tab:flex flex-col gap-[5px] bg-transparent border-none cursor-pointer z-[700] p-[5px]"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          <span
            className={`block w-6 h-px bg-white origin-center [transition:transform_0.45s_var(--ease2),opacity_0.3s,width_0.3s] group-[.scrolled]:bg-ink ${open ? "translate-y-1.5 rotate-45" : ""}`}
          />
          <span
            className={`block w-6 h-px bg-white origin-center [transition:transform_0.45s_var(--ease2),opacity_0.3s,width_0.3s] group-[.scrolled]:bg-ink ${open ? "opacity-0 w-0" : ""}`}
          />
          <span
            className={`block w-6 h-px bg-white origin-center [transition:transform_0.45s_var(--ease2),opacity_0.3s,width_0.3s] group-[.scrolled]:bg-ink ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
          />
        </button>
      </nav>
    </>,
    document.body
  );
}
