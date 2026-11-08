// Static site builder for Angel Brandão Beauty (NL + EN). Run: node scripts/build.js
const fs = require('fs');
const path = require('path');
const ARTICLES = require('./articles.js');
const PILLAR = require('./pillar.js');
const CSS = fs.readFileSync(path.join(__dirname, '..', 'src', 'assets', 'style.css'), 'utf8').replace(/\n\s*/g, ' ').replace(/\/\*.*?\*\//g, '');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const SITE = {
  domain: 'https://www.angelbrandao.nl',
  name: 'Angel Brandão Beauty',
  phone: '+31612324463',
  phoneDisplay: '+31 6 12324463',
  whatsapp: 'https://wa.me/31612324463',
  instagram: 'https://www.instagram.com/anggel_brandao',
  facebook: 'https://www.facebook.com/106613280774555',
  kvk: '42151244',
  address: { clinic: 'Beauty Clinic Almere', street: 'Zadelmakerstraat 49', zip: '1315 AN', city: 'Almere' },
  maps: 'https://www.google.com/maps/search/?api=1&query=Zadelmakerstraat+49+1315AN+Almere',
};
const wa = (text) => `${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const icon = (name) => `<img class="svc-icon" src="/assets/icons/${name}-chocolate.webp" alt="" width="56" height="56" loading="lazy">`;
const euro = (n) => `€${n}`;
const IMG = { 'nano-brows': 'work-4.jpg', 'powder-brows': 'work-16.jpg', 'combi-brows': 'work-7.jpg', 'lip-blush': 'work-48.jpg', 'brow-lamination': 'work-14.jpg' };
const ICON = { 'nano-brows': '02-nano-blading', 'powder-brows': '03-shadow', 'combi-brows': '01-micropigmentacao', 'lip-blush': '03-shadow', 'brow-lamination': '04-brow-lamination' };
const PRICE = { 'nano-brows': { from: 599, now: 350 }, 'powder-brows': { from: 599, now: 350 }, 'combi-brows': { from: 599, now: 350 }, 'lip-blush': { from: 499, now: 249 }, 'brow-lamination': null };
const SLUGS = ['nano-brows', 'powder-brows', 'combi-brows', 'lip-blush', 'brow-lamination'];

// ---------------------------------------------------------------- NL
const NL = {
  code: 'nl', locale: 'nl_NL', prefix: '',
  routes: { home: '/', pillar: '/permanente-make-up-almere/', kennis: '/kennis/', article: (a) => `/kennis/${a}/`, treatments: '/behandelingen/', treatment: (s) => `/behandelingen/${s}/`, prices: '/prijzen/', gallery: '/voor-en-na/', about: '/over-angel/', aftercare: '/nazorg/', contact: '/contact/', privacy: '/privacy/' },
  nav: { treatments: 'Behandelingen', prices: 'Prijzen', gallery: 'Voor & na', about: 'Over Angel', aftercare: 'Nazorg', contact: 'Contact', cta: 'WhatsApp', faq: 'FAQ', privacy: 'Privacy', switch: 'English', skip: 'Naar inhoud', menu: 'Menu' },
  ctaText: 'Hoi Angel! Ik heb interesse in permanente make-up en wil graag een afspraak maken.',
  ctaTreat: (n) => `Hoi Angel! Ik heb interesse in ${n}. Kan ik een afspraak maken?`,
  band: { h: 'Benieuwd welke techniek bij jou past?', p: 'Stuur me een berichtje via WhatsApp, met een foto van je wenkbrauwen of lippen. Ik beantwoord je vragen, adviseer eerlijk en we plannen direct je afspraak.', btn: 'Vraag & boek via WhatsApp', small: `Reactie meestal binnen een paar uur · ${SITE.phoneDisplay}` },
  footer: { tag: 'Beauty with purpose', about: 'Permanente make-up specialist in Almere Centrum. Natuurlijke wenkbrauwen en lippen, met meer dan 7 jaar ervaring.', studio: 'Studio', studioText: 'Beauty Clinic Almere<br>Zadelmakerstraat 49<br>1315 AN Almere (Centrum)<br><a href="https://www.google.com/maps/search/?api=1&query=Zadelmakerstraat+49+1315AN+Almere" target="_blank" rel="noopener">Route via Google Maps</a>', hours: 'Op afspraak, ook in het weekend.', contact: 'Contact', treatments: 'Behandelingen', bottom: `© ${new Date().getFullYear()} ${SITE.name} · KvK ${SITE.kvk}` },
  faqTitle: 'Veelgestelde vragen',
  wa: 'WhatsApp', ig: 'Instagram @anggel_brandao', onRequest: 'Prijs op aanvraag', more: (n) => `Meer over ${n} →`, view: 'Bekijk →', promoPrice: 'actieprijs',
  treatments: {
    'nano-brows': { name: 'Nano Brows', short: 'Haartje voor haartje, superfijn en natuurlijk.', title: 'Nano Brows Almere (hairstrokes) | Natuurlijke haartjes-techniek | Angel Brandão', description: 'Nano brows (nanoblading) in Almere: ultrafijne haartjes met een digitale machine voor wenkbrauwen die niet van echt te onderscheiden zijn. Persoonlijk advies via WhatsApp, 7+ jaar ervaring.', h1: 'Nano Brows (hairstrokes) in Almere',
      intro: 'Bij nano brows, ook wel hairstrokes of nanoblading genoemd, teken ik met een digitale machine en een ultrafijne naald losse haartjes in de huid. De haartjes volgen jouw natuurlijke haargroei, waardoor het resultaat niet van echt te onderscheiden is. Perfect als je dunne of ongelijke wenkbrauwen hebt en een subtiele, natuurlijke look wilt.',
      forWho: ['Wenkbrauwen met kale plekjes of een onregelmatige vorm', 'Een natuurlijke look zonder zichtbare "make-up"', 'Normale tot droge huid (bij een vette huid adviseer ik vaak powder of combi brows)', 'Dagelijks wenkbrauwen tekenen beu'],
      facts: [['Duur behandeling', 'ca. 1,5 – 2 uur, inclusief ontwerp'], ['Houdbaarheid', 'ca. 1,5 – 2 jaar, vervaagt geleidelijk'], ['Bijwerking', 'na 6 – 8 weken, inbegrepen in de prijs'], ['Pijn', 'licht; ik werk met verdovende crème']],
      faq: [['Nano brows of powder brows: wat past bij mij?', 'Heb je nog eigen haar en een normale tot droge huid, dan geven nano brows het meest natuurlijke resultaat. Heb je weinig haar of een vette huid, dan houden powder brows of combi brows langer. In een WhatsApp-gesprek met een foto adviseer ik je gratis.'], ['Hoe lang blijven nano brows goed?', 'Gemiddeld 1,5 tot 2 jaar. De fijne haartjes vervagen geleidelijk en kunnen daarna opgefrist worden.'], ['Doen nano brows pijn?', 'Ik werk met een verdovende crème. De meeste klanten omschrijven het als licht krassend; de behandeling duurt ongeveer 1,5 tot 2 uur.'], ['Wat is het verschil tussen nano brows en microblading?', 'Microblading snijdt de haartjes met een handblade in de huid. Bij nano brows gebruik ik een digitale machine met een enkele naald. Dat is zachter voor de huid, bloedt minder, geneest mooier en vervaagt scherper in plaats van grijs of blauw uit te lopen.'], ['Ziet het er niet te hard uit?', 'Nee. Direct na de behandeling is de kleur 30 tot 40 procent donkerder dan het eindresultaat. Na ongeveer vier weken zie je de echte, zachte kleur.'], ['Kan ik nano brows laten zetten als ik al oude PMU heb?', 'Dat hangt af van hoeveel oud pigment er nog zit. Stuur me een foto via WhatsApp, dan kijk ik of het kan of dat de oude PMU eerst verwijderd moet worden.']] },
    'powder-brows': { name: 'Powder Brows', short: 'Zachte make-up look, tot 3 jaar.', title: 'Powder Brows Almere | Ombré wenkbrauwen v.a. €350 | Angel Brandão', description: 'Powder brows (ombré / shadow brows) in Almere: een zachte, gepoederde wenkbrauw alsof je altijd lichte make-up draagt. Geschikt voor elk huidtype, houdbaar tot 3 jaar.', h1: 'Powder Brows in Almere: zachte ombré wenkbrauwen, tot 3 jaar',
      intro: 'Powder brows, ook ombré brows, soft powder brows of shadow brows genoemd, geven een zachte, gepoederde wenkbrauw: licht aan het begin en voller naar de staart toe. Het lijkt op wenkbrauwen die je net met poeder of pommade hebt ingevuld, maar dan elke ochtend klaar. Omdat de pigmentatie uit duizenden kleine puntjes bestaat, is deze techniek geschikt voor elk huidtype, ook de vette of rijpere huid.',
      forWho: ['Je vult je wenkbrauwen nu dagelijks in met potlood of poeder', 'Vette, gevoelige of rijpere huid', 'Weinig eigen wenkbrauwhaar', 'Een iets vollere, gedefinieerde look die lang meegaat'],
      facts: [['Duur behandeling', 'ca. 1,5 – 2 uur, inclusief ontwerp'], ['Houdbaarheid', 'ca. 2 – 3 jaar, vervaagt geleidelijk'], ['Bijwerking', 'na 6 – 8 weken, inbegrepen in de prijs'], ['Pijn', 'licht; ik werk met verdovende crème']],
      faq: [['Powder brows of microblading: wat is beter?', 'Microblading snijdt haartjes in de huid en vervaagt vaak ongelijk, zeker bij een vette huid. Powder brows worden met een machine in duizenden zachte puntjes gezet, zijn geschikt voor elk huidtype en houden 2 tot 3 jaar. Daarom doe ik geen microblading meer.'], ['Hoe zien powder brows eruit na 1 week en na 4 weken?', 'Na 1 week zijn er lichte korstjes en lijkt de kleur donker. Rond dag 10 vallen de korstjes af en lijkt de kleur juist te licht. Na 4 weken is de echte, zachte kleur terug en bij de bijwerking na 6 tot 8 weken maken we het perfect.'], ['Wat kosten powder brows in Almere?', 'Bij mij €350 tijdens de actie, normaal €599, inclusief ontwerp, kleuradvies en de bijwerking na 6 tot 8 weken. Elders in Almere ligt de prijs tussen €350 en €475, vaak zonder bijwerking.'], ['Zijn powder brows geschikt voor blond haar?', 'Ja. Ik meng een lichte, koele of warme tint die bij je haarkleur en huid past, zodat het resultaat zacht blijft en niet te donker wordt.'], ['Worden powder brows niet te donker of te "getekend"?', 'Samen kiezen we de intensiteit. Ik werk altijd zacht en bouw de kleur laag voor laag op. Het eindresultaat is een natuurlijke poederlook, geen blokwenkbrauw.'], ['Hoe lang duurt het genezen?', 'De eerste 7 tot 10 dagen kunnen er lichte korstjes ontstaan. Na ongeveer 4 weken is de huid volledig hersteld en zie je de definitieve kleur.'], ['Kan ik daarna nog sporten en zwemmen?', 'De eerste 14 dagen vermijd je zwemmen, sauna en hevig zweten. Daarna kan alles weer gewoon.']] },
    'combi-brows': { name: 'Combi Brows', short: 'Het beste van twee technieken.', title: 'Combi Brows Almere | Hairstrokes + ombré in één behandeling | Angel Brandão', description: 'Combi brows in Almere: nano haartjes aan de voorkant voor een natuurlijke start en powder shading voor volheid. Vol én natuurlijk resultaat, advies via WhatsApp.', h1: 'Combi Brows in Almere: het beste van nano en powder brows',
      intro: 'Combi brows (hybride brows) combineren de twee technieken: aan het begin van de wenkbrauw zet ik fijne nano haartjes voor een natuurlijke, luchtige start, en de rest vul ik met zachte powder shading voor volheid en definitie. Je krijgt het realisme van haartjes en de houdbaarheid en volheid van powder brows in één behandeling.',
      forWho: ['Je wilt een volle wenkbrauw die er tóch natuurlijk uitziet', 'Weinig eigen haar in het midden en de staart', 'Vette of gecombineerde huid waar losse haartjes alleen snel vervagen', 'Je twijfelt tussen nano en powder'],
      facts: [['Duur behandeling', 'ca. 2 uur, inclusief ontwerp'], ['Houdbaarheid', 'ca. 2 – 3 jaar, vervaagt geleidelijk'], ['Bijwerking', 'na 6 – 8 weken, inbegrepen in de prijs'], ['Pijn', 'licht; ik werk met verdovende crème']],
      faq: [['Wat kosten combi brows?', 'Tijdens de actie €350 in plaats van €599, net als nano en powder brows, inclusief ontwerp, kleuradvies en bijwerking na 6 tot 8 weken.'], ['Zijn combi brows geschikt voor een vette huid?', 'Ja. De powder shading houdt goed op een vette huid, terwijl de nano haartjes aan de voorkant het natuurlijke effect geven.'], ['Is combi duurder dan nano of powder?', 'Nee. Tijdens de huidige actie geldt dezelfde prijs voor alle drie de wenkbrauwtechnieken.'], ['Hoe bepalen we welke techniek bij mij past?', 'Via WhatsApp op basis van een foto, en op de dag zelf kijk ik naar je huidtype, je eigen wenkbrauwhaar en de look die je wilt. Ik adviseer eerlijk welke techniek het mooiste en langst houdt.'], ['Teken je de vorm eerst voor?', 'Altijd. Ik meet en teken de vorm met potlood, jij kijkt mee in de spiegel en we passen aan tot jij helemaal tevreden bent. Pas daarna begin ik met pigmenteren.']] },
    'lip-blush': { name: 'Velvet Lip Blush', short: 'Zachte kleur en definitie, alsof je altijd een beetje lipstick draagt.', title: 'Lip Blush Almere | Permanente make-up lippen v.a. €249 | Angel Brandão', description: 'Velvet lip blush in Almere: een zachte, natuurlijke lipkleur met meer definitie en een voller effect. Houdbaar 2 tot 3 jaar. Boek via WhatsApp bij Angel Brandão.', h1: 'Lip Blush in Almere: natuurlijke lipkleur en definitie, 2 tot 3 jaar',
      intro: 'Velvet lip blush is permanente make-up voor de lippen. Ik breng een zachte, transparante kleur aan die je natuurlijke liptint versterkt, de lipcontour subtiel definieert en je lippen optisch voller maakt. Geen harde lijn, maar een velvet effect alsof je net een lip tint hebt gebruikt. Ideaal bij bleke, ongelijke of vervaagde lippen.',
      forWho: ['Bleke of fletse lippen', 'Een onduidelijke of ongelijke lipcontour', 'Je wilt er fris uitzien zonder lipstick', 'Optisch vollere lippen zonder fillers'],
      facts: [['Duur behandeling', 'ca. 2 uur, inclusief ontwerp'], ['Houdbaarheid', 'ca. 2 – 3 jaar'], ['Bijwerking', 'na 6 – 8 weken, inbegrepen in de prijs'], ['Pijn', 'licht; ik werk met verdovende crème']],
      faq: [['Hoe lang blijft lip blush zitten?', 'Gemiddeld 2 tot 3 jaar. Daarna kun je de kleur opfrissen.'], ['Wat kost lip blush in Almere?', 'Bij mij €249 tijdens de actie, normaal €499, inclusief ontwerp en bijwerking. Wenkbrauwen en lippen samen kosten €500.'], ['Kan lip blush na lipfillers?', 'Ja, minimaal 4 weken na de fillers, als de lippen helemaal gesetteld zijn.'], ['Doet lip blush pijn?', 'De lippen zijn gevoelig, daarom werk ik met een sterke verdovende crème. De meeste klanten ervaren het als licht prikkend.'], ['Ik heb weleens een koortslip. Kan ik lip blush laten doen?', 'Ja, maar neem dan vooraf (en na) een antivirale kuur via je huisarts. Dit bespreken we in het consult.'], ['Hoe zien mijn lippen eruit de eerste dagen?', 'De eerste 2 tot 3 dagen zijn de lippen feller en licht gezwollen. Daarna vervelt de huid en wordt de kleur zacht. Na ongeveer 4 weken zie je het eindresultaat.']] },
    'brow-lamination': { name: 'Brow Lamination', short: 'Volle, gestylede wenkbrauwen met je eigen haartjes, 6 tot 8 weken lang.', title: 'Brow Lamination Almere | Volle, opgekamde wenkbrauwen', description: 'Brow lamination in Almere: je eigen wenkbrauwhaartjes opgekamd en in vorm gezet, voller en netter zonder pigment. Resultaat 6 tot 8 weken.', h1: 'Brow Lamination in Almere',
      intro: 'Wil je een vollere, gestylede look zonder permanente make-up? Met brow lamination worden je eigen wenkbrauwhaartjes opgekamd en in vorm gezet, zodat ze voller, netter en symmetrischer staan. Geen pigment, geen naald. Te combineren met een tint voor extra definitie.',
      forWho: ['Wilde, weerbarstige of platte wenkbrauwhaartjes', 'Je wilt eerst een niet-permanente optie proberen', 'Een frisse look voor een bruiloft, feest of vakantie', 'Als onderhoud tussen PMU behandelingen door'],
      facts: [['Duur behandeling', 'ca. 45 – 60 minuten'], ['Houdbaarheid', '6 – 8 weken'], ['Onderhoud', 'de eerste 24 uur droog houden'], ['Combineren', 'met tint in dezelfde afspraak mogelijk']],
      faq: [['Is brow lamination slecht voor mijn haartjes?', 'Niet als het goed gebeurt. Ik gebruik professionele producten, houd de inwerktijd nauwkeurig aan en sluit af met een verzorgende olie.'], ['Kan ik brow lamination combineren met permanente make-up?', 'Ja, maar niet in dezelfde week. Plan brow lamination minimaal 4 weken na een PMU behandeling.']] },
  },
  homeFaq: [
    ['Wat kost permanente make-up voor wenkbrauwen in Almere?', 'Bij Angel Brandão Beauty betaal je tijdens de actie €350 in plaats van €599 voor nano brows, powder brows of combi brows. De bijwerking na 6 tot 8 weken is inbegrepen. Lip blush kost €249 in plaats van €499.'],
    ['Hoe lang blijft permanente make-up zitten?', 'Wenkbrauwen gemiddeld 1,5 tot 3 jaar, afhankelijk van de techniek, je huidtype en zonblootstelling. Lip blush 2 tot 3 jaar. Het pigment vervaagt geleidelijk en kan daarna opgefrist worden.'],
    ['Doet permanente make-up pijn?', 'Ik werk met een verdovende crème. De meeste klanten omschrijven het als licht krassend of prikkend, goed te doen.'],
    ['Hoe maak ik een afspraak?', 'Via WhatsApp. Stuur een berichtje met een foto van je wenkbrauwen of lippen, ik beantwoord je vragen en adviseer welke techniek en kleur bij je passen, en we plannen direct je behandeling.'],
    ['Waar zit de studio?', 'In Beauty Clinic Almere, Zadelmakerstraat 49, 1315 AN Almere, in het centrum op loopafstand van station Almere Centrum. Ik werk op afspraak.'],
    ['Werk je hygiënisch en gecertificeerd?', 'Ja. Ik werk uitsluitend met steriele wegwerpnaalden en -materialen, draag handschoenen en volg de hygiënerichtlijnen voor tatoeëren en PMU. Ik ben gecertificeerd in micropigmentatie en heb meer dan 7 jaar ervaring.'],
  ],
  home: {
    title: 'Permanente Make-up Almere | Powder, Nano & Lip Blush | Angel Brandão', description: 'PMU specialist in Almere Centrum: nanoblading (nano brows), powder brows, combi brows en lip blush met een natuurlijk resultaat. 7+ jaar ervaring, advies en boeken via WhatsApp, actie €350.',
    eyebrow: 'Permanente make-up (PMU) · Almere Centrum', h1: 'Permanente make-up in Almere Centrum: natuurlijke wenkbrauwen en lippen', lead: 'Permanente make-up in Almere: nanoblading (nano brows), powder brows, combi brows en lip blush door Angel Brandão. Meer dan 7 jaar ervaring, een zachte hand en een resultaat dat eruitziet alsof het van jou is.',
    cta1: 'Boek via WhatsApp', cta2: 'Bekijk behandelingen', trust: ['7+ jaar ervaring', 'Persoonlijk advies via WhatsApp', 'Steriel & gecertificeerd', 'Bijwerking inbegrepen'], heroAlt: 'Angel Brandão, permanente make-up specialist in Almere',
    promoEyebrow: 'Tijdelijke actie', promoH: 'Wenkbrauwen <s>€599</s> <strong>€350</strong> · Lip blush <s>€499</s> <strong>€249</strong> · Samen <strong>€500</strong>', promoP: 'Geldt voor nano, powder en combi brows. Inclusief ontwerp, kleuradvies en bijwerking na 6 tot 8 weken. Beperkt aantal plekken.', promoBtn: 'Alle prijzen',
    svcEyebrow: 'Behandelingen', svcH: 'Kies de techniek die bij jou past', svcSub: 'Twijfel je? Stuur een foto via WhatsApp. Ik kijk naar je huidtype en je eigen wenkbrauwhaar en adviseer eerlijk wat het mooiste en langst houdt.',
    whyEyebrow: 'Waarom Angel Brandão', whyH: 'Natuurlijk is het enige resultaat dat ik maak', whyAlt: 'Close-up van natuurlijk ogende permanente make-up wenkbrauwen',
    why: ['<strong>Eerst ontwerpen, dan pigmenteren.</strong> Ik meet en teken de vorm voor. Jij kijkt mee tot het klopt.', '<strong>Zacht en laag voor laag.</strong> Liever iets te licht en bijwerken, dan te donker en spijt.', '<strong>Steriel en gecertificeerd.</strong> Wegwerpnaalden, handschoenen en hygiëne volgens de richtlijnen.', '<strong>Meer dan 7 jaar ervaring</strong> in micropigmentatie en make-up, in Brazilië en Nederland.', '<strong>Eerlijk advies.</strong> Past een techniek niet bij je huid, dan zeg ik dat.'], whyBtn: 'Maak kennis met Angel',
    galEyebrow: 'Voor & na', galH: 'Echte klanten, echte resultaten', gal: [['before-after-3.jpg', 'Nano brows, direct na de behandeling'], ['work-4.jpg', 'Nano brows, na 4 weken']], galMore: 'Meer resultaten',
    stepsEyebrow: 'Zo werkt het', stepsH: 'Van consult tot perfecte wenkbrauwen',
    steps: [['Contact via WhatsApp', 'Je stuurt een berichtje en een foto. We bespreken je wensen, je huid en de beste techniek en plannen je afspraak.'], ['Ontwerp & kleur', 'Ik meet en teken de vorm en kies samen met jou de pigmentkleur die bij je past.'], ['Behandeling', 'Met verdovende crème, in ca. 1,5 tot 2 uur. Je krijgt duidelijke nazorginstructies mee.'], ['Bijwerking', 'Na 6 tot 8 weken werken we het resultaat bij. Inbegrepen in de prijs.']],
    aboutEyebrow: 'Over Angel', aboutH: 'Hoi, ik ben Angel', aboutP1: 'Braziliaanse make-up artist en permanente make-up specialist, sinds 2026 gevestigd in Almere. Ik werk al meer dan 7 jaar met wenkbrauwen en lippen en geloof in één ding: make-up moet jou mooier maken, niet anders. Daarom werk ik zacht, natuurlijk en altijd in overleg.', aboutP2: 'Ik spreek Nederlands, Engels en Portugees.', aboutBtn: 'Lees mijn verhaal', aboutAlt: 'Angel Brandão in de studio in Almere',
  },
  treatPage: { forWho: (n) => `Voor wie is ${n}?`, good: 'Goed om te weten', howH: 'Hoe verloopt de behandeling?', faqH: (n) => `Vragen over ${n}`, others: 'Andere behandelingen', band: (n) => `Klaar voor ${n}?`, ctaBtn: (n) => `Boek ${n} via WhatsApp`, alt: (n) => `${n} resultaat`,
    steps: [['Contact', 'Via WhatsApp: wensen, huidtype, gezondheid en verwachtingen. Eerlijk advies over de techniek en direct een afspraak.'], ['Ontwerp', 'Ik meet je gezicht en teken de vorm voor. Jij kijkt mee en we passen aan tot het klopt.'], ['Pigmenteren', 'Met verdovende crème en steriele wegwerpmaterialen. Rustig, laag voor laag.'], ['Nazorg & bijwerking', 'Duidelijke <a href="/nazorg/">nazorginstructies</a> en een bijwerking na 6 tot 8 weken, inbegrepen.']] },
  treatIndex: { title: 'Behandelingen | Permanente make-up Almere | Angel Brandão', description: 'Overzicht van alle PMU behandelingen bij Angel Brandão in Almere: nano brows, powder brows, combi brows, lip blush en brow lamination. Met vergelijking en prijzen.', eyebrow: 'Behandelingen', h1: 'Permanente make-up behandelingen in Almere', lead: 'Wenkbrauwen in drie technieken, lip blush en brow lamination als niet-permanente optie. Alles met een natuurlijk resultaat en persoonlijk advies via WhatsApp.',
    cmpH: 'Nano, powder of combi: wat past bij jou?', cmpHead: ['', 'Nano Brows', 'Powder Brows', 'Combi Brows'], cmp: [['Look', 'Losse, fijne haartjes', 'Zachte poeder / make-up look', 'Haartjes vooraan, poeder achter'], ['Huidtype', 'Normaal tot droog', 'Alle huidtypes, ook vet', 'Alle huidtypes'], ['Eigen haar', 'Liefst wat eigen haar', 'Weinig tot geen', 'Weinig tot gemiddeld'], ['Houdbaarheid', '1,5 – 2 jaar', '2 – 3 jaar', '2 – 3 jaar'], ['Actieprijs', '€350', '€350', '€350']] },
  prices: { title: 'Prijzen permanente make-up Almere | Angel Brandão', description: 'Prijzen voor nano brows, powder brows, combi brows en lip blush in Almere. Actie: wenkbrauwen €350 i.p.v. €599, lip blush €249, combi deal €500. Bijwerking inbegrepen, boeken via WhatsApp.', eyebrow: 'Prijzen', h1: 'Prijzen permanente make-up Almere', lead: 'Eerlijke prijzen, zonder verrassingen. De bijwerking na 6 tot 8 weken zit altijd bij de prijs in. Vragen stel je gratis via WhatsApp.',
    head: ['Behandeling', 'Normaal', 'Actieprijs', 'Inbegrepen'],
    rows: [['Nano Brows', '€599', '€350', 'incl. ontwerp, kleuradvies en bijwerking na 6 – 8 weken'], ['Powder Brows', '€599', '€350', 'incl. ontwerp, kleuradvies en bijwerking na 6 – 8 weken'], ['Combi Brows', '€599', '€350', 'incl. ontwerp, kleuradvies en bijwerking na 6 – 8 weken'], ['Velvet Lip Blush', '€499', '€249', 'incl. ontwerp en bijwerking na 6 – 8 weken'], ['Wenkbrauwen + lippen (combi deal)', '', '€500', 'twee behandelingen, twee bijwerkingen'], ['Opfrisbehandeling (eigen klanten)', '', 'op aanvraag', 'afhankelijk van hoeveel pigment er nog zit'], ['Brow lamination', '', 'op aanvraag', 'ca. 45 – 60 min']],
    note: 'Actieprijzen gelden zolang er plekken beschikbaar zijn. Betalen kan via iDEAL of bankoverschrijving. Een afspraak kosteloos verzetten kan tot 48 uur van tevoren.',
    faq: [['Zit de bijwerking echt bij de prijs in?', 'Ja. De bijwerking na 6 tot 8 weken is nodig voor een mooi, gelijkmatig resultaat en is altijd inbegrepen.'], ['Wat als ik al oude permanente make-up heb?', 'Stuur een foto via WhatsApp. Soms kan ik eroverheen werken, soms moet het oude pigment eerst (laser)verwijderd worden. Dat bespreken we eerlijk in het consult.'], ['Hoe kan ik betalen?', 'Via iDEAL of bankoverschrijving. Je ontvangt een betaalverzoek via WhatsApp.']], faqH: 'Vragen over prijzen' },
  gallery: { title: 'Voor & na foto\'s | Permanente make-up Almere | Angel Brandão', description: 'Bekijk voor en na foto\'s van nano brows, powder brows, combi brows en lip blush bij Angel Brandão in Almere.', eyebrow: 'Voor & na', h1: 'Resultaten permanente make-up', lead: 'Echte klanten uit Almere en omgeving, gefotografeerd met toestemming. Direct na de behandeling is de kleur altijd donkerder; na 4 weken zie je het zachte eindresultaat.',
    imgs: [['before-after-3.jpg', 'Nano brows, voor en direct na de behandeling'], ['work-11.jpg', 'Wenkbrauwen na de behandeling'], ['work-4.jpg', 'Natuurlijke hairstrokes'], ['work-16.jpg', 'Vorm en kleur op maat'], ['work-7.jpg', 'Zacht, gelijkmatig resultaat'], ['work-3.jpg', 'Ontwerp vooraf met de klant']], more: 'Meer dagelijkse resultaten op', band: 'Wil jij dit ook?' },
  about: { title: 'Over Angel Brandão | Permanente make-up specialist Almere', description: 'Maak kennis met Angel Brandão, permanente make-up specialist in Almere met meer dan 7 jaar ervaring in micropigmentatie en make-up. Natuurlijk, zacht en eerlijk.', eyebrow: 'Over Angel', h1: 'Beauty with purpose', lead: 'Ik ben Angel Brandão, make-up artist en permanente make-up specialist. Geboren in Brazilië, sinds 2026 thuis in Almere.',
    p1: 'Mijn carrière begon met bruids- en avondmake-up. Honderden gezichten, honderden verschillende wensen. Daar leerde ik het belangrijkste wat ik nu dagelijks gebruik: elk gezicht heeft zijn eigen lijnen, en make-up werkt alleen als het die lijnen respecteert.', p2: 'Meer dan 7 jaar geleden specialiseerde ik me in micropigmentatie. Wenkbrauwen en lippen die er elke ochtend al goed uitzien, zonder dat iemand ziet dat het permanente make-up is. Dat is mijn enige doel bij elke behandeling.',
    howH: 'Hoe ik werk', how: ['<strong>Rustig en in overleg.</strong> Ik teken eerst, jij kijkt mee, en ik begin pas als jij blij bent met de vorm.', '<strong>Natuurlijk boven alles.</strong> Zachte kleuren, fijne haartjes, nooit te donker. Bijwerken kan altijd, weghalen niet.', '<strong>Hygiëne zonder compromis.</strong> Steriele wegwerpnaalden, handschoenen, schone werkplek, volgens de richtlijnen voor PMU.', '<strong>Eerlijk advies.</strong> Past een techniek niet bij jouw huid of wens, dan zeg ik dat, ook als dat betekent dat je niets laat doen.'],
    practH: 'Praktisch', pract: 'Ik werk in Beauty Clinic Almere, Zadelmakerstraat 49 in Almere Centrum, op afspraak en ook in het weekend. Ik spreek Nederlands, Engels en Portugees.', kvk: `Ingeschreven bij de KvK onder nummer ${SITE.kvk}.`, band: 'Zullen we kennismaken?', alt: 'Angel Brandão bij Beauty Clinic Almere' },
  aftercare: { title: 'Nazorg permanente make-up wenkbrauwen & lippen | Angel Brandão Almere', description: 'Nazorginstructies na permanente make-up: dag voor dag wat je wel en niet doet na nano brows, powder brows, combi brows en lip blush. Van Angel Brandão, Almere.', eyebrow: 'Nazorg', h1: 'Nazorg permanente make-up', lead: 'Goede nazorg bepaalt de helft van je resultaat. Dit zijn mijn instructies voor wenkbrauwen en lippen. Je krijgt ze na de behandeling ook op papier mee.',
    sections: [
      ['Dag 0: de behandeldag', ['Houd het gebied de eerste 2 uur schoon en droog.', 'Maak daarna zacht schoon met steriel zout (NaCl 0,9%) of afgekoeld gekookt water op een schoon wattenschijfje. Deppen, niet wrijven.', 'Breng een dun laagje witte vaseline aan met een schoon wattenstaafje.', 'Slaap zo mogelijk op je rug, op een schoon kussensloop.']],
      ['Dag 1 tot 3', ['Reinig \'s ochtends en \'s avonds en dep droog.', 'Twee keer per dag een dun laagje vaseline. Niet te veel: te veel vaseline houdt vocht vast en vertraagt de genezing.', 'Lichte roodheid, zwelling en een donkerdere kleur dan verwacht zijn normaal.']],
      ['Dag 4 tot 7', ['Eén keer per dag voorzichtig reinigen.', 'Er kunnen korstjes of schilfers ontstaan. Niet krabben, wrijven of plukken. Laat ze vanzelf loslaten.', 'Vaseline afbouwen naar één keer per dag.']],
    ],
    avoidH: 'Vermijd 14 dagen lang', avoidHead: ['Vermijden', 'Waarom'], avoid: [['Aanraken met ongewassen handen', 'Infectierisico'], ['Krabben, plukken, korstjes lostrekken', 'Pigmentverlies en littekens'], ['Lang douchen, baden, zwemmen, sauna', 'Pigmentverlies en infectie'], ['Direct zonlicht en zonnebank', 'Verbleking en irritatie'], ['Intensief sporten en hevig zweten', 'Pigmentverlies'], ['Make-up of producten op het gebied', 'Infectierisico en pigmentverlies'], ['Retinol, AHA, BHA en vitamine C vlakbij', 'Pigmentschade'], ['Op je buik slapen', 'Pigmentverlies']],
    sections2: [
      ['Dag 8 tot 30', ['De korstjes zijn eraf. De kleur kan nu licht, asachtig of vlekkerig lijken. Dat is normaal: de echte kleur komt nog terug.', 'Vanaf dag 15 wordt de kleur geleidelijk warmer en voller. Rond dag 28 zie je het eindresultaat.', 'Normale huidverzorging mag weer, maar geen retinol of zuren op de wenkbrauw zelf.']],
    ],
    touchH: 'Bijwerking na 6 tot 8 weken', touchP: 'De bijwerking is nodig voor een gelijkmatig, lang houdbaar resultaat en zit bij de prijs in. Zonder bijwerking blijft het resultaat vaak te licht of ongelijk.', doubtH: 'Twijfel je ergens over?', doubtP: 'Stuur me gerust een foto via <a href="WA">WhatsApp</a>. Bij hevige pijn, pus of koorts neem je contact op met je huisarts.' },
  contact: { title: 'Contact & afspraak | Angel Brandão Beauty Almere', description: 'Maak een afspraak voor permanente make-up in Almere Centrum via WhatsApp. Op afspraak, ook in het weekend. Reactie meestal binnen een paar uur.', eyebrow: 'Contact', h1: 'Maak een afspraak', lead: 'De snelste manier is WhatsApp. Stuur een berichtje met een foto van je wenkbrauwen of lippen, ik beantwoord je vragen en we plannen direct je behandeling. Ik reageer meestal binnen een paar uur.',
    studioH: 'Studio', studioP: 'Beauty Clinic Almere<br>Zadelmakerstraat 49<br>1315 AN Almere (Centrum)<br><a href="https://www.google.com/maps/search/?api=1&query=Zadelmakerstraat+49+1315AN+Almere" target="_blank" rel="noopener">Route via Google Maps</a>, op loopafstand van station Almere Centrum.', hoursH: 'Openingstijden', hoursP: 'Op afspraak, van maandag tot en met zondag. Avond- en weekendafspraken zijn mogelijk.', reachH: 'Bereikbaarheid', reachP: 'Goed bereikbaar met het openbaar vervoer en de auto; parkeren kan in de parkeergarages van het centrum. Klanten komen uit heel Almere (Stad, Buiten, Haven, Poort, Hout) en uit Lelystad, Dronten, Hilversum, Amersfoort en Amsterdam.', langH: 'Talen', langP: 'Nederlands · English · Português', alt: 'Ontwerp van de wenkbrauwen samen met de klant' },
  privacy: { title: 'Privacyverklaring | Angel Brandão Beauty', description: 'Privacyverklaring van Angel Brandão Beauty, Almere.', eyebrow: 'Privacy', h1: 'Privacyverklaring',
    blocks: [['', `${SITE.name} (KvK ${SITE.kvk}), gevestigd in Almere, is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in deze verklaring.`], ['Welke gegevens', 'Als je contact opneemt via WhatsApp, Instagram of e-mail verwerk ik je naam, telefoonnummer en de inhoud van je bericht. Voor een behandeling vul je een gezondheidsvragenlijst en een toestemmingsformulier in. Foto\'s van het resultaat maak en gebruik ik alleen met jouw schriftelijke toestemming.'], ['Waarvoor', 'Om je vraag te beantwoorden, een afspraak in te plannen, de behandeling veilig uit te voeren en te voldoen aan wettelijke bewaarplichten (onder andere de administratie voor de Belastingdienst).'], ['Bewaartermijn', 'Behandelgegevens bewaar ik maximaal 5 jaar na de laatste behandeling; administratieve gegevens 7 jaar volgens de wettelijke bewaartermijn. Berichten verwijder ik zodra ze niet meer nodig zijn.'], ['Delen met derden', 'Ik verkoop je gegevens nooit. Ik deel ze alleen met partijen die nodig zijn voor mijn dienstverlening (zoals mijn boekhouder) of als de wet dat verplicht.'], ['Cookies', 'Deze website gebruikt geen tracking cookies. Lettertypen worden geladen via Google Fonts.'], ['Jouw rechten', 'Je kunt je gegevens inzien, laten corrigeren of laten verwijderen. Stuur daarvoor een bericht via <a href="WA">WhatsApp</a>. Je hebt ook het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens.']] },
  notFound: { title: 'Pagina niet gevonden | Angel Brandão Beauty', h1: 'Pagina niet gevonden', p: 'Deze pagina bestaat niet (meer). <a href="/">Terug naar de homepage</a> of <a href="/behandelingen/">bekijk de behandelingen</a>.' },
  schemaDesc: 'Permanente make-up specialist in Almere Centrum: nano brows, powder brows, combi brows en lip blush. Natuurlijk resultaat, advies en boeken via WhatsApp.',
};

// ---------------------------------------------------------------- EN
const EN = {
  code: 'en', locale: 'en_GB', prefix: '/en',
  routes: { home: '/en/', pillar: '/en/permanent-make-up-almere/', kennis: '/en/guides/', article: (a) => `/en/guides/${a}/`, treatments: '/en/treatments/', treatment: (s) => `/en/treatments/${s}/`, prices: '/en/prices/', gallery: '/en/before-after/', about: '/en/about/', aftercare: '/en/aftercare/', contact: '/en/contact/', privacy: '/en/privacy/' },
  nav: { treatments: 'Treatments', prices: 'Prices', gallery: 'Before & after', about: 'About Angel', aftercare: 'Aftercare', contact: 'Contact', cta: 'WhatsApp', faq: 'FAQ', privacy: 'Privacy', switch: 'Nederlands', skip: 'Skip to content', menu: 'Menu' },
  ctaText: 'Hi Angel! I am interested in permanent make-up and would like to book an appointment.',
  ctaTreat: (n) => `Hi Angel! I'm interested in ${n}. Can I book an appointment?`,
  band: { h: 'Wondering which technique suits you?', p: 'Send me a message on WhatsApp with a photo of your brows or lips. I answer your questions, advise you honestly and we book your appointment right away.', btn: 'Ask & book on WhatsApp', small: `Usually a reply within a few hours · ${SITE.phoneDisplay}` },
  footer: { tag: 'Beauty with purpose', about: 'Permanent make-up specialist in Almere city centre. Natural brows and lips, with more than 7 years of experience.', studio: 'Studio', studioText: 'Beauty Clinic Almere<br>Zadelmakerstraat 49<br>1315 AN Almere (city centre)<br><a href="https://www.google.com/maps/search/?api=1&query=Zadelmakerstraat+49+1315AN+Almere" target="_blank" rel="noopener">Directions via Google Maps</a>', hours: 'By appointment, weekends included.', contact: 'Contact', treatments: 'Treatments', bottom: `© ${new Date().getFullYear()} ${SITE.name} · Chamber of Commerce (KvK) ${SITE.kvk}` },
  faqTitle: 'Frequently asked questions',
  wa: 'WhatsApp', ig: 'Instagram @anggel_brandao', onRequest: 'Price on request', more: (n) => `More about ${n} →`, view: 'View →', promoPrice: 'promo price',
  treatments: {
    'nano-brows': { name: 'Nano Brows', short: 'Hair by hair, ultra-fine and natural.', title: 'Nano Brows Almere (hairstrokes) | Natural hair-stroke eyebrows | Angel Brandão', description: 'Nano brows (nanoblading) in Almere: ultra-fine hair strokes made with a digital machine for eyebrows that look completely real. Personal advice on WhatsApp, 7+ years of experience.', h1: 'Nano Brows (nanoblading) in Almere',
      intro: 'With nano brows (also called nanoblading) I draw individual hair strokes into the skin with a digital machine and an ultra-fine needle. The strokes follow your natural hair growth, so the result is indistinguishable from real brows. Perfect if you have thin or uneven eyebrows and want a subtle, natural look.',
      forWho: ['Eyebrows with gaps or an irregular shape', 'A natural look without visible "make-up"', 'Normal to dry skin (for oily skin I often advise powder or combi brows)', 'Tired of drawing your brows every day'],
      facts: [['Treatment time', 'approx. 1.5 – 2 hours, design included'], ['Lasts', 'approx. 1.5 – 2 years, fades gradually'], ['Touch-up', 'after 6 – 8 weeks, included in the price'], ['Pain', 'mild; I use a numbing cream']],
      faq: [['Nano brows or powder brows: which suits me?', 'If you still have your own hair and normal to dry skin, nano brows give the most natural result. With little hair or oily skin, powder or combi brows last longer. Send a photo on WhatsApp and I advise you for free.'], ['How long do nano brows last?', 'On average 1.5 to 2 years. The fine strokes fade gradually and can be refreshed afterwards.'], ['Do nano brows hurt?', 'I use a numbing cream. Most clients describe it as a light scratching; the treatment takes about 1.5 to 2 hours.'], ['What is the difference between nano brows and microblading?', 'Microblading cuts the strokes into the skin with a hand blade. For nano brows I use a digital machine with a single needle. It is gentler on the skin, bleeds less, heals better and fades crisply instead of turning grey or blue.'], ['Will it look too harsh?', 'No. Right after the treatment the colour is 30 to 40 percent darker than the final result. After about four weeks you see the true, soft colour.'], ['Can I get nano brows if I already have old PMU?', 'That depends on how much old pigment is left. Send me a photo on WhatsApp and I will tell you whether it is possible or whether the old PMU needs to be removed first.']] },
    'powder-brows': { name: 'Powder Brows', short: 'Soft make-up look, up to 3 years.', title: 'Powder Brows Almere | Ombré & soft powder brows from €350 | Angel Brandão', description: 'Powder brows (ombré / shadow brows) in Almere: a soft, powdered eyebrow as if you always wear light make-up. Suitable for every skin type, lasts up to 3 years.', h1: 'Powder Brows in Almere: soft ombré brows that last up to 3 years',
      intro: 'Powder brows, also called shadow or ombré brows, give a soft, powdered eyebrow: light at the front and fuller towards the tail. It looks like brows you have just filled in with powder or pomade, but ready every morning. Because the pigmentation consists of thousands of tiny dots, this technique suits every skin type, including oily or mature skin.',
      forWho: ['You fill in your brows every day with pencil or powder', 'Oily, sensitive or mature skin', 'Little natural eyebrow hair', 'A slightly fuller, defined look that lasts'],
      facts: [['Treatment time', 'approx. 1.5 – 2 hours, design included'], ['Lasts', 'approx. 2 – 3 years, fades gradually'], ['Touch-up', 'after 6 – 8 weeks, included in the price'], ['Pain', 'mild; I use a numbing cream']],
      faq: [['Powder brows or microblading: which is better?', 'Microblading cuts strokes into the skin and often fades unevenly, especially on oily skin. Powder brows are set by machine in thousands of soft dots, suit every skin type and last 2 to 3 years. That is why I no longer do microblading.'], ['What do powder brows look like after 1 week and after 4 weeks?', 'After 1 week there are light scabs and the colour looks dark. Around day 10 the scabs fall off and the colour looks too light. After 4 weeks the true soft colour is back and the touch-up at 6 to 8 weeks makes it perfect.'], ['How much do powder brows cost in Almere?', 'With me €350 during the promotion, normally €599, including design, colour advice and the touch-up after 6 to 8 weeks. Elsewhere in Almere prices range from €350 to €475, often without the touch-up.'], ['Are powder brows suitable for blonde hair?', 'Yes. I mix a light, cool or warm shade that matches your hair and skin, so the result stays soft and never too dark.'], ['Will powder brows look too dark or "drawn on"?', 'We choose the intensity together. I always work softly and build the colour layer by layer. The final result is a natural powder look, not a block brow.'], ['How long does healing take?', 'In the first 7 to 10 days light scabs may form. After about 4 weeks the skin is fully healed and you see the final colour.'], ['Can I exercise and swim afterwards?', 'For the first 14 days avoid swimming, sauna and heavy sweating. After that everything is back to normal.']] },
    'combi-brows': { name: 'Combi Brows', short: 'The best of two techniques.', title: 'Combi Brows Almere | Nano strokes + powder shading', description: 'Combi brows in Almere: nano hair strokes at the front for a natural start and powder shading for fullness. Full yet natural result, advice on WhatsApp.', h1: 'Combi Brows in Almere',
      intro: 'Combi brows (hybrid brows) combine both techniques: at the front of the brow I place fine nano hair strokes for a natural, airy start, and I fill the rest with soft powder shading for fullness and definition. You get the realism of hair strokes and the longevity and fullness of powder brows in one treatment.',
      forWho: ['You want a full brow that still looks natural', 'Little natural hair in the middle and tail', 'Oily or combination skin where strokes alone fade quickly', 'You cannot decide between nano and powder'],
      facts: [['Treatment time', 'approx. 2 hours, design included'], ['Lasts', 'approx. 2 – 3 years, fades gradually'], ['Touch-up', 'after 6 – 8 weeks, included in the price'], ['Pain', 'mild; I use a numbing cream']],
      faq: [['How much do combi brows cost?', 'During the promotion €350 instead of €599, the same as nano and powder brows, including design, colour advice and the touch-up after 6 to 8 weeks.'], ['Are combi brows suitable for oily skin?', 'Yes. The powder shading holds well on oily skin, while the nano strokes at the front keep the natural effect.'], ['Is combi more expensive than nano or powder?', 'No. During the current promotion the same price applies to all three eyebrow techniques.'], ['How do we decide which technique suits me?', 'On WhatsApp based on a photo, and on the day itself I look at your skin type, your own eyebrow hair and the look you want. I honestly advise which technique looks best and lasts longest.'], ['Do you draw the shape first?', 'Always. I measure and draw the shape with a pencil, you check it in the mirror and we adjust until you are completely happy. Only then do I start pigmenting.']] },
    'lip-blush': { name: 'Velvet Lip Blush', short: 'Soft colour and definition, as if you always wear a touch of lipstick.', title: 'Lip Blush Almere | Permanent make-up lips', description: 'Velvet lip blush in Almere: a soft, natural lip colour with more definition and a fuller effect. Lasts 2 to 3 years. Book on WhatsApp with Angel Brandão.', h1: 'Velvet Lip Blush in Almere',
      intro: 'Lip blush is permanent make-up for the lips. I apply a soft, translucent colour that enhances your natural lip tone, subtly defines the lip line and makes your lips look fuller. No hard line, but a velvet effect as if you just used a lip tint. Ideal for pale, uneven or faded lips.',
      forWho: ['Pale or dull lips', 'An unclear or uneven lip line', 'You want to look fresh without lipstick', 'Visually fuller lips without fillers'],
      facts: [['Treatment time', 'approx. 2 hours, design included'], ['Lasts', 'approx. 2 – 3 years'], ['Touch-up', 'after 6 – 8 weeks, included in the price'], ['Pain', 'mild; I use a numbing cream']],
      faq: [['How long does lip blush last?', 'On average 2 to 3 years. After that the colour can be refreshed.'], ['How much does lip blush cost in Almere?', 'With me €249 during the promotion, normally €499, including design and touch-up. Brows and lips together cost €500.'], ['Can I have lip blush after lip fillers?', 'Yes, at least 4 weeks after the fillers, once the lips have fully settled.'], ['Does lip blush hurt?', 'Lips are sensitive, which is why I use a strong numbing cream. Most clients describe it as a light tingling.'], ['I sometimes get cold sores. Can I have lip blush?', 'Yes, but take an antiviral course before (and after) via your GP. We discuss this in the consultation.'], ['What do my lips look like in the first days?', 'For the first 2 to 3 days the lips are brighter and slightly swollen. Then the skin peels and the colour softens. After about 4 weeks you see the final result.']] },
    'brow-lamination': { name: 'Brow Lamination', short: 'Full, styled brows with your own hair, for 6 to 8 weeks.', title: 'Brow Lamination Almere | Full, brushed-up eyebrows', description: 'Brow lamination in Almere: your own eyebrow hairs brushed up and set in shape, fuller and neater without pigment. Lasts 6 to 8 weeks.', h1: 'Brow Lamination in Almere',
      intro: 'Want a fuller, styled look without permanent make-up? With brow lamination your own eyebrow hairs are brushed up and set in shape, so they look fuller, neater and more symmetrical. No pigment, no needle. Can be combined with a tint for extra definition.',
      forWho: ['Wild, unruly or flat eyebrow hairs', 'You want to try a non-permanent option first', 'A fresh look for a wedding, party or holiday', 'Maintenance between PMU treatments'],
      facts: [['Treatment time', 'approx. 45 – 60 minutes'], ['Lasts', '6 – 8 weeks'], ['Care', 'keep dry for the first 24 hours'], ['Combine', 'with a tint in the same appointment']],
      faq: [['Is brow lamination bad for my hairs?', 'Not when done properly. I use professional products, respect the processing time precisely and finish with a nourishing oil.'], ['Can I combine brow lamination with permanent make-up?', 'Yes, but not in the same week. Plan brow lamination at least 4 weeks after a PMU treatment.']] },
  },
  homeFaq: [
    ['How much does permanent eyebrow make-up cost in Almere?', 'At Angel Brandão Beauty you pay €350 instead of €599 during the promotion for nano brows, powder brows or combi brows. The touch-up after 6 to 8 weeks is included. Lip blush costs €249 instead of €499.'],
    ['How long does permanent make-up last?', 'Eyebrows on average 1.5 to 3 years, depending on the technique, your skin type and sun exposure. Lip blush 2 to 3 years. The pigment fades gradually and can be refreshed afterwards.'],
    ['Does permanent make-up hurt?', 'I use a numbing cream. Most clients describe it as a light scratching or tingling, very manageable.'],
    ['How do I book?', 'On WhatsApp. Send a message with a photo of your brows or lips, I answer your questions and advise which technique and colour suit you, and we book your treatment right away.'],
    ['Where is the studio?', 'At Beauty Clinic Almere, Zadelmakerstraat 49, 1315 AN Almere, in the city centre within walking distance of Almere Centrum station. I work by appointment.'],
    ['Do you work hygienically and are you certified?', 'Yes. I only use sterile disposable needles and materials, wear gloves and follow the hygiene guidelines for tattooing and PMU. I am certified in micropigmentation and have more than 7 years of experience.'],
  ],
  home: {
    title: 'Permanent Make-up Almere | Powder, Nano & Lip Blush | Angel Brandão', description: 'PMU specialist in Almere city centre: nanoblading (nano brows), powder brows, combi brows and lip blush with a natural result. 7+ years of experience, advice and booking on WhatsApp, promo €350.',
    eyebrow: 'Permanent make-up (PMU) · Almere city centre', h1: 'Permanent make-up in Almere: natural brows and lips, perfect every day', lead: 'Permanent make-up in Almere: nanoblading (nano brows), powder brows, combi brows and lip blush by Angel Brandão. More than 7 years of experience, a gentle hand and a result that looks like it is simply yours.',
    cta1: 'Book on WhatsApp', cta2: 'See treatments', trust: ['7+ years of experience', 'Personal advice on WhatsApp', 'Sterile & certified', 'Touch-up included'], heroAlt: 'Angel Brandão, permanent make-up specialist in Almere',
    promoEyebrow: 'Limited-time offer', promoH: 'Brows <s>€599</s> <strong>€350</strong> · Lip blush <s>€499</s> <strong>€249</strong> · Both <strong>€500</strong>', promoP: 'Valid for nano, powder and combi brows. Includes design, colour advice and the touch-up after 6 to 8 weeks. Limited availability.', promoBtn: 'All prices',
    svcEyebrow: 'Treatments', svcH: 'Choose the technique that suits you', svcSub: 'Not sure? Send a photo on WhatsApp. I look at your skin type and your own brow hair and honestly advise what looks best and lasts longest.',
    whyEyebrow: 'Why Angel Brandão', whyH: 'Natural is the only result I make', whyAlt: 'Close-up of natural-looking permanent make-up eyebrows',
    why: ['<strong>Design first, pigment second.</strong> I measure and draw the shape. You watch until it is right.', '<strong>Soft and layer by layer.</strong> Better slightly too light and touched up, than too dark and regretted.', '<strong>Sterile and certified.</strong> Disposable needles, gloves and hygiene according to the guidelines.', '<strong>More than 7 years of experience</strong> in micropigmentation and make-up, in Brazil and the Netherlands.', '<strong>Honest advice.</strong> If a technique does not suit your skin, I say so.'], whyBtn: 'Meet Angel',
    galEyebrow: 'Before & after', galH: 'Real clients, real results', gal: [['before-after-3.jpg', 'Nano brows, right after the treatment'], ['work-4.jpg', 'Nano brows, after 4 weeks']], galMore: 'More results',
    stepsEyebrow: 'How it works', stepsH: 'From consultation to perfect brows',
    steps: [['Contact on WhatsApp', 'You send a message and a photo. We discuss your wishes, your skin and the best technique and book your appointment.'], ['Design & colour', 'I measure and draw the shape and choose the pigment colour together with you.'], ['Treatment', 'With numbing cream, in approx. 1.5 to 2 hours. You receive clear aftercare instructions.'], ['Touch-up', 'After 6 to 8 weeks we perfect the result. Included in the price.']],
    aboutEyebrow: 'About Angel', aboutH: 'Hi, I am Angel', aboutP1: 'Brazilian make-up artist and permanent make-up specialist, based in Almere since 2026. I have worked with brows and lips for more than 7 years and believe in one thing: make-up should make you more beautiful, not different. That is why I work softly, naturally and always together with you.', aboutP2: 'I speak English, Dutch and Portuguese.', aboutBtn: 'Read my story', aboutAlt: 'Angel Brandão in the studio in Almere',
  },
  treatPage: { forWho: (n) => `Who is ${n} for?`, good: 'Good to know', howH: 'How does the treatment go?', faqH: (n) => `Questions about ${n}`, others: 'Other treatments', band: (n) => `Ready for ${n}?`, ctaBtn: (n) => `Book ${n} on WhatsApp`, alt: (n) => `${n} result`,
    steps: [['Contact', 'On WhatsApp: wishes, skin type, health and expectations. Honest advice on the technique and an appointment right away.'], ['Design', 'I measure your face and draw the shape. You watch and we adjust until it is right.'], ['Pigmenting', 'With numbing cream and sterile disposable materials. Calmly, layer by layer.'], ['Aftercare & touch-up', 'Clear <a href="/en/aftercare/">aftercare instructions</a> and a touch-up after 6 to 8 weeks, included.']] },
  treatIndex: { title: 'Treatments | Permanent make-up Almere | Angel Brandão', description: 'Overview of all PMU treatments at Angel Brandão in Almere: nano brows, powder brows, combi brows, lip blush and brow lamination. With comparison and prices.', eyebrow: 'Treatments', h1: 'Permanent make-up treatments in Almere', lead: 'Eyebrows in three techniques, lip blush and brow lamination as a non-permanent option. All with a natural result and personal advice on WhatsApp.',
    cmpH: 'Nano, powder or combi: which suits you?', cmpHead: ['', 'Nano Brows', 'Powder Brows', 'Combi Brows'], cmp: [['Look', 'Individual, fine hair strokes', 'Soft powder / make-up look', 'Strokes at the front, powder behind'], ['Skin type', 'Normal to dry', 'All skin types, including oily', 'All skin types'], ['Own hair', 'Preferably some own hair', 'Little to none', 'Little to medium'], ['Lasts', '1.5 – 2 years', '2 – 3 years', '2 – 3 years'], ['Promo price', '€350', '€350', '€350']] },
  prices: { title: 'Prices permanent make-up Almere | Angel Brandão', description: 'Prices for nano brows, powder brows, combi brows and lip blush in Almere. Promo: brows €350 instead of €599, lip blush €249, combi deal €500. Touch-up included, booking on WhatsApp.', eyebrow: 'Prices', h1: 'Permanent make-up prices Almere', lead: 'Honest prices, no surprises. The touch-up after 6 to 8 weeks is always included. Questions are free on WhatsApp.',
    head: ['Treatment', 'Regular', 'Promo price', 'Included'],
    rows: [['Nano Brows', '€599', '€350', 'incl. design, colour advice and touch-up after 6 – 8 weeks'], ['Powder Brows', '€599', '€350', 'incl. design, colour advice and touch-up after 6 – 8 weeks'], ['Combi Brows', '€599', '€350', 'incl. design, colour advice and touch-up after 6 – 8 weeks'], ['Velvet Lip Blush', '€499', '€249', 'incl. design and touch-up after 6 – 8 weeks'], ['Brows + lips (combi deal)', '', '€500', 'two treatments, two touch-ups'], ['Refresh (existing clients)', '', 'on request', 'depends on how much pigment is left'], ['Brow lamination', '', 'on request', 'approx. 45 – 60 min']],
    note: 'Promo prices apply while spots are available. Payment by iDEAL or bank transfer. Appointments can be rescheduled free of charge up to 48 hours in advance.',
    faq: [['Is the touch-up really included?', 'Yes. The touch-up after 6 to 8 weeks is needed for a beautiful, even result and is always included.'], ['What if I already have old permanent make-up?', 'Send a photo on WhatsApp. Sometimes I can work over it, sometimes the old pigment needs to be (laser) removed first. We discuss this honestly in the consultation.'], ['How can I pay?', 'By iDEAL or bank transfer. You receive a payment request on WhatsApp.']], faqH: 'Questions about prices' },
  gallery: { title: 'Before & after photos | Permanent make-up Almere | Angel Brandão', description: 'See before and after photos of nano brows, powder brows, combi brows and lip blush at Angel Brandão in Almere.', eyebrow: 'Before & after', h1: 'Permanent make-up results', lead: 'Real clients from Almere and the surrounding area, photographed with consent. Right after the treatment the colour is always darker; after 4 weeks you see the soft final result.',
    imgs: [['before-after-3.jpg', 'Nano brows, before and right after the treatment'], ['work-11.jpg', 'Brows after the treatment'], ['work-4.jpg', 'Natural hair strokes'], ['work-16.jpg', 'Shape and colour made to measure'], ['work-7.jpg', 'Soft, even result'], ['work-3.jpg', 'Design together with the client']], more: 'More daily results on', band: 'Want this too?' },
  about: { title: 'About Angel Brandão | Permanent make-up specialist Almere', description: 'Meet Angel Brandão, permanent make-up specialist in Almere with more than 7 years of experience in micropigmentation and make-up. Natural, gentle and honest.', eyebrow: 'About Angel', h1: 'Beauty with purpose', lead: 'I am Angel Brandão, make-up artist and permanent make-up specialist. Born in Brazil, at home in Almere since 2026.',
    p1: 'My career started with bridal and evening make-up. Hundreds of faces, hundreds of different wishes. That is where I learned the most important thing I use every day: every face has its own lines, and make-up only works when it respects those lines.', p2: 'More than 7 years ago I specialised in micropigmentation. Brows and lips that already look good every morning, without anyone noticing it is permanent make-up. That is my only goal in every treatment.',
    howH: 'How I work', how: ['<strong>Calm and together.</strong> I draw first, you watch, and I only start when you are happy with the shape.', '<strong>Natural above all.</strong> Soft colours, fine strokes, never too dark. You can always add, never remove.', '<strong>Hygiene without compromise.</strong> Sterile disposable needles, gloves, a clean workplace, according to the PMU guidelines.', '<strong>Honest advice.</strong> If a technique does not suit your skin or wish, I say so, even if that means you have nothing done.'],
    practH: 'Practical', pract: 'I work at Beauty Clinic Almere, Zadelmakerstraat 49 in Almere city centre, by appointment, weekends included. I speak English, Dutch and Portuguese.', kvk: `Registered with the Dutch Chamber of Commerce (KvK) under number ${SITE.kvk}.`, band: 'Shall we meet?', alt: 'Angel Brandão at Beauty Clinic Almere' },
  aftercare: { title: 'Aftercare permanent make-up brows & lips | Angel Brandão Almere', description: 'Aftercare instructions after permanent make-up: day by day what to do and avoid after nano brows, powder brows, combi brows and lip blush. From Angel Brandão, Almere.', eyebrow: 'Aftercare', h1: 'Permanent make-up aftercare', lead: 'Good aftercare makes half of your result. These are my instructions for brows and lips. You also receive them on paper after the treatment.',
    sections: [
      ['Day 0: treatment day', ['Keep the area clean and dry for the first 2 hours.', 'Then gently clean with sterile saline (NaCl 0.9%) or cooled boiled water on a clean cotton pad. Dab, do not rub.', 'Apply a thin layer of white petroleum jelly with a clean cotton bud.', 'Sleep on your back if possible, on a clean pillowcase.']],
      ['Day 1 to 3', ['Clean in the morning and evening and dab dry.', 'A thin layer of petroleum jelly twice a day. Not too much: excess traps moisture and slows healing.', 'Mild redness, swelling and a darker colour than expected are normal.']],
      ['Day 4 to 7', ['Clean gently once a day.', 'Scabs or flakes may appear. Do not scratch, rub or pick. Let them come off by themselves.', 'Reduce petroleum jelly to once a day.']],
    ],
    avoidH: 'Avoid for 14 days', avoidHead: ['Avoid', 'Why'], avoid: [['Touching with unwashed hands', 'Risk of infection'], ['Scratching, picking, pulling scabs', 'Pigment loss and scarring'], ['Long showers, baths, swimming, sauna', 'Pigment loss and infection'], ['Direct sunlight and sunbeds', 'Fading and irritation'], ['Intense exercise and heavy sweating', 'Pigment loss'], ['Make-up or products on the area', 'Risk of infection and pigment loss'], ['Retinol, AHA, BHA and vitamin C nearby', 'Pigment damage'], ['Sleeping on your stomach', 'Pigment loss']],
    sections2: [
      ['Day 8 to 30', ['The scabs are gone. The colour may now look light, ashy or patchy. That is normal: the true colour is still coming back.', 'From day 15 the colour gradually becomes warmer and fuller. Around day 28 you see the final result.', 'Normal skincare is fine again, but no retinol or acids on the brow itself.']],
    ],
    touchH: 'Touch-up after 6 to 8 weeks', touchP: 'The touch-up is needed for an even, long-lasting result and is included in the price. Without it the result often stays too light or uneven.', doubtH: 'Unsure about something?', doubtP: 'Feel free to send me a photo on <a href="WA">WhatsApp</a>. In case of severe pain, pus or fever, contact your GP.' },
  contact: { title: 'Contact & appointment | Angel Brandão Beauty Almere', description: 'Book permanent make-up in Almere city centre on WhatsApp. By appointment, weekends included. Usually a reply within a few hours.', eyebrow: 'Contact', h1: 'Book an appointment', lead: 'The fastest way is WhatsApp. Send a message with a photo of your brows or lips, I answer your questions and we book your treatment right away. I usually reply within a few hours.',
    studioH: 'Studio', studioP: 'Beauty Clinic Almere<br>Zadelmakerstraat 49<br>1315 AN Almere (city centre)<br><a href="https://www.google.com/maps/search/?api=1&query=Zadelmakerstraat+49+1315AN+Almere" target="_blank" rel="noopener">Directions via Google Maps</a>, walking distance from Almere Centrum station.', hoursH: 'Opening hours', hoursP: 'By appointment, Monday to Sunday. Evening and weekend appointments are possible.', reachH: 'Getting there', reachP: 'Easy to reach by public transport and car; parking is available in the city centre garages. Clients come from all of Almere (Stad, Buiten, Haven, Poort, Hout) and from Lelystad, Dronten, Hilversum, Amersfoort and Amsterdam.', langH: 'Languages', langP: 'English · Nederlands · Português', alt: 'Designing the brows together with the client' },
  privacy: { title: 'Privacy policy | Angel Brandão Beauty', description: 'Privacy policy of Angel Brandão Beauty, Almere.', eyebrow: 'Privacy', h1: 'Privacy policy',
    blocks: [['', `${SITE.name} (KvK ${SITE.kvk}), based in Almere, is responsible for the processing of personal data as described in this policy.`], ['Which data', 'When you contact me via WhatsApp, Instagram or e-mail I process your name, phone number and the content of your message. For a treatment you fill in a health questionnaire and a consent form. I only take and use photos of the result with your written consent.'], ['Purpose', 'To answer your question, schedule an appointment, carry out the treatment safely and comply with legal retention obligations (including tax administration).'], ['Retention', 'Treatment records are kept for a maximum of 5 years after the last treatment; administrative records for 7 years according to the legal retention period. Messages are deleted as soon as they are no longer needed.'], ['Sharing with third parties', 'I never sell your data. I only share it with parties needed for my services (such as my accountant) or when required by law.'], ['Cookies', 'This website does not use tracking cookies. Fonts are loaded via Google Fonts.'], ['Your rights', 'You can view, correct or delete your data. Send a message via <a href="WA">WhatsApp</a>. You also have the right to file a complaint with the Dutch Data Protection Authority.']] },
  notFound: { title: 'Page not found | Angel Brandão Beauty', h1: 'Page not found', p: 'This page does not exist (anymore). <a href="/en/">Back to the homepage</a> or <a href="/en/treatments/">see the treatments</a>.' },
  schemaDesc: 'Permanent make-up specialist in Almere city centre: nano brows, powder brows, combi brows and lip blush. Natural result, advice and booking on WhatsApp.',
};

