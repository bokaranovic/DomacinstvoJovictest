/* ============================================================
   DOMAĆINSTVO JOVIĆ — main.js
   Jezik (SR/EN) · korpa · animacije · navigacija
   ============================================================ */
'use strict';

/* ---------- PROIZVODI (cijene u KM — lako izmijeniti ovdje) ---------- */
const PRODUCTS = {
  rakija: { price: 50, img: 'rakija.webp',  sr: { name: 'Drenovača',        unit: 'rakija od drenjine · 0,7 l' },
                                             en: { name: 'Drenovača Brandy', unit: 'cornelian cherry brandy · 0.7 l' } },
  liker:  { price: 20, img: 'liker.webp',   sr: { name: 'Liker od drenjine', unit: 'domaći liker · 0,5 l' },
                                             en: { name: 'Cornelian Liqueur', unit: 'homemade liqueur · 0.5 l' } },
  pekmez: { price: 10, img: 'pekmez.webp',  sr: { name: 'Mućeni pekmez',     unit: 'od drenjine · 250 g' },
                                             en: { name: 'Whipped Pekmez',    unit: 'cornelian cherry jam · 250 g' } },
  tursija:{ price: 10, img: 'tursija.webp', sr: { name: 'Turšija od drenjine', unit: 'tegla · 720 g' },
                                             en: { name: 'Cornelian Pickles',  unit: 'jar · 720 g' } },
};
const PAKET_DISCOUNT = 0.10; // 10% popusta na poklon paket

/* Relativna putanja do korijena (za blog/ podstranice) */
const ROOT = document.body.dataset.root || '';

/* ============================================================
   RJEČNIK PREVODA
   ============================================================ */
