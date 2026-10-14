import './style.css'
import gsap from 'gsap'
import SplitType from 'split-type'
import D from './data.json'
import { hasWebGL, createGL, sphereScene, vaultScene, equipScene, sphereFillHeight } from './gl.js'

const RM = matchMedia('(prefers-reduced-motion: reduce)').matches
const FINE = matchMedia('(pointer: fine)').matches
const $ = (s, el = document) => el.querySelector(s)
const $$ = (s, el = document) => [...el.querySelectorAll(s)]
const nf = (n, d = 0) => n.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d })
const eur = (n, d = 0) => `${nf(n, d)} €`
const sgn = (n, d = 2) => `${n >= 0 ? '+' : '−'}${eur(Math.abs(n), d)}`
const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
const dt = (iso) => new Date(iso + 'T12:00:00')
const dayFr = (iso, wd = true) => dt(iso).toLocaleDateString('fr-FR', wd ? { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' } : { day: 'numeric', month: 'long' })
const buzz = (ms = 10) => { try { navigator.vibrate && navigator.vibrate(ms) } catch (e) { /* pas de vibreur */ } }
const days = D.days // [date, prod, conso, niveau, import, stocké, déstocké, perdu]
const solarKwh = D.auto + D.destocke
const leverSum = D.levers.reduce((s, l) => s + l.eur, 0)
const state = { levers: new Set(), share: new Set(['gain', 'solar', 'nogrid']), showName: false }

const GL_OK = hasWebGL()
let gl = GL_OK ? createGL() : null
document.documentElement.classList.toggle('no-gl', !gl)

// ---------------------------------------------------------------- écrans
const screens = [
  // 1 — Accroche
  {
    html: () => `
      <p class="eyebrow">1 an avec mylight150 · ${dayFr(D.client.since, false)} 2025 → ${dayFr(days.at(-1)[0], false)} 2026</p>
      <h1 class="title split">Votre soleil a travaillé pour vous.</h1>
      <p class="kpi"><span class="num" data-to="${D.solarShare}">${D.solarShare}</span><span class="unit">%</span></p>
      <p class="kpi-sub">de vos <b>${nf(D.conso)} kWh</b> consommés cette année venaient de vos panneaux.</p>
      <div class="stage warm" data-explore data-cursor="Touchez" role="img" aria-label="Sphère représentant votre consommation annuelle, remplie à ${D.solarShare} % de son volume par l'énergie solaire.">
        <p class="readout" aria-live="polite">Touchez ou secouez la sphère</p>
        <div class="fallback">${sphereSVG()}</div>
      </div>
      <ul class="legend">
        <li><i class="sw sw-solar"></i><span><b>Soleil · ${nf(solarKwh)} kWh</b> ${nf(D.auto)} en direct + ${nf(D.destocke)} via la batterie</span></li>
        <li><i class="sw sw-grid"></i><span><b>Réseau · ${nf(D.import)} kWh</b> achetés</span></li>
      </ul>
      <details class="alt"><summary>Version texte</summary><p>Cette année, votre maison a consommé ${nf(D.conso)} kWh. ${nf(solarKwh)} kWh, soit ${D.solarShare} %, venaient de vos panneaux solaires : ${nf(D.auto)} kWh consommés en direct et ${nf(D.destocke)} kWh restitués par votre batterie virtuelle. ${nf(D.import)} kWh ont été achetés au réseau.</p></details>`,
    enter(el) {
      const ro = $('.readout', el)
      const say = (k) => {
        ro.innerHTML = k === 'solar' ? `<b>Soleil · ${D.solarShare} %</b> ${nf(solarKwh)} kWh` : k === 'grid' ? `<b>Réseau · ${100 - D.solarShare} %</b> ${nf(D.import)} kWh achetés` : 'Touchez ou secouez la sphère'
        buzz(8)
      }
      if (gl) gl.mount($('.stage', el), sphereScene({ share: D.solarShare / 100, onTouch: say }))
      else {
        const f = $('.fallback rect', el), h = +f.dataset.h
        gsap.fromTo(f, { attr: { y: 220, height: 0 } }, { attr: { y: 220 - h, height: h }, duration: RM ? 0 : 1.8, ease: 'expo.out' })
        $('.fallback svg', el).onclick = (e) => { const r = e.currentTarget.getBoundingClientRect(); say((e.clientY - r.top) / r.height * 240 > 220 - h ? 'solar' : 'grid') }
      }
      countUp($('.num', el), D.solarShare, 1.8)
    },
  },
  // 2 — Ticket de caisse inversé
  {
    html: () => {
      const costs = D.ticket.filter((t) => t.eur < 0), gains = D.ticket.filter((t) => t.eur > 0)
      const line = (t) => `<li class="tl ${t.eur < 0 ? 'neg' : 'pos'}"><button class="tl-btn" aria-expanded="false"><span class="tl-lab">${t.label}</span><span class="tl-dots"></span><span class="tl-val">${sgn(t.eur)}</span></button><p class="tl-detail" hidden>${t.detail}</p></li>`
      return `
      <p class="eyebrow">Le ticket de caisse inversé</p>
      <h2 class="title split">Voici exactement d'où vient votre argent.</h2>
      <div class="ticket" data-explore>
        <div class="t-head"><p class="brand">mylight<b>150</b></p><p>Bilan annuel · ${D.client.ville}</p><p>${new Date(D.client.since).toLocaleDateString('fr-FR')} → ${new Date(days.at(-1)[0]).toLocaleDateString('fr-FR')}</p></div>
        <p class="t-sec">Ce que vous avez investi</p>
        <ul>${costs.map(line).join('')}</ul>
        <p class="t-sec">Ce que le soleil vous a rendu</p>
        <ul>${gains.map(line).join('')}</ul>
        <div class="t-total"><span>Gain net · tous frais déduits</span><span class="t-sum">${sgn(D.gain, 0)}</span></div>
        <p class="t-foot">Touchez une ligne pour le détail</p>
      </div>
      <details class="alt"><summary>Version texte</summary><p>Gain net : ${eur(D.gain)}. ${D.ticket.map((t) => `${t.label} : ${sgn(t.eur)}`).join('. ')}. Calcul : énergie solaire consommée et restituée, valorisée au prix du kWh heures pleines / heures creuses, moins l'abonnement de stockage et la contribution autoproducteur.</p></details>`
    },
    enter(el) {
      $$('.tl-btn', el).forEach((b) => (b.onclick = () => {
        const open = b.getAttribute('aria-expanded') !== 'true'
        b.setAttribute('aria-expanded', open); b.nextElementSibling.hidden = !open
        if (open) gsap.from(b.nextElementSibling, { height: 0, opacity: 0, duration: 0.35, ease: 'power3.out' })
      }))
      printTicket(el)
    },
  },
  // 3 — Équipements
  {
    html: () => `
      <p class="eyebrow">Gratuit à X %, par équipement</p>
      <h2 class="title split">Ce que vous faites tourner au soleil est presque offert.</h2>
      <p class="readout static" aria-live="polite">Touchez un équipement</p>
      <div class="stage warm vessels" data-explore data-cursor="Touchez">
        ${D.equip.map((q, i) => `
          <button class="vessel v${i}" aria-label="${q.name} : ${q.pct} % couvert par le soleil">
            <span class="v-pct"><b>${q.pct}</b>%</span>
            <span class="v-glass"><span class="v-fill" style="--p:${q.pct}"><i></i></span><span class="v-ticks"></span></span>
            <span class="v-name">${q.name}</span>
            <span class="v-kwh">${nf(q.kwh)} kWh/an</span>
          </button>`).join('')}
      </div>
      <ul class="legend"><li><i class="sw sw-solar"></i><span>Part couverte par le soleil, direct ou batterie</span></li></ul>
      <details class="alt"><summary>Version texte</summary><p>${D.equip.map((q) => `${q.name} : ${q.pct} % couvert par le soleil (${nf(q.free_kwh)} kWh sur ${nf(q.kwh)}).`).join(' ')}</p></details>`,
    enter(el) {
      const ro = $('.readout', el), stage = $('.vessels', el)
      let sc = null
      if (gl) {
        // les objets 3D se posent pile dans l'emplacement de chaque bocal HTML
        sc = equipScene({
          equip: D.equip,
          anchors: () => {
            const s = stage.getBoundingClientRect()
            return $$('.vessel', el).map((v) => {
              const b = v.getBoundingClientRect(), g = $('.v-glass', v).getBoundingClientRect()
              return { x: g.left + g.width / 2 - s.left, y: g.top + g.height / 2 - s.top, w: b.width, h: g.height }
            })
          },
        })
        gl.mount(stage, sc)
      }
      $$('.vessel', el).forEach((v, i) => {
        const q = D.equip[i]
        v.onclick = (e) => {
          const k = sc ? sc.pick(i, e.detail ? e.clientX : null, e.clientY, stage) : 'solar'
          ro.innerHTML = k === 'grid'
            ? `<b>${q.name} · réseau ${100 - q.pct} %</b> ${nf(q.kwh - q.free_kwh)} kWh achetés`
            : `<b>${q.name} · soleil ${q.pct} %</b> ${nf(q.free_kwh)} kWh sur ${nf(q.kwh)}`
          $$('.vessel', el).forEach((o) => o.classList.toggle('on', o === v))
          gsap.fromTo($('.v-fill i', v), { rotate: -6 }, { rotate: 0, duration: 1.2, ease: 'elastic.out(1, 0.3)' })
          buzz(8)
        }
      })
      gsap.fromTo($$('.v-fill', el), { scaleY: 0 }, { scaleY: 1, duration: RM ? 0 : 1.6, ease: 'expo.out', stagger: 0.18, delay: 0.25 })
      $$('.v-pct b', el).forEach((b, i) => countUp(b, D.equip[i].pct, 1.6, 0.25 + i * 0.18))
    },
  },
  // 4 — Saison sans facture
  {
    html: () => `
      <p class="eyebrow">La saison sans facture</p>
      <h2 class="title split">Une saison entière d'indépendance.</h2>
      <p class="kpi"><span class="num" data-to="${D.noGrid.streak}">${D.noGrid.streak}</span><span class="unit">jours</span></p>
      <p class="kpi-sub">d'affilée sans acheter un seul kWh au réseau, du ${dayFr(D.noGrid.from, false)} au ${dayFr(D.noGrid.to, false)}.</p>
      <div class="cal-nav"><button class="cal-step" data-step="-1" aria-label="Jour précédent">‹</button><p class="readout static" aria-live="polite">${FINE ? 'Glissez sur le calendrier' : 'Touchez un jour, glissez pour parcourir'}</p><button class="cal-step" data-step="1" aria-label="Jour suivant">›</button></div>
      <div class="stage cal" data-explore data-cursor="Glissez"><canvas tabindex="0" aria-label="Calendrier de l'année : les jours sans achat au réseau sont dorés. Flèches pour parcourir les jours."></canvas></div>
      <ul class="legend"><li><i class="sw sw-solar dot"></i><span>Jour sans achat au réseau</span></li><li><i class="sw sw-grid dot"></i><span>Jour avec achat</span></li></ul>
      <details class="alt"><summary>Version texte</summary><p>${D.noGrid.days} jours de l'année sans aucun achat au réseau, dont ${D.noGrid.streak} jours consécutifs du ${dayFr(D.noGrid.from, false)} au ${dayFr(D.noGrid.to, false)} 2026.</p></details>`,
    enter(el) { countUp($('.num', el), D.noGrid.streak, 1.6); calendar(el) },
  },
  // 5 — Coffre-fort
  {
    html: () => `
      <p class="eyebrow">La batterie comme coffre-fort</p>
      <h2 class="title split">Votre batterie virtuelle existe, et elle travaille.</h2>
      <p class="kpi"><span class="num" data-to="${D.destocke}">${nf(D.destocke)}</span><span class="unit">kWh</span></p>
      <p class="kpi-sub">mis au coffre puis rendus, soit <b>${nf(D.battery.cycles)} fois</b> sa capacité. Pleine <b>${D.battery.fullDays} jours</b>.</p>
      <div class="readout day" aria-live="polite"><span class="d-date"></span><span class="d-lvl"></span></div>
      <div class="stage cold vault" data-explore data-cursor="Tournez" role="img" aria-label="Coffre-fort circulaire : une barre par jour, rangée intérieure les kWh mis en batterie, rangée extérieure les kWh consommés depuis la batterie.">
        <canvas class="fallback bars2d"></canvas>
      </div>
      <div class="timeline" data-explore>
        <button class="play btn-icon" aria-label="Rejouer l'année"><svg viewBox="0 0 24 24" width="18" height="18"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></button>
        <input type="range" min="0" max="${days.length - 1}" value="0" aria-label="Choisir un jour" />
      </div>
      <ul class="legend"><li><i class="sw sw-batt"></i><span>Remplissage de la batterie</span></li><li><i class="sw sw-full"></i><span>Remplissage, batterie pleine ce jour-là</span></li><li><i class="sw sw-used"></i><span>Consommé depuis la batterie</span></li></ul>
      <details class="alt"><summary>Version texte</summary><p>Votre batterie virtuelle de ${D.client.cap} kWh a stocké puis restitué ${nf(D.destocke)} kWh cette année, soit ${nf(D.battery.cycles)} cycles complets. Elle a été pleine ${D.battery.fullDays} jours, surtout de mai à septembre. Pour chaque jour, le curseur indique les kWh mis en batterie, les kWh consommés depuis la batterie et le niveau en fin de journée.</p></details>`,
    enter(el) { countUp($('.num', el), D.destocke, 1.8); vault(el) },
  },
  // 6 — Impact
  {
    html: () => `
      <p class="eyebrow">L'impact</p>
      <h2 class="title split">Un effet concret au-delà de votre facture.</h2>
      <p class="kpi"><span class="num" data-to="${D.co2.kg}">${D.co2.kg}</span><span class="unit">kg CO₂</span></p>
      <p class="kpi-sub">évités grâce à vos ${nf(D.prod)} kWh solaires.</p>
      <div class="eq road" data-explore>
        <p><b class="km">${nf(D.co2.km)}</b> km en voiture</p>
        <div class="road-line"><span class="car" aria-hidden="true">${carSVG()}</span></div>
        <p class="small">Glissez la voiture</p>
      </div>
      <div class="eq trees" data-explore>
        <p><b>${D.co2.trees}</b> arbres pendant un an</p>
        <div class="forest">${Array.from({ length: D.co2.trees }, () => `<button class="tree" aria-label="Un arbre absorbe environ 25 kg de CO₂ par an">${treeSVG()}</button>`).join('')}</div>
      </div>
      <p class="method">Calcul : ${nf(D.prod)} kWh × 0,052 kg CO₂/kWh réseau. Voiture : 0,193 kg/km. Arbre : 25 kg/an.</p>
      <details class="alt"><summary>Version texte</summary><p>Votre production solaire a évité ${D.co2.kg} kg de CO₂, l'équivalent de ${nf(D.co2.km)} km en voiture ou de ce qu'absorbent ${D.co2.trees} arbres en un an.</p></details>`,
    enter(el) {
      countUp($('.num', el), D.co2.kg, 1.6)
      gsap.fromTo($$('.tree', el), { scale: 0, transformOrigin: '50% 100%' }, { scale: 1, duration: RM ? 0 : 0.8, ease: 'back.out(2)', stagger: 0.06, delay: 0.3 })
      $$('.tree', el).forEach((t) => (t.onclick = () => { gsap.fromTo(t, { rotate: -10 }, { rotate: 0, duration: 1, ease: 'elastic.out(1,0.3)', transformOrigin: '50% 100%' }); buzz(6) }))
      road(el)
    },
  },
  // 7 — Le défi
  {
    html: () => `
      <p class="eyebrow">Le défi de l'année 2</p>
      <h2 class="title split">Voici comment faire encore mieux, et c'est simple.</h2>
      <p class="kpi"><span class="num chal">+0</span><span class="unit">€ / an</span></p>
      <p class="kpi-sub">activés sur <b>${eur(leverSum)}</b> possibles. Un tap suffit.</p>
      <div class="gauge" aria-hidden="true"><div class="g-track">${D.levers.map((l) => `<span class="g-seg" data-id="${l.id}" style="flex:${l.eur}"></span>`).join('')}</div></div>
      <ol class="levers">
        ${D.levers.map((l, i) => `
          <li class="lever" data-id="${l.id}">
            <div class="lv-top"><span class="lv-rank">${i + 1}</span><h3>${l.title}</h3><span class="lv-eur">+${eur(l.eur)}</span></div>
            <p class="lv-desc">${l.desc}</p>
            <p class="lv-basis">${l.basis}</p>
            <button class="lv-btn magnetic" aria-pressed="false"><span class="lv-on">Activé</span><span class="lv-off">Activer</span></button>
          </li>`).join('')}
      </ol>
      <details class="alt"><summary>Version texte</summary><p>${D.levers.map((l, i) => `${i + 1}. ${l.title} : jusqu'à ${eur(l.eur)} par an. ${l.desc}`).join(' ')} Estimations calculées sur votre année, à ensoleillement et consommation identiques.</p></details>`,
    enter(el) {
      $$('.lever', el).forEach((li) => {
        const b = $('.lv-btn', li)
        b.onclick = () => toggleLever(li.dataset.id, b)
      })
      syncLevers()
      gsap.from($$('.lever', el), { y: 30, opacity: 0, duration: RM ? 0 : 0.8, ease: 'power3.out', stagger: 0.1, delay: 0.2 })
    },
  },
  // 8 — Projection
  {
    html: () => `
      <p class="eyebrow">La projection année 2</p>
      <h2 class="title split">Voici où vous pouvez aller.</h2>
      <p class="kpi"><span class="num proj">${sgn(D.gain, 0)}</span></p>
      <p class="kpi-sub proj-sub"></p>
      <div class="cols" data-explore>
        <div class="col y1"><span class="c-val">${eur(D.gain)}</span><div class="c-bar"><span class="c-seg base" style="flex:${D.gain}"></span></div><span class="c-lab">Année 1</span></div>
        <div class="col y2"><span class="c-val c2"></span><div class="c-bar">
          ${D.levers.map((l) => `<span class="c-seg lev" data-id="${l.id}" style="flex:${l.eur}"><em>${l.title}</em></span>`).join('')}
          <span class="c-seg price" style="flex:${D.proj.sameFlowsY2 - D.gain}"><em>Prix du kWh</em></span>
          <span class="c-seg base" style="flex:${D.gain}"></span>
        </div><span class="c-lab">Année 2</span></div>
      </div>
      <div class="chips">${D.levers.map((l) => `<button class="chip" data-id="${l.id}" aria-pressed="false">${l.title}</button>`).join('')}</div>
      <p class="method">Estimation à ensoleillement et consommation identiques. Le kWh réseau passe de ${nf(D.prices.hp, 4)} à ${nf(D.prices.hp2, 3)} € en heures pleines : chaque kWh solaire vous épargne davantage (+${eur(D.proj.sameFlowsY2 - D.gain)}).</p>
      <details class="alt"><summary>Version texte</summary><p class="alt-proj"></p></details>`,
    enter(el) {
      $$('.chip', el).forEach((c) => (c.onclick = () => toggleLever(c.dataset.id)))
      syncLevers(true)
    },
  },
  // 9 — Partage
  {
    html: () => `
      <p class="eyebrow">Le partage</p>
      <h2 class="title split">Fier de le montrer, facile à partager.</h2>
      <div class="share-card" id="card"></div>
      <fieldset class="opts"><legend>Choisissez 3 chiffres à montrer</legend>
        ${shareOpts().map((o) => `<label class="opt"><input type="checkbox" value="${o.id}" ${state.share.has(o.id) ? 'checked' : ''}/><span>${o.label}</span></label>`).join('')}
      </fieldset>
      <label class="opt toggle"><input type="checkbox" id="showName"/><span>Afficher mon prénom</span></label>
      <div class="share-actions">
        <button class="btn-next magnetic" id="doShare"><span>Partager ma carte</span></button>
        <button class="btn-ghost magnetic" id="doRef"><span>Copier mon lien de parrainage</span></button>
      </div>
      <p class="toast" role="status" aria-live="polite"></p>`,
    enter(el) {
      $$('.opts input', el).forEach((i) => (i.onchange = () => {
        i.checked ? state.share.add(i.value) : state.share.delete(i.value)
        renderCard(el)
      }))
      $('#showName', el).onchange = (e) => { state.showName = e.target.checked; renderCard(el) }
      $('#doShare', el).onclick = () => shareCard(el)
      $('#doRef', el).onclick = async () => {
        const url = `https://www.mylight150.com/parrainage`
        try { await navigator.clipboard.writeText(url); toast(el, 'Lien de parrainage copié') } catch (e) { toast(el, url) }
      }
      renderCard(el)
    },
  },
]

// ---------------------------------------------------------------- helpers visuels
function countUp(node, to, dur = 1.6, delay = 0, fmt = (v) => nf(Math.round(v))) {
  const o = { v: 0 }
  if (RM) { node.textContent = fmt(to); return }
  gsap.to(o, { v: to, duration: dur, delay, ease: 'expo.out', onUpdate: () => (node.textContent = fmt(o.v)) })
}

function sphereSVG() {
  const h = (sphereFillHeight(D.solarShare / 100) / 2) * 200 // hauteur sur 200 px de diamètre : volume fidèle
  return `<svg viewBox="0 0 240 240" width="100%" height="100%"><defs><clipPath id="sph"><circle cx="120" cy="120" r="100"/></clipPath>
    <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F6D766"/><stop offset="1" stop-color="#E8B60E"/></linearGradient></defs>
    <circle cx="120" cy="120" r="100" fill="#F0FBFE" stroke="#45767E" stroke-width="2"/>
    <rect clip-path="url(#sph)" x="0" y="220" width="240" height="0" data-h="${h}" fill="url(#gold)"/>
    <line x1="20" x2="220" y1="${220 - h}" y2="${220 - h}" stroke="#032126" stroke-dasharray="4 4" opacity=".5"/></svg>`
}
const carSVG = () => `<svg viewBox="0 0 48 24" width="44" height="22"><path d="M4 16h40v-4l-6-1-5-6H15l-6 6-5 1z" fill="#45767E"/><circle cx="13" cy="18" r="4" fill="#032126"/><circle cx="35" cy="18" r="4" fill="#032126"/><path d="M17 7h7v4h-10zM27 7h5l3 4h-8z" fill="#D8F3F7"/></svg>`
const treeSVG = () => `<svg viewBox="0 0 32 40" width="100%" height="100%"><rect x="14" y="26" width="4" height="12" rx="1" fill="#76472F"/><circle cx="16" cy="18" r="12" fill="#5ABB99"/><circle cx="11" cy="14" r="5" fill="#8fd4bb" opacity=".7"/></svg>`

function printTicket(el) {
  const lines = $$('.tl', el), sumEls = [$('.t-sum', el)]
  const o = { v: 0 }, set = () => sumEls.forEach((s) => (s.textContent = sgn(Math.round(o.v), 0)))
  gsap.killTweensOf(o); set()
  const tl = gsap.timeline()
  tl.set(lines, { opacity: 0, y: -10 })
  if (RM) { o.v = D.gain; set(); gsap.set(lines, { opacity: 1, y: 0 }); return }
  const order = [...D.ticket.filter((t) => t.eur < 0), ...D.ticket.filter((t) => t.eur > 0)]
  let acc = 0
  lines.forEach((li, i) => {
    acc += order[i].eur
    tl.to(li, { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out', onStart: () => buzz(6) }, i === 0 ? 0.2 : '>-0.05')
      .to(o, { v: acc, duration: i < 2 ? 0.35 : 0.8, ease: 'power2.out', onUpdate: set }, '<')
  })
  tl.fromTo($('.t-sum', el), { scale: 0.85 }, { scale: 1, duration: 0.5, ease: 'back.out(2.5)', onStart: () => buzz(20) }, '+=0.05')
}

function calendar(el) {
  const cv = $('canvas', el), ro = $('.readout', el), ctx = cv.getContext('2d')
  const first = dt(days[0][0]), rows = []
  days.forEach((d, i) => {
    const m = (dt(d[0]).getFullYear() - first.getFullYear()) * 12 + dt(d[0]).getMonth() - first.getMonth()
    ;(rows[m] ||= []).push(i)
  })
  let W, H, cw, rh, left = 44, sel = -1, born = 0
  const pos = (i) => { const d = dt(days[i][0]); const m = (d.getFullYear() - first.getFullYear()) * 12 + d.getMonth() - first.getMonth(); return [left + (d.getDate() - 0.5) * cw, 8 + (m + 0.5) * rh] }
  const free = (i) => days[i][4] === 0
  function size() {
    const r = cv.parentElement.getBoundingClientRect(), dpr = Math.min(devicePixelRatio, 2)
    W = r.width; H = Math.min(r.height, rows.length * 26 + 16)
    cv.width = W * dpr; cv.height = H * dpr; cv.style.height = H + 'px'; ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    cw = (W - left - 6) / 31; rh = (H - 16) / rows.length
  }
  function draw() {
    ctx.clearRect(0, 0, W, H)
    ctx.font = '600 12px Inter, sans-serif'; ctx.fillStyle = '#495858'; ctx.textBaseline = 'middle'
    rows.forEach((r, m) => { const d = dt(days[r[0]][0]); ctx.fillText(MONTHS[d.getMonth()].slice(0, 4) + (d.getMonth() === 0 || m === 0 ? ` ${String(d.getFullYear()).slice(2)}` : ''), 0, 8 + (m + 0.5) * rh) })
    const n = Math.floor(born * days.length)
    // fils de la constellation : jours sans réseau qui s'enchaînent
    ctx.strokeStyle = 'rgba(232,182,14,.55)'; ctx.lineWidth = 2
    for (let i = 1; i < n; i++) if (free(i) && free(i - 1) && dt(days[i][0]).getDate() !== 1) { const [a, b] = pos(i - 1), [c, e] = pos(i); ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c, e); ctx.stroke() }
    for (let i = 0; i < n; i++) {
      const [x, y] = pos(i)
      ctx.beginPath()
      if (free(i)) { ctx.fillStyle = '#E8B60E'; ctx.arc(x, y, Math.min(cw, rh) * 0.34, 0, 7); ctx.fill() }
      else { ctx.fillStyle = '#9EA4A4'; ctx.arc(x, y, Math.min(cw, rh) * 0.15, 0, 7); ctx.fill() }
    }
    if (sel >= 0) {
      const [x, y] = pos(sel), r = Math.max(Math.min(cw, rh) * 0.55, 8)
      ctx.strokeStyle = '#032126'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.stroke()
      // étiquette au-dessus du doigt : le jour reste lisible même sous le pouce
      const t = String(dt(days[sel][0]).getDate()), bw = 30, bh = 24, bx = Math.max(left, Math.min(W - bw, x - bw / 2)), by = y - r - bh - 8 < 0 ? y + r + 8 : y - r - bh - 8
      ctx.fillStyle = '#032126'; ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 8); ctx.fill()
      ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.font = '700 13px Inter, sans-serif'; ctx.fillText(t, bx + bw / 2, by + bh / 2 + 1); ctx.textAlign = 'left'
    }
  }
  function pick(i) {
    sel = Math.max(0, Math.min(days.length - 1, i)); const d = days[sel]
    ro.innerHTML = `<b>${dayFr(d[0])}</b> ${d[4] === 0 ? `0 kWh acheté · ${nf(d[1], 1)} kWh produits` : `${nf(d[4], 1)} kWh achetés au réseau`}`
    draw()
  }
  function at(e) {
    const r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top
    let best = -1, bd = 1e9
    for (let i = 0; i < days.length; i++) { const [a, b] = pos(i); const dd = (a - x) ** 2 + (b - y) ** 2; if (dd < bd) { bd = dd; best = i } }
    if (best !== sel) { buzz(3); pick(best) }
  }
  let down = false
  cv.onpointerdown = (e) => { down = true; cv.setPointerCapture(e.pointerId); at(e) }
  cv.onpointermove = (e) => { if (down || e.pointerType === 'mouse') at(e) }
  cv.onpointerup = cv.onpointercancel = () => (down = false)
  cv.onkeydown = (e) => { const k = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 30, ArrowUp: -30 }[e.key]; if (k) { e.preventDefault(); pick((sel < 0 ? 0 : sel) + k) } }
  $$('.cal-step', el).forEach((b) => (b.onclick = () => { buzz(3); pick((sel < 0 ? start : sel) + +b.dataset.step) }))
  const start = Math.max(0, days.findIndex((d) => d[0] === D.noGrid.from))
  size(); new ResizeObserver(() => { size(); draw() }).observe(cv.parentElement)
  const o = { b: 0 }
  gsap.to(o, { b: 1, duration: RM ? 0 : 2.2, ease: 'power2.inOut', onUpdate: () => { born = o.b; draw() }, onComplete: () => sel < 0 && pick(start) })
}

function vault(el) {
  const range = $('input[type=range]', el), dEl = $('.d-date', el), lEl = $('.d-lvl', el)
  const cap = D.client.cap
  let cur = 0, sc = null, cv2 = null
  const show = (i) => {
    cur = i; range.value = i
    const d = days[i]
    dEl.textContent = dayFr(d[0])
    lEl.innerHTML = `<span class="${d[7] > 0 ? 'full' : 'in'}">+${nf(d[5], 1)}</span> · <span class="out">−${nf(d[6], 1)}</span> kWh · <b>${nf(d[3], 0)}</b>/${cap} au coffre${d[7] > 0 ? ' · <span class="full">pleine</span>' : ''}`
    if (cv2) bars2d()
  }
  const startDay = days.findIndex((d) => d[7] > 0)
  if (gl) {
    sc = vaultScene({ days, cap, onSelect: (i) => { if (i !== cur) buzz(2); show(i) } })
    gl.mount($('.stage', el), sc)
    sc.setDay(0, true)
    if (!RM) setTimeout(() => sc && sc.setDay(startDay), 1400)
  } else {
    cv2 = $('canvas.bars2d', el)
    cv2.onpointerdown = cv2.onpointermove = (e) => { if (e.type === 'pointermove' && !e.buttons && e.pointerType !== 'mouse') return; const r = cv2.getBoundingClientRect(); show(Math.max(0, Math.min(days.length - 1, Math.floor(((e.clientX - r.left) / r.width) * days.length)))) }
    new ResizeObserver(bars2d).observe(cv2.parentElement)
    show(startDay)
  }
  function bars2d() {
    const r = cv2.parentElement.getBoundingClientRect(), dpr = Math.min(devicePixelRatio, 2), x = cv2.getContext('2d')
    cv2.width = r.width * dpr; cv2.height = r.height * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0)
    const w = r.width / days.length, top = 16, hh = r.height - top - 8
    const max = Math.max(...days.map((d) => Math.max(d[5], d[6]))), mid = top + hh / 2
    days.forEach((d, i) => { // miroir : remplissage vers le haut, consommé vers le bas
      const a = (d[5] / max) * (hh / 2), b = (d[6] / max) * (hh / 2), bw = Math.max(1, w - 0.3)
      x.fillStyle = i === cur ? '#032126' : d[7] > 0 ? '#5ABB99' : '#5DB8D5'; x.fillRect(i * w, mid - a, bw, Math.max(1, a))
      x.fillStyle = i === cur ? '#032126' : '#F08A3C'; x.fillRect(i * w, mid, bw, Math.max(1, b))
    })
  }
  range.oninput = () => { const i = +range.value; sc ? sc.setDay(i) : show(i) }
  let playing = null
  $('.play', el).onclick = () => {
    if (playing) { playing.kill(); playing = null; return }
    const o = { i: 0 }
    playing = gsap.to(o, { i: days.length - 1, duration: RM ? 0 : 8, ease: 'none', onUpdate: () => { const i = Math.round(o.i); sc ? sc.setDay(i, true) : show(i) }, onComplete: () => (playing = null) })
  }
  return () => playing && playing.kill()
}

