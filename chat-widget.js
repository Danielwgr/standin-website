(function () {
  'use strict';

  // ── CONFIG — pas dit aan ───────────────────────────────────────────────────
  // Vul hier het WhatsApp-nummer in (internationaal formaat, zonder + of spaties)
  // Voorbeeld NL nummer: 31612345678
  var WHATSAPP_NUMBER = '31613038950';
  var WHATSAPP_MSG    = 'Hoi StandIn! Ik heb een vraag via jullie website.';
  // ──────────────────────────────────────────────────────────────────────────

  var waLink = 'https://wa.me/' + WHATSAPP_NUMBER +
               '?text=' + encodeURIComponent(WHATSAPP_MSG);

  // ── Laad lettertypen (DM Sans + Playfair Display) ─────────────────────────
  if (!document.querySelector('#si-fonts')) {
    var fl = document.createElement('link');
    fl.id   = 'si-fonts';
    fl.rel  = 'stylesheet';
    fl.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,600&family=DM+Sans:wght@400;500;600&display=swap';
    document.head.appendChild(fl);
  }

  // ── Styles ─────────────────────────────────────────────────────────────────
  var css = '\n' +
    ':root{--si-b:#6B1A2A;--si-bm:#8C2239;--si-blush:#F5E0DC;--si-cream:#FAF6F1;--si-gold:#C9906A;--si-char:#1E1616;--si-mut:#796060;}\n' +

    /* Button */
    '#si-cb{position:fixed;bottom:24px;right:24px;z-index:9999;width:58px;height:58px;border-radius:50%;background:var(--si-b);border:none;cursor:pointer;box-shadow:0 4px 22px rgba(107,26,42,.38);display:flex;align-items:center;justify-content:center;transition:transform .2s,box-shadow .2s;outline:none;}\n' +
    '#si-cb:hover{transform:scale(1.08);box-shadow:0 6px 30px rgba(107,26,42,.48);}\n' +
    '#si-cb .si-io{transition:opacity .2s,transform .2s;}\n' +
    '#si-cb .si-oc{opacity:0;transform:rotate(-90deg) scale(.55);position:absolute;transition:opacity .2s,transform .2s;}\n' +
    '#si-cb.open .si-io{opacity:0;transform:rotate(90deg) scale(.55);}\n' +
    '#si-cb.open .si-oc{opacity:1;transform:rotate(0) scale(1);}\n' +

    /* Card */
    '#si-cc{position:fixed;bottom:94px;right:24px;z-index:9998;width:360px;max-width:calc(100vw - 32px);background:#fff;border-radius:18px;box-shadow:0 16px 56px rgba(30,22,22,.16),0 2px 10px rgba(30,22,22,.07);overflow:hidden;font-family:"DM Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--si-char);opacity:0;transform:translateY(18px) scale(.97);pointer-events:none;transition:opacity .26s cubic-bezier(.4,0,.2,1),transform .26s cubic-bezier(.4,0,.2,1);}\n' +
    '#si-cc.open{opacity:1;transform:translateY(0) scale(1);pointer-events:auto;}\n' +

    /* Header */
    '.si-hd{background:var(--si-b);padding:20px 18px 18px;position:relative;overflow:hidden;}\n' +
    '.si-hd::before{content:"";position:absolute;right:-50px;top:-50px;width:160px;height:160px;border-radius:50%;background:rgba(201,144,106,.15);pointer-events:none;}\n' +
    '.si-hd::after{content:"";position:absolute;left:-30px;bottom:-40px;width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,.05);pointer-events:none;}\n' +

    /* Brand row */
    '.si-br{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;}\n' +
    '.si-logo{display:flex;align-items:center;gap:9px;}\n' +
    '.si-lm{width:32px;height:32px;background:rgba(255,255,255,.18);border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:"Playfair Display",Georgia,serif;font-weight:700;font-size:14px;color:#fff;flex-shrink:0;}\n' +
    '.si-ln{font-family:"Playfair Display",Georgia,serif;font-size:1rem;font-weight:700;color:#fff;letter-spacing:-.02em;}\n' +
    '.si-ln span{color:var(--si-gold);}\n' +
    '.si-close-hd{background:rgba(255,255,255,.15);border:none;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:background .15s;}\n' +
    '.si-close-hd:hover{background:rgba(255,255,255,.28);}\n' +

    /* Avatars */
    '.si-avs{display:flex;margin-bottom:12px;}\n' +
    '.si-av{width:34px;height:34px;border-radius:50%;border:2px solid var(--si-b);overflow:hidden;margin-right:-9px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;}\n' +
    '.si-av:last-child{margin-right:0;}\n' +
    '.si-av1{background:linear-gradient(135deg,#C9906A,#8C2239);}\n' +
    '.si-av2{background:linear-gradient(135deg,#8C2239,#6B1A2A);}\n' +
    '.si-av3{background:linear-gradient(135deg,#EDD5BE,#C9906A);color:#6B1A2A;}\n' +
    '.si-ol{font-size:.7rem;color:rgba(255,255,255,.75);margin-bottom:10px;display:flex;align-items:center;gap:6px;}\n' +
    '.si-dot{width:7px;height:7px;background:#4ade80;border-radius:50%;flex-shrink:0;}\n' +
    '.si-gr h2{font-family:"Playfair Display",Georgia,serif;font-size:1.3rem;font-weight:700;color:#fff;line-height:1.2;margin-bottom:3px;}\n' +
    '.si-gr p{font-size:.83rem;color:rgba(255,255,255,.75);}\n' +

    /* Tabs */
    '.si-tabs{display:flex;background:#fff;border-bottom:1px solid rgba(107,26,42,.09);}\n' +
    '.si-tab{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;padding:9px 4px 7px;font-size:.67rem;font-weight:600;color:var(--si-mut);cursor:pointer;border:none;background:none;transition:color .18s;letter-spacing:.01em;}\n' +
    '.si-tab.active,.si-tab:hover{color:var(--si-b);}\n' +

    /* Body */
    '.si-bd{padding:16px 14px 18px;display:flex;flex-direction:column;gap:9px;}\n' +

    /* WhatsApp CTA */
    '.si-wa{display:flex;align-items:center;gap:13px;padding:13px 14px;background:#f0fdf4;border:1.5px solid #86efac;border-radius:13px;cursor:pointer;text-decoration:none;color:inherit;transition:background .18s,border-color .18s,transform .15s;}\n' +
    '.si-wa:hover{background:#dcfce7;border-color:#4ade80;transform:translateY(-1px);}\n' +
    '.si-wa-ic{width:38px;height:38px;background:#25D366;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}\n' +
    '.si-wa-tx{flex:1;}\n' +
    '.si-wa-tx strong{display:block;font-size:.88rem;font-weight:600;color:#166534;margin-bottom:2px;}\n' +
    '.si-wa-tx span{font-size:.74rem;color:#16a34a;}\n' +
    '.si-wa-arr{color:#86efac;flex-shrink:0;}\n' +

    /* Mail CTA */
    '.si-mail{display:flex;align-items:center;gap:13px;padding:13px 14px;background:var(--si-cream);border:1px solid rgba(107,26,42,.1);border-radius:13px;cursor:pointer;text-decoration:none;color:inherit;transition:background .18s,border-color .18s,transform .15s;}\n' +
    '.si-mail:hover{background:var(--si-blush);border-color:rgba(107,26,42,.2);transform:translateY(-1px);}\n' +
    '.si-mail-ic{width:38px;height:38px;background:var(--si-b);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}\n' +
    '.si-mail-tx{flex:1;}\n' +
    '.si-mail-tx strong{display:block;font-size:.88rem;font-weight:600;color:var(--si-char);margin-bottom:2px;}\n' +
    '.si-mail-tx span{font-size:.74rem;color:var(--si-mut);}\n' +
    '.si-mail-arr{color:var(--si-mut);flex-shrink:0;}\n' +

    /* Divider label */
    '.si-div{display:flex;align-items:center;gap:8px;font-size:.68rem;color:var(--si-mut);font-weight:500;}\n' +
    '.si-div::before,.si-div::after{content:"";flex:1;height:1px;background:rgba(107,26,42,.1);}\n' +

    /* FAQ */
    '.si-fq{border:1px solid rgba(107,26,42,.1);border-radius:13px;overflow:hidden;}\n' +
    '.si-fq a{display:flex;align-items:center;gap:9px;padding:11px 13px;text-decoration:none;color:var(--si-char);font-size:.81rem;font-weight:500;border-bottom:1px solid rgba(107,26,42,.07);transition:background .15s;}\n' +
    '.si-fq a:last-child{border-bottom:none;}\n' +
    '.si-fq a:hover{background:var(--si-cream);}\n' +
    '.si-fq-ic{color:var(--si-b);flex-shrink:0;}\n' +
    '.si-fq-ar{margin-left:auto;color:var(--si-mut);flex-shrink:0;}\n' +

    /* Mobile */
    '@media(max-width:480px){\n' +
    '#si-cb{bottom:18px;right:16px;}\n' +
    '#si-cc{bottom:0;right:0;left:0;width:100%;max-width:100%;border-radius:18px 18px 0 0;transform:translateY(36px) scale(1);}\n' +
    '#si-cc.open{transform:translateY(0);}\n' +
    '}\n';

  // ── SVGs ───────────────────────────────────────────────────────────────────
  var ic = {
    chat:   '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    close:  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    closeS: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.85)" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    home:   '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    msg:    '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    help:   '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    mail:   '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    wa:     '<svg width="20" height="20" viewBox="0 0 32 32" fill="#fff"><path d="M16 3C9 3 3 9 3 16c0 2.3.6 4.5 1.8 6.5L3 29l6.7-1.8C11.6 28.4 13.8 29 16 29c7 0 13-6 13-13S23 3 16 3zm0 23.9c-2 0-4-.5-5.7-1.5l-.4-.2-4 1 1-4-.3-.4C5.5 20 5 18 5 16 5 10.5 10 5 16 5s11 5 11 11-5 10.9-11 10.9zm6-8.1c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1c-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.5-1.8-1.7-2.1s0-.5.2-.6l.5-.6.3-.5.1-.4c0-.1-.1-.3-.2-.5l-1-2.4c-.2-.6-.5-.5-.7-.5s-.4 0-.6 0-.6.1-.9.4c-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2 2.2 3.4 5.4 4.7c.8.3 1.4.5 1.8.6.8.2 1.5.2 2 .1.6-.1 1.8-.7 2.1-1.4s.3-1.3.2-1.4c-.1-.1-.4-.2-.7-.4z"/></svg>',
    arr:    '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
    book:   '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    euro:   '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10h12M4 14h12M19.5 9.3A8 8 0 1 0 19.5 15"/></svg>',
    users:  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  };

  // ── Build ──────────────────────────────────────────────────────────────────
  function build() {
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);

    // Floating button
    var btn = document.createElement('button');
    btn.id = 'si-cb';
    btn.setAttribute('aria-label', 'Open chat');
    btn.innerHTML = '<span class="si-io">' + ic.chat + '</span><span class="si-oc">' + ic.close + '</span>';

    // Card
    var card = document.createElement('div');
    card.id = 'si-cc';
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-label', 'StandIn chat');
    card.innerHTML =
      '<div class="si-hd">' +
        '<div class="si-br">' +
          '<div class="si-logo">' +
            '<div class="si-lm">S</div>' +
            '<div class="si-ln">Stand<span>In</span></div>' +
          '</div>' +
          '<button class="si-close-hd" aria-label="Sluiten">' + ic.closeS + '</button>' +
        '</div>' +
        '<div class="si-avs">' +
          '<div class="si-av si-av1">E</div>' +
          '<div class="si-av si-av2">L</div>' +
          '<div class="si-av si-av3">M</div>' +
        '</div>' +
        '<div class="si-ol"><span class="si-dot"></span>Meestal snel bereikbaar</div>' +
        '<div class="si-gr"><h2>Hi there \uD83D\uDC4B</h2><p>Hoe kunnen we je helpen?</p></div>' +
      '</div>' +

      '<div class="si-tabs" role="tablist">' +
        '<button class="si-tab active" data-tab="home" role="tab">' + ic.home + 'Home</button>' +
        '<button class="si-tab" data-tab="msg" role="tab">' + ic.msg + 'Berichten</button>' +
        '<button class="si-tab" data-tab="help" role="tab">' + ic.help + 'Help</button>' +
      '</div>' +

      '<div class="si-bd">' +
        /* WhatsApp */
        '<a class="si-wa" href="' + waLink + '" target="_blank" rel="noopener">' +
          '<div class="si-wa-ic">' + ic.wa + '</div>' +
          '<div class="si-wa-tx"><strong>Chat via WhatsApp</strong><span>Directe reactie \u2022 Kosteloos</span></div>' +
          '<span class="si-wa-arr">' + ic.arr + '</span>' +
        '</a>' +

        /* Mail / contact */
        '<a class="si-mail" href="/contact.html">' +
          '<div class="si-mail-ic">' + ic.mail + '</div>' +
          '<div class="si-mail-tx"><strong>Stuur een bericht</strong><span>We reageren binnen \xe9\xe9n werkdag</span></div>' +
          '<span class="si-mail-arr">' + ic.arr + '</span>' +
        '</a>' +

        '<div class="si-div">veelgestelde vragen</div>' +

        '<div class="si-fq">' +
          '<a href="/over-standin.html"><span class="si-fq-ic">' + ic.users + '</span>Hoe werkt StandIn?<span class="si-fq-ar">' + ic.arr + '</span></a>' +
          '<a href="/werkgevers.html"><span class="si-fq-ic">' + ic.euro + '</span>Wat kost plaatsing?<span class="si-fq-ar">' + ic.arr + '</span></a>' +
          '<a href="/vacatures.html"><span class="si-fq-ic">' + ic.book + '</span>Welke sectoren?<span class="si-fq-ar">' + ic.arr + '</span></a>' +
        '</div>' +
      '</div>';

    document.body.appendChild(card);
    document.body.appendChild(btn);

    // Toggle
    var open = false;
    function show() { open = true;  card.classList.add('open'); btn.classList.add('open'); }
    function hide() { open = false; card.classList.remove('open'); btn.classList.remove('open'); }

    btn.addEventListener('click', function () { open ? hide() : show(); });
    card.querySelector('.si-close-hd').addEventListener('click', hide);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && open) hide(); });
    document.addEventListener('click', function (e) {
      if (open && !card.contains(e.target) && !btn.contains(e.target)) hide();
    });

    // Tabs (visual)
    var tabs = card.querySelectorAll('.si-tab');
    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        tabs.forEach(function (x) { x.classList.remove('active'); });
        t.classList.add('active');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
