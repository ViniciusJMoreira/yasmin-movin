"use client";
import { useEffect, useState } from "react";
import useReveal from "../hooks/useReveal";

const TIKTOK_URL = "https://vt.tiktok.com/ZSb88P9QL/";

export default function Video() {
  const leftRef = useReveal("rvl");
  const rightRef = useReveal("rvr");
  const [videoId, setVideoId] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/api/tiktok-oembed?url=${encodeURIComponent(TIKTOK_URL)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.videoId) setVideoId(data.videoId);
        else setError(true);
      })
      .catch(() => setError(true));
  }, []);

  return (
    <section id="video" className="bg-sage-lt">
      <div className="grid grid-cols-2 items-center tab:grid-cols-1 tab:gap-12">
        <div
          ref={leftRef}
          className="rvl pt-28 pr-16 pb-28 pl-20 flex flex-col justify-center"
        >
          <span className="text-[0.58rem] tracking-[0.38em] uppercase text-gold block mb-4">
            Vídeo de apresentação
          </span>
          <h2 className="font-cormorant text-[clamp(2.8rem,5vw,6rem)] font-light leading-[0.95] text-ink">
            Olá, eu sou
            <br />
            <span className="text-gold">Yasmin</span>
          </h2>
          <div className="w-[44px] h-px bg-gold mt-8 mb-14" />
          <p className="text-[0.87rem] leading-[2.1] text-[rgba(58,28,9,0.38)] mb-10">
            Um vídeo de boas-vindas para marcas e agências que queiram conhecer
            minha forma de criar, meu estilo e minha comunidade.
          </p>
        </div>

        <div
          ref={rightRef}
          className="group rvr relative min-h-[640px] bg-ink overflow-hidden flex items-center justify-center before:content-[''] before:absolute before:inset-0 before:[background:radial-gradient(circle_at_50%_50%,rgba(106,61,26,0.2),transparent_70%)] before:pointer-events-none"
        >
          <div className="w-[68%] [aspect-ratio:9/16] bg-ink relative z-[1] [box-shadow:0_50px_100px_rgba(0,0,0,0.7),0_0_0_1px_rgba(200,149,74,0.1)] [transform:perspective(1000px)_rotateY(-7deg)_rotateX(2deg)] transition-transform duration-[600ms] ease-brand overflow-hidden group-hover:[transform:perspective(1000px)_rotateY(0)_rotateX(0)]">
            {!videoId && !error && (
              <div className="group/play w-full h-full [background:linear-gradient(160deg,#251008,rgba(8,4,2,0))] flex flex-col items-center justify-center gap-6 cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-[rgba(200,149,74,0.12)] border border-solid border-[rgba(200,149,74,0.3)] flex items-center justify-center text-[1.4rem] animate-vRipple transition-[transform,background] duration-300 group-hover/play:scale-[1.12] group-hover/play:bg-[rgba(200,149,74,0.22)]">
                  ▶
                </div>
                <p className="text-[0.6rem] tracking-[0.28em] uppercase text-[rgba(242,232,216,0.25)]">
                  Carregando…
                </p>
              </div>
            )}
            {error && (
              <div className="group/play w-full h-full [background:linear-gradient(160deg,#251008,rgba(8,4,2,0))] flex flex-col items-center justify-center gap-6 cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-[rgba(200,149,74,0.12)] border border-solid border-[rgba(200,149,74,0.3)] flex items-center justify-center text-[1.4rem] animate-vRipple transition-[transform,background] duration-300 group-hover/play:scale-[1.12] group-hover/play:bg-[rgba(200,149,74,0.22)]">
                  ⚠
                </div>
                <p className="text-[0.6rem] tracking-[0.28em] uppercase text-[rgba(242,232,216,0.25)]">
                  Vídeo não disponível
                </p>
              </div>
            )}
            {videoId && (
              <iframe
                src={`https://www.tiktok.com/embed/v2/${videoId}`}
                frameBorder="0"
                allowFullScreen
                allow="encrypted-media"
                className="w-full h-full object-cover block"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
