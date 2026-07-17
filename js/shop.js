/* ============================================================
   DOMAĆINSTVO JOVIĆ — shop.js (strana "Naruči")
   Pojedinačna narudžba · poklon paket (min 1× svaki) · checkout
   ============================================================ */
'use strict';

const PHONE_INTL = '38763133086';           // +387 63 133 086
const ORDER_EMAIL = 'sue.jovic@gmail.com';

/* Automatsko slanje narudžbe e-mailom (FormSubmit.co — besplatno, bez registracije).
   VAŽNO: kada stigne PRVA narudžba, FormSubmit šalje aktivacioni e-mail na
   sue.jovic@gmail.com — potrebno je JEDNOM kliknuti na link "Activate" u toj poruci.
   Nakon toga sve narudžbe stižu automatski u inbox. */
const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/' + ORDER_EMAIL;

/* (Opcionalno) Instant Telegram notifikacija o narudžbi.
   Podešavanje (5 minuta):
   1. U Telegramu otvorite @BotFather → /newbot → dajte ime (npr. "Jovic narudzbe")
      → dobijete TOKEN (npr. "1234567:AAH3k...").
   2. Otvorite svog novog bota i pošaljite mu bilo koju poruku (npr. "zdravo").
   3. Otvorite @userinfobot → pošaljite /start → dobijete svoj CHAT ID (broj).
   4. Upišite oba podatka ispod i sačuvajte fajl. Gotovo!
   Dok su polja prazna, Telegram se preskače. */
const TELEGRAM = {
  token: '',    // ovdje TOKEN od BotFather-a
  chatId: '',   // ovdje vaš chat ID
};

function notifyTelegram(text) {
  if (!TELEGRAM.token || !TELEGRAM.chatId) return;
  fetch('https://api.telegram.org/bot' + TELEGRAM.token + '/sendMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: TELEGRAM.chatId, text: '🛒 ' + text }),
  }).catch(() => { /* notifikacija je bonus — ne prekidamo narudžbu */ });
}

/* (Opcionalno) Instant WhatsApp notifikacija — preko besplatnog CallMeBot servisa.
   Podešavanje (2 minuta, radi se SA SUZANINOG telefona):
   1. U imenik dodajte broj +34 644 51 95 23 (CallMeBot).
   2. Tom broju pošaljite WhatsApp poruku tačno ovog sadržaja:
      "I allow callmebot to send me messages"
   3. Stiže odgovor sa vašim API ključem (npr. "Your APIKEY is 123456").
   4. Upišite ključ ispod i sačuvajte fajl. Gotovo!
   Dok je polje prazno, WhatsApp se preskače. */
const CALLMEBOT = {
  phone: '+38763133086',  // broj koji PRIMA poruku (Suzanin WhatsApp)
  apikey: '',             // ovdje API ključ od CallMeBot-a
};