const I18N = {
  sr: {
    'nav.home': 'Početna', 'nav.about': 'O nama', 'nav.shop': 'Naruči', 'nav.gallery': 'Galerija',
    'nav.blog': 'Blog', 'nav.contact': 'Kontakt', 'nav.cart': 'Korpa',
    'nav.terms': 'Uslovi naručivanja',
    'brand.small': 'Drvar · od 2010.', 'a11y.skip': 'Preskoči na sadržaj',
    'hero.kicker': 'Drvar · od 2010. godine',
    'hero.lead': 'Sve što dren daruje — rakija, liker, turšija i naš čuveni mućeni pekmez. Ručno brano, ručno pravljeno, s ljubavlju iz doline Unca.',
    'hero.ctaShop': 'Naruči proizvode', 'hero.ctaStory': 'Naša priča',
    'hero.since1': 'godina tradicije', 'hero.since2': 'prirodni sastojci', 'hero.since3': 'aditiva i konzervansa',
    'marquee.1': 'Ručno brano', 'marquee.2': 'Bez aditiva', 'marquee.3': 'Originalna kvaliteta iz Drvara',
    'marquee.4': 'Zdrav ko dren', 'marquee.5': 'Domaća radinost', 'marquee.6': 'Po receptu naših starih',
    'prod.kicker': 'Naši proizvodi', 'prod.title': 'Iz naše radionice — na vašu trpezu',
    'prod.lead': 'Svaka tegla i svaka boca nastaje ručno, od drenjina ubranih na obroncima oko Drvara.',
    'prod.add': 'Dodaj u korpu', 'prod.bestseller': 'Najprodavanije', 'prod.brand': 'Naš brend',
    'paket.kicker': 'Poklon koji miriše na zavičaj', 'paket.title': 'Poklon paket od drena',
    'paket.lead': 'Sastavite svoj paket — najmanje po jedan od svakog proizvoda — a mi ga pažljivo pakujemo u drvenu kutiju sa slamom, spremnu za darivanje. Korpe pravimo i po želji: samo slatko bez alkohola, ili da ukomponujemo i vaš poklon — recite, i biće.',
    'paket.btn': 'Sastavi svoj paket', 'paket.badge': '−10% popusta',
    'story.kicker': 'Naša priča', 'story.title': 'Tradicija koja se muti tri sata, a traje generacijama',
    'story.p1': 'U Drvaru, gdje dren rađa kao nigdje, naša porodica već petnaest godina pretvara jarkocrvene drenjine u proizvode po receptima naših starih.',
    'story.p2': 'Naš mućeni pekmez ne kuva se nego se muti — puna tri sata — i upravo zato čuva sve ono najbolje što dren daruje.',
    'story.btn': 'Upoznajte nas', 'story.caption': 'Mlinski put 185, Drvar selo',
    'story.seal': 'Od 2010 · Drvar',
    'why.kicker': 'Zašto dren?', 'why.title': 'Zdrav ko dren — nije samo izreka',
    'why1.h': 'Riznica vitamina C', 'why1.p': 'Drenjina sadrži i do dva puta više vitamina C od limuna — vjekovima je narodni lijek za imunitet.',
    'why2.h': 'Ručno i s ljubavlju', 'why2.p': 'Svaki plod je ručno ubran, probran i prerađen u našoj kućnoj radinosti — bez mašina, bez žurbe.',
    'why3.h': 'Bez ijednog aditiva', 'why3.p': 'Samo dren, šećer i strpljenje. Ništa se ne dodaje, ništa ne oduzima — priroda zna najbolje.',
    'galteaser.kicker': 'Galerija', 'galteaser.title': 'Zavirite u naš svijet drena',
    'galteaser.btn': 'Pogledaj cijelu galeriju',
    'blogteaser.kicker': 'Sa našeg bloga', 'blogteaser.title': 'Priče iz doline drena',
    'blogteaser.btn': 'Svi članci', 'blog.readMore': 'Pročitaj više',
    'cta.title': 'Naručite već danas', 'cta.lead': 'Šaljemo poštom širom BiH i regiona. Javite nam se — dogovor je brz i jednostavan.',
    'cta.btn': 'Idi na narudžbu',
    'footer.tag': 'Originalna kvaliteta iz Drvara — od 2010. godine.',
    'footer.nav': 'Navigacija', 'footer.shop': 'Proizvodi', 'footer.contact': 'Kontakt',
    'footer.rights': 'Sva prava zadržana.', 'footer.made': 'Napravljeno sa ❤ u Drvaru',
    'cart.title': 'Vaša korpa', 'cart.empty': 'Korpa je još uvijek prazna.',
    'cart.emptyHand': 'Napunite je zdravljem!', 'cart.total': 'Ukupno:',
    'cart.note': 'Plaćanje pouzećem ili po dogovoru. Poštarina se obračunava pri potvrdi.',
    'cart.checkout': 'Završi narudžbu', 'cart.remove': 'ukloni', 'cart.paket': 'Poklon paket',
    'checkout.title': 'Završite narudžbu', 'checkout.lead': 'Popunite podatke — narudžbu šaljete jednim klikom, e-mailom ili porukom.',
    'checkout.name': 'Ime i prezime', 'checkout.phone': 'Telefon', 'checkout.address': 'Adresa i mjesto',
    'checkout.email': 'E-mail (za potvrdu narudžbe)',
    'checkout.emailBad': 'Provjerite e-mail adresu.',
    'checkout.country': 'Država', 'checkout.countryBA': 'Bosna i Hercegovina', 'checkout.countryRS': 'Srbija',
    'checkout.age': 'Potvrđujem da imam navršenih 18 godina i da smijem naručiti proizvode sa ovog sajta.',
    'checkout.ageMissing': 'Molimo potvrdite da imate navršenih 18 godina.',
    'checkout.autoReply': 'Vaša narudžba je zaprimljena i uskoro ćemo je obraditi. Javićemo vam se radi potvrde i dogovora oko isporuke. Hvala na povjerenju!\n\n— Domaćinstvo Jović, Drvar\n+387 63 133 086 (telefon/Viber/WhatsApp)',
    'checkout.note': 'Napomena (nije obavezno)', 'checkout.total': 'Ukupno',
    'checkout.sendEmail': 'Pošalji e-mailom', 'checkout.sendWa': 'Pošalji WhatsAppom',
    'checkout.sendViber': 'Pošalji Viberom', 'checkout.copy': 'Kopiraj narudžbu',
    'checkout.copied': 'Narudžba kopirana — zalijepite je u poruku.',
    'checkout.fill': 'Molimo unesite ime, telefon, e-mail i adresu.',
    'checkout.orderNow': '✓ Naruči odmah',
    'checkout.autoNote': 'Narudžba se automatski šalje Domaćinstvu Jović.',
    'checkout.terms1': 'Slanjem narudžbe prihvatate', 'checkout.terms2': 'Uslove naručivanja',
    'checkout.alt': '— ili pošaljite narudžbu ručno —',
    'checkout.sending': 'Šaljemo narudžbu…',
    'checkout.successH': 'Narudžba je primljena!',
    'checkout.successP': 'Hvala na povjerenju — javićemo vam se uskoro radi potvrde i dogovora oko isporuke.',
    'checkout.successOk': 'U redu',
    'checkout.error': 'Slanje trenutno nije uspjelo — pokušajte ponovo ili pošaljite WhatsAppom / Viberom ispod.',
    'checkout.activate': 'Prijem narudžbi još nije aktiviran — provjerite mail sue.jovic@gmail.com i kliknite „Activate“ u poruci od FormSubmit-a, pa pokušajte ponovo.',
    'toast.added': 'Dodano u korpu ✓', 'toast.min1': 'Paket sadrži najmanje po 1 od svakog proizvoda',
    'order.title': 'NARUDŽBA — Domaćinstvo Jović', 'order.name': 'Ime', 'order.phone': 'Telefon',
    'order.email': 'E-mail',
    'order.address': 'Adresa', 'order.country': 'Država', 'order.note': 'Napomena', 'order.subject': 'Narudžba',
    'order.age18': '✔ POTVRDA 18+: kupac je pri naručivanju označio da ima navršenih 18 godina i da smije naručiti sa sajta',
    'p.rakija.name': 'Drenovača', 'p.rakija.desc': 'Tradicionalna rakija od drenjine — bistra, pitka i mirisna.', 'p.rakija.unit': '0,7 l',
    'p.liker.name': 'Liker od drenjine', 'p.liker.desc': 'Sladak i baršunast, rubin boje — čaša dobrodošlice u svakom domu.', 'p.liker.unit': '0,5 l',
    'p.pekmez.name': 'Mućeni pekmez', 'p.pekmez.desc': 'Ne kuva se — muti se tri sata. Čuveni drvarski specijalitet.', 'p.pekmez.unit': '250 g',
    'p.tursija.name': 'Turšija od drenjine', 'p.tursija.desc': 'Kiselkasta poslastica uz meze — drenjine kao masline naših krajeva.', 'p.tursija.unit': '720 g',
    'prod.more': 'Saznaj više →',
    'pp.all': '← Svi proizvodi',
    'pp.serveKicker': 'Na trpezi',
    'pp.ship': 'Šaljemo brzom poštom širom BiH i regiona — plaćanje pouzećem.',
    'pp.others': 'Pogledajte i ostale proizvode',
    'pp.rakija.cap': '0,7 l domaće drenovače',
    'pp.rakija.lead': 'Kap drena u čaši — bistra, pitka i mirisna rakija pečena u bakrenom kazanu, od zrelih drenjina ubranih oko Drvara.',
    'pp.rakija.p1': 'Drenjine za našu drenovaču beremo tek kada sasvim sazru — tada su najslađe i daju rakiji punoću i miris. Nakon vrenja, rakija se peče polako, u bakrenom kazanu, onako kako se u našoj kući oduvijek radilo.',
    'pp.rakija.p2': 'Zato je drenovača posebna: rijetka je, jer dren rađa malo i traži strpljenje — ali svaka čaša vrati uloženo. Služi se rashlađena, uz meze ili kao dobrodošlica dragim gostima.',
    'pp.rakija.serveT': 'Čaša dobrodošlice',
    'pp.rakija.g1': 'Bistra ko suza', 'pp.rakija.g2': 'Čokanj za dobrodošlicu', 'pp.rakija.g3': 'Pečena u bakrenom kazanu',
    'pp.rakija.f1h': 'Zrele drenjine', 'pp.rakija.f1p': 'Samo sasvim zreli plodovi — najslađi i najmirisniji.',
    'pp.rakija.f2h': 'Bakreni kazan', 'pp.rakija.f2p': 'Pečemo polako, u malim serijama, po receptu naših starih.',
    'pp.rakija.f3h': 'Služi se rashlađena', 'pp.rakija.f3p': 'Uz meze, slavlje ili kao aperitiv — kap po kap.',
    'pp.liker.cap': '0,5 l slatke dobrodošlice',
    'pp.liker.lead': 'Rubin u boci — sladak, baršunast liker od drenjine koji se pije polako i pamti dugo.',
    'pp.liker.p1': 'Naš liker nastaje od najzrelijih drenjina i drenovače: plodovi mjesecima počivaju u rakiji dok joj ne predaju boju, miris i onu prepoznatljivu kiselkastu notu. Zaslađen taman koliko treba — ni previše, ni premalo.',
    'pp.liker.p2': 'Rubin crvene boje, gust i baršunast — liker je čaša dobrodošlice u svakom domu. Poslužite ga rashlađen uz kolače ili kao digestiv poslije ručka.',
    'pp.liker.serveT': 'Rubin u čaši',
    'pp.liker.g1': 'Domaća boca likera', 'pp.liker.g2': 'U kristalnoj čaši', 'pp.liker.g3': 'Rubin boja drena',
    'pp.liker.f1h': 'Zri mjesecima', 'pp.liker.f1p': 'Drenjine počivaju u rakiji dok ne predaju sve najbolje.',
    'pp.liker.f2h': 'Baršunast ukus', 'pp.liker.f2p': 'Sladak i pun, sa kiselkastim završetkom drena.',
    'pp.liker.f3h': 'Za lijepe prilike', 'pp.liker.f3p': 'Dobrodošlica gostima, poklon domaćici, kap uz kolač.',
    'pp.pekmez.cap': 'Muti se puna tri sata',
    'pp.pekmez.lead': 'Naš zaštitni znak — pekmez koji se ne kuva, nego se muti puna tri sata, dok ne postane svila.',
    'pp.pekmez.p1': 'Mućeni pekmez je čuveni drvarski specijalitet i ponos naše kuće. Pasirane drenjine se sa šećerom mute — ručno, puna tri sata — bez ijednog minuta kuvanja. Zato zadržava boju, miris i vitamine svježeg ploda. Ruke od mućenja znaju i zaboljeti, ali od tradicije ne odustajemo.',
    'pp.pekmez.p2': 'Namaz boje rubina, svilenkast i pjenast — najljepši je na tek ispečenoj kori hljeba, uz palačinke ili kašikom pravo iz tegle. Jedna tegla, tri sata mućenja — i nijedan konzervans.',
    'pp.pekmez.serveT': 'Na kašiku i na hljeb',
    'pp.pekmez.g1': 'Slatko od drenjine — na kašiku', 'pp.pekmez.g2': 'Na toploj kori hljeba', 'pp.pekmez.g3': 'Tegla našeg pekmeza',
    'pp.pekmez.f1h': 'Muti se 3 sata', 'pp.pekmez.f1p': 'Nula kuvanja — sva snaga svježe drenjine ostaje u tegli.',
    'pp.pekmez.f2h': 'Zaštićeno porijeklo', 'pp.pekmez.f2p': 'Nosi oznaku zaštićenog geografskog porijekla — garancija da je pravi, drvarski.',
    'pp.pekmez.f3h': 'Uz sve i svašta', 'pp.pekmez.f3p': 'Hljeb, palačinke, kolači — ili kašikom, iskreno.',
    'pp.tursija.cap': 'Masline naših krajeva',
    'pp.tursija.lead': 'Masline naših krajeva — kiselkaste drenjine iz tegle koje meze pretvaraju u gozbu.',
    'pp.tursija.p1': 'Za turšiju biramo čvrste, tek pristigle drenjine i ostavljamo ih da polako zru u nalivu — bez pasterizacije i bez ijednog konzervansa. Vrijeme uradi svoje: plod ostane cijel, a ukus postane pun i osvježavajuće kiselkast.',
    'pp.tursija.p2': 'Na trpezi turšija ide tamo gdje bi i masline — uz sir i suho meso, uz rakiju, uz zimnicu. U našem kraju kaže se: dok ima drena u tegli, ima i razgovora za stolom.',
    'pp.tursija.serveT': 'Uz meze i dobru riječ',
    'pp.tursija.g1': 'Zalogaj s viljuške', 'pp.tursija.g2': 'Puna činija drenjina', 'pp.tursija.g3': 'Tegle spremne za zimu',
    'pp.tursija.f1h': 'Kao masline', 'pp.tursija.f1p': 'Kiselkast zalogaj uz meze, sir i suho meso.',
    'pp.tursija.f2h': 'Plod ostaje cijel', 'pp.tursija.f2p': 'Zri polako u nalivu — bez pasterizacije.',
    'pp.tursija.f3h': 'Tegla od 720 g', 'pp.tursija.f3p': 'Dovoljno za cijelu trpezu — i još malo preko.',
    'quote.text': 'Pekmez se kod nas ne kuva — on se muti, tri sata, dok ne postane svila. Tako je radila naša majka, tako radimo i mi.',
    'quote.cite': '— Porodica Jović',
    'b1.tag': 'Zdravlje', 'b1.title': 'Zašto se kaže „zdrav ko dren“?',
    'b1.ex': 'Vitamin C, željezo, antioksidansi — otkrijte zašto je ova mala crvena bobica veliki saveznik imuniteta.',
    'b2.tag': 'Tradicija', 'b2.title': 'Mućeni pekmez — tradicija koja se ne kuva',
    'b2.ex': 'Tri sata mućenja, nula kuvanja. Priča o čuvenom drvarskom specijalitetu koji je postao brend.',
    'b3.tag': 'Drvar', 'b3.title': 'Dani drvarske drenjine',
    'b3.ex': 'Manifestacija koja svake jeseni okupi cijeli kraj — i na kojoj naša tezga uvijek prva opusti.',
    'shop.kicker': 'Narudžba', 'shop.title': 'Izaberite svoje blago od drena',
    'shop.lead': 'Naručite pojedinačno ili sastavite poklon paket — šaljemo brzom poštom širom BiH i regiona, plaćanje pouzećem.',
    'shop.more': 'Na upit pravimo i pekmez od šipka, domaći sok od drenjine i slatko — javite nam se.',
    'paket.addBtn': 'Dodaj paket u korpu',
    'paket.hint': '* Paket sadrži najmanje po jedan od svakog proizvoda — količine povećavajte po želji.',
    'how.kicker': 'Kako naručiti?', 'how.title': 'Tri koraka do vaše pošiljke',
    'how.s1h': 'Napunite korpu', 'how.s1p': 'Dodajte proizvode pojedinačno ili sastavite poklon paket.',
    'how.s2h': 'Pošaljite narudžbu', 'how.s2p': 'Jednim klikom — e-mailom, WhatsAppom ili Viberom. Kako vam je zgodnije.',
    'how.s3h': 'Paket stiže na adresu', 'how.s3p': 'Šaljemo brzom poštom, a plaćate pouzećem — kad pošiljka stigne.',
    'about.kicker': 'Naša priča', 'about.title': 'Porodica, dren i zanat star generacijama',
    'about.lead': 'Iz Drvara, grada podno Klekovače, gdje dren rađa kao nigdje drugdje — dolazi priča naše porodice.',
    'about.s1.kicker': 'Kako je sve počelo', 'about.s1.title': 'Od porodičnog recepta do brenda iz Drvara',
    'about.s1.p1': 'Sve je počelo iz čiste ljubavi prema prirodi — kao hobi mame Olivere, koju svi zovu Lela: od drenjina je pravila poklone za prijatelje. Godine 2010. odlučili smo da ono što je naša kuća radila za sebe počnemo raditi i za druge — tako je rođeno Domaćinstvo Jović.',
    'about.s1.p2': 'Domaćinstvo vode mama Lela i kćerka Suzana, uz nezamjenljivu pomoć oca i brata. Svaka tegla pekmeza, svaka boca rakije i svaki poklon paket prođu kroz naše ruke — od grane do vaše trpeze.',
    'about.s1.p3': 'Najponosniji smo na naš mućeni pekmez od drenjine: ne kuva se, nego se muti puna tri sata, ručno i bez ijednog konzervansa — po receptu koji se u porodici prenosi generacijama. Danas taj pekmez nosi i oznaku zaštićenog geografskog porijekla — pečat da je pravljen baš ovdje i baš ovako.',
    'about.s1.p4': 'A Suzana je najbolji dokaz da se selo i karijera ne isključuju: prošla je put od čistačice, preko direktorice, do savjetnice ministra. Kada je jednom preko noći ostala bez posla, s fakultetskom diplomom u rukama preuzela je štalu i krave — i tih devet mjeseci, kaže, naučilo ju je vojničkoj disciplini i ranom ustajanju. Zato je i danas svako jutro zateknete u domaćinstvu, a na proljeće na imanje stižu i nove junice. O nama je snimljeno više televizijskih priča — pogledajte ih niže na stranici.',
    'about.s1.izreka': '„Ako niste bili kod porodice Jović — kao da niste ni bili u Drvaru.“',
    'about.s1.cap': 'Suzana i mama Lela — dvije generacije, jedan recept',
    'about.szCap': 'Suzana — majčina desna ruka',
    'about.quote': 'Dren je darežljivo drvo — cvjeta prvi, a rađa posljednji. Nauči te strpljenju, a strpljenje je pola našeg zanata.',
    'about.proc.kicker': 'Kako radimo', 'about.proc.title': 'Od grane do tegle — sve ručno',
    'about.proc.s1h': '1. Berba', 'about.proc.s1p': 'Svake jeseni ručno beremo drenjine na obroncima oko Drvara — samo zrele, jarkocrvene plodove.',
    'about.proc.s2h': '2. Prerada', 'about.proc.s2p': 'Pekmez se muti tri sata bez kuvanja, rakija se peče u bakrenom kazanu, a turšija i liker zru polako — koliko im treba.',
    'about.proc.s3h': '3. Pakovanje', 'about.proc.s3p': 'Svaku teglu i bocu ručno punimo, mjerimo i pakujemo — pa šaljemo poštom na vašu adresu, kao da šaljemo rodbini.',
    'about.tl.kicker': 'Naš put', 'about.tl.title': 'Petnaest godina, jedna ljubav',
    'about.tl.i1': 'Osnivamo Domaćinstvo Jović i prvi put iznosimo naše proizvode pred kupce.',
    'about.tl.y2': 'Zatim', 'about.tl.i2': 'Mućeni pekmez od drenjine postaje naš zaštitni znak — priča o pekmezu koji se ne kuva širi se od usta do usta.',
    'about.tl.y3': 'Svake jeseni', 'about.tl.i3': 'Redovni smo učesnici manifestacije „Dani drvarske drenjine“ — naša tezga se pamti i traži.',
    'about.tl.y4': 'Danas', 'about.tl.i4': 'Pakete šaljemo širom BiH, u Srbiju, Crnu Goru i Makedoniju, a radimo i na redovnoj dostavi za Hrvatsku. Potražnja je tolika da se uvijek traži — „tegla više“.',
    'about.vid.kicker': 'Video', 'about.vid.title': 'Pogledajte nas na djelu',
    'about.vid.lead': 'Drvar, drenjina i naši proizvodi — kroz objektiv televizijskih ekipa i gostiju.',
    'about.vid.c1': 'TV Živa istina u posjeti Domaćinstvu Jović',
    'about.vid.c2': 'Drenjijada u Drvaru — naš čuveni mućeni pekmez',
    'about.vid.c3': 'Suzanina priča — od njive do savjetnice ministra',
    'about.fb': 'Zapratite nas na Facebooku',
    'about.map.kicker': 'Gdje smo', 'about.map.title': 'Nađite nas na mapi',
    'about.map.lead': 'Mlinski put 185, Drvar selo — par kilometara od centra Drvara, uz turističke putokaze koji vode pravo do imanja. Vrata su vam uvijek otvorena.',
    'about.map.btn': 'Otvori u Google mapama',
    'gal.kicker': 'Galerija', 'gal.title': 'Naš svijet drena',
    'gal.lead': 'Od cvijeta do tegle — botanička kolekcija Domaćinstva Jović. Kliknite na sliku za uvećanje.',
    'blogp.kicker': 'Blog', 'blogp.title': 'Priče iz doline drena',
    'blogp.lead': 'O zdravlju, tradiciji i ljudima — sve što dren nosi sa sobom, zapisano našim riječima.',
    'con.kicker': 'Kontakt', 'con.title': 'Tu smo za vas — javite se',
    'con.lead': 'Za narudžbe, pitanja ili samo lijepu riječ — pišite nam ili nazovite. Odgovaramo brzo, ko dren!',
    'con.addr.h': 'Adresa', 'con.addr.country': 'Bosna i Hercegovina', 'con.addr.map': 'Otvori u Google mapama →',
    'con.phone.h': 'Telefon · Viber · WhatsApp', 'con.phone.p': 'Pozovite ili pišite — dostupni smo svaki dan.',
    'con.email.p': 'Odgovaramo u roku od 24 sata.',
    'con.form.kicker': 'Pišite nam', 'con.form.title': 'Pošaljite poruku',
    'con.form.lead': 'Popunite formu — poruka se otvara u vašem e-mail programu, spremna za slanje.',
    'con.form.msg': 'Vaša poruka', 'con.form.send': 'Pošalji poruku',
    'con.map.note': 'Dođite nam u goste — kod nas niko ne ostaje ni gladan ni žedan!',
    'art.back': '← Nazad na blog',
  },
  en: {
    'p.rakija.name': 'Drenovača Brandy', 'p.rakija.desc': 'Traditional cornelian cherry brandy — clear, smooth and fragrant.', 'p.rakija.unit': '0.7 l',
    'p.liker.name': 'Cornelian Liqueur', 'p.liker.desc': 'Sweet and velvety, ruby-coloured — a welcome glass in every home.', 'p.liker.unit': '0.5 l',
    'p.pekmez.name': 'Whipped Pekmez', 'p.pekmez.desc': 'Never cooked — whipped for three hours. The famous Drvar specialty.', 'p.pekmez.unit': '250 g',
    'p.tursija.name': 'Cornelian Pickles', 'p.tursija.desc': 'A tangy treat with meze — cornelian cherries, the olives of our region.', 'p.tursija.unit': '720 g',
    'prod.more': 'Learn more →',
    'pp.all': '← All products',
    'pp.serveKicker': 'On the table',
    'pp.ship': 'We ship by express post across Bosnia and the region — cash on delivery.',
    'pp.others': 'See our other products',
    'pp.rakija.cap': '0.7 l of homemade drenovača',
    'pp.rakija.lead': 'A drop of dren in a glass — clear, smooth and fragrant brandy, distilled in a copper still from ripe cornelian cherries picked around Drvar.',
    'pp.rakija.p1': 'The cherries for our drenovača are picked only when fully ripe — that is when they are sweetest and give the brandy its fullness and aroma. After fermentation, it is distilled slowly, in a copper still, the way our house has always done it.',
    'pp.rakija.p2': 'That is what makes drenovača special: it is rare, because the dren yields little and demands patience — but every glass repays it. Serve it chilled, with meze or as a welcome for dear guests.',
    'pp.rakija.serveT': 'A glass of welcome',
    'pp.rakija.g1': 'Clear as a teardrop', 'pp.rakija.g2': 'A čokanj of welcome', 'pp.rakija.g3': 'Distilled in a copper still',
    'pp.rakija.f1h': 'Ripe cherries', 'pp.rakija.f1p': 'Only fully ripened fruit — the sweetest and most fragrant.',
    'pp.rakija.f2h': 'Copper still', 'pp.rakija.f2p': 'Distilled slowly, in small batches, by our ancestors’ recipe.',
    'pp.rakija.f3h': 'Served chilled', 'pp.rakija.f3p': 'With meze, at celebrations or as an aperitif — sip by sip.',
    'pp.liker.cap': '0.5 l of sweet welcome',
    'pp.liker.lead': 'Ruby in a bottle — a sweet, velvety cornelian cherry liqueur, sipped slowly and remembered long.',
    'pp.liker.p1': 'Our liqueur is born from the ripest cherries and drenovača: the fruit rests in the brandy for months, giving it its colour, aroma and that signature tart note. Sweetened just enough — no more, no less.',
    'pp.liker.p2': 'Ruby red, rich and velvety — the liqueur is a welcome glass in every home. Serve it chilled with cakes, or as a digestif after lunch.',
    'pp.liker.serveT': 'Ruby in a glass',
    'pp.liker.g1': 'A homemade bottle', 'pp.liker.g2': 'In a crystal glass', 'pp.liker.g3': 'The ruby of the dren',
    'pp.liker.f1h': 'Months of maturing', 'pp.liker.f1p': 'The cherries rest in brandy until they give their very best.',
    'pp.liker.f2h': 'Velvet taste', 'pp.liker.f2p': 'Sweet and full, with the dren’s tart finish.',
    'pp.liker.f3h': 'For fine occasions', 'pp.liker.f3p': 'A welcome for guests, a gift for hosts, a drop with dessert.',
    'pp.pekmez.cap': 'Whipped for three full hours',
    'pp.pekmez.lead': 'Our trademark — a pekmez that is never cooked, but whipped for three full hours, until it turns to silk.',
    'pp.pekmez.p1': 'Whipped pekmez is the famous Drvar specialty and the pride of our house. Sieved cornelian cherries are whipped with sugar — by hand, for three full hours — without a single minute of cooking. That is why it keeps the colour, aroma and vitamins of fresh fruit. Three hours of whipping can make your arms ache — but we never give up on tradition.',
    'pp.pekmez.p2': 'A ruby-coloured spread, silky and airy — best on a slice of freshly baked bread, with pancakes, or straight from the jar by the spoonful. One jar, three hours of whipping — and not a single preservative.',
    'pp.pekmez.serveT': 'On a spoon, on bread',
    'pp.pekmez.g1': 'Cornelian slatko — by the spoon', 'pp.pekmez.g2': 'On a warm slice of bread', 'pp.pekmez.g3': 'A jar of our pekmez',
    'pp.pekmez.f1h': 'Whipped for 3 hours', 'pp.pekmez.f1p': 'Zero cooking — all the power of fresh dren stays in the jar.',
    'pp.pekmez.f2h': 'Protected origin', 'pp.pekmez.f2p': 'Carries a protected geographical origin label — a guarantee it is truly from Drvar.',
    'pp.pekmez.f3h': 'Goes with everything', 'pp.pekmez.f3p': 'Bread, pancakes, cakes — or by the spoon, honestly.',
    'pp.tursija.cap': 'The olives of our region',
    'pp.tursija.lead': 'The olives of our region — tangy pickled cornelian cherries that turn meze into a feast.',
    'pp.tursija.p1': 'For our pickles we choose firm, just-ripened cherries and let them mature slowly in brine — no pasteurisation, not a single preservative. Time does its work: the fruit stays whole, and the taste turns full and refreshingly tart.',
    'pp.tursija.p2': 'On the table, pickled dren goes wherever olives would — with cheese and cured meat, with rakija, with winter preserves. In our parts they say: as long as there is dren in the jar, there is conversation at the table.',
    'pp.tursija.serveT': 'With meze and good company',
    'pp.tursija.g1': 'A bite from the fork', 'pp.tursija.g2': 'A bowl full of dren', 'pp.tursija.g3': 'Jars ready for winter',
    'pp.tursija.f1h': 'Like olives', 'pp.tursija.f1p': 'A tangy bite with meze, cheese and cured meat.',
    'pp.tursija.f2h': 'The fruit stays whole', 'pp.tursija.f2p': 'Maturing slowly in brine — no pasteurisation.',
    'pp.tursija.f3h': 'A 720 g jar', 'pp.tursija.f3p': 'Enough for the whole table — and a little extra.',
    'quote.text': 'In our home, pekmez is never cooked — it is whipped, for three hours, until it turns to silk. That is how our mother did it, and that is how we do it.',
    'quote.cite': '— The Jović family',
    'b1.tag': 'Health', 'b1.title': 'Why do we say “healthy as a dren”?',
    'b1.ex': 'Vitamin C, iron, antioxidants — discover why this little red berry is a great ally of your immunity.',
    'b2.tag': 'Tradition', 'b2.title': 'Whipped pekmez — a tradition that is never cooked',
    'b2.ex': 'Three hours of whipping, zero cooking. The story of the famous Drvar specialty that became a brand.',
    'b3.tag': 'Drvar', 'b3.title': 'Days of the Drvar Cornelian Cherry',
    'b3.ex': 'The festival that gathers the whole region every autumn — where our stall is always the first to sell out.',
    'nav.home': 'Home', 'nav.about': 'About us', 'nav.shop': 'Order', 'nav.gallery': 'Gallery',
    'nav.blog': 'Blog', 'nav.contact': 'Contact', 'nav.cart': 'Cart',
    'nav.terms': 'Ordering Terms',
    'brand.small': 'Drvar · since 2010', 'a11y.skip': 'Skip to content',
    'hero.kicker': 'Drvar · since 2010',
    'hero.lead': 'Everything the cornelian cherry gives — brandy, liqueur, pickles and our famous whipped pekmez. Hand-picked, handmade, with love from the Unac valley.',
    'hero.ctaShop': 'Order products', 'hero.ctaStory': 'Our story',
    'hero.since1': 'years of tradition', 'hero.since2': 'natural ingredients', 'hero.since3': 'additives & preservatives',
    'marquee.1': 'Hand-picked', 'marquee.2': 'No additives', 'marquee.3': 'Original quality from Drvar',
    'marquee.4': 'Healthy as a dren', 'marquee.5': 'Homemade craft', 'marquee.6': 'By our ancestors’ recipes',
    'prod.kicker': 'Our products', 'prod.title': 'From our workshop — to your table',
    'prod.lead': 'Every jar and every bottle is made by hand, from cornelian cherries picked on the hillsides around Drvar.',
    'prod.add': 'Add to cart', 'prod.bestseller': 'Bestseller', 'prod.brand': 'Our brand',
    'paket.kicker': 'A gift that smells like home', 'paket.title': 'Cornelian Gift Box',
    'paket.lead': 'Build your own box — at least one of each product — and we will carefully pack it in a wooden crate with straw, ready for gifting. We also make baskets to order: sweets only with no alcohol, or with your own gift arranged in — just say the word.',
    'paket.btn': 'Build your box', 'paket.badge': '−10% off',
    'story.kicker': 'Our story', 'story.title': 'A tradition whipped for three hours, lasting for generations',
    'story.p1': 'In Drvar, where the cornelian cherry thrives like nowhere else, our family has been turning bright-red drenjine into products made by our ancestors’ recipes for fifteen years.',
    'story.p2': 'Our whipped pekmez is never cooked — it is whipped for a full three hours — which is exactly why it keeps all the best the dren has to give.',
    'story.btn': 'Meet the family', 'story.caption': 'Mlinski put 185, Drvar village',
    'story.seal': 'Since 2010 · Drvar',
    'why.kicker': 'Why dren?', 'why.title': '“Healthy as a dren” — more than a saying',
    'why1.h': 'A treasury of vitamin C', 'why1.p': 'Cornelian cherry holds up to twice the vitamin C of lemon — a folk immunity remedy for centuries.',
    'why2.h': 'By hand, with love', 'why2.p': 'Every fruit is hand-picked, sorted and processed in our home workshop — no machines, no hurry.',
    'why3.h': 'Not a single additive', 'why3.p': 'Just dren, sugar and patience. Nothing added, nothing taken away — nature knows best.',
    'galteaser.kicker': 'Gallery', 'galteaser.title': 'Step into our world of dren',
    'galteaser.btn': 'View full gallery',
    'blogteaser.kicker': 'From our blog', 'blogteaser.title': 'Stories from the dren valley',
    'blogteaser.btn': 'All articles', 'blog.readMore': 'Read more',
    'cta.title': 'Order today', 'cta.lead': 'We ship by post across Bosnia and the region. Get in touch — arranging an order is quick and easy.',
    'cta.btn': 'Go to order page',
    'footer.tag': 'Original quality from Drvar — since 2010.',
    'footer.nav': 'Navigation', 'footer.shop': 'Products', 'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.', 'footer.made': 'Made with ❤ in Drvar',
    'cart.title': 'Your cart', 'cart.empty': 'Your cart is still empty.',
    'cart.emptyHand': 'Fill it with health!', 'cart.total': 'Total:',
    'cart.note': 'Cash on delivery or by arrangement. Shipping is calculated on confirmation.',
    'cart.checkout': 'Complete order', 'cart.remove': 'remove', 'cart.paket': 'Gift box',
    'checkout.title': 'Complete your order', 'checkout.lead': 'Fill in your details — send the order with one click, by e-mail or message.',
    'checkout.name': 'Full name', 'checkout.phone': 'Phone', 'checkout.address': 'Address and town',
    'checkout.email': 'E-mail (for order confirmation)',
    'checkout.emailBad': 'Please check your e-mail address.',
    'checkout.country': 'Country', 'checkout.countryBA': 'Bosnia and Herzegovina', 'checkout.countryRS': 'Serbia',
    'checkout.age': 'I confirm that I am at least 18 years old and allowed to order products from this site.',
    'checkout.ageMissing': 'Please confirm that you are at least 18 years old.',
    'checkout.autoReply': 'Your order has been received and will be processed shortly. We will contact you to confirm the details and arrange delivery. Thank you for your trust!\n\n— Domaćinstvo Jović, Drvar\n+387 63 133 086 (phone/Viber/WhatsApp)',
    'checkout.note': 'Note (optional)', 'checkout.total': 'Total',
    'checkout.sendEmail': 'Send by e-mail', 'checkout.sendWa': 'Send via WhatsApp',
    'checkout.sendViber': 'Send via Viber', 'checkout.copy': 'Copy order',
    'checkout.copied': 'Order copied — paste it into a message.',
    'checkout.fill': 'Please enter your name, phone, e-mail and address.',
    'checkout.orderNow': '✓ Order now',
    'checkout.autoNote': 'The order is sent automatically to Domaćinstvo Jović.',
    'checkout.terms1': 'By sending the order you accept our', 'checkout.terms2': 'Ordering Terms',
    'checkout.alt': '— or send the order manually —',
    'checkout.sending': 'Sending order…',
    'checkout.successH': 'Order received!',
    'checkout.successP': 'Thank you for your trust — we will contact you soon to confirm and arrange delivery.',
    'checkout.successOk': 'OK',
    'checkout.error': 'Sending failed — please try again or use WhatsApp / Viber below.',
    'checkout.activate': 'Order inbox is not activated yet — check sue.jovic@gmail.com and click “Activate” in the FormSubmit e-mail, then try again.',
    'toast.added': 'Added to cart ✓', 'toast.min1': 'The box holds at least 1 of each product',
    'order.title': 'ORDER — Domaćinstvo Jović', 'order.name': 'Name', 'order.phone': 'Phone',
    'order.email': 'E-mail',
    'order.address': 'Address', 'order.country': 'Country', 'order.note': 'Note', 'order.subject': 'Order',
    'order.age18': '✔ AGE 18+ CONFIRMATION: when ordering, the customer ticked that they are at least 18 years old and allowed to order from this site',
    'shop.kicker': 'Order', 'shop.title': 'Choose your cornelian treasures',
    'shop.lead': 'Order individually or build a gift box — we ship by express post across Bosnia and the region, cash on delivery.',
    'shop.more': 'On request we also make rosehip pekmez, homemade cornelian cherry juice and slatko preserve — just get in touch.',
    'paket.addBtn': 'Add box to cart',
    'paket.hint': '* The box holds at least one of each product — increase quantities as you wish.',
    'how.kicker': 'How to order?', 'how.title': 'Three steps to your parcel',
    'how.s1h': 'Fill your cart', 'how.s1p': 'Add products individually or build a gift box.',
    'how.s2h': 'Send the order', 'how.s2p': 'One click — by e-mail, WhatsApp or Viber. Whatever suits you.',
    'how.s3h': 'The parcel arrives', 'how.s3p': 'We ship by express post and you pay on delivery — when it arrives.',
    'about.kicker': 'Our story', 'about.title': 'A family, the dren, and a craft generations old',
    'about.lead': 'From Drvar, a town at the foot of Klekovača mountain where the cornelian cherry thrives like nowhere else — comes our family’s story.',
    'about.s1.kicker': 'How it all began', 'about.s1.title': 'From a family recipe to a brand from Drvar',
    'about.s1.p1': 'It all began out of pure love for nature — as a hobby of mother Olivera, known to everyone as Lela: she made cornelian-cherry gifts for her friends. In 2010 we decided to start doing for others what our house had been doing for itself — and Domaćinstvo Jović was born.',
    'about.s1.p2': 'The household is run by mother Lela and daughter Suzana, with the indispensable help of father and brother. Every jar of pekmez, every bottle of brandy and every gift box passes through our hands — from the branch to your table.',
    'about.s1.p3': 'We are proudest of our whipped cornelian pekmez: it is never cooked, but whipped for a full three hours, by hand and without a single preservative — by a recipe passed down through generations. Today that pekmez also carries a protected geographical origin label — a seal that it is made right here, and exactly this way.',
    'about.s1.p4': 'And Suzana is living proof that village life and a career do not exclude each other: she went from cleaner, to director, to advisor to a minister. When she once lost her job overnight, university degree in hand, she took over the barn and the cows — and those nine months, she says, taught her military discipline and early rising. That is why you will still find her on the homestead every morning — and new heifers arrive at the farm this spring. Several TV stories have been filmed about us — watch them further down this page.',
    'about.s1.izreka': '“If you have not visited the Jović family — it is as if you were never in Drvar at all.”',
    'about.s1.cap': 'Suzana and mum Lela — two generations, one recipe',
    'about.szCap': 'Suzana — her mother’s right hand',
    'about.quote': 'The dren is a generous tree — first to blossom, last to bear fruit. It teaches you patience, and patience is half of our craft.',
    'about.proc.kicker': 'How we work', 'about.proc.title': 'From branch to jar — all by hand',
    'about.proc.s1h': '1. Harvest', 'about.proc.s1p': 'Every autumn we hand-pick cornelian cherries on the hillsides around Drvar — only ripe, bright-red fruit.',
    'about.proc.s2h': '2. Craft', 'about.proc.s2p': 'The pekmez is whipped for three hours without cooking, the brandy is distilled in a copper still, and the pickles and liqueur mature slowly — as long as they need.',
    'about.proc.s3h': '3. Packing', 'about.proc.s3p': 'We fill, weigh and pack every jar and bottle by hand — then ship it to your address as if sending it to family.',
    'about.tl.kicker': 'Our journey', 'about.tl.title': 'Fifteen years, one love',
    'about.tl.i1': 'We founded Domaćinstvo Jović and brought our products to customers for the first time.',
    'about.tl.y2': 'Then', 'about.tl.i2': 'Whipped pekmez became our trademark — the story of the jam that is never cooked spread by word of mouth.',
    'about.tl.y3': 'Every autumn', 'about.tl.i3': 'We are regulars at the “Days of the Drvar Cornelian Cherry” festival — our stall is remembered and sought out.',
    'about.tl.y4': 'Today', 'about.tl.i4': 'We ship across Bosnia, to Serbia, Montenegro and Macedonia, and we are working on regular delivery to Croatia. Demand is such that people always ask for “one jar more”.',
    'about.vid.kicker': 'Video', 'about.vid.title': 'See us in action',
    'about.vid.lead': 'Drvar, the cornelian cherry and our products — through the lens of TV crews and guests.',
    'about.vid.c1': 'TV Živa Istina visits Domaćinstvo Jović',
    'about.vid.c2': 'Drenjijada in Drvar — our famous whipped pekmez',
    'about.vid.c3': 'Suzana’s story — from the farm to ministry advisor',
    'about.fb': 'Follow us on Facebook',
    'about.map.kicker': 'Where we are', 'about.map.title': 'Find us on the map',
    'about.map.lead': 'Mlinski put 185, Drvar village — a few kilometres from the centre of Drvar, with tourist signposts leading straight to the farm. Our door is always open.',
    'about.map.btn': 'Open in Google Maps',
    'gal.kicker': 'Gallery', 'gal.title': 'Our world of dren',
    'gal.lead': 'From blossom to jar — the botanical collection of Domaćinstvo Jović. Click an image to enlarge.',
    'blogp.kicker': 'Blog', 'blogp.title': 'Stories from the dren valley',
    'blogp.lead': 'About health, tradition and people — everything the dren carries with it, written in our own words.',
    'con.kicker': 'Contact', 'con.title': 'We are here for you — get in touch',
    'con.lead': 'For orders, questions or just a kind word — write or call. We reply fast, like a dren!',
    'con.addr.h': 'Address', 'con.addr.country': 'Bosnia and Herzegovina', 'con.addr.map': 'Open in Google Maps →',
    'con.phone.h': 'Phone · Viber · WhatsApp', 'con.phone.p': 'Call or write — we are available every day.',
    'con.email.p': 'We reply within 24 hours.',
    'con.form.kicker': 'Write to us', 'con.form.title': 'Send a message',
    'con.form.lead': 'Fill in the form — the message opens in your e-mail app, ready to send.',
    'con.form.msg': 'Your message', 'con.form.send': 'Send message',
    'con.map.note': 'Come visit us — no one leaves our home hungry or thirsty!',
    'art.back': '← Back to blog',
  }
};

