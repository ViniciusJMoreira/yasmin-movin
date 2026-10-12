// Spanish. Mirrors pt.js key by key.
const es = {
  htmlLang: 'es',
  name: 'Español',
  meta: {
    title: 'Yasmin Talita — Sereia Movin',
    description: 'Moda · Lifestyle · Creadora de contenido',
  },
  // Number formatting for the Media Kit figures.
  format: { locale: 'es-ES', thousand: 'mil', million: 'M', unitSpace: true },
  nav: {
    links: { about: 'Sobre mí', catalog: 'Catálogo', mediakit: 'Media Kit', partnership: 'Colaboraciones' },
    menu: 'Menú',
    language: 'Idioma',
    backToTop: 'Volver arriba',
  },
  hero: {
    eyebrow: 'Fashion · Lifestyle · Content Creator',
    slides: {
      fashion: ['MODA & LIFESTYLE'],
      beauty: ['BELLEZA'],
      selfcare: ['AUTOCUIDADO'],
      together: ['¿TRABAJAMOS', 'JUNTOS?'],
    },
    cta: 'Enviar propuesta',
  },
  partners: { label: 'Marcas colaboradoras' },
  about: {
    eyebrow: 'Sobre mí',
    // Heading: [pre][em][post] on the first line, then line2.
    title: { pre: 'Un estilo ', em: 'auténtico', post: '', line2: 'en el mundo contemporáneo' },
    paragraphs: [
      'Como creadora de contenido domino la estética visual y la aplico con precisión en la moda, la belleza y el estilo de vida, para que cada contenido tenga un impacto diferente en la vida de quienes me siguen. Uniendo el Diseño de Moda, área en la que me formé académicamente, y mi pasión por comunicar, llego a crear diálogos reales con mi público.',
      'Como experiencia diferencial, la fluidez cultural de dominar el español, además de mi idioma nativo, el portugués, me permite llegar a un público más amplio. Mi objetivo no es solo la publicidad, sino construir una comunicación genuina que traduzca el alma de las marcas con las que trabajo.',
    ],
    // `value` can be a list: the line then alternates between its entries.
    skills: [
      { label: 'Formación', value: 'Diseño de Moda' },
      { label: 'Mirada', value: 'Estética visual' },
      { label: 'Idiomas', value: ['Portugués nativo', 'Español fluido'] },
      { label: 'Voz', value: 'Comunicación genuina' },
    ],
  },
  catalog: {
    eyebrow: 'Portafolio visual',
    title: { pre: 'Catálogo de ', em: 'contenidos', post: '' },
    formats: {
      unboxing: { name: 'Unboxing', blurb: 'Recibidos, primeras impresiones y reseñas sinceras.' },
      provadores: { name: 'Probadores', blurb: 'Looks probados en el probador, directo desde las tiendas.' },
      grwm: { name: 'GRWM', blurb: 'Arréglate conmigo: rutina, belleza y el look del día.' },
    },
  },
  mediakit: {
    eyebrow: 'Media Kit',
    title: { pre: 'Datos de ', em: 'audiencia', post: '' },
    periodAria: 'Periodo de los datos',
    periods: {
      mensal: { label: 'Mensual', note: 'Periodo reciente · TikTok 60 días, Instagram 90 días' },
      anual: { label: 'Anual', note: 'Acumulado de 365 días · Instagram + TikTok' },
    },
    reach: 'Alcance único',
    uniqueViewers: 'Espectadores únicos',
    highlights: 'Destacados',
    newViewers: 'Nuevos espectadores',
    videoViews: 'Visualizaciones de video',
    international: 'Alcance internacional',
    followers: 'Seguidores',
    onlyAnnual: 'disponible en la vista anual',
    gender: 'Género',
    genders: { women: 'Mujeres', men: 'Hombres' },
    interests: 'Intereses',
    interestList: ['Moda', 'Autocuidado', 'Lifestyle'],
    location: 'Ubicación',
    countries: {
      BRA: 'Brasil',
      PER: 'Perú',
      BOL: 'Bolivia',
      MEX: 'México',
      ECU: 'Ecuador',
      USA: 'Estados Unidos',
    },
    otherCountries: 'Otros países',
    mapAria: 'Mapa de las Américas con la audiencia por país',
  },
  partnership: {
    eyebrow: 'Colaboraciones · Curadurías',
    // Read after the brand count: "07 marcas que ya crearon conmigo".
    headline: { line1: 'marcas que ya', em: 'crearon conmigo' },
    categories: { beauty: 'Belleza', fashion: 'Moda', selfcare: 'Autocuidado' },
    slot: {
      placeholder: 'Tu marca',
      yourTurn: 'Tu turno',
      next: 'Próxima colaboración',
      ariaEmpty: 'Tu marca: escribir la propuesta',
      ariaFilled: 'continuar la propuesta',
    },
    proposalEyebrow: 'Propuesta',
    title: { line1: '¿Creamos', em: 'juntos', tail: '?' },
    intro:
      'Abierta a colaboraciones con marcas de moda, belleza y lifestyle que compartan la misma visión de elegancia y autenticidad. Escribe el nombre de tu marca en la frase y mírala ocupar el lugar reservado entre las marcas colaboradoras.',
    follow: 'Sígueme en redes',
  },
  proposal: {
    header: 'Propuesta de colaboración',
    reply: 'Respuesta en hasta 48 h',
    // The sentence: [hello] {brand} [create] {format} [for] {platform} [start] {timing} [end]
    sentence: {
      hello: '¡Hola, Yasmin! Somos',
      create: 'y queremos crear un contenido de',
      for: 'para',
      start: ', con inicio',
      end: '.',
    },
    brandPlaceholder: 'tu marca',
    brandAria: 'Nombre de tu marca',
    formats: ['Unboxing', 'Probadores', 'GRWM', 'otro formato'],
    platforms: ['TikTok', 'Instagram', 'las dos redes'],
    timings: ['este mes', 'el próximo mes', 'por definir'],
    choiceNames: { format: 'Formato', platform: 'Plataforma', timing: 'Inicio' },
    choiceHint: 'Haz clic para cambiar.',
    hint: 'Toca las palabras subrayadas para cambiarlas.',
    copyAria: 'Copiar el correo',
    copied: 'Correo copiado',
    send: 'Enviar propuesta',
    // The e-mail the button opens. {brand} {format} {platform} {timing} are
    // filled in from the sentence.
    email: {
      subject: 'Propuesta de colaboración',
      brandFallback: '[tu marca]',
      body: '¡Hola, Yasmin!\n\nSomos {brand} y queremos crear un contenido de {format} para {platform}, con inicio {timing}.\n\n[Cuéntanos un poco más sobre la campaña]\n',
    },
  },
  footer: { rights: 'Todos los derechos reservados' },
}

export default es
