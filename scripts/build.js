// Static site builder for Angel Brandão Beauty (NL). Run: node scripts/build.js
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const SITE = {
  domain: 'https://www.angelbrandao.nl', // TODO: replace once the domain is registered
  name: 'Angel Brandão Beauty',
  phone: '+31612324463',
  phoneDisplay: '+31 6 12324463',
  whatsapp: 'https://wa.me/31612324463',
  instagram: 'https://www.instagram.com/anggel_brandao',
  facebook: 'https://www.facebook.com/106613280774555',
  address: { street: 'Zadelmakerstraat 49', zip: '1315 AN', city: 'Almere', clinic: 'Beauty Clinique Almere' },
  maps: 'https://www.google.com/maps/search/?api=1&query=Zadelmakerstraat+49+1315AN+Almere',
  kvk: '42151244',
};

const wa = (text) => `${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
const CTA_DEFAULT = wa('Hoi Angel! Ik wil graag een gratis consult inplannen voor permanente make-up.');

// ---------- content ----------
const treatments = [
  {
    slug: 'nano-brows', icon: '02-nano-blading', name: 'Nano Brows', short: 'Haartje voor haartje, superfijn en natuurlijk.',
    title: 'Nano Brows Almere | Natuurlijke hairstroke wenkbrauwen',
    description: 'Nano brows (nanoblading) in Almere: ultrafijne haartjes met een digitale machine voor wenkbrauwen die niet van echt te onderscheiden zijn. Gratis consult, 7+ jaar ervaring.',
    h1: 'Nano Brows in Almere',
    intro: 'Bij nano brows (ook wel nanoblading) teken ik met een digitale machine en een ultrafijne naald losse haartjes in de huid. De haartjes volgen jouw natuurlijke haargroei, waardoor het resultaat niet van echt te onderscheiden is. Perfect als je dunne of ongelijke wenkbrauwen hebt en een subtiele, natuurlijke look wilt.',
    forWho: ['Wenkbrauwen met kale plekjes of een onregelmatige vorm', 'Een natuurlijke look zonder zichtbare "make-up"', 'Normale tot droge huid (bij een vette huid adviseer ik vaak powder of combi brows)', 'Dagelijks wenkbrauwen tekenen beu'],
    facts: [['Duur behandeling', 'ca. 1,5 – 2 uur, inclusief ontwerp'], ['Houdbaarheid', 'ca. 1,5 – 2 jaar, vervaagt geleidelijk'], ['Bijwerking', 'na 6 – 8 weken, inbegrepen in de prijs'], ['Pijn', 'licht; ik werk met verdovende crème']],
    price: { from: 599, now: 350 },
    faq: [
      ['Wat is het verschil tussen nano brows en microblading?', 'Microblading snijdt de haartjes met een handblade in de huid. Bij nano brows gebruik ik een digitale machine met een enkele naald. Dat is zachter voor de huid, bloedt minder, geneest mooier en vervaagt scherper in plaats van grijs of blauw uit te lopen.'],
      ['Ziet het er niet te hard uit?', 'Nee. Direct na de behandeling is de kleur 30 tot 40 procent donkerder dan het eindresultaat. Na ongeveer vier weken zie je de echte, zachte kleur.'],
      ['Kan ik nano brows laten zetten als ik al oude PMU heb?', 'Dat hangt af van hoeveel oud pigment er nog zit. Stuur me een foto via WhatsApp, dan kijk ik of het kan of dat de oude PMU eerst verwijderd moet worden.'],
    ],
  },
  {
    slug: 'powder-brows', icon: '03-shadow', name: 'Powder Brows', short: 'Zachte make-up look, tot 3 jaar.',
    title: 'Powder Brows Almere | Zachte ombré wenkbrauwen',
    description: 'Powder brows (ombré / shadow brows) in Almere: een zachte, gepoederde wenkbrauw alsof je altijd lichte make-up draagt. Geschikt voor elk huidtype, houdbaar tot 3 jaar.',
    h1: 'Powder Brows in Almere',
    intro: 'Powder brows, ook shadow of ombré brows genoemd, geven een zachte, gepoederde wenkbrauw: licht aan het begin en voller naar de staart toe. Het lijkt op wenkbrauwen die je net met poeder of pommade hebt ingevuld, maar dan elke ochtend klaar. Omdat de pigmentatie uit duizenden kleine puntjes bestaat, is deze techniek geschikt voor elk huidtype, ook de vette of rijpere huid.',
    forWho: ['Je vult je wenkbrauwen nu dagelijks in met potlood of poeder', 'Vette, gevoelige of rijpere huid', 'Weinig eigen wenkbrauwhaar', 'Een iets vollere, gedefinieerde look die lang meegaat'],
    facts: [['Duur behandeling', 'ca. 1,5 – 2 uur, inclusief ontwerp'], ['Houdbaarheid', 'ca. 2 – 3 jaar, vervaagt geleidelijk'], ['Bijwerking', 'na 6 – 8 weken, inbegrepen in de prijs'], ['Pijn', 'licht; ik werk met verdovende crème']],
    price: { from: 599, now: 350 },
    faq: [
      ['Worden powder brows niet te donker of te "getekend"?', 'Samen kiezen we de intensiteit. Ik werk altijd zacht en bouw de kleur laag voor laag op. Het eindresultaat is een natuurlijke poederlook, geen blokwenkbrauw.'],
      ['Hoe lang duurt het genezen?', 'De eerste 7 tot 10 dagen kunnen er lichte korstjes ontstaan. Na ongeveer 4 weken is de huid volledig hersteld en zie je de definitieve kleur.'],
      ['Kan ik daarna nog sporten en zwemmen?', 'De eerste 14 dagen vermijd je zwemmen, sauna en hevig zweten. Daarna kan alles weer gewoon.'],
    ],
  },
  {
    slug: 'combi-brows', icon: '01-micropigmentacao', name: 'Combi Brows', short: 'Het beste van twee technieken.',
    title: 'Combi Brows Almere | Nano haartjes + powder shading',
    description: 'Combi brows in Almere: nano haartjes aan de voorkant voor een natuurlijke start en powder shading voor volheid. De meest gekozen techniek voor een vol én natuurlijk resultaat.',
    h1: 'Combi Brows in Almere',
    intro: 'Combi brows (hybride brows) combineren de twee technieken: aan het begin van de wenkbrauw zet ik fijne nano haartjes voor een natuurlijke, luchtige start, en de rest vul ik met zachte powder shading voor volheid en definitie. Je krijgt het realisme van haartjes en de houdbaarheid en volheid van powder brows in één behandeling.',
    forWho: ['Je wilt een volle wenkbrauw die er tóch natuurlijk uitziet', 'Weinig eigen haar in het midden en de staart', 'Vette of gecombineerde huid waar losse haartjes alleen snel vervagen', 'Je twijfelt tussen nano en powder'],
    facts: [['Duur behandeling', 'ca. 2 uur, inclusief ontwerp'], ['Houdbaarheid', 'ca. 2 – 3 jaar, vervaagt geleidelijk'], ['Bijwerking', 'na 6 – 8 weken, inbegrepen in de prijs'], ['Pijn', 'licht; ik werk met verdovende crème']],
    price: { from: 599, now: 350 },
    faq: [
      ['Is combi duurder dan nano of powder?', 'Nee. Tijdens de huidige actie geldt dezelfde prijs voor alle drie de wenkbrauwtechnieken.'],
      ['Hoe bepalen we welke techniek bij mij past?', 'In het gratis consult kijk ik naar je huidtype, je eigen wenkbrauwhaar en de look die je wilt. Daarna adviseer ik eerlijk welke techniek het mooiste en langst houdt.'],
      ['Teken je de vorm eerst voor?', 'Altijd. Ik meet en teken de vorm met potlood, jij kijkt mee in de spiegel en we passen aan tot jij helemaal tevreden bent. Pas daarna begin ik met pigmenteren.'],
    ],
  },
  {
    slug: 'lip-blush', icon: '03-shadow', name: 'Velvet Lip Blush', short: 'Zachte kleur en definitie, alsof je altijd een beetje lipstick draagt.',
    title: 'Lip Blush Almere | Permanente make-up lippen',
    description: 'Velvet lip blush in Almere: een zachte, natuurlijke lipkleur met meer definitie en een voller effect. Houdbaar 2 tot 3 jaar. Gratis consult bij Angel Brandão.',
    h1: 'Velvet Lip Blush in Almere',
    intro: 'Lip blush is permanente make-up voor de lippen. Ik breng een zachte, transparante kleur aan die je natuurlijke liptint versterkt, de lipcontour subtiel definieert en je lippen optisch voller maakt. Geen harde lijn, maar een velvet effect alsof je net een lip tint hebt gebruikt. Ideaal bij bleke, ongelijke of vervaagde lippen.',
    forWho: ['Bleke of fletse lippen', 'Een onduidelijke of ongelijke lipcontour', 'Je wilt er fris uitzien zonder lipstick', 'Optisch vollere lippen zonder fillers'],
    facts: [['Duur behandeling', 'ca. 2 uur, inclusief ontwerp'], ['Houdbaarheid', 'ca. 2 – 3 jaar'], ['Bijwerking', 'na 6 – 8 weken, inbegrepen in de prijs'], ['Pijn', 'licht; ik werk met verdovende crème']],
    price: { from: 499, now: 249 },
    faq: [
      ['Doet lip blush pijn?', 'De lippen zijn gevoelig, daarom werk ik met een sterke verdovende crème. De meeste klanten ervaren het als licht prikkend.'],
      ['Ik heb weleens een koortslip. Kan ik lip blush laten doen?', 'Ja, maar neem dan vooraf (en na) een antivirale kuur via je huisarts. Dit bespreken we in het consult.'],
      ['Hoe zien mijn lippen eruit de eerste dagen?', 'De eerste 2 tot 3 dagen zijn de lippen feller en licht gezwollen. Daarna vervelt de huid en wordt de kleur zacht. Na ongeveer 4 weken zie je het eindresultaat.'],
    ],
  },
  {
    slug: 'brow-lamination-lash-lift', icon: '04-brow-lamination', name: 'Brow Lamination & Lash Lift', short: 'Volle, gestylede wenkbrauwen en gekrulde wimpers, 6 tot 8 weken lang.',
    title: 'Brow Lamination & Lash Lift Almere',
    description: 'Brow lamination en lash lift in Almere: volle, opgekamde wenkbrauwen en natuurlijk gekrulde wimpers zonder pigment. Resultaat 6 tot 8 weken.',
    h1: 'Brow Lamination & Lash Lift in Almere',
    intro: 'Wil je een vollere, gestylede look zonder permanente make-up? Met brow lamination worden je eigen wenkbrauwhaartjes opgekamd en in vorm gezet, zodat ze voller en netter staan. Een lash lift krult je eigen wimpers vanaf de wortel, voor een open blik zonder mascara of extensions. Beide behandelingen zijn ook perfect te combineren met een tint.',
    forWho: ['Wilde, weerbarstige of platte wenkbrauwhaartjes', 'Rechte wimpers die je dagelijks krult', 'Je wilt eerst een niet-permanente optie proberen', 'Een frisse look voor een bruiloft of vakantie'],
    facts: [['Duur behandeling', 'ca. 45 – 60 minuten'], ['Houdbaarheid', '6 – 8 weken'], ['Onderhoud', 'de eerste 24 uur droog houden'], ['Combineren', 'brow lamination + lash lift in één afspraak mogelijk']],
    price: null,
    faq: [
      ['Is brow lamination slecht voor mijn haartjes?', 'Niet als het goed gebeurt. Ik gebruik professionele producten, houd de inwerktijd nauwkeurig aan en sluit af met een verzorgende olie.'],
      ['Kan ik brow lamination combineren met permanente make-up?', 'Ja, maar niet in dezelfde week. Plan brow lamination minimaal 4 weken na een PMU behandeling.'],
    ],
  },
];

const homeFaq = [
  ['Wat kost permanente make-up voor wenkbrauwen in Almere?', 'Bij Angel Brandão Beauty betaal je tijdens de actie €350 in plaats van €599 voor nano brows, powder brows of combi brows. De bijwerking na 6 tot 8 weken is inbegrepen. Lip blush kost €249 in plaats van €499.'],
  ['Hoe lang blijft permanente make-up zitten?', 'Wenkbrauwen gemiddeld 1,5 tot 3 jaar, afhankelijk van de techniek, je huidtype en zonblootstelling. Lip blush 2 tot 3 jaar. Het pigment vervaagt geleidelijk en kan daarna opgefrist worden.'],
  ['Doet permanente make-up pijn?', 'Ik werk met een verdovende crème. De meeste klanten omschrijven het als licht krassend of prikkend, goed te doen.'],
  ['Is het consult echt gratis?', 'Ja. In het consult bespreken we je wensen, bekijk ik je huid en wenkbrauwen en adviseer ik de beste techniek en kleur. Je beslist daarna pas of je de behandeling wilt.'],
  ['Waar zit de studio?', `In ${SITE.address.clinic}, ${SITE.address.street}, ${SITE.address.zip} ${SITE.address.city} (Almere Centrum), op loopafstand van station Almere Centrum. Behandelingen zijn op afspraak.`],
  ['Werk je hygiënisch en gecertificeerd?', 'Ja. Ik werk uitsluitend met steriele wegwerpnaalden en -materialen, draag handschoenen en volg de hygiënerichtlijnen voor tatoeëren en PMU. Ik ben gecertificeerd in micropigmentatie en heb meer dan 7 jaar ervaring.'],
];

// ---------- helpers ----------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const icon = (name) => `<img class="svc-icon" src="/assets/icons/${name}-chocolate.png" alt="" width="56" height="56" loading="lazy">`;
const euro = (n) => `€${n}`;

function faqBlock(items, heading = 'Veelgestelde vragen') {
  return `<section class="faq" id="faq"><div class="wrap"><h2>${heading}</h2>
  ${items.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n')}
  </div></section>`;
}
const faqSchema = (items) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});
const businessSchema = () => ({
  '@context': 'https://schema.org', '@type': 'BeautySalon', '@id': `${SITE.domain}/#business`,
  name: SITE.name, url: SITE.domain, telephone: SITE.phone, image: `${SITE.domain}/assets/img/og.jpg`, priceRange: '€€',
  description: 'Permanente make-up specialist in Almere: nano brows, powder brows, combi brows en lip blush. Natuurlijk resultaat, gratis consult.',
  address: { '@type': 'PostalAddress', streetAddress: SITE.address.street, postalCode: SITE.address.zip, addressLocality: SITE.address.city, addressCountry: 'NL' },
  areaServed: ['Almere', 'Amsterdam', 'Lelystad', 'Hilversum', 'Flevoland'],
  sameAs: [SITE.instagram, SITE.facebook], openingHours: 'Mo-Su 09:00-20:00 by appointment',
  makesOffer: treatments.filter((t) => t.price).map((t) => ({ '@type': 'Offer', name: t.name, price: t.price.now, priceCurrency: 'EUR', url: `${SITE.domain}/behandelingen/${t.slug}/` })),
});