/* Naslovi stranica po jeziku */
const PAGE_TITLES = {
  index:   { sr: 'Domaćinstvo Jović — Originalna kvaliteta iz Drvara | Drenovača, mućeni pekmez, liker, turšija',
             en: 'Domaćinstvo Jović — Original quality from Drvar | Brandy, whipped pekmez, liqueur, pickles' },
  about:   { sr: 'O nama — Domaćinstvo Jović, Drvar', en: 'About us — Domaćinstvo Jović, Drvar' },
  shop:    { sr: 'Naručite — Domaćinstvo Jović, Drvar', en: 'Order — Domaćinstvo Jović, Drvar' },
  gallery: { sr: 'Galerija — Domaćinstvo Jović, Drvar', en: 'Gallery — Domaćinstvo Jović, Drvar' },
  blog:    { sr: 'Blog — Domaćinstvo Jović, Drvar', en: 'Blog — Domaćinstvo Jović, Drvar' },
  contact: { sr: 'Kontakt — Domaćinstvo Jović, Drvar', en: 'Contact — Domaćinstvo Jović, Drvar' },
  article: null, // članci zadržavaju svoj naslov
};

/* ---------- Jezik ---------- */
/* Sačuvani izbor ima prednost; za prvu posjetu: srpski za sr/hr/bs browsere, engleski za sve ostale */
let LANG = localStorage.getItem('dj-lang')
  || (/^(sr|hr|bs|me|sl|mk)/i.test(navigator.language || '') ? 'sr' : 'en');

