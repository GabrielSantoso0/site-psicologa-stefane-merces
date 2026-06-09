/**
 * ATO 1 — O CAOS
 * Tela escura com ruído visual, linhas de dados cruzadas, textos sobrepostos,
 * elementos gráficos soltos flutuando com leve desordem, cores cinza opacas.
 * Transição de caos crescente para o pico de desordem.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { COLORS, FONTS } from './SincroniaManifestoData';

// Pseudo-random determinístico baseado no index (para evitar flickering entre frames)
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
};

const ChaosDataLine: React.FC<{
  text: string;
  index: number;
  totalLines: number;
}> = ({ text, index, totalLines }) => {
  const frame = useCurrentFrame();

  const baseY = (1920 / (totalLines + 1)) * (index + 1);
  const baseX = seededRandom(index * 7) * 600 + 100;

  // Movimento errático sutil
  const offsetX = Math.sin(frame * 0.03 + index * 2.1) * 40;
  const offsetY = Math.cos(frame * 0.025 + index * 1.7) * 25;

  // Flicker de opacidade (caos visual)
  const flickerPhase = Math.sin(frame * 0.15 + index * 3.7);
  const opacity = interpolate(flickerPhase, [-1, 1], [0.08, 0.35]);

  // Rotação leve
  const rotation = Math.sin(frame * 0.02 + index * 5) * 3;

  return (
    <div
      style={{
        position: 'absolute',
        left: baseX + offsetX,
        top: baseY + offsetY,
        color: COLORS.dimGray,
        fontFamily: FONTS.mono,
        fontSize: 16 + seededRandom(index * 3) * 10,
        opacity,
        transform: `rotate(${rotation}deg)`,
        whiteSpace: 'nowrap',
        letterSpacing: '1px',
      }}
    >
      {text}
    </div>
  );
};

const GlitchBar: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();

  // Barras horizontais de glitch que aparecem e somem
  const cycleLength = 45 + index * 13;
  const phase = (frame + index * 19) % cycleLength;
  const visible = phase < 3;

  if (!visible) return null;

  const yPos = seededRandom(index * 11 + frame * 0.1) * 1920;
  const width = seededRandom(index * 7 + 3) * 800 + 200;
  const height = 2 + seededRandom(index * 13) * 4;

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: yPos,
        width,
        height,
        background: `rgba(75, 75, 75, ${0.15 + seededRandom(index) * 0.2})`,
      }}
    />
  );
};

const CrossedLine: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame,
    [index * 8, index * 8 + 60],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const startX = seededRandom(index * 17) * 1080;
  const startY = seededRandom(index * 23) * 1920;
  const angle = seededRandom(index * 31) * 360;
  const length = 200 + seededRandom(index * 41) * 600;

  const opacity = interpolate(frame, [index * 8, index * 8 + 30, index * 8 + 90, index * 8 + 120], [0, 0.15, 0.15, 0.03], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: startX,
        top: startY,
        width: length * progress,
        height: 1,
        background: `rgba(100, 100, 100, 0.4)`,
        transform: `rotate(${angle}deg)`,
        transformOrigin: '0 0',
        opacity,
      }}
    />
  );
};

export const Act1Chaos: React.FC = () => {
  const frame = useCurrentFrame();

  // Textos de caos — planilhas, erros, processos manuais
  const chaosTexts = [
    'ERR: TIMEOUT 408',
    'PROCESSO_MANUAL_v3_final_FINAL.xlsx',
    'ROI: ???',
    'SYS_OVERLOAD',
    'CTRL+C CTRL+V CTRL+C CTRL+V',
    'leads_fev_backup_old(2).csv',
    'REUNIÃO 14H → REAGENDADA → CANCELADA',
    'META NÃO BATIDA',
    '// TODO: automatizar isso depois',
    'MANUAL_INPUT_REQUIRED',
    'planilha_controle_v7_CORRIGIDA.xlsx',
    'BUDGET OVERFLOW',
    'follow_up_follow_up_RE_RE_RE.eml',
    'SEM RESPOSTA — 3 DIAS',
    'KPI: INDEFINIDO',
    'FLUXO QUEBRADO → REFAZER',
    'ticket #4892 — sem atribuição',
    'ESCALA: TRAVADA',
  ];

  // Fade in global
  const globalOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Intensificação progressiva do caos
  const chaosIntensity = interpolate(frame, [0, 300], [0.4, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Título "BASTIDORES" aparece na primeira metade
  const titleOpacity = interpolate(frame, [30, 50, 140, 160], [0, 0.6, 0.6, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Título "O CAOS TRAVA A ESCALA" aparece na segunda metade
  const title2Opacity = interpolate(frame, [180, 200, 320, 340], [0, 0.8, 0.8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Shake crescente na segunda metade
  const shakeAmount = interpolate(frame, [180, 340], [0, 4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shakeX = Math.sin(frame * 0.8) * shakeAmount;
  const shakeY = Math.cos(frame * 1.1) * shakeAmount * 0.5;

  // Fade out no final do ato
  const fadeOut = interpolate(frame, [330, 360], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.abyssalBlack,
        opacity: globalOpacity * fadeOut,
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
    >
      {/* Linhas cruzadas de dados */}
      {Array.from({ length: 20 }).map((_, i) => (
        <CrossedLine key={`line-${i}`} index={i} />
      ))}

      {/* Barras de glitch horizontal */}
      {Array.from({ length: 12 }).map((_, i) => (
        <GlitchBar key={`glitch-${i}`} index={i} />
      ))}

      {/* Textos flutuantes caóticos */}
      {chaosTexts.map((text, i) => (
        <ChaosDataLine
          key={`chaos-${i}`}
          text={text}
          index={i}
          totalLines={chaosTexts.length}
        />
      ))}

      {/* Noise overlay */}
      <AbsoluteFill
        style={{
          opacity: 0.06 * chaosIntensity,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
        }}
      />

      {/* Grid sutil ao fundo */}
      <AbsoluteFill
        style={{
          opacity: 0.03 * chaosIntensity,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Título 1: BASTIDORES (primeira metade) */}
      <AbsoluteFill
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: titleOpacity,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.heading,
            fontSize: 42,
            color: COLORS.dimGray,
            fontWeight: 800,
            letterSpacing: '12px',
            textTransform: 'uppercase',
          }}
        >
          BASTIDORES
        </div>
      </AbsoluteFill>

      {/* Título 2: O CAOS TRAVA A ESCALA (segunda metade) */}
      <AbsoluteFill
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: title2Opacity,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.heading,
            fontSize: 56,
            color: '#4A4A4A',
            fontWeight: 900,
            letterSpacing: '4px',
            textAlign: 'center',
            lineHeight: 1.3,
            padding: '0 80px',
          }}
        >
          O CAOS
          <br />
          TRAVA A ESCALA
        </div>
      </AbsoluteFill>

      {/* Vinheta escura nas bordas */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