function ctaBand(text = 'Benieuwd welke techniek bij jou past?') {
  return `<section class="cta-band"><div class="wrap">
    <h2>${esc(text)}</h2>
    <p>Plan een gratis consult. Ik kijk naar je huid en je wensen en adviseer eerlijk. Je beslist daarna pas.</p>
    <a class="btn btn-gold" href="${CTA_DEFAULT}" target="_blank" rel="noopener">Boek je gratis consult via WhatsApp</a>
    <small>Reactie meestal binnen een paar uur · ${SITE.phoneDisplay}</small>
  </div></section>`;
}

function layout({ title, description, canonical, body, schema = [], ogImage = '/assets/img/og.jpg', bodyClass = '' }) {
  const jsonld = [businessSchema(), ...schema].map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n');
  const navTreat = treatments.map((t) => `<li><a href="/behandelingen/${t.slug}/">${t.name}</a></li>`).join('');
  return `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${SITE.domain}${canonical}">
<meta property="og:type" content="website"><meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${SITE.domain}${canonical}"><meta property="og:image" content="${SITE.domain}${ogImage}"><meta property="og:locale" content="nl_NL">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#3B2A22">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/style.css">
${jsonld}
</head>
<body class="${bodyClass}">
<a class="skip" href="#main">Naar inhoud</a>
<header class="site-header">
  <div class="wrap nav-wrap">
    <a class="brand" href="/" aria-label="Angel Brandão Beauty, home"><span class="mono">AB</span><span class="wordmark">Angel Brandão</span></a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="nav" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
    <nav id="nav" class="nav">
      <ul>
        <li class="has-sub"><a href="/behandelingen/">Behandelingen</a><ul class="sub">${navTreat}</ul></li>
        <li><a href="/prijzen/">Prijzen</a></li>
        <li><a href="/voor-en-na/">Voor &amp; na</a></li>
        <li><a href="/over-angel/">Over Angel</a></li>
        <li><a href="/nazorg/">Nazorg</a></li>
        <li><a href="/contact/">Contact</a></li>
        <li class="nav-cta"><a class="btn btn-gold btn-sm" href="${CTA_DEFAULT}" target="_blank" rel="noopener">Gratis consult</a></li>
      </ul>
    </nav>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <div class="wrap footer-grid">
    <div>
      <div class="brand brand-foot"><span class="mono">AB</span><span class="wordmark">Angel Brandão</span></div>
      <p class="tag">Beauty with purpose</p>
      <p>Permanente make-up specialist in Almere. Natuurlijke wenkbrauwen en lippen, met meer dan 7 jaar ervaring.</p>
    </div>
    <div>
      <h3>Behandelingen</h3>
      <ul>${navTreat}</ul>
    </div>
    <div>
      <h3>Studio</h3>
      <address>${SITE.address.clinic}<br>${SITE.address.street}<br>${SITE.address.zip} ${SITE.address.city}</address>
      <p><a href="${SITE.maps}" target="_blank" rel="noopener">Route via Google Maps</a></p>
      <p>Op afspraak, ook in het weekend.</p>
    </div>
    <div>
      <h3>Contact</h3>
      <p><a href="${SITE.whatsapp}" target="_blank" rel="noopener">WhatsApp ${SITE.phoneDisplay}</a></p>
      <p><a href="${SITE.instagram}" target="_blank" rel="noopener">Instagram @anggel_brandao</a></p>
      <p><a href="/nazorg/">Nazorg</a> · <a href="/contact/#faq">FAQ</a> · <a href="/privacy/">Privacy</a></p>
    </div>
  </div>
  <div class="wrap footer-bottom"><p>© ${new Date().getFullYear()} ${SITE.name} · KvK ${SITE.kvk} · Nederlands · <a href="/">angelbrandao.nl</a></p></div>
</footer>
<a class="wa-float" href="${CTA_DEFAULT}" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><path fill="currentColor" d="M16 3C9.4 3 4 8.3 4 14.9c0 2.3.7 4.6 1.9 6.5L4 29l7.8-2c1.8 1 3.9 1.5 6 1.5 6.6 0 12-5.3 12-11.9S22.6 3 16 3zm0 21.7c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-4.6 1.2 1.2-4.5-.3-.4A9.8 9.8 0 0 1 6 14.9C6 9.4 10.5 5 16 5s10 4.4 10 9.9-4.5 9.8-10 9.8zm5.5-7.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5.3-.5c.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.8.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4l-.6-.3z"/></svg>
</a>
<script>
(function(){var b=document.querySelector('.nav-toggle'),n=document.getElementById('nav');b.addEventListener('click',function(){var o=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',!o);n.classList.toggle('open',!o);});
document.querySelectorAll('.has-sub > a').forEach(function(a){a.addEventListener('click',function(e){if(window.innerWidth<900){e.preventDefault();a.parentElement.classList.toggle('open');}});});})();
</script>
</body>
</html>`;
}

