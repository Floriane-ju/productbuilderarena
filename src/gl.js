import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

// Couleurs charte Regenerativ
const C = {
  solar: new THREE.Color('#E8B60E'),
  solarLight: new THREE.Color('#F6D766'),
  battery: new THREE.Color('#5DB8D5'),
  economy: new THREE.Color('#5ABB99'),
  used: new THREE.Color('#F08A3C'),
  petrol: new THREE.Color('#45767E'),
  petrol200: new THREE.Color('#C2E2E8'),
  petrol100: new THREE.Color('#D8F3F7'),
  petrol800: new THREE.Color('#032126'),
  neutral200: new THREE.Color('#D8DDDD'),
}

const RM = matchMedia('(prefers-reduced-motion: reduce)').matches

export function hasWebGL() {
  if (new URLSearchParams(location.search).has('nogl')) return false
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')))
  } catch (e) { return false }
}

export function createGL() {
  const canvas = document.createElement('canvas')
  canvas.className = 'gl'
  let renderer
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' })
  } catch (e) { return null }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75))
  renderer.outputColorSpace = THREE.SRGBColorSpace

  let active = null, host = null, last = 0
  const ro = new ResizeObserver(() => resize())
  function resize() {
    if (!host || !active) return
    const w = host.clientWidth, h = host.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false)
    active.resize(w, h)
  }
  function loop(t) {
    const dt = Math.min(0.05, (t - (last || t)) / 1000); last = t
    if (active) { active.update(dt, t / 1000); renderer.render(active.scene, active.camera) }
  }
  return {
    mount(el, sc) {
      host = el; active = sc
      el.appendChild(canvas)
      ro.disconnect(); ro.observe(el)
      resize()
      sc.attach(canvas)
      last = 0
      renderer.setAnimationLoop(loop)
    },
    unmount() {
      if (active) active.detach()
      renderer.setAnimationLoop(null)
      ro.disconnect()
      active = null; host = null
      canvas.remove()
    },
  }
}

// ---------- Interaction helpers (drag + pinch + wheel) ----------
function gestures(canvas, h) {
  const pts = new Map()
  let pinch0 = 0, moved = 0, downAt = 0
  const down = (e) => {
    canvas.setPointerCapture(e.pointerId)
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY })
    moved = 0; downAt = performance.now()
    if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch0 = Math.hypot(a.x - b.x, a.y - b.y) }
    h.down && h.down(e)
  }
  const move = (e) => {
    const p = pts.get(e.pointerId); if (!p) return
    const dx = e.clientX - p.x, dy = e.clientY - p.y
    p.x = e.clientX; p.y = e.clientY
    if (pts.size === 2) {
      const [a, b] = [...pts.values()]; const d = Math.hypot(a.x - b.x, a.y - b.y)
      h.pinch && h.pinch(d / (pinch0 || d)); pinch0 = d
    } else { moved += Math.abs(dx) + Math.abs(dy); h.drag && h.drag(dx, dy, e) }
  }
  const up = (e) => {
    if (!pts.has(e.pointerId)) return
    pts.delete(e.pointerId)
    if (moved < 8 && performance.now() - downAt < 400) h.tap && h.tap(e)
    h.up && h.up(e)
  }
  const wheel = (e) => { e.preventDefault(); h.pinch && h.pinch(e.deltaY > 0 ? 0.94 : 1.06) }
  canvas.addEventListener('pointerdown', down)
  canvas.addEventListener('pointermove', move)
  canvas.addEventListener('pointerup', up)
  canvas.addEventListener('pointercancel', up)
  canvas.addEventListener('wheel', wheel, { passive: false })
  return () => {
    canvas.removeEventListener('pointerdown', down)
    canvas.removeEventListener('pointermove', move)
    canvas.removeEventListener('pointerup', up)
    canvas.removeEventListener('pointercancel', up)
    canvas.removeEventListener('wheel', wheel)
  }
}

// Hauteur de remplissage d'une sphère (rayon 1) pour une fraction de VOLUME donnée : proportions fidèles
export function sphereFillHeight(frac) {
  let lo = 0, hi = 2
  for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; (m * m * (3 - m) / 4 < frac ? (lo = m) : (hi = m)) }
  return (lo + hi) / 2 // hauteur depuis le bas, 0..2
}