function t(key) { return (I18N[LANG] && I18N[LANG][key]) || I18N.sr[key] || key; }

function applyLang() {
  document.documentElement.lang = LANG;
  document.documentElement.dataset.lang = LANG;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (I18N[LANG][key] !== undefined) el.textContent = I18N[LANG][key];
  });
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    // format: "placeholder:key1;aria-label:key2"
    el.dataset.i18nAttr.split(';').forEach(pair => {
      const [attr, key] = pair.split(':');
      if (I18N[LANG][key] !== undefined) el.setAttribute(attr, I18N[LANG][key]);
    });
  });
  const page = document.body.dataset.page;
  if (page && PAGE_TITLES[page]) document.title = PAGE_TITLES[page][LANG];
  /* Stranice sa sopstvenim naslovom (članci, proizvodi): data-title-en na <body> */
  if (document.body.dataset.titleEn) {
    if (!document.body.dataset.titleSr) document.body.dataset.titleSr = document.title;
    document.title = (LANG === 'en')
      ? document.body.dataset.titleEn : document.body.dataset.titleSr;
  }
  document.querySelectorAll('.lang-switch button').forEach(b =>
    b.classList.toggle('is-on', b.dataset.lang === LANG));
  renderCartDrawer();
  document.dispatchEvent(new CustomEvent('langchange', { detail: LANG }));
}

