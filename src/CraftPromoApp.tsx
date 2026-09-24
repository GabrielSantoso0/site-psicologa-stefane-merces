import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, Laptop, Smartphone, 
  Search, Briefcase, ArrowRight, Compass, 
  ExternalLink, Bell, Users, Send, MessageSquare, Share2, Video, Check
} from 'lucide-react';

// --- CONFIGURAÇÕES DA LINHA DO TEMPO (EM SEGUNDOS) ---
const TIMELINE = {
  INTRO_END: 4.5,         // Cena 1: Take de Colaboradores (0s a 4.5s)
  ZOOM_END: 8.5,          // Transição/Zoom aproximando da Tela (4.5s a 8.5s)
  PROFILE_END: 16.5,      // Tela do LinkedIn - Aba Publicações ativa (8.5s a 16.5s)
  JOBS_EXPLORE_END: 24.5, // Aba Vagas ativa, navegando nas vagas (16.5s a 24.5s)
  JOB_DETAIL_END: 31.5,   // Abre Detalhe da Vaga e clica em Candidatar-se (24.5s a 31.5s)
  TOTAL_DURATION: 38      // Outro / CTA Final em Vermelho com logo (31.5s a 38s)
};

// --- DADOS DAS VAGAS REAIS DA CRAFT ---
const CRAFT_JOBS = [
  {
    id: 'assistente-ti',
    title: 'ASSISTENTE DE TECNOLOGIA - VAGA EXCLUSIVA PCD',
    location: 'São Paulo, Brasil (Híbrido)',
    type: 'Tempo integral',
    level: 'Assistente',
    department: 'Tecnologia',
    posted: 'há 4 horas',
    applicants: 'Seja uma das primeiras pessoas a se candidatar',
    tags: ['Híbrido', 'PCD', 'Tecnologia', 'São Paulo'],
    description: 'Buscamos um Assistente de Tecnologia para atuar em nossa matriz em São Paulo. Esta vaga é exclusiva para profissionais PCD. Você dará suporte às operações diárias, ajudará na manutenção dos sistemas internos de logística e garantirá o fluxo contínuo de dados de comércio exterior.',
    responsibilities: [
      'Prestar suporte técnico de primeiro nível para colaboradores locais e remotos.',
      'Auxiliar na configuração e manutenção de computadores, impressoras e rede local.',
      'Monitorar a integração de dados nos sistemas ERP de comércio exterior.',
      'Documentar chamados e soluções no sistema de chamados interno.'
    ],
    requirements: [
      'Ensino superior em andamento em Análise de Sistemas, TI ou áreas correlatas.',
      'Conhecimento básico em redes de computadores, Windows e Office.',
      'Laudo médico caracterizador de deficiência atualizado.',
      'Proatividade, boa comunicação e facilidade para trabalhar em equipe.'
    ]
  },
  {
    id: 'analista-sales',
    title: 'ANALISTA PLENO DE INSIDE SALES - COMÉRCIO EXTERIOR',
    location: 'Limeira, SP (Híbrido)',
    type: 'Tempo integral',
    level: 'Pleno',
    department: 'Comercial / Vendas',
    posted: 'há 4 dias',
    applicants: '12 candidatos',
    tags: ['Híbrido', 'Inside Sales', 'Comércio Exterior', 'Limeira'],
    description: 'Oportunidade para atuar como Analista Pleno de Inside Sales na filial de Limeira, focado em prospecção e fechamento de novos negócios no setor de logística multimodal de comércio exterior.',
    responsibilities: [
      'Realizar prospecção activa de importadores e exportadores da região.',
      'Negociar tarifas de frete marítimo, aéreo e rodoviário.',
      'Elaborar propostas comerciais no sistema CRM e fazer follow-up constante.',
      'Atuar em parceria com a equipe de Operações para garantir a excelência no embarque.'
    ],
    requirements: [
      'Experiência consolidada em vendas internas ou inside sales no segmento de agenciamento de carga.',
      'Conhecimento em rotinas de Comércio Exterior (Incoterms, custos de frete).',
      'Inglês intermediário a avançado.',
      'Residir em Limeira ou região próxima.'
    ]
  },
  {
    id: 'banco-talentos',
    title: 'BANCO DE TALENTOS - CRAFT MULTIMODAL',
    location: 'São Paulo, SP (Híbrido)',
    type: 'Banco de Talentos',
    level: 'Todos os níveis',
    department: 'Operações / Comercial',
    posted: 'há 4 dias',
    applicants: 'Mais de 100 candidatos',
    tags: ['Híbrido', 'Multimodal', 'Banco de Talentos'],
    description: 'Quer fazer parte de um dos maiores operadores logísticos de transporte multimodal do país? Deixe seu currículo em nosso Banco de Talentos para futuras vagas nas áreas de Operações, Documentação, Financeiro e Comercial.',
    responsibilities: [
      'Garantir a conformidade dos processos logísticos nacionais e internacionais.',
      'Manter relacionamento próximo com armadores, transportadores e portos.',
      'Organizar e processar documentação de comércio exterior (BL, HBL, AWB).',
      'Contribuir para a melhoria constante dos processos internos.'
    ],
    requirements: [
      'Interesse em atuar na área de Logística Internacional e Comércio Exterior.',
      'Formação acadêmica em Comércio Exterior, Logística, Administração ou afins.',
      'Conhecimentos de informática (Pacote Office, Excel).',
      'Inglês e/ou Espanhol são considerados diferenciais importantes.'
    ]
  },
  {
    id: 'executivo-vendas',
    title: 'EXECUTIVO DE VENDAS MULTIPRODUTO',
    location: 'Rio de Janeiro, RJ (Híbrido)',
    type: 'Tempo integral',
    level: 'Sênior',
    department: 'Comercial',
    posted: 'há 4 dias',
    applicants: '45 candidatos',
    tags: ['Híbrido', 'Vendas', 'Comercial', 'Rio de Janeiro'],
    description: 'Buscamos profissional sênior com sólida carteira de clientes no Rio de Janeiro para atuar como Executivo de Vendas Multiproduto, focando no crescimento do market share local.',
    responsibilities: [
      'Desenvolver novos clientes e manter relacionamento comercial de alto nível com a base ativa.',
      'Vender frete internacional marítimo LCL/FCL, aéreo e serviços adicionais.',
      'Cumprir metas de volume, receita e margem operacional acordadas.',
      'Participar de visitas presenciais e eventos corporativos na região do Rio de Janeiro.'
    ],
    requirements: [
      'Ampla experiência comercial em Freight Forwarding (Agenciador de Cargas).',
      'Carteira de clientes ativa e forte conhecimento do mercado fluminense.',
      'Inglês fluente para negociação com agentes estrangeiros.',
      'CNH ativa e disponibilidade para viagens locais.'
    ]
  }
];

