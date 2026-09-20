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
 * into deep blue over `--deep-full` pixels, then turns transparent: past that point
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
uniform float uMode;      // 0 = the page sky, 1 = the drifting wisps over the hero

// Same colour as the CSS blue under the closing section (#0E62E6).
const vec3 DEEP = vec3(0.0549, 0.3843, 0.9020);

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
vec2 cumulus(vec2 p, float fluff, float coverage) {
  vec2 cell = floor(p);
  vec2 sun = normalize(vec2(-0.45, -1.0));
  float weight = 0.0;
  float lightSum = 0.0;
  float k = 9.0;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 c = cell + vec2(float(i), float(j));
      // Coverage drifts across the page: clusters here, open sky there.
      if (hash(c + 7.13) > coverage + 0.22 * snoise(c * 0.37 + 4.0)) continue;
      vec2 base = c + vec2(0.25 + 0.5 * hash(c + 1.1), 0.62 + 0.25 * hash(c + 2.3));
      float size = 0.2 + 0.22 * hash(c + 3.7);
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
        float w = exp(k * lobe);
        weight += w;
        lightSum += w * (0.5 + 0.5 * dot(d, sun)) * (1.0 - 0.45 * underside);
      }
    }
  }
  if (weight <= 0.0) return vec2(-1.0, 0.0);
  return vec2(log(weight) / k, lightSum / weight);
}

