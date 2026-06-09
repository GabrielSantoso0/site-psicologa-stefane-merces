import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export const GlassPanel: React.FC<{
  children: React.ReactNode;
  width?: string;
  height?: string;
  delay?: number;
}> = ({ children, width = '80%', height = 'auto', delay = 0 }) => {
  const frame = useCurrentFrame();
  
  // Animation for the glass panel floating up
  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  
  const translateY = interpolate(frame - delay, [0, 30], [50, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width,
        height,
        padding: '40px',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
        transform: `translateY(${translateY}px)`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Glow reflex sutil */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0, 229, 200, 0.5), transparent)',
        }} 
      />
      {children}
    </div>
  );
};
