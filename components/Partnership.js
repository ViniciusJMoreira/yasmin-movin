'use client'
import { useRef, useState } from 'react'
import useReveal from '../hooks/useReveal'
import { useI18n } from '../i18n/I18nProvider'
import BrandWall from './BrandWall'
import ProposalCard from './ProposalCard'
import SocialSignature from './SocialSignature'

// The closing section in two parts: the brands she has worked with (which
// also carries the section heading), then the invitation to be next. The brand name typed into the proposal is held here because two
// parts use it — the sentence in the card and the open tile of the wall.
export default function Partnership() {
  const { t } = useI18n()
  const p = t.partnership
  const leftRef = useReveal('rvl')
  const rightRef = useReveal('rvr')
  const [brand, setBrand] = useState('')
  const brandInputRef = useRef(null)

  // Focusing the field also scrolls it into view.
  const goToProposal = () => brandInputRef.current?.focus()

  return (
    <section id="parcerias" className="bg-sage-lt overflow-hidden">
      <div className="pt-36 pb-28 px-20 max-w-[1400px] mx-auto tab:pt-20 tab:pb-16 tab:px-6">
        <BrandWall visitorBrand={brand} onSlotClick={goToProposal} />

        <div className="mt-28 grid grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-x-20 items-center tab:mt-20 tab:grid-cols-1 tab:gap-y-12">
          <div ref={leftRef} className="rvl">
            <span className="text-[0.58rem] tracking-[0.38em] uppercase text-warm block mb-4">
              {p.proposalEyebrow}
            </span>
            <h3 className="font-cormorant text-[clamp(2.8rem,5vw,6rem)] font-light leading-[0.95] text-ink">
              {p.title.line1}<br /><em className="italic text-warm">{p.title.em}</em>{p.title.tail}
            </h3>
            <p className="mt-9 max-w-[26rem] text-[0.87rem] leading-[2] text-[rgba(58,28,9,0.55)]">
              {p.intro}
            </p>
            <div className="mt-12 pt-9 border-0 border-t border-solid border-t-[rgba(58,28,9,0.16)] tab:mt-10">
              <SocialSignature />
            </div>
          </div>

          <div ref={rightRef} className="rvr">
            <ProposalCard brand={brand} onBrandChange={setBrand} brandInputRef={brandInputRef} />
          </div>
        </div>
      </div>
    </section>
  )
}
