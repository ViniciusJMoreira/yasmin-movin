'use client'
import useReveal from '../hooks/useReveal'

export default function Contact() {
  const leftRef  = useReveal('rvl')
  const rightRef = useReveal('rvr')
  return (
    <section id="contact" className="contact-section">
      <div className="section-wrap">
        <div className="contact-grid">
          <div ref={leftRef} className="rvl">
            <span className="eyebrow">Contato</span>
            <h2 className="display">Vamos criar<br /><em>juntos</em>?</h2>
            <div className="rule" style={{ background: 'var(--gold)' }} />
            <div className="contact-body">
              <p>Aberta a parcerias com marcas de moda, beleza e lifestyle que compartilhem da mesma visão de elegância e autenticidade.</p>
            </div>
            <div className="clinks">
              <a className="cl" href="https://tiktok.com/@sereiamovin" target="_blank" rel="noreferrer"><div className="cl-bg" /><span className="cl-ico">🎵</span><span>TikTok · @sereiamovin</span></a>
              <a className="cl" href="https://instagram.com/yasminmovin" target="_blank" rel="noreferrer"><div className="cl-bg" /><span className="cl-ico">📷</span><span>Instagram · @yasminmovin</span></a>
              <a className="cl" href="mailto:contato@sereiamovin.com"><div className="cl-bg" /><span className="cl-ico">✉️</span><span>contato@sereiamovin.com</span></a>
            </div>
          </div>
          <div ref={rightRef} className="cpanel rvr">
            <h3>Proposta de parceria</h3>
            <p>Para propostas comerciais, envie uma mensagem com informações sobre a marca, tipo de conteúdo e período. Respondemos em até 48h.</p>
            <a href="mailto:contato@sereiamovin.com" className="cta-btn">
              <div className="cta-fill" /><span>→</span><span>Enviar proposta</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
