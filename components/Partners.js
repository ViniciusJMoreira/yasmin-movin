"use client";
import Image from "next/image";
import { motion } from "motion/react";
import boticario from "../public/images/logo-brand/logo-boticario.png";
import renner from "../public/images/logo-brand/logo-renner.png";
import shein from "../public/images/logo-brand/logo-shein.png";
import ca from "../public/images/logo-brand/logo-ca.png";
import amobbeleza from "../public/images/logo-brand/logo-amobbeleza.png";
import dafiti from "../public/images/logo-brand/logo-dafiti.png";
import colgate from "../public/images/logo-brand/logo-colgate.png";

// Partner brands shown in the marquee — add a logo to
// public/images/logo-brand, import it above and list it here. `size` is the
// rendered height: the files have different amounts of empty space around
// the wordmark, so each gets its own so they look the same size side by side.
const PARTNERS = [
  { name: "O Boticário", src: boticario, size: "h-14 tab:h-11" },
  { name: "Renner", src: renner, size: "h-7 tab:h-[1.35rem]" },
  { name: "SHEIN", src: shein, size: "h-6 tab:h-[1.15rem]" },
  { name: "C&A", src: ca, size: "h-14 tab:h-10" },
  { name: "Amobbeleza", src: amobbeleza, size: "h-8 tab:h-[1.6rem]" },
  { name: "Dafiti", src: dafiti, size: "h-[2.9rem] tab:h-9" },
  { name: "Colgate", src: colgate, size: "h-[3.25rem] tab:h-10" },
];

// The track holds two identical halves and slides left by exactly one half,
// so the loop is seamless. Each half repeats the list enough times to stay
// wider than the widest layout (1920px) even with only a few logos.
const REPEATS = 4;
const HALF = Array.from({ length: REPEATS }, () => PARTNERS).flat();

export default function Partners() {
  return (
    <section
      aria-label="Marcas parceiras"
      className="py-28 overflow-hidden tab:py-14 [background:linear-gradient(to_bottom,var(--sage-lt),var(--white))]"
    >
      {/* The strip picks up the beige the hero fades into and eases to the
          page's off-white for the section below. The side fade is on the
          track only, so it doesn't wash out that background. */}
      <div className="[mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
      <motion.div
        className="flex w-max items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 95, repeat: Infinity, ease: "linear" }}
      >
        {[...HALF, ...HALF].map(({ name, src, size }, i) => (
          <div
            key={i}
            className="flex flex-none items-center pr-24 tab:pr-14"
            aria-hidden={i >= PARTNERS.length}
          >
            <Image
              src={src}
              alt={i < PARTNERS.length ? name : ""}
              sizes="240px"
              draggable={false}
              className={`w-auto select-none ${size}`}
            />
          </div>
        ))}
      </motion.div>
      </div>
    </section>
  );
}
