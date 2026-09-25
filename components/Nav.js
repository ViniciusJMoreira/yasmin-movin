"use client";
import { useEffect, useState } from "react";
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

  useEffect(() => {
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

  return (
    <>
      {/* Mobile menu */}
      <div className={`mob-menu${open ? " open" : ""}`}>
        <div className="mob-menu-line" />
        {links.map((l) => (
          <Link key={l.href} href={l.href} onClick={close}>
            {l.label}
          </Link>
        ))}
        <div className="mob-menu-line" />
      </div>

      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <Link className="nav-logo" href="#">
          Yasmin Talita
        </Link>

        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
        </ul>

        <button
          className={`hamburger${open ? " open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </>
  );
}