// ---------- pages ----------
function homePage() {
  const cards = treatments.map((t) => `
    <a class="card svc" href="/behandelingen/${t.slug}/">
      ${icon(t.icon)}
      <h3>${t.name}</h3>
      <p>${esc(t.short)}</p>
      ${t.price ? `<p class="price"><s>${euro(t.price.from)}</s> <strong>${euro(t.price.now)}</strong></p>` : '<p class="price"><strong>Prijs op aanvraag</strong></p>'}
      <span class="link">Meer over ${t.name} →</span>
    </a>`).join('');
  const body = `
<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-text">
      <p class="eyebrow">Permanente make-up · Almere Centrum</p>
      <h1>Natuurlijke wenkbrauwen en lippen, elke dag perfect</h1>
      <p class="lead">Nano brows, powder brows, combi brows en lip blush door Angel Brandão. Meer dan 7 jaar ervaring, een zachte hand en een resultaat dat eruitziet alsof het van jou is.</p>
      <div class="hero-actions">
        <a class="btn btn-gold" href="${CTA_DEFAULT}" target="_blank" rel="noopener">Boek je gratis consult</a>
        <a class="btn btn-ghost" href="/behandelingen/">Bekijk behandelingen</a>
      </div>
      <ul class="trust">
        <li>7+ jaar ervaring</li><li>Gratis consult</li><li>Steriel &amp; gecertificeerd</li><li>Bijwerking inbegrepen</li>
      </ul>
    </div>
    <figure class="hero-img">
      <img src="/assets/img/hero.jpg" alt="Angel Brandão aan het werk tijdens een permanente make-up behandeling in Almere" width="1200" height="1400" fetchpriority="high">
    </figure>
  </div>
</section>

<section class="promo">
  <div class="wrap promo-inner">
    <p class="eyebrow light">Tijdelijke actie</p>
    <h2>Wenkbrauwen <s>€599</s> <strong>€350</strong> · Lip blush <s>€499</s> <strong>€249</strong> · Samen <strong>€500</strong></h2>
    <p>Geldt voor nano, powder en combi brows. Inclusief ontwerp, kleuradvies en bijwerking na 6 tot 8 weken. Beperkt aantal plekken.</p>
    <a class="btn btn-light" href="/prijzen/">Alle prijzen</a>
  </div>
</section>

<section class="services" id="behandelingen">
  <div class="wrap">
    <p class="eyebrow">Behandelingen</p>
    <h2>Kies de techniek die bij jou past</h2>
    <p class="sub">Twijfel je? In het gratis consult kijk ik naar je huidtype en je eigen wenkbrauwhaar en adviseer ik eerlijk wat het mooiste en langst houdt.</p>
    <div class="grid-3">${cards}</div>
  </div>
</section>

<section class="why">
  <div class="wrap why-grid">
    <figure><img src="/assets/img/work-11.jpg" alt="Close-up van natuurlijk ogende permanente make-up wenkbrauwen" width="1200" height="1600" loading="lazy"></figure>
    <div>
      <p class="eyebrow">Waarom Angel Brandão</p>
      <h2>Natuurlijk is het enige resultaat dat ik maak</h2>
      <ul class="checks">
        <li><strong>Eerst ontwerpen, dan pigmenteren.</strong> Ik meet en teken de vorm voor. Jij kijkt mee tot het klopt.</li>
        <li><strong>Zacht en laag voor laag.</strong> Liever iets te licht en bijwerken, dan te donker en spijt.</li>
        <li><strong>Steriel en gecertificeerd.</strong> Wegwerpnaalden, handschoenen en hygiëne volgens de richtlijnen.</li>
        <li><strong>Meer dan 7 jaar ervaring</strong> in micropigmentatie en make-up, in Brazilië en Nederland.</li>
        <li><strong>Eerlijk advies.</strong> Past een techniek niet bij je huid, dan zeg ik dat.</li>
      </ul>
      <a class="btn btn-dark" href="/over-angel/">Maak kennis met Angel</a>
    </div>
  </div>
</section>

<section class="gallery">
  <div class="wrap">
    <p class="eyebrow">Voor &amp; na</p>
    <h2>Echte klanten, echte resultaten</h2>
    <div class="grid-3 gal">
      <figure><img src="/assets/img/before-after-3.jpg" alt="Voor en na: nano brows wenkbrauwen van een klant in Almere" width="1313" height="1600" loading="lazy"><figcaption>Nano brows, direct na de behandeling</figcaption></figure>
      <figure><img src="/assets/img/before-after-1.jpg" alt="Voor en na: wenkbrauwen permanente make-up" width="1301" height="1600" loading="lazy"><figcaption>Combi brows</figcaption></figure>
      <figure><img src="/assets/img/work-4.jpg" alt="Natuurlijke hairstroke wenkbrauwen na nano brows" width="1200" height="1600" loading="lazy"><figcaption>Nano brows, na 4 weken</figcaption></figure>
    </div>
    <p class="center"><a class="btn btn-ghost" href="/voor-en-na/">Meer resultaten</a> <a class="btn btn-ghost" href="${SITE.instagram}" target="_blank" rel="noopener">Instagram</a></p>
  </div>
</section>

<section class="steps">
  <div class="wrap">
    <p class="eyebrow">Zo werkt het</p>
    <h2>Van consult tot perfecte wenkbrauwen</h2>
    <ol class="grid-4">
      <li><span>01</span><h3>Gratis consult</h3><p>Via WhatsApp of in de studio. We bespreken je wensen, je huid en de beste techniek.</p></li>
      <li><span>02</span><h3>Ontwerp &amp; kleur</h3><p>Ik meet en teken de vorm en kies samen met jou de pigmentkleur die bij je past.</p></li>
      <li><span>03</span><h3>Behandeling</h3><p>Met verdovende crème, in ca. 1,5 tot 2 uur. Je krijgt duidelijke nazorginstructies mee.</p></li>
      <li><span>04</span><h3>Bijwerking</h3><p>Na 6 tot 8 weken werken we het resultaat bij. Inbegrepen in de prijs.</p></li>
    </ol>
  </div>
</section>

<section class="about-teaser">
  <div class="wrap about-grid">
    <div>
      <p class="eyebrow">Over Angel</p>
      <h2>Hoi, ik ben Angel</h2>
      <p>Braziliaanse make-up artist en permanente make-up specialist, sinds 2026 gevestigd in Almere. Ik werk al meer dan 7 jaar met wenkbrauwen en lippen en geloof in één ding: make-up moet jou mooier maken, niet anders. Daarom werk ik zacht, natuurlijk en altijd in overleg.</p>
      <p>Ik spreek Nederlands, Engels en Portugees.</p>
      <a class="btn btn-dark" href="/over-angel/">Lees mijn verhaal</a>
    </div>
    <figure><img src="/assets/img/work-6.jpg" alt="Angel Brandão tijdens een behandeling met ringlamp" width="1202" height="1600" loading="lazy"></figure>
  </div>
</section>

${faqBlock(homeFaq)}
${ctaBand()}
`;
  return layout({
    title: 'Permanente make-up Almere | Nano, Powder & Combi Brows | Angel Brandão',
    description: 'Permanente make-up in Almere Centrum: nano brows, powder brows, combi brows en lip blush met een natuurlijk resultaat. 7+ jaar ervaring, gratis consult, actie €350.',
    canonical: '/', body, schema: [faqSchema(homeFaq)], bodyClass: 'home',
  });
}

