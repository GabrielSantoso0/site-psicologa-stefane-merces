import { AbsoluteFill, Video, Img, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig, Series, Easing } from "remotion";
import React from "react";

// Importing Inter font for that premium tech feel
const fontImport = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;800&display=swap');
`;

const Grid: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: `
          linear-gradient(to right, rgba(0, 229, 200, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 229, 200, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }}
    />
  );
};

const PremiumGlassLens: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Sweep animation: Left to Right
  const sweep = interpolate(frame, [0, 80], [-600, 600], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lensSize = 400;
  const lensOpacity = interpolate(frame, [0, 10, 70, 85], [0, 1, 1, 0]);

  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity: lensOpacity }}>
      {/* The Lens Container */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: `calc(50% + ${sweep}px)`,
          width: lensSize,
          height: lensSize,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          // Glass aesthetics: Fresnel edges and highlights
          background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)",
          border: "1.5px solid rgba(255, 255, 255, 0.2)",
          boxShadow: `
            0px 0px 60px rgba(0, 229, 200, 0.2), 
            inset 0px 0px 40px rgba(255, 255, 255, 0.1),
            0px 10px 40px rgba(0, 0, 0, 0.5)
          `,
          backdropFilter: "blur(4px) brightness(1.1) contrast(1.1) saturate(1.2)",
          overflow: "hidden",
          zIndex: 10,
        }}
      >
        {/* Reflection Highlight */}
        <div style={{
          position: "absolute",
          top: "15%",
          left: "15%",
          width: "40%",
          height: "20%",
          background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 80%)",
          borderRadius: "50%",
          transform: "rotate(-15deg)",
        }} />

        {/* Magnified/Distorted Content Inside Lens */}
        <div
          style={{
            position: "absolute",
            top: `calc(50% - ${height / 2}px)`,
            left: `calc(50% - ${width / 2}px - ${sweep}px)`,
            width: width,
            height: height,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 140, // Match the target font size
            fontWeight: 900,
            fontFamily: "Inter, sans-serif",
            color: "white",
            transform: "scale(1.2)", // Real magnification
            filter: "drop-shadow(0px 0px 10px rgba(0, 229, 200, 0.5))",
          }}
        >
          Nova Era
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Word: React.FC<{ text: string; delay: number; targetWidth: number; fontSize?: number }> = ({ text, delay, targetWidth, fontSize = 80 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spr = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  const width = interpolate(spr, [0, 1], [0, targetWidth]);
  const opacity = interpolate(spr, [0, 0.5], [0, 1]);
  const blur = interpolate(spr, [0, 1], [30, 0]);
  const scale = interpolate(spr, [0, 1], [0.8, 1]);

  return (
    <div
      style={{
        width,
        opacity,
        filter: `blur(${blur}px)`,
        transform: `scale(${scale})`,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize,
        fontWeight: 700,
        color: "white",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ margin: "0 10px" }}>{text}</span>
    </div>
  );
};

const KineticIntro: React.FC = () => {
  const frame = useCurrentFrame();
  
  // Camera follow effect tracking the lens sweep
  const cameraFollow = interpolate(frame, [0, 80], [40, -40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000", fontFamily: "Inter, sans-serif" }}>
      <style>{fontImport}</style>
      
      <AbsoluteFill style={{ transform: `translateX(${cameraFollow}px)` }}>
        {/* Base Layer */}
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          {frame < 80 ? (
            <div style={{ 
              fontSize: 140, 
              fontWeight: 900, 
              color: "rgba(255,255,255,1)",
              letterSpacing: "-0.03em"
            }}>
              Nova Era
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Word text="Nova Era" delay={80} targetWidth={650} fontSize={120} />
              <Word text="da IA" delay={110} targetWidth={300} fontSize={120} />
              <Word text="começou" delay={140} targetWidth={550} fontSize={120} />
            </div>
          )}
        </AbsoluteFill>
      </AbsoluteFill>

      {/* Improved Glass Lens Overlay */}
      {frame < 90 && <PremiumGlassLens />}
    </AbsoluteFill>
  );
};

const Scene2LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const typingStart = 10;
  const revealProgress = interpolate(frame, [typingStart, typingStart + 40], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      <Video
        src={staticFile("magnific_referencia-visual-img1.-g_2927519585.mp4")}
        style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }}
        muted loop
      />
      <Grid />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <Img
          src={staticFile("Vector.png")}
          style={{
            width: 800,
            height: "auto",
            clipPath: `inset(0 ${100 - revealProgress}% 0 0)`,
            filter: "drop-shadow(0px 0px 20px rgba(0, 229, 200, 0.4))",
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const Reelssincronia: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={200}>
        <KineticIntro />
      </Series.Sequence>
      <Series.Sequence durationInFrames={90}>
        <Scene2LogoReveal />
      </Series.Sequence>
    </Series>
  );
};
