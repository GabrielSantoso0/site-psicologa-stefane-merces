/**
 * ManifestoVideo — Composição principal
 * Conecta os 5 atos em sequência usando <Series>
 */
import React from 'react';
import { Series } from 'remotion';
import { SCENE_TIMING } from './SincroniaManifestoData';
import { Act1Chaos } from './Act1Chaos';
import { Act2Rupture } from './Act2Rupture';
import { Act3Sincronia } from './Act3Sincronia';
import { Act4NewWorld } from './Act4NewWorld';
import { Act5Signature } from './Act5Signature';

export const ManifestoVideo: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={SCENE_TIMING.act1.duration}>
        <Act1Chaos />
      </Series.Sequence>

      <Series.Sequence durationInFrames={SCENE_TIMING.act2.duration}>
        <Act2Rupture />
      </Series.Sequence>

      <Series.Sequence durationInFrames={SCENE_TIMING.act3.duration}>
        <Act3Sincronia />
      </Series.Sequence>

      <Series.Sequence durationInFrames={SCENE_TIMING.act4.duration}>
        <Act4NewWorld />
      </Series.Sequence>

      <Series.Sequence durationInFrames={SCENE_TIMING.act5.duration}>
        <Act5Signature />
      </Series.Sequence>
    </Series>
  );
};