function treatmentPage(t) {
  const others = treatments.filter((o) => o.slug !== t.slug).map((o) => `<li><a href="/behandelingen/${o.slug}/">${o.name}</a></li>`).join('');
  const body = `
<section class="page-hero">
  <div class="wrap">
    <p class="eyebrow"><a href="/behandelingen/">Behandelingen</a> · ${t.name}</p>
    <h1>${esc(t.h1)}</h1>
    <p class="lead">${esc(t.intro)}</p>
    <div class="hero-actions">
      <a class="btn btn-gold" href="${wa(`Hoi Angel! Ik heb interesse in ${t.name}. Kan ik een gratis consult inplannen?`)}" target="_blank" rel="noopener">Gratis consult voor ${t.name}</a>
      ${t.price ? `<span class="price-pill"><s>${euro(t.price.from)}</s> <strong>${euro(t.price.now)}</strong> actieprijs</span>` : ''}
    </div>
  </div>
</section>
<section class="two-col">
  <div class="wrap two-grid">
    <div>
      <h2>Voor wie is ${t.name}?</h2>
      <ul class="checks">${t.forWho.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
      <h2>Goed om te weten</h2>
      <dl class="facts">${t.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
    </div>
    <figure class="sticky"><img src="/assets/img/${{'nano-brows':'work-4.jpg','powder-brows':'work-16.jpg','combi-brows':'work-7.jpg','lip-blush':'work-48.jpg','brow-lamination-lash-lift':'work-14.jpg'}[t.slug]}" alt="${esc(t.name)} resultaat" width="900" height="1200" loading="lazy"></figure>
  </div>
</section>
<section class="steps alt">
  <div class="wrap">
    <h2>Hoe verloopt de behandeling?</h2>
    <ol class="grid-4">
      <li><span>01</span><h3>Consult</h3><p>Gratis. Wensen, huidtype, gezondheid en verwachtingen. Eerlijk advies over de techniek.</p></li>
      <li><span>02</span><h3>Ontwerp</h3><p>Ik meet je gezicht en teken de vorm voor. Jij kijkt mee en we passen aan tot het klopt.</p></li>
      <li><span>03</span><h3>Pigmenteren</h3><p>Met verdovende crème en steriele wegwerpmaterialen. Rustig, laag voor laag.</p></li>
      <li><span>04</span><h3>Nazorg &amp; bijwerking</h3><p>Duidelijke <a href="/nazorg/">nazorginstructies</a> en een bijwerking na 6 tot 8 weken, inbegrepen.</p></li>
    </ol>
  </div>
</section>
${faqBlock(t.faq, `Vragen over ${t.name}`)}
<section class="related"><div class="wrap"><h2>Andere behandelingen</h2><ul class="pills">${others}</ul></div></section>
${ctaBand(`Klaar voor ${t.name}?`)}
`;
  const schema = [faqSchema(t.faq), {
    '@context': 'https://schema.org', '@type': 'Service', name: `${t.name} Almere`, serviceType: t.name, provider: { '@id': `${SITE.domain}/#business` },
    areaServed: 'Almere', description: t.description, url: `${SITE.domain}/behandelingen/${t.slug}/`,
    ...(t.price ? { offers: { '@type': 'Offer', price: t.price.now, priceCurrency: 'EUR', priceValidUntil: '2026-12-31' } } : {}),
  }];
  return layout({ title: t.title, description: t.description, canonical: `/behandelingen/${t.slug}/`, body, schema });
}

