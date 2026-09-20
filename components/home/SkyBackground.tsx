'use client'

import { useEffect, useRef } from 'react'

/**
 * Procedural cloudy sky for the home page, rendered once for the whole page height
 * and shown as a plain image that scrolls with the content (no parallax, no work
 * while scrolling, nothing left to lose if the GPU context goes away).
 *
 * Each cloud is a cumulus built from round lobes resting on a flat base, merged with a
 * smooth maximum and roughened with billow noise; lobes are shaded as if lit from the
 * upper left. The grid the clouds are placed on is warped and thinned by noise so it
 * does not read as a pattern. From the element marked `data-sky-deep` the sky blends
 * into deep blue between `--deep-lead` px above it and `--deep-full` px below, then turns
 * transparent: past that point
 * the blue is the section's own CSS background, so white copy never depends on WebGL.
 * Until the image is ready — or without WebGL — the page's CSS gradients show.
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
uniform float uScroll;    // how far the page is scrolled, css px
uniform float uTime;      // seconds since the sky started, for the drift

// Same colour as the CSS blue under the closing section (#0E62E6).
const vec3 DEEP = vec3(0.0549, 0.3843, 0.9020);
const float FADE_OUT = 900.0;
// css px per second. Real cumulus cross a window in a couple of minutes; anything faster
// reads as a screensaver.
const float NEAR_DRIFT = 11.0;
const float FAR_DRIFT = 6.0;

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

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

// One cumulus per grid cell (when present): seven round lobes resting on a flat base,
// the tallest near the middle. Lobes are merged with a smooth maximum so the cloud reads
// as one volume; each lobe is shaded like a sphere lit from the upper left.
// Returns (density, light).
vec2 cumulus(vec2 p, float fluff, float coverage, float cellToCss, float cellYOffset) {
  vec2 cell = floor(p);
  vec2 sun = normalize(vec2(-0.45, -1.0));
  float weight = 0.0;
  float lightSum = 0.0;
  float k = 11.0;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 c = cell + vec2(float(i), float(j));
      // How far down the page this cell sits. Everything that grows with depth is read
      // here, per cell — read at the fragment, the test flipped in the middle of a cloud
      // and popped it into existence along a straight line.
      float cellCss = (c.y + 0.5 + cellYOffset) * cellToCss;
      float cellLow = smoothstep(0.5, 1.0, clamp(cellCss / max(uDeep.x, 1.0), 0.0, 1.0));
      // Coverage drifts across the page: clusters here, open sky there.
      if (hash(c + 7.13) > coverage + 0.1 * cellLow + 0.22 * snoise(c * 0.37 + 4.0)) continue;
      vec2 base = c + vec2(0.25 + 0.5 * hash(c + 1.1), 0.62 + 0.25 * hash(c + 2.3));
      float size = (0.2 + 0.22 * hash(c + 3.7)) * mix(0.86, 1.22, cellLow);
      float stretch = 0.8 + 0.8 * hash(c + 4.9);  // wide, low banks … compact towers
      float tall = 0.7 + 0.6 * hash(c + 6.1);
      float lean = hash(c + 8.3) - 0.5;          // the tallest lobe is not always centred
      float ground = base.y - p.y + fluff * 0.35 * size;
      float baseFade = smoothstep(-0.03, 0.14 * size, ground);
      float underside = smoothstep(0.45 * size, -0.02, ground);
      for (int n = 0; n < 7; n++) {
        float fn = float(n) - 3.0;
        float h = hash(c + float(n) * 1.37);
        float h2 = hash(c + float(n) * 2.71 + 0.5);
        float peak = 1.0 - 0.17 * abs(fn - lean * 2.0);
        float r = size * (0.5 + 0.38 * h) * peak;
        vec2 center = base + vec2(fn * size * 0.34 * stretch + (h2 - 0.5) * size * 0.2,
                                  -r * 0.7 - max(peak, 0.0) * size * 0.28 * tall);
        vec2 d = (p - center) / r;
        float lobe = mix(-1.0, 1.0 - dot(d, d) + fluff, baseFade);
        // The soft maximum sums every lobe, so far tails still add up; with sixty of them
        // the total crossed the visible threshold, and the cut at the edge of the sampled
        // cells drew a rectangle across a cloud. A lobe now fades out of the sum well
        // before that edge, and the neighbourhood is no longer a border.
        float w = exp(k * lobe) * smoothstep(-0.8, -0.45, lobe);
        weight += w;
        lightSum += w * (0.5 + 0.5 * dot(d, sun)) * (1.0 - 0.45 * underside);
      }
    }
  }
  if (weight <= 1e-5) return vec2(-1.0, 0.0);
  return vec2(log(weight) / k, lightSum / weight);
}

void main() {
  // The canvas covers the window, the sky belongs to the document: adding the scroll puts
  // every cloud back at its place on the page, so the sky still travels with the text
  // while the wind keeps blowing through it.
  vec2 css = vec2(gl_FragCoord.x, uResolution.y - gl_FragCoord.y) * uCssPerPixel;
  css.y += uScroll;
  float xn = css.x / uWidth;

  float wide = smoothstep(500.0, 1200.0, uWidth);
  float deep = smoothstep(uDeep.x, uDeep.y, css.y);
  // Past the band the section's CSS blue shows through. The canvas does not stop dead
  // there: it fades over FADE_OUT px, because a hard alpha edge resamples into a visible
  // dark line when the image is stretched back to page size.
  float openFade = smoothstep(uDeep.y, uDeep.y + FADE_OUT, css.y);
  bool open = openFade >= 1.0;

  // The sky deepens as the page goes down: hazy white at the hero, a real blue by the
  // time the closing section arrives (kept light enough for the grey copy on top of it).
  float pageT = clamp(css.y / max(uDeep.x, 1.0), 0.0, 1.0);
  float lower = smoothstep(0.02, 0.55, pageT);
  float lowest = smoothstep(0.5, 1.0, pageT);
  // The hero sky used to start at 0.93 — near white, so white clouds had nothing to stand
  // against. It now opens on a real, if pale, blue, and the haze whitens it less.
  vec3 sky = mix(vec3(0.827, 0.898, 0.996), vec3(0.678, 0.808, 0.988), lower);
  sky = mix(sky, vec3(0.588, 0.749, 0.976), lowest);
  float haze = smoothstep(0.0, 0.9, snoise(css / 900.0 + 2.0) * 0.5 + 0.5);
  sky = mix(sky, vec3(0.955, 0.972, 1.0), haze * mix(0.24, 0.12, lowest));
  // Sun glow behind the hero.
  float sun = 1.0 - smoothstep(0.0, 1.0, length((css - vec2(uWidth * 0.22, 40.0)) / vec2(760.0, 620.0)));
  sky = mix(sky, vec3(1.0), sun * 0.16 * (1.0 - lower));
  sky = mix(sky, DEEP, deep);
  vec4 acc = open ? vec4(0.0) : vec4(sky, 1.0); // premultiplied

  // Clouds grow and gather as the page goes down: high and sparse at the hero, a bank of
  // cumulus by the testimonials. The unit follows the viewport width so a phone gets its
  // own share of clouds across the screen rather than one vague mass: at a fixed 320px a
  // cloud covered two thirds of a 390px screen and read as haze.
  // One grid for the whole page. It used to be scaled by the fragment's own progression
  // down the page, which stretched every cloud vertically and moved the cell boundaries
  // with the pixel being drawn. Clouds grow with depth through their own size instead.
  float unit = clamp(uWidth * 0.55, 230.0, 560.0);
  float coverage = mix(0.60, 0.64, wide);
  // Calmer sky behind the copy. The plateau covers the content column — headlines sit on
  // its left edge, not in its middle — and the weather keeps its drama in the margins.
  float calm = mix(1.0, 1.0 - smoothstep(0.24, 0.52, abs(xn - 0.5)), wide);
  float calmStrength = mix(0.24, 0.36, wide) * (1.0 - deep);

  // Far layer: smaller, hazier.
  {
    vec2 p = css / (unit * 0.55) + vec2(13.0, 5.0);
    p.x -= uTime * FAR_DRIFT / (unit * 0.55);
    p += 0.35 * vec2(snoise(p * 0.21 + 3.1 + uTime * 0.006), snoise(p * 0.21 + 9.7 + uTime * 0.004));
    float fluff = (billow(p * 3.6) - 0.32) * 0.6;
    vec2 c = cumulus(p, fluff, coverage - 0.1, unit * 0.55, -5.0);
    float a = smoothstep(0.0, 0.3, c.x) * mix(0.5, 0.16, deep) * (1.0 - calmStrength * calm);
    vec3 col = mix(mix(vec3(0.792, 0.867, 0.973), vec3(0.985, 0.992, 1.0), clamp(c.y + fluff * 0.35, 0.0, 1.0)),
                   vec3(0.32, 0.53, 0.94), deep);
    acc = vec4(col * a, a) + acc * (1.0 - a);
  }

  // Main layer.
  {
    vec2 p = css / unit;
    p.x -= uTime * NEAR_DRIFT / unit;
    p += 0.4 * vec2(snoise(p * 0.19 + 1.3 + uTime * 0.008), snoise(p * 0.19 + 6.1 + uTime * 0.005));
    float fluff = (billow(p * 4.2) - 0.32) * 0.6;
    float grain = billow(p * 6.5 + 3.0);
    vec2 c = cumulus(p, fluff, coverage, unit, 0.0);
    float body = smoothstep(0.0, mix(0.24, 0.36, deep), c.x);
    // Over the deep blue, clouds stay faint so white copy keeps at least 4.5:1.
    float a = body * mix(mix(0.9, 1.0, wide), 0.42, deep) * (1.0 - calmStrength * calm);
    vec3 lit = mix(vec3(1.0, 1.0, 0.995), vec3(0.27, 0.49, 0.92), deep);
    vec3 shade = mix(vec3(0.717, 0.804, 0.941), vec3(0.20, 0.41, 0.88), deep);
    vec3 cloud = mix(shade, lit, clamp(c.y + fluff * 0.2 + (grain - 0.3) * 0.2, 0.0, 1.0));
    cloud = mix(cloud, lit, smoothstep(0.35, 0.8, c.x) * 0.15);
    acc = vec4(cloud * a, a) + acc * (1.0 - a);
  }

  // Dither the opaque part to keep long gradients free of banding.
  if (!open) acc.rgb += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;
  gl_FragColor = acc * (1.0 - openFade); // premultiplied, so one factor fades colour and alpha together
}
`

// Canvas pixels per css pixel. The clouds are soft, so half resolution costs nothing to
// look at and buys the frame rate that makes them move.
const START_SCALE = 0.5
const MIN_SCALE = 0.24
// Frames per second: a cloud crossing a window in two minutes does not need sixty.
const TARGET_FPS = 30
const SLOW_FPS = 10
// A phone does not need the same sky as a workstation, and it pays for it in battery.
const SMALL_DEVICE_FPS = 20
const SMALL_DEVICE_SCALE = 0.34
// A frame slower than this means the machine cannot afford the sky at this size.
const FRAME_BUDGET_MS = 26

type SkyLayout = { width: number; deepStart: number; deepEnd: number }

/** Where the page turns deep blue, in document pixels. */
function measureLayout(host: HTMLElement): SkyLayout {
  const width = host.clientWidth
  const marker = host.querySelector<HTMLElement>('[data-sky-deep]')
  const height = host.offsetHeight
  if (!marker) return { width, deepStart: height + 1, deepEnd: height + 2 }
  const markerTop = marker.getBoundingClientRect().top + window.scrollY
  const styles = getComputedStyle(marker)
  const lead = parseFloat(styles.getPropertyValue('--deep-lead')) || 0
  const band = parseFloat(styles.getPropertyValue('--deep-full')) || 200
  return { width, deepStart: markerTop - lead, deepEnd: markerTop + band }
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null
}