function road(el) {
  const line = $('.road-line', el), car = $('.car', el), km = $('.km', el)
  const set = (p) => { p = Math.max(0, Math.min(1, p)); gsap.set(car, { left: `calc(${p * 100}% - ${p * 44}px)` }); km.textContent = nf(Math.round(D.co2.km * p)) }
  const o = { p: 0 }
  gsap.to(o, { p: 1, duration: RM ? 0 : 2, ease: 'power3.inOut', delay: 0.3, onUpdate: () => set(o.p) })
  let down = false
  line.onpointerdown = (e) => { down = true; line.setPointerCapture(e.pointerId); gsap.killTweensOf(o); move(e) }
  line.onpointermove = (e) => down && move(e)
  line.onpointerup = line.onpointercancel = () => (down = false)
  function move(e) { const r = line.getBoundingClientRect(); set((e.clientX - r.left) / r.width) }
}

function toggleLever(id, btn) {
  const on = !state.levers.has(id)
  on ? state.levers.add(id) : state.levers.delete(id)
  buzz(on ? [12, 40, 18] : 6)
  if (on && btn) burst(btn)
  syncLevers()
}
function burst(node) {
  if (RM) return
  const r = node.getBoundingClientRect(), app = $('#app').getBoundingClientRect()
  for (let i = 0; i < 14; i++) {
    const p = document.createElement('i'); p.className = 'spark'
    p.style.left = r.left - app.left + r.width / 2 + 'px'; p.style.top = r.top - app.top + r.height / 2 + 'px'
    $('#app').appendChild(p)
    const a = Math.random() * Math.PI * 2, d = 40 + Math.random() * 60
    gsap.to(p, { x: Math.cos(a) * d, y: Math.sin(a) * d - 20, opacity: 0, scale: 0.3, duration: 0.8, ease: 'power3.out', onComplete: () => p.remove() })
  }
}
let chalVal = 0
function syncLevers(instant) {
  const sum = D.levers.filter((l) => state.levers.has(l.id)).reduce((s, l) => s + l.eur, 0)
  $$('.lever').forEach((li) => { const on = state.levers.has(li.dataset.id); li.classList.toggle('on', on); $('.lv-btn', li).setAttribute('aria-pressed', on) })
  $$('.g-seg').forEach((s) => s.classList.toggle('on', state.levers.has(s.dataset.id)))
  $$('.chip').forEach((c) => c.setAttribute('aria-pressed', state.levers.has(c.dataset.id)))
  const n = $('.num.chal'); if (n) { const o = { v: chalVal }; gsap.to(o, { v: sum, duration: 0.8, ease: 'power3.out', onUpdate: () => (n.textContent = `+${nf(Math.round(o.v))}`) }); chalVal = sum }
  // projection
  const y2 = D.proj.sameFlowsY2 + sum
  const p = $('.num.proj'); if (p) p.textContent = sgn(y2, 0)
  const ps = $('.proj-sub'); if (ps) ps.innerHTML = `en année 2, soit <b>${sgn(y2 - D.gain, 0)}</b> par rapport à cette année${sum ? '' : '. Activez un levier pour aller plus loin'}.`
  const c2 = $('.c2'); if (c2) c2.textContent = eur(y2)
  const alt = $('.alt-proj'); if (alt) alt.textContent = `Année 1 : ${eur(D.gain)}. Année 2 estimée : ${eur(y2)}, dont ${eur(D.proj.sameFlowsY2 - D.gain)} liés à la hausse du prix du kWh et ${eur(sum)} grâce aux leviers activés.`
  const max = D.proj.sameFlowsY2 + leverSum
  $$('.cols .c-seg.lev').forEach((s) => {
    const on = state.levers.has(s.dataset.id), l = D.levers.find((x) => x.id === s.dataset.id)
    gsap.to(s, { flexGrow: on ? l.eur : 0.0001, opacity: on ? 1 : 0, duration: instant || RM ? 0 : 0.6, ease: 'power3.out' })
  })
  // hauteurs proportionnelles aux euros (fidélité)
  const y1 = $('.col.y1 .c-bar'), yb = $('.col.y2 .c-bar')
  if (y1) { y1.style.height = `${(D.gain / max) * 100}%`; gsap.to(yb, { height: `${(y2 / max) * 100}%`, duration: instant || RM ? 0 : 0.6, ease: 'power3.out' }) }
}