function treatmentsIndex() {
  const cards = treatments.map((t) => `<a class="card svc" href="/behandelingen/${t.slug}/">${icon(t.icon)}<h2>${t.name}</h2><p>${esc(t.short)}</p>${t.price ? `<p class="price"><s>${euro(t.price.from)}</s> <strong>${euro(t.price.now)}</strong></p>` : '<p class="price"><strong>Prijs op aanvraag</strong></p>'}<span class="link">Bekijk →</span></a>`).join('');
  const body = `<section class="page-hero"><div class="wrap"><p class="eyebrow">Behandelingen</p><h1>Permanente make-up behandelingen in Almere</h1><p class="lead">Wenkbrauwen in drie technieken, lip blush en niet-permanente opties zoals brow lamination en lash lift. Alles met een natuurlijk resultaat en een gratis consult vooraf.</p></div></section>
<section class="services"><div class="wrap"><div class="grid-3">${cards}</div></div></section>
<section class="compare"><div class="wrap"><h2>Nano, powder of combi: wat past bij jou?</h2>
<div class="table-wrap"><table>
<thead><tr><th></th><th>Nano Brows</th><th>Powder Brows</th><th>Combi Brows</th></tr></thead>
<tbody>
<tr><th>Look</th><td>Losse, fijne haartjes</td><td>Zachte poeder / make-up look</td><td>Haartjes vooraan, poeder achter</td></tr>
<tr><th>Huidtype</th><td>Normaal tot droog</td><td>Alle huidtypes, ook vet</td><td>Alle huidtypes</td></tr>
<tr><th>Eigen haar</th><td>Liefst wat eigen haar</td><td>Weinig tot geen</td><td>Weinig tot gemiddeld</td></tr>
<tr><th>Houdbaarheid</th><td>1,5 – 2 jaar</td><td>2 – 3 jaar</td><td>2 – 3 jaar</td></tr>
<tr><th>Actieprijs</th><td>€350</td><td>€350</td><td>€350</td></tr>
</tbody></table></div></div></section>
${ctaBand()}`;
  return layout({ title: 'Behandelingen | Permanente make-up Almere | Angel Brandão', description: 'Overzicht van alle PMU behandelingen bij Angel Brandão in Almere: nano brows, powder brows, combi brows, lip blush, brow lamination en lash lift. Met vergelijking en prijzen.', canonical: '/behandelingen/', body });
}

