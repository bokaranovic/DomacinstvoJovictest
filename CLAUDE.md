# Domaćinstvo Jović — sajt

Statični višejezični (SR/EN) sajt za porodično domaćinstvo iz Drvara (BiH) koje pravi proizvode
od drenjine (dren / cornelian cherry): rakiju drenovaču, liker, mućeni pekmez i turšiju.
Vlasnica: Suzana Jović (sue.jovic@gmail.com, +387 63 133 086 — telefon/Viber/WhatsApp).
Adresa: Mlinski put 185, Drvar selo. Google Maps profil: https://maps.app.goo.gl/8B8QzttL7wJ47C5j6
Facebook: https://www.facebook.com/p/Doma%C4%87instvo-Jovi%C4%87-61557918760663/
Korisnik (vlasnikov saradnik) piše na srpskom — odgovaraj na srpskom.

## Pokretanje
- Dev server: `.claude/launch.json` → konfiguracija "sajt" (npx http-server, autoPort —
  Windows je port 8737 ubacio u rezervisani opseg, pa se port dodeljuje automatski).
- Nema build koraka — čist HTML/CSS/JS, otvara se i direktno iz fajla.

## Struktura
- `index.html`, `o-nama.html`, `narucite.html` (shop), `galerija.html`, `blog.html`, `kontakt.html`
- `proizvod-rakija.html`, `proizvod-liker.html`, `proizvod-pekmez.html`, `proizvod-tursija.html` —
  stranice pojedinačnih proizvoda (hero sa cenom + "Dodaj u korpu", sekcija "Na trpezi" sa pravim
  slikama, 3 činjenice, checkout modal). Tekstovi kroz i18n ključeve `pp.*` u main.js.
  Naslov taba: `data-title-en` na `<body>` (isti mehanizam kao blog članci).
- `uslovi.html` — Uslovi naručivanja (dvojezično kroz data-lang blokove; potvrda narudžbe
  telefonom, pouzeće, oštećenja 48 h, povraćaj 14 dana neotvoreno, 18+ za alkohol, podaci).
  Linkovan iz footera (nav.terms) i ispod "Naruči odmah" u checkout modalu (checkout.terms1/2).
  NIJE pravni savet — Suzana da pregleda tekst pre objave.
  Dekoracije na uslovi.html žive u MARGINAMA levo/desno od kolone teksta (720 px),
  pozicionirane sa left/right: calc(100% + 56px) — nikad preko teksta; ispod 1240 px
  se sakrivaju (media query `.article .deco`).
- `blog/` — 3 članka (zdrav-kao-dren, muceni-pekmez, dani-drenjine), koriste `data-root="../"`
- `css/style.css` — kompletan dizajn sistem (svetla + tamna tema kroz CSS varijable)
- `js/main.js` — PRODUCTS (cene!), i18n rečnik I18N (sr/en), korpa (localStorage `dj-cart`),
  tema, jezik, scroll-lock, page-fade prelazi, reveal animacije
- `js/shop.js` — konfigurator paketa, checkout, slanje narudžbe (FormSubmit/Telegram/CallMeBot)
- `js/gallery.js` — lightbox
- `fonts/` — self-hostovani woff2 (Cormorant Garamond, Work Sans, Caveat; latin + latin-ext)
- `img/` — glavne slike; `img/extra/` — 29 dekorativnih; `img/galerija/` — galerija + thumbs
- `new_img/` — IZVORNI transparentni PNG-ovi od korisnika (master fajlovi, ne dirati)
- `pregled-slika.html` — interni katalog svih slika (noindex, nije u meniju)
- Skripte za obradu slika (sharp) su u scratchpad-u sesije; sharp se instalira ad-hoc (`npm i sharp`)

## Ključne konvencije
- **Slike**: transparentni WebP iz `new_img` PNG-ova. Globalno `img { mix-blend-mode: multiply }`
  u svetloj temi (izuzeci: `.footer img`, `.lightbox img`, `.paket__img img`); u tamnoj temi
  sve `normal`. Nove slike: sharp resize → webp q~78-82.
