(function () {
  'use strict';

  // ── CONFIG ─────────────────────────────────────────────────────────────────
  var WA_NUMBER = '31613038950';
  var WA_MSG    = 'Hoi StandIn! Ik heb een vraag via jullie website.';
  var WA_LINK   = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(WA_MSG);
  // ──────────────────────────────────────────────────────────────────────────

  // ── Fonts ──────────────────────────────────────────────────────────────────
  if (!document.querySelector('#si-fonts')) {
    var fl = document.createElement('link');
    fl.id = 'si-fonts'; fl.rel = 'stylesheet';
    fl.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600&display=swap';
    document.head.appendChild(fl);
  }

  // ── CSS ────────────────────────────────────────────────────────────────────
  var css = `
    :root {
      --si-b: #6B1A2A; --si-bm: #8C2239;
      --si-blush: #F5E0DC; --si-cream: #FAF6F1;
      --si-gold: #C9906A; --si-char: #1E1616; --si-mut: #796060;
    }

    /* Floating button */
    #si-btn {
      position: fixed; bottom: 24px; right: 24px; z-index: 9999;
      width: 56px; height: 56px; border-radius: 50%;
      background: var(--si-b); border: none; cursor: pointer;
      box-shadow: 0 4px 20px rgba(107,26,42,.38);
      display: flex; align-items: center; justify-content: center;
      transition: transform .2s, box-shadow .2s; outline: none;
    }
    #si-btn:hover { transform: scale(1.08); box-shadow: 0 6px 28px rgba(107,26,42,.48); }
    #si-btn .ico { position: absolute; transition: opacity .2s, transform .2s; }
    #si-btn .ico-chat  { opacity: 1; transform: scale(1) rotate(0); }
    #si-btn .ico-close { opacity: 0; transform: scale(.5) rotate(-90deg); }
    #si-btn.open .ico-chat  { opacity: 0; transform: scale(.5) rotate(90deg); }
    #si-btn.open .ico-close { opacity: 1; transform: scale(1) rotate(0); }

    /* Card */
    #si-card {
      position: fixed; bottom: 90px; right: 24px; z-index: 9998;
      width: 370px; max-width: calc(100vw - 32px);
      background: #fff; border-radius: 16px;
      box-shadow: 0 16px 60px rgba(30,22,22,.16), 0 2px 10px rgba(30,22,22,.07);
      overflow: hidden;
      font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      color: var(--si-char);
      opacity: 0; transform: translateY(16px) scale(.97);
      pointer-events: none;
      transition: opacity .25s cubic-bezier(.4,0,.2,1), transform .25s cubic-bezier(.4,0,.2,1);
    }
    #si-card.open { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }

    /* Header */
    .si-hd {
      background: var(--si-b); padding: 18px 16px 20px;
      position: relative; overflow: hidden;
    }
    .si-hd::after {
      content: ''; position: absolute; right: -50px; top: -50px;
      width: 160px; height: 160px; border-radius: 50%;
      background: rgba(201,144,106,.14); pointer-events: none;
    }
    .si-hd-top {
      display: flex; align-items: center; justify-content: space-between;
      margin-bottom: 14px; position: relative; z-index: 1;
    }
    .si-hd-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1rem; font-weight: 700; color: #fff; letter-spacing: -.01em;
    }
    .si-hd-name span { color: var(--si-gold); }
    .si-hd-close {
      background: rgba(255,255,255,.15); border: none; border-radius: 50%;
      width: 28px; height: 28px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background .15s; flex-shrink: 0;
    }
    .si-hd-close:hover { background: rgba(255,255,255,.28); }
    .si-avatar-wrap { position: relative; z-index: 1; margin-bottom: 12px; }
    .si-av-circle {
      width: 44px; height: 44px; border-radius: 50%;
      background: linear-gradient(135deg, #C9906A, #8C2239);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Playfair Display', serif; font-size: 18px;
      font-weight: 700; color: #fff;
    }
    .si-av-online {
      position: absolute; bottom: 1px; right: 1px;
      width: 11px; height: 11px; background: #4ade80;
      border-radius: 50%; border: 2px solid var(--si-b);
    }
    .si-greeting { position: relative; z-index: 1; }
    .si-greeting h2 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.45rem; font-weight: 700; color: #fff;
      line-height: 1.2; margin: 0 0 2px;
    }
    .si-greeting p { font-size: .85rem; color: rgba(255,255,255,.75); margin: 0; }

    /* Tabs */
    .si-tabs {
      display: flex; background: #fff;
      border-bottom: 1px solid rgba(107,26,42,.09);
    }
    .si-tab {
      flex: 1; display: flex; flex-direction: column; align-items: center;
      gap: 3px; padding: 9px 4px 7px;
      font-size: .67rem; font-weight: 600; color: var(--si-mut);
      cursor: pointer; border: none; background: none;
      transition: color .18s; letter-spacing: .01em;
      border-bottom: 2px solid transparent; margin-bottom: -1px;
    }
    .si-tab.active { color: var(--si-b); border-bottom-color: var(--si-b); }
    .si-tab:hover:not(.active) { color: var(--si-bm); }

    /* Panel */
    .si-panel { display: none; }
    .si-panel.active { display: block; }

    /* ── HOME panel ── */
    .si-home { padding: 14px 14px 18px; display: flex; flex-direction: column; gap: 10px; }

    /* CTA rows */
    .si-row {
      display: flex; align-items: center; gap: 12px;
      padding: 13px 14px; border-radius: 12px;
      text-decoration: none; color: inherit;
      border: 1px solid rgba(107,26,42,.1);
      transition: background .15s, transform .15s;
      cursor: pointer;
    }
    .si-row:hover { transform: translateY(-1px); }
    .si-row-msg { background: var(--si-cream); }
    .si-row-msg:hover { background: var(--si-blush); }
    .si-row-wa { background: #f0fdf4; border-color: #86efac; }
    .si-row-wa:hover { background: #dcfce7; }
    .si-row-icon {
      width: 36px; height: 36px; border-radius: 9px;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .si-row-icon-msg { background: var(--si-b); }
    .si-row-icon-wa  { background: #25D366; }
    .si-row-text { flex: 1; }
    .si-row-text strong { display: block; font-size: .88rem; font-weight: 600; margin-bottom: 1px; }
    .si-row-msg .si-row-text strong { color: var(--si-char); }
    .si-row-wa  .si-row-text strong { color: #166534; }
    .si-row-text span { font-size: .74rem; }
    .si-row-msg .si-row-text span { color: var(--si-mut); }
    .si-row-wa  .si-row-text span  { color: #16a34a; }
    .si-row-arr { flex-shrink: 0; }
    .si-row-msg .si-row-arr { color: var(--si-mut); }
    .si-row-wa  .si-row-arr { color: #86efac; }

    /* Search */
    .si-search-wrap { position: relative; }
    .si-search-ico {
      position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
      color: var(--si-mut); pointer-events: none;
    }
    .si-search {
      width: 100%; padding: 10px 12px 10px 36px; box-sizing: border-box;
      border: 1px solid rgba(107,26,42,.13); border-radius: 10px;
      background: var(--si-cream); font-family: 'DM Sans', sans-serif;
      font-size: .84rem; color: var(--si-char); outline: none;
      transition: border-color .18s, box-shadow .18s;
    }
    .si-search::placeholder { color: var(--si-mut); }
    .si-search:focus { border-color: var(--si-b); box-shadow: 0 0 0 3px rgba(107,26,42,.09); }

    /* FAQ in home */
    .si-faq-label { font-size: .73rem; font-weight: 600; color: var(--si-mut); letter-spacing: .03em; }
    .si-faq-list { border: 1px solid rgba(107,26,42,.1); border-radius: 12px; overflow: hidden; }
    .si-faq-list a {
      display: flex; align-items: center; gap: 9px; padding: 11px 13px;
      text-decoration: none; color: var(--si-char);
      font-size: .82rem; font-weight: 500;
      border-bottom: 1px solid rgba(107,26,42,.07);
      transition: background .14s;
    }
    .si-faq-list a:last-child { border-bottom: none; }
    .si-faq-list a:hover { background: var(--si-cream); }
    .si-faq-list .fq-ic { color: var(--si-b); flex-shrink: 0; }
    .si-faq-list .fq-ar { margin-left: auto; color: var(--si-mut); flex-shrink: 0; }

    /* ── BERICHTEN panel ── */
    .si-msgs { display: flex; flex-direction: column; }
    .si-msgs-body {
      padding: 14px 14px 10px; display: flex; flex-direction: column; gap: 10px;
    }
    .si-msgs-label { font-size: .8rem; color: var(--si-mut); font-weight: 500; }
    .si-msgs-input {
      width: 100%; padding: 10px 12px; box-sizing: border-box;
      border: 1px solid rgba(107,26,42,.14); border-radius: 10px;
      background: var(--si-cream); font-family: 'DM Sans', sans-serif;
      font-size: .84rem; color: var(--si-char); outline: none;
      transition: border-color .18s, box-shadow .18s;
    }
    .si-msgs-input::placeholder { color: var(--si-mut); }
    .si-msgs-input:focus { border-color: var(--si-b); box-shadow: 0 0 0 3px rgba(107,26,42,.09); }
    .si-msgs-divider { border: none; border-top: 1px solid rgba(107,26,42,.08); margin: 4px 0; }
    .si-chat-bubble-wrap { display: flex; align-items: flex-start; gap: 8px; padding: 0 14px 10px; }
    .si-chat-av {
      width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0;
      background: linear-gradient(135deg, #C9906A, #8C2239);
      display: flex; align-items: center; justify-content: center;
      font-size: 11px; font-weight: 700; color: #fff;
    }
    .si-chat-bubble {
      background: var(--si-cream); border-radius: 0 12px 12px 12px;
      padding: 9px 12px; font-size: .82rem; line-height: 1.5; max-width: 85%;
    }
    .si-msgs-input-wrap {
      display: flex; align-items: center; gap: 8px;
      padding: 10px 14px; border-top: 1px solid rgba(107,26,42,.08);
    }
    .si-msgs-type {
      flex: 1; border: none; background: none; outline: none;
      font-family: 'DM Sans', sans-serif; font-size: .84rem;
      color: var(--si-char);
    }
    .si-msgs-type::placeholder { color: var(--si-mut); }
    .si-msgs-send {
      width: 32px; height: 32px; background: var(--si-b); border: none;
      border-radius: 50%; cursor: pointer; display: flex;
      align-items: center; justify-content: center;
      transition: background .15s; flex-shrink: 0;
    }
    .si-msgs-send:hover { background: var(--si-bm); }

    /* ── HELP panel ── */
    .si-help { padding: 14px 14px 18px; }
    .si-help-title {
      font-size: .9rem; font-weight: 700; color: var(--si-char);
      margin-bottom: 10px;
    }
    .si-help-list { border: 1px solid rgba(107,26,42,.1); border-radius: 12px; overflow: hidden; }
    .si-help-list a {
      display: flex; align-items: center; gap: 9px; padding: 12px 13px;
      text-decoration: none; color: var(--si-char);
      font-size: .83rem; font-weight: 500;
      border-bottom: 1px solid rgba(107,26,42,.07);
      transition: background .14s;
    }
    .si-help-list a:last-child { border-bottom: none; }
    .si-help-list a:hover { background: var(--si-cream); }
    .si-help-list .fq-ic { color: var(--si-b); flex-shrink: 0; }
    .si-help-list .fq-ar { margin-left: auto; color: var(--si-mut); flex-shrink: 0; }
    .si-all-link {
      display: block; text-align: center; margin-top: 10px;
      font-size: .8rem; font-weight: 600; color: var(--si-b);
      text-decoration: none;
    }
    .si-all-link:hover { text-decoration: underline; }

    /* Mobile */
    @media (max-width: 480px) {
      #si-btn { bottom: 18px; right: 16px; }
      #si-card { bottom: 0; right: 0; left: 0; width: 100%; max-width: 100%; border-radius: 16px 16px 0 0; transform: translateY(32px); }
      #si-card.open { transform: translateY(0); }
    }
  `;

  // ── Icons ──────────────────────────────────────────────────────────────────
  var ic = {
    chat:  '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    close: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    closeBtn: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    home:  '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    msg:   '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    help:  '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    send:  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
    sendSm:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
    search:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    arr:   '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
    wa:    '<svg width="19" height="19" viewBox="0 0 32 32" fill="#fff"><path d="M16 3C9 3 3 9 3 16c0 2.3.6 4.5 1.8 6.5L3 29l6.7-1.8C11.6 28.4 13.8 29 16 29c7 0 13-6 13-13S23 3 16 3zm0 23.9c-2 0-4-.5-5.7-1.5l-.4-.2-4 1 1-4-.3-.4C5.5 20 5 18 5 16 5 10.5 10 5 16 5s11 5 11 11-5 10.9-11 10.9zm6-8.1c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1c-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.5-1.8-1.7-2.1s0-.5.2-.6l.5-.6.3-.5.1-.4c0-.1-.1-.3-.2-.5l-1-2.4c-.2-.6-.5-.5-.7-.5s-.4 0-.6 0-.6.1-.9.4c-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2 2.2 3.4 5.4 4.7c.8.3 1.4.5 1.8.6.8.2 1.5.2 2 .1.6-.1 1.8-.7 2.1-1.4s.3-1.3.2-1.4c-.1-.1-.4-.2-.7-.4z"/></svg>',
    users: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    euro:  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10h12M4 14h12M19.5 9.3A8 8 0 1 0 19.5 15"/></svg>',
    book:  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
  };

  // ── Build ──────────────────────────────────────────────────────────────────
  function build() {
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);

    // Floating button
    var btn = document.createElement('button');
    btn.id = 'si-btn';
    btn.setAttribute('aria-label', 'Open chat');
    btn.innerHTML = '<span class="ico ico-chat">' + ic.chat + '</span><span class="ico ico-close">' + ic.closeBtn + '</span>';

    // Card
    var card = document.createElement('div');
    card.id = 'si-card';
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-label', 'StandIn chat');
    card.innerHTML =

      /* ── Header ── */
      '<div class="si-hd">' +
        '<div class="si-hd-top">' +
          '<div class="si-hd-name">Stand<span>In</span></div>' +
          '<button class="si-hd-close" aria-label="Sluiten">' + ic.close + '</button>' +
        '</div>' +
        '<div class="si-avatar-wrap"><div class="si-av-circle">S</div><div class="si-av-online"></div></div>' +
        '<div class="si-greeting"><h2>Hoi \uD83D\uDC4B</h2><p>Hoe kunnen we je helpen?</p></div>' +
      '</div>' +

      /* ── Tabs ── */
      '<div class="si-tabs" role="tablist">' +
        '<button class="si-tab active" data-tab="home" role="tab">' + ic.home + 'Home</button>' +
        '<button class="si-tab" data-tab="msgs" role="tab">' + ic.msg + 'Berichten</button>' +
        '<button class="si-tab" data-tab="help" role="tab">' + ic.help + 'Help</button>' +
      '</div>' +

      /* ── HOME panel ── */
      '<div class="si-panel active" data-panel="home">' +
        '<div class="si-home">' +
          /* WhatsApp row */
          '<a class="si-row si-row-wa" href="' + WA_LINK + '" target="_blank" rel="noopener">' +
            '<div class="si-row-icon si-row-icon-wa">' + ic.wa + '</div>' +
            '<div class="si-row-text"><strong>WhatsApp ons</strong><span>Snel antwoord via WhatsApp</span></div>' +
            '<span class="si-row-arr">' + ic.arr + '</span>' +
          '</a>' +
          /* Contact form row */
          '<a class="si-row si-row-msg" href="/contact.html">' +
            '<div class="si-row-icon si-row-icon-msg">' + ic.send + '</div>' +
            '<div class="si-row-text"><strong>Contactformulier</strong><span>Uitgebreide vraag? Gebruik ons formulier</span></div>' +
            '<span class="si-row-arr">' + ic.arr + '</span>' +
          '</a>' +
          /* Search */
          '<div class="si-search-wrap"><span class="si-search-ico">' + ic.search + '</span><input class="si-search" type="search" placeholder="Vind je antwoord\u2026" aria-label="Zoeken"/></div>' +
          /* FAQ */
          '<div class="si-faq-list">' +
            '<a href="/over-standin.html"><span class="fq-ic">' + ic.users + '</span>Hoe werkt StandIn?<span class="fq-ar">' + ic.arr + '</span></a>' +
            '<a href="/werkgevers.html"><span class="fq-ic">' + ic.euro + '</span>Wat kost plaatsing?<span class="fq-ar">' + ic.arr + '</span></a>' +
            '<a href="/vacatures.html"><span class="fq-ic">' + ic.book + '</span>Welke sectoren bedienen jullie?<span class="fq-ar">' + ic.arr + '</span></a>' +
          '</div>' +
        '</div>' +
      '</div>' +

      /* ── BERICHTEN panel ── */
      '<div class="si-panel" data-panel="msgs">' +
        '<div class="si-msgs">' +
          '<div class="si-msgs-body">' +
            '<div class="si-msgs-label">Laat je gegevens achter zodat we je kunnen bereiken</div>' +
            '<input class="si-msgs-input" type="text" placeholder="Jouw naam" aria-label="Naam"/>' +
            '<input class="si-msgs-input" type="email" placeholder="E-mailadres (verplicht)" aria-label="E-mail"/>' +
          '</div>' +
          '<hr class="si-msgs-divider"/>' +
          '<div class="si-chat-bubble-wrap">' +
            '<div class="si-chat-av">S</div>' +
            '<div class="si-chat-bubble">Hoi! \uD83D\uDC4B Hoe kunnen we je helpen?</div>' +
          '</div>' +
          '<div class="si-msgs-input-wrap">' +
            '<input class="si-msgs-type" type="text" placeholder="Typ een bericht\u2026" aria-label="Bericht"/>' +
            '<button class="si-msgs-send" aria-label="Versturen">' + ic.sendSm + '</button>' +
          '</div>' +
        '</div>' +
      '</div>' +

      /* ── HELP panel ── */
      '<div class="si-panel" data-panel="help">' +
        '<div class="si-help">' +
          '<div class="si-help-title">Veelgestelde vragen</div>' +
          '<div class="si-help-list">' +
            '<a href="/over-standin.html"><span class="fq-ic">' + ic.users + '</span>Hoe werkt StandIn?<span class="fq-ar">' + ic.arr + '</span></a>' +
            '<a href="/werkgevers.html"><span class="fq-ic">' + ic.euro + '</span>Wat kost plaatsing?<span class="fq-ar">' + ic.arr + '</span></a>' +
            '<a href="/kenniscentrum.html"><span class="fq-ic">' + ic.book + '</span>Wat is een uitzendbureau?<span class="fq-ar">' + ic.arr + '</span></a>' +
            '<a href="/vacatures.html"><span class="fq-ic">' + ic.book + '</span>Welke sectoren bedienen jullie?<span class="fq-ar">' + ic.arr + '</span></a>' +
          '</div>' +
          '<a class="si-all-link" href="/kenniscentrum.html">Alle vragen \u2192</a>' +
        '</div>' +
      '</div>';

    document.body.appendChild(card);
    document.body.appendChild(btn);

    // ── Toggle ────────────────────────────────────────────────────────────────
    var open = false;
    function show() { open = true;  card.classList.add('open'); btn.classList.add('open'); }
    function hide() { open = false; card.classList.remove('open'); btn.classList.remove('open'); }

    btn.addEventListener('click', function () { open ? hide() : show(); });
    card.querySelector('.si-hd-close').addEventListener('click', hide);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && open) hide(); });
    document.addEventListener('click', function (e) {
      if (open && !card.contains(e.target) && !btn.contains(e.target)) hide();
    });

    // ── Tabs ──────────────────────────────────────────────────────────────────
    var tabs   = card.querySelectorAll('.si-tab');
    var panels = card.querySelectorAll('.si-panel');
    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        var target = t.getAttribute('data-tab');
        tabs.forEach(function (x) { x.classList.remove('active'); });
        panels.forEach(function (p) { p.classList.remove('active'); });
        t.classList.add('active');
        card.querySelector('[data-panel="' + target + '"]').classList.add('active');
      });
    });

    // ── Berichten: stuur naar WhatsApp bij versturen ───────────────────────
    card.querySelector('.si-msgs-send').addEventListener('click', function () {
      var input = card.querySelector('.si-msgs-type');
      var txt = input.value.trim();
      if (txt) {
        window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(txt), '_blank');
        input.value = '';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