// ---------- Scène 1 : le soleil, rempli à hauteur de la part solaire ----------
// Rayons pâte à modeler : étoile à 12 branches arrondies, extrudée et bombée
function rayShape() {
  const s = new THREE.Shape(), K = 240
  for (let i = 0; i <= K; i++) {
    const a = (i / K) * Math.PI * 2
    const r = 1.3 + 0.32 * Math.pow(0.5 + 0.5 * Math.cos(a * 12), 1.6)
    i ? s.lineTo(Math.cos(a) * r, Math.sin(a) * r) : s.moveTo(Math.cos(a) * r, Math.sin(a) * r)
  }
  return s
}

export function sphereScene({ share, onTouch }) {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50)
  camera.position.set(0, 0.25, 6.6); camera.lookAt(0, 0, 0)
  const target = sphereFillHeight(share) - 1
  const L = new THREE.Vector3(-0.5, 0.8, 0.9).normalize()
  scene.add(new THREE.HemisphereLight(0xfff4d6, 0xc98a1c, 1.4))
  const key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.copy(L).multiplyScalar(5); scene.add(key)

  const sun = new THREE.Group(); scene.add(sun)
  const rays = new THREE.Mesh(
    new THREE.ExtrudeGeometry(rayShape(), { depth: 0.18, bevelEnabled: true, bevelThickness: 0.2, bevelSize: 0.12, bevelSegments: 8, curveSegments: 1 }),
    new THREE.MeshStandardMaterial({ color: '#F2B70F', roughness: 0.5, metalness: 0 }),
  )
  rays.position.z = -0.55
  sun.add(rays)

  const u = {
    uLevel: { value: -1.02 }, uTilt: { value: new THREE.Vector2() }, uTime: { value: 0 },
    uA: { value: new THREE.Color('#F2B70F') }, uB: { value: new THREE.Color('#FBD540') }, uCool: { value: new THREE.Color('#EDE6D2') }, uL: { value: L },
  }
  const body = new THREE.Mesh(
    new THREE.SphereGeometry(1, 96, 64),
    new THREE.ShaderMaterial({
      uniforms: u,
      vertexShader: `varying vec3 vP; varying vec3 vN; varying vec3 vV;
        void main(){ vec4 w = modelMatrix*vec4(position,1.); vP = w.xyz; vN = normalize(mat3(modelMatrix)*normal); vV = normalize(cameraPosition - w.xyz); gl_Position = projectionMatrix*viewMatrix*w; }`,
      fragmentShader: `uniform float uLevel; uniform vec2 uTilt; uniform float uTime; uniform vec3 uA; uniform vec3 uB; uniform vec3 uCool; uniform vec3 uL;
        varying vec3 vP; varying vec3 vN; varying vec3 vV;
        void main(){
          float wave = 0.02*sin(vP.x*6.+uTime*2.3)+0.015*sin(vP.z*7.-uTime*1.7);
          float h = uLevel + uTilt.x*vP.x + uTilt.y*vP.z + wave;
          float on = step(vP.y, h);
          // rendu pâte à modeler : diffus enveloppant, reflet doux, bord chaud
          float d = dot(vN, uL)*.5 + .5;
          float mu = max(dot(vN, vV), 0.);
          vec3 base = on > .5 ? mix(uA, uB, smoothstep(-.6, .9, vN.y*.6 + d*.6)) : uCool;
          vec3 col = base*(.62 + .5*d);
          col += pow(max(dot(reflect(-uL, vN), vV), 0.), 18.)*.22;
          col += pow(1. - mu, 2.5)*(on > .5 ? vec3(.35, .18, 0.) : vec3(.05));
          col = mix(col, col*.86, (1. - on)*smoothstep(.05, 0., vP.y - h)); // lisière de la part réseau
          gl_FragColor = vec4(col, 1.);
          #include <colorspace_fragment>
        }`,
    }),
  )
  sun.add(body)

  // visage
  const ink = new THREE.MeshStandardMaterial({ color: '#140c02', roughness: 0.18, metalness: 0 })
  const onSurf = (o, x, y, lift = 0) => { o.position.set(x, y, Math.sqrt(Math.max(0, 1 - x * x - y * y)) + lift); o.lookAt(o.position.clone().multiplyScalar(2)); return o }
  const face = new THREE.Group(); sun.add(face)
  const eyes = [-0.27, 0.27].map((x) => { const e = onSurf(new THREE.Mesh(new THREE.SphereGeometry(0.07, 24, 16), ink), x, 0.14, -0.01); e.scale.set(0.85, 1.3, 0.55); face.add(e); return e })
  ;[-1, 1].forEach((sd) => {
    const b = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.026, 10, 32, 1.1), ink)
    onSurf(b, 0.3 * sd, 0.28, -0.015); b.rotateZ(Math.PI / 2 - 0.55 + sd * 0.12); face.add(b)
  })
  const smile = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.032, 10, 48, 1.15), ink)
  onSurf(smile, 0.02, 0.1, -0.058); smile.rotateZ(-Math.PI / 2 - 0.575); face.add(smile)

  const glass = new THREE.Mesh(new THREE.SphereGeometry(1.02, 48, 32), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }))
  sun.add(glass) // cible du toucher
  // anneau-repère au niveau exact (fidélité : marque la frontière de la part solaire)
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.004, 0.008, 8, 128), new THREE.MeshBasicMaterial({ color: C.petrol800, transparent: true, opacity: 0.55 }))
  ring.rotation.x = Math.PI / 2
  scene.add(ring)
  // ombre portée douce
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(1, 48), new THREE.ShaderMaterial({ transparent: true, depthWrite: false, vertexShader: `varying vec2 vU; void main(){ vU=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`, fragmentShader: `varying vec2 vU; void main(){ float d=length(vU-.5)*2.; gl_FragColor=vec4(0.46,0.28,0.18,(1.-smoothstep(0.,1.,d))*0.16);}` }))
  shadow.rotation.x = -Math.PI / 2; shadow.position.y = -1.8; shadow.scale.set(1.4, 1.4, 1)
  scene.add(shadow)

  let tilt = new THREE.Vector2(), tiltV = new THREE.Vector2(), level = -1.02, fillT = 0, off = null, t0 = 0, blink = 2
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2()
  return {
    scene, camera,
    resize(w, h) {
      camera.aspect = w / h
      // garde tout le soleil (rayons compris) visible quel que soit le format
      camera.position.z = w / h < 0.95 ? 6.6 / Math.max(w / h / 0.95, 0.55) : 6.6
      camera.updateProjectionMatrix()
    },
    attach(canvas) {
      t0 = 0; fillT = 0; level = -1.02
      off = gestures(canvas, {
        drag(dx, dy) { tiltV.x -= dx * 0.0016; tiltV.y -= dy * 0.0016 },
        tap(e) {
          const r = canvas.getBoundingClientRect()
          ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
          ray.setFromCamera(ndc, camera)
          const hit = ray.intersectObject(glass)[0]
          if (hit) { tiltV.x += (Math.random() - 0.5) * 0.12; tiltV.y += 0.05; blink = 0; onTouch(hit.point.y < target ? 'solar' : 'grid') }
          else onTouch(null)
        },
      })
    },
    detach() { off && off() },
    update(dt, t) {
      if (!t0) t0 = t
      // remplissage d'entrée (expo out)
      fillT = Math.min(1, fillT + dt / (RM ? 0.01 : 2.2))
      const e = 1 - Math.pow(2, -10 * fillT)
      level = -1.02 + (target + 1.02) * e
      // ressort de ballottement
      tiltV.x += -tilt.x * 18 * dt; tiltV.y += -tilt.y * 18 * dt
      tiltV.multiplyScalar(Math.pow(0.04, dt))
      tilt.addScaledVector(tiltV, dt * 10)
      tilt.clampScalar(-0.45, 0.45)
      u.uLevel.value = level; u.uTilt.value.copy(tilt); u.uTime.value = RM ? 0 : t
      const rr = Math.sqrt(Math.max(0, 1 - target * target))
      ring.position.y = target; ring.scale.set(rr, rr, 1)
      ring.material.opacity = 0.55 * e
      // apparition des rayons + petite vie : rotation lente, regard qui suit le ballottement, clignement
      rays.scale.setScalar(0.6 + 0.4 * e)
      if (RM) return
      rays.rotation.z = t * 0.08
      face.rotation.set(tilt.y * 0.5, -tilt.x * 0.6, 0)
      blink += dt; if (blink > 4) blink = 0
      const k = blink < 0.16 ? Math.abs(blink / 0.08 - 1) : 1
      eyes.forEach((o) => (o.scale.y = 1.3 * Math.max(0.12, k)))
      sun.position.y = Math.sin(t * 1.2) * 0.03
    },
  }
}