- **i18n**: SR je u HTML-u (SEO), EN u `I18N` rečniku u main.js preko `data-i18n` atributa.
  Dugi dvojezični blokovi (članci): `<div data-lang="sr">` / `<div data-lang="en">` + CSS.
  Jezik/tema se postavljaju PRE iscrtavanja inline skriptom u `<head>` svake stranice.
  Klik na aktivno dugme SR/EN prebacuje na drugi jezik (toggle ponašanje).
- **Dekoracije** `.deco`: apsolutno pozicionirane providne ilustracije uz ivice sekcija,
  ciklus 25 s (~1,5 s pojava → ~19 s vidljivo → ~1,5 s nestanak → ~5 s pauza), inline stil
  `--w/--rot/--del`. Kad su vidljive, UVEK su na 100% opacity (zahtev korisnika — bez
  prozirnosti; `--op` je uklonjen). Skrivene ispod 860 px. NIKAD ne smeju da se preklapaju —
  proveravati geometrijski (getBoundingClientRect parovi). Dodatno: `decoGuard()` u main.js
  (poziva se na load/resize/langchange + ResizeObserver na body za kasne promene layouta)
  meri sve parove sa sigurnosnim pojasom (36 px) i klasom `.deco--off` sakriva onu koja
  bi se dodirnula — dekoracija ne sme dodirnuti NI SADRŽAJ (slike, kartice, ramove, forme,
  mapu — lista OBSTACLES u decoGuard), pa se prikazuje samo gde ima stvarno slobodnog mesta
  (na 1280 px ~polovina je sakrivena, na 1920 px skoro sve vidljive) —
  runtime garancija da se nikada ne preklapaju. Dekoracije NEMAJU parallax na miš
  (uklonjen na zahtev korisnika) — pomeraju se samo kroz decoCycle animaciju.
  decoGuard tretira i statične `.corner-branch`
  grane (page-hero uglovi) kao prepreke; u page-hero sekcijama NE stavljati dekoracije
  blizu uglova sa granama.
- **Karirani "stolnjak" u pozadini**: body::before (fixed, z-index -1) — CSS repeating
  gradijenti + radial mask (centar prazan, uglovi se naziru). Jačina JEDNIM brojem:
  `--gingham` (.05 svetla / .035 tamna tema); boja `--gingham-boja`. Sekcije sa svojom
  pozadinom (--alt, paket, footer) ga prekrivaju.
- **Bez trzaja** (korisniku jako bitno!): `scrollbar-gutter: stable` + `lockScroll()/unlockScroll()`
  za korpu/modal/meni; font preload (8 woff2 u head); `.reveal--instant` za elemente u prvom
  ekranu; page-fade prelazi (body 0.08s fade + 70ms delay pri kliku na interni link,
  `page-enter`/`page-leave` klase, pageshow handler za Back, sigurnosni ventil 300ms).
- **Tamna tema**: `html[data-theme="dark"]` varijable; toggle `.theme-btn` u headeru;
  localStorage `dj-theme`; prva poseta prati `prefers-color-scheme`; `.theme-anim` klasa
  daje 0,3 s pretapanje pri ručnoj promeni. Dok korisnik NIJE ručno birao temu, sajt i
  UŽIVO prati promenu sistemske teme (matchMedia 'change' listener + provera na
  visibilitychange u main.js, sa svežim matchMedia čitanjem); ručni izbor (dj-theme
  u localStorage) uvek ima prednost.
- **Promena jezika bez trzaja**: setLang() pamti element pri vrhu ekrana i posle prevoda
  koriguje skrol (scrollBy) tako da taj element ostane na istom mestu.

## Prodavnica / narudžbe
- Cene u `PRODUCTS` u main.js (jedini izvor istine za obračun) + prikaz u HTML karticama
  (index, narucite) + JSON-LD u narucite.html + stranice proizvoda `proizvod-*.html`
  (HTML cena i JSON-LD) — menjati NA SVIM mestima:
  - Drenovača 0,7 l = 50 KM · Liker 0,5 l = 20 KM · Mućeni pekmez 250 g = 10 KM
  - Turšija 720 g = 10 KM (PRIVREMENO — korisnik će javiti tačnu cenu)