const LANGS = [NL, EN];

// ---------------------------------------------------------------- shared pieces
const faqBlock = (items, heading) => `<section class="faq" id="faq"><div class="wrap"><h2>${heading}</h2>${items.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n')}</div></section>`;
const faqSchema = (items) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
const businessSchema = (L) => ({
  '@context': 'https://schema.org', '@type': 'BeautySalon', '@id': `${SITE.domain}/#business`, name: SITE.name, url: SITE.domain + L.routes.home, telephone: SITE.phone, image: `${SITE.domain}/assets/img/og.jpg`, priceRange: '€€',
  description: L.schemaDesc, address: { '@type': 'PostalAddress', streetAddress: SITE.address.street, postalCode: SITE.address.zip, addressLocality: 'Almere', addressRegion: 'Flevoland', addressCountry: 'NL' }, hasMap: SITE.maps,
  areaServed: ['Almere', 'Amsterdam', 'Lelystad', 'Hilversum', 'Flevoland'], sameAs: [SITE.instagram, SITE.facebook], openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '09:00', closes: '20:00' }], geo: { '@type': 'GeoCoordinates', latitude: 52.3717, longitude: 5.2179 }, currenciesAccepted: 'EUR', paymentAccepted: 'iDEAL, bankoverschrijving',
  makesOffer: SLUGS.filter((s) => PRICE[s]).map((s) => ({ '@type': 'Offer', name: L.treatments[s].name, price: PRICE[s].now, priceCurrency: 'EUR', url: SITE.domain + L.routes.treatment(s) })),
});
const ctaBand = (L, h) => `<section class="cta-band"><div class="wrap"><h2>${esc(h || L.band.h)}</h2><p>${esc(L.band.p)}</p><a class="btn btn-gold" href="${wa(L.ctaText)}" target="_blank" rel="noopener">${L.band.btn}</a><small>${L.band.small}</small></div></section>`;
const stepsList = (steps) => `<ol class="grid-4">${steps.map(([h, p], i) => `<li><span>0${i + 1}</span><h3>${h}</h3><p>${p}</p></li>`).join('')}</ol>`;
const priceHtml = (L, s) => PRICE[s] ? `<p class="price"><s>${euro(PRICE[s].from)}</s> <strong>${euro(PRICE[s].now)}</strong></p>` : `<p class="price"><strong>${L.onRequest}</strong></p>`;
const svcCards = (L, tag) => SLUGS.map((s) => { const t = L.treatments[s]; return `<a class="card svc" href="${L.routes.treatment(s)}">${icon(ICON[s])}<${tag}>${t.name}</${tag}><p>${esc(t.short)}</p>${priceHtml(L, s)}<span class="link">${tag === 'h3' ? L.more(t.name) : L.view}</span></a>`; }).join('');