function shareOpts() {
  return [
    { id: 'gain', label: `${eur(D.gain)} gagnés`, big: eur(D.gain), small: 'gagnés grâce au soleil' },
    { id: 'solar', label: `${D.solarShare} % solaire`, big: `${D.solarShare} %`, small: 'de mon électricité venait du soleil' },
    { id: 'nogrid', label: `${D.noGrid.streak} jours sans réseau`, big: `${D.noGrid.streak} j`, small: "d'affilée sans acheter au réseau" },
    { id: 'co2', label: `${D.co2.kg} kg CO₂ évités`, big: `${D.co2.kg} kg`, small: 'de CO₂ évités' },
    { id: 'trees', label: `${D.co2.trees} arbres`, big: `${D.co2.trees}`, small: 'arbres pendant un an, en CO₂' },
    { id: 'batt', label: `${nf(D.destocke)} kWh restitués`, big: `${nf(D.destocke)} kWh`, small: 'gardés au chaud par ma batterie virtuelle' },
  ]
}
function renderCard(el) {
  const opts = shareOpts().filter((o) => state.share.has(o.id))
  $$('.opts input', el).forEach((i) => (i.disabled = !i.checked && state.share.size >= 3))
  $('#card', el).innerHTML = `
    <div class="sc-sun"></div>
    <p class="brand">mylight<b>150</b></p>
    <p class="sc-title">${state.showName ? `L'année solaire de ${D.client.prenom}` : 'Mon année solaire'}</p>
    <ul>${opts.map((o) => `<li><b>${o.big}</b><span>${o.small}</span></li>`).join('') || '<li class="empty">Choisissez au moins un chiffre</li>'}</ul>
    <p class="sc-foot">2025 → 2026 · batterie virtuelle mylight150</p>`
  $('#doShare', el).disabled = !opts.length
}
async function shareCard(el) {
  const opts = shareOpts().filter((o) => state.share.has(o.id))
  const c = document.createElement('canvas'); c.width = 1080; c.height = 1350
  const x = c.getContext('2d')
  const g = x.createLinearGradient(0, 0, 0, 1350); g.addColorStop(0, '#F0FBFE'); g.addColorStop(1, '#FFFFFF'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1350)
  const sun = x.createRadialGradient(860, 220, 0, 860, 220, 420); sun.addColorStop(0, 'rgba(232,182,14,.9)'); sun.addColorStop(0.35, 'rgba(246,215,102,.55)'); sun.addColorStop(1, 'rgba(246,215,102,0)'); x.fillStyle = sun; x.fillRect(0, 0, 1080, 1350)
  x.fillStyle = '#032126'; x.font = '700 52px Inter'; x.fillText('mylight', 90, 150); x.fillStyle = '#45767E'; x.fillText('150', 90 + x.measureText('mylight').width, 150)
  x.fillStyle = '#032126'; x.font = '600 64px Inter'; x.fillText(state.showName ? `L'année solaire de ${D.client.prenom}` : 'Mon année solaire', 90, 300)
  opts.forEach((o, i) => { const y = 520 + i * 270; x.fillStyle = '#032126'; x.font = '700 150px Inter'; x.fillText(o.big, 90, y); x.fillStyle = '#495858'; x.font = '500 44px Inter'; x.fillText(o.small, 94, y + 70) })
  x.fillStyle = '#627070'; x.font = '500 36px Inter'; x.fillText('2025 → 2026 · batterie virtuelle mylight150', 90, 1270)
  const blob = await new Promise((r) => c.toBlob(r, 'image/png'))
  const file = new File([blob], 'mon-annee-solaire.png', { type: 'image/png' })
  const text = `Mon année solaire avec mylight150 : ${opts.map((o) => `${o.big} ${o.small}`).join(', ')}.`
  try {
    if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], text }); return }
  } catch (e) { if (e.name === 'AbortError') return }
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = file.name; a.click()
  toast(el, 'Carte enregistrée en image')
}
function toast(el, msg) { const t = $('.toast', el); t.textContent = msg; gsap.fromTo(t, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }); gsap.to(t, { opacity: 0, delay: 2.6, duration: 0.4 }) }