// --- COMPONENTE SVG DO LOGOTIPO DA CRAFT ---
// Rosa dos ventos / estrela vermelha e cinza oficial
export const CraftLogoSVG: React.FC<{ size?: number; className?: string; style?: React.CSSProperties }> = ({ size = 100, className = "", style }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <circle cx="50" cy="50" r="46" fill="#FFFFFF" stroke="#D32F2F" strokeWidth="2" />
    <circle cx="50" cy="50" r="40" fill="#FAFAFA" />
    
    {/* Eixo Norte (Vermelho) */}
    <path d="M50 14 L53 38 L50 41 Z" fill="#D32F2F" />
    <path d="M50 14 L47 38 L50 41 Z" fill="#9E1B1B" />
    
    {/* Eixo Sul (Vermelho) */}
    <path d="M50 86 L47 62 L50 59 Z" fill="#D32F2F" />
    <path d="M50 86 L53 62 L50 59 Z" fill="#9E1B1B" />
    
    {/* Eixo Leste (Vermelho) */}
    <path d="M86 50 L62 47 L59 50 Z" fill="#D32F2F" />
    <path d="M86 50 L62 53 L59 50 Z" fill="#9E1B1B" />
    
    {/* Eixo Oeste (Vermelho) */}
    <path d="M14 50 L38 53 L41 50 Z" fill="#D32F2F" />
    <path d="M14 50 L38 47 L41 50 Z" fill="#9E1B1B" />
    
    {/* Eixo Nordeste (Cinza) */}
    <path d="M75 25 L56 41 L58 43 Z" fill="#757575" />
    <path d="M75 25 L58 39 L58 43 Z" fill="#424242" />
    
    {/* Eixo Sudoeste (Cinza) */}
    <path d="M25 75 L44 59 L42 57 Z" fill="#757575" />
    <path d="M25 75 L42 61 L42 57 Z" fill="#424242" />
    
    {/* Eixo Sudeste (Cinza) */}
    <path d="M75 75 L58 59 L56 61 Z" fill="#757575" />
    <path d="M75 75 L60 57 L56 61 Z" fill="#424242" />
    
    {/* Eixo Noroeste (Cinza) */}
    <path d="M25 25 L42 41 L44 39 Z" fill="#757575" />
    <path d="M25 25 L40 43 L44 39 Z" fill="#424242" />
    
    {/* Centro */}
    <circle cx="50" cy="50" r="13" fill="#FFFFFF" stroke="#D32F2F" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="8" fill="#D32F2F" />
    <circle cx="50" cy="50" r="3" fill="#FFFFFF" />
  </svg>
);

// --- COMPONENTE DO DESIGN DO BANNER DE LOGÍSTICA ---
const CraftBannerSVG = () => (
  <svg 
    style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 800 200" 
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <linearGradient id="banner-bg" x1="0" y1="0" x2="1" y2="0.8">
        <stop offset="0%" stopColor="#1a2536" />
        <stop offset="60%" stopColor="#0e1622" />
        <stop offset="100%" stopColor="#060910" />
      </linearGradient>
      <pattern id="grid-dots" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="12" cy="12" r="0.8" fill="rgba(255, 255, 255, 0.12)" />
      </pattern>
    </defs>
    
    <rect width="100%" height="100%" fill="url(#banner-bg)" />
    <rect width="100%" height="100%" fill="url(#grid-dots)" />
    
    {/* Silhueta de rotas marítimas/aéreas (Conexões) */}
    <path d="M -50,120 Q 200,60 400,140 T 850,70" fill="none" stroke="rgba(211, 47, 47, 0.2)" strokeWidth="2" strokeDasharray="5,5" />
    <path d="M 50,30 Q 300,160 550,40 T 900,150" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1.5" />
    
    {/* Nós da Rede Logística */}
    <circle cx="200" cy="95" r="4.5" fill="#D32F2F" opacity="0.8" />
    <circle cx="400" cy="140" r="3.5" fill="#FFFFFF" opacity="0.6" />
    <circle cx="550" cy="40" r="5" fill="#D32F2F" opacity="0.8" />
    <circle cx="650" cy="105" r="3" fill="#FFFFFF" opacity="0.6" />
    
    {/* Linhas de conexão */}
    <line x1="200" y1="95" x2="400" y2="140" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    <line x1="400" y1="140" x2="550" y2="40" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    <line x1="550" y1="40" x2="650" y2="105" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    
    {/* Elemento gráfico do lado direito (Símbolo gigante vazado em marca d'água) */}
    <g transform="translate(680, 70) scale(1.1)" opacity="0.08">
      <circle cx="50" cy="50" r="46" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M50 10 L50 90 M10 50 L90 50" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M20 20 L80 80 M20 80 L80 20" stroke="#FFFFFF" strokeWidth="1.5" />
    </g>
  </svg>
);

// --- SINTETIZADOR DE EFEITOS SONOROS (WEB AUDIO API) ---
class SoundSynth {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playWhoosh() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 1.0);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(150, now);
      filter.frequency.exponentialRampToValueAtTime(1000, now + 0.6);
      filter.frequency.exponentialRampToValueAtTime(150, now + 1.2);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(now + 1.3);
    } catch (e) {}
  }

  playClick() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1000, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.04);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(now + 0.06);
    } catch (e) {}
  }

  playSuccess() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5 (Acorde maior feliz)
      
      notes.forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.07);

        gain.gain.setValueAtTime(0, now + i * 0.07);
        gain.gain.linearRampToValueAtTime(0.1, now + i * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.25);
      });
    } catch (e) {}
  }
}

interface CraftPromoAppProps {
  onNavigateTo?: (route: 'portfolio' | 'psi' | 'pedalboard' | 'designer' | 'craft') => void;
}