function layout(L, { key, title, description, canonical, body, schema = [], bodyClass = '' }) {
  const other = L === NL ? EN : NL;
  let altUrl = key === 'treatment' ? other.routes.treatment(bodyClass) : other.routes[key] || other.routes.home;
  if (key === 'article') { const i = ARTICLES[L.code].items.findIndex((a) => a.slug === bodyClass); altUrl = i >= 0 ? other.routes.article(ARTICLES[other.code].items[i].slug) : other.routes.kennis; }
  const thisUrl = canonical;
  const jsonld = [businessSchema(L), ...schema].map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n');
  const navTreat = SLUGS.map((s) => `<li><a href="${L.routes.treatment(s)}">${L.treatments[s].name}</a></li>`).join('');
  const cta = wa(L.ctaText);
  return `<!doctype html>
<html lang="${L.code}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${SITE.domain}${thisUrl}">
<link rel="alternate" hreflang="${L.code}" href="${SITE.domain}${thisUrl}">
<link rel="alternate" hreflang="${other.code}" href="${SITE.domain}${altUrl}">
<link rel="alternate" hreflang="x-default" href="${SITE.domain}${L === NL ? thisUrl : altUrl}">
<meta property="og:type" content="website"><meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${SITE.domain}${thisUrl}"><meta property="og:image" content="${SITE.domain}/assets/img/og.jpg"><meta property="og:locale" content="${L.locale}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#3B2A22">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="alternate" type="application/rss+xml" title="Angel Brandão Beauty" href="${L.code === 'nl' ? '/kennis/feed.xml' : '/en/guides/feed.xml'}">
${bodyClass === 'home' ? '<link rel="preload" as="image" href="/assets/img/angel-hero.webp" imagesrcset="/assets/img/angel-hero-480.webp 480w, /assets/img/angel-hero-800.webp 800w, /assets/img/angel-hero.webp 1200w" imagesizes="(max-width: 900px) calc(100vw - 40px), 45vw">' : ''}
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Montserrat:wght@300;400;500&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Montserrat:wght@300;400;500&display=swap" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Montserrat:wght@300;400;500&display=swap"></noscript>
<style>${CSS}</style>
${jsonld}
</head>
<body class="${bodyClass}">
<a class="skip" href="#main">${L.nav.skip}</a>
<header class="site-header">
  <div class="wrap nav-wrap">
    <a class="brand" href="${L.routes.home}"><span class="mono">AB</span><span class="wordmark">Angel Brandão</span></a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="nav" aria-label="${L.nav.menu}"><span></span><span></span><span></span></button>
    <nav id="nav" class="nav">
      <ul>
        <li><a href="${L.routes.pillar}">${PILLAR[L.code].nav}</a></li>
        <li class="has-sub"><a href="${L.routes.treatments}">${L.nav.treatments}</a><ul class="sub">${navTreat}</ul></li>
        <li><a href="${L.routes.prices}">${L.nav.prices}</a></li>
        <li><a href="${L.routes.gallery}">${L.nav.gallery}</a></li>
        <li><a href="${L.routes.about}">${L.nav.about}</a></li>
        <li><a href="${L.routes.aftercare}">${L.nav.aftercare}</a></li>
        <li><a href="${L.routes.kennis}">${ARTICLES[L.code].nav}</a></li>
        <li><a href="${L.routes.contact}">${L.nav.contact}</a></li>
        <li class="lang"><a href="${altUrl}" hreflang="${other.code}" lang="${other.code}">${L.nav.switch}</a></li>
        <li class="nav-cta"><a class="btn btn-gold btn-sm" href="${cta}" target="_blank" rel="noopener">${L.nav.cta}</a></li>
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
      <p class="tag">${L.footer.tag}</p>
      <p>${L.footer.about}</p>
    </div>
    <div><h3>${L.footer.treatments}</h3><ul>${navTreat}</ul></div>
    <div><h3>${L.footer.studio}</h3><address>${L.footer.studioText}</address><p>${L.footer.hours}</p></div>
    <div><h3>${L.footer.contact}</h3>
      <p><a href="${SITE.whatsapp}" target="_blank" rel="noopener">${L.wa} ${SITE.phoneDisplay}</a></p>
      <p><a href="${SITE.instagram}" target="_blank" rel="noopener">${L.ig}</a></p>
      <p><a href="${L.routes.aftercare}">${L.nav.aftercare}</a> · <a href="${L.routes.contact}#faq">${L.nav.faq}</a> · <a href="${L.routes.privacy}">${L.nav.privacy}</a> · <a href="${altUrl}" hreflang="${other.code}">${L.nav.switch}</a></p>
    </div>
  </div>
  <div class="wrap footer-bottom"><p>${L.footer.bottom}</p></div>
</footer>
<a class="wa-float" href="${cta}" target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><path fill="currentColor" d="M16 3C9.4 3 4 8.3 4 14.9c0 2.3.7 4.6 1.9 6.5L4 29l7.8-2c1.8 1 3.9 1.5 6 1.5 6.6 0 12-5.3 12-11.9S22.6 3 16 3zm0 21.7c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-4.6 1.2 1.2-4.5-.3-.4A9.8 9.8 0 0 1 6 14.9C6 9.4 10.5 5 16 5s10 4.4 10 9.9-4.5 9.8-10 9.8zm5.5-7.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5.3-.5c.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.8.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4l-.6-.3z"/></svg></a>
<script>
(function(){var b=document.querySelector('.nav-toggle'),n=document.getElementById('nav');b.addEventListener('click',function(){var o=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',!o);n.classList.toggle('open',!o);});
document.querySelectorAll('.has-sub > a').forEach(function(a){a.addEventListener('click',function(e){if(window.innerWidth<900){e.preventDefault();a.parentElement.classList.toggle('open');}});});})();
</script>
</body>
</html>`;
}

