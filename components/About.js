"use client";
import { memo, useEffect, useRef } from "react";
import useReveal from "../hooks/useReveal";

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

export default function About() {
  const leftRef = useReveal("rvl");
  const rightRef = useReveal("rvr");

  return (
    <section id="about" className="bg-white">
      <div className="py-36 px-20 max-w-[1400px] mx-auto tab:py-20 tab:px-6">
        <div className="grid grid-cols-2 gap-24 items-center tab:grid-cols-1 tab:gap-12">
          <div ref={leftRef} className="rvl">
            <span className="text-[0.58rem] tracking-[0.38em] uppercase text-warm block mb-4">
              Sobre mim
            </span>
            <h2 className="font-cormorant text-[clamp(2.8rem,5vw,6rem)] font-light leading-[0.95] text-ink">
              Um estilo <em className="italic text-warm">autêntico</em>
              <br />
              no mundo contemporâneo
            </h2>
            <div className="w-[44px] h-px bg-warm mt-8 mb-14" />
            <div>
              <p className="text-[0.88rem] leading-[2.2] text-warm mb-[1.2rem]">
                Como criadora de conteúdo domino a estética visual e a aplico
                com precisão na moda, beleza e no estilo de vida, garantindo que
                cada conteúdo tenha um impacto diferenciado na vida de quem me
                acompanha. Unindo o Design de Moda, área em que me aperfeiçoou
                academicamente, e a minha paixão por comunicar, chego à criação
                de diálogos reais com meu público.
              </p>
              <p className="text-[0.88rem] leading-[2.2] text-warm mb-[1.2rem]">
                Como experiência diferenciada, a fluidez cultural em dominar o
                idioma espanhol, além do meu idioma nativo, o português, me leva
                a alcançar um público maior. O meu objetivo não é apenas a
                propaganda, mas sim a construção de uma comunicação genuína que
                traduza a alma das marcas com as quais trabalho.
              </p>
            </div>
          </div>
          {/* <div ref={rightRef} className="grid grid-cols-2 gap-[1.2rem] tab:grid-cols-1 rvr">
            {feats.map((f) => (
              <FeatCard key={f.n} {...f} />
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
}
