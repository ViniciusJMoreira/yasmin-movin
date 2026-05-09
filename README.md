# Yasmin Movin — Next.js

Sito portfolio di Yasmin Movin (@sereiamovin), content creator di moda.

## Struttura del progetto

```
yasmin-movin/
├── app/
│   ├── layout.js        # Root layout con font Google
│   └── page.js          # Pagina principale
├── components/
│   ├── Cursor.js        # Cursore doppio con ring a inerzia
│   ├── Preloader.js     # Schermata di caricamento animata
│   ├── Nav.js           # Navbar fissa + menu hamburger mobile
│   ├── Hero.js          # Hero split: testo + frame foto 3D
│   ├── About.js         # Sezione about con feat cards 3D tilt
│   ├── Video.js         # Player video (YouTube/TikTok/mp4)
│   ├── Catalog.js       # Griglia portfolio + filtri + modal
│   ├── Collabs.js       # Sezione collaborazioni
│   ├── MediaKit.js      # Media kit con stats e barre animate
│   ├── Contact.js       # Sezione contatto
│   └── Footer.js        # Footer
├── hooks/
│   └── useReveal.js     # Hook scroll reveal con IntersectionObserver
├── public/
│   └── images/
│       └── yasmin.jpg   # Foto principale (sostituisci con la foto reale)
├── styles/
│   └── globals.css      # Tutti gli stili + animazioni CSS
└── next.config.js
```

## Come avviare in locale

```bash
npm install
npm run dev
```

Apri http://localhost:3000

## Deploy su Vercel (gratis)

```bash
# 1. Crea repo su GitHub e fai push
git init
git add .
git commit -m "first commit"
git remote add origin https://github.com/tuonome/yasmin-movin.git
git push -u origin main

# 2. Vai su vercel.com → Import Project → seleziona il repo
# Vercel detecta Next.js automaticamente → Deploy in 30 secondi
```

## Personalizzare i contenuti

- **Foto principale**: sostituisci `/public/images/yasmin.jpg`
- **Stats contatori**: in `Hero.js` cambia i valori `93, 829, 47`
- **Handle social**: cerca `@sereiamovin` e `@yasminmovin` in `Contact.js` e `Nav.js`
- **Email**: cerca `contato@sereiamovin.com`
- **Catalog items**: in `Catalog.js` modifica l'array `INITIAL`
- **Colori**: tutte le variabili CSS sono in `styles/globals.css` sotto `:root`
