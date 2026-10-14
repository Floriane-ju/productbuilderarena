import * as THREE from 'three'

// Couleurs charte Regenerativ
const C = {
  solar: new THREE.Color('#E8B60E'),
  solarLight: new THREE.Color('#F6D766'),
  battery: new THREE.Color('#5DB8D5'),
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

// ---------- Scène 1 : la sphère d'énergie, remplie de soleil ----------
export function sphereScene({ share, onTouch }) {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50)
  camera.position.set(0, 0.35, 5.2); camera.lookAt(0, 0, 0)
  const target = sphereFillHeight(share) - 1
  const u = {
    uLevel: { value: -1.02 }, uTilt: { value: new THREE.Vector2() }, uTime: { value: 0 },
    uA: { value: C.solar }, uB: { value: C.solarLight },
  }
  const liquid = new THREE.Mesh(
    new THREE.SphereGeometry(1, 96, 64),
    new THREE.ShaderMaterial({
      uniforms: u, side: THREE.DoubleSide,
      vertexShader: `varying vec3 vP; varying vec3 vN; varying vec3 vV;
        void main(){ vec4 w = modelMatrix*vec4(position,1.); vP = w.xyz; vN = normalize(mat3(modelMatrix)*normal); vV = normalize(cameraPosition - w.xyz); gl_Position = projectionMatrix*viewMatrix*w; }`,
      fragmentShader: `uniform float uLevel; uniform vec2 uTilt; uniform float uTime; uniform vec3 uA; uniform vec3 uB;
        varying vec3 vP; varying vec3 vN; varying vec3 vV;
        void main(){
          float wave = 0.018*sin(vP.x*6.+uTime*2.3)+0.014*sin(vP.z*7.-uTime*1.7);
          float h = uLevel + uTilt.x*vP.x + uTilt.y*vP.z + wave;
          if (vP.y > h) discard;
          if (!gl_FrontFacing) { // surface du liquide vue par l'ouverture
            float r = length(vP.xz);
            gl_FragColor = vec4(mix(uB, vec3(1.), 0.25 + 0.2*sin(r*14.-uTime*3.)*0.3), 1.); return;
          }
          float f = pow(1. - max(dot(vN, vV), 0.), 2.);
          float depth = clamp((h - vP.y)*0.6, 0., 1.);
          vec3 col = mix(uB, uA, depth*0.9 + 0.1);
          col += f*0.35 + smoothstep(0.03, 0., h - vP.y)*0.25;
          gl_FragColor = vec4(col, 1.);
        }`,
    }),
  )
  const glass = new THREE.Mesh(
    new THREE.SphereGeometry(1.025, 96, 64),
    new THREE.ShaderMaterial({
      transparent: true, depthWrite: false,
      uniforms: { uC: { value: C.petrol } },
      vertexShader: `varying vec3 vN; varying vec3 vV; void main(){ vec4 w = modelMatrix*vec4(position,1.); vN = normalize(mat3(modelMatrix)*normal); vV = normalize(cameraPosition-w.xyz); gl_Position = projectionMatrix*viewMatrix*w; }`,
      fragmentShader: `uniform vec3 uC; varying vec3 vN; varying vec3 vV; void main(){ float f = pow(1.-max(dot(vN,vV),0.), 2.6); vec3 l = normalize(vec3(-.5,.8,.6)); float s = pow(max(dot(reflect(-l,vN), vV),0.), 40.); gl_FragColor = vec4(mix(uC, vec3(1.), s), f*0.55 + s*0.8 + 0.04); }`,
    }),
  )
  // anneau-repère au niveau exact (fidélité : marque la frontière 53 %)
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1, 0.008, 8, 128), new THREE.MeshBasicMaterial({ color: C.petrol800, transparent: true, opacity: 0.55 }))
  ring.rotation.x = Math.PI / 2
  // bulles de soleil
  const N = 70, bub = new THREE.InstancedMesh(new THREE.SphereGeometry(0.018, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 }), N)
  const seeds = Array.from({ length: N }, () => ({ a: Math.random() * 6.28, r: Math.sqrt(Math.random()) * 0.8, s: 0.08 + Math.random() * 0.2, y: Math.random() }))
  const m4 = new THREE.Matrix4()
  scene.add(liquid, glass, ring, bub)
  // ombre portée douce
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(1, 48), new THREE.ShaderMaterial({ transparent: true, depthWrite: false, vertexShader: `varying vec2 vU; void main(){ vU=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`, fragmentShader: `varying vec2 vU; void main(){ float d=length(vU-.5)*2.; gl_FragColor=vec4(0.012,0.13,0.15,(1.-smoothstep(0.,1.,d))*0.18);}` }))
  shadow.rotation.x = -Math.PI / 2; shadow.position.y = -1.18; shadow.scale.set(1.1, 1.1, 1)
  scene.add(shadow)

  let tilt = new THREE.Vector2(), tiltV = new THREE.Vector2(), level = -1.02, fillT = 0, off = null, t0 = 0
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2()
  return {
    scene, camera,
    resize(w, h) {
      camera.aspect = w / h
      // garde toute la sphère visible quel que soit le format
      camera.position.z = w / h < 0.8 ? 5.2 / Math.max(w / h / 0.8, 0.62) : 5.2
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
          if (hit) { tiltV.x += (Math.random() - 0.5) * 0.12; tiltV.y += 0.05; onTouch(hit.point.y < target ? 'solar' : 'grid') }
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
      for (let i = 0; i < N; i++) {
        const s = seeds[i]
        s.y += s.s * dt * (RM ? 0 : 1); if (s.y > 1) s.y = 0
        const yy = -1 + s.y * (level + 1)
        const maxR = Math.sqrt(Math.max(0, 1 - yy * yy)) * 0.9
        const r = Math.min(s.r, maxR)
        m4.makeTranslation(Math.cos(s.a + t * 0.2) * r, yy, Math.sin(s.a + t * 0.2) * r)
        bub.setMatrixAt(i, m4)
      }
      bub.instanceMatrix.needsUpdate = true
      if (!RM) { liquid.rotation.y = t * 0.15; glass.rotation.y = t * 0.15 }
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
  // repère de capacité : cercle à 100 kWh
  const capRing = new THREE.Mesh(new THREE.TorusGeometry(R, 0.006, 6, 256), new THREE.MeshBasicMaterial({ color: C.petrol800, transparent: true, opacity: 0.35 }))
  capRing.rotation.x = Math.PI / 2; capRing.position.y = H; ringG.add(capRing)
  // barres : 1 par jour, hauteur = niveau fin de journée / capacité (proportions réelles)
  const geo = new THREE.BoxGeometry(1, 1, 1); geo.translate(0, 0.5, 0)
  const bars = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ roughness: 0.4, metalness: 0.05 }), N)
  const w = R * step * 0.82
  const col = new THREE.Color()
  const heights = days.map((d) => Math.max(0.012, (d[3] / cap) * H))
  for (let i = 0; i < N; i++) {
    col.copy(days[i][7] > 0 ? C.solar : C.battery) // or = batterie pleine ce jour-là (surplus perdu)
    bars.setColorAt(i, col)
  }
  ringG.add(bars)
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
      v.set(Math.sin(a) * R, 0, Math.cos(a) * R)
      sc.set(w, heights[i] * e + 0.0001, 0.12)
      bars.setMatrixAt(i, m4.compose(v, q, sc))
    }
    bars.instanceMatrix.needsUpdate = true
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
          const hit = ray.intersectObject(bars)[0]
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
      sel.scale.set(w * 1.8, heights[i] * Math.min(1, grow * 1.6) + 0.04, 0.14)
      camera.position.set(0, Math.sin(elev) * dist, Math.cos(elev) * dist)
      camera.lookAt(0, 0.45, 0)
    },
  }
}
