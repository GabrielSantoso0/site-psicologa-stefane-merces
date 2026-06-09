import React, { useEffect, useState, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Mic, 
  Music, 
  Activity, 
  HelpCircle,
  Sparkles
} from 'lucide-react';
import './styles-pedalboard.css';

// @ts-ignore
import cleanGuitarLoopUrl from '../assets/guitar.mp3';
// @ts-ignore
import cleanGuitar2LoopUrl from '../assets/guitar2.mp3';
// @ts-ignore
import drumLoopUrl from '../assets/drum-loop.mp3';

// --- CONFIGURAÇÕES E CONSTANTES ---
// Loops de áudio locais para testes sem dependência de rede externa
const TEST_LOOPS = [
  { id: 'guitar-clean-1', name: 'Guitarra Dedilhada (Clean 1)', url: cleanGuitarLoopUrl },
  { id: 'guitar-clean-2', name: 'Guitarra Dedilhada (Clean 2)', url: cleanGuitar2LoopUrl },
  { id: 'drum-loop', name: 'Bateria de Acompanhamento (Loop)', url: drumLoopUrl }
];

// Presets pré-configurados para o Pedalboard
const PRESETS = {
  clean: {
    name: 'Clean Chorus & Space',
    desc: 'Som limpo, cristalino com espacialidade e modulação suave',
    pedals: {
      comp: { active: true, params: { threshold: -24, ratio: 4, attack: 15 } },
      drive: { active: false, params: { gain: 20, tone: 3000, type: 'overdrive' } },
      eq: { active: true, params: { bass: 2, mid: -1, treble: 4 } },
      chorus: { active: true, params: { rate: 1.5, depth: 0.35, mix: 0.4 } },
      delay: { active: true, params: { time: 450, feedback: 0.3, mix: 0.35 } },
      reverb: { active: true, params: { decay: 2.2, mix: 0.4 } }
    },
    amp: 'tweed'
  },
  blues: {
    name: 'Texas Blues Crunch',
    desc: 'Distorção leve e orgânica com médios focados (estilo Tube Screamer)',
    pedals: {
      comp: { active: true, params: { threshold: -18, ratio: 3, attack: 20 } },
      drive: { active: true, params: { gain: 45, tone: 2400, type: 'overdrive' } },
      eq: { active: true, params: { bass: 1, mid: 3, treble: 1 } },
      chorus: { active: false, params: { rate: 1.0, depth: 0.2, mix: 0.2 } },
      delay: { active: true, params: { time: 300, feedback: 0.15, mix: 0.2 } },
      reverb: { active: true, params: { decay: 1.4, mix: 0.25 } }
    },
    amp: 'combo'
  },
  metal: {
    name: 'Heavy Metal Stack',
    desc: 'Alto ganho com graves pesados e agudos cortantes',
    pedals: {
      comp: { active: true, params: { threshold: -28, ratio: 6, attack: 10 } },
      drive: { active: true, params: { gain: 110, tone: 4200, type: 'fuzz' } },
      eq: { active: true, params: { bass: 5, mid: -4, treble: 6 } },
      chorus: { active: true, params: { rate: 0.8, depth: 0.15, mix: 0.2 } },
      delay: { active: true, params: { time: 380, feedback: 0.25, mix: 0.25 } },
      reverb: { active: true, params: { decay: 1.8, mix: 0.3 } }
    },
    amp: 'stack'
  },
  psychedelic: {
    name: 'Psychedelic Dream',
    desc: 'Efeitos espaciais profundos e modulação pulsante',
    pedals: {
      comp: { active: false, params: { threshold: -20, ratio: 4, attack: 15 } },
      drive: { active: true, params: { gain: 75, tone: 1800, type: 'fuzz' } },
      eq: { active: true, params: { bass: 0, mid: 2, treble: -2 } },
      chorus: { active: true, params: { rate: 3.5, depth: 0.7, mix: 0.6 } },
      delay: { active: true, params: { time: 650, feedback: 0.6, mix: 0.5 } },
      reverb: { active: true, params: { decay: 3.5, mix: 0.6 } }
    },
    amp: 'tweed'
  }
};

interface PedalboardAppProps {
  onNavigateToPsi: () => void;
}