// ---------------------------------------------------------------- pages
function homePage(L) {
  const H = L.home;
  const body = `
<section class="hero"><div class="wrap hero-grid">
  <div class="hero-text">
    <p class="eyebrow"><a href="${L.routes.pillar}">${H.eyebrow}</a></p>
    <h1>${H.h1}</h1>
    <p class="lead">${H.lead}</p>
    <div class="hero-actions"><a class="btn btn-gold" href="${wa(L.ctaText)}" target="_blank" rel="noopener">${H.cta1}</a><a class="btn btn-ghost" href="${L.routes.treatments}">${H.cta2}</a></div>
    <ul class="trust">${H.trust.map((t) => `<li>${t}</li>`).join('')}</ul>
  </div>
  <figure class="hero-img"><img src="/assets/img/angel-hero.webp" srcset="/assets/img/angel-hero-480.webp 480w, /assets/img/angel-hero-800.webp 800w, /assets/img/angel-hero.webp 1200w" sizes="(max-width: 900px) calc(100vw - 40px), 45vw" alt="${esc(H.heroAlt)}" width="1200" height="1400" fetchpriority="high"></figure>
</div></section>
<section class="promo"><div class="wrap promo-inner"><p class="eyebrow light">${H.promoEyebrow}</p><h2>${H.promoH}</h2><p>${H.promoP}</p><a class="btn btn-light" href="${L.routes.prices}">${H.promoBtn}</a></div></section>
<section class="services" id="behandelingen"><div class="wrap"><p class="eyebrow">${H.svcEyebrow}</p><h2>${H.svcH}</h2><p class="sub">${H.svcSub}</p><div class="grid-3">${svcCards(L, 'h3')}</div></div></section>
<section class="why"><div class="wrap why-grid">
  <figure><img src="/assets/img/work-11.webp" srcset="/assets/img/work-11-480.webp 480w, /assets/img/work-11-800.webp 800w, /assets/img/work-11.webp 1200w" sizes="(max-width: 900px) calc(100vw - 40px), 45vw" alt="${esc(H.whyAlt)}" width="1200" height="1600" loading="lazy"></figure>
  <div><p class="eyebrow">${H.whyEyebrow}</p><h2>${H.whyH}</h2><ul class="checks">${H.why.map((w) => `<li>${w}</li>`).join('')}</ul><a class="btn btn-dark" href="${L.routes.about}">${H.whyBtn}</a></div>
</div></section>
<section class="gallery"><div class="wrap"><p class="eyebrow">${H.galEyebrow}</p><h2>${H.galH}</h2>
  <div class="grid-3 gal">${H.gal.map(([f, c]) => `<figure><img src="/assets/img/${f.replace('.jpg','.webp')}" srcset="/assets/img/${f.replace('.jpg','-480.webp')} 480w, /assets/img/${f.replace('.jpg','-800.webp')} 800w, /assets/img/${f.replace('.jpg','.webp')} 1200w" sizes="(max-width: 600px) calc(100vw - 40px), 30vw" alt="${esc(c)}" width="1200" height="1500" loading="lazy"><figcaption>${esc(c)}</figcaption></figure>`).join('')}</div>
  <p class="center"><a class="btn btn-ghost" href="${L.routes.gallery}">${H.galMore}</a> <a class="btn btn-ghost" href="${SITE.instagram}" target="_blank" rel="noopener">Instagram</a></p>
</div></section>
<section class="steps"><div class="wrap"><p class="eyebrow">${H.stepsEyebrow}</p><h2>${H.stepsH}</h2>${stepsList(H.steps)}</div></section>
<section class="about-teaser"><div class="wrap about-grid">
  <div><p class="eyebrow">${H.aboutEyebrow}</p><h2>${H.aboutH}</h2><p>${H.aboutP1}</p><p>${H.aboutP2}</p><a class="btn btn-dark" href="${L.routes.about}">${H.aboutBtn}</a></div>
  <figure><img src="/assets/img/angel-sofa.webp" srcset="/assets/img/angel-sofa-480.webp 480w, /assets/img/angel-sofa-800.webp 800w, /assets/img/angel-sofa.webp 1200w" sizes="(max-width: 900px) calc(100vw - 40px), 45vw" alt="${esc(H.aboutAlt)}" width="1200" height="1500" loading="lazy"></figure>
</div></section>
${faqBlock(L.homeFaq, L.faqTitle)}
${ctaBand(L)}`;
  return layout(L, { key: 'home', title: H.title, description: H.description, canonical: L.routes.home, body, schema: [faqSchema(L.homeFaq)], bodyClass: 'home' });
}