// ---------- Scène 5 : le coffre-fort, l'année de batterie en anneau ----------
function label(text, color = '#273333') {
  const c = document.createElement('canvas'); c.width = 128; c.height = 64
  const x = c.getContext('2d'); x.font = '600 34px Inter, sans-serif'; x.fillStyle = color; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 64, 34)
  const tx = new THREE.CanvasTexture(c); tx.colorSpace = THREE.SRGBColorSpace; tx.anisotropy = 4
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tx, transparent: true, depthWrite: false }))
  s.scale.set(0.42, 0.21, 1)
  return s
}

export function vaultScene({ days, cap, onSelect }) {
  const N = days.length
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60)
  scene.add(new THREE.HemisphereLight(0xffffff, 0xb9c9cc, 2.1))
  const dl = new THREE.DirectionalLight(0xffffff, 1.6); dl.position.set(2, 5, 4); scene.add(dl)

  const R = 2.25, H = 1.5, step = (Math.PI * 2) / N
  const ringG = new THREE.Group(); scene.add(ringG)
  // porte du coffre
  const door = new THREE.Mesh(new THREE.CylinderGeometry(R + 0.35, R + 0.42, 0.16, 128), new THREE.MeshStandardMaterial({ color: C.petrol100, roughness: 0.55, metalness: 0.1 }))
  door.position.y = -0.08; ringG.add(door)
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.95, 0.22, 64), new THREE.MeshStandardMaterial({ color: C.petrol, roughness: 0.35, metalness: 0.35 }))
  hub.position.y = 0.03; ringG.add(hub)
  for (let k = 0; k < 6; k++) { // poignée du coffre
    const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.5, 12), hub.material)
    spoke.rotation.z = Math.PI / 2; spoke.rotation.y = (k * Math.PI) / 6; spoke.position.y = 0.2; ringG.add(spoke)
  }
  // 2 rangées concentriques, 1 barre par jour : intérieur = kWh mis en batterie (bleu, vert si pleine), extérieur = kWh consommés depuis la batterie (orange)
  const geo = new THREE.BoxGeometry(1, 1, 1); geo.translate(0, 0.5, 0)
  const mat = new THREE.MeshStandardMaterial({ roughness: 0.4, metalness: 0.05 })
  const bars = new THREE.InstancedMesh(geo, mat, N), used = new THREE.InstancedMesh(geo, mat, N)
  const w = R * step * 0.82
  const maxDay = Math.max(...days.map((d) => Math.max(d[5], d[6])))
  const hIn = days.map((d) => Math.max(0.012, (d[5] / maxDay) * H)), hOut = days.map((d) => Math.max(0.012, (d[6] / maxDay) * H))
  const heights = days.map((d, i) => Math.max(hIn[i], hOut[i]))
  const DR = 0.07 // écart radial entre les 2 rangées
  for (let i = 0; i < N; i++) {
    bars.setColorAt(i, days[i][7] > 0 ? C.economy : C.battery)
    used.setColorAt(i, C.used)
  }
  ringG.add(bars, used)
  // mois
  const months = ['janv', 'févr', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc']
  days.forEach((d, i) => {
    if (d[0].slice(8) !== '01') return
    const a = -i * step, s = label(months[+d[0].slice(5, 7) - 1])
    s.position.set(Math.sin(a) * (R + 0.2), 0.12, Math.cos(a) * (R + 0.2))
    ringG.add(s)
    const tick = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.01, 0.22), new THREE.MeshBasicMaterial({ color: C.petrol800 }))
    tick.position.set(Math.sin(a) * (R - 0.02), 0.005, Math.cos(a) * (R - 0.02)); tick.rotation.y = a
    ringG.add(tick)
  })
  // index fixe : le jour lu est toujours devant, face à soi
  const pointer = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.16, 3), new THREE.MeshBasicMaterial({ color: C.petrol800 }))
  pointer.rotation.x = -Math.PI / 2; pointer.position.set(0, 0.05, R + 0.55); scene.add(pointer)
  const sel = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0), new THREE.MeshBasicMaterial({ color: C.petrol800, transparent: true, opacity: 0.9 }))
  scene.add(sel)

  let rot = 0, rotV = 0, target = null, elev = 0.55, dist = 7.4, grow = 0, grown = false, cur = -1, off = null
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), v = new THREE.Vector3(), sc = new THREE.Vector3(), Y = new THREE.Vector3(0, 1, 0)
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2()
  const idxOf = (r) => ((Math.round(r / step) % N) + N) % N
  function layout(g) {
    for (let i = 0; i < N; i++) {
      const a = -i * step
      const k = Math.min(1, Math.max(0, g * 1.6 - (i / N) * 0.6)) // pousse jour après jour
      const e = 1 - Math.pow(1 - k, 3)
      q.setFromAxisAngle(Y, a)
      v.set(Math.sin(a) * (R - DR), 0, Math.cos(a) * (R - DR))
      sc.set(w, hIn[i] * e + 0.0001, 0.11)
      bars.setMatrixAt(i, m4.compose(v, q, sc))
      v.set(Math.sin(a) * (R + DR), 0, Math.cos(a) * (R + DR)); sc.y = hOut[i] * e + 0.0001
      used.setMatrixAt(i, m4.compose(v, q, sc))
    }
    bars.instanceMatrix.needsUpdate = used.instanceMatrix.needsUpdate = true
  }
  layout(RM ? 1 : 0)
  return {
    scene, camera,
    setDay(i, instant) { target = i * step; if (instant) { rot = target; rotV = 0 } },
    resize(wd, ht) {
      camera.aspect = wd / ht
      camera.updateProjectionMatrix()
    },
    attach(canvas) {
      grow = RM ? 1 : 0; grown = false
      off = gestures(canvas, {
        down() { target = null; rotV = 0 },
        drag(dx, dy) { const d = dx * 0.006; rot += d; rotV = d / 0.016; elev = Math.min(1.25, Math.max(0.18, elev + dy * 0.004)) },
        pinch(f) { dist = Math.min(11, Math.max(4.6, dist / f)) },
        up() { if (target == null && Math.abs(rotV) < 0.2) target = Math.round(rot / step) * step },
        tap(e) {
          const r = canvas.getBoundingClientRect()
          ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1)
          ray.setFromCamera(ndc, camera)
          const hit = ray.intersectObjects([bars, used])[0]
          if (hit && hit.instanceId != null) {
            // amène le jour touché devant, en prenant le chemin le plus court
            const base = hit.instanceId * step
            const turns = Math.round((rot - base) / (Math.PI * 2))
            target = base + turns * Math.PI * 2
          }
        },
      })
    },
    detach() { off && off() },
    update(dt) {
      grow = Math.min(1, grow + dt / 2.4)
      if (!grown) { layout(grow); grown = grow === 1 }
      if (target != null) { rot += (target - rot) * Math.min(1, dt * 7); if (Math.abs(target - rot) < 1e-4) rot = target }
      else if (Math.abs(rotV) > 0.01) { rot += rotV * dt; rotV *= Math.pow(0.03, dt); if (Math.abs(rotV) < 0.2) target = Math.round(rot / step) * step }
      ringG.rotation.y = rot
      const i = idxOf(rot)
      if (i !== cur) { cur = i; onSelect(i) }
      // surlignage du jour lu
      const a = -i * step + rot
      sel.position.set(Math.sin(a) * R, 0, Math.cos(a) * R); sel.rotation.y = a
      sel.scale.set(w * 1.8, heights[i] * Math.min(1, grow * 1.6) + 0.04, 0.3)
      camera.position.set(0, Math.sin(elev) * dist, Math.cos(elev) * dist)
      camera.lookAt(0, 0.45, 0)
    },
  }
}

