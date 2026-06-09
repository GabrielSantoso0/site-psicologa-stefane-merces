/**
 * ATO 3 — A SINCRONIA
 * Painéis glassmorphism, orbs concêntricos cianos, dados fluindo em ordem,
 * "BRANDING + AUTOMAÇÃO", dashboard abstrato com status de eficiência.
 * O ato mais longo e visualmente rico.
 */
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from 'remotion';
import { COLORS, FONTS } from './SincroniaManifestoData';

// --- ORBS CONCÊNTRICOS (O símbolo da Sincronia) ---
const ConcentricOrbs: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;
  if (localFrame < 0) return null;

  const rings = [
    { radius: 60, delay: 0, strokeWidth: 1.5, color: COLORS.cyberCyan },
    { radius: 100, delay: 8, strokeWidth: 1, color: `${COLORS.cyberCyan}99` },
    { radius: 145, delay: 16, strokeWidth: 0.7, color: `${COLORS.cyberCyan}55` },
    { radius: 190, delay: 24, strokeWidth: 0.4, color: `${COLORS.cyberCyan}33` },
  ];

  // Rotação lenta e contínua
  const rotation = localFrame * 0.3;

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }}
    >
      {/* Core central pulsante */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 16,
          height: 16,
          borderRadius: '50%',
          backgroundColor: COLORS.cyberCyan,
          boxShadow: `0 0 20px ${COLORS.cyanGlow}, 0 0 60px ${COLORS.cyanGlow}`,
          opacity: interpolate(localFrame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}
      />
      {/* Anéis */}
      {rings.map((ring, i) => {
        const ringProgress = interpolate(
          localFrame - ring.delay,
          [0, 30],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
        );
        const dashOffset = localFrame * (i % 2 === 0 ? 0.5 : -0.5);
        const circumference = 2 * Math.PI * ring.radius;

        return (
          <svg
            key={i}
            width={ring.radius * 2 + 20}
            height={ring.radius * 2 + 20}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) rotate(${i * 45 + dashOffset}deg)`,
              opacity: ringProgress,
            }}
          >
            <circle
              cx={ring.radius + 10}
              cy={ring.radius + 10}
              r={ring.radius}
              fill="none"
              stroke={ring.color}
              strokeWidth={ring.strokeWidth}
              strokeDasharray={`${circumference * 0.3} ${circumference * 0.7}`}
              strokeDashoffset={circumference * (1 - ringProgress)}
            />
          </svg>
        );
      })}
    </div>
  );
};

// --- PAINEL GLASSMORPHISM ---
const GlassPanel: React.FC<{
  children: React.ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
  delay: number;
}> = ({ children, x, y, width, height, delay }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame - delay, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(frame - delay, [0, 30], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        background: COLORS.panelBg,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: 16,
        border: `1px solid ${COLORS.panelBorder}`,
        padding: 20,
        opacity,
        transform: `translateY(${translateY}px)`,
        overflow: 'hidden',
      }}
    >
      {/* Glow line no topo */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: 1,
          background: `linear-gradient(90deg, transparent, ${COLORS.cyberCyan}40, transparent)`,
        }}
      />
      {children}
    </div>
  );
};

// --- BARRA DE MÉTRICA ILUMINADA ---
const MetricBar: React.FC<{
  label: string;
  value: number;
  delay: number;
  color?: string;
}> = ({ label, value, delay, color = COLORS.cyberCyan }) => {
  const frame = useCurrentFrame();

  const barProgress = interpolate(frame - delay, [0, 45], [0, value / 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const textOpacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ marginBottom: 16, opacity: textOpacity }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: FONTS.mono,
          fontSize: 12,
          color: COLORS.muted,
          marginBottom: 6,
        }}
      >
        <span>{label}</span>
        <span style={{ color }}>{Math.round(barProgress * 100)}%</span>
      </div>
      <div
        style={{
          width: '100%',
          height: 4,
          backgroundColor: 'rgba(255,255,255,0.05)',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${barProgress * 100}%`,
            height: '100%',
            backgroundColor: color,
            borderRadius: 2,
            boxShadow: `0 0 12px ${color}60`,
          }}
        />
      </div>
    </div>
  );
};