function treatmentPage(L, s) {
  const t = L.treatments[s]; const P = L.treatPage;
  const others = SLUGS.filter((o) => o !== s).map((o) => `<li><a href="${L.routes.treatment(o)}">${L.treatments[o].name}</a></li>`).join('');
  const body = `
<section class="page-hero"><div class="wrap">
  <p class="eyebrow"><a href="${L.routes.treatments}">${L.nav.treatments}</a> · ${t.name}</p>
  <h1>${esc(t.h1)}</h1><p class="lead">${esc(t.intro)}</p>
  <div class="hero-actions"><a class="btn btn-gold" href="${wa(L.ctaTreat(t.name))}" target="_blank" rel="noopener">${P.ctaBtn(t.name)}</a>${PRICE[s] ? `<span class="price-pill"><s>${euro(PRICE[s].from)}</s> <strong>${euro(PRICE[s].now)}</strong> ${L.promoPrice}</span>` : ''}</div>
</div></section>
<section class="two-col"><div class="wrap two-grid">
  <div><h2>${P.forWho(t.name)}</h2><ul class="checks">${t.forWho.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
  <h2>${P.good}</h2><dl class="facts">${t.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl></div>
  <figure class="sticky"><img src="/assets/img/${IMG[s].replace('.jpg','.webp')}" srcset="/assets/img/${IMG[s].replace('.jpg','-480.webp')} 480w, /assets/img/${IMG[s].replace('.jpg','-800.webp')} 800w, /assets/img/${IMG[s].replace('.jpg','.webp')} 1200w" sizes="(max-width: 900px) calc(100vw - 40px), 36vw" alt="${esc(P.alt(t.name))}" width="900" height="1200" fetchpriority="high"></figure>
</div></section>
<section class="steps alt"><div class="wrap"><h2>${P.howH}</h2>${stepsList(P.steps)}</div></section>
${faqBlock(t.faq, P.faqH(t.name))}
<section class="related"><div class="wrap"><h2>${P.others}</h2><ul class="pills">${others}</ul></div></section>
${ctaBand(L, P.band(t.name))}`;
  const schema = [faqSchema(t.faq), { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain + L.routes.home }, { '@type': 'ListItem', position: 2, name: L.nav.treatments, item: SITE.domain + L.routes.treatments }, { '@type': 'ListItem', position: 3, name: t.name, item: SITE.domain + L.routes.treatment(s) }] }, { '@context': 'https://schema.org', '@type': 'Service', name: `${t.name} Almere`, serviceType: t.name, provider: { '@id': `${SITE.domain}/#business` }, areaServed: 'Almere', description: t.description, url: SITE.domain + L.routes.treatment(s), ...(PRICE[s] ? { offers: { '@type': 'Offer', price: PRICE[s].now, priceCurrency: 'EUR', priceValidUntil: '2026-12-31' } } : {}) }];
  return layout(L, { key: 'treatment', title: t.title, description: t.description, canonical: L.routes.treatment(s), body, schema, bodyClass: s });
}

