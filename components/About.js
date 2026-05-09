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
    <div className="feat" ref={ref}>
      <div className="feat-sheen" />
      <div className="feat-num">{n}</div>
      <div className="feat-title">{h}</div>
      <div className="feat-body">{p}</div>
    </div>
  );
});

export default function About() {
  const leftRef = useReveal("rvl");
  const rightRef = useReveal("rvr");

  return (
    <section id="about" className="about-section light">
      <div className="section-wrap">
        <div className="about-grid">
          <div ref={leftRef} className="rvl">
            <span className="eyebrow">Sobre mim</span>
            <h2 className="display">
              Um estilo <em>autêntico</em>
              <br />
              no mundo contemporâneo
            </h2>
            <div className="rule" />
            <div className="about-body">
              <p>
                Como criadora de conteúdo domino a estética visual e a aplico
                com precisão na moda, beleza e no estilo de vida, garantindo que
                cada conteúdo tenha um impacto diferenciado na vida de quem me
                acompanha. Unindo o Design de Moda, área em que me aperfeiçoou
                academicamente, e a minha paixão por comunicar, chego à criação
                de diálogos reais com meu público.
              </p>
              <p>
                Como experiência diferenciada, a fluidez cultural em dominar o
                idioma espanhol, além do meu idioma nativo, o português, me leva
                a alcançar um público maior. O meu objetivo não é apenas a
                propaganda, mas sim a construção de uma comunicação genuína que
                traduza a alma das marcas com as quais trabalho.
              </p>
            </div>
          </div>
          {/* <div ref={rightRef} className="feat-grid rvr">
            {feats.map((f) => (
              <FeatCard key={f.n} {...f} />
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
}