function setLang(l) {
  LANG = l;
  localStorage.setItem('dj-lang', l);
  /* Bez trzaja: tekstovi na dva jezika nemaju istu dužinu, pa se visine
     sekcija promijene i sadržaj bi "odskočio". Zato zapamtimo element
     pri vrhu ekrana i nakon prevoda vratimo skrol tako da on ostane
     na istom mjestu — čitalac ne primijeti nikakvo pomjeranje. */
  let anchor = null, anchorTop = 0, secAnchor = null, secTop = 0;
  if (window.scrollY > 0) {
    const probe = document.elementsFromPoint(
      document.documentElement.clientWidth / 2, Math.min(140, window.innerHeight / 3));
    anchor = probe.find(el => el.closest && el.closest('main'));
    if (anchor) {
      anchorTop = anchor.getBoundingClientRect().top;
      /* rezervno sidro: ako je element u data-lang bloku koji će se sakriti
         (članci), držimo se njegove sekcije — ona nikad ne nestaje */
      secAnchor = anchor.closest('section, article') || anchor;
      secTop = secAnchor.getBoundingClientRect().top;
    }
  }
  document.body.style.opacity = '0';
  setTimeout(() => {
    applyLang();
    if (anchor && document.contains(anchor)) {
      let el = anchor, from = anchorTop;
      if (!anchor.getBoundingClientRect().height && secAnchor) { el = secAnchor; from = secTop; }
      const diff = el.getBoundingClientRect().top - from;
      if (diff) {
        const se = document.documentElement.style;
        se.scrollBehavior = 'auto';          // preskoči smooth-scroll za ovu korekciju
        window.scrollBy(0, diff);
        se.scrollBehavior = '';
      }
    }
    document.body.style.opacity = '1';
  }, 160);
}