export default function CraftPromoApp({ onNavigateTo }: CraftPromoAppProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [device, setDevice] = useState<'laptop' | 'phone'>('laptop');
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState('assistente-ti');
  const [showIntroOverlay, setShowIntroOverlay] = useState(true);
  const [lastEventTime, setLastEventTime] = useState(-1);
  const [outroTextMode, setOutroTextMode] = useState<'jeito' | 'vagas'>('jeito');
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureCountdown, setCaptureCountdown] = useState(0);

  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  // Inicializar sintetizador de áudio
  const synth = useMemo(() => new SoundSynth(), []);

  useEffect(() => {
    synth.enabled = isAudioEnabled;
  }, [isAudioEnabled, synth]);

  // Loop de animação
  const animate = (time: number) => {
    if (previousTimeRef.current !== null) {
      const delta = (time - previousTimeRef.current) / 1000;
      setCurrentTime(prev => {
        const next = prev + delta * playbackSpeed;
        if (next >= TIMELINE.TOTAL_DURATION) {
          setIsPlaying(false);
          setIsCapturing(false); // desliga gravação automática ao final
          return TIMELINE.TOTAL_DURATION;
        }
        return next;
      });
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isPlaying) {
      previousTimeRef.current = null;
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, playbackSpeed]);

  // Efeitos Sonoros Baseados na Linha do Tempo
  useEffect(() => {
    const sec = Math.floor(currentTime * 2) / 2; // precisão de 0.5s

    if (sec !== lastEventTime) {
      // 1. Transição Zoom In (Fase 1 -> 2)
      if (sec === 4.5) {
        synth.playWhoosh();
        setLastEventTime(sec);
      }
      // 2. Clique em Vagas (Fase 2 -> 3)
      else if (sec === 16.5) {
        synth.playClick();
        setLastEventTime(sec);
      }
      // 3. Clique no Card de Vaga (Fase 3 -> 4)
      else if (sec === 24.5) {
        synth.playClick();
        setLastEventTime(sec);
      }
      // 4. Clique em Candidatura Simplificada
      else if (sec === 28.5) {
        synth.playClick();
        synth.playSuccess();
        setLastEventTime(sec);
      }
      // 5. Transição Zoom Out Outro (Fase 4 -> 5)
      else if (sec === 31.5) {
        synth.playWhoosh();
        setLastEventTime(sec);
      }
    }
  }, [currentTime, lastEventTime, synth]);

  // Mapear fases do vídeo
  const phase = useMemo(() => {
    if (currentTime < TIMELINE.INTRO_END) return 'intro';
    if (currentTime < TIMELINE.ZOOM_END) return 'zoom';
    if (currentTime < TIMELINE.PROFILE_END) return 'profile';
    if (currentTime < TIMELINE.JOBS_EXPLORE_END) return 'jobs_explore';
    if (currentTime < TIMELINE.JOB_DETAIL_END) return 'job_detail';
    return 'cta';
  }, [currentTime]);

  const handlePlayPause = () => {
    if (showIntroOverlay) setShowIntroOverlay(false);
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setLastEventTime(-1);
    setSelectedJobId('assistente-ti');
    setIsPlaying(true);
  };

  const handleTimelineScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    if (showIntroOverlay) setShowIntroOverlay(false);
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = Math.min(percentage * TIMELINE.TOTAL_DURATION, TIMELINE.TOTAL_DURATION);
    
    setCurrentTime(newTime);
    setLastEventTime(Math.floor(newTime * 2) / 2 - 0.5);
    
    if (newTime < TIMELINE.JOBS_EXPLORE_END) {
      setSelectedJobId('assistente-ti');
    }
  };

  /* const _skipToPhase = (targetSeconds: number) => {
    if (showIntroOverlay) setShowIntroOverlay(false);
    setCurrentTime(targetSeconds);
    setLastEventTime(Math.floor(targetSeconds * 2) / 2 - 0.5);
  }; */

  // Iniciar Modo Captação Automática com contagem
  const triggerCaptureMode = () => {
    setShowIntroOverlay(false);
    setIsPlaying(false);
    setCurrentTime(0);
    setLastEventTime(-1);
    setCaptureCountdown(3);
  };

  // Contagem regressiva da captação
  useEffect(() => {
    if (captureCountdown > 0) {
      const timer = setTimeout(() => {
        setCaptureCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (captureCountdown === 0 && !isPlaying && currentTime === 0 && showIntroOverlay === false && lastEventTime === -1) {
      // Começar a tocar o vídeo no fim do countdown
      setIsCapturing(true);
      setIsPlaying(true);
    }
  }, [captureCountdown]);

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    const ms = Math.floor((time % 1) * 10);
    return `${mins}:${secs.toString().padStart(2, '0')}.${ms}`;
  };

  // --- CÁLCULO DAS ANIMAÇÕES 3D (PERSPECTIVA DA CÂMERA) ---
  const cameraTransforms = useMemo(() => {
    // Padrão: Visão de mesa (Afasta com ângulo 2.5D)
    let rotateX = 14;
    let rotateY = -12;
    let scale = 0.8;
    let x = 40;
    let y = -10;
    let keyboardOpacity = 1;

    // Fase 1: Intro (Take de colaboradores no computador)
    if (currentTime < TIMELINE.INTRO_END) {
      rotateX = 14;
      rotateY = -12;
      scale = 0.8;
      x = 40;
      y = -10;
      keyboardOpacity = 1;
    }
    // Fase 2: Zoom aproximando (de 4.5s a 8.5s)
    else if (currentTime >= TIMELINE.INTRO_END && currentTime < TIMELINE.ZOOM_END) {
      const progress = (currentTime - TIMELINE.INTRO_END) / (TIMELINE.ZOOM_END - TIMELINE.INTRO_END);
      
      if (device === 'laptop') {
        rotateX = 14 - (14 * progress);
        rotateY = -12 - (-12 * progress);
        scale = 0.8 + (4.65 * progress); // Foco cheio: 5.45
        x = 40 - (40 * progress);
        y = -10 - (20 * progress); 
        keyboardOpacity = 1 - progress;
      } else {
        rotateX = 14 - (14 * progress);
        rotateY = -12 - (-12 * progress);
        scale = 0.8 + (7.4 * progress); // Foco mobile: 8.2
        x = 40 - (40 * progress);
        y = -10 - (50 * progress);
        keyboardOpacity = 1 - progress;
      }
    }
    // Fase 3 e 4: Totalmente focado na tela (8.5s a 31.5s)
    else if (currentTime >= TIMELINE.ZOOM_END && currentTime < TIMELINE.JOB_DETAIL_END) {
      rotateX = 0;
      rotateY = 0;
      scale = device === 'laptop' ? 5.45 : 8.2;
      x = 0;
      y = device === 'laptop' ? -30 : -60;
      keyboardOpacity = 0;
    }
    // Fase 5: Zoom Out para Outro CTA (de 31.5s a 38s)
    else if (currentTime >= TIMELINE.JOB_DETAIL_END) {
      const progress = Math.min((currentTime - TIMELINE.JOB_DETAIL_END) / (TIMELINE.TOTAL_DURATION - TIMELINE.JOB_DETAIL_END), 1);
      
      if (device === 'laptop') {
        rotateX = 14 * progress;
        rotateY = -12 * progress;
        scale = 5.45 - ((5.45 - 0.76) * progress);
        x = 40 * progress;
        y = -30 + (20 * progress);
        keyboardOpacity = progress;
      } else {
        rotateX = 14 * progress;
        rotateY = -12 * progress;
        scale = 8.2 - ((8.2 - 0.76) * progress);
        x = 40 * progress;
        y = -60 + (50 * progress);
        keyboardOpacity = progress;
      }
    }

    return { rotateX, rotateY, scale, x, y, keyboardOpacity };
  }, [currentTime, device]);

  // --- CÁLCULO DA POSIÇÃO E ESTADO DO CURSOR VIRTUAL ---
  const virtualCursor = useMemo(() => {
    let x = '75%';
    let y = '80%';
    let opacity = 0;
    let isClicking = false;

    if (currentTime >= TIMELINE.ZOOM_END && currentTime < TIMELINE.JOB_DETAIL_END) {
      opacity = 1;

      // Fase 3: Aba Publicações ativa (8.5s a 16.5s)
      if (currentTime < TIMELINE.PROFILE_END) {
        const progress = (currentTime - TIMELINE.ZOOM_END) / (TIMELINE.PROFILE_END - TIMELINE.ZOOM_END);
        
        if (device === 'laptop') {
          // O cursor entra do canto e desliza suavemente até o botão/aba "Vagas"
          x = `${85 - (55 * progress)}%`; // Vagas fica em ~30%
          y = `${80 - (42 * progress)}%`; // Vagas fica em ~38%
        } else {
          // No celular
          x = `${80 - (38 * progress)}%`;
          y = `${85 - (40 * progress)}%`;
        }

        // Clique simulado na aba Vagas (de 16.0s a 16.5s)
        if (currentTime >= 16.1 && currentTime < 16.5) {
          isClicking = true;
        }
      } 
      // Fase 4: Aba Vagas ativa (16.5s a 24.5s)
      else if (currentTime < TIMELINE.JOBS_EXPLORE_END) {
        const progress = (currentTime - TIMELINE.PROFILE_END) / (TIMELINE.JOBS_EXPLORE_END - TIMELINE.PROFILE_END);

        if (device === 'laptop') {
          // Move-se para o primeiro card de vaga na lista
          x = `${30 + (5 * progress)}%`; // Card fica em ~35%
          y = `${38 + (24 * progress)}%`; // Card fica em ~62%
        } else {
          x = `${42 + (3 * progress)}%`;
          y = `${45 + (30 * progress)}%`;
        }

        // Clique simulado na primeira vaga (de 24.0s a 24.5s)
        if (currentTime >= 24.1 && currentTime < 24.5) {
          isClicking = true;
        }
      }
      // Fase 5: Detalhe da vaga (24.5s a 31.5s)
      else {
        const progress = Math.min((currentTime - TIMELINE.JOBS_EXPLORE_END) / (TIMELINE.JOB_DETAIL_END - TIMELINE.JOBS_EXPLORE_END), 1);
        
        if (device === 'laptop') {
          // Move-se em direção ao botão "Candidatura Simplificada" no painel direito
          x = `${35 + (32 * progress)}%`; // Botão fica em ~67%
          y = `${62 - (20 * progress)}%`; // Altura do botão fica em ~42%
        } else {
          x = `${45 - (5 * progress)}%`;
          y = `${75 + (8 * progress)}%`;
        }

        // Clique no botão "Candidatura Simplificada" (de 28.1s a 28.5s)
        if (currentTime >= 28.1 && currentTime < 28.5) {
          isClicking = true;
        }
      }
    }

    return { x, y, opacity, isClicking };
  }, [currentTime, device]);

  return (
    <div className={`craft-promo-container ${isCapturing ? 'capturing-full' : ''}`}>
      
      {/* Cenário de Fundo (Mesa de Trabalho) */}
      <div className="desk-environment">
        <div className="desk-grid"></div>
        <div className={`ambient-light-glow ${isPlaying ? 'animating' : ''}`} style={{ background: 'radial-gradient(ellipse, rgba(211, 47, 47, 0.15) 0%, transparent 70%)' }}></div>
      </div>

      {/* CONTADOR DE CAPTAÇÃO EM TELA CHEIA */}
      {captureCountdown > 0 && (
        <div className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center z-[99999]">
          <div className="text-[120px] font-bold text-red-500 animate-ping">
            {captureCountdown}
          </div>
          <div className="text-xl font-medium text-slate-300 mt-8 font-sans">
            Preparando tela para gravação... Limpando controles.
          </div>
        </div>
      )}

      {/* --- SOBREPOSIÇÃO INTRO / PLAY INICIAL --- */}
      {showIntroOverlay && (
        <div className="intro-play-overlay" style={{ zIndex: 50 }}>
          <div className="intro-play-box" style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(211, 47, 47, 0.3)' }}>
            <button className="intro-play-btn" onClick={handlePlayPause} style={{ background: '#D32F2F', boxShadow: '0 0 20px rgba(211, 47, 47, 0.5)' }}>
              <Play fill="currentColor" size={36} className="ml-1" />
            </button>
            <h2 className="intro-play-title font-sans">Simulador de Captação CRAFT</h2>
            <p className="intro-play-desc font-sans">
              Motion interativo da página LinkedIn da <strong>CRAFT</strong>. 
              Gera uma gravação limpa (sem barras e anúncios) para compor o vídeo final da agência.
            </p>
            
            <div className="flex flex-col gap-3 w-full mt-6">
              <div className="flex gap-2">
                <button 
                  onClick={() => { setDevice('laptop'); setShowIntroOverlay(false); setIsPlaying(true); }}
                  className="btn-secondary text-xs flex-1 py-2 font-semibold"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                >
                  💻 Notebook (16:9)
                </button>
                <button 
                  onClick={() => { setDevice('phone'); setShowIntroOverlay(false); setIsPlaying(true); }}
                  className="btn-secondary text-xs flex-1 py-2 font-semibold"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                >
                  📱 Celular (Stories/Reels)
                </button>
              </div>
              
              <button
                onClick={triggerCaptureMode}
                className="w-full py-3 rounded-lg text-sm font-bold text-white transition-all flex items-center justify-center gap-2 hover:brightness-110"
                style={{ background: 'linear-gradient(135deg, #D32F2F, #B71C1C)', boxShadow: '0 4px 15px rgba(211, 47, 47, 0.3)' }}
              >
                <Video size={16} /> Iniciar Captação Automática (3s)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rotação e Escala da Câmera (Device Wrapper) */}
      <div className="device-perspective-wrapper" style={{ zIndex: 10 }}>
        <motion.div 
          className="device-container-3d"
          animate={{
            rotateX: cameraTransforms.rotateX,
            rotateY: cameraTransforms.rotateY,
            scale: cameraTransforms.scale,
            x: cameraTransforms.x,
            y: cameraTransforms.y,
          }}
          transition={{
            type: 'tween',
            ease: 'easeInOut',
            duration: 0.65
          }}
        >
          {/* --- VIEW: NOTEBOOK (MACBOOK) --- */}
          {device === 'laptop' && (
            <div className="laptop-frame" style={{ boxShadow: '0 30px 100px rgba(0,0,0,0.8)' }}>
              <div className="laptop-webcam" />
              <div className="laptop-bezel-logo">C R A F T</div>
              
              <div className="screen-wrapper">
                {/* Cabeçalho do Navegador */}
                <div className="browser-chrome" style={{ background: '#EAEAEA', borderBottom: '1px solid #D1D1D1' }}>
                  <div className="browser-dots">
                    <div className="browser-dot red" />
                    <div className="browser-dot yellow" />
                    <div className="browser-dot green" />
                  </div>
                  <div className="browser-address-bar" style={{ background: '#FFFFFF', color: '#555555' }}>
                    <span className="browser-lock-icon">🔒</span>
                    <div className="browser-address-text font-sans">
                      linkedin.com/company/<span>craft/{phase === 'profile' ? 'posts/?feedView=all' : 'jobs'}</span>
                    </div>
                  </div>
                </div>

                {/* Conteúdo do LinkedIn Mock - ESTILO LIGHT DO LINKEDIN REAL */}
                <div className="viewport-content" style={{ background: '#F3F2F0' }}>
                  
                  {/* CENA 1: TAKE DOS COLABORADORES (Placeholder / Loop Real) */}
                  {currentTime < TIMELINE.INTRO_END && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      zIndex: 1000,
                      background: '#0B1320',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden'
                    }}>
                      <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80')` }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      
                      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '20px' }}>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-wider mb-4 animate-pulse">
                          Cena 1: Colaboradores no Escritório
                        </div>
                        <h2 className="text-4xl font-extrabold text-white leading-tight font-sans" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                          OLHANDO PARA O FUTURO
                        </h2>
                        <p className="text-lg text-slate-300 mt-2 font-sans max-w-xl mx-auto">
                          [Substitua pelo take gravado da sua equipe focada nas telas]
                        </p>
                      </div>
                      
                      {/* Grid sutil animada de overlay */}
                      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
                        backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                        backgroundSize: '24px 24px'
                      }} />
                    </div>
                  )}

                  {/* INTERFACE DO LINKEDIN (LIGHT MODE) */}
                  <div className="linkedin-container" style={{ display: 'flex', flexDirection: 'column', height: '100%', color: '#191919' }}>
                    
                    {/* LinkedIn Navbar */}
                    <div className="linkedin-navbar" style={{ background: '#FFFFFF', borderBottom: '1px solid #EAEAEA', height: '48px', padding: '0 40px', justifyContent: 'space-between' }}>
                      <div className="linkedin-logo-area" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div className="linkedin-logo-box" style={{ background: '#0A66C2', color: '#FFFFFF', fontSize: '20px', fontWeight: 'bold', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>in</div>
                        <div className="linkedin-search-mock" style={{ background: '#EDF3F8', color: '#666666', border: 'none', borderRadius: '4px', height: '32px', display: 'flex', alignItems: 'center', padding: '0 12px', fontSize: '13px' }}>
                          <Search size={14} className="mr-2 text-slate-500" />
                          Pesquisar
                        </div>
                      </div>
                      <div className="linkedin-nav-items" style={{ display: 'flex', gap: '20px', height: '100%' }}>
                        <div className="linkedin-nav-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#666666', fontSize: '11px', cursor: 'pointer', borderBottom: '2px solid transparent' }}><Compass size={18} /><span>Início</span></div>
                        <div className="linkedin-nav-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#666666', fontSize: '11px', cursor: 'pointer', borderBottom: '2px solid transparent' }}><Users size={18} /><span>Minha rede</span></div>
                        <div 
                          className="linkedin-nav-item" 
                          style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            fontSize: '11px', 
                            cursor: 'pointer',
                            color: currentTime >= TIMELINE.PROFILE_END ? '#191919' : '#666666',
                            borderBottom: currentTime >= TIMELINE.PROFILE_END ? '2px solid #191919' : '2px solid transparent',
                            fontWeight: currentTime >= TIMELINE.PROFILE_END ? 'bold' : 'normal'
                          }}
                        >
                          <Briefcase size={18} /><span>Vagas</span>
                        </div>
                        <div className="linkedin-nav-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#666666', fontSize: '11px', cursor: 'pointer', borderBottom: '2px solid transparent' }}><Bell size={18} /><span>Notificações</span></div>
                      </div>
                    </div>

                    {/* LinkedIn Perfil da Empresa (Profile Header) */}
                    <div className="company-profile-card" style={{ background: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '8px', margin: '20px 40px 10px 40px', overflow: 'hidden' }}>
                      <div className="company-banner" style={{ height: '120px', position: 'relative' }}>
                        <CraftBannerSVG />
                        
                        <div className="company-logo-container" style={{ width: '80px', height: '80px', position: 'absolute', bottom: '-24px', left: '24px', background: '#FFFFFF', padding: '4px', borderRadius: '6px', border: '1px solid #DDD', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                          <CraftLogoSVG size={70} />
                        </div>
                      </div>

                      <div className="company-info-area" style={{ padding: '30px 24px 16px 24px', background: '#FFFFFF' }}>
                        <div className="company-title-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <h1 className="company-name" style={{ fontSize: '24px', fontWeight: 'bold', color: '#191919', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              CRAFT
                              <span style={{ fontSize: '11px', background: '#0a66c2', color: 'white', padding: '2px 8px', borderRadius: '12px', fontWeight: '600' }}>✓ Verificado</span>
                            </h1>
                            <p className="company-tagline" style={{ fontSize: '14px', color: '#666666', marginTop: '4px', fontWeight: '500' }}>Connect and move. Unite and prosper.</p>
                          </div>
                          <div className="company-actions-row" style={{ display: 'flex', gap: '8px' }}>
                            <button className="btn-primary" style={{ background: '#0A66C2', color: '#FFFFFF', border: 'none', borderRadius: '16px', padding: '6px 16px', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Check size={14} /> Seguindo
                            </button>
                            <button className="btn-secondary" style={{ color: '#0A66C2', border: '1px solid #0A66C2', background: 'transparent', borderRadius: '16px', padding: '6px 16px', fontSize: '14px', fontWeight: '600' }}>Acessar site</button>
                          </div>
                        </div>

                        <div className="company-meta-details" style={{ display: 'flex', gap: '15px', fontSize: '12px', color: '#666666', marginTop: '12px' }}>
                          <span>🏢 Transporte, armazenagem e correio</span>
                          <span>📍 São Paulo, SP</span>
                          <span>👥 1 mil-5 mil funcionários</span>
                          <span>🔗 84.619 seguidores</span>
                        </div>
                      </div>

                      {/* Abas do Perfil */}
                      <div className="company-tabs" style={{ display: 'flex', borderTop: '1px solid #EAEAEA', background: '#FFFFFF', padding: '0 10px' }}>
                        <div className="company-tab" style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '600', color: '#666666', cursor: 'pointer' }}>Início</div>
                        <div className="company-tab" style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '600', color: '#666666', cursor: 'pointer' }}>Sobre</div>
                        <div 
                          className="company-tab" 
                          style={{ 
                            padding: '12px 16px', 
                            fontSize: '14px', 
                            fontWeight: '600', 
                            color: currentTime < TIMELINE.PROFILE_END ? '#0A66C2' : '#666666', 
                            borderBottom: currentTime < TIMELINE.PROFILE_END ? '3px solid #0A66C2' : 'none', 
                            cursor: 'pointer' 
                          }}
                        >
                          Publicações
                        </div>
                        <div 
                          className="company-tab" 
                          style={{ 
                            padding: '12px 16px', 
                            fontSize: '14px', 
                            fontWeight: '600', 
                            color: currentTime >= TIMELINE.PROFILE_END ? '#0A66C2' : '#666666', 
                            borderBottom: currentTime >= TIMELINE.PROFILE_END ? '3px solid #0A66C2' : 'none', 
                            cursor: 'pointer' 
                          }}
                        >
                          Vagas
                        </div>
                        <div className="company-tab" style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '600', color: '#666666', cursor: 'pointer' }}>Pessoas</div>
                      </div>
                    </div>

                    {/* --- CONTEÚDO DA ABA PUBLICAÇÕES (CENA INICIAL DO LINKEDIN) --- */}
                    {currentTime < TIMELINE.PROFILE_END && (
                      <div style={{ flex: 1, overflow: 'hidden', padding: '0 40px' }}>
                        <div style={{ background: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <CraftLogoSVG size={40} />
                            <div>
                              <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#191919' }}>CRAFT</h4>
                              <p style={{ fontSize: '11px', color: '#666666' }}>84.619 seguidores</p>
                              <p style={{ fontSize: '11px', color: '#666666' }}>há 3 horas · 🌐 Publicado</p>
                            </div>
                          </div>
                          
                          <p style={{ fontSize: '13px', color: '#191919', lineHeight: '1.4' }} className="font-sans">
                            Connect and move. Unite and prosper! Nosso propósito é conectar pessoas e negócios através de soluções logísticas multimodais seguras e inovadoras. 🌍📦
                            <br /><br />
                            Quer fazer parte do nosso time e nos ajudar a construir novas conexões pelo mundo? Estamos com novas oportunidades! Confira na aba <strong>Vagas</strong> e venha fazer parte da nossa jornada.
                          </p>
                          
                          <div style={{ height: '180px', borderRadius: '6px', background: '#0D1B2A', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                            <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80')` }} />
                            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(211,47,47,0.4) 0%, rgba(13,27,42,0.8) 100%)' }} />
                            <div style={{ position: 'relative', zIndex: 5, padding: '24px', width: '100%' }}>
                              <h3 style={{ color: 'white', fontSize: '20px', fontWeight: '800' }}>VENHA ESCREVER SEU FUTURO CONOSCO</h3>
                              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', marginTop: '4px' }}>Logística Internacional que Movimenta o Mundo</p>
                            </div>
                          </div>
                          
                          {/* Botões de Ação de Post */}
                          <div style={{ display: 'flex', borderTop: '1px solid #EAEAEA', paddingTop: '8px', justifyContent: 'space-around', fontSize: '12px', color: '#666666', fontWeight: 'bold' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Send size={14} /> Recomendar</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MessageSquare size={14} /> Comentar</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Share2 size={14} /> Compartilhar</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Send size={14} /> Enviar</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* --- CONTEÚDO DA ABA VAGAS (APÓS CLIQUE) --- */}
                    {currentTime >= TIMELINE.PROFILE_END && (
                      <div className="jobs-tab-content" style={{ display: 'flex', gap: '15px', flex: 1, overflow: 'hidden', padding: '0 40px 20px 40px' }}>
                        
                        {/* Lista de Vagas */}
                        <div className="jobs-list-side" style={{ width: '40%', background: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '8px', overflowY: 'auto', maxHeight: '350px' }}>
                          <div style={{ padding: '16px', borderBottom: '1px solid #EAEAEA' }}>
                            <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#191919' }}>14 resultados encontrados</h3>
                            <p style={{ fontSize: '11px', color: '#666666' }}>Vagas ativas no Brasil</p>
                          </div>

                          {CRAFT_JOBS.map((job) => (
                            <div 
                              key={job.id} 
                              className={`job-card ${selectedJobId === job.id ? 'active' : ''}`}
                              onClick={() => setSelectedJobId(job.id)}
                              style={{ 
                                padding: '16px', 
                                borderBottom: '1px solid #EAEAEA', 
                                cursor: 'pointer',
                                background: selectedJobId === job.id ? '#F3F2F0' : '#FFFFFF',
                                borderLeft: selectedJobId === job.id ? '4px solid #D32F2F' : 'none'
                              }}
                            >
                              <div style={{ display: 'flex', gap: '10px' }}>
                                <CraftLogoSVG size={32} />
                                <div>
                                  <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#0A66C2', lineHeight: '1.2' }}>{job.title}</h4>
                                  <p style={{ fontSize: '11px', color: '#191919', marginTop: '3px' }}>CRAFT</p>
                                  <p style={{ fontSize: '11px', color: '#666666' }}>{job.location}</p>
                                  <p style={{ fontSize: '10px', color: '#008009', marginTop: '3px', fontWeight: 'bold' }}>{job.posted}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Detalhes da Vaga Selecionada */}
                        <div className="jobs-detail-side" style={{ width: '60%', background: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '8px', padding: '20px', overflowY: 'auto', maxHeight: '350px', color: '#191919' }}>
                          {CRAFT_JOBS.find(j => j.id === selectedJobId) && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                              <div>
                                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#191919' }}>{CRAFT_JOBS.find(j => j.id === selectedJobId)?.title}</h3>
                                <p style={{ fontSize: '12px', color: '#666666', marginTop: '4px' }}>
                                  CRAFT · {CRAFT_JOBS.find(j => j.id === selectedJobId)?.location}
                                </p>
                                <p style={{ fontSize: '11px', color: '#666666' }}>
                                  {CRAFT_JOBS.find(j => j.id === selectedJobId)?.applicants}
                                </p>
                              </div>

                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button 
                                  className="btn-primary" 
                                  style={{ 
                                    background: currentTime >= 28.5 ? '#008009' : '#0A66C2', 
                                    color: '#FFFFFF', 
                                    border: 'none', 
                                    borderRadius: '16px', 
                                    padding: '8px 20px', 
                                    fontSize: '13px', 
                                    fontWeight: 'bold', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '6px',
                                    transition: 'background 0.3s'
                                  }}
                                >
                                  {currentTime >= 28.5 ? '✓ Candidatado' : 'Candidatura simplificada'}
                                  {currentTime < 28.5 && <ArrowRight size={14} />}
                                </button>
                                <button className="btn-secondary" style={{ border: '1px solid #666666', color: '#666666', background: 'transparent', borderRadius: '16px', padding: '8px 20px', fontSize: '13px', fontWeight: 'bold' }}>Salvar</button>
                              </div>

                              <hr style={{ border: 'none', borderTop: '1px solid #EAEAEA' }} />

                              <div style={{ fontSize: '12px', color: '#333333', display: 'flex', flexDirection: 'column', gap: '10px' }} className="font-sans">
                                <h4 style={{ fontWeight: 'bold', fontSize: '13px', color: '#191919' }}>Sobre a vaga</h4>
                                <p style={{ lineHeight: '1.4' }}>{CRAFT_JOBS.find(j => j.id === selectedJobId)?.description}</p>
                                
                                <h4 style={{ fontWeight: 'bold', fontSize: '13px', color: '#191919', marginTop: '5px' }}>Responsabilidades principais</h4>
                                <ul style={{ paddingLeft: '18px', listStyleType: 'disc' }}>
                                  {CRAFT_JOBS.find(j => j.id === selectedJobId)?.responsibilities.map((r, i) => (
                                    <li key={i} style={{ marginBottom: '3px' }}>{r}</li>
                                  ))}
                                </ul>

                                <h4 style={{ fontWeight: 'bold', fontSize: '13px', color: '#191919', marginTop: '5px' }}>Requisitos</h4>
                                <ul style={{ paddingLeft: '18px', listStyleType: 'disc' }}>
                                  {CRAFT_JOBS.find(j => j.id === selectedJobId)?.requirements.map((r, i) => (
                                    <li key={i} style={{ marginBottom: '3px' }}>{r}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>

                      </div>
                    )}

                  </div>
                </div>

              </div>
            </div>
          )}

          {/* --- VIEW: SMARTPHONE (IPHONE VAGAS MOBILE) --- */}
          {device === 'phone' && (
            <div className="phone-frame" style={{ boxShadow: '0 30px 100px rgba(0,0,0,0.8)' }}>
              <div className="phone-notch">
                <div className="phone-speaker" />
                <div className="phone-camera-dot" />
              </div>
              
              <div className="screen-wrapper">
                {/* Status Bar */}
                <div className="phone-status-bar">
                  <span>10:29</span>
                  <div className="phone-status-icons">
                    <span>📶</span>
                    <span>🔋</span>
                  </div>
                </div>

                {/* Conteúdo do LinkedIn Mobile (Light Mode) */}
                <div className="viewport-content" style={{ background: '#F3F2F0', color: '#191919' }}>
                  
                  {/* CENA 1: TAKE DOS COLABORADORES EM MOBILE */}
                  {currentTime < TIMELINE.INTRO_END && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      zIndex: 1000,
                      background: '#0B1320',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden'
                    }}>
                      <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80')` }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      
                      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '16px' }}>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] font-semibold uppercase tracking-wider mb-4 animate-pulse">
                          Cena 1: Colaboradores
                        </div>
                        <h2 className="text-2xl font-extrabold text-white leading-tight font-sans">
                          JEITO CRAFT
                        </h2>
                        <p className="text-xs text-slate-300 mt-2 font-sans">
                          [Take gravado da equipe em campo]
                        </p>
                      </div>
                    </div>
                  )}

                  {/* LinkedIn Header Mobile */}
                  <div className="linkedin-navbar" style={{ background: '#FFFFFF', borderBottom: '1px solid #EAEAEA', height: '44px', padding: '0 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="linkedin-logo-box" style={{ background: '#0A66C2', color: '#FFFFFF', fontSize: '15px', fontStyle: 'normal', fontWeight: 'bold', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '3px' }}>in</div>
                    <div className="linkedin-search-mock" style={{ background: '#EDF3F8', width: '130px', height: '26px', fontSize: '11px', display: 'flex', alignItems: 'center', padding: '0 8px', borderRadius: '3px' }}>
                      <Search size={10} className="mr-1 text-slate-500" /> Buscar
                    </div>
                    <Briefcase size={16} className={currentTime >= TIMELINE.PROFILE_END ? 'text-blue-600' : 'text-slate-500'} />
                  </div>

                  {/* Perfil Header Mobile */}
                  <div className="company-profile-card" style={{ background: '#FFFFFF', borderBottom: '1px solid #E0E0E0', overflow: 'hidden' }}>
                    <div className="company-banner" style={{ height: '70px', position: 'relative' }}>
                      <CraftBannerSVG />
                      
                      <div style={{ width: '56px', height: '56px', position: 'absolute', bottom: '-15px', left: '16px', background: '#FFFFFF', padding: '2px', borderRadius: '4px', border: '1px solid #DDD' }}>
                        <CraftLogoSVG size={50} />
                      </div>
                    </div>

                    <div className="company-info-area" style={{ padding: '20px 16px 10px 16px', background: '#FFFFFF' }}>
                      <h1 className="company-name" style={{ fontSize: '18px', fontWeight: 'bold', color: '#191919', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        CRAFT
                        <span style={{ fontSize: '9px', background: '#0a66c2', color: 'white', padding: '1px 5px', borderRadius: '10px' }}>✓</span>
                      </h1>
                      <p style={{ fontSize: '11px', color: '#666666' }}>Connect and move. Unite and prosper.</p>
                      
                      <div className="flex gap-2 mt-3">
                        <button style={{ background: '#0A66C2', color: 'white', border: 'none', flex: 1, padding: '4px 0', fontSize: '11px', borderRadius: '12px', fontWeight: 'bold' }}>Seguindo</button>
                        <button style={{ border: '1px solid #0A66C2', color: '#0A66C2', background: 'transparent', flex: 1, padding: '4px 0', fontSize: '11px', borderRadius: '12px', fontWeight: 'bold' }}>Acessar Site</button>
                      </div>
                    </div>

                    {/* Tabs Mobile Scrollable */}
                    <div className="company-tabs" style={{ display: 'flex', borderTop: '1px solid #EAEAEA', overflowX: 'auto', background: '#FFFFFF' }}>
                      <div style={{ padding: '10px 12px', fontSize: '12px', color: '#666666', borderBottom: currentTime < TIMELINE.PROFILE_END ? '2px solid #0A66C2' : 'none', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Publicações</div>
                      <div style={{ padding: '10px 12px', fontSize: '12px', color: '#666666', borderBottom: currentTime >= TIMELINE.PROFILE_END ? '2px solid #0A66C2' : 'none', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Vagas</div>
                      <div style={{ padding: '10px 12px', fontSize: '12px', color: '#666666', whiteSpace: 'nowrap' }}>Sobre</div>
                    </div>
                  </div>

                  {/* Publicações Mobile */}
                  {currentTime < TIMELINE.PROFILE_END && (
                    <div style={{ padding: '8px' }}>
                      <div style={{ background: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '6px', padding: '10px' }}>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '8px' }}>
                          <CraftLogoSVG size={28} />
                          <div>
                            <h4 style={{ fontSize: '11px', fontWeight: 'bold' }}>CRAFT</h4>
                            <p style={{ fontSize: '9px', color: '#666666' }}>há 3 horas</p>
                          </div>
                        </div>
                        <p style={{ fontSize: '11px', color: '#191919', lineHeight: '1.3' }}>
                          Nosso propósito é conectar pessoas e negócios através de soluções logísticas seguras e inovadoras. 🌍📦
                          <br /><br />
                          Confira na aba <strong>Vagas</strong> para se candidatar às posições abertas!
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Vagas Mobile */}
                  {currentTime >= TIMELINE.PROFILE_END && (
                    <div style={{ padding: '8px', overflowY: 'auto', height: 'calc(100% - 250px)' }}>
                      {currentTime < TIMELINE.JOBS_EXPLORE_END ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <h3 style={{ fontSize: '12px', fontWeight: 'bold', padding: '4px' }}>14 vagas em destaque no Brasil</h3>
                          {CRAFT_JOBS.map(job => (
                            <div key={job.id} style={{ background: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '6px', padding: '10px' }}>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <CraftLogoSVG size={24} />
                                <div>
                                  <h4 style={{ fontSize: '11px', fontWeight: 'bold', color: '#0A66C2' }}>{job.title}</h4>
                                  <p style={{ fontSize: '9px', color: '#191919' }}>CRAFT</p>
                                  <p style={{ fontSize: '9px', color: '#666666' }}>📍 {job.location}</p>
                                  <span style={{ fontSize: '8px', color: '#008009', fontWeight: 'bold' }}>{job.posted}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        // Detalhes da Vaga Selecionada no Mobile
                        <div style={{ background: '#FFFFFF', border: '1px solid #E0E0E0', borderRadius: '6px', padding: '12px' }}>
                          <h3 style={{ fontSize: '13px', fontWeight: 'bold' }}>{CRAFT_JOBS[0].title}</h3>
                          <p style={{ fontSize: '10px', color: '#666666' }}>CRAFT · {CRAFT_JOBS[0].location}</p>
                          
                          <button style={{ background: currentTime >= 28.5 ? '#008009' : '#0A66C2', color: 'white', border: 'none', borderRadius: '12px', width: '100%', padding: '6px 0', fontSize: '11px', fontWeight: 'bold', marginTop: '10px' }}>
                            {currentTime >= 28.5 ? '✓ Candidatado com sucesso' : 'Candidatura Simplificada'}
                          </button>
                          
                          <div style={{ fontSize: '10px', marginTop: '12px', color: '#333' }}>
                            <h4 style={{ fontWeight: 'bold' }}>Sobre a vaga</h4>
                            <p style={{ marginTop: '2px' }}>{CRAFT_JOBS[0].description}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>
            </div>
          )}

          {/* --- CURSOR VIRTUAL (MOUSE MOTION) --- */}
          <div 
            className="virtual-cursor"
            style={{
              left: virtualCursor.x,
              top: virtualCursor.y,
              opacity: virtualCursor.opacity,
              transition: 'left 0.45s cubic-bezier(0.25, 0.8, 0.25, 1), top 0.45s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.3s'
            }}
          >
            {/* Cursor Seta */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4.5 3L18.5 12L13 14.5L20 21.5L17.5 24L10.5 17L4.5 22.5L4.5 3Z" fill="white" stroke="black" strokeWidth="2.5" />
            </svg>
            
            {/* Ripple Efeito de Clique */}
            <div 
              className={`virtual-cursor-ripple ${virtualCursor.isClicking ? 'clicking' : ''}`}
              style={{
                borderColor: '#D32F2F',
                background: 'rgba(211, 47, 47, 0.2)'
              }}
            />
          </div>

          {/* Base do notebook 3D */}
          {device === 'laptop' && (
            <div 
              className="laptop-base" 
              style={{ 
                opacity: cameraTransforms.keyboardOpacity,
                transition: 'opacity 0.6s ease'
              }}
            >
              <div className="laptop-keyboard-indent" />
              <div className="laptop-trackpad" />
            </div>
          )}

        </motion.div>
      </div>

      {/* --- CENA 3: OUTRO / CARTÃO DE CHAMADA VERMELHO COM LOGOTIPO --- */}
      <AnimatePresence>
        {phase === 'cta' && (
          <motion.div 
            className="cta-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{ 
              background: 'linear-gradient(135deg, #a61a22 0%, #d32f2f 45%, #7f1418 100%)',
              zIndex: 1000,
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
          >
            {/* Elemento de Fundo: Marca d'água da Estrela Girando */}
            <motion.div
              style={{
                position: 'absolute',
                right: '-100px',
                bottom: '-100px',
                opacity: 0.08,
                width: '600px',
                height: '600px'
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            >
              <CraftLogoSVG size={600} />
            </motion.div>

            {/* Partículas flutuantes discretas */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.05)_0%,transparent_50%)]" />

            <div className="flex flex-col md:flex-row items-center gap-12 max-w-4xl px-8 z-10 w-full">
              
              {/* Informações da CTA (Lado Esquerdo) */}
              <div style={{ flex: 1, textAlign: 'left' }} className="font-sans">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 80 }}
                >
                  <h2 style={{ fontSize: '42px', fontWeight: '900', color: 'white', lineHeight: '1.1', textShadow: '0 2px 10px rgba(0,0,0,0.15)' }}>
                    Vem trabalhar na CRAFT!
                  </h2>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 80 }}
                  className="mt-6"
                >
                  <p style={{ fontSize: '20px', color: '#FFCDD2', lineHeight: '1.4', fontWeight: '500' }}>
                    {outroTextMode === 'jeito' 
                      ? 'Se inscreva no nosso jeito, um pouquinho.'
                      : 'Siga nosso perfil no LinkedIn e navegue pelas vagas disponíveis.'}
                  </p>
                </motion.div>

                {/* Botões do Vídeo */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex gap-4 mt-10"
                >
                  <a 
                    href="https://www.linkedin.com/company/craft/jobs/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-red-600 font-bold transition-all shadow-lg hover:bg-red-50 hover:scale-105"
                    style={{ textDecoration: 'none', fontSize: '15px' }}
                  >
                    Acessar Vagas <ExternalLink size={16} />
                  </a>
                  <button 
                    onClick={handleRestart}
                    className="px-6 py-3 rounded-full border border-white/40 text-white font-bold transition-all hover:bg-white/10"
                    style={{ fontSize: '15px' }}
                  >
                    Ver de Novo
                  </button>
                </motion.div>
              </div>

              {/* Logotipo da Logo CRAFT Grande Animando (Lado Direito) */}
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', delay: 0.4, damping: 12 }}
                style={{ position: 'relative' }}
              >
                <div style={{
                  background: 'white',
                  padding: '24px',
                  borderRadius: '30px',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <CraftLogoSVG size={180} />
                </div>
                {/* Glow de fundo da logo */}
                <div className="absolute inset-0 bg-white/20 blur-3xl -z-10 rounded-full scale-125" />
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- PLAYBAR / PAINEL DE CONTROLE DE VÍDEO (GLASSMORPHISM) --- */}
      {!isCapturing && (
        <div className="player-control-panel" style={{ zIndex: 1100 }}>
          {/* Barra de Progresso do Vídeo */}
          <div className="player-progress-row">
            <span className="player-time-display">{formatTime(currentTime)}</span>
            
            <div className="player-scrollbar-wrapper" onClick={handleTimelineScrub}>
              <div className="player-scrollbar-bg">
                <div 
                  className="player-scrollbar-fill" 
                  style={{ width: `${(currentTime / TIMELINE.TOTAL_DURATION) * 100}%`, background: '#D32F2F' }}
                />
                
                {/* Marcadores de Fase */}
                <div className="player-phase-markers">
                  <div className="player-phase-marker" style={{ left: `${(TIMELINE.INTRO_END / TIMELINE.TOTAL_DURATION) * 100}%` }} title="Zoom In" />
                  <div className="player-phase-marker" style={{ left: `${(TIMELINE.PROFILE_END / TIMELINE.TOTAL_DURATION) * 100}%` }} title="Ver LinkedIn" />
                  <div className="player-phase-marker" style={{ left: `${(TIMELINE.JOBS_EXPLORE_END / TIMELINE.TOTAL_DURATION) * 100}%` }} title="Navegar Vagas" />
                  <div className="player-phase-marker" style={{ left: `${(TIMELINE.JOB_DETAIL_END / TIMELINE.TOTAL_DURATION) * 100}%` }} title="Detalhes" />
                </div>
              </div>
              
              <div 
                className="player-scrollbar-handle"
                style={{ left: `${(currentTime / TIMELINE.TOTAL_DURATION) * 100}%`, background: '#D32F2F' }}
              />
            </div>

            <span className="player-time-display">{formatTime(TIMELINE.TOTAL_DURATION)}</span>
          </div>

          {/* Fileira de Botões de Controle */}
          <div className="player-controls-row">
            <div className="player-buttons-left">
              <button className="player-btn player-btn-play" onClick={handlePlayPause} style={{ background: '#D32F2F', border: 'none' }}>
                {isPlaying ? <Pause fill="currentColor" size={16} /> : <Play fill="currentColor" size={16} className="ml-0.5" />}
              </button>

              <button className="player-btn" onClick={handleRestart} title="Reiniciar Vídeo">
                <RotateCcw size={16} />
              </button>

              <button className="player-btn" onClick={() => setIsAudioEnabled(!isAudioEnabled)} title={isAudioEnabled ? "Silenciar" : "Ativar Som"}>
                {isAudioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} className="text-red-500" />}
              </button>

              <span className="player-status-badge" style={{ border: '1px solid rgba(211, 47, 47, 0.4)', color: '#FFCDD2' }}>
                {phase === 'intro' && '01. Colaboradores'}
                {phase === 'zoom' && '02. Zoom da Câmera'}
                {phase === 'profile' && '03. LinkedIn (Posts)'}
                {phase === 'jobs_explore' && '04. LinkedIn (Vagas)'}
                {phase === 'job_detail' && '05. Detalhes Vaga'}
                {phase === 'cta' && '06. Chamada Outro'}
              </span>
            </div>

            {/* Controles do Outro/Cópia e Captação */}
            <div className="flex gap-2 items-center">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">Texto Outro:</span>
              <select 
                className="player-speed-selector text-[11px]" 
                value={outroTextMode} 
                onChange={(e) => setOutroTextMode(e.target.value as 'jeito' | 'vagas')}
                style={{ width: '130px', padding: '2px' }}
              >
                <option value="jeito">Jeito Craft (Prompt)</option>
                <option value="vagas">Vagas Lnk (Preview)</option>
              </select>

              <button 
                onClick={triggerCaptureMode}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-[11px] font-bold flex items-center gap-1.5 transition-all"
                title="Auto-play sem controles para gravar com OBS"
              >
                <Video size={12} /> Gravar Tela
              </button>
            </div>

            <div className="player-buttons-right">
              <div className="player-device-selectors">
                <button 
                  className={`player-device-btn ${device === 'laptop' ? 'active' : ''}`}
                  onClick={() => setDevice('laptop')}
                >
                  <Laptop size={14} /> Notebook
                </button>
                <button 
                  className={`player-device-btn ${device === 'phone' ? 'active' : ''}`}
                  onClick={() => setDevice('phone')}
                >
                  <Smartphone size={14} /> Stories/Reels
                </button>
              </div>

              <select 
                className="player-speed-selector" 
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
              >
                <option value="0.5">0.5x</option>
                <option value="1">1.0x (Normal)</option>
                <option value="1.5">1.5x</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Botão flutuante para voltar */}
      {onNavigateTo && !isCapturing && (
        <button 
          onClick={() => onNavigateTo('psi')}
          style={{
            position: 'fixed',
            top: '14px',
            right: '20px',
            zIndex: 99999,
            background: 'rgba(25, 26, 30, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '8px 16px',
            borderRadius: '9999px',
            color: '#fff',
            fontFamily: 'sans-serif',
            fontSize: '11px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(12px)',
            transition: 'all 0.2s ease',
          }}
        >
          🛋️ Voltar ao site
        </button>
      )}

    </div>
  );
}