/**
 * A live sky. The canvas covers the window and is redrawn every frame with the page's
 * scroll offset, so the clouds stay anchored to the document — they never slide against
 * the text — while the wind moves them sideways and their shapes turn over slowly.
 *
 * It costs a frame, so it gives up gracefully: it drops resolution, then frame rate, and
 * with reduced motion it draws once and stops. Without WebGL the CSS sky stays.
 */
export default function SkyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    if (!canvas || !host) return

    const gl = canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
      failIfMajorPerformanceCaveat: true,
    })
    if (!gl) return

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX)
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT)
    const program = gl.createProgram()
    if (!vertex || !fragment || !program) return
    gl.attachShader(program, vertex)
    gl.attachShader(program, fragment)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, 'aPosition')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const uniform = (name: string) => gl.getUniformLocation(program, name)
    const uResolution = uniform('uResolution')
    const uCssPerPixel = uniform('uCssPerPixel')
    const uDeep = uniform('uDeep')
    const uWidth = uniform('uWidth')
    const uScroll = uniform('uScroll')
    const uTime = uniform('uTime')

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const small =
      window.matchMedia('(pointer: coarse)').matches || (navigator.hardwareConcurrency ?? 8) <= 4
    let scale = small ? SMALL_DEVICE_SCALE : START_SCALE
    let layout = measureLayout(host)
    let disposed = false
    let raf = 0
    let last = -Infinity
    let started = 0
    let slowFrames = 0
    let frames = 0
    let interval = 1000 / (small ? SMALL_DEVICE_FPS : TARGET_FPS)
    let stillCleanup: (() => void) | null = null

    const resize = () => {
      const width = Math.max(1, Math.round(window.innerWidth * scale))
      const height = Math.max(1, Math.round(window.innerHeight * scale))
      if (canvas.width === width && canvas.height === height) return
      canvas.width = width
      canvas.height = height
      gl.viewport(0, 0, width, height)
    }

    const draw = (seconds: number) => {
      gl.uniform2f(uResolution, canvas.width, canvas.height)
      gl.uniform1f(uCssPerPixel, window.innerWidth / canvas.width)
      gl.uniform2f(uDeep, layout.deepStart, layout.deepEnd)
      gl.uniform1f(uWidth, layout.width)
      gl.uniform1f(uScroll, window.scrollY)
      gl.uniform1f(uTime, seconds)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      canvas.dataset.ready = 'true'
    }

    const frame = (now: number) => {
      if (disposed) return
      raf = requestAnimationFrame(frame)
      if (now - last < interval) return
      last = now
      if (document.hidden) return
      resize()
      // gl.finish() is what turns a draw into a blocking task, so the cost is sampled once
      // in a while rather than every frame; the rest of the time the GPU is left alone.
      // Sample early, so a machine that cannot afford this size finds out in a second.
      const measuring = frames === 4 || frames % 40 === 0
      frames += 1
      const t0 = measuring ? performance.now() : 0
      draw((now - started) / 1000)
      if (!measuring) return
      gl.finish()
      const cost = performance.now() - t0
      // Too slow: give up resolution first, then frame rate. The sky never disappears.
      if (cost > FRAME_BUDGET_MS) {
        slowFrames += 1
        if (slowFrames > 1) {
          slowFrames = 0
          if (scale > MIN_SCALE) scale = Math.max(MIN_SCALE, scale * 0.72)
          else interval = 1000 / SLOW_FPS
        }
      } else if (slowFrames > 0) {
        slowFrames -= 1
      }
    }

    const remeasure = () => {
      layout = measureLayout(host)
    }
    const observer = new ResizeObserver(remeasure)
    observer.observe(host)
    window.addEventListener('resize', remeasure)

    if (reduced.matches) {
      // Nothing moves on its own, but the canvas is fixed to the window: without a redraw
      // on scroll the sky would hang there while the page slid under it — the parallax we
      // are careful never to show.
      const still = () => {
        if (disposed) return
        resize()
        draw(0)
      }
      still()
      let pending = 0
      const onScroll = () => {
        if (pending) return
        pending = requestAnimationFrame(() => {
          pending = 0
          still()
        })
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
      stillCleanup = () => {
        cancelAnimationFrame(pending)
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
      }
    } else {
      started = performance.now()
      raf = requestAnimationFrame(frame)
    }

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      stillCleanup?.()
      observer.disconnect()
      window.removeEventListener('resize', remeasure)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-0 transition-opacity duration-700 data-[ready=true]:opacity-100"
    />
  )
}
