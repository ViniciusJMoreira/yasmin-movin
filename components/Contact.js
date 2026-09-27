'use client'
import useReveal from '../hooks/useReveal'

export default function Contact() {
  const leftRef  = useReveal('rvl')
  const rightRef = useReveal('rvr')
  const clCls =
    'group flex items-center gap-[1.2rem] py-[1.1rem] px-6 border border-solid border-[rgba(200,149,74,0.1)] no-underline text-[rgba(58,28,9,0.4)] text-[0.73rem] tracking-[0.07em] relative overflow-hidden transition-[color,border-color] duration-[400ms] hover:text-ink hover:border-gold'

  return (
    <section id="contact" className="bg-sage-lt">
      <div className="py-36 px-20 max-w-[1400px] mx-auto tab:py-20 tab:px-6">
        <div className="grid grid-cols-2 gap-24 items-start tab:grid-cols-1 tab:gap-12">
          <div ref={leftRef} className="rvl">
            <span className="text-[0.58rem] tracking-[0.38em] uppercase text-gold block mb-4">
              Contato
            </span>
            <h2 className="font-cormorant text-[clamp(2.8rem,5vw,6rem)] font-light leading-[0.95] text-ink">
              Vamos criar<br /><em className="italic text-tan">juntos</em>?
            </h2>
            <div className="w-[44px] h-px bg-gold mt-8 mb-14" />
            <div>
              <p className="text-[0.87rem] leading-[2.1] text-[rgba(58,28,9,0.35)] mb-10">
                Aberta a parcerias com marcas de moda, beleza e lifestyle que compartilhem da mesma visão de elegância e autenticidade.
              </p>
            </div>
            <div className="flex flex-col gap-[0.6rem]">
              <a className={clCls} href="https://tiktok.com/@sereiamovin" target="_blank" rel="noreferrer">
                {/* NOTE: matches a pre-existing CSS specificity quirk in the original
                    stylesheet (a later `.cl > *` rule forces position:relative here),
                    which makes this fill invisible (0×0) in the current live site —
                    kept identical on purpose. */}
                <div className="relative z-[1] inset-0 bg-gold [transform:scaleX(0)] origin-left transition-transform duration-[450ms] ease-brand group-hover:[transform:scaleX(1)]" />
                <span className="relative z-[1] text-[0.95rem]">🎵</span>
                <span className="relative z-[1]">TikTok · @sereiamovin</span>
              </a>
              <a className={clCls} href="https://instagram.com/yasminmovin" target="_blank" rel="noreferrer">
                <div className="relative z-[1] inset-0 bg-gold [transform:scaleX(0)] origin-left transition-transform duration-[450ms] ease-brand group-hover:[transform:scaleX(1)]" />
                <span className="relative z-[1] text-[0.95rem]">📷</span>
                <span className="relative z-[1]">Instagram · @yasminmovin</span>
              </a>
              <a className={clCls} href="mailto:contato@sereiamovin.com">
                <div className="relative z-[1] inset-0 bg-gold [transform:scaleX(0)] origin-left transition-transform duration-[450ms] ease-brand group-hover:[transform:scaleX(1)]" />
                <span className="relative z-[1] text-[0.95rem]">✉️</span>
                <span className="relative z-[1]">contato@sereiamovin.com</span>
              </a>
            </div>
          </div>
          <div
            ref={rightRef}
            className="rvr py-14 px-12 border border-solid border-[rgba(200,149,74,0.08)] bg-[rgba(255,255,255,0.02)] [transform-style:preserve-3d] will-change-transform transition-[transform,box-shadow] duration-500 ease-brand hover:[transform:perspective(600px)_rotateX(2deg)_rotateY(-3deg)] hover:[box-shadow:0_40px_80px_rgba(58,28,9,0.18),0_0_0_1px_rgba(200,149,74,0.12)]"
          >
            <h3 className="font-cormorant text-[2.2rem] font-light italic text-ink mb-4">
              Proposta de parceria
            </h3>
            <p className="text-[0.8rem] leading-[2] text-[rgba(58,28,9,0.3)] mb-10">
              Para propostas comerciais, envie uma mensagem com informações sobre a marca, tipo de conteúdo e período. Respondemos em até 48h.
            </p>
            <a
              href="mailto:contato@sereiamovin.com"
              className="group/cta inline-flex items-center gap-4 py-[1.1rem] px-10 border border-solid border-gold text-gold text-[0.63rem] tracking-[0.26em] uppercase no-underline relative overflow-hidden transition-colors duration-[400ms] hover:text-ink"
            >
              <div className="absolute inset-0 bg-gold [transform:scaleX(0)] origin-left transition-transform duration-[450ms] ease-brand z-0 group-hover/cta:[transform:scaleX(1)]" />
              <span className="relative z-[1]">→</span>
              <span className="relative z-[1]">Enviar proposta</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
