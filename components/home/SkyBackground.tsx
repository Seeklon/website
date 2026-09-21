'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Procedural cloudy sky for the home page, rendered once for the whole page height
 * and shown as a plain image that scrolls with the content (no parallax, no work
 * while scrolling, nothing left to lose if the GPU context goes away).
 *
 * Each cloud is a cumulus built from round lobes resting on a flat base, merged with a
 * smooth maximum and roughened with billow noise; lobes are shaded as if lit from the
 * upper left. The grid the clouds are placed on is warped and thinned by noise so it
 * does not read as a pattern. From the element marked `data-sky-deep` the sky blends
 * into deep blue between `--deep-lead` px above it and `--deep-full` px below, then thins
 * out over the footer; the blue underneath it is a plain CSS gradient, so white copy never
 * depends on WebGL. Until the image is ready — or without WebGL — that gradient is all
 * there is.
 */

const VERTEX = `
attribute vec2 aPosition;
void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }
`

const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uResolution; // canvas pixels
uniform float uCssPerPixel;
uniform vec2 uDeep;       // deep-blue band: start and end, css px from the page top
uniform float uWidth;     // page width, css px
uniform float uLayer;     // 0 = the sky itself, 1 = far clouds, 2 = near clouds
uniform float uCentre;    // where the middle of the page falls in this layer, css px

// Same colour as the CSS blue under the closing section (#0E62E6).
const vec3 DEEP = vec3(0.0549, 0.3843, 0.9020);
// The canvas thins out over this distance past the band. Long, so the weather carries
// into the closing section and the footer instead of stopping at a colour change.
const float FADE_OUT = 1400.0;

// 2D simplex noise — Ian McEwan, Ashima Arts (MIT).
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

const mat2 ROT = mat2(1.6, 1.2, -1.2, 1.6);

// Billow noise (sum of |noise|): rounded bumps separated by creases, 0..~1.
float billow(vec2 p) {
  float f = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) { f += a * abs(snoise(p)); p = ROT * p + vec2(5.3, 2.9); a *= 0.5; }
  return f;
}

// Smooth fractal noise, about -1..1: the outline of a cloud bank.
float fbm(vec2 p) {
  float f = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) { f += a * snoise(p); p = ROT * p + vec2(3.1, 7.4); a *= 0.5; }
  return f;
}

// The overcast behind everything: wide banks of cloud with blue showing between them.
float bank(vec2 css) {
  vec2 p = css / vec2(1500.0, 950.0);
  return fbm(p + 11.0) + 0.3 * (billow(p * 2.6 + 4.0) - 0.35);
}

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

