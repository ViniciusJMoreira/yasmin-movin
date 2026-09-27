export default function Footer() {
  return (
    <footer className="bg-sage-md border-t border-solid border-t-[rgba(200,149,74,0.07)] py-10 px-20 flex justify-between items-center tab:flex-col tab:gap-6 tab:text-center tab:py-8 tab:px-6">
      <div className="font-cormorant text-lg italic text-ink tracking-wider">
        Yasmin Talita
      </div>
      <p className="text-[0.54rem] tracking-[0.18em] uppercase text-[rgba(58,28,9,0.32)]">
        © 2025 Yasmin Talita · Todos os direitos reservados
      </p>
      <div className="flex gap-8">
        <a
          href="https://tiktok.com/@sereiamovin"
          target="_blank"
          rel="noreferrer"
          className="text-[0.56rem] tracking-[0.22em] uppercase text-[rgba(58,28,9,0.4)] no-underline transition-colors duration-300 hover:text-gold"
        >
          TikTok
        </a>
        <a
          href="https://instagram.com/yasminmovin"
          target="_blank"
          rel="noreferrer"
          className="text-[0.56rem] tracking-[0.22em] uppercase text-[rgba(58,28,9,0.4)] no-underline transition-colors duration-300 hover:text-gold"
        >
          Instagram
        </a>
      </div>
    </footer>
  );
}