function notifyWhatsApp(text) {
  if (!CALLMEBOT.apikey) return;
  const url = 'https://api.callmebot.com/whatsapp.php'
    + '?phone=' + encodeURIComponent(CALLMEBOT.phone)
    + '&apikey=' + encodeURIComponent(CALLMEBOT.apikey)
    + '&text=' + encodeURIComponent('🛒 ' + text);
  fetch(url, { mode: 'no-cors' }).catch(() => { /* bonus — ne prekidamo narudžbu */ });
}

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Pojedinačni proizvodi: stepper + dodaj ----------
     Radi i na karticama (narucite.html) i na stranicama proizvoda */
  document.querySelectorAll('[data-product]').forEach(card => {
    const id = card.dataset.product;
    const input = card.querySelector('.qty input');
    card.querySelectorAll('.qty button').forEach(btn => {
      btn.addEventListener('click', () => {
        input.value = Math.max(1, (+input.value || 1) + (+btn.dataset.d));
      });
    });
    card.querySelector('[data-add]')?.addEventListener('click', () => {
      addToCart(id, +input.value || 1);
      input.value = 1;
    });
  });

  /* ---------- Poklon paket konfigurator ---------- */
  const pk = document.getElementById('paketConfig');
  if (pk) {
    const state = { rakija: 1, liker: 1, pekmez: 1, tursija: 1 };

    const render = () => {
      let full = 0;
      for (const id in state) {
        full += PRODUCTS[id].price * state[id];
        const row = pk.querySelector(`.pk-row[data-id="${id}"]`);
        row.querySelector('input').value = state[id];
        row.querySelector('[data-d="-1"]').style.opacity = state[id] <= 1 ? .4 : 1;
      }
      const disc = Math.round(full * (1 - PAKET_DISCOUNT) * 100) / 100;
      document.getElementById('pkOld').textContent = fmt(full);
      document.getElementById('pkNew').textContent = fmt(disc);
    };

    pk.querySelectorAll('.pk-row').forEach(row => {
      const id = row.dataset.id;
      row.querySelectorAll('.qty button').forEach(btn => {
        btn.addEventListener('click', () => {
          const next = state[id] + (+btn.dataset.d);
          if (next < 1) { toast(t('toast.min1')); return; }  // minimum 1× svaki
          state[id] = next;
          render();
        });
      });
    });

    document.getElementById('pkAdd')?.addEventListener('click', () => {
      addPaketToCart({ ...state }, 1);
      openCart();
    });

    document.addEventListener('langchange', render);
    render();
  }

  /* ---------- Checkout modal ---------- */
  const modal = document.getElementById('checkoutModal');
  const openCheckout = () => {
    if (!getCart().length) { toast(t('cart.empty')); return; }
    renderSummary();
    closeCart();
    modal.classList.add('is-open');
    lockScroll();
  };
  const closeCheckout = () => {
    modal.classList.remove('is-open');
    unlockScroll();
  };

  document.getElementById('goCheckout')?.addEventListener('click', openCheckout);
  document.querySelectorAll('[data-checkout]').forEach(b => b.addEventListener('click', openCheckout));
  /* Došao sa druge strane preko "Završi narudžbu" u korpi */
  if (location.hash === '#zavrsi' && getCart().length) setTimeout(openCheckout, 400);
  modal?.querySelector('.modal__close')?.addEventListener('click', closeCheckout);
  modal?.addEventListener('click', e => { if (e.target === modal) closeCheckout(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal?.classList.contains('is-open')) closeCheckout();
  });

  function renderSummary() {
    const box = document.getElementById('orderSummary');
    if (!box) return;
    const rows = getCart().map(l => {
      if (l.type === 'paket') {
        const inner = Object.entries(l.items).filter(([, q]) => q > 0)
          .map(([id, q]) => `${PRODUCTS[id][LANG].name} ×${q}`).join(', ');
        return `<div><span>🎁 ${t('cart.paket')} ×${l.qty}<br><small style="opacity:.7">${inner}</small></span><b>${fmt(lineTotal(l))}</b></div>`;
      }
      return `<div><span>${PRODUCTS[l.id][LANG].name} ×${l.qty}</span><b>${fmt(lineTotal(l))}</b></div>`;
    }).join('');
    box.innerHTML = rows +
      `<div class="total"><span>${t('checkout.total')}</span><b>${fmt(cartTotal())}</b></div>`;
  }
  document.addEventListener('langchange', () => {
    if (modal?.classList.contains('is-open')) renderSummary();
  });

  /* ---------- Slanje narudžbe ---------- */
  const getData = () => {
    const sel = document.getElementById('coCountry');
    return {
      name: document.getElementById('coName').value.trim(),
      phone: document.getElementById('coPhone').value.trim(),
      email: (document.getElementById('coEmail')?.value || '').trim(),
      address: document.getElementById('coAddress').value.trim(),
      /* tekst izabrane opcije — već preveden na aktivni jezik */
      country: sel ? sel.options[sel.selectedIndex].textContent.trim() : '',
      age18: !!document.getElementById('coAge')?.checked,
      note: document.getElementById('coNote').value.trim(),
    };
  };
  const validate = (d) => {
    if (!d.name || !d.phone || !d.email || !d.address) { toast(t('checkout.fill')); return false; }
    if (!/^\S+@\S+\.\S+$/.test(d.email)) { toast(t('checkout.emailBad')); return false; }
    if (!d.age18) { toast(t('checkout.ageMissing')); return false; }
    return true;
  };

  /* ---------- „Naruči odmah" — automatsko slanje ---------- */
  const autoBtn = document.getElementById('sendAuto');
  autoBtn?.addEventListener('click', async () => {
    const d = getData(); if (!validate(d)) return;
    const label = autoBtn.querySelector('span');
    const original = label.textContent;
    autoBtn.disabled = true;
    autoBtn.style.opacity = '.7';
    label.textContent = t('checkout.sending');

    const text = buildOrderText(d);
    /* Osnovna poruka koja stiže Suzani u inbox */
    const payload = {
      _subject: '🛒 ' + t('order.subject') + ' — ' + d.name,
      _template: 'box',
      _captcha: 'false',
      Narudzba: text,
    };
    /* Ako je kupac ostavio e-mail: FormSubmit ga koristi kao Reply-To
       (odgovor ide direktno kupcu) i automatski mu šalje potvrdu da je
       narudžba zaprimljena i da se obrađuje (_autoresponse). */
    if (d.email) {
      payload.email = d.email;
      payload._autoresponse = t('checkout.autoReply') + '\n\n' + text;
    }
    try {
      const res = await fetch(FORMSUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json().catch(() => ({}));
      if (String(data.success) === 'false') {
        const m = (data.message || '').toLowerCase();
        if (m.includes('activat') || m.includes('confirm') || m.includes('verif')) {
          const err = new Error(data.message); err.activation = true; throw err;
        }
        throw new Error(data.message || 'FormSubmit error');
      }

      notifyTelegram(text);          // instant poruke (ako su podešene)
      notifyWhatsApp(text);
      saveCart([]);                  // isprazni korpu
      renderCartDrawer();
      document.getElementById('checkoutMain').style.display = 'none';
      document.getElementById('orderSuccess').style.display = 'block';
    } catch (e) {
      toast(e && e.activation ? t('checkout.activate') : t('checkout.error'));
      console.warn('Slanje narudžbe nije uspjelo:', e);
    } finally {
      autoBtn.disabled = false;
      autoBtn.style.opacity = '';
      label.textContent = original;
    }
  });

  document.getElementById('successClose')?.addEventListener('click', () => {
    closeCheckout();
    /* vrati modal u početno stanje za sljedeću narudžbu */
    document.getElementById('checkoutMain').style.display = '';
    document.getElementById('orderSuccess').style.display = 'none';
  });

  document.getElementById('sendEmail')?.addEventListener('click', () => {
    const d = getData(); if (!validate(d)) return;
    const body = buildOrderText(d);
    location.href = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(t('order.subject') + ' — ' + d.name)}&body=${encodeURIComponent(body)}`;
  });

  document.getElementById('sendWa')?.addEventListener('click', () => {
    const d = getData(); if (!validate(d)) return;
    window.open(`https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(buildOrderText(d))}`, '_blank', 'noopener');
  });

  document.getElementById('sendViber')?.addEventListener('click', async () => {
    const d = getData(); if (!validate(d)) return;
    try { await navigator.clipboard.writeText(buildOrderText(d)); toast(t('checkout.copied')); }
    catch (e) { /* clipboard nedostupan — otvaramo samo Viber */ }
    setTimeout(() => { location.href = `viber://chat?number=%2B${PHONE_INTL}`; }, 600);
  });

  document.getElementById('copyOrder')?.addEventListener('click', async () => {
    const d = getData(); if (!validate(d)) return;
    try {
      await navigator.clipboard.writeText(buildOrderText(d));
      toast(t('checkout.copied'));
    } catch (e) {
      // fallback: selektuj u textarea
      const ta = document.createElement('textarea');
      ta.value = buildOrderText(d);
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); ta.remove();
      toast(t('checkout.copied'));
    }
  });
});