- Poklon paket: min 1× svaki proizvod, −10% (PAKET_DISCOUNT u main.js).
- "Naruči odmah" šalje mejl preko FormSubmit AJAX na sue.jovic@gmail.com.
  ⚠️ ČEKA SE: Suzana mora JEDNOM kliknuti "Activate" u FormSubmit mejlu (stiže posle prve
  narudžbe; sajt prikazuje posebnu poruku dok aktivacija ne prođe).
- Checkout ima i: select Država (id coCountry: BiH/Srbija) i OBAVEZAN 18+ checkbox
  (id coAge) — bez štikliranja narudžba se ne šalje; potvrda 18+ (sa datumom) ulazi u
  tekst narudžbe, pa stiže i Suzani i kupcu u auto-potvrdu (dokaz na obe strane).
- Ilustracije se NIKAD ne rotiraju više od ±20-30° (zahtev korisnika) — donja desna
  ugaona grana je scaleX(-1) ogledalo + rotate(-8deg), ne rotate(190deg).
- Checkout ima OBAVEZNO polje E-mail (id coEmail, na svih 5 stranica sa modalom):
  FormSubmit ga koristi kao Reply-To i šalje kupcu automatsku potvrdu
  `_autoresponse` ("narudžba zaprimljena, obrađujemo je" + prepis narudžbe) —
  tekst u i18n ključu `checkout.autoReply`. Bez dodatnog podešavanja.
- Instant notifikacije (opciono, konstante na vrhu shop.js sa uputstvima u komentarima):
  - `TELEGRAM` {token, chatId} — BotFather + @userinfobot; ČEKA podatke od korisnika
  - `CALLMEBOT` {phone, apikey} — WhatsApp notifikacija; ČEKA API ključ od korisnika
- Rezervni kanali u checkoutu: WhatsApp / Viber / mailto / kopiraj.

## Domen / SEO
- Kanonski URL-ovi i sitemap koriste placeholder `https://domacinstvojovic.com/` —
  ZAMENITI kad korisnik registruje pravi domen (canonical, og, sitemap.xml, robots.txt).
- JSON-LD: GroceryStore na index (tačne koordinate 44.3611224, 16.366747, hasMap, sameAs FB),
  ItemList na narucite, BlogPosting na člancima.

## Poznata ograničenja okruženja
- Browser panel u ovoj sesiji često ne uspeva screenshot (beskonačne animacije);
  verifikovati programski kroz javascript_tool (getComputedStyle, getBoundingClientRect).
- Slanje pravog mejla na sue.jovic@gmail.com iz sandboxa je blokirano permission sistemom —
  aktivaciju FormSubmit-a radi korisnik.

## Šta korisnik još planira (otvoreno)
- ⚠️ TURŠIJA JE SIRUP/SOK (nova slika: boca "Cornelian Cherry Syrup (Turšija)" u img/tursija.webp)
  — tekstovi još kažu "tegla 720 g / kiselkasta poslastica uz meze" (kartice, proizvod-tursija,
  JSON-LD, uslovi): USKLADITI kad korisnik potvrdi pakovanje (zapremina?) i cenu
- Portreti: img/sueilela.webp (story frame na o-nama), img/suzajovic.webp (uz citat na o-nama);
  index story i dalje koristi kuca.webp (namerno)
- Tačne cene svih artikala (posebno turšija)
- Telegram token/chatId i/ili CallMeBot API ključ
- ✅ YouTube: 3 prava klipa (TV Živa istina) su na o-nama; komentar-šablon za dodavanje ostaje
- Suzana da POTVRDI činjenice sa o-nama/pekmez stranica preuzete iz TV priloga:
  zaštićeno geografsko poreklo pekmeza, titule (čistačica→direktorica→savjetnica ministra),
  junice na proleće, dostava CG/Makedonija/HR, proizvodi na upit (šipak/sok/slatko)
- Eventualno: pravi domen i hosting; dodavanje još sadržaja ("dodavaćemo još stvari")