/* ============================================================
   KORPA
   ============================================================ */
function getCart() {
  try { return JSON.parse(localStorage.getItem('dj-cart')) || []; }
  catch (e) { return []; }
}
function saveCart(cart) {
  localStorage.setItem('dj-cart', JSON.stringify(cart));
  updateCartBadge();
}

function paketPrice(items) {
  let sum = 0;
  for (const id in items) sum += PRODUCTS[id].price * items[id];
  return Math.round(sum * (1 - PAKET_DISCOUNT) * 100) / 100;
}

function lineTotal(line) {
  return line.type === 'paket'
    ? paketPrice(line.items) * line.qty
    : PRODUCTS[line.id].price * line.qty;
}

function cartTotal() {
  return getCart().reduce((s, l) => s + lineTotal(l), 0);
}
function cartCount() {
  return getCart().reduce((s, l) => s + l.qty, 0);
}

function fmt(n) {
  return (Math.round(n * 100) / 100).toLocaleString(LANG === 'sr' ? 'sr-Latn-BA' : 'en-GB',
    { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + ' KM';
}

function addToCart(id, qty) {
  qty = Math.max(1, qty | 0);
  const cart = getCart();
  const found = cart.find(l => l.type === 'p' && l.id === id);
  if (found) found.qty += qty;
  else cart.push({ type: 'p', id, qty });
  saveCart(cart);
  bumpBadge(); toast(t('toast.added'));
}

function addPaketToCart(items, qty) {
  const key = JSON.stringify(items);
  const cart = getCart();
  const found = cart.find(l => l.type === 'paket' && JSON.stringify(l.items) === key);
  if (found) found.qty += qty;
  else cart.push({ type: 'paket', items, qty });
  saveCart(cart);
  bumpBadge(); toast(t('toast.added'));
}

function updateCartBadge() {
  const n = cartCount();
  document.querySelectorAll('.cart-btn__count').forEach(el => {
    el.textContent = n;
    el.classList.toggle('is-on', n > 0);
  });
}
function bumpBadge() {
  document.querySelectorAll('.cart-btn__count').forEach(el => {
    el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump');
  });
}

/* ---------- Drawer render ---------- */
function renderCartDrawer() {
  const wrap = document.getElementById('cartItems');
  if (!wrap) return;
  const cart = getCart();
  const foot = document.getElementById('cartFoot');

  if (!cart.length) {
    wrap.innerHTML = `<div class="cart-empty"><p>${t('cart.empty')}</p><span class="hand">${t('cart.emptyHand')}</span></div>`;
    if (foot) foot.style.display = 'none';
    return;
  }
  if (foot) foot.style.display = '';

  wrap.innerHTML = cart.map((line, i) => {
    if (line.type === 'paket') {
      const inner = Object.entries(line.items).filter(([, q]) => q > 0)
        .map(([id, q]) => `${PRODUCTS[id][LANG].name} ×${q}`).join(', ');
      return `
      <div class="cart-item">
        <div class="cart-item__img"><img src="${ROOT}img/poklon-paket.webp" alt="" class="ill" loading="lazy"></div>
        <div>
          <div class="cart-item__name">🎁 ${t('cart.paket')}</div>
          <div class="cart-item__sub">${inner}</div>
          <div class="qty" data-line="${i}">
            <button type="button" data-d="-1" aria-label="−">−</button>
            <input type="number" value="${line.qty}" min="1" readonly>
            <button type="button" data-d="1" aria-label="+">+</button>
          </div>
          <button type="button" class="cart-item__remove" data-remove="${i}">${t('cart.remove')}</button>
        </div>
        <div class="cart-item__price">${fmt(lineTotal(line))}</div>
      </div>`;
    }
    const p = PRODUCTS[line.id];
    return `
    <div class="cart-item">
      <div class="cart-item__img"><img src="${ROOT}img/${p.img}" alt="" class="ill" loading="lazy"></div>
      <div>
        <div class="cart-item__name">${p[LANG].name}</div>
        <div class="cart-item__sub">${p[LANG].unit}</div>
        <div class="qty" data-line="${i}">
          <button type="button" data-d="-1" aria-label="−">−</button>
          <input type="number" value="${line.qty}" min="1" readonly>
          <button type="button" data-d="1" aria-label="+">+</button>
        </div>
        <button type="button" class="cart-item__remove" data-remove="${i}">${t('cart.remove')}</button>
      </div>
      <div class="cart-item__price">${fmt(lineTotal(line))}</div>
    </div>`;
  }).join('');

  const totalEl = document.getElementById('cartTotal');
  if (totalEl) totalEl.textContent = fmt(cartTotal());

  wrap.querySelectorAll('.qty button').forEach(btn => {
    btn.addEventListener('click', () => {
      const i = +btn.closest('.qty').dataset.line;
      const cart = getCart();
      cart[i].qty += +btn.dataset.d;
      if (cart[i].qty < 1) cart.splice(i, 1);
      saveCart(cart); renderCartDrawer();
    });
  });
  wrap.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cart = getCart();
      cart.splice(+btn.dataset.remove, 1);
      saveCart(cart); renderCartDrawer();
    });
  });
}