// One cumulus per grid cell (when present): seven round lobes resting on a flat base,
// the tallest near the middle. Lobes are merged with a smooth maximum so the cloud reads
// as one volume; each lobe is shaded like a sphere lit from the upper left.
// Returns (density, light).
vec2 cumulus(vec2 p, float fluff, float coverage, float deepGain, float cellToCss, float cellYOffset) {
  vec2 cell = floor(p);
  // Upper left, and a little towards the viewer: y runs down the page.
  vec3 sun = normalize(vec3(-0.5, -0.72, 0.48));
  float weight = 0.0;
  float lightSum = 0.0;
  // Lower k, softer maximum: the lobes melt into one mass instead of reading as a pile
  // of balls.
  float k = 7.5;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 c = cell + vec2(float(i), float(j));
      // How far down the page this cell sits. Everything that grows with depth is read
      // here, per cell — read at the fragment, the test flipped in the middle of a cloud
      // and popped it into existence along a straight line.
      float cellCss = (c.y + 0.5 + cellYOffset) * cellToCss;
      float cellLow = smoothstep(0.5, 1.0, clamp(cellCss / max(uDeep.x, 1.0), 0.0, 1.0));
      // Coverage drifts across the page: clusters here, open sky there.
      float cellDeep = smoothstep(uDeep.x, uDeep.y, cellCss);
      if (hash(c + 7.13) > coverage + 0.06 * cellLow + deepGain * cellDeep + 0.22 * snoise(c * 0.37 + 4.0)) continue;
      vec2 base = c + vec2(0.12 + 0.76 * hash(c + 1.1), 0.5 + 0.45 * hash(c + 2.3));
      float size = (0.27 + 0.25 * hash(c + 3.7)) * mix(0.95, 1.05, cellLow);
      float stretch = 0.8 + 0.22 * hash(c + 4.9);  // barely wider than tall, never a smear
      float tall = 0.85 + 0.55 * hash(c + 6.1);
      float lean = 0.5 * (hash(c + 8.3) - 0.5);   // the crown is not always centred
      float ground = base.y - p.y + fluff * 0.35 * size;
      float baseFade = smoothstep(-0.03, 0.14 * size, ground);
      float underside = smoothstep(0.45 * size, -0.02, ground);
      // Four lobes resting on the base and three stacked above them: a cauliflower with a
      // flat bottom, not a row of bumps. Seven bumps side by side is what made the clouds
      // read as wide, flat smears.
      for (int n = 0; n < 7; n++) {
        float fn = float(n);
        float upper = step(3.5, fn);
        float slot = fn - 4.0 * upper;                    // 0..3 on the base, 0..2 above
        float span = mix(3.0, 2.0, upper);
        float u = slot - span * 0.5 + lean * mix(0.5, 1.1, upper);
        float h = hash(c + fn * 1.37);
        float h2 = hash(c + fn * 2.71 + 0.5);
        float crown = 1.0 - 0.2 * abs(u) / max(span * 0.5, 0.5);
        float r = size * (0.46 + 0.32 * h) * mix(1.0, 0.74, upper) * crown;
        vec2 center = base + vec2(u * size * mix(0.44, 0.37, upper) * stretch + (h2 - 0.5) * size * 0.12,
                                  -r * 0.82 - upper * size * (0.52 + 0.28 * h2) * tall);
        vec2 d = (p - center) / r;
        float lobe = mix(-1.0, 1.0 - dot(d, d) + fluff, baseFade);
        // The soft maximum sums every lobe, so far tails still add up; with sixty of them
        // the total crossed the visible threshold, and the cut at the edge of the sampled
        // cells drew a rectangle across a cloud. A lobe now fades out of the sum well
        // before that edge, and the neighbourhood is no longer a border.
        float w = exp(k * lobe) * smoothstep(-0.8, -0.45, lobe);
        weight += w;
        // Each lobe is lit as the ball it stands for — a height over the disc, a real
        // normal, a real lambert term — not as a flat disc with a ramp across it. Where two
        // lobes meet the averaged normal turns away from both, and the crease goes dark on
        // its own: that is what gives the pile its relief.
        float hz = sqrt(max(1.0 - dot(d, d), 0.0));
        vec3 nrm = normalize(vec3(d, hz + 0.25));
        float lambert = clamp(dot(nrm, sun), 0.0, 1.0);
        lightSum += w * mix(0.3, 1.0, lambert) * (1.0 - 0.35 * underside);
      }
    }
  }
  if (weight <= 1e-5) return vec2(-1.0, 0.0);
  return vec2(log(weight) / k, lightSum / weight);
}