function pricesPage() {
  const rows = [
    ['Nano Brows', '€599', '€350', 'incl. ontwerp, kleuradvies en bijwerking na 6 – 8 weken'],
    ['Powder Brows', '€599', '€350', 'incl. ontwerp, kleuradvies en bijwerking na 6 – 8 weken'],
    ['Combi Brows', '€599', '€350', 'incl. ontwerp, kleuradvies en bijwerking na 6 – 8 weken'],
    ['Velvet Lip Blush', '€499', '€249', 'incl. ontwerp en bijwerking na 6 – 8 weken'],
    ['Wenkbrauwen + lippen (combi deal)', '€1.098', '€500', 'twee behandelingen, twee bijwerkingen'],
    ['Opfrisbehandeling (eigen klanten, binnen 2 jaar)', '', 'op aanvraag', 'afhankelijk van hoeveel pigment er nog zit'],
    ['Brow lamination', '', 'op aanvraag', 'ca. 45 – 60 min'],
    ['Lash lift', '', 'op aanvraag', 'ca. 45 – 60 min'],
  ];
  const body = `<section class="page-hero"><div class="wrap"><p class="eyebrow">Prijzen</p><h1>Prijzen permanente make-up Almere</h1><p class="lead">Eerlijke prijzen, zonder verrassingen. De bijwerking na 6 tot 8 weken zit altijd bij de prijs in. Het consult is gratis en vrijblijvend.</p></div></section>
<section class="prices"><div class="wrap"><div class="table-wrap"><table class="price-table">
<thead><tr><th>Behandeling</th><th>Normaal</th><th>Actieprijs</th><th>Inbegrepen</th></tr></thead>
<tbody>${rows.map(([n, f, p, i]) => `<tr><th>${n}</th><td>${f ? `<s>${f}</s>` : ''}</td><td><strong>${p}</strong></td><td>${i}</td></tr>`).join('')}</tbody></table></div>
<p class="note">Actieprijzen gelden zolang er plekken beschikbaar zijn. Betalen kan met pin, Tikkie of contant. Een afspraak kosteloos verzetten kan tot 48 uur van tevoren.</p>
</div></section>
${faqBlock([
  ['Zit de bijwerking echt bij de prijs in?', 'Ja. De bijwerking na 6 tot 8 weken is nodig voor een mooi, gelijkmatig resultaat en is altijd inbegrepen.'],
  ['Moet ik een aanbetaling doen?', 'Voor een behandeling vraag ik een aanbetaling van €50 om de afspraak vast te zetten. Dit bedrag gaat van de totaalprijs af.'],
  ['Wat als ik al oude permanente make-up heb?', 'Stuur een foto via WhatsApp. Soms kan ik eroverheen werken, soms moet het oude pigment eerst (laser)verwijderd worden. Dat bespreken we eerlijk in het consult.'],
], 'Vragen over prijzen')}
${ctaBand()}`;
  return layout({ title: 'Prijzen permanente make-up Almere | Angel Brandão', description: 'Prijzen voor nano brows, powder brows, combi brows en lip blush in Almere. Actie: wenkbrauwen €350 i.p.v. €599, lip blush €249. Bijwerking inbegrepen, gratis consult.', canonical: '/prijzen/', body });
}

function galleryPage() {
  const imgs = [
    ['before-after-3.jpg', 'Nano brows, voor en direct na de behandeling'],
    ['before-after-1.jpg', 'Combi brows, voor en na'],
    ['work-11.jpg', 'Wenkbrauwen na de behandeling'],
    ['work-4.jpg', 'Natuurlijke hairstrokes'],
    ['work-16.jpg', 'Vorm en kleur op maat'],
    ['work-7.jpg', 'Zacht, gelijkmatig resultaat'],
    ['work-3.jpg', 'Ontwerp vooraf met de klant'],
  ];
  const body = `<section class="page-hero"><div class="wrap"><p class="eyebrow">Voor &amp; na</p><h1>Resultaten permanente make-up</h1><p class="lead">Echte klanten uit Almere en omgeving, gefotografeerd met toestemming. Direct na de behandeling is de kleur altijd donkerder; na 4 weken zie je het zachte eindresultaat.</p></div></section>
<section class="gallery"><div class="wrap"><div class="grid-3 gal">${imgs.map(([f, c]) => `<figure><img src="/assets/img/${f}" alt="${esc(c)}" loading="lazy"><figcaption>${esc(c)}</figcaption></figure>`).join('')}</div>
<p class="center">Meer dagelijkse resultaten op <a href="${SITE.instagram}" target="_blank" rel="noopener">Instagram @anggel_brandao</a>.</p></div></section>
${ctaBand('Wil jij dit ook?')}`;
  return layout({ title: 'Voor & na foto\'s | Permanente make-up Almere | Angel Brandão', description: 'Bekijk voor en na foto\'s van nano brows, powder brows, combi brows en lip blush bij Angel Brandão in Almere.', canonical: '/voor-en-na/', body });
}

