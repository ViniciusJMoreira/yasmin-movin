// Portuguese — the source language. es.js and en.js mirror this file key by
// key; when a text changes here, change it there too.
const pt = {
  htmlLang: 'pt-BR',
  name: 'Português',
  meta: {
    title: 'Yasmin Talita — Sereia Movin',
    description: 'Moda · Lifestyle · Criadora de conteúdo',
  },
  // Number formatting for the Media Kit figures.
  format: { locale: 'pt-BR', thousand: 'mil', million: 'mi', unitSpace: true },
  nav: {
    links: { about: 'About', catalog: 'Catálogo', mediakit: 'Media Kit', partnership: 'Parcerias' },
    menu: 'Menu',
    language: 'Idioma',
    backToTop: 'Voltar ao topo',
  },
  hero: {
    eyebrow: 'Fashion · Lifestyle · Content Creator',
    slides: {
      fashion: ['MODA & LIFE STYLE'],
      beauty: ['BELEZA'],
      selfcare: ['AUTOCUIDADO'],
      together: ['VAMOS TRABALHAR', 'JUNTOS ?'],
    },
    cta: 'Enviar proposta',
  },
  partners: { label: 'Marcas parceiras' },
  about: {
    eyebrow: 'Sobre mim',
    // Heading: [pre][em][post] on the first line, then line2.
    title: { pre: 'Um estilo ', em: 'autêntico', post: '', line2: 'no mundo contemporâneo' },
    paragraphs: [
      'Como criadora de conteúdo domino a estética visual e a aplico com precisão na moda, beleza e no estilo de vida, garantindo que cada conteúdo tenha um impacto diferenciado na vida de quem me acompanha. Unindo o Design de Moda, área em que me aperfeiçoou academicamente, e a minha paixão por comunicar, chego à criação de diálogos reais com meu público.',
      'Como experiência diferenciada, a fluidez cultural em dominar o idioma espanhol, além do meu idioma nativo, o português, me leva a alcançar um público maior. O meu objetivo não é apenas a propaganda, mas sim a construção de uma comunicação genuína que traduza a alma das marcas com as quais trabalho.',
    ],
    // `value` can be a list: the line then alternates between its entries.
    skills: [
      { label: 'Formação', value: 'Design de Moda' },
      { label: 'Olhar', value: 'Estética visual' },
      { label: 'Idiomas', value: ['Português nativo', 'Español fluido'] },
      { label: 'Voz', value: 'Comunicação genuína' },
    ],
  },
  catalog: {
    eyebrow: 'Portfólio visual',
    title: { pre: 'Catálogo de ', em: 'conteúdos', post: '' },
    formats: {
      unboxing: { name: 'Unboxing', blurb: 'Recebidos, primeiras impressões e reviews sinceras.' },
      provadores: { name: 'Provadores', blurb: 'Looks testados no provador, direto das lojas.' },
      grwm: { name: 'GRWM', blurb: 'Arrume-se comigo: rotina, beleza e o look do dia.' },
    },
  },
  mediakit: {
    eyebrow: 'Media Kit',
    title: { pre: 'Dados de ', em: 'audiência', post: '' },
    periodAria: 'Período dos dados',
    periods: {
      mensal: { label: 'Mensal', note: 'Período recente · TikTok 60 dias, Instagram 90 dias' },
      anual: { label: 'Anual', note: 'Acumulado de 365 dias · Instagram + TikTok' },
    },
    reach: 'Alcance único',
    uniqueViewers: 'Espectadores únicos',
    highlights: 'Destaques',
    newViewers: 'Novos espectadores',
    videoViews: 'Visualizações de vídeo',
    international: 'Alcance internacional',
    followers: 'Seguidores',
    onlyAnnual: 'disponível na visão anual',
    gender: 'Gênero',
    genders: { women: 'Mulheres', men: 'Homens' },
    interests: 'Interesses',
    interestList: ['Moda', 'Autocuidado', 'Lifestyle'],
    location: 'Localização',
    countries: {
      BRA: 'Brasil',
      PER: 'Peru',
      BOL: 'Bolívia',
      MEX: 'México',
      ECU: 'Equador',
      USA: 'Estados Unidos',
    },
    otherCountries: 'Outros países',
    mapAria: 'Mapa das Américas com a audiência por país',
  },
  partnership: {
    eyebrow: 'Parcerias · Curadorias',
    // Read after the brand count: "07 marcas que já criaram comigo".
    headline: { line1: 'marcas que já', em: 'criaram comigo' },
    categories: { beauty: 'Beleza', fashion: 'Moda', selfcare: 'Autocuidado' },
    slot: {
      placeholder: 'Sua marca',
      yourTurn: 'Sua vez',
      next: 'Próxima parceria',
      ariaEmpty: 'Sua marca: escrever a proposta',
      ariaFilled: 'continuar a proposta',
    },
    proposalEyebrow: 'Proposta',
    title: { line1: 'Vamos criar', em: 'juntos', tail: '?' },
    intro:
      'Aberta a parcerias com marcas de moda, beleza e lifestyle que compartilhem da mesma visão de elegância e autenticidade. Escreva o nome da sua marca na frase e veja-a ocupar o lugar reservado entre as parceiras.',
    follow: 'Siga nas redes',
  },
  proposal: {
    header: 'Proposta de parceria',
    reply: 'Resposta em até 48h',
    // The sentence: [hello] {brand} [create] {format} [for] {platform} [start] {timing} [end]
    sentence: {
      hello: 'Olá, Yasmin! Somos a',
      create: 'e queremos criar um conteúdo de',
      for: 'para',
      start: ', com início',
      end: '.',
    },
    brandPlaceholder: 'sua marca',
    brandAria: 'Nome da sua marca',
    formats: ['Unboxing', 'Provadores', 'GRWM', 'Outro formato'],
    platforms: ['o TikTok', 'o Instagram', 'as duas redes'],
    timings: ['este mês', 'no próximo mês', 'a combinar'],
    choiceNames: { format: 'Formato', platform: 'Plataforma', timing: 'Início' },
    choiceHint: 'Clique para trocar.',
    hint: 'Toque nas palavras sublinhadas para trocar.',
    copyAria: 'Copiar o e-mail',
    copied: 'E-mail copiado',
    send: 'Enviar proposta',
    // The e-mail the button opens. {brand} {format} {platform} {timing} are
    // filled in from the sentence.
    email: {
      subject: 'Proposta de parceria',
      brandFallback: '[sua marca]',
      body: 'Olá, Yasmin!\n\nSomos a {brand} e queremos criar um conteúdo de {format} para {platform}, com início {timing}.\n\n[Conte um pouco mais sobre a campanha]\n',
    },
  },
  footer: { rights: 'Todos os direitos reservados' },
}

export default pt
