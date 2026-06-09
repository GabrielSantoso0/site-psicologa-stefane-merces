/**
 * ATO 2 — A RUPTURA
 * O ruído para. A tela "respira".
 * Um cursor pisca no centro. Uma scanline azul corta a tela horizontalmente.
 * "Trabalhar mais, já não é a resposta."
 * "No mercado de hoje, a eficiência é a nova estética."
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from 'remotion';
import { COLORS, FONTS } from './SincroniaManifestoData';

const BlinkingCursor: React.FC = () => {
  const frame = useCurrentFrame();
  // Cursor pisca a cada 20 frames (~0.66s)
  const visible = Math.floor(frame / 20) % 2 === 0;

  return (
    <div
      style={{
        width: 3,
        height: 40,
        backgroundColor: COLORS.muted,
        opacity: visible ? 0.7 : 0,
      }}
    />
  );
};

const ScanLine: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  if (localFrame < 0) return null;

  // Scanline move do topo ao final da tela
  const scanY = interpolate(localFrame, [0, 50], [-10, 1930], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const opacity = interpolate(localFrame, [0, 5, 40, 50], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <>
      {/* Linha principal */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: scanY,
          width: '100%',
          height: 2,
          background: COLORS.dataBlue,
          boxShadow: `0 0 30px ${COLORS.dataBlue}, 0 0 80px ${COLORS.dataBlue}60`,
          opacity,
          zIndex: 10,
        }}
      />
      {/* Trail (rastro luminoso) */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: scanY - 60,
          width: '100%',
          height: 60,
          background: `linear-gradient(to bottom, transparent, ${COLORS.dataBlue}15)`,
          opacity,
          zIndex: 9,
        }}
      />
    </>
  );
};

export const Act2Rupture: React.FC = () => {
  const frame = useCurrentFrame();

  // Fade in da limpeza
  const fadeIn = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Cursor aparece nos primeiros frames e some quando texto 1 aparece
  const cursorOpacity = interpolate(frame, [20, 40, 80, 100], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Texto 1: "TRABALHAR MAIS NÃO É A RESPOSTA" — typewriter
  const text1 = "TRABALHAR MAIS NÃO É A RESPOSTA.";
  const text1Start = 60;
  const text1CharsVisible = interpolate(
    frame,
    [text1Start, text1Start + text1.length * 2],
    [0, text1.length],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const text1Opacity = interpolate(frame, [text1Start, text1Start + 10, 200, 220], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Scanline dispara no frame 140
  const scanlineStart = 140;

  // Texto 2: "A EFICIÊNCIA É A NOVA ESTÉTICA" — aparece depois da scanline
  const text2Opacity = interpolate(frame, [200, 230], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const text2Y = interpolate(frame, [200, 240], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Glow sutil que aparece com o texto 2
  const glowOpacity = interpolate(frame, [200, 260], [0, 0.15], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Fade out
  const fadeOut = interpolate(frame, [270, 300], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.pureBlack,
        opacity: fadeIn * fadeOut,
      }}
    >
      {/* Espaço limpo e vazio — a tela respira */}

      {/* Glow ambiental sutil quando a solução começa */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, ${COLORS.dataBlue}08 0%, transparent 60%)`,
          opacity: glowOpacity,
        }}
      />

      {/* Cursor piscando no centro */}
      <AbsoluteFill
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: cursorOpacity,
        }}
      >
        <BlinkingCursor />
      </AbsoluteFill>

      {/* Scanline cortando a tela */}
      <ScanLine startFrame={scanlineStart} />

      {/* Texto 1: Typewriter */}
      <AbsoluteFill
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: text1Opacity,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 28,
            color: COLORS.muted,
            letterSpacing: '2px',
            textAlign: 'center',
            padding: '0 100px',
          }}
        >
          {text1.slice(0, Math.floor(text1CharsVisible))}
          {Math.floor(text1CharsVisible) < text1.length && (
            <span
              style={{
                opacity: Math.floor(frame / 15) % 2 === 0 ? 1 : 0,
                color: COLORS.white,
              }}
            >
              ▌
            </span>
          )}
        </div>
      </AbsoluteFill>

      {/* Texto 2: Statement */}
      <AbsoluteFill
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: text2Opacity,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.heading,
            fontSize: 64,
            color: COLORS.white,
            fontWeight: 800,
            letterSpacing: '-1px',
            textAlign: 'center',
            lineHeight: 1.2,
            padding: '0 80px',
            transform: `translateY(${text2Y}px)`,
            textShadow: `0 0 60px ${COLORS.dataBlue}40`,
          }}
        >
          A EFICIÊNCIA
          <br />
          <span style={{ color: COLORS.dataBlue }}>É A NOVA</span>
          <br />
          ESTÉTICA
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