function aboutPage() {
  const body = `<section class="page-hero"><div class="wrap"><p class="eyebrow">Over Angel</p><h1>Beauty with purpose</h1><p class="lead">Ik ben Angel Brandão, make-up artist en permanente make-up specialist. Geboren in Brazilië, sinds 2026 thuis in Almere.</p></div></section>
<section class="two-col"><div class="wrap two-grid">
<div class="prose">
<p>Mijn carrière begon met bruids- en avondmake-up. Honderden gezichten, honderden verschillende wensen. Daar leerde ik het belangrijkste wat ik nu dagelijks gebruik: elk gezicht heeft zijn eigen lijnen, en make-up werkt alleen als het die lijnen respecteert.</p>
<p>Meer dan 7 jaar geleden specialiseerde ik me in micropigmentatie. Wenkbrauwen en lippen die er elke ochtend al goed uitzien, zonder dat iemand ziet dat het permanente make-up is. Dat is mijn enige doel bij elke behandeling.</p>
<h2>Hoe ik werk</h2>
<ul class="checks">
<li><strong>Rustig en in overleg.</strong> Ik teken eerst, jij kijkt mee, en ik begin pas als jij blij bent met de vorm.</li>
<li><strong>Natuurlijk boven alles.</strong> Zachte kleuren, fijne haartjes, nooit te donker. Bijwerken kan altijd, weghalen niet.</li>
<li><strong>Hygiëne zonder compromis.</strong> Steriele wegwerpnaalden, handschoenen, schone werkplek, volgens de richtlijnen voor PMU.</li>
<li><strong>Eerlijk advies.</strong> Past een techniek niet bij jouw huid of wens, dan zeg ik dat, ook als dat betekent dat je niets laat doen.</li>
</ul>
<h2>Praktisch</h2>
<p>Ik werk in ${SITE.address.clinic} aan de ${SITE.address.street} in Almere Centrum, op afspraak en ook in het weekend. Ik spreek Nederlands, Engels en Portugees.</p>
<p>Ingeschreven bij de KvK onder nummer ${SITE.kvk}.</p>
</div>
<figure class="sticky"><img src="/assets/img/work-6.jpg" alt="Angel Brandão aan het werk" width="1202" height="1600" loading="lazy"></figure>
</div></section>
${ctaBand('Zullen we kennismaken?')}`;
  return layout({ title: 'Over Angel Brandão | Permanente make-up specialist Almere', description: 'Maak kennis met Angel Brandão, permanente make-up specialist in Almere met meer dan 7 jaar ervaring in micropigmentatie en make-up. Natuurlijk, zacht en eerlijk.', canonical: '/over-angel/', body });
}

function aftercarePage() {
  const body = `<section class="page-hero"><div class="wrap"><p class="eyebrow">Nazorg</p><h1>Nazorg permanente make-up</h1><p class="lead">Goede nazorg bepaalt de helft van je resultaat. Dit zijn mijn instructies voor wenkbrauwen en lippen. Je krijgt ze na de behandeling ook op papier mee.</p></div></section>
<section class="two-col"><div class="wrap prose narrow">
<h2>Dag 0: de behandeldag</h2>
<ul><li>Houd het gebied de eerste 2 uur schoon en droog.</li><li>Maak daarna zacht schoon met steriel zout (NaCl 0,9%) of afgekoeld gekookt water op een schoon wattenschijfje. Deppen, niet wrijven.</li><li>Breng een dun laagje witte vaseline aan met een schoon wattenstaafje.</li><li>Slaap zo mogelijk op je rug, op een schoon kussensloop.</li></ul>
<h2>Dag 1 tot 3</h2>
<ul><li>Reinig 's ochtends en 's avonds en dep droog.</li><li>Twee keer per dag een dun laagje vaseline. Niet te veel: te veel vaseline houdt vocht vast en vertraagt de genezing.</li><li>Lichte roodheid, zwelling en een donkerdere kleur dan verwacht zijn normaal.</li></ul>
<h2>Dag 4 tot 7</h2>
<ul><li>Eén keer per dag voorzichtig reinigen.</li><li>Er kunnen korstjes of schilfers ontstaan. Niet krabben, wrijven of plukken. Laat ze vanzelf loslaten.</li><li>Vaseline afbouwen naar één keer per dag.</li></ul>
<h2>Vermijd 14 dagen lang</h2>
<div class="table-wrap"><table><thead><tr><th>Vermijden</th><th>Waarom</th></tr></thead><tbody>
<tr><td>Aanraken met ongewassen handen</td><td>Infectierisico</td></tr>
<tr><td>Krabben, plukken, korstjes lostrekken</td><td>Pigmentverlies en littekens</td></tr>
<tr><td>Lang douchen, baden, zwemmen, sauna</td><td>Pigmentverlies en infectie</td></tr>
<tr><td>Direct zonlicht en zonnebank</td><td>Verbleking en irritatie</td></tr>
<tr><td>Intensief sporten en hevig zweten</td><td>Pigmentverlies</td></tr>
<tr><td>Make-up of producten op het gebied</td><td>Infectierisico en pigmentverlies</td></tr>
<tr><td>Retinol, AHA, BHA en vitamine C vlakbij</td><td>Pigmentschade</td></tr>
<tr><td>Op je buik slapen</td><td>Pigmentverlies</td></tr>
</tbody></table></div>
<h2>Dag 8 tot 30</h2>
<ul><li>De korstjes zijn eraf. De kleur kan nu licht, asachtig of vlekkerig lijken. Dat is normaal: de echte kleur komt nog terug.</li><li>Vanaf dag 15 wordt de kleur geleidelijk warmer en voller. Rond dag 28 zie je het eindresultaat.</li><li>Normale huidverzorging mag weer, maar geen retinol of zuren op de wenkbrauw zelf.</li></ul>
<h2>Bijwerking na 6 tot 8 weken</h2>
<p>De bijwerking is nodig voor een gelijkmatig, lang houdbaar resultaat en zit bij de prijs in. Zonder bijwerking blijft het resultaat vaak te licht of ongelijk.</p>
<h2>Twijfel je ergens over?</h2>
<p>Stuur me gerust een foto via <a href="${SITE.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>. Bij hevige pijn, pus of koorts neem je contact op met je huisarts.</p>
</div></section>
${ctaBand()}`;
  return layout({ title: 'Nazorg permanente make-up wenkbrauwen & lippen | Angel Brandão Almere', description: 'Nazorginstructies na permanente make-up: dag voor dag wat je wel en niet doet na nano brows, powder brows, combi brows en lip blush. Van Angel Brandão, Almere.', canonical: '/nazorg/', body });
}