function treatmentsIndex(L) {
  const T = L.treatIndex;
  const body = `<section class="page-hero"><div class="wrap"><p class="eyebrow">${T.eyebrow}</p><h1>${T.h1}</h1><p class="lead">${T.lead}</p></div></section>
<section class="services"><div class="wrap"><div class="grid-3">${svcCards(L, 'h2')}</div></div></section>
<section class="compare"><div class="wrap"><h2>${T.cmpH}</h2><div class="table-wrap"><table><thead><tr>${T.cmpHead.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${T.cmp.map((r) => `<tr><th>${r[0]}</th>${r.slice(1).map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div></section>
${ctaBand(L)}`;
  return layout(L, { key: 'treatments', title: T.title, description: T.description, canonical: L.routes.treatments, body });
}

function pricesPage(L) {
  const P = L.prices;
  const body = `<section class="page-hero"><div class="wrap"><p class="eyebrow">${P.eyebrow}</p><h1>${P.h1}</h1><p class="lead">${P.lead}</p></div></section>
<section class="prices"><div class="wrap"><div class="table-wrap"><table class="price-table"><thead><tr>${P.head.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
<tbody>${P.rows.map(([n, f, p, i]) => `<tr><th>${n}</th><td>${f ? `<s>${f}</s>` : ''}</td><td><strong>${p}</strong></td><td>${i}</td></tr>`).join('')}</tbody></table></div><p class="note">${P.note}</p></div></section>
${faqBlock(P.faq, P.faqH)}
${ctaBand(L)}`;
  return layout(L, { key: 'prices', title: P.title, description: P.description, canonical: L.routes.prices, body, schema: [faqSchema(P.faq)] });
}

function galleryPage(L) {
  const G = L.gallery;
  const body = `<section class="page-hero"><div class="wrap"><p class="eyebrow">${G.eyebrow}</p><h1>${G.h1}</h1><p class="lead">${G.lead}</p></div></section>
<section class="gallery"><div class="wrap"><div class="grid-3 gal">${G.imgs.map(([f, c]) => `<figure><img src="/assets/img/${f.replace('.jpg','.webp')}" srcset="/assets/img/${f.replace('.jpg','-480.webp')} 480w, /assets/img/${f.replace('.jpg','-800.webp')} 800w, /assets/img/${f.replace('.jpg','.webp')} 1200w" sizes="(max-width: 600px) calc(100vw - 40px), 30vw" alt="${esc(c)}" width="1200" height="1500" loading="lazy"><figcaption>${esc(c)}</figcaption></figure>`).join('')}</div>
<p class="center">${G.more} <a href="${SITE.instagram}" target="_blank" rel="noopener">Instagram @anggel_brandao</a>.</p></div></section>
${ctaBand(L, G.band)}`;
  return layout(L, { key: 'gallery', title: G.title, description: G.description, canonical: L.routes.gallery, body });
}

function aboutPage(L) {
  const A = L.about;
  const body = `<section class="page-hero"><div class="wrap"><p class="eyebrow">${A.eyebrow}</p><h1>${A.h1}</h1><p class="lead">${A.lead}</p></div></section>
<section class="two-col"><div class="wrap two-grid">
<div class="prose"><p>${A.p1}</p><p>${A.p2}</p><h2>${A.howH}</h2><ul class="checks">${A.how.map((x) => `<li>${x}</li>`).join('')}</ul><h2>${A.practH}</h2><p>${A.pract}</p><p>${A.kvk}</p></div>
<figure class="sticky"><img src="/assets/img/angel-reception.webp" srcset="/assets/img/angel-reception-480.webp 480w, /assets/img/angel-reception-800.webp 800w, /assets/img/angel-reception.webp 1200w" sizes="(max-width: 900px) calc(100vw - 40px), 45vw" alt="${esc(A.alt)}" width="1200" height="1500" loading="lazy"></figure>
</div></section>
${ctaBand(L, A.band)}`;
  return layout(L, { key: 'about', title: A.title, description: A.description, canonical: L.routes.about, body });
}

function aftercarePage(L) {
  const A = L.aftercare;
  const sec = (arr) => arr.map(([h, items]) => `<h2>${h}</h2><ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`).join('');
  const body = `<section class="page-hero"><div class="wrap"><p class="eyebrow">${A.eyebrow}</p><h1>${A.h1}</h1><p class="lead">${A.lead}</p></div></section>
<section class="two-col"><div class="wrap prose narrow">
${sec(A.sections)}
<h2>${A.avoidH}</h2><div class="table-wrap"><table><thead><tr>${A.avoidHead.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${A.avoid.map(([a, b]) => `<tr><td>${a}</td><td>${b}</td></tr>`).join('')}</tbody></table></div>
${sec(A.sections2)}
<h2>${A.touchH}</h2><p>${A.touchP}</p>
<h2>${A.doubtH}</h2><p>${A.doubtP.replace('href="WA"', `href="${SITE.whatsapp}" target="_blank" rel="noopener"`)}</p>
</div></section>
${ctaBand(L)}`;
  return layout(L, { key: 'aftercare', title: A.title, description: A.description, canonical: L.routes.aftercare, body });
}

function contactPage(L) {
  const C = L.contact;
  const body = `<section class="page-hero"><div class="wrap"><p class="eyebrow">${C.eyebrow}</p><h1>${C.h1}</h1><p class="lead">${C.lead}</p>
<div class="hero-actions"><a class="btn btn-gold" href="${wa(L.ctaText)}" target="_blank" rel="noopener">WhatsApp ${SITE.phoneDisplay}</a><a class="btn btn-ghost" href="${SITE.instagram}" target="_blank" rel="noopener">Instagram</a></div></div></section>
<section class="two-col"><div class="wrap two-grid">
<div class="prose"><h2>${C.studioH}</h2><address>${C.studioP}</address><h2>${C.hoursH}</h2><p>${C.hoursP}</p><h2>${C.reachH}</h2><p>${C.reachP}</p><h2>${C.langH}</h2><p>${C.langP}</p></div>
<figure><img src="/assets/img/work-3.webp" srcset="/assets/img/work-3-480.webp 480w, /assets/img/work-3-800.webp 800w, /assets/img/work-3.webp 1200w" sizes="(max-width: 900px) calc(100vw - 40px), 45vw" alt="${esc(C.alt)}" width="1200" height="1600" loading="lazy"></figure>
</div></section>
${faqBlock(L.homeFaq, L.faqTitle)}`;
  return layout(L, { key: 'contact', title: C.title, description: C.description, canonical: L.routes.contact, body, schema: [faqSchema(L.homeFaq)] });
}

function privacyPage(L) {
  const P = L.privacy;
  const body = `<section class="page-hero"><div class="wrap"><p class="eyebrow">${P.eyebrow}</p><h1>${P.h1}</h1></div></section>
<section class="two-col"><div class="wrap prose narrow">${P.blocks.map(([h, p]) => `${h ? `<h2>${h}</h2>` : ''}<p>${p.replace('href="WA"', `href="${SITE.whatsapp}"`)}</p>`).join('')}</div></section>`;
  return layout(L, { key: 'privacy', title: P.title, description: P.description, canonical: L.routes.privacy, body });
}



function pillarPage(L) {
  const P = PILLAR[L.code];
  const body = `<section class="page-hero"><div class="wrap"><p class="eyebrow">${L.home.eyebrow}</p><h1>${P.h1}</h1><p class="lead">${esc(P.lead)}</p>
<div class="hero-actions"><a class="btn btn-gold" href="${wa(L.ctaText)}" target="_blank" rel="noopener">${L.home.cta1}</a><a class="btn btn-ghost" href="${L.routes.prices}">${L.nav.prices}</a></div></div></section>
<section class="two-col"><div class="wrap two-grid"><article class="prose">${P.body}</article><figure class="sticky"><img src="/assets/img/angel-hero.webp" srcset="/assets/img/angel-hero-480.webp 480w, /assets/img/angel-hero-800.webp 800w, /assets/img/angel-hero.webp 1200w" sizes="(max-width: 900px) calc(100vw - 40px), 36vw" alt="${esc(L.home.heroAlt)}" width="1200" height="1400" loading="lazy"></figure></div></section>
${faqBlock(P.faq, L.faqTitle)}${ctaBand(L)}`;
  const schema = [faqSchema(P.faq), { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain + L.routes.home }, { '@type': 'ListItem', position: 2, name: P.h1, item: SITE.domain + L.routes.pillar }] }];
  return layout(L, { key: 'pillar', title: P.title, description: P.desc, canonical: L.routes.pillar, body, schema });
}

function articlesIndex(L) {
  const A = ARTICLES[L.code];
  const cards = A.items.map((a) => `<a class="card svc" href="${L.routes.article(a.slug)}"><img class="card-img" src="/assets/img/${a.img.replace('.jpg','-480.webp')}" alt="" width="480" height="600" loading="lazy"><h2>${a.title}</h2><p>${esc(a.desc)}</p><span class="link">${A.read}</span></a>`).join('');
  const body = `<section class="page-hero"><div class="wrap"><p class="eyebrow">${A.h1}</p><h1>${A.h1} permanente make-up</h1><p class="lead">${A.lead}</p></div></section>
<section class="services"><div class="wrap"><div class="grid-3">${cards}</div></div></section>${ctaBand(L)}`;
  return layout(L, { key: 'kennis', title: A.indexTitle, description: A.indexDesc, canonical: L.routes.kennis, body });
}
function articlePage(L, a) {
  const A = ARTICLES[L.code];
  const body = `<section class="page-hero"><div class="wrap"><p class="eyebrow"><a href="${L.routes.kennis}">${A.h1}</a> · ${A.date} ${a.date}</p><h1>${a.title}</h1><p class="lead">${esc(a.desc)}</p></div></section>
<section class="two-col"><div class="wrap two-grid"><article class="prose">${a.body}</article><figure class="sticky"><img src="/assets/img/${a.img.replace('.jpg','.webp')}" srcset="/assets/img/${a.img.replace('.jpg','-480.webp')} 480w, /assets/img/${a.img.replace('.jpg','-800.webp')} 800w, /assets/img/${a.img.replace('.jpg','.webp')} 1200w" sizes="(max-width: 900px) calc(100vw - 40px), 36vw" alt="${esc(a.title)}" width="900" height="1200" loading="lazy"></figure></div></section>
<section class="related"><div class="wrap"><h2>${A.back}</h2><ul class="pills">${A.items.filter((o) => o.slug !== a.slug).map((o) => `<li><a href="${L.routes.article(o.slug)}">${o.title}</a></li>`).join('')}</ul></div></section>${ctaBand(L)}`;
  const schema = [{ '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.desc, datePublished: a.date, dateModified: a.date, inLanguage: L.code, image: `${SITE.domain}/assets/img/${a.img}`, author: { '@type': 'Person', name: 'Angel Brandão' }, publisher: { '@id': `${SITE.domain}/#business` }, mainEntityOfPage: SITE.domain + L.routes.article(a.slug) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE.domain + L.routes.home }, { '@type': 'ListItem', position: 2, name: A.h1, item: SITE.domain + L.routes.kennis }, { '@type': 'ListItem', position: 3, name: a.title, item: SITE.domain + L.routes.article(a.slug) }] }];
  return layout(L, { key: 'article', title: a.seoTitle, description: a.desc, canonical: L.routes.article(a.slug), body, schema, bodyClass: a.slug });
}

function notFound(L) {
  const N = L.notFound;
  return layout(L, { key: 'home', title: N.title, description: N.h1, canonical: `${L.prefix}/404.html`, body: `<section class="page-hero"><div class="wrap"><h1>${N.h1}</h1><p class="lead">${N.p}</p></div></section>` });
}

// ---------------------------------------------------------------- write
function write(rel, html) { const p = path.join(DIST, rel); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, html); }
function copyDir(src, dst) { fs.mkdirSync(dst, { recursive: true }); for (const f of fs.readdirSync(src)) { const s = path.join(src, f), d = path.join(dst, f); if (fs.statSync(s).isDirectory()) copyDir(s, d); else fs.copyFileSync(s, d); } }

fs.rmSync(DIST, { recursive: true, force: true });
copyDir(path.join(SRC, 'assets'), path.join(DIST, 'assets'));
fs.copyFileSync(path.join(SRC, 'favicon.svg'), path.join(DIST, 'favicon.svg'));
if (fs.existsSync(path.join(SRC, 'static'))) copyDir(path.join(SRC, 'static'), DIST);
const urls = [];
for (const L of LANGS) {
  const R = L.routes; const put = (route, html) => { write(route.replace(/^\//, '') + 'index.html', html); urls.push(route); };
  put(R.home, homePage(L)); put(R.treatments, treatmentsIndex(L));
  for (const s of SLUGS) put(R.treatment(s), treatmentPage(L, s));
  put(R.prices, pricesPage(L)); put(R.gallery, galleryPage(L)); put(R.about, aboutPage(L)); put(R.aftercare, aftercarePage(L)); put(R.contact, contactPage(L)); put(R.privacy, privacyPage(L));
  put(R.pillar, pillarPage(L)); put(R.kennis, articlesIndex(L)); for (const a of ARTICLES[L.code].items) put(R.article(a.slug), articlePage(L, a));
}
write('404.html', notFound(NL));
const today = new Date().toISOString().slice(0, 10);
const isHome = (u) => u === '/' || u === '/en/';
const altOf = (u) => { // map NL<->EN url
  const pairs = [];
  for (const k of ['home','treatments','prices','gallery','about','aftercare','contact','privacy','pillar','kennis']) pairs.push([NL.routes[k], EN.routes[k]]);
  for (const sl of SLUGS) pairs.push([NL.routes.treatment(sl), EN.routes.treatment(sl)]);
  ARTICLES.nl.items.forEach((a, i) => pairs.push([NL.routes.article(a.slug), EN.routes.article(ARTICLES.en.items[i].slug)]));
  const p = pairs.find(([a, b]) => a === u || b === u); return p ? { nl: p[0], en: p[1] } : null;
};
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.map((u) => { const alt = altOf(u); const links = alt ? `<xhtml:link rel="alternate" hreflang="nl" href="${SITE.domain}${alt.nl}"/><xhtml:link rel="alternate" hreflang="en" href="${SITE.domain}${alt.en}"/><xhtml:link rel="alternate" hreflang="x-default" href="${SITE.domain}${alt.nl}"/>` : ''; return `  <url><loc>${SITE.domain}${u}</loc>${links}<lastmod>${today}</lastmod><changefreq>${isHome(u) ? 'weekly' : 'monthly'}</changefreq><priority>${isHome(u) ? '1.0' : u.includes('/behandelingen/') || u.includes('/treatments/') || u.includes('permanent') ? '0.9' : '0.6'}</priority></url>`; }).join('\n')}\n</urlset>\n`);
const rssItems = (L) => ARTICLES[L.code].items.map((a) => `<item><title>${esc(a.title)}</title><link>${SITE.domain}${L.routes.article(a.slug)}</link><guid>${SITE.domain}${L.routes.article(a.slug)}</guid><pubDate>${new Date(a.date).toUTCString()}</pubDate><description>${esc(a.desc)}</description></item>`).join('');
write('kennis/feed.xml', `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Angel Brandão Beauty – Kennisbank</title><link>${SITE.domain}/kennis/</link><description>${esc(ARTICLES.nl.indexDesc)}</description><language>nl</language>${rssItems(NL)}</channel></rss>`);
write('en/guides/feed.xml', `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Angel Brandão Beauty – Guides</title><link>${SITE.domain}/en/guides/</link><description>${esc(ARTICLES.en.indexDesc)}</description><language>en</language>${rssItems(EN)}</channel></rss>`);
fs.writeFileSync(path.join(DIST, 'urls.txt'), urls.map((u) => SITE.domain + u).join('\n'));
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE.domain}/sitemap.xml\n`);
write('CNAME', 'www.angelbrandao.nl');
write('.nojekyll', '');
console.log(`built ${urls.length} pages → ${DIST}`);