// ---------------------------------------------------------------- story
const host = $('#screens'), prog = $('.progress')
screens.forEach((s, i) => {
  const sec = document.createElement('section')
  sec.className = `screen s${i + 1}`; sec.setAttribute('aria-label', `Écran ${i + 1} sur ${screens.length}`); sec.hidden = true
  sec.innerHTML = s.html()
  host.appendChild(sec)
  prog.insertAdjacentHTML('beforeend', '<span><i></i></span>')
  s.el = sec
  s.split = new SplitType($('.split', sec), { types: 'lines,words' })
})
let cur = -1, busy = false
function go(n, dir = 1) {
  if (n < 0 || n >= screens.length || n === cur || busy) return
  const prev = screens[cur], next = screens[n]
  busy = true
  if (gl) gl.unmount()
  next.el.hidden = false; next.el.scrollTop = 0
  const d = RM ? 0 : 0.6
  if (prev) {
    gsap.to(prev.el, { xPercent: -12 * dir, opacity: 0, duration: d * 0.8, ease: 'power3.in', onComplete: () => { prev.el.hidden = true; gsap.set(prev.el, { xPercent: 0, opacity: 1 }) } })
  }
  gsap.fromTo(next.el, { xPercent: 14 * dir, opacity: 0 }, { xPercent: 0, opacity: 1, duration: d, delay: prev ? d * 0.6 : 0, ease: 'expo.out', onComplete: () => (busy = false) })
  cur = n
  $$('span i', prog).forEach((b, i) => gsap.to(b, { scaleX: i <= n ? 1 : 0, duration: RM ? 0 : 0.5, ease: 'power3.out' }))
  $('#count').textContent = `${n + 1} / ${screens.length}`
  $('#prev').disabled = n === 0
  $('#next span').textContent = n === screens.length - 1 ? 'Terminer' : 'Suivant'
  const words = $$('.word', next.el)
  gsap.fromTo(words, { yPercent: 110 }, { yPercent: 0, duration: RM ? 0 : 0.9, ease: 'expo.out', stagger: 0.03, delay: prev ? d * 0.5 : 0 })
  gsap.fromTo($$('.eyebrow, .kpi, .kpi-sub', next.el), { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: RM ? 0 : 0.8, ease: 'power3.out', stagger: 0.08, delay: (prev ? d * 0.5 : 0) + 0.15 })
  requestAnimationFrame(() => next.enter(next.el))
}
const nextScreen = () => (cur === screens.length - 1 ? quit() : go(cur + 1, 1))
const prevScreen = () => go(cur - 1, -1)
$('#next').onclick = nextScreen
$('#prev').onclick = prevScreen
function quit() { if (gl) gl.unmount(); $('#quit').hidden = false; gsap.fromTo('#quit', { opacity: 0 }, { opacity: 1, duration: 0.4 }); $('#resume').focus() }
$('#close').onclick = quit
$('#resume').onclick = () => { $('#quit').hidden = true; const c = cur; cur = -1; go(c) }