/* ---------- Zaključavanje skrola bez poskakivanja ----------
   Kada se sakrije skrol traka, stranica bi se proširila i "trznula".
   Zato nadoknađujemo njenu širinu paddingom — sve ostaje na mjestu. */
function lockScroll() {
  /* Moderni browseri: scrollbar-gutter:stable drži prostor trake rezervisanim,
     pa nikakva kompenzacija ne treba. Stariji: nadoknadimo širinu paddingom. */
  const gutterOk = window.CSS && CSS.supports && CSS.supports('scrollbar-gutter', 'stable');
  const before = document.documentElement.clientWidth;
  document.body.style.overflow = 'hidden';
  if (!gutterOk) {
    const diff = document.documentElement.clientWidth - before;
    if (diff > 0) document.body.style.paddingRight = diff + 'px';
  }
}
function unlockScroll() {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
}

/* ---------- Drawer open/close ---------- */
function openCart() {
  renderCartDrawer();
  document.getElementById('cartDrawer')?.classList.add('is-open');
  document.getElementById('drawerBackdrop')?.classList.add('is-open');
  lockScroll();
}
function closeCart() {
  document.getElementById('cartDrawer')?.classList.remove('is-open');
  document.getElementById('drawerBackdrop')?.classList.remove('is-open');
  unlockScroll();
}

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  let el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<span class="dot"></span><span class="toast__msg"></span>';
    document.body.appendChild(el);
  }
  el.querySelector('.toast__msg').textContent = msg;
  el.classList.add('is-on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-on'), 2600);
}

/* ============================================================
   NARUDŽBA — tekst i slanje (koristi i shop.js)
   ============================================================ */
function buildOrderText(data) {
  const lines = [t('order.title'), '='.repeat(30), ''];
  getCart().forEach(l => {
    if (l.type === 'paket') {
      const inner = Object.entries(l.items).filter(([, q]) => q > 0)
        .map(([id, q]) => `${PRODUCTS[id][LANG].name} ×${q}`).join(', ');
      lines.push(`• ${t('cart.paket')} (${inner}) ×${l.qty} — ${fmt(lineTotal(l))}`);
    } else {
      lines.push(`• ${PRODUCTS[l.id][LANG].name} (${PRODUCTS[l.id][LANG].unit}) ×${l.qty} — ${fmt(lineTotal(l))}`);
    }
  });
  lines.push('', `${t('checkout.total').toUpperCase()}: ${fmt(cartTotal())}`, '', '-'.repeat(30));
  lines.push(`${t('order.name')}: ${data.name}`);
  lines.push(`${t('order.phone')}: ${data.phone}`);
  if (data.email) lines.push(`${t('order.email')}: ${data.email}`);
  lines.push(`${t('order.address')}: ${data.address}`);
  if (data.country) lines.push(`${t('order.country')}: ${data.country}`);
  if (data.note) lines.push(`${t('order.note')}: ${data.note}`);
  /* dokaz o potvrdi punoljetstva — ide i prodavcu i kupcu (auto-potvrda) */
  if (data.age18) {
    const now = new Date().toLocaleString(LANG === 'sr' ? 'sr-Latn-BA' : 'en-GB');
    lines.push('', `${t('order.age18')} (${now})`);
  }
  return lines.join('\n');
}