// --- DADOS FLUTUANTES (tipo terminal) ---
const FloatingDataTag: React.FC<{ text: string; x: number; y: number; delay: number }> = ({
  text, x, y, delay
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame - delay, [0, 12], [0, 0.7], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const drift = Math.sin(frame * 0.02 + delay) * 5;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y + drift,
        fontFamily: FONTS.mono,
        fontSize: 13,
        color: COLORS.cyberCyan,
        padding: '4px 12px',
        border: `1px solid ${COLORS.cyberCyan}25`,
        borderRadius: 6,
        background: 'rgba(0, 229, 200, 0.04)',
        opacity,
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </div>
  );
};

export const Act3Sincronia: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // === SEÇÃO A: "BEM-VINDO À SINCRONIA" (0–150 frames / 0–5s) ===
  const sectionA = frame < 150;

  // === SEÇÃO B: "BRANDING + AUTOMAÇÃO" (150–390 frames / 5–13s) ===
  const sectionB = frame >= 150 && frame < 390;

  // === SEÇÃO C: "NÓS INSTALAMOS SISTEMAS" (390–690 frames / 13–23s) ===
  const sectionC = frame >= 390;

  // --- Grid background ---
  const gridOpacity = interpolate(frame, [0, 60], [0, 0.04], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Fade out final
  const fadeOut = interpolate(frame, [660, 690], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.abyssalBlack, opacity: fadeOut }}>
      {/* Grid geométrico */}
      <AbsoluteFill
        style={{
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(rgba(0, 229, 200, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 229, 200, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Ambient glow */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, ${COLORS.cyberCyan}06 0%, transparent 50%)`,
        }}
      />

      {/* =================== SEÇÃO A: BEM-VINDO =================== */}
      {sectionA && (
        <>
          {/* Orbs concêntricos alinhando */}
          <ConcentricOrbs startFrame={10} />

          {/* Texto "BEM-VINDO À SINCRONIA" */}
          <AbsoluteFill
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingBottom: 520,
              opacity: interpolate(frame, [40, 60, 130, 150], [0, 1, 1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 14,
                  color: COLORS.cyberCyan,
                  letterSpacing: '6px',
                  marginBottom: 16,
                }}
              >
                [ INIT_SEQUENCE ]
              </div>
              <div
                style={{
                  fontFamily: FONTS.heading,
                  fontSize: 52,
                  color: COLORS.white,
                  fontWeight: 800,
                  letterSpacing: '14px',
                  textShadow: `0 0 40px ${COLORS.cyanGlow}`,
                }}
              >
                S I N C R O N I A
              </div>
            </div>
          </AbsoluteFill>

          {/* Tags flutuantes */}
          <FloatingDataTag text="STATUS: ONLINE" x={720} y={600} delay={50} />
          <FloatingDataTag text="v4.0.0" x={180} y={1300} delay={65} />
        </>
      )}

      {/* =================== SEÇÃO B: BRANDING + AUTOMAÇÃO =================== */}
      {sectionB && (() => {
        const localFrame = frame - 150;
        const titleOpacity = interpolate(localFrame, [0, 25], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const titleScale = interpolate(localFrame, [0, 30], [0.9, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.out(Easing.cubic),
        });

        // "+" aparece com delay
        const plusOpacity = interpolate(localFrame, [25, 40], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const fadeOutB = interpolate(localFrame, [210, 240], [1, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <AbsoluteFill
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: fadeOutB,
            }}
          >
            <div style={{ textAlign: 'center', transform: `scale(${titleScale})`, opacity: titleOpacity }}>
              <div
                style={{
                  fontFamily: FONTS.heading,
                  fontSize: 72,
                  color: COLORS.white,
                  fontWeight: 900,
                  letterSpacing: '-2px',
                  lineHeight: 1.1,
                }}
              >
                BRANDING
              </div>
              <div
                style={{
                  fontFamily: FONTS.heading,
                  fontSize: 72,
                  color: COLORS.cyberCyan,
                  fontWeight: 300,
                  opacity: plusOpacity,
                  margin: '10px 0',
                }}
              >
                +
              </div>
              <div
                style={{
                  fontFamily: FONTS.heading,
                  fontSize: 72,
                  color: COLORS.white,
                  fontWeight: 900,
                  letterSpacing: '-2px',
                  lineHeight: 1.1,
                }}
              >
                AUTOMAÇÃO
              </div>
              {/* Subtags */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 30,
                  marginTop: 50,
                  opacity: interpolate(localFrame, [45, 65], [0, 0.6], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                }}
              >
                <div style={{ fontFamily: FONTS.mono, fontSize: 14, color: COLORS.cyberCyan, padding: '6px 16px', border: `1px solid ${COLORS.cyberCyan}30`, borderRadius: 6 }}>
                  HUMAN_INSIGHT()
                </div>
                <div style={{ fontFamily: FONTS.mono, fontSize: 14, color: COLORS.cyberCyan, padding: '6px 16px', border: `1px solid ${COLORS.cyberCyan}30`, borderRadius: 6 }}>
                  AI_PRECISION()
                </div>
              </div>
            </div>
          </AbsoluteFill>
        );
      })()}

      {/* =================== SEÇÃO C: DASHBOARD DE EFICIÊNCIA =================== */}
      {sectionC && (() => {
        const localFrame = frame - 390;

        const fadeInC = interpolate(localFrame, [0, 25], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <AbsoluteFill style={{ opacity: fadeInC }}>
            {/* Painel esquerdo: métricas */}
            <GlassPanel x={60} y={500} width={440} height={320} delay={localFrame > 0 ? 0 : 999}>
              <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.cyberCyan, marginBottom: 20, letterSpacing: '3px' }}>
                // SYSTEM METRICS
              </div>
              <MetricBar label="AUTOMAÇÃO" value={100} delay={localFrame > 0 ? 15 : 999} />
              <MetricBar label="EFICIÊNCIA" value={100} delay={localFrame > 0 ? 25 : 999} />
              <MetricBar label="BRAND EQUITY" value={94} delay={localFrame > 0 ? 35 : 999} color={COLORS.dataBlue} />
              <MetricBar label="ESCALA" value={87} delay={localFrame > 0 ? 45 : 999} color={COLORS.deepCyan} />
            </GlassPanel>

            {/* Painel direito: status */}
            <GlassPanel x={540} y={560} width={480} height={220} delay={localFrame > 0 ? 20 : 999}>
              <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.muted, marginBottom: 12, letterSpacing: '3px' }}>
                // STATUS
              </div>
              {[
                { label: 'ATTRITION:', value: '0%', color: COLORS.cyberCyan, delay: 40 },
                { label: 'BRAND_EQUITY:', value: 'SCALING', color: COLORS.dataBlue, delay: 55 },
                { label: 'SYS_STATUS:', value: '100% EFFICIENCY', color: COLORS.cyberCyan, delay: 70 },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: FONTS.mono,
                    fontSize: 16,
                    marginBottom: 12,
                    opacity: interpolate(localFrame - item.delay, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                  }}
                >
                  <span style={{ color: COLORS.muted }}>{item.label}</span>
                  <span style={{ color: item.color, fontWeight: 'bold' }}>{item.value}</span>
                </div>
              ))}
            </GlassPanel>

            {/* Texto central grande */}
            <AbsoluteFill
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingTop: 250,
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.heading,
                  fontSize: 38,
                  color: COLORS.white,
                  fontWeight: 700,
                  textAlign: 'center',
                  lineHeight: 1.5,
                  padding: '0 80px',
                  opacity: interpolate(localFrame, [60, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                }}
              >
                NÓS NÃO ENTREGAMOS
                <br />
                RELATÓRIOS.
                <br />
                <span style={{ color: COLORS.cyberCyan }}>NÓS INSTALAMOS</span>
                <br />
                <span style={{ color: COLORS.cyberCyan }}>SISTEMAS.</span>
              </div>
            </AbsoluteFill>

            {/* Tags de dados flutuantes pelo ato */}
            <FloatingDataTag text="[ AUTOMATION: ON ]" x={100} y={1400} delay={localFrame > 0 ? 30 : 999} />
            <FloatingDataTag text="ZERO ATRITO" x={650} y={1350} delay={localFrame > 0 ? 50 : 999} />
            <FloatingDataTag text="PREMIUM POSITIONING" x={300} y={1500} delay={localFrame > 0 ? 70 : 999} />
          </AbsoluteFill>
        );
      })()}
    </AbsoluteFill>
  );
};