// ---------- Scène 3 : les équipements, en pâte à modeler, remplis de soleil ----------
// Même matière que le soleil : diffus enveloppant, bord chaud, part vide crème, liquide doré qui ballotte
function fillMaterial(u) {
  return new THREE.ShaderMaterial({
    uniforms: u,
    vertexShader: `varying vec3 vO; varying vec3 vN; varying vec3 vV;
      void main(){ vO = position; vec4 w = modelMatrix*vec4(position,1.); vN = normalize(mat3(modelMatrix)*normal); vV = normalize(cameraPosition - w.xyz); gl_Position = projectionMatrix*viewMatrix*w; }`,
    fragmentShader: `uniform float uLevel; uniform vec2 uTilt; uniform float uTime; uniform vec3 uA; uniform vec3 uB; uniform vec3 uCool; uniform vec3 uL;
      varying vec3 vO; varying vec3 vN; varying vec3 vV;
      void main(){
        float wave = 0.018*sin(vO.x*9.+uTime*2.3)+0.012*sin(vO.z*11.-uTime*1.7);
        float h = uLevel + uTilt.x*vO.x + uTilt.y*vO.z + wave;
        float on = step(vO.y, h);
        float d = dot(vN, uL)*.5 + .5;
        float mu = max(dot(vN, vV), 0.);
        vec3 base = on > .5 ? mix(uA, uB, smoothstep(-.6, .9, vN.y*.6 + d*.6)) : uCool;
        vec3 col = base*(.62 + .5*d);
        col += pow(max(dot(reflect(-uL, vN), vV), 0.), 18.)*.22;
        col += pow(1. - mu, 2.5)*(on > .5 ? vec3(.35, .18, 0.) : vec3(.05));
        col = mix(col, col*.86, (1. - on)*smoothstep(.04, 0., vO.y - h));
        col = mix(col, uB*1.08, on*smoothstep(.025, 0., abs(vO.y - h))*.7); // ménisque lumineux
        gl_FragColor = vec4(col, 1.);
        #include <colorspace_fragment>
      }`,
  })
}

