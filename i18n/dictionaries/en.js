// English. Mirrors pt.js key by key.
const en = {
  htmlLang: 'en',
  name: 'English',
  meta: {
    title: 'Yasmin Talita — Sereia Movin',
    description: 'Fashion · Lifestyle · Content Creator',
  },
  // Number formatting for the Media Kit figures.
  format: { locale: 'en-US', thousand: 'K', million: 'M', unitSpace: false },
  nav: {
    links: { about: 'About', catalog: 'Catalogue', mediakit: 'Media Kit', partnership: 'Partnerships' },
    menu: 'Menu',
    language: 'Language',
    backToTop: 'Back to top',
  },
  hero: {
    eyebrow: 'Fashion · Lifestyle · Content Creator',
    slides: {
      fashion: ['FASHION & LIFESTYLE'],
      beauty: ['BEAUTY'],
      selfcare: ['SELF-CARE'],
      together: ["LET'S WORK", 'TOGETHER?'],
    },
    cta: 'Send a proposal',
  },
  partners: { label: 'Partner brands' },
  about: {
    eyebrow: 'About me',
    // Heading: [pre][em][post] on the first line, then line2.
    title: { pre: 'An ', em: 'authentic', post: ' style', line2: 'in the contemporary world' },
    paragraphs: [
      'As a content creator, I have a command of visual aesthetics and apply it with precision to fashion, beauty and lifestyle, so that every piece of content makes a distinct impact on the lives of the people who follow me. Combining Fashion Design, the field I trained in academically, with my passion for communicating, I create real conversations with my audience.',
      'What sets my work apart is cultural fluency: I speak Spanish as well as my native Portuguese, which lets me reach a wider audience. My goal is not just advertising, but building genuine communication that conveys the soul of the brands I work with.',
    ],
    // `value` can be a list: the line then alternates between its entries.
    skills: [
      { label: 'Education', value: 'Fashion Design' },
      { label: 'Eye', value: 'Visual aesthetics' },
      { label: 'Languages', value: ['Native Portuguese', 'Fluent Spanish'] },
      { label: 'Voice', value: 'Genuine communication' },
    ],
  },
  catalog: {
    eyebrow: 'Visual portfolio',
    title: { pre: 'Content ', em: 'catalogue', post: '' },
    formats: {
      unboxing: { name: 'Unboxing', blurb: 'PR packages, first impressions and honest reviews.' },
      provadores: { name: 'Try-ons', blurb: 'Looks tried on in the fitting room, straight from the stores.' },
      grwm: { name: 'GRWM', blurb: 'Get ready with me: routine, beauty and the look of the day.' },
    },
  },
  mediakit: {
    eyebrow: 'Media Kit',
    title: { pre: 'Audience ', em: 'data', post: '' },
    periodAria: 'Data period',
    periods: {
      mensal: { label: 'Monthly', note: 'Recent period · TikTok 60 days, Instagram 90 days' },
      anual: { label: 'Annual', note: 'Last 365 days · Instagram + TikTok' },
    },
    reach: 'Unique reach',
    uniqueViewers: 'Unique viewers',
    highlights: 'Highlights',
    newViewers: 'New viewers',
    videoViews: 'Video views',
    international: 'International reach',
    followers: 'Followers',
    onlyAnnual: 'available in the annual view',
    gender: 'Gender',
    genders: { women: 'Women', men: 'Men' },
    interests: 'Interests',
    interestList: ['Fashion', 'Self-care', 'Lifestyle'],
    location: 'Location',
    countries: {
      BRA: 'Brazil',
      PER: 'Peru',
      BOL: 'Bolivia',
      MEX: 'Mexico',
      ECU: 'Ecuador',
      USA: 'United States',
    },
    otherCountries: 'Other countries',
    mapAria: 'Map of the Americas showing the audience by country',
  },
  partnership: {
    eyebrow: 'Partnerships · Curation',
    // Read after the brand count: "07 brands have already created with me".
    headline: { line1: 'brands have already', em: 'created with me' },
    categories: { beauty: 'Beauty', fashion: 'Fashion', selfcare: 'Self-care' },
    slot: {
      placeholder: 'Your brand',
      yourTurn: 'Your turn',
      next: 'Next partnership',
      ariaEmpty: 'Your brand: write the proposal',
      ariaFilled: 'continue the proposal',
    },
    proposalEyebrow: 'Proposal',
    title: { line1: 'Shall we create', em: 'together', tail: '?' },
    intro:
      'Open to partnerships with fashion, beauty and lifestyle brands that share the same vision of elegance and authenticity. Write your brand’s name in the sentence and watch it take the place reserved among the partners.',
    follow: 'Follow along',
  },
  proposal: {
    header: 'Partnership proposal',
    reply: 'Reply within 48h',
    // The sentence: [hello] {brand} [create] {format} [for] {platform} [start] {timing} [end]
    sentence: {
      hello: 'Hi Yasmin! We are',
      create: 'and we’d like to create',
      for: 'for',
      start: ', starting',
      end: '.',
    },
    brandPlaceholder: 'your brand',
    brandAria: 'Your brand’s name',
    formats: ['an Unboxing', 'a Try-on', 'a GRWM', 'another format'],
    platforms: ['TikTok', 'Instagram', 'both platforms'],
    timings: ['this month', 'next month', 'on a date to be agreed'],
    choiceNames: { format: 'Format', platform: 'Platform', timing: 'Start' },
    choiceHint: 'Click to change.',
    hint: 'Tap the underlined words to change them.',
    copyAria: 'Copy the e-mail address',
    copied: 'E-mail copied',
    send: 'Send proposal',
    // The e-mail the button opens. {brand} {format} {platform} {timing} are
    // filled in from the sentence.
    email: {
      subject: 'Partnership proposal',
      brandFallback: '[your brand]',
      body: 'Hi Yasmin!\n\nWe are {brand} and we’d like to create {format} for {platform}, starting {timing}.\n\n[Tell us a little more about the campaign]\n',
    },
  },
  footer: { rights: 'All rights reserved' },
}

export default en
