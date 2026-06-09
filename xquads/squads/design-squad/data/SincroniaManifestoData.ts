export interface ManifestoScene {
  id: string;
  durationInFrames: number;
  visualTheme: {
    background: string;
    primaryElementColor?: string;
    glassmorphism: boolean;
    noiseLevel: number;
  };
  audio: {
    voiceover: string;
    soundEffect?: string;
  };
  typography: {
    title?: string;
    titleFont?: 'Plus Jakarta Sans' | 'Geist Mono';
    subtitle?: string;
    floatingData?: string[];
  };
  animations: {
    transitionIn: string;
    elementMotion: string;
  };
}

export const sincroniaManifestoData: ManifestoScene[] = [
  // ATO 1: O Caos
  {
    id: "scene-1-chaos-intro",
    durationInFrames: 150, // 5 segundos
    visualTheme: {
      background: "#0A0A0A", // Abyssal Black
      primaryElementColor: "#333333", // Cores cinzas e opacas
      glassmorphism: false,
      noiseLevel: 0.8, // Ruído visual forte
    },
    audio: {
      voiceover: "Você construiu um negócio sólido. Um produto de excelência. Mas, nos bastidores...",
      soundEffect: "glitch_low_rumble",
    },
    typography: {
      title: "BASTIDORES",
      titleFont: "Plus Jakarta Sans",
      floatingData: ["ERR: 404", "SYS_OVERLOAD", "MANUAL_INPUT_REQ"],
    },
    animations: {
      transitionIn: "fade",
      elementMotion: "chaotic_flicker",
    }
  },
  {
    id: "scene-2-chaos-peak",
    durationInFrames: 210, // 7 segundos
    visualTheme: {
      background: "#050505",
      primaryElementColor: "#4A4A4A",
      glassmorphism: false,
      noiseLevel: 1.0,
    },
    audio: {
      voiceover: "...o esforço engole a estratégia. O caos operacional trava a sua escala. E a sua marca... já não reflete o valor real do que você entrega.",
      soundEffect: "fast_typing_and_error_beeps",
    },
    typography: {
      title: "O CAOS TRAVA A ESCALA",
      titleFont: "Plus Jakarta Sans",
    },
    animations: {
      transitionIn: "glitch_cut",
      elementMotion: "fast_overlapping_windows",
    }
  },

  // ATO 2: A Ruptura
  {
    id: "scene-3-rupture",
    durationInFrames: 120, // 4 segundos
    visualTheme: {
      background: "#000000",
      primaryElementColor: "#00B4FF", // Data Blue cut
      glassmorphism: false,
      noiseLevel: 0, // O ruído para completamente
    },
    audio: {
      voiceover: "Trabalhar mais, já não é a resposta.",
      soundEffect: "deep_bass_drop_silence",
    },
    typography: {
      title: "TRABALHAR MAIS NÃO É A RESPOSTA",
      titleFont: "Plus Jakarta Sans",
      floatingData: ["< system_halt >"],
    },
    animations: {
      transitionIn: "hard_cut",
      elementMotion: "slow_horizontal_scanline",
    }
  },
  {
    id: "scene-4-new-aesthetic",
    durationInFrames: 180, // 6 segundos
    visualTheme: {
      background: "#0A0A0A",
      primaryElementColor: "#00E5C8", // Entra o Cyber Cyan
      glassmorphism: true,
      noiseLevel: 0.05,
    },
    audio: {
      voiceover: "No mercado de hoje, a eficiência é a nova estética.",
      soundEffect: "smooth_tech_whoosh",
    },
    typography: {
      title: "A EFICIÊNCIA É A NOVA ESTÉTICA",
      titleFont: "Plus Jakarta Sans",
    },
    animations: {
      transitionIn: "fade_up",
      elementMotion: "glass_panels_floating_up",
    }
  },

  // ATO 3: A Solução (Sincronia)
  {
    id: "scene-5-presentation",
    durationInFrames: 150, // 5 segundos
    visualTheme: {
      background: "#0A0A0A",
      primaryElementColor: "#00E5C8",
      glassmorphism: true,
      noiseLevel: 0,
    },
    audio: {
      voiceover: "Bem-vindo à Sincronia.",
      soundEffect: "harmonic_synth_chord",
    },
    typography: {
      title: "S I N C R O N I A",
      titleFont: "Plus Jakarta Sans",
      floatingData: ["[ INIT_SEQUENCE ]", "STATUS: ONLINE"],
    },
    animations: {
      transitionIn: "blur_reveal",
      elementMotion: "concentric_orbs_aligning",
    }
  },
  {
    id: "scene-6-the-method",
    durationInFrames: 240, // 8 segundos
    visualTheme: {
      background: "#0A0A0A",
      primaryElementColor: "#00E5C8",
      glassmorphism: true,
      noiseLevel: 0,
    },
    audio: {
      voiceover: "A única consultoria estrutural que funde a profundidade humana do Branding Premium, com a precisão mecânica da Inteligência Artificial.",
    },
    typography: {
      title: "BRANDING + AUTOMAÇÃO",
      titleFont: "Plus Jakarta Sans",
      floatingData: ["HUMAN_INSIGHT()", "AI_PRECISION()"],
    },
    animations: {
      transitionIn: "slide_up_smooth",
      elementMotion: "split_screen_data_merge",
    }
  },
  {
    id: "scene-7-the-execution",
    durationInFrames: 300, // 10 segundos
    visualTheme: {
      background: "#0A0A0A",
      primaryElementColor: "#00b39c", // Deep Cyan
      glassmorphism: true,
      noiseLevel: 0.02,
    },
    audio: {
      voiceover: "Nós não entregamos relatórios. Nós instalamos sistemas. Automações invisíveis que eliminam o atrito, e um posicionamento magnético que eleva o status da sua empresa.",
      soundEffect: "data_processing_smooth",
    },
    typography: {
      floatingData: ["STATUS: 100% EFFICIENCY REACHED", "ATTRITION: 0%", "BRAND_EQUITY: SCALING"],
      titleFont: "Geist Mono",
    },
    animations: {
      transitionIn: "crossfade",
      elementMotion: "abstract_ui_dashboard_reveal",
    }
  },

  // ATO 4: O Resultado
  {
    id: "scene-8-the-result",
    durationInFrames: 120, // 4 segundos
    visualTheme: {
      background: "#0A0A0A",
      primaryElementColor: "#00B4FF", // Data Blue para tranquilidade
      glassmorphism: true,
      noiseLevel: 0,
    },
    audio: {
      voiceover: "O resultado?",
    },
    typography: {
      title: "ESCALA SEM ATRITO",
      titleFont: "Plus Jakarta Sans",
    },
    animations: {
      transitionIn: "quick_fade",
      elementMotion: "glowing_text_pulse",
    }
  },
  {
    id: "scene-9-absolute-control",
    durationInFrames: 180, // 6 segundos
    visualTheme: {
      background: "#0A0A0A",
      primaryElementColor: "#00E5C8",
      glassmorphism: true,
      noiseLevel: 0,
    },
    audio: {
      voiceover: "A operação roda. A escala se torna contínua. E você, finalmente, retoma o controle absoluto do seu negócio.",
    },
    typography: {
      title: "CONTROLE ABSOLUTO",
      titleFont: "Plus Jakarta Sans",
    },
    animations: {
      transitionIn: "smooth_pan",
      elementMotion: "clean_dashboard_vitals",
    }
  },

  // ATO 5: Call to Action
  {
    id: "scene-10-cta",
    durationInFrames: 150, // 5 segundos
    visualTheme: {
      background: "#0A0A0A",
      primaryElementColor: "#00E5C8",
      glassmorphism: false,
      noiseLevel: 0,
    },
    audio: {
      voiceover: "Sincronia. Do caos à clareza.",
      soundEffect: "final_brand_chime",
    },
    typography: {
      title: "S I N C R O N I A",
      subtitle: "sincronia.com",
      titleFont: "Plus Jakarta Sans",
    },
    animations: {
      transitionIn: "fade_to_black_then_reveal",
      elementMotion: "logo_core_formation",
    }
  }
];

export const VIDEO_METADATA = {
  fps: 30,
  totalFrames: sincroniaManifestoData.reduce((acc, scene) => acc + scene.durationInFrames, 0),
  width: 1080,
  height: 1920,
  description: "Vídeo Manifesto Sincronia - O Resgate do Tempo",
};