/* ============================================================
   DEKORACIJE — garancija da se nikada ne dodiruju
   Pozicije su zadate ručno, ali visina sekcija zavisi od širine
   ekrana i jezika, pa bi se dvije slike na nekoj širini ipak
   mogle sresti. Zato poslije učitavanja (i na svaku promjenu)
   izmjerimo sve parove — sa sigurnosnim pojasom koji pokriva
   "disanje" animacije (±20 px) i malo vazduha. Ako bi se neki
   par ipak dodirnuo, kasnija slika u DOM-u se privremeno
   sakriva (dok ne bude mjesta).
   ============================================================ */
function decoGuard() {
  const decos = [...document.querySelectorAll('.deco')];
  if (!decos.length) return;
  decos.forEach(d => d.classList.remove('deco--off'));       // mjeri se uvijek ispočetka
  if (getComputedStyle(decos[0]).display === 'none') return; // uski ekran: sve su ionako skrivene
  const kept = [];
  /* PREPREKE koje dekoracija ne smije da dodirne (a same se nikad ne sakrivaju):
     — grane u uglovima page-hero sekcija,
     — SAV vidljivi sadržaj sa "tijelom": slike, kartice, ramovi, paketi,
       video kartice, forme, mapa... Dekoracija se prikazuje samo tamo gdje
       ima stvarno slobodnog mjesta — nikada ispod ili preko sadržaja. */
  const OBSTACLES = '.corner-branch, main img:not(.deco):not(.corner-branch), ' +
    '.c-card, .p-card, .b-card, .benefit, .paket, .frame, .map-frame, ' +
    '.video-card, .pk-row, .form, .quote, .article .container';
  document.querySelectorAll(OBSTACLES).forEach(c => {
    const r = c.getBoundingClientRect();
    if (r.width && r.height) kept.push({ l: r.left - 10, t: r.top - 10, r: r.right + 10, b: r.bottom + 10 });
  });
  decos.forEach(d => {
    const r = d.getBoundingClientRect();
    if (r.height < 4) return; // slika još nije učitana — ponovo na window 'load'
    const pad = 36;
    const box = { l: r.left - pad, t: r.top - pad, r: r.right + pad, b: r.bottom + pad };
    if (kept.some(k => box.l < k.r && box.r > k.l && box.t < k.b && box.b > k.t)) {
      d.classList.add('deco--off');
    } else {
      kept.push(box);
    }
  });
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  /* Header scroll sjenka */
  const header = document.querySelector('.header');
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Burger */
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');
  burger?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open);
    open ? lockScroll() : unlockScroll();
  });
  nav?.querySelectorAll('a').forEach((a, i) => {
    a.style.setProperty('--i', i);
    a.addEventListener('click', () => {
      nav.classList.remove('is-open'); burger?.classList.remove('is-open');
      unlockScroll();
    });
  });

  /* Tema — svijetla/tamna, sa kratkom animacijom pretapanja */
  document.querySelectorAll('[data-theme-toggle]').forEach(b =>
    b.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.add('theme-anim');
      document.documentElement.dataset.theme = next;
      localStorage.setItem('dj-theme', next);
      setTimeout(() => document.documentElement.classList.remove('theme-anim'), 350);
    }));

  /* Podrazumijevano tema prati uređaj — i UŽIVO, ako korisnik na telefonu/računaru
     promijeni sistemsku temu dok je sajt otvoren. Ručni izbor (klik na dugme
     iznad, sačuvan u localStorage) uvijek ima prednost. */
  const mqDark = matchMedia('(prefers-color-scheme: dark)');
  const followDevice = () => {
    if (localStorage.getItem('dj-theme')) return;   // korisnik je ručno izabrao — poštuj to
    /* svježe čitanje (ne keširano mqDark.matches) — pouzdanije u svim browserima */
    const next = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    if (document.documentElement.dataset.theme === next) return;
    document.documentElement.classList.add('theme-anim');
    document.documentElement.dataset.theme = next;
    setTimeout(() => document.documentElement.classList.remove('theme-anim'), 350);
  };
  if (mqDark.addEventListener) mqDark.addEventListener('change', followDevice);
  else if (mqDark.addListener) mqDark.addListener(followDevice); // stariji Safari
  /* rezerva: kad se korisnik vrati na tab (česta situacija: promijenio je
     sistemsku temu dok je sajt bio u pozadini), provjeri je ponovo */
  document.addEventListener('visibilitychange', () => { if (!document.hidden) followDevice(); });

  /* Jezik — klik na već aktivno dugme prebacuje na drugi jezik (uvijek se nešto desi) */
  document.querySelectorAll('.lang-switch button').forEach(b =>
    b.addEventListener('click', () => {
      const target = b.dataset.lang === LANG ? (LANG === 'sr' ? 'en' : 'sr') : b.dataset.lang;
      setLang(target);
    }));

  /* Korpa dugmad */
  document.querySelectorAll('[data-open-cart]').forEach(b =>
    b.addEventListener('click', openCart));
  document.getElementById('drawerBackdrop')?.addEventListener('click', closeCart);
  document.querySelector('.drawer__close')?.addEventListener('click', closeCart);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });

  /* Scroll reveal — elementi koji su VEĆ u prvom ekranu prikazuju se odmah
     (bez fade-ina pri učitavanju); animiraju se samo oni do kojih se skroluje */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      el.classList.add('reveal--instant', 'is-in');
    } else {
      io.observe(el);
    }
  });

  /* Dekoracije NAMJERNO nemaju parallax na pomjeranje miša (zahtjev korisnika):
     stoje na svom mjestu — pomjeraju se samo kroz decoCycle animaciju
     (pojavljivanje/nestajanje + blago "disanje" i skaliranje). */

  /* Brzo dodavanje u korpu (kartice na početnoj) */
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-quick-add]');
    if (b) addToCart(b.dataset.quickAdd, 1);
  });

  /* Glatki prelaz između stranica: klik na interni link → kratki fade-out → navigacija.
     Nova stranica ulazi kroz pageIn animaciju, pa prelaz djeluje kao pretapanje. */
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download') || e.ctrlKey || e.metaKey || e.shiftKey) return;
    let url;
    try { url = new URL(a.getAttribute('href'), location.href); } catch (err) { return; }
    if (url.protocol !== location.protocol || url.host !== location.host) return;   // eksterni, mailto, tel, viber...
    if (url.pathname === location.pathname && url.hash) return;                      // sidro na istoj strani
    e.preventDefault();
    document.body.classList.add('page-leave');
    setTimeout(() => { location.href = url.href; }, 70);
  });
  /* povratak iz keša (dugme Nazad) — ukloni izlazni fade da strana ne ostane prazna */
  window.addEventListener('pageshow', () => {
    document.body.classList.remove('page-leave');
    document.body.classList.add('page-enter');
  });

  /* ulazni fade stranice (u sljedećem frejmu, da tranzicija sigurno krene) */
  requestAnimationFrame(() => document.body.classList.add('page-enter'));

  /* sigurnosni ventil: ako fade iz bilo kog razloga ne krene (zamrznut tab i sl.),
     prikaži stranicu odmah — bez tranzicije */
  setTimeout(() => {
    if (getComputedStyle(document.body).opacity !== '1') {
      document.body.style.transition = 'none';
      document.body.classList.add('page-enter');
      void document.body.offsetWidth;
      document.body.style.transition = '';
    }
  }, 300);

  /* Dekoracije: geometrijska provjera preklapanja — na učitavanje,
     promjenu veličine prozora, promjenu jezika i kad fontovi stignu */
  let decoTimer;
  const decoSoon = () => { clearTimeout(decoTimer); decoTimer = setTimeout(decoGuard, 150); };
  decoGuard();
  window.addEventListener('load', decoGuard);
  window.addEventListener('resize', decoSoon);
  document.addEventListener('langchange', decoSoon);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(decoSoon);
  /* i na SVAKU kasniju promjenu visine stranice (lijeno učitane slike,
     mape, video...) — layout se pomjeri, pa parove mjerimo iznova */
  if (window.ResizeObserver) new ResizeObserver(decoSoon).observe(document.body);

  /* Godina u futeru */
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  updateCartBadge();
  applyLang();
});