// Capsule (ballon) : hauteur de remplissage pour une fraction de VOLUME, comme la sphère du soleil
function capsuleFillHeight(frac, r, L) {
  const cap = (h) => (Math.PI * h * h * (3 * r - h)) / 3
  const H = L + 2 * r, tot = (4 / 3) * Math.PI * r ** 3 + Math.PI * r * r * L
  const V = (h) => (h <= r ? cap(h) : h <= r + L ? cap(r) + Math.PI * r * r * (h - r) : tot - cap(H - h))
  let lo = 0, hi = H
  for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; V(m) / tot < frac ? (lo = m) : (hi = m) }
  return (lo + hi) / 2 - H / 2 // y local, centré
}

export function equipScene({ equip, anchors }) {
  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(0, 1, 0, -1, 0.1, 4000)
  camera.position.z = 2000
  const L = new THREE.Vector3(-0.5, 0.8, 0.9).normalize()
  scene.add(new THREE.HemisphereLight(0xfff4d6, 0xc98a1c, 1.4))
  const key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.copy(L).multiplyScalar(5); scene.add(key)

  const ink = new THREE.MeshStandardMaterial({ color: '#140c02', roughness: 0.18 })
  const clay = (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.55 })
  const shadowMat = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, vertexShader: `varying vec2 vU; void main(){ vU=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`, fragmentShader: `varying vec2 vU; void main(){ float d=length(vU-.5)*2.; gl_FragColor=vec4(0.46,0.28,0.18,(1.-smoothstep(0.,1.,d))*0.2);}` })

  // visage du soleil, posé sur une face avant plate (z)
  function addFace(g, z, y, s = 1) {
    const f = new THREE.Group(); f.position.set(0, y, z); f.scale.setScalar(s); g.add(f)
    const eyes = [-0.1, 0.1].map((x) => { const e = new THREE.Mesh(new THREE.SphereGeometry(0.035, 20, 12), ink); e.position.set(x, 0.04, 0); e.scale.set(0.85, 1.3, 0.55); f.add(e); return e })
    const sm = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.013, 8, 32, 1.15), ink)
    sm.position.set(0, 0.06, -0.004); sm.rotation.z = -Math.PI / 2 - 0.575; f.add(sm)
    return { f, eyes }
  }

  // modèles normalisés : hauteur 1, centrés ; w = largeur pour le cadrage
  const builders = [
    // Lave-linge : cube arrondi, hublot (le visage est dedans), bandeau de commande
    (acc) => {
      const g = new THREE.Group(), W = 0.82, H = 1, Dp = 0.74
      const body = new THREE.Mesh(new RoundedBoxGeometry(W, H, Dp, 6, 0.14), null)
      g.add(body)
      const port = new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.05, 16, 64), clay(acc)); port.position.set(0, -0.08, Dp / 2 + 0.01); g.add(port)
      const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.06, 24), clay(acc)); knob.rotation.x = Math.PI / 2; knob.position.set(0.24, 0.36, Dp / 2 + 0.01); g.add(knob)
      ;[-0.24, -0.13].forEach((x) => { const b = new THREE.Mesh(new THREE.SphereGeometry(0.03, 12, 8), clay(acc)); b.position.set(x, 0.36, Dp / 2); g.add(b) })
      const face = addFace(g, Dp / 2 + 0.005, -0.1, 1)
      return { g, body, w: W, y0: -H / 2, y1: H / 2, face, spin: port, sec: [W, Dp, 0.14] }
    },
    // Ballon d'eau chaude : capsule, cerclage et tuyaux
    (acc, frac) => {
      const g = new THREE.Group(), r = 0.3, Lc = 0.4
      const body = new THREE.Mesh(new THREE.CapsuleGeometry(r, Lc, 12, 48), null); g.add(body)
      ;[0.22, -0.22].forEach((y) => { const t = new THREE.Mesh(new THREE.TorusGeometry(r + 0.004, 0.022, 10, 64), clay(acc)); t.rotation.x = Math.PI / 2; t.position.y = y; g.add(t) })
      ;[-0.1, 0.1].forEach((x) => { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.14, 16), clay(acc)); p.position.set(x, -0.54, 0); g.add(p) })
      const dial = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.04, 20), clay(acc)); dial.rotation.x = Math.PI / 2; dial.position.set(0, 0.31, 0.29); g.add(dial)
      const face = addFace(g, r + 0.002, 0.0, 1)
      return { g, body, w: 0.66, level: capsuleFillHeight(frac, r, Lc), face, sec: [2 * r, 2 * r, r] }
    },
    // Pompe à chaleur : caisson large, ventilateur qui tourne au soleil
    (acc) => {
      const g = new THREE.Group(), W = 1.2, H = 0.86, Dp = 0.5
      const body = new THREE.Mesh(new RoundedBoxGeometry(W, H, Dp, 6, 0.12), null); g.add(body)
      const fanG = new THREE.Group(); fanG.position.set(0.24, 0, Dp / 2 + 0.01); g.add(fanG)
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.045, 16, 64), clay(acc)); fanG.add(ring)
      const blades = new THREE.Group(); fanG.add(blades)
      for (let k = 0; k < 3; k++) {
        const b = new THREE.Mesh(new THREE.SphereGeometry(0.2, 20, 12), clay(acc)); b.scale.set(0.45, 1, 0.12); b.position.y = 0.12
        const piv = new THREE.Group(); piv.rotation.z = (k * Math.PI * 2) / 3; piv.add(b); blades.add(piv)
      }
      const hub = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 10), clay(acc)); hub.scale.z = 0.6; blades.add(hub)
      ;[-0.42, 0.42].forEach((x) => { const f = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.06, 0.1), clay(acc)); f.position.set(x, -H / 2 - 0.02, 0); g.add(f) })
      const face = addFace(g, Dp / 2 + 0.005, 0.02, 0.9); face.f.position.x = -0.3
      return { g, body, w: W, y0: -H / 2, y1: H / 2, face, fan: blades, sec: [W, Dp, 0.12] }
    },
  ]
  const accents = ['#85CEDF', '#8C99C8', '#EC8834']

  const items = equip.map((q, i) => {
    const frac = q.pct / 100
    const m = builders[i](accents[i], frac)
    const u = {
      uLevel: { value: -1 }, uTilt: { value: new THREE.Vector2() }, uTime: { value: 0 },
      uA: { value: new THREE.Color('#F2B70F') }, uB: { value: new THREE.Color('#FBD540') }, uCool: { value: new THREE.Color('#EDE6D2') }, uL: { value: L },
    }
    m.body.material = fillMaterial(u)
    const target = m.level ?? m.y0 + (m.y1 - m.y0) * frac // boîtes : hauteur = volume
    const root = new THREE.Group(); root.add(m.g); scene.add(root)
    // anneau-repère au niveau exact : frontière de la part solaire
    const [sw, sd, sr] = m.sec, rr = new THREE.Shape(), x0 = -sw / 2 - 0.004, z0 = -sd / 2 - 0.004, x1 = -x0, z1 = -z0, k = sr
    rr.moveTo(x0 + k, z0); rr.lineTo(x1 - k, z0); rr.quadraticCurveTo(x1, z0, x1, z0 + k); rr.lineTo(x1, z1 - k); rr.quadraticCurveTo(x1, z1, x1 - k, z1)
    rr.lineTo(x0 + k, z1); rr.quadraticCurveTo(x0, z1, x0, z1 - k); rr.lineTo(x0, z0 + k); rr.quadraticCurveTo(x0, z0, x0 + k, z0)
    const pts = rr.getSpacedPoints(160).map((p) => new THREE.Vector3(p.x, target, p.y))
    const ring = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, true), 200, 0.007, 6, true), new THREE.MeshBasicMaterial({ color: C.petrol800, transparent: true, opacity: 0 }))
    m.g.add(ring)
    // décor (hublot, cerclages, ventilateur…) : apparaît comme les rayons du soleil
    const deco = m.g.children.filter((c) => c !== m.body && c !== m.face.f && c !== ring).map((o) => ({ o, s: o.scale.clone() }))
    const sh = new THREE.Mesh(new THREE.CircleGeometry(0.5, 40), shadowMat); sh.rotation.x = -Math.PI / 2; sh.position.y = -0.62; sh.scale.set(m.w * 1.25, 0.9, 1); root.add(sh)
    return { ...m, u, frac, target, root, ring, deco, tilt: new THREE.Vector2(), tv: new THREE.Vector2(), fillT: 0, blink: 1.2 * i, off: i * 1.3 }
  })

  let need = true, age = 0, off = null
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), lp = new THREE.Vector3()
  function place() {
    const a = anchors(); if (!a) return
    items.forEach((it, i) => {
      const r = a[i]
      const s = Math.min(r.h * 0.8, (r.w * 0.86) / it.w)
      it.root.position.set(r.x, -r.y, 0); it.root.scale.setScalar(s)
    })
  }
  const nearest = (x) => items.reduce((b, it, i) => (Math.abs(it.root.position.x - x) < Math.abs(items[b].root.position.x - x) ? i : b), 0)
  return {
    scene, camera,
    // toucher, comme le soleil : petite secousse, clignement, et lecture soleil / réseau selon la hauteur touchée
    pick(i, cx, cy, el) {
      const it = items[i]
      it.tv.x += (Math.random() - 0.5) * 0.12; it.tv.y += 0.05; it.blink = 0
      if (cx == null) return 'solar'
      const r = el.getBoundingClientRect()
      ndc.set(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1)
      ray.setFromCamera(ndc, camera)
      const hit = ray.intersectObject(it.body)[0]
      if (!hit) return null
      lp.copy(hit.point); it.body.worldToLocal(lp)
      return lp.y < it.target ? 'solar' : 'grid'
    },
    resize(w, h) {
      camera.left = 0; camera.right = w; camera.top = 0; camera.bottom = -h
      camera.updateProjectionMatrix(); need = true
    },
    attach(canvas) {
      age = 0; need = true
      // secouer : glisser sur la scène fait ballotter l'appareil le plus proche (sans capturer le pointeur, pour garder les clics des boutons)
      const el = canvas.parentElement
      let last = null
      const down = (e) => { last = { x: e.clientX, y: e.clientY } }
      const move = (e) => {
        if (!last) return
        const dx = e.clientX - last.x, dy = e.clientY - last.y; last = { x: e.clientX, y: e.clientY }
        const it = items[nearest(e.clientX - el.getBoundingClientRect().left)]
        it.tv.x -= dx * 0.0016; it.tv.y -= dy * 0.0016
      }
      const up = () => { last = null }
      el.addEventListener('pointerdown', down); addEventListener('pointermove', move); addEventListener('pointerup', up); addEventListener('pointercancel', up)
      off = () => { el.removeEventListener('pointerdown', down); removeEventListener('pointermove', move); removeEventListener('pointerup', up); removeEventListener('pointercancel', up) }
    },
    detach() { off && off() },
    update(dt, t) {
      age += dt
      if (need || age < 2) { place(); need = false } // ancrage sur la mise en page (polices, transition)
      items.forEach((it, i) => {
        // remplissage d'entrée (expo out, même durée que le soleil), décalé comme les compteurs
        if (age > 0.25 + i * 0.18) it.fillT = Math.min(1, it.fillT + dt / (RM ? 0.01 : 2.2))
        const e = 1 - Math.pow(2, -10 * it.fillT)
        const lo = (it.y0 ?? -0.5) - 0.02
        it.u.uLevel.value = lo + (it.target - lo) * e
        // ressort de ballottement
        it.tv.x += -it.tilt.x * 18 * dt; it.tv.y += -it.tilt.y * 18 * dt
        it.tv.multiplyScalar(Math.pow(0.04, dt))
        it.tilt.addScaledVector(it.tv, dt * 10); it.tilt.clampScalar(-0.45, 0.45)
        it.u.uTilt.value.copy(it.tilt); it.u.uTime.value = RM ? 0 : t + it.off
        it.ring.material.opacity = 0.55 * e
        it.deco.forEach((d) => d.o.scale.copy(d.s).multiplyScalar(0.6 + 0.4 * e))
        it.g.rotation.set(0.3, -0.35, 0)
        if (RM) return
        // petite vie : décor qui tourne, regard qui suit le ballottement, clignement, flottement
        if (it.fan) it.fan.rotation.z -= dt * (1 + 9 * it.frac * e)
        if (it.spin) it.spin.rotation.z = t * 0.08 * 4
        it.face.f.rotation.set(it.tilt.y * 0.5, -it.tilt.x * 0.6, 0)
        it.blink += dt; if (it.blink > 4) it.blink = 0
        const k = it.blink < 0.16 ? Math.abs(it.blink / 0.08 - 1) : 1
        it.face.eyes.forEach((o) => (o.scale.y = 1.3 * Math.max(0.12, k)))
        it.g.position.y = Math.sin(t * 1.2 + it.off) * 0.03
      })
    },
  }
}