function contactPage() {
  const body = `<section class="page-hero"><div class="wrap"><p class="eyebrow">Contact</p><h1>Plan je gratis consult</h1><p class="lead">De snelste manier is WhatsApp. Stuur een berichtje, eventueel met een foto van je wenkbrauwen of lippen, en ik reageer meestal binnen een paar uur.</p>
<div class="hero-actions"><a class="btn btn-gold" href="${CTA_DEFAULT}" target="_blank" rel="noopener">WhatsApp ${SITE.phoneDisplay}</a><a class="btn btn-ghost" href="${SITE.instagram}" target="_blank" rel="noopener">Instagram</a></div></div></section>
<section class="two-col"><div class="wrap two-grid">
<div class="prose">
<h2>Studio</h2>
<address>${SITE.address.clinic}<br>${SITE.address.street}<br>${SITE.address.zip} ${SITE.address.city} (Almere Centrum)</address>
<p><a href="${SITE.maps}" target="_blank" rel="noopener">Open in Google Maps</a></p>
<h2>Openingstijden</h2>
<p>Op afspraak, van maandag tot en met zondag. Avond- en weekendafspraken zijn mogelijk.</p>
<h2>Bereikbaarheid</h2>
<p>Op loopafstand van station Almere Centrum. Parkeren kan in de parkeergarages van het centrum.</p>
<h2>Talen</h2>
<p>Nederlands · English · Português</p>
</div>
<figure><img src="/assets/img/work-3.jpg" alt="Ontwerp van de wenkbrauwen samen met de klant" width="1200" height="1600" loading="lazy"></figure>
</div></section>
${faqBlock(homeFaq)}`;
  return layout({ title: 'Contact & afspraak | Angel Brandão Beauty Almere', description: 'Plan een gratis consult voor permanente make-up in Almere via WhatsApp. Adres: Zadelmakerstraat 49, 1315 AN Almere Centrum. Op afspraak, ook in het weekend.', canonical: '/contact/', body, schema: [faqSchema(homeFaq)] });
}

function privacyPage() {
  const body = `<section class="page-hero"><div class="wrap"><p class="eyebrow">Privacy</p><h1>Privacyverklaring</h1></div></section>
<section class="two-col"><div class="wrap prose narrow">
<p>${SITE.name} (KvK ${SITE.kvk}), gevestigd aan de ${SITE.address.street}, ${SITE.address.zip} ${SITE.address.city}, is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in deze verklaring.</p>
<h2>Welke gegevens</h2>
<p>Als je contact opneemt via WhatsApp, Instagram of e-mail verwerk ik je naam, telefoonnummer en de inhoud van je bericht. Voor een behandeling vul je een gezondheidsvragenlijst en een toestemmingsformulier in. Foto's van het resultaat maak en gebruik ik alleen met jouw schriftelijke toestemming.</p>
<h2>Waarvoor</h2>
<p>Om je vraag te beantwoorden, een afspraak in te plannen, de behandeling veilig uit te voeren en te voldoen aan wettelijke bewaarplichten (onder andere de administratie voor de Belastingdienst).</p>
<h2>Bewaartermijn</h2>
<p>Behandelgegevens bewaar ik maximaal 5 jaar na de laatste behandeling; administratieve gegevens 7 jaar volgens de wettelijke bewaartermijn. Berichten verwijder ik zodra ze niet meer nodig zijn.</p>
<h2>Delen met derden</h2>
<p>Ik verkoop je gegevens nooit. Ik deel ze alleen met partijen die nodig zijn voor mijn dienstverlening (zoals mijn boekhouder) of als de wet dat verplicht.</p>
<h2>Cookies</h2>
<p>Deze website gebruikt geen tracking cookies. Lettertypen worden geladen via Google Fonts.</p>
<h2>Jouw rechten</h2>
<p>Je kunt je gegevens inzien, laten corrigeren of laten verwijderen. Stuur daarvoor een bericht via <a href="${SITE.whatsapp}">WhatsApp</a>. Je hebt ook het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens.</p>
</div></section>`;
  return layout({ title: 'Privacyverklaring | Angel Brandão Beauty', description: 'Privacyverklaring van Angel Brandão Beauty, Almere.', canonical: '/privacy/', body });
}

function notFound() {
  return layout({ title: 'Pagina niet gevonden | Angel Brandão Beauty', description: 'Deze pagina bestaat niet.', canonical: '/404.html', body: `<section class="page-hero"><div class="wrap"><h1>Pagina niet gevonden</h1><p class="lead">Deze pagina bestaat niet (meer). <a href="/">Terug naar de homepage</a> of <a href="/behandelingen/">bekijk de behandelingen</a>.</p></div></section>` });
}

// ---------- write ----------
function write(rel, html) {
  const p = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, html);
}
function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const f of fs.readdirSync(src)) {
    const s = path.join(src, f), d = path.join(dst, f);
    if (fs.statSync(s).isDirectory()) copyDir(s, d); else fs.copyFileSync(s, d);
  }
}

fs.rmSync(DIST, { recursive: true, force: true });
copyDir(path.join(SRC, 'assets'), path.join(DIST, 'assets'));
fs.copyFileSync(path.join(SRC, 'favicon.svg'), path.join(DIST, 'favicon.svg'));
write('index.html', homePage());
write('behandelingen/index.html', treatmentsIndex());
for (const t of treatments) write(`behandelingen/${t.slug}/index.html`, treatmentPage(t));
write('prijzen/index.html', pricesPage());
write('voor-en-na/index.html', galleryPage());
write('over-angel/index.html', aboutPage());
write('nazorg/index.html', aftercarePage());
write('contact/index.html', contactPage());
write('privacy/index.html', privacyPage());
write('404.html', notFound());

const urls = ['/', '/behandelingen/', ...treatments.map((t) => `/behandelingen/${t.slug}/`), '/prijzen/', '/voor-en-na/', '/over-angel/', '/nazorg/', '/contact/', '/privacy/'];
const today = new Date().toISOString().slice(0, 10);
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${SITE.domain}${u}</loc><lastmod>${today}</lastmod><changefreq>${u === '/' ? 'weekly' : 'monthly'}</changefreq><priority>${u === '/' ? '1.0' : u.startsWith('/behandelingen/') ? '0.9' : '0.6'}</priority></url>`).join('\n')}\n</urlset>\n`);
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE.domain}/sitemap.xml\n`);
write('CNAME', SITE.domain.replace('https://', ''));
console.log(`built ${urls.length} pages → ${DIST}`);