void main() {
  // Three passes over the same page: the sky, then each bank of clouds on its own
  // transparent layer. The layers are placed in the document and drift with a CSS
  // transform, so scrolling stays the browser's business and never lags behind the text.
  vec2 css = vec2(gl_FragCoord.x, uResolution.y - gl_FragCoord.y) * uCssPerPixel;

  float wide = smoothstep(500.0, 1200.0, uWidth);
  float deep = smoothstep(uDeep.x, uDeep.y, css.y);
  // Past the band the section's CSS blue shows through. The canvas does not stop dead
  // there: it fades over FADE_OUT px, because a hard alpha edge resamples into a visible
  // dark line when the image is stretched back to page size.
  float openFade = smoothstep(uDeep.y, uDeep.y + FADE_OUT, css.y);

  // The sky deepens as the page goes down: hazy white at the hero, a real blue by the
  // time the closing section arrives (kept light enough for the grey copy on top of it).
  float pageT = clamp(css.y / max(uDeep.x, 1.0), 0.0, 1.0);
  float lower = smoothstep(0.02, 0.55, pageT);
  float lowest = smoothstep(0.5, 1.0, pageT);
  // White clouds need a blue to stand against. The hero opened on 0.83 under a quarter of
  // white haze and a sun glow: with feathered clouds on top, the whole screen read as an
  // off-white ground. It opens on a clear pale blue, and the haze and the glow hold back.
  vec3 sky = mix(vec3(0.735, 0.847, 0.992), vec3(0.678, 0.808, 0.988), lower);
  sky = mix(sky, vec3(0.588, 0.749, 0.976), lowest);
  float haze = smoothstep(0.0, 0.9, snoise(css / 900.0 + 2.0) * 0.5 + 0.5);
  sky = mix(sky, vec3(0.955, 0.972, 1.0), haze * mix(0.13, 0.1, lowest));
  // Sun glow behind the hero.
  float sun = 1.0 - smoothstep(0.0, 1.0, length((css - vec2(uWidth * 0.22, 40.0)) / vec2(760.0, 620.0)));
  sky = mix(sky, vec3(1.0), sun * 0.09 * (1.0 - lower));
  // A cloudy sky, not a blue one with clouds on it: banks fill most of the page and the
  // cumulus in front of them are the detail. The banks are lit from the upper left by
  // comparing the density with the density a step towards the sun — brighter where the
  // cloud thins in that direction — and stay close to white: they are a ground for copy.
  float bankHere = bank(css);
  float bankSun = bank(css + vec2(-70.0, -110.0));
  float mass = smoothstep(-0.34, 0.3, bankHere);
  float massLight = clamp(0.62 + (bankHere - bankSun) * 1.6, 0.0, 1.0);
  vec3 massCol = mix(vec3(0.800, 0.855, 0.955), vec3(0.985, 0.990, 1.0), massLight);
  sky = mix(sky, massCol, mass * 0.9);
  sky = mix(sky, DEEP, deep);
  // Over the deep blue the banks come back as a faint lighter weather, a few points above
  // the base colour, so the white copy keeps its contrast.
  // Wider banks down there, not lighter ones: the lightest point is what the white copy is
  // measured against, so the blue gets more weather by area and none by brightness.
  float deepMass = smoothstep(-0.6, 0.15, bankHere) * 0.52 * deep;
  vec3 deepTint = vec3(0.185, 0.455, 0.93);
  sky = mix(sky, deepTint, deepMass);
  vec4 acc = uLayer > 0.5 ? vec4(0.0) : vec4(sky, 1.0); // premultiplied

  // The weather is much the same from the hero to the footer. It used to gather into a
  // bank of cumulus by the testimonials, a third larger and twice as dense within a
  // screen: the page read as two skies with a seam between them. The unit follows the viewport width so a phone gets its
  // own share of clouds across the screen rather than one vague mass: at a fixed 320px a
  // cloud covered two thirds of a 390px screen and read as haze.
  // One grid for the whole page. It used to be scaled by the fragment's own progression
  // down the page, which stretched every cloud vertically and moved the cell boundaries
  // with the pixel being drawn. Clouds grow with depth through their own size instead.
  float unit = clamp(uWidth * 0.40, 190.0, 520.0);
  float coverage = mix(0.86, 0.92, wide);
  // Calmer sky behind the copy. The plateau covers the content column — headlines sit on
  // its left edge, not in its middle — and the weather keeps its drama in the margins.
  float calm = mix(1.0, 1.0 - smoothstep(0.24, 0.52, abs(css.x - uCentre) / uWidth), wide);
  // The corridor holds in the blue too: that is where the white copy sits, and clouds
  // light enough to read as weather would eat its contrast.
  float calmStrength = mix(0.2, 0.42, wide) * mix(1.0, 1.4, deep);

  // Far layer: smaller, hazier.
  if (uLayer > 0.5 && uLayer < 1.5) {
    vec2 p = css / (unit * 0.55) + vec2(13.0, 5.0);
    float fluff = (billow(p * 3.6) - 0.32) * 0.6 + 0.1 * snoise(p * 1.1 + 7.7);
    // The closing section and the footer get a few more of these small ones: they are close
    // to the blue in value, so they add weather without taking contrast from the white copy.
    vec2 c = cumulus(p, fluff, 0.42, -0.2, unit * 0.55, -5.0);
    float a = smoothstep(-0.3, 0.5, c.x) * mix(0.5, 0.2, deep) * (1.0 - calmStrength * calm);
    vec3 col = mix(mix(vec3(0.860, 0.905, 0.975), vec3(0.985, 0.992, 1.0), clamp(c.y + fluff * 0.35, 0.0, 1.0)),
                   vec3(0.30, 0.52, 0.95), deep);
    // The far bank sits in the haze: it takes a third of the sky's own colour.
    col = mix(col, sky, 0.2 * (1.0 - deep));
    acc = vec4(col * a, a) + acc * (1.0 - a);
  }

  // Near layer: a second bank, finer and drifting in front of the first. It used to be a
  // field of shaded cumulus; over the banks they read as a second, busier texture pasted on
  // the first. Two banks at two scales moving at two speeds give the depth without it.
  if (uLayer > 1.5) {
    vec2 q = css * 1.55 + vec2(2300.0, 900.0);
    float here = bank(q);
    float towardsSun = bank(q + vec2(-60.0, -95.0));
    float body = smoothstep(0.02 - 0.22 * deep, 0.62 - 0.12 * deep, here);
    float light = clamp(0.66 + (here - towardsSun) * 1.4, 0.0, 1.0);
    vec3 col = mix(vec3(0.835, 0.885, 0.965), vec3(0.992, 0.995, 1.0), light);
    col = mix(col, vec3(0.20, 0.47, 0.935), deep);
    float a = body * mix(0.7, 0.3, deep);
    acc = vec4(col * a, a);
  }

  // Dither the opaque part to keep long gradients free of banding.
  if (uLayer < 0.5) acc.rgb += acc.a * (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;
  // Past the band the opaque sky hands over to the CSS blue, but the weather does not go
  // with it. Everything used to thin out together over FADE_OUT, so the clouds were gone by
  // the footer and the page ended on a flat colour under a line. The banks stay as a
  // transparent tint over the CSS blue, and the cloud layers run to the last pixel.
  if (uLayer < 0.5) acc = mix(acc, vec4(deepTint * deepMass, deepMass), openFade);
  gl_FragColor = acc; // premultiplied
}
`

// Canvas pixels per css pixel. The sky is a gradient and loses nothing at half scale; the
// clouds have edges, and at 0.44 under a 3.4M budget a 2560px screen got one texel for
// every 2.4 css pixels — soft shapes turned into visible squares.
const SKY_SCALE = 0.5
const CLOUD_SCALE = 0.75
// Canvas pixels one render may cost, however tall the page is.
const PIXEL_BUDGET = 10_000_000
// Rows drawn per frame, so the one-off render never blocks a frame for long. At 128 a
// layer took thirty-odd frames whatever the GPU, and the three layers came one after the
// other: the reader had scrolled past the hero before its clouds arrived.
const STRIP_ROWS = 512
// A strip slower than this means software rendering: keep the CSS sky instead.
const STRIP_BUDGET_MS = 250
// The cloud layers are wider than the page: they drift sideways, and the edge must never
// come into view.
const CLOUD_OVERSCAN = 1.28
// How far each layer travels, as a share of its own width: keep in sync with the
// `cloud-near` and `cloud-far` keyframes in globals.css.
const CLOUD_DRIFT_NEAR = 0.1
const CLOUD_DRIFT_FAR = 0.06

type SkyLayout = { width: number; height: number; deepStart: number; deepEnd: number }

function measureLayout(host: HTMLElement): SkyLayout {
  const hostTop = host.getBoundingClientRect().top
  const marker = host.querySelector<HTMLElement>('[data-sky-deep]')
  const height = host.offsetHeight
  if (!marker) return { width: host.clientWidth, height, deepStart: height + 1, deepEnd: height + 2 }
  const markerTop = marker.getBoundingClientRect().top - hostTop
  const styles = getComputedStyle(marker)
  const lead = parseFloat(styles.getPropertyValue('--deep-lead')) || 0
  const band = parseFloat(styles.getPropertyValue('--deep-full')) || 200
  return { width: host.clientWidth, height, deepStart: markerTop - lead, deepEnd: markerTop + band }
}

/**
 * The deep blue behind the closing section is drawn twice, and only one of the two shows.
 * The section carries its own copy so white copy is never stranded on a light sky without
 * scripts — but `main` is the view-transition root, and naming it makes it a stacking
 * context, so that copy paints over the sky and the clouds stop dead at the footer. This
 * measures the section and redraws the same gradient out here, a sibling of `main`, where
 * a negative z-index really does land behind the sky; the section's copy then hides.
 */
function placeDeep(host: HTMLElement) {
  const marker = host.querySelector<HTMLElement>('[data-sky-deep]')
  // A page without a closing band — an article, a legal page — must not keep the one
  // measured on the page before it.
  if (!marker) {
    delete host.dataset.deepHoisted
    return
  }
  const rect = marker.getBoundingClientRect()
  const styles = getComputedStyle(marker)
  const lead = parseFloat(styles.getPropertyValue('--deep-lead')) || 0
  const band = parseFloat(styles.getPropertyValue('--deep-full')) || 200
  host.style.setProperty('--deep-top', `${rect.top - host.getBoundingClientRect().top - lead}px`)
  host.style.setProperty('--deep-height', `${rect.height + lead}px`)
  host.style.setProperty('--deep-lead-px', `${lead}px`)
  host.style.setProperty('--deep-full-px', `${band}px`)
  host.dataset.deepHoisted = 'true'
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null
}

const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))

/** Renders one layer of the sky; resolves to an image, or null to keep the CSS sky. */
async function renderLayer(
  layout: SkyLayout,
  isCancelled: () => boolean,
  layer: 0 | 1 | 2,
  size: { width: number; height: number },
  targetScale: number,
): Promise<Blob | null> {
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl', {
    alpha: true,
    premultipliedAlpha: true,
    preserveDrawingBuffer: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'low-power',
    failIfMajorPerformanceCaveat: true,
  })
  if (!gl) return null

  try {
    const maxViewport = gl.getParameter(gl.MAX_VIEWPORT_DIMS) as Int32Array
    const maxSide = Math.min(4096, maxViewport[0], maxViewport[1], gl.getParameter(gl.MAX_RENDERBUFFER_SIZE))
    // A blog article is 10 000px tall, which at half scale is millions of pixels of
    // shader. Past the budget the resolution drops instead; the clouds are soft enough
    // that nothing shows.
    const budget = Math.sqrt(PIXEL_BUDGET / (size.width * size.height))
    const scale = Math.min(targetScale, budget, maxSide / size.height, maxSide / size.width)
    canvas.width = Math.max(1, Math.round(size.width * scale))
    canvas.height = Math.max(1, Math.round(size.height * scale))

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX)
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT)
    const program = gl.createProgram()
    if (!vertex || !fragment || !program) return null
    gl.attachShader(program, vertex)
    gl.attachShader(program, fragment)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null
    gl.useProgram(program)

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, 'aPosition')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    gl.uniform2f(gl.getUniformLocation(program, 'uResolution'), canvas.width, canvas.height)
    gl.uniform1f(gl.getUniformLocation(program, 'uCssPerPixel'), size.width / canvas.width)
    gl.uniform2f(gl.getUniformLocation(program, 'uDeep'), layout.deepStart, layout.deepEnd)
    gl.uniform1f(gl.getUniformLocation(program, 'uWidth'), layout.width)
    gl.uniform1f(gl.getUniformLocation(program, 'uLayer'), layer)
    // A cloud layer is wider than the page, starts left of it and drifts further left, so
    // the middle of the page is not the middle of the layer. Read as if it were, the calm
    // corridor sat a third of the way across and the headline stood in the thick of it.
    const drift = layer === 2 ? CLOUD_DRIFT_NEAR : layer === 1 ? CLOUD_DRIFT_FAR : 0
    gl.uniform1f(gl.getUniformLocation(program, 'uCentre'), size.width * (0.5 + drift / 2))
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.enable(gl.SCISSOR_TEST)

    // Top strips first (GL rows count from the bottom).
    for (let top = 0; top < canvas.height; top += STRIP_ROWS) {
      if (isCancelled() || gl.isContextLost()) return null
      const rows = Math.min(STRIP_ROWS, canvas.height - top)
      const started = performance.now()
      gl.scissor(0, canvas.height - top - rows, canvas.width, rows)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      gl.finish()
      if (performance.now() - started > STRIP_BUDGET_MS) return null
      await nextFrame()
    }
    if (isCancelled() || gl.isContextLost()) return null

    // The image never travels — it is encoded to be decoded again in the same tab — so its
    // weight is not a cost. At 0.74 the clouds came back with blocks and coloured fringes
    // along their feathered edges, plain to see over the deep blue.
    const quality = layer === 0 ? 0.9 : 0.95
    return await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/webp', quality))
  } finally {
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  }
}

/**
 * The sky is three layers pinned to the document: the sky itself, then two banks of cloud
 * on transparent ground. Scrolling is left entirely to the browser — a canvas redrawn in
 * JavaScript always trails the text by a frame — and the clouds move on their own, with a
 * CSS transform the compositor animates without asking the main thread for anything.
 */
export default function SkyBackground() {
  const skyRef = useRef<HTMLDivElement>(null)
  const farRef = useRef<HTMLDivElement>(null)
  const nearRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // The blue band follows the layout, not the render: it must be in place before the
  // first paint of a new page, and it must stay right even where the sky never renders.
  useEffect(() => {
    const host = skyRef.current?.parentElement
    if (!host) return
    placeDeep(host)
    const observer = new ResizeObserver(() => placeDeep(host))
    observer.observe(host)
    return () => observer.disconnect()
  }, [pathname])

  useEffect(() => {
    const sky = skyRef.current
    const far = farRef.current
    const near = nearRef.current
    const host = sky?.parentElement
    if (!sky || !far || !near || !host) return

    let disposed = false
    let running = false
    let queued = false
    let renderedKey = ''
    let debounce = 0
    const urls = new Map<HTMLElement, string>()

    // The image is laid at the height it was rendered for, not stretched to the host: when
    // the page grows after the render (a picture arrives, a font swaps) every cloud used to
    // be pulled taller until the next one landed.
    const show = async (element: HTMLElement, blob: Blob, height: number) => {
      const url = URL.createObjectURL(blob)
      const image = new Image()
      image.src = url
      try {
        await image.decode()
      } catch {
        URL.revokeObjectURL(url)
        return
      }
      if (disposed) {
        URL.revokeObjectURL(url)
        return
      }
      element.style.backgroundImage = `url("${url}")`
      element.style.backgroundSize = `100% ${height}px`
      element.dataset.ready = 'true'
      const previous = urls.get(element)
      if (previous) URL.revokeObjectURL(previous)
      urls.set(element, url)
    }

    const run = async () => {
      if (running) {
        queued = true
        return
      }
      const layout = measureLayout(host)
      // Rounded so sub-pixel reflows don't trigger a new render.
      const key = [layout.width, layout.height, layout.deepStart, layout.deepEnd].map((v) => Math.round(v / 4)).join(':')
      if (key === renderedKey) return
      running = true

      const pageSize = { width: layout.width, height: layout.height }
      const cloudSize = { width: layout.width * CLOUD_OVERSCAN, height: layout.height }

      // The sky first: it carries the cloud banks, which are most of what there is to see,
      // and at half scale it is the quickest of the three to draw.
      const skyBlob = await renderLayer(layout, () => disposed, 0, pageSize, SKY_SCALE)
      if (!skyBlob) {
        // No usable GPU: the CSS sky stays, and there is no point retrying on resize.
        running = false
        resizeObserver.disconnect()
        return
      }
      await show(sky, skyBlob, layout.height)
      const nearBlob = await renderLayer(layout, () => disposed, 2, cloudSize, CLOUD_SCALE)
      const farBlob = await renderLayer(layout, () => disposed, 1, cloudSize, CLOUD_SCALE)
      // The two banks of cloud come in together, on one slow fade. One after the other,
      // each on a short one, the sky changed three times in two seconds under the hero.
      await Promise.all([
        nearBlob ? show(near, nearBlob, layout.height) : null,
        farBlob ? show(far, farBlob, layout.height) : null,
      ])

      running = false
      if (disposed) return
      renderedKey = key
      if (queued) {
        queued = false
        run()
      }
    }

    const schedule = () => {
      window.clearTimeout(debounce)
      debounce = window.setTimeout(run, 250)
    }
    const resizeObserver = new ResizeObserver(schedule)

    // Wait for web fonts so the first render matches the final layout.
    document.fonts.ready.then(() => {
      if (disposed) return
      run()
      resizeObserver.observe(host)
    })

    return () => {
      disposed = true
      window.clearTimeout(debounce)
      resizeObserver.disconnect()
      urls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  return (
    <>
      <div aria-hidden="true" className="sky-deep pointer-events-none" />
      <div
        ref={skyRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-no-repeat opacity-0 transition-opacity duration-700 ease-out data-[ready=true]:opacity-100"
      />
      <div
        ref={farRef}
        aria-hidden="true"
        className="sky-far pointer-events-none absolute inset-y-0 -left-[14%] -z-10 w-[128%] bg-no-repeat opacity-0 transition-opacity duration-[1400ms] ease-out data-[ready=true]:opacity-100"
      />
      <div
        ref={nearRef}
        aria-hidden="true"
        className="sky-near pointer-events-none absolute inset-y-0 -left-[14%] -z-10 w-[128%] bg-no-repeat opacity-0 transition-opacity duration-[1400ms] ease-out data-[ready=true]:opacity-100"
      />
    </>
  )
}