void main() {
  vec2 css = vec2(gl_FragCoord.x, uResolution.y - gl_FragCoord.y) * uCssPerPixel;
  float xn = css.x / uWidth;

  // Drifting layer: high, stretched wisps on transparent ground, fading out at every edge
  // so the strip has no visible border as it moves.
  if (uMode > 0.5) {
    float height = uResolution.y * uCssPerPixel;
    vec2 p = css / vec2(clamp(uWidth * 0.75, 420.0, 1100.0), clamp(uWidth * 0.2, 130.0, 300.0));
    p += 0.3 * vec2(snoise(p * 0.3 + 5.5), snoise(p * 0.3 + 2.2));
    float fluff = (billow(p * 2.4) - 0.32) * 0.7;
    vec2 c = cumulus(p, fluff, 0.42);
    float a = smoothstep(0.0, 0.45, c.x) * 0.5;
    a *= smoothstep(0.0, 0.14, xn) * smoothstep(1.0, 0.86, xn);
    a *= smoothstep(0.0, 0.18, css.y / height) * smoothstep(1.0, 0.55, css.y / height);
    vec3 col = mix(vec3(0.86, 0.91, 0.98), vec3(1.0), clamp(c.y + fluff * 0.4, 0.0, 1.0));
    gl_FragColor = vec4(col * a, a);
    return;
  }

  float wide = smoothstep(500.0, 1200.0, uWidth);
  float deep = smoothstep(uDeep.x, uDeep.y, css.y);
  bool open = css.y >= uDeep.y; // past the band the section's CSS blue shows through

  // The sky deepens as the page goes down: hazy white at the hero, a real blue by the
  // time the closing section arrives (kept light enough for the grey copy on top of it).
  float pageT = clamp(css.y / max(uDeep.x, 1.0), 0.0, 1.0);
  float lower = smoothstep(0.02, 0.55, pageT);
  float lowest = smoothstep(0.5, 1.0, pageT);
  vec3 sky = mix(vec3(0.93, 0.955, 1.0), vec3(0.80, 0.88, 0.99), lower);
  sky = mix(sky, vec3(0.74, 0.85, 0.98), lowest);
  float haze = smoothstep(0.0, 0.9, snoise(css / 900.0 + 2.0) * 0.5 + 0.5);
  sky = mix(sky, vec3(0.97, 0.98, 1.0), haze * mix(0.35, 0.16, lowest));
  // Sun glow behind the hero.
  float sun = 1.0 - smoothstep(0.0, 1.0, length((css - vec2(uWidth * 0.22, 40.0)) / vec2(760.0, 620.0)));
  sky = mix(sky, vec3(1.0), sun * 0.16 * (1.0 - lower));
  sky = mix(sky, DEEP, deep);
  vec4 acc = open ? vec4(0.0) : vec4(sky, 1.0); // premultiplied

  // Clouds grow and gather as the page goes down: high and sparse at the hero, a bank of
  // cumulus by the testimonials.
  float unit = clamp(uWidth * 0.4, 320.0, 560.0) * mix(0.82, 1.25, pageT);
  float coverage = mix(0.55, 0.64, wide) + 0.1 * lowest;
  // Calmer sky behind copy: a centred column on wide screens, everywhere on phones.
  float calm = mix(1.0, 1.0 - smoothstep(0.1, 0.42, abs(xn - 0.5)), wide);
  float calmStrength = mix(0.22, 0.34, wide) * (1.0 - deep);

  // Far layer: smaller, hazier.
  {
    vec2 p = css / (unit * 0.55) + vec2(13.0, 5.0);
    p += 0.35 * vec2(snoise(p * 0.21 + 3.1), snoise(p * 0.21 + 9.7));
    float fluff = (billow(p * 3.6) - 0.32) * 0.6;
    vec2 c = cumulus(p, fluff, coverage - 0.1);
    float a = smoothstep(0.0, 0.3, c.x) * mix(0.5, 0.1, deep) * (1.0 - calmStrength * calm);
    vec3 col = mix(mix(vec3(0.84, 0.89, 0.97), vec3(0.98, 0.99, 1.0), clamp(c.y + fluff * 0.35, 0.0, 1.0)),
                   vec3(0.32, 0.53, 0.94), deep);
    acc = vec4(col * a, a) + acc * (1.0 - a);
  }

  // Main layer.
  {
    vec2 p = css / unit;
    p += 0.4 * vec2(snoise(p * 0.19 + 1.3), snoise(p * 0.19 + 6.1));
    float fluff = (billow(p * 4.2) - 0.32) * 0.6;
    float grain = billow(p * 6.5 + 3.0);
    vec2 c = cumulus(p, fluff, coverage);
    float body = smoothstep(0.0, mix(0.24, 0.36, deep), c.x);
    // Over the deep blue, clouds stay faint so white copy keeps at least 4.5:1.
    float a = body * mix(mix(0.9, 1.0, wide), 0.32, deep) * (1.0 - calmStrength * calm);
    vec3 lit = mix(vec3(1.0, 1.0, 0.995), vec3(0.32, 0.53, 0.94), deep);
    vec3 shade = mix(vec3(0.76, 0.82, 0.93), vec3(0.26, 0.45, 0.90), deep);
    vec3 cloud = mix(shade, lit, clamp(c.y + fluff * 0.2 + (grain - 0.3) * 0.2, 0.0, 1.0));
    cloud = mix(cloud, lit, smoothstep(0.35, 0.8, c.x) * 0.15);
    acc = vec4(cloud * a, a) + acc * (1.0 - a);
  }

  // Dither the opaque part to keep long gradients free of banding.
  if (!open) acc.rgb += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;
  gl_FragColor = acc;
}
`

// Canvas pixels per css pixel; soft clouds lose nothing at this resolution.
const RENDER_SCALE = 0.5
// Rows drawn per frame, so the one-off render never blocks a frame for long.
const STRIP_ROWS = 128
// A strip slower than this means software rendering: keep the CSS sky instead.
const STRIP_BUDGET_MS = 250

type SkyLayout = { width: number; height: number; deepStart: number; deepEnd: number }
// The drifting layer is wider than the page so the sideways motion never shows its edge.
const DRIFT_OVERSCAN = 1.12

function measureLayout(host: HTMLElement): SkyLayout {
  const hostTop = host.getBoundingClientRect().top
  const marker = host.querySelector<HTMLElement>('[data-sky-deep]')
  const height = host.offsetHeight
  if (!marker) return { width: host.clientWidth, height, deepStart: height + 1, deepEnd: height + 2 }
  const deepStart = marker.getBoundingClientRect().top - hostTop
  const band = parseFloat(getComputedStyle(marker).getPropertyValue('--deep-full')) || 200
  return { width: host.clientWidth, height, deepStart, deepEnd: deepStart + band }
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null
}

const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))

/** Renders a sky layer; resolves to an image, or null to keep the CSS sky. */
async function renderSky(
  layout: SkyLayout,
  isCancelled: () => boolean,
  mode: 0 | 1 = 0,
  size = { width: layout.width, height: layout.height },
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
    const scale = Math.min(RENDER_SCALE, maxSide / size.height, maxSide / size.width)
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
    gl.uniform1f(gl.getUniformLocation(program, 'uWidth'), size.width)
    gl.uniform1f(gl.getUniformLocation(program, 'uMode'), mode)
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

    return await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/webp', 0.9))
  } finally {
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  }
}

export default function SkyBackground() {
  const layerRef = useRef<HTMLDivElement>(null)
  const driftRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const layer = layerRef.current
    const drift = driftRef.current
    const host = layer?.parentElement
    if (!layer || !drift || !host) return

    let disposed = false
    let running = false
    let queued = false
    let renderedKey = ''
    let imageUrl: string | null = null
    let driftUrl: string | null = null
    let debounce = 0

    const show = async (element: HTMLElement, blob: Blob, previous: string | null) => {
      const url = URL.createObjectURL(blob)
      const image = new Image()
      image.src = url
      try {
        await image.decode()
      } catch {
        URL.revokeObjectURL(url)
        return previous
      }
      if (disposed) {
        URL.revokeObjectURL(url)
        return previous
      }
      element.style.backgroundImage = `url("${url}")`
      element.dataset.ready = 'true'
      if (previous) URL.revokeObjectURL(previous)
      return url
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
      const blob = await renderSky(layout, () => disposed)
      if (!blob) {
        // No usable GPU: the CSS sky stays, and there is no point retrying on resize.
        running = false
        resizeObserver.disconnect()
        return
      }
      const driftSize = { width: layout.width * DRIFT_OVERSCAN, height: drift.offsetHeight }
      const driftBlob = await renderSky(layout, () => disposed, 1, driftSize)
      running = false
      if (disposed) return
      imageUrl = await show(layer, blob, imageUrl)
      if (driftBlob) driftUrl = await show(drift, driftBlob, driftUrl)
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
      if (imageUrl) URL.revokeObjectURL(imageUrl)
      if (driftUrl) URL.revokeObjectURL(driftUrl)
    }
  }, [])

  return (
    <>
      <div
        ref={layerRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-no-repeat opacity-0 transition-opacity duration-700 [background-size:100%_100%] data-[ready=true]:opacity-100"
      />
      <div
        ref={driftRef}
        aria-hidden="true"
        className="sky-drift pointer-events-none absolute -left-[6%] top-0 -z-10 h-[820px] w-[112%] bg-no-repeat opacity-0 transition-opacity duration-1000 [background-size:100%_100%] data-[ready=true]:opacity-100 md:h-[1000px]"
      />
    </>
  )
}
