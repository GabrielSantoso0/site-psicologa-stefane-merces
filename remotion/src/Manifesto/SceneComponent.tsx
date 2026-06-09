import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { ManifestoScene } from './SincroniaManifestoData';
import { GlassPanel } from './GlassPanel';

export const SceneComponent: React.FC<{ data: ManifestoScene }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Basic Fade-in effect
  const opacity = interpolate(frame, [0, 15, data.durationInFrames - 15, data.durationInFrames], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fontConfig = data.typography.titleFont === 'Geist Mono' 
    ? { fontFamily: 'monospace', fontWeight: 400, letterSpacing: '2px' } 
    : { fontFamily: 'sans-serif', fontWeight: 800, letterSpacing: '-1px' }; // Plus Jakarta placeholder

  return (
    <AbsoluteFill
      style={{
        backgroundColor: data.visualTheme.background,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
      }}
    >
      {/* Noise overlay effect if needed */}
      {data.visualTheme.noiseLevel > 0 && (
        <AbsoluteFill 
          style={{ 
            opacity: data.visualTheme.noiseLevel * 0.1, 
            backgroundRepeat: 'repeat',
            // A simple way to simulate noise without an image:
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          }} 
        />
      )}

      {data.visualTheme.glassmorphism ? (
        <GlassPanel>
          <SceneContent data={data} fontConfig={fontConfig} frame={frame} fps={fps} />
        </GlassPanel>
      ) : (
        <SceneContent data={data} fontConfig={fontConfig} frame={frame} fps={fps} />
      )}
    </AbsoluteFill>
  );
};

const SceneContent: React.FC<{ data: ManifestoScene, fontConfig: any, frame: number, fps: number }> = ({ data, fontConfig, frame, fps }) => {
  const scale = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
      {data.typography.title && (
        <h1
          style={{
            ...fontConfig,
            fontSize: '80px',
            color: '#FFFFFF',
            margin: 0,
            lineHeight: 1.1,
            textTransform: 'uppercase',
            textShadow: `0 0 40px ${data.visualTheme.primaryElementColor || 'transparent'}`,
            transform: `scale(${interpolate(scale, [0, 1], [0.95, 1])})`,
          }}
        >
          {data.typography.title}
        </h1>
      )}

      {data.typography.subtitle && (
        <h2 style={{ color: data.visualTheme.primaryElementColor, fontSize: '40px', fontFamily: 'monospace', fontWeight: 'bold' }}>
          {data.typography.subtitle}
        </h2>
      )}

      {data.typography.floatingData && data.typography.floatingData.length > 0 && (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {data.typography.floatingData.map((text, i) => (
            <div 
              key={i} 
              style={{
                color: data.visualTheme.primaryElementColor || '#FFFFFF',
                fontFamily: 'monospace',
                fontSize: '24px',
                padding: '10px 20px',
                border: `1px solid ${data.visualTheme.primaryElementColor || '#FFFFFF'}40`,
                borderRadius: '8px',
                background: 'rgba(0,0,0,0.5)',
                opacity: interpolate(frame - (i * 10), [0, 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
              }}
            >
              {text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
