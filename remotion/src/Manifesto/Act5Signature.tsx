/**
 * ATO 5 — ASSINATURA (Call to Action)
 * O símbolo concêntrico da Sincronia se forma no centro.
 * Luz suave emanando do core.
 * "Sincronia. Do caos à clareza."
 * Logotipo assina com site abaixo.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { COLORS, FONTS } from './SincroniaManifestoData';

export const Act5Signature: React.FC = () => {
  const frame = useCurrentFrame();

  // Reveal do preto total
  const fadeIn = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Formação do logo concêntrico
  const rings = [
    { radius: 50, delay: 10, strokeWidth: 2, opacity: 1 },
    { radius: 85, delay: 18, strokeWidth: 1.2, opacity: 0.7 },
    { radius: 120, delay: 26, strokeWidth: 0.8, opacity: 0.4 },
    { radius: 155, delay: 34, strokeWidth: 0.5, opacity: 0.25 },
  ];

  // Core glow pulsante
  const corePulse = 1 + Math.sin(frame * 0.08) * 0.1;
  const coreOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Texto "SINCRONIA"
  const nameOpacity = interpolate(frame, [55, 75], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const nameY = interpolate(frame, [55, 80], [15, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Tagline "DO CAOS À CLAREZA"
  const tagOpacity = interpolate(frame, [85, 105], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // URL
  const urlOpacity = interpolate(frame, [100, 120], [0, 0.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.abyssalBlack, opacity: fadeIn }}>
      {/* Glow ambiental centralizado */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 42%, ${COLORS.cyberCyan}08 0%, transparent 35%)`,
        }}
      />

      {/* === LOGO CONCÊNTRICO === */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '40%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Core */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) scale(${corePulse})`,
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor: COLORS.cyberCyan,
            boxShadow: `0 0 20px ${COLORS.cyanGlow}, 0 0 60px ${COLORS.cyanGlow}, 0 0 100px ${COLORS.cyanGlow}`,
            opacity: coreOpacity,
          }}
        />

        {/* Rings forming */}
        {rings.map((ring, i) => {
          const progress = interpolate(
            frame - ring.delay,
            [0, 25],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
          );

          const circumference = 2 * Math.PI * ring.radius;
          const rotation = frame * (i % 2 === 0 ? 0.2 : -0.15);

          return (
            <svg
              key={i}
              width={ring.radius * 2 + 20}
              height={ring.radius * 2 + 20}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                opacity: ring.opacity * progress,
              }}
            >
              <circle
                cx={ring.radius + 10}
                cy={ring.radius + 10}
                r={ring.radius}
                fill="none"
                stroke={COLORS.cyberCyan}
                strokeWidth={ring.strokeWidth}
                strokeDasharray={`${circumference * 0.35} ${circumference * 0.15} ${circumference * 0.2} ${circumference * 0.3}`}
                strokeDashoffset={circumference * (1 - progress)}
                strokeLinecap="round"
              />
            </svg>
          );
        })}
      </div>

      {/* === TEXTO === */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '62%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
        }}
      >
        {/* Nome */}
        <div
          style={{
            fontFamily: FONTS.heading,
            fontSize: 64,
            color: COLORS.white,
            fontWeight: 800,
            letterSpacing: '10px',
            opacity: nameOpacity,
            transform: `translateY(${nameY}px)`,
            textShadow: `0 0 40px ${COLORS.cyanGlow}`,
          }}
        >
          SINCRONIA
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 16,
            color: COLORS.cyberCyan,
            letterSpacing: '6px',
            marginTop: 24,
            opacity: tagOpacity,
            textTransform: 'uppercase',
          }}
        >
          Do caos à clareza
        </div>

        {/* Linha divisória */}
        <div
          style={{
            width: 60,
            height: 1,
            backgroundColor: `${COLORS.cyberCyan}40`,
            margin: '30px auto',
            opacity: urlOpacity,
          }}
        />

        {/* URL */}
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 14,
            color: COLORS.muted,
            letterSpacing: '4px',
            opacity: urlOpacity,
          }}
        >
          sincronia.com
        </div>
      </div>
    </AbsoluteFill>
  );
};
