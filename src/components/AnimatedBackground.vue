<script setup>
const particles = [
  { x: 6, y: 14, size: 2, tone: 'lime', duration: 17, delay: -4 },
  { x: 13, y: 31, size: 1, tone: 'gold', duration: 23, delay: -11 },
  { x: 18, y: 68, size: 2, tone: 'white', duration: 19, delay: -7 },
  { x: 24, y: 9, size: 1, tone: 'gold', duration: 27, delay: -18 },
  { x: 29, y: 47, size: 2, tone: 'lime', duration: 21, delay: -3 },
  { x: 34, y: 79, size: 1, tone: 'white', duration: 25, delay: -14 },
  { x: 39, y: 22, size: 2, tone: 'gold', duration: 18, delay: -9 },
  { x: 44, y: 58, size: 1, tone: 'lime', duration: 29, delay: -22 },
  { x: 49, y: 12, size: 1, tone: 'white', duration: 20, delay: -6 },
  { x: 53, y: 86, size: 2, tone: 'gold', duration: 24, delay: -16 },
  { x: 58, y: 35, size: 1, tone: 'lime', duration: 26, delay: -2 },
  { x: 63, y: 71, size: 2, tone: 'white', duration: 16, delay: -10 },
  { x: 68, y: 18, size: 1, tone: 'gold', duration: 31, delay: -20 },
  { x: 72, y: 51, size: 2, tone: 'lime', duration: 22, delay: -5 },
  { x: 77, y: 91, size: 1, tone: 'white', duration: 28, delay: -13 },
  { x: 82, y: 29, size: 2, tone: 'gold', duration: 19, delay: -8 },
  { x: 87, y: 63, size: 1, tone: 'lime', duration: 24, delay: -17 },
  { x: 92, y: 11, size: 2, tone: 'white', duration: 26, delay: -1 },
  { x: 96, y: 43, size: 1, tone: 'gold', duration: 20, delay: -12 },
  { x: 9, y: 87, size: 1, tone: 'lime', duration: 30, delay: -21 },
  { x: 22, y: 55, size: 2, tone: 'gold', duration: 18, delay: -6 },
  { x: 47, y: 31, size: 1, tone: 'white', duration: 23, delay: -15 },
  { x: 74, y: 77, size: 2, tone: 'lime', duration: 27, delay: -19 },
  { x: 89, y: 83, size: 1, tone: 'gold', duration: 32, delay: -24 },
]
</script>

<template>
  <div class="animated-background" aria-hidden="true">
    <div class="background-base"></div>
    <div class="background-grid"></div>
    <div class="light-bloom bloom-lime-top"></div>
    <div class="light-bloom bloom-lime-bottom"></div>
    <div class="light-bloom bloom-gold-top"></div>
    <div class="light-bloom bloom-gold-bottom"></div>
    <div class="light-bloom bloom-teal"></div>

    <svg class="light-trails trails-left" viewBox="0 0 420 900" preserveAspectRatio="none">
      <defs><linearGradient id="trailLeft" x1="0" x2="1"><stop offset="0" stop-color="#c9a85c" stop-opacity="0" /><stop offset=".48" stop-color="#c9a85c" stop-opacity=".55" /><stop offset="1" stop-color="#c9a85c" stop-opacity="0" /></linearGradient></defs>
      <path d="M-40 110 C160 190 160 340 20 480 S-20 760 180 930" stroke="url(#trailLeft)" />
      <path d="M-80 180 C100 270 110 410 -5 520 S40 760 230 860" stroke="url(#trailLeft)" />
    </svg>
    <svg class="light-trails trails-right" viewBox="0 0 600 700" preserveAspectRatio="none">
      <defs><linearGradient id="trailRight" x1="0" x2="1"><stop offset="0" stop-color="#c9a85c" stop-opacity="0" /><stop offset=".5" stop-color="#c9a85c" stop-opacity=".35" /><stop offset="1" stop-color="#c9a85c" stop-opacity="0" /></linearGradient></defs>
      <path d="M650 80 C410 120 360 250 520 330 S570 560 300 690" stroke="url(#trailRight)" />
      <path d="M690 160 C500 210 470 310 580 390 S550 570 390 660" stroke="url(#trailRight)" />
    </svg>

    <span v-for="(particle, index) in particles" :key="index" class="ambient-particle" :class="`particle-${particle.tone}`" :style="{ left: `${particle.x}%`, top: `${particle.y}%`, width: `${particle.size}px`, height: `${particle.size}px`, animationDuration: `${particle.duration}s`, animationDelay: `${particle.delay}s` }"></span>
    <span class="ambient-star star-one">✦</span><span class="ambient-star star-two">✦</span><span class="ambient-star star-three">✦</span>
  </div>
</template>

