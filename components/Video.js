"use client";
import { useEffect, useState } from "react";
import useReveal from "../hooks/useReveal";

const TIKTOK_URL = "https://vm.tiktok.com/ZNRsHYv62/";

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
    <section id="video" className="video-section">
      <div className="video-grid">
        <div ref={leftRef} className="video-left rvl">
          <span className="eyebrow" style={{ color: "var(--gold)" }}>
            Vídeo de apresentação
          </span>
          <h2 className="display">
            Olá, eu sou
            <br />
            <em>Yasmin</em>
          </h2>
          <div className="rule" style={{ background: "var(--gold)" }} />
          <p>
            Um vídeo de boas-vindas para marcas e agências que queiram conhecer
            minha forma de criar, meu estilo e minha comunidade.
          </p>
        </div>

        <div ref={rightRef} className="video-right rvr">
          <div className="vframe">
            {!videoId && !error && (
              <div className="v-placeholder">
                <div className="v-play">▶</div>
                <p>Carregando…</p>
              </div>
            )}
            {error && (
              <div className="v-placeholder">
                <div className="v-play">⚠</div>
                <p>Vídeo não disponível</p>
              </div>
            )}
            {videoId && (
              <iframe
                src={`https://www.tiktok.com/embed/v2/${videoId}`}
                frameBorder="0"
                allowFullScreen
                allow="encrypted-media"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
