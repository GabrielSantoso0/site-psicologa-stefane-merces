import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const SincroniaIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Logo scale animation
  const logoScale = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });

  // Text opacity
  const textOpacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline delay
  const taglineOpacity = interpolate(frame, [50, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const taglineY = interpolate(frame, [50, 80], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #0d1b2a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Helvetica Neue', sans-serif",
      }}
    >
      {/* Logo circle */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #7B2FBE, #E040FB)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 80px rgba(123, 47, 190, 0.6)",
          marginBottom: 40,
        }}
      >
        <span style={{ fontSize: 72, color: "white", fontWeight: "800" }}>S</span>
      </div>

      {/* Brand name */}
      <div
        style={{
          opacity: textOpacity,
          color: "white",
          fontSize: 64,
          fontWeight: "800",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        Sincronia
      </div>

      {/* Tagline */}
      <div
        style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          color: "#E040FB",
          fontSize: 24,
          fontWeight: "300",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          marginTop: 12,
        }}
      >
        Branding & Automação
      </div>
    </AbsoluteFill>
  );
};
