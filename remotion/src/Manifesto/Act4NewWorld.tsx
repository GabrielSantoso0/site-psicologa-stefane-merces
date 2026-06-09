/**
 * ATO 4 — O NOVO MUNDO
 * Dashboard abstrato limpo. Apenas sinais vitais pulsando em ciano/branco.
 * Paz e controle. "ESCALA SEM ATRITO" com glow.
 * "Controle absoluto do seu negócio."
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { COLORS, FONTS } from './SincroniaManifestoData';

// Linha de pulso cardíaco / sinal vital
const VitalLine: React.FC<{ y: number; delay: number; color: string; amplitude: number }> = ({
  y, delay, color, amplitude,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame - delay, [0, 20], [0, 0.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Gera o path de sinal vital
  const points: string[] = [];
  const width = 1080;
  const segments = 100;

  for (let i = 0; i <= segments; i++) {
    const x = (i / segments) * width;
    const progress = (i / segments) * Math.PI * 8;
    // Onda suave com picos periódicos (heartbeat-like)
    const wave = Math.sin(progress + frame * 0.04) * amplitude;
    const spike = i % 25 === 12 ? amplitude * 2.5 : 0;
    const py = y + wave + spike;
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${py}`);
  }

  return (
    <svg
      width={1080}
      height={200}
      style={{
        position: 'absolute',
        left: 0,
        top: y - 100,
        opacity,
      }}
    >
      <path
        d={points.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* Glow */}
      <path
        d={points.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        opacity={0.15}
        filter="blur(4px)"
      />
    </svg>
  );
};

// Mini indicador circular
const StatusDot: React.FC<{ x: number; y: number; delay: number; label: string; value: string }> = ({
  x, y, delay, label, value,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Pulso sutil
  const pulse = 1 + Math.sin(frame * 0.08 + delay) * 0.15;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        opacity,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: COLORS.cyberCyan,
          boxShadow: `0 0 12px ${COLORS.cyanGlow}`,
          transform: `scale(${pulse})`,
        }}
      />
      <div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.muted, letterSpacing: '2px' }}>
          {label}
        </div>
        <div style={{ fontFamily: FONTS.mono, fontSize: 18, color: COLORS.white, fontWeight: 'bold' }}>
          {value}
        </div>
      </div>
    </div>
  );
};

export const Act4NewWorld: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // "ESCALA SEM ATRITO" — aparece com glow
  const titleOpacity = interpolate(frame, [30, 55], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleScale = interpolate(frame, [30, 55], [0.92, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Glow pulsa suavemente
  const glowIntensity = 40 + Math.sin(frame * 0.06) * 20;

  // "CONTROLE ABSOLUTO" — segunda frase
  const text2Opacity = interpolate(frame, [140, 170], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const text2Y = interpolate(frame, [140, 175], [25, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Fade out
  const fadeOut = interpolate(frame, [270, 300], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.abyssalBlack, opacity: fadeIn * fadeOut }}>
      {/* Glow ambiental */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, ${COLORS.cyberCyan}05 0%, transparent 50%)`,
        }}
      />

      {/* Linhas vitais pulsando suavemente */}
      <VitalLine y={650} delay={15} color={COLORS.cyberCyan} amplitude={8} />
      <VitalLine y={1300} delay={30} color={COLORS.dataBlue} amplitude={5} />
      <VitalLine y={1000} delay={45} color={`${COLORS.cyberCyan}60`} amplitude={12} />

      {/* Status dots */}
      <StatusDot x={100} y={480} delay={40} label="OPERAÇÃO" value="ATIVA" />
      <StatusDot x={700} y={520} delay={55} label="ESCALA" value="CONTÍNUA" />
      <StatusDot x={400} y={1150} delay={70} label="ATRITO" value="ZERO" />
      <StatusDot x={150} y={1550} delay={85} label="SISTEMA" value="AUTÔNOMO" />

      {/* Grid bem sutil */}
      <AbsoluteFill
        style={{
          opacity: 0.02,
          backgroundImage: `
            linear-gradient(rgba(0, 229, 200, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 229, 200, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />

      {/* Título: ESCALA SEM ATRITO */}
      <AbsoluteFill
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 30,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.heading,
            fontSize: 76,
            color: COLORS.white,
            fontWeight: 900,
            textAlign: 'center',
            letterSpacing: '-2px',
            lineHeight: 1.15,
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            textShadow: `0 0 ${glowIntensity}px ${COLORS.cyanGlow}, 0 0 ${glowIntensity * 2}px ${COLORS.cyanGlow}`,
          }}
        >
          ESCALA
          <br />
          <span style={{ color: COLORS.cyberCyan }}>SEM ATRITO</span>
        </div>

        {/* Segunda frase */}
        <div
          style={{
            fontFamily: FONTS.heading,
            fontSize: 30,
            color: COLORS.muted,
            fontWeight: 400,
            textAlign: 'center',
            lineHeight: 1.6,
            padding: '0 100px',
            opacity: text2Opacity,
            transform: `translateY(${text2Y}px)`,
          }}
        >
          Controle absoluto.
          <br />
          <span style={{ color: COLORS.white, fontWeight: 600 }}>Seu negócio em sincronia.</span>
        </div>
      </AbsoluteFill>

      {/* Vinheta suave */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
