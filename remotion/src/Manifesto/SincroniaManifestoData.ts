/**
 * Sincronia Manifesto — Data & Metadata
 * Formato: Reels/Shorts (1080×1920) @ 30fps
 * Duração total: ~56 segundos
 */

export const COLORS = {
  abyssalBlack: '#0A0A0A',
  deepBlack: '#050505',
  pureBlack: '#000000',
  cyberCyan: '#00E5C8',
  deepCyan: '#00b39c',
  dataBlue: '#00B4FF',
  white: '#FFFFFF',
  muted: '#A0A0A0',
  dimGray: '#333333',
  panelBg: 'rgba(255, 255, 255, 0.03)',
  panelBorder: 'rgba(255, 255, 255, 0.06)',
  cyanGlow: 'rgba(0, 229, 200, 0.4)',
  cyanGlowStrong: 'rgba(0, 229, 200, 0.7)',
} as const;

export const FONTS = {
  heading: "'Plus Jakarta Sans', 'Inter', sans-serif",
  mono: "'Geist Mono', 'JetBrains Mono', 'Fira Code', monospace",
} as const;

export const VIDEO_METADATA = {
  fps: 30,
  width: 1080,
  height: 1920,
  // Ato 1: 12s | Ato 2: 10s | Ato 3: 23s | Ato 4: 10s | Ato 5: 5s = ~60s
  totalDurationInFrames: 1800,
};

// Scene timing (in frames at 30fps)
export const SCENE_TIMING = {
  // ATO 1 — O Caos
  act1: { start: 0, duration: 360 },        // 0s–12s
  // ATO 2 — A Ruptura
  act2: { start: 360, duration: 300 },       // 12s–22s
  // ATO 3 — A Sincronia
  act3: { start: 660, duration: 690 },       // 22s–45s
  // ATO 4 — O Novo Mundo
  act4: { start: 1350, duration: 300 },      // 45s–55s
  // ATO 5 — Assinatura
  act5: { start: 1650, duration: 150 },      // 55s–60s
};
