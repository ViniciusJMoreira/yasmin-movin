"use client";
import Image from "next/image";
import { motion } from "motion/react";
import boticario from "../public/images/logo-brand/logo-boticario.png";
import renner from "../public/images/logo-brand/logo-renner.png";
import shein from "../public/images/logo-brand/logo-shein.png";
import ca from "../public/images/logo-brand/logo-ca.png";

// Partner brands shown in the marquee — add a logo to
// public/images/logo-brand, import it above and list it here. `size` is the
// rendered height: the files have different amounts of empty space around
// the wordmark, so each gets its own so they look the same size side by side.
const PARTNERS = [
  { name: "O Boticário", src: boticario, size: "h-14 tab:h-11" },
  { name: "Renner", src: renner, size: "h-7 tab:h-[1.35rem]" },
  { name: "SHEIN", src: shein, size: "h-6 tab:h-[1.15rem]" },
  { name: "C&A", src: ca, size: "h-14 tab:h-10" },
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
      className="bg-white py-12 overflow-hidden tab:py-9 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
    >
      <motion.div
        className="flex w-max items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
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
    </section>
  );
}