<style scoped>
.animated-background { position: fixed; z-index: 0; inset: 0; overflow: hidden; pointer-events: none; isolation: isolate; background: #050706; }
.background-base, .background-grid, .light-bloom, .light-trails, .ambient-particle, .ambient-star { position: absolute; pointer-events: none; }
.background-base { z-index: -4; inset: 0; background: radial-gradient(ellipse at 50% 10%, #0b0e0c 0%, #050706 58%, #030504 100%); }
.background-grid { z-index: -3; inset: -15%; opacity: .15; background-image: linear-gradient(115deg, rgba(201,168,92,.12) 1px, transparent 1px), linear-gradient(25deg, rgba(245,245,240,.06) 1px, transparent 1px); background-size: 110px 110px, 160px 160px; transform: rotate(-3deg); animation: grid-drift 44s linear infinite; }
.light-bloom { z-index: -2; border-radius: 50%; filter: blur(100px); mix-blend-mode: screen; will-change: transform, opacity; }
.bloom-lime-top { top: -16%; left: -13%; width: 48vw; height: 48vw; opacity: .17; background: #baff4f; animation: bloom-left 25s ease-in-out infinite alternate; }
.bloom-lime-bottom { bottom: -24%; left: -9%; width: 42vw; height: 38vw; opacity: .13; background: #8ecf3d; animation: bloom-bottom 31s ease-in-out infinite alternate; }
.bloom-gold-top { top: -18%; right: -12%; width: 44vw; height: 40vw; opacity: .12; background: #c9a85c; animation: bloom-gold 28s ease-in-out infinite alternate; }
.bloom-gold-bottom { right: -16%; bottom: -18%; width: 48vw; height: 42vw; opacity: .1; background: #b58f48; animation: bloom-bottom-gold 34s ease-in-out infinite alternate; }
.bloom-teal { top: 37%; left: 38%; width: 30vw; height: 22vw; opacity: .055; background: #51a88a; animation: bloom-teal 23s ease-in-out infinite alternate; }
.light-trails { z-index: -1; width: min(40vw, 520px); height: 100%; overflow: visible; opacity: .65; filter: drop-shadow(0 0 6px rgba(201,168,92,.28)); }
.light-trails path { fill: none; stroke-width: .8; vector-effect: non-scaling-stroke; stroke-dasharray: 9 18; animation: trail-flow 27s linear infinite; }
.trails-left { top: 2%; left: -4%; animation: trail-sway-left 26s ease-in-out infinite alternate; }
.trails-right { top: 6%; right: -5%; animation: trail-sway-right 32s ease-in-out infinite alternate; }
.trails-right path { animation-delay: -11s; }
.ambient-particle { z-index: 1; border-radius: 50%; opacity: .48; will-change: transform, opacity; animation-name: particle-drift; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
.particle-lime { color: #c7ff4a; background: currentColor; box-shadow: 0 0 8px currentColor; }
.particle-gold { color: #c9a85c; background: currentColor; box-shadow: 0 0 7px currentColor; }
.particle-white { color: #f5f5f0; background: currentColor; box-shadow: 0 0 6px currentColor; opacity: .28; }
.ambient-star { z-index: 2; color: #c9a85c; font-size: 12px; line-height: 1; opacity: .56; text-shadow: 0 0 8px rgba(201,168,92,.6); animation: star-pulse 8s ease-in-out infinite; }
.star-one { top: 18%; left: 9%; animation-delay: -2s; }.star-two { top: 47%; right: 13%; font-size: 9px; animation-delay: -5s; }.star-three { bottom: 17%; left: 44%; font-size: 8px; animation-delay: -7s; }
@keyframes grid-drift { to { transform: translate3d(55px, 35px, 0) rotate(-3deg); } }
@keyframes bloom-left { to { transform: translate3d(9vw, 7vh, 0) scale(1.16); opacity: .23; } }
@keyframes bloom-bottom { to { transform: translate3d(7vw, -5vh, 0) scale(.9); opacity: .08; } }
@keyframes bloom-gold { to { transform: translate3d(-8vw, 8vh, 0) scale(1.1); opacity: .17; } }
@keyframes bloom-bottom-gold { to { transform: translate3d(-7vw, -6vh, 0) scale(.92); opacity: .06; } }
@keyframes bloom-teal { to { transform: translate3d(-5vw, 8vh, 0) scale(1.2); opacity: .09; } }
@keyframes trail-flow { to { stroke-dashoffset: -160; } }
@keyframes trail-sway-left { to { transform: translate3d(22px, 0, 0) rotate(2deg); } }
@keyframes trail-sway-right { to { transform: translate3d(-28px, 15px, 0) rotate(-2deg); } }
@keyframes particle-drift { 0%, 100% { transform: translate3d(0, 0, 0); opacity: .25; } 45% { transform: translate3d(12px, -25px, 0); opacity: .72; } 75% { transform: translate3d(-9px, -42px, 0); opacity: .34; } }
@keyframes star-pulse { 0%, 100% { transform: scale(.7) rotate(0); opacity: .3; } 50% { transform: scale(1.25) rotate(45deg); opacity: .82; } }
@media (max-width: 700px) { .light-trails { width: 65vw; opacity: .42; }.background-grid { opacity: .1; }.light-bloom { filter: blur(75px); }.bloom-lime-top { width: 75vw; height: 65vw; }.bloom-gold-top { width: 70vw; height: 60vw; }.ambient-particle { transform: scale(.8); } }
@media (prefers-reduced-motion: reduce) { .background-grid, .light-bloom, .light-trails, .light-trails path, .ambient-particle, .ambient-star { animation: none; } }
</style>