// gestes : swipe horizontal hors zones d'exploration
let sx = 0, sy = 0, st = 0, sOk = false
host.addEventListener('pointerdown', (e) => { sOk = !e.target.closest('[data-explore], input, button, details, label, a'); sx = e.clientX; sy = e.clientY; st = performance.now() })
host.addEventListener('pointerup', (e) => {
  if (!sOk) return
  const dx = e.clientX - sx, dy = e.clientY - sy
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5 && performance.now() - st < 700) dx < 0 ? nextScreen() : prevScreen()
})
addEventListener('keydown', (e) => {
  if (e.key === 'Escape') return quit()
  if (e.target.closest && e.target.closest('[data-explore], input, canvas')) return
  if (e.key === 'ArrowRight') nextScreen()
  if (e.key === 'ArrowLeft') prevScreen()
})

// curseur custom + boutons magnétiques (souris uniquement)
if (FINE && !RM) {
  const cur = $('.cursor'), ring = $('.cursor-ring'), lab = $('.cursor-ring em')
  document.body.classList.add('has-cursor')
  const xTo = gsap.quickTo(cur, 'x', { duration: 0.25, ease: 'power3.out' }), yTo = gsap.quickTo(cur, 'y', { duration: 0.25, ease: 'power3.out' })
  addEventListener('pointermove', (e) => {
    xTo(e.clientX); yTo(e.clientY)
    const ex = e.target.closest && e.target.closest('[data-cursor]'), hv = e.target.closest && e.target.closest('button, a, label, summary, input')
    cur.classList.toggle('explore', !!ex && !hv); cur.classList.toggle('hover', !!hv)
    lab.textContent = ex && !hv ? ex.dataset.cursor : ''
  })
  document.addEventListener('pointerover', (e) => {
    const m = e.target.closest && e.target.closest('.magnetic'); if (!m || m._mag) return
    m._mag = true
    m.addEventListener('pointermove', (ev) => { const r = m.getBoundingClientRect(); gsap.to(m, { x: (ev.clientX - r.left - r.width / 2) * 0.25, y: (ev.clientY - r.top - r.height / 2) * 0.35, duration: 0.4, ease: 'power3.out' }) })
    m.addEventListener('pointerleave', () => gsap.to(m, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' }))
  })
}

// preloader court puis écran 1
const pre = $('.preloader')
const ptl = gsap.timeline({ onComplete: () => pre.remove() })
if (RM) { ptl.to(pre, { opacity: 0, duration: 0.2 }); go(0) }
else {
  ptl.fromTo('.pre-sun circle', { strokeDashoffset: 280 }, { strokeDashoffset: 0, duration: 0.9, ease: 'power3.inOut' })
    .from('.pre-brand, .pre-txt', { y: 14, opacity: 0, duration: 0.5, ease: 'power3.out', stagger: 0.08 }, '-=0.5')
    .to(pre, { clipPath: 'inset(0 0 100% 0)', duration: 0.8, ease: 'expo.inOut', onStart: () => go(0) }, '+=0.25')
}