export default function PedalboardApp({ onNavigateToPsi }: PedalboardAppProps) {
  // --- ESTADOS DA UI ---
  const [audioStarted, setAudioStarted] = useState(false);
  const [activeSource, setActiveSource] = useState<'none' | 'mic' | 'demo'>('none');
  const [selectedDemo, setSelectedDemo] = useState(TEST_LOOPS[0].url);
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [demoVolume, setDemoVolume] = useState(0.7);
  const [masterVolume, setMasterVolume] = useState(0.8);
  const [selectedAmp, setSelectedAmp] = useState<'stack' | 'combo' | 'tweed'>('combo');
  const [activePreset, setActivePreset] = useState<string | null>('clean');
  
  // Estados para ativar/desativar pedais individuais
  const [pedalStates, setPedalStates] = useState({
    comp: true,
    drive: false,
    eq: true,
    chorus: true,
    delay: true,
    reverb: true
  });

  // Parâmetros dos pedais
  const [compParams, setCompParams] = useState({ threshold: -24, ratio: 4, attack: 15 });
  const [driveParams, setDriveParams] = useState({ gain: 20, tone: 3000, type: 'overdrive' });
  const [eqParams, setEqParams] = useState({ bass: 2, mid: -1, treble: 4 });
  const [chorusParams, setChorusParams] = useState({ rate: 1.5, depth: 0.35, mix: 0.4 });
  const [delayParams, setDelayParams] = useState({ time: 450, feedback: 0.3, mix: 0.35 });
  const [reverbParams, setReverbParams] = useState({ decay: 2.2, mix: 0.4 });

  // --- REFS PARA O MOTOR DE ÁUDIO ---
  const audioCtxRef = useRef<AudioContext | null>(null);
  
  // Elementos HTML de Áudio para o Demo Player
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const mediaElementSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  
  // Fontes de Entrada de Áudio
  const micStreamRef = useRef<MediaStream | null>(null);
  const micSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  // Nós de Ganho de Entrada/Saída
  const inputGainNodeRef = useRef<GainNode | null>(null);
  const masterGainNodeRef = useRef<GainNode | null>(null);
  const demoGainNodeRef = useRef<GainNode | null>(null);

  // Nós de Efeitos Individuais
  
  // Compressor
  const compNodeRef = useRef<DynamicsCompressorNode | null>(null);
  const compWetGainRef = useRef<GainNode | null>(null);
  const compDryGainRef = useRef<GainNode | null>(null);
  
  // Drive (distortion/overdrive)
  const driveGainRef = useRef<GainNode | null>(null);
  const driveShaperRef = useRef<WaveShaperNode | null>(null);
  const drivePostFilterRef = useRef<BiquadFilterNode | null>(null);
  const driveBypassGainRef = useRef<GainNode | null>(null); // dry gain
  const driveWetGainRef = useRef<GainNode | null>(null);
  
  // EQ de 3 bandas
  const eqBassRef = useRef<BiquadFilterNode | null>(null);
  const eqMidRef = useRef<BiquadFilterNode | null>(null);
  const eqTrebleRef = useRef<BiquadFilterNode | null>(null);
  const eqBypassGainRef = useRef<GainNode | null>(null); // dry gain
  const eqWetGainRef = useRef<GainNode | null>(null);
  
  // Chorus
  const chorusInputGainRef = useRef<GainNode | null>(null);
  const chorusDelayRef = useRef<DelayNode | null>(null);
  const chorusLfoRef = useRef<OscillatorNode | null>(null);
  const chorusLfoGainRef = useRef<GainNode | null>(null);
  const chorusFeedbackGainRef = useRef<GainNode | null>(null);
  const chorusWetGainRef = useRef<GainNode | null>(null);
  const chorusDryGainRef = useRef<GainNode | null>(null);
  
  // Delay
  const delayInputGainRef = useRef<GainNode | null>(null);
  const delayNodeRef = useRef<DelayNode | null>(null);
  const delayFeedbackRef = useRef<GainNode | null>(null);
  const delayWetRef = useRef<GainNode | null>(null);
  const delayDryRef = useRef<GainNode | null>(null);
  
  // Reverb
  const reverbInputGainRef = useRef<GainNode | null>(null);
  const reverbNodeRef = useRef<ConvolverNode | null>(null);
  const reverbWetRef = useRef<GainNode | null>(null);
  const reverbDryRef = useRef<GainNode | null>(null);

  // Simulação de Amp & Cabinet
  const ampPreGainRef = useRef<GainNode | null>(null);
  const ampFilterHpRef = useRef<BiquadFilterNode | null>(null);
  const ampFilterMidRef = useRef<BiquadFilterNode | null>(null);
  const ampFilterLpRef = useRef<BiquadFilterNode | null>(null);

  // Analisador Visual
  const analyserNodeRef = useRef<AnalyserNode | null>(null);
  const visualizerCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // --- INICIALIZAR O MOTOR WEB AUDIO API ---
  const initAudio = async () => {
    if (audioCtxRef.current) return;

    // Criar o contexto com foco em baixa latência interativa
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass({ latencyHint: 'interactive' });
    audioCtxRef.current = ctx;

    // 1. Nós de Controle Master
    const inputGain = ctx.createGain();
    const demoGain = ctx.createGain();
    const masterGain = ctx.createGain();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;

    inputGainNodeRef.current = inputGain;
    demoGainNodeRef.current = demoGain;
    masterGainNodeRef.current = masterGain;
    analyserNodeRef.current = analyser;

    // Configurar Ganhos Iniciais
    demoGain.gain.setValueAtTime(demoVolume, ctx.currentTime);
    masterGain.gain.setValueAtTime(masterVolume, ctx.currentTime);

    // 2. Construir Nós de Efeitos

    // COMPRESSOR STAGE
    const compInput = ctx.createGain();
    const compOutput = ctx.createGain();
    const compWetGain = ctx.createGain();
    const compDryGain = ctx.createGain();
    const compNode = ctx.createDynamicsCompressor();

    compNodeRef.current = compNode;
    compWetGainRef.current = compWetGain;
    compDryGainRef.current = compDryGain;
    updateCompNode(compNode, compParams);

    compInput.connect(compNode);
    compNode.connect(compWetGain);
    compWetGain.connect(compOutput);
    compInput.connect(compDryGain);
    compDryGain.connect(compOutput);

    // DRIVE STAGE
    const driveInput = ctx.createGain();
    const driveOutput = ctx.createGain();
    const driveGain = ctx.createGain();
    const driveShaper = ctx.createWaveShaper();
    driveShaper.oversample = '4x';
    const drivePostFilter = ctx.createBiquadFilter();
    drivePostFilter.type = 'lowpass';
    const driveDry = ctx.createGain();
    const driveWet = ctx.createGain();

    driveGainRef.current = driveGain;
    driveShaperRef.current = driveShaper;
    drivePostFilterRef.current = drivePostFilter;
    driveBypassGainRef.current = driveDry;
    driveWetGainRef.current = driveWet;

    driveInput.connect(driveGain);
    driveGain.connect(driveShaper);
    driveShaper.connect(drivePostFilter);
    drivePostFilter.connect(driveWet);
    driveWet.connect(driveOutput);
    driveInput.connect(driveDry);
    driveDry.connect(driveOutput);

    // EQ STAGE
    const eqInput = ctx.createGain();
    const eqOutput = ctx.createGain();
    const eqBass = ctx.createBiquadFilter();
    eqBass.type = 'lowshelf';
    eqBass.frequency.setValueAtTime(80, ctx.currentTime);

    const eqMid = ctx.createBiquadFilter();
    eqMid.type = 'peaking';
    eqMid.frequency.setValueAtTime(800, ctx.currentTime);
    eqMid.Q.setValueAtTime(0.7, ctx.currentTime);

    const eqTreble = ctx.createBiquadFilter();
    eqTreble.type = 'highshelf';
    eqTreble.frequency.setValueAtTime(4000, ctx.currentTime);

    const eqDry = ctx.createGain();
    const eqWet = ctx.createGain();

    eqBassRef.current = eqBass;
    eqMidRef.current = eqMid;
    eqTrebleRef.current = eqTreble;
    eqBypassGainRef.current = eqDry;
    eqWetGainRef.current = eqWet;

    eqInput.connect(eqBass);
    eqBass.connect(eqMid);
    eqMid.connect(eqTreble);
    eqTreble.connect(eqWet);
    eqWet.connect(eqOutput);
    eqInput.connect(eqDry);
    eqDry.connect(eqOutput);

    // CHORUS STAGE
    const chorusInput = ctx.createGain();
    const chorusOutput = ctx.createGain();
    const chorusDelay = ctx.createDelay(0.1);
    const chorusLfo = ctx.createOscillator();
    const chorusLfoGain = ctx.createGain();
    const chorusFeedback = ctx.createGain();
    const chorusDry = ctx.createGain();
    const chorusWet = ctx.createGain();

    chorusLfo.type = 'sine';
    chorusLfoGain.gain.setValueAtTime(0.003, ctx.currentTime);
    chorusFeedback.gain.setValueAtTime(0.15, ctx.currentTime);

    chorusInputGainRef.current = chorusInput;
    chorusDelayRef.current = chorusDelay;
    chorusLfoRef.current = chorusLfo;
    chorusLfoGainRef.current = chorusLfoGain;
    chorusFeedbackGainRef.current = chorusFeedback;
    chorusDryGainRef.current = chorusDry;
    chorusWetGainRef.current = chorusWet;

    chorusLfo.connect(chorusLfoGain);
    chorusLfoGain.connect(chorusDelay.delayTime);
    chorusLfo.start();

    chorusInput.connect(chorusDry);
    chorusInput.connect(chorusDelay);
    chorusDelay.connect(chorusWet);
    chorusDelay.connect(chorusFeedback);
    chorusFeedback.connect(chorusDelay);
    chorusDry.connect(chorusOutput);
    chorusWet.connect(chorusOutput);

    // DELAY STAGE
    const delayInput = ctx.createGain();
    const delayOutput = ctx.createGain();
    const delayNode = ctx.createDelay(2.0);
    const delayFeedback = ctx.createGain();
    const delayDry = ctx.createGain();
    const delayWet = ctx.createGain();

    delayInputGainRef.current = delayInput;
    delayNodeRef.current = delayNode;
    delayFeedbackRef.current = delayFeedback;
    delayDryRef.current = delayDry;
    delayWetRef.current = delayWet;

    delayNode.connect(delayFeedback);
    delayFeedback.connect(delayNode);

    delayInput.connect(delayDry);
    delayInput.connect(delayNode);
    delayNode.connect(delayWet);
    delayDry.connect(delayOutput);
    delayWet.connect(delayOutput);

    // REVERB STAGE
    const reverbInput = ctx.createGain();
    const reverbOutput = ctx.createGain();
    const reverbNode = ctx.createConvolver();
    const reverbDry = ctx.createGain();
    const reverbWet = ctx.createGain();

    reverbInputGainRef.current = reverbInput;
    reverbNodeRef.current = reverbNode;
    reverbDryRef.current = reverbDry;
    reverbWetRef.current = reverbWet;

    reverbInput.connect(reverbDry);
    reverbInput.connect(reverbNode);
    reverbNode.connect(reverbWet);
    reverbDry.connect(reverbOutput);
    reverbWet.connect(reverbOutput);

    // AMP & CAB SIMULATOR STAGE
    const ampInput = ctx.createGain();
    const ampOutput = ctx.createGain();
    const ampPreGain = ctx.createGain();
    const ampFilterHp = ctx.createBiquadFilter();
    const ampFilterMid = ctx.createBiquadFilter();
    const ampFilterLp = ctx.createBiquadFilter();

    ampPreGainRef.current = ampPreGain;
    ampFilterHpRef.current = ampFilterHp;
    ampFilterMidRef.current = ampFilterMid;
    ampFilterLpRef.current = ampFilterLp;

    ampInput.connect(ampPreGain);
    ampPreGain.connect(ampFilterHp);
    ampFilterHp.connect(ampFilterMid);
    ampFilterMid.connect(ampFilterLp);
    ampFilterLp.connect(ampOutput);

    // 3. CONECTAR A GRADE DE SINAL EM SÉRIE (SERIAL CHAIN)
    inputGain.connect(compInput);
    demoGain.connect(compInput);

    compOutput.connect(driveInput);
    driveOutput.connect(eqInput);
    eqOutput.connect(chorusInput);
    chorusOutput.connect(delayInput);
    delayOutput.connect(reverbInput);
    reverbOutput.connect(ampInput);

    ampOutput.connect(masterGain);
    masterGain.connect(analyser);
    analyser.connect(ctx.destination);
    startVisualizer();
    setAudioStarted(true);
  };

  const updateCompNode = (node: DynamicsCompressorNode, params: typeof compParams) => {
    if (!audioCtxRef.current) return;
    const time = audioCtxRef.current.currentTime;
    node.threshold.setValueAtTime(params.threshold, time);
    node.ratio.setValueAtTime(params.ratio, time);
    node.attack.setValueAtTime(params.attack / 1000, time); // ms para segundos
    node.knee.setValueAtTime(10, time);
  };

  // --- GERAR CURVA DE DISTORÇÃO (WAVESHAPER) ---
  const makeDistortionCurve = (amount: number, type: string) => {
    const k = typeof amount === 'number' ? amount : 50;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    
    if (type === 'fuzz') {
      // Hard clipping / Sigmoide agressivo para Fuzz
      for (let i = 0; i < n_samples; ++i) {
        const x = (i * 2) / n_samples - 1;
        // Fuzz pesado usando tanh com ganho extremo
        curve[i] = Math.tanh(x * (k / 4)) * 1.5;
        // Clamp
        if (curve[i] > 1) curve[i] = 1;
        if (curve[i] < -1) curve[i] = -1;
      }
    } else {
      // Soft tube clipping para Overdrive
      const deg = Math.PI / 180;
      for (let i = 0; i < n_samples; ++i) {
        const x = (i * 2) / n_samples - 1;
        curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
      }
    }
    return curve;
  };

  // --- GERAR IMPULSO DE REVERB EXPONENCIAL ---
  const makeReverbImpulseResponse = (decay: number): AudioBuffer => {
    const ctx = audioCtxRef.current!;
    const rate = ctx.sampleRate;
    const length = rate * decay;
    const impulse = ctx.createBuffer(2, length, rate);
    
    const left = impulse.getChannelData(0);
    const right = impulse.getChannelData(1);

    for (let i = 0; i < length; i++) {
      const decayEnvelope = Math.exp(-i / (rate * (decay / 4.5)));
      // Ruído branco filtrado exponencialmente para simular difusão de reverberação natural
      left[i] = (Math.random() * 2 - 1) * decayEnvelope;
      right[i] = (Math.random() * 2 - 1) * decayEnvelope;
    }
    return impulse;
  };

  // --- APLICAR MUDANÇAS DE VOLUME E ROTAS DE BYPASS ---

  // Compressor
  useEffect(() => {
    if (!audioCtxRef.current || !compNodeRef.current) return;
    updateCompNode(compNodeRef.current, compParams);
    
    // Configurar bypass do Compressor
    const time = audioCtxRef.current.currentTime;
    if (compDryGainRef.current && compWetGainRef.current) {
      if (pedalStates.comp) {
        compDryGainRef.current.gain.setValueAtTime(0, time);
        compWetGainRef.current.gain.setValueAtTime(1.0, time);
      } else {
        compDryGainRef.current.gain.setValueAtTime(1.0, time);
        compWetGainRef.current.gain.setValueAtTime(0, time);
      }
    }
  }, [compParams, pedalStates.comp]);

  // Overdrive / Fuzz
  const updateDriveNode = () => {
    if (!audioCtxRef.current || !driveGainRef.current || !driveShaperRef.current || !drivePostFilterRef.current || !driveBypassGainRef.current || !driveWetGainRef.current) return;
    const ctx = audioCtxRef.current;
    const time = ctx.currentTime;

    if (pedalStates.drive) {
      // Se ativo: PreGanho boost -> Shaper -> PostFilter
      driveGainRef.current.gain.setValueAtTime(1 + (driveParams.gain / 15), time);
      driveShaperRef.current.curve = makeDistortionCurve(driveParams.gain * 2.5, driveParams.type);
      drivePostFilterRef.current.frequency.setValueAtTime(driveParams.tone, time);
      
      driveWetGainRef.current.gain.setValueAtTime(1.0, time);
      driveBypassGainRef.current.gain.setValueAtTime(0, time);
    } else {
      // Se inativo: drive ganho em 0, bypass em 1
      driveGainRef.current.gain.setValueAtTime(0, time);
      driveWetGainRef.current.gain.setValueAtTime(0, time);
      driveBypassGainRef.current.gain.setValueAtTime(1.0, time);
    }
  };

  useEffect(() => {
    updateDriveNode();
  }, [pedalStates.drive, driveParams]);

  // EQ de 3 bandas
  const updateEQNode = () => {
    if (!audioCtxRef.current || !eqBassRef.current || !eqMidRef.current || !eqTrebleRef.current || !eqBypassGainRef.current || !eqWetGainRef.current) return;
    const ctx = audioCtxRef.current;
    const time = ctx.currentTime;

    if (pedalStates.eq) {
      eqBassRef.current.gain.setValueAtTime(eqParams.bass, time);
      eqMidRef.current.gain.setValueAtTime(eqParams.mid, time);
      eqTrebleRef.current.gain.setValueAtTime(eqParams.treble, time);
      
      eqWetGainRef.current.gain.setValueAtTime(1.0, time);
      eqBypassGainRef.current.gain.setValueAtTime(0, time);
    } else {
      // Bypass
      eqWetGainRef.current.gain.setValueAtTime(0, time);
      eqBypassGainRef.current.gain.setValueAtTime(1.0, time);
    }
  };

  useEffect(() => {
    updateEQNode();
  }, [pedalStates.eq, eqParams]);

  // Chorus
  const updateChorusNode = () => {
    if (!audioCtxRef.current || !chorusInputGainRef.current || !chorusDelayRef.current || !chorusLfoRef.current || !chorusLfoGainRef.current || !chorusFeedbackGainRef.current || !chorusDryGainRef.current || !chorusWetGainRef.current) return;
    const ctx = audioCtxRef.current;
    const time = ctx.currentTime;

    if (pedalStates.chorus) {
      // Modulação de delay ativa
      chorusLfoRef.current.frequency.setValueAtTime(chorusParams.rate, time);
      chorusLfoGainRef.current.gain.setValueAtTime(chorusParams.depth * 0.005, time); // profundidade do atraso em ms
      
      const wetMix = chorusParams.mix;
      const dryMix = 1.0 - wetMix;

      chorusInputGainRef.current.gain.setValueAtTime(1.0, time);
      chorusDryGainRef.current.gain.setValueAtTime(dryMix, time);
      chorusWetGainRef.current.gain.setValueAtTime(wetMix, time);
    } else {
      // Inativo: sinal limpo passa inteiro, wet zerado
      chorusInputGainRef.current.gain.setValueAtTime(1.0, time);
      chorusDryGainRef.current.gain.setValueAtTime(1.0, time);
      chorusWetGainRef.current.gain.setValueAtTime(0, time);
    }
  };

  useEffect(() => {
    updateChorusNode();
  }, [pedalStates.chorus, chorusParams]);

  // Delay
  const updateDelayNode = () => {
    if (!audioCtxRef.current || !delayInputGainRef.current || !delayNodeRef.current || !delayFeedbackRef.current || !delayDryRef.current || !delayWetRef.current) return;
    const ctx = audioCtxRef.current;
    const time = ctx.currentTime;

    if (pedalStates.delay) {
      delayNodeRef.current.delayTime.setValueAtTime(delayParams.time / 1000, time);
      delayFeedbackRef.current.gain.setValueAtTime(delayParams.feedback, time);
      
      const wetMix = delayParams.mix;
      const dryMix = 1.0 - wetMix;

      delayInputGainRef.current.gain.setValueAtTime(1.0, time);
      delayDryRef.current.gain.setValueAtTime(dryMix, time);
      delayWetRef.current.gain.setValueAtTime(wetMix, time);
    } else {
      delayInputGainRef.current.gain.setValueAtTime(1.0, time);
      delayDryRef.current.gain.setValueAtTime(1.0, time);
      delayWetRef.current.gain.setValueAtTime(0, time);
    }
  };

  useEffect(() => {
    updateDelayNode();
  }, [pedalStates.delay, delayParams]);

  // Reverb
  const updateReverbNode = () => {
    if (!audioCtxRef.current || !reverbInputGainRef.current || !reverbNodeRef.current || !reverbDryRef.current || !reverbWetRef.current) return;
    const ctx = audioCtxRef.current;
    const time = ctx.currentTime;

    if (pedalStates.reverb) {
      reverbNodeRef.current.buffer = makeReverbImpulseResponse(reverbParams.decay);
      
      const wetMix = reverbParams.mix;
      const dryMix = 1.0 - wetMix;

      reverbInputGainRef.current.gain.setValueAtTime(1.0, time);
      reverbDryRef.current.gain.setValueAtTime(dryMix, time);
      reverbWetRef.current.gain.setValueAtTime(wetMix, time);
    } else {
      reverbInputGainRef.current.gain.setValueAtTime(1.0, time);
      reverbDryRef.current.gain.setValueAtTime(1.0, time);
      reverbWetRef.current.gain.setValueAtTime(0, time);
    }
  };

  useEffect(() => {
    updateReverbNode();
  }, [pedalStates.reverb, reverbParams]);

  // Simulação de Amplificador
  const updateAmpSimulator = () => {
    if (!audioCtxRef.current || !ampFilterHpRef.current || !ampFilterMidRef.current || !ampFilterLpRef.current || !ampPreGainRef.current) return;
    const ctx = audioCtxRef.current;
    const time = ctx.currentTime;

    // Ajuste de ganho padrão de pré-amplificação
    ampPreGainRef.current.gain.setValueAtTime(1.0, time);

    if (selectedAmp === 'stack') {
      // 4x12 Marshall Stack: graves cheios, médios ligeiramente cavados, corte agudo drástico
      ampFilterHpRef.current.type = 'highpass';
      ampFilterHpRef.current.frequency.setValueAtTime(75, time);

      ampFilterMidRef.current.type = 'peaking';
      ampFilterMidRef.current.frequency.setValueAtTime(2800, time);
      ampFilterMidRef.current.Q.setValueAtTime(1.2, time);
      ampFilterMidRef.current.gain.setValueAtTime(4.0, time); // boost de presença metal

      ampFilterLpRef.current.type = 'lowpass';
      ampFilterLpRef.current.frequency.setValueAtTime(4200, time); // corte acentuado de speaker real
    } else if (selectedAmp === 'combo') {
      // 2x12 Fender Twin Combo: limpo, agudos brilhantes e cristalinos
      ampFilterHpRef.current.type = 'highpass';
      ampFilterHpRef.current.frequency.setValueAtTime(90, time);

      ampFilterMidRef.current.type = 'peaking';
      ampFilterMidRef.current.frequency.setValueAtTime(3500, time);
      ampFilterMidRef.current.Q.setValueAtTime(0.8, time);
      ampFilterMidRef.current.gain.setValueAtTime(2.0, time); // presença brilhante

      ampFilterLpRef.current.type = 'lowpass';
      ampFilterLpRef.current.frequency.setValueAtTime(5000, time);
    } else {
      // Vox AC30 / Tweed Combo: médios quentes
      ampFilterHpRef.current.type = 'highpass';
      ampFilterHpRef.current.frequency.setValueAtTime(110, time);

      ampFilterMidRef.current.type = 'peaking';
      ampFilterMidRef.current.frequency.setValueAtTime(900, time);
      ampFilterMidRef.current.Q.setValueAtTime(0.9, time);
      ampFilterMidRef.current.gain.setValueAtTime(5.0, time); // boost vintage nos médios

      ampFilterLpRef.current.type = 'lowpass';
      ampFilterLpRef.current.frequency.setValueAtTime(4600, time);
    }

    // Encadear filtros do amplificador
    try {
      ampPreGainRef.current.disconnect();
      ampFilterHpRef.current.disconnect();
      ampFilterMidRef.current.disconnect();
    } catch(e) {}

    ampPreGainRef.current.connect(ampFilterHpRef.current);
    ampFilterHpRef.current.connect(ampFilterMidRef.current);
    ampFilterMidRef.current.connect(ampFilterLpRef.current);
  };

  useEffect(() => {
    updateAmpSimulator();
  }, [selectedAmp]);

  // Master Volume
  useEffect(() => {
    if (!audioCtxRef.current || !masterGainNodeRef.current) return;
    masterGainNodeRef.current.gain.setValueAtTime(masterVolume, audioCtxRef.current.currentTime);
  }, [masterVolume]);

  // Demo Volume
  useEffect(() => {
    if (!audioCtxRef.current || !demoGainNodeRef.current) return;
    demoGainNodeRef.current.gain.setValueAtTime(demoVolume, audioCtxRef.current.currentTime);
  }, [demoVolume]);

  // --- APLICAR PRESET SELECIONADO ---
  const applyPreset = (presetKey: keyof typeof PRESETS) => {
    const preset = PRESETS[presetKey];
    if (!preset) return;

    setActivePreset(presetKey);
    setSelectedAmp(preset.amp as any);
    setPedalStates({
      comp: preset.pedals.comp.active,
      drive: preset.pedals.drive.active,
      eq: preset.pedals.eq.active,
      chorus: preset.pedals.chorus.active,
      delay: preset.pedals.delay.active,
      reverb: preset.pedals.reverb.active
    });

    setCompParams(preset.pedals.comp.params);
    setDriveParams(preset.pedals.drive.params as any);
    setEqParams(preset.pedals.eq.params);
    setChorusParams(preset.pedals.chorus.params);
    setDelayParams(preset.pedals.delay.params);
    setReverbParams(preset.pedals.reverb.params);
  };

  // --- CONTROLE DE FONTES DE ENTRADA ---

  // Ativar Guitarra / Microfone
  const startMicInput = async () => {
    await initAudio();
    const ctx = audioCtxRef.current!;

    // Pausar demo se estiver tocando
    if (isPlayingDemo) {
      audioElRef.current?.pause();
      setIsPlayingDemo(false);
    }

    try {
      // Capturar áudio puro sem filtros de chamada de voz
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        } as any
      });

      micStreamRef.current = stream;
      
      // Desconectar fonte antiga se houver
      if (micSourceRef.current) {
        micSourceRef.current.disconnect();
      }

      const micSource = ctx.createMediaStreamSource(stream);
      micSourceRef.current = micSource;
      
      // Conectar ao ganho de entrada
      micSource.connect(inputGainNodeRef.current!);
      setActiveSource('mic');
    } catch (err) {
      console.error('Erro ao acessar microfone/entrada de áudio:', err);
      alert('Não foi possível acessar a entrada de áudio. Verifique as permissões do seu navegador.');
    }
  };

  // Desativar Guitarra / Microfone
  const stopMicInput = () => {
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
    }
    if (micSourceRef.current) {
      try {
        micSourceRef.current.disconnect();
      } catch(e) {}
      micSourceRef.current = null;
    }
    setActiveSource('none');
  };

  // Lidar com seleção de áudio de teste
  const toggleDemoPlayback = async () => {
    await initAudio();
    const ctx = audioCtxRef.current!;

    // Parar microfone se estiver ativo
    if (activeSource === 'mic') {
      stopMicInput();
    }

    // Instanciar player de áudio HTML5 se não existir
    if (!audioElRef.current) {
      const audio = new Audio();
      audio.crossOrigin = 'anonymous';
      audio.loop = true;
      audioElRef.current = audio;

      const mediaSource = ctx.createMediaElementSource(audio);
      mediaElementSourceRef.current = mediaSource;
      mediaSource.connect(demoGainNodeRef.current!);
    }

    const audioEl = audioElRef.current;

    if (isPlayingDemo) {
      audioEl.pause();
      setIsPlayingDemo(false);
      setActiveSource('none');
    } else {
      audioEl.src = selectedDemo;
      audioEl.load();
      try {
        await ctx.resume();
        await audioEl.play();
        setIsPlayingDemo(true);
        setActiveSource('demo');
      } catch (err) {
        console.error('Erro ao reproduzir demo:', err);
        alert('Erro ao carregar o arquivo de áudio de teste. Tente novamente.');
      }
    }
  };

  useEffect(() => {
    if (audioElRef.current && isPlayingDemo) {
      audioElRef.current.src = selectedDemo;
      audioElRef.current.load();
      audioElRef.current.play().catch(e => console.error(e));
    }
  }, [selectedDemo]);

  // --- VISUALIZADOR DE ÁUDIO NO CANVAS ---
  const startVisualizer = () => {
    const canvas = visualizerCanvasRef.current;
    if (!canvas || !analyserNodeRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = analyserNodeRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationFrameRef.current = requestAnimationFrame(draw);
      
      const width = canvas.width;
      const height = canvas.height;

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = '#13151a'; // fundo escuro
      ctx.fillRect(0, 0, width, height);

      // Desenhar barra de espectro
      const barWidth = (width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 0.7; // escala

        // Degradê moderno neon
        const percent = i / bufferLength;
        const r = Math.floor(0 + percent * 255);
        const g = Math.floor(229 - percent * 100);
        const b = Math.floor(163 + percent * 90);

        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight);

        x += barWidth;
      }

      // Linha sutil indicando sinal de saída
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();
    };

    draw();
  };

  // Limpar recursos ao desmontar
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioElRef.current) {
        audioElRef.current.pause();
        audioElRef.current = null;
      }
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(e => console.error(e));
      }
    };
  }, []);

  // --- REUSABLE KNOB COMPONENT (MOUSE DRAG ROTATION) ---
  interface KnobProps {
    label: string;
    min: number;
    max: number;
    value: number;
    step?: number;
    color?: string;
    onChange: (val: number) => void;
    unit?: string;
  }

  const Knob = ({ label, min, max, value, step = 1, color = 'var(--color-comp)', onChange, unit = '' }: KnobProps) => {
    const startY = useRef(0);
    const startValue = useRef(0);

    const handleMouseDown = (e: React.MouseEvent) => {
      startY.current = e.clientY;
      startValue.current = value;
      
      const handleMouseMove = (moveEvent: MouseEvent) => {
        const deltaY = startY.current - moveEvent.clientY; // Arrastar para cima aumenta
        const range = max - min;
        // Ajustar sensibilidade baseada no range do parâmetro
        const sensitivity = range / 200; 
        let newValue = startValue.current + deltaY * sensitivity;
        
        // Truncar para o passo desejado
        newValue = Math.round(newValue / step) * step;
        
        // Clamp
        if (newValue > max) newValue = max;
        if (newValue < min) newValue = min;

        onChange(newValue);
      };

      const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    };

    // Mapear valor atual para ângulo de rotação (-135 a 135 graus para sweep de 270 graus)
    const percentage = (value - min) / (max - min);
    const rotationAngle = -135 + percentage * 270;

    return (
      <div className="knob-wrapper" onMouseDown={handleMouseDown}>
        <span className="knob-label">{label}</span>
        <div 
          className="knob-body" 
          style={{ 
            transform: `rotate(${rotationAngle}deg)`,
            '--pedal-accent': color 
          } as any}
        >
          <div className="knob-indicator-dot" style={{ backgroundColor: color }}></div>
        </div>
        <span className="knob-value-display">
          {value.toFixed(step < 1 ? 1 : 0)}{unit}
        </span>
      </div>
    );
  };

  return (
    <div className="pedalboard-container">
      <div className="pedalboard-grid-overlay" />
      
      {/* 1. HEADER E BARRA DE NAVEGAÇÃO DE ROTAS */}
      <header className="pedalboard-header">
        <div className="pedalboard-title-group">
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Sparkles size={24} color="#00E5C8" />
            PedalStream
            {audioStarted && (
              <span style={{ 
                fontSize: '0.65rem', 
                backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                color: '#10B981', 
                border: '1px solid rgba(16, 185, 129, 0.3)',
                padding: '2px 8px', 
                borderRadius: '99px',
                verticalAlign: 'middle',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }}></span>
                DSP Ativo
              </span>
            )}
          </h1>
          <p>Seu Pedalboard Virtual e Simulador de Amplificador Profissional em Tempo Real</p>
        </div>

        <div className="pedalboard-nav-switcher">
          <button 
            className="btn-route-switch" 
            onClick={onNavigateToPsi}
            style={{ borderColor: 'rgba(255, 255, 255, 0.15)' }}
          >
            ← Voltar para Psicologia
          </button>
        </div>
      </header>

      {/* 2. HUBS DE CONTROLE (ギターインプット, デモプレーヤー, アンプシム) */}
      <section className="control-hub">
        
        {/* Painel Entrada de Áudio */}
        <div className="hub-panel">
          <h2>
            <Mic size={16} /> Entrada de Sinal
          </h2>
          <div className="audio-source-selectors">
            <button 
              className={`source-btn ${activeSource === 'mic' ? 'active-warn' : ''}`}
              onClick={activeSource === 'mic' ? stopMicInput : startMicInput}
            >
              <div className="source-info">
                <span className="source-title">Instrumento / Microfone</span>
                <span className="source-desc">Conecte sua guitarra à interface de áudio</span>
              </div>
              <div className="status-indicator-dot" />
            </button>

            <button 
              className={`source-btn ${activeSource === 'demo' ? 'active' : ''}`}
              onClick={toggleDemoPlayback}
            >
              <div className="source-info">
                <span className="source-title">Guitarra Virtual (Loop)</span>
                <span className="source-desc">Use loops limpos pré-gravados para testes rápidos</span>
              </div>
              <div className="status-indicator-dot" />
            </button>
          </div>
        </div>

        {/* Painel Reprodutor Demo */}
        <div className="hub-panel">
          <h2>
            <Music size={16} /> Guitarra Virtual (Player)
          </h2>
          <div className="demo-player-ui">
            <select 
              className="demo-selector"
              value={selectedDemo}
              onChange={(e) => {
                setSelectedDemo(e.target.value);
                if (isPlayingDemo && audioElRef.current) {
                  audioElRef.current.src = e.target.value;
                  audioElRef.current.load();
                  audioElRef.current.play().catch(err => console.error(err));
                }
              }}
            >
              {TEST_LOOPS.map(loop => (
                <option key={loop.id} value={loop.url}>{loop.name}</option>
              ))}
            </select>

            <div className="demo-controls-row">
              <button 
                className={`play-pause-btn ${isPlayingDemo ? 'playing' : ''}`}
                onClick={toggleDemoPlayback}
                title={isPlayingDemo ? 'Pausar' : 'Tocar Loop de Teste'}
              >
                {isPlayingDemo ? <Pause size={18} /> : <Play size={18} />}
              </button>

              <div className="slider-container">
                <div className="slider-label">
                  <span>Ganho do Loop</span>
                  <span>{Math.round(demoVolume * 100)}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1.2" 
                  step="0.05"
                  value={demoVolume} 
                  onChange={(e) => setDemoVolume(parseFloat(e.target.value))}
                  className="input-slider" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Painel Simulador de Amplificador e Visualizador */}
        <div className="hub-panel" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <h2>
            <Activity size={16} /> Resposta Tonal & Amp Sim
          </h2>
          
          <div className="amp-sim-hub">
            <div className="amp-selector-grid">
              <button 
                className={`amp-btn ${selectedAmp === 'stack' ? 'active' : ''}`}
                onClick={() => setSelectedAmp('stack')}
              >
                4x12 Stack
              </button>
              <button 
                className={`amp-btn ${selectedAmp === 'combo' ? 'active' : ''}`}
                onClick={() => setSelectedAmp('combo')}
              >
                2x12 Combo
              </button>
              <button 
                className={`amp-btn ${selectedAmp === 'tweed' ? 'active' : ''}`}
                onClick={() => setSelectedAmp('tweed')}
              >
                1x12 Tweed
              </button>
            </div>

            <div className="visualizer-canvas-container">
              <canvas 
                ref={visualizerCanvasRef} 
                width="300" 
                height="60" 
                className="visualizer-canvas"
              />
            </div>
          </div>
        </div>

      </section>

      {/* 3. FLUXO VISUAL DO SINAL (SIGNAL CHAIN) */}
      <div className="signal-chain-indicator">
        <span className="chain-node input">Input</span>
        <span className="chain-arrow">→</span>
        <span className={`chain-node comp ${pedalStates.comp ? 'active' : ''}`}>Compressor</span>
        <span className="chain-arrow">→</span>
        <span className={`chain-node drive ${pedalStates.drive ? 'active' : ''}`}>Drive</span>
        <span className="chain-arrow">→</span>
        <span className={`chain-node eq ${pedalStates.eq ? 'active' : ''}`}>EQ</span>
        <span className="chain-arrow">→</span>
        <span className={`chain-node chorus ${pedalStates.chorus ? 'active' : ''}`}>Chorus</span>
        <span className="chain-arrow">→</span>
        <span className={`chain-node delay ${pedalStates.delay ? 'active' : ''}`}>Delay</span>
        <span className="chain-arrow">→</span>
        <span className={`chain-node reverb ${pedalStates.reverb ? 'active' : ''}`}>Reverb</span>
        <span className="chain-arrow">→</span>
        <span className="chain-node amp active">{selectedAmp.toUpperCase()} AMP</span>
        <span className="chain-arrow">→</span>
        <span className="chain-node output">Output</span>
      </div>

      {/* 4. SELETOR DE PRESETS E MASTER VOLUME */}
      <div className="presets-bar">
        <div className="presets-group">
          <span className="preset-title">Presets de Áudio:</span>
          <div className="preset-btn-strip">
            <button 
              className={`preset-pill ${activePreset === 'clean' ? 'active' : ''}`}
              onClick={() => applyPreset('clean')}
            >
              Clean Chorus
            </button>
            <button 
              className={`preset-pill ${activePreset === 'blues' ? 'active' : ''}`}
              onClick={() => applyPreset('blues')}
            >
              Texas Crunch
            </button>
            <button 
              className={`preset-pill ${activePreset === 'metal' ? 'active' : ''}`}
              onClick={() => applyPreset('metal')}
            >
              Metal Stack
            </button>
            <button 
              className={`preset-pill ${activePreset === 'psychedelic' ? 'active' : ''}`}
              onClick={() => applyPreset('psychedelic')}
            >
              Space Dream
            </button>
          </div>
        </div>

        <div className="master-controls">
          <div className="master-volume-panel">
            <span className="master-vol-label">Master Out</span>
            <input 
              type="range" 
              min="0" 
              max="1.5" 
              step="0.05"
              value={masterVolume} 
              onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
              className="input-slider" 
              style={{ width: '100px' }}
            />
          </div>
        </div>
      </div>

      {/* 5. A GRADE DE PEDAIS (STOMPBOXES GRID) */}
      <section className="pedals-grid">

        {/* COMPRESSOR PEDAL */}
        <div className="guitar-pedal pedal-comp">
          <div className="pedal-header">
            <span className="pedal-logo-text">SQUEEZE</span>
            <span className="pedal-name">Dynapress</span>
            <span className="pedal-type">Compressor</span>
          </div>

          <div className="pedal-knobs-area">
            <Knob 
              label="Sustain" 
              min={-40} 
              max={-10} 
              step={1}
              value={compParams.threshold} 
              onChange={(v) => setCompParams(prev => ({ ...prev, threshold: v }))}
              color="var(--color-comp)"
              unit="dB"
            />
            <Knob 
              label="Ratio" 
              min={1} 
              max={10} 
              step={0.5}
              value={compParams.ratio} 
              onChange={(v) => setCompParams(prev => ({ ...prev, ratio: v }))}
              color="var(--color-comp)"
              unit=":1"
            />
            <Knob 
              label="Attack" 
              min={5} 
              max={50} 
              step={1}
              value={compParams.attack} 
              onChange={(v) => setCompParams(prev => ({ ...prev, attack: v }))}
              color="var(--color-comp)"
              unit="ms"
            />
          </div>

          <div className="pedal-footswitch-area">
            <div className={`pedal-led ${pedalStates.comp ? 'active' : ''}`} style={{ '--pedal-accent': 'var(--color-comp)' } as any} />
            <button 
              className="pedal-stomp-button"
              onClick={() => setPedalStates(prev => ({ ...prev, comp: !prev.comp }))}
            />
            <span className="pedal-bypass-label">Bypass</span>
          </div>
        </div>

        {/* DRIVE PEDAL */}
        <div className="guitar-pedal pedal-drive">
          <div className="pedal-header">
            <span className="pedal-logo-text">VINTAGE</span>
            <span className="pedal-name">Tube Overdrive</span>
            <span className="pedal-type">Drive / Fuzz</span>
          </div>

          <div className="pedal-toggle-row">
            <select 
              className="pedal-mode-select"
              value={driveParams.type}
              onChange={(e) => setDriveParams(prev => ({ ...prev, type: e.target.value }))}
            >
              <option value="overdrive">Crunch OD</option>
              <option value="fuzz">Heavy Fuzz</option>
            </select>
          </div>

          <div className="pedal-knobs-area">
            <Knob 
              label="Drive" 
              min={1} 
              max={150} 
              step={1}
              value={driveParams.gain} 
              onChange={(v) => setDriveParams(prev => ({ ...prev, gain: v }))}
              color="var(--color-drive)"
            />
            <Knob 
              label="Filter" 
              min={800} 
              max={5000} 
              step={50}
              value={driveParams.tone} 
              onChange={(v) => setDriveParams(prev => ({ ...prev, tone: v }))}
              color="var(--color-drive)"
              unit="Hz"
            />
          </div>

          <div className="pedal-footswitch-area">
            <div className={`pedal-led ${pedalStates.drive ? 'active' : ''}`} style={{ '--pedal-accent': 'var(--color-drive)' } as any} />
            <button 
              className="pedal-stomp-button"
              onClick={() => setPedalStates(prev => ({ ...prev, drive: !prev.drive }))}
            />
            <span className="pedal-bypass-label">Bypass</span>
          </div>
        </div>

        {/* EQUALIZER PEDAL */}
        <div className="guitar-pedal pedal-eq">
          <div className="pedal-header">
            <span className="pedal-logo-text">SHAPE</span>
            <span className="pedal-name">Tone Equalizer</span>
            <span className="pedal-type">EQ de 3 bandas</span>
          </div>

          <div className="pedal-knobs-area triple-knobs">
            <Knob 
              label="Grave" 
              min={-12} 
              max={12} 
              step={1}
              value={eqParams.bass} 
              onChange={(v) => setEqParams(prev => ({ ...prev, bass: v }))}
              color="var(--color-eq)"
              unit="dB"
            />
            <Knob 
              label="Médio" 
              min={-12} 
              max={12} 
              step={1}
              value={eqParams.mid} 
              onChange={(v) => setEqParams(prev => ({ ...prev, mid: v }))}
              color="var(--color-eq)"
              unit="dB"
            />
            <Knob 
              label="Agudo" 
              min={-12} 
              max={12} 
              step={1}
              value={eqParams.treble} 
              onChange={(v) => setEqParams(prev => ({ ...prev, treble: v }))}
              color="var(--color-eq)"
              unit="dB"
            />
          </div>

          <div className="pedal-footswitch-area">
            <div className={`pedal-led ${pedalStates.eq ? 'active' : ''}`} style={{ '--pedal-accent': 'var(--color-eq)' } as any} />
            <button 
              className="pedal-stomp-button"
              onClick={() => setPedalStates(prev => ({ ...prev, eq: !prev.eq }))}
            />
            <span className="pedal-bypass-label">Bypass</span>
          </div>
        </div>

        {/* CHORUS PEDAL */}
        <div className="guitar-pedal pedal-chorus">
          <div className="pedal-header">
            <span className="pedal-logo-text">MODULATE</span>
            <span className="pedal-name">Ocean Swell</span>
            <span className="pedal-type">Stereo Chorus</span>
          </div>

          <div className="pedal-knobs-area">
            <Knob 
              label="Rate" 
              min={0.2} 
              max={6.0} 
              step={0.1}
              value={chorusParams.rate} 
              onChange={(v) => setChorusParams(prev => ({ ...prev, rate: v }))}
              color="var(--color-chorus)"
              unit="Hz"
            />
            <Knob 
              label="Depth" 
              min={0.1} 
              max={0.9} 
              step={0.05}
              value={chorusParams.depth} 
              onChange={(v) => setChorusParams(prev => ({ ...prev, depth: v }))}
              color="var(--color-chorus)"
            />
            <Knob 
              label="Mix" 
              min={0.1} 
              max={0.8} 
              step={0.05}
              value={chorusParams.mix} 
              onChange={(v) => setChorusParams(prev => ({ ...prev, mix: v }))}
              color="var(--color-chorus)"
            />
          </div>

          <div className="pedal-footswitch-area">
            <div className={`pedal-led ${pedalStates.chorus ? 'active' : ''}`} style={{ '--pedal-accent': 'var(--color-chorus)' } as any} />
            <button 
              className="pedal-stomp-button"
              onClick={() => setPedalStates(prev => ({ ...prev, chorus: !prev.chorus }))}
            />
            <span className="pedal-bypass-label">Bypass</span>
          </div>
        </div>

        {/* DELAY PEDAL */}
        <div className="guitar-pedal pedal-delay">
          <div className="pedal-header">
            <span className="pedal-logo-text">TIME ECHO</span>
            <span className="pedal-name">Aether Delay</span>
            <span className="pedal-type">Analog Echo</span>
          </div>

          <div className="pedal-knobs-area">
            <Knob 
              label="Time" 
              min={80} 
              max={1000} 
              step={10}
              value={delayParams.time} 
              onChange={(v) => setDelayParams(prev => ({ ...prev, time: v }))}
              color="var(--color-delay)"
              unit="ms"
            />
            <Knob 
              label="Feedback" 
              min={0.0} 
              max={0.85} 
              step={0.05}
              value={delayParams.feedback} 
              onChange={(v) => setDelayParams(prev => ({ ...prev, feedback: v }))}
              color="var(--color-delay)"
            />
            <Knob 
              label="Level" 
              min={0.1} 
              max={0.8} 
              step={0.05}
              value={delayParams.mix} 
              onChange={(v) => setDelayParams(prev => ({ ...prev, mix: v }))}
              color="var(--color-delay)"
            />
          </div>

          <div className="pedal-footswitch-area">
            <div className={`pedal-led ${pedalStates.delay ? 'active' : ''}`} style={{ '--pedal-accent': 'var(--color-delay)' } as any} />
            <button 
              className="pedal-stomp-button"
              onClick={() => setPedalStates(prev => ({ ...prev, delay: !prev.delay }))}
            />
            <span className="pedal-bypass-label">Bypass</span>
          </div>
        </div>

        {/* REVERB PEDAL */}
        <div className="guitar-pedal pedal-reverb">
          <div className="pedal-header">
            <span className="pedal-logo-text">AMBIENT</span>
            <span className="pedal-name">Nebula Reverb</span>
            <span className="pedal-type">Space Reverb</span>
          </div>

          <div className="pedal-knobs-area">
            <Knob 
              label="Decay" 
              min={0.5} 
              max={5.0} 
              step={0.1}
              value={reverbParams.decay} 
              onChange={(v) => setReverbParams(prev => ({ ...prev, decay: v }))}
              color="var(--color-reverb)"
              unit="s"
            />
            <Knob 
              label="Mix" 
              min={0.0} 
              max={0.8} 
              step={0.05}
              value={reverbParams.mix} 
              onChange={(v) => setReverbParams(prev => ({ ...prev, mix: v }))}
              color="var(--color-reverb)"
            />
          </div>

          <div className="pedal-footswitch-area">
            <div className={`pedal-led ${pedalStates.reverb ? 'active' : ''}`} style={{ '--pedal-accent': 'var(--color-reverb)' } as any} />
            <button 
              className="pedal-stomp-button"
              onClick={() => setPedalStates(prev => ({ ...prev, reverb: !prev.reverb }))}
            />
            <span className="pedal-bypass-label">Bypass</span>
          </div>
        </div>

      </section>

      {/* 6. INSTRUÇÕES DE USO */}
      <section className="pedalboard-instructions">
        <h3>
          <HelpCircle size={16} style={{ verticalAlign: 'middle', marginRight: '0.4rem' }} />
          Instruções de Configuração e Uso:
        </h3>
        <ul>
          <li>
            <strong>Para testar instantaneamente</strong>: Clique no botão do player demo <strong>"Guitarra Virtual (Loop)"</strong> no topo. Um dedilhado limpo de guitarra começará a rodar e você poderá ligar/desligar pedais e arrastar seus knobs para modelar o som!
          </li>
          <li>
            <strong>Controle de Knobs</strong>: Clique e <strong>arraste verticalmente</strong> com o mouse para cima ou para baixo para girar os potenciômetros e ajustar os parâmetros.
          </li>
          <li>
            <strong>Conectando sua guitarra real</strong>:
            <ol style={{ paddingLeft: '1.2rem', marginTop: '0.4rem' }}>
              <li>Conecte sua guitarra a uma placa/interface de áudio USB ou entrada de linha do PC.</li>
              <li>Certifique-se de que o ganho da sua interface está regulado para não clipar.</li>
              <li>Clique no botão <strong>"Instrumento / Microfone"</strong> no topo para ativar a entrada física de áudio em tempo real.</li>
            </ol>
          </li>
          <li>
            <strong>Dica de Navegador</strong>: Para obter a melhor resposta dinâmica e menor latência, recomendamos o uso de navegadores baseados em Chromium (Google Chrome, Microsoft Edge, Opera).
          </li>
        </ul>
      </section>
    </div>
  );
}
