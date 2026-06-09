import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Activity } from 'lucide-react';

interface GeneratedSitePreviewProps {
  brandName: string;
  brandPurpose: string;
  preset: 'A' | 'B' | 'C' | 'D';
  valProps: string[];
  ctaText: string;
}

// Map preset names to images from Unsplash matching imageMood
const PRESET_IMAGES = {
  A: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop', // Forest dark moss
  B: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop', // Luxury marble interior
  C: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop', // Brutalist concrete building
  D: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop', // Cybersecurity bioluminescent neon
};

export default function GeneratedSitePreview({
  brandName = 'Sincronia',
  brandPurpose = 'consultoria de inteligência artificial de alto padrão para marcas.',
  preset = 'A',
  valProps = [
    'Automatização inteligente de fluxos',
    'Escalonamento de processos operacionais',
    'Posicionamento premium e branding futurista'
  ],
  ctaText = 'Iniciar Diagnóstico'
}: GeneratedSitePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // States for interactive widgets
  const [shuffledCards, setShuffledCards] = useState([0, 1, 2]);
  const [typewriterText, setTypewriterText] = useState('');
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 10, y: 110 });
  const [cursorOpacity, setCursorOpacity] = useState(1);
  const [currentStackScroll, setCurrentStackScroll] = useState(0);

  // Split value propositions for features
  const f1 = valProps[0] || 'Automação inteligente de processos';
  const f2 = valProps[1] || 'Escala operacional com inteligência de dados';
  const f3 = valProps[2] || 'Interface tátil e design system premium';

  // Sub-labels for Diagnostic Shuffler
  const shufflerLabels = [
    f1.split(' ').slice(0, 2).join(' ') || 'Foco Direto',
    f1.split(' ').slice(2, 4).join(' ') || 'Mapeamento Ágil',
    'Execução 360°'
  ];

  // Track scrolling inside the viewport container
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    setIsScrolled(target.scrollTop > 50);

    // Stacking scroll effect calculator
    const stackContainer = target.querySelector('.gen-protocols-stack');
    if (stackContainer) {
      const rect = stackContainer.getBoundingClientRect();
      const parentRect = target.getBoundingClientRect();
      const relativeTop = rect.top - parentRect.top;
      // Stacking logic calculations
      setCurrentStackScroll(Math.max(0, -relativeTop));
    }
  };

  // Card Shuffler loop
  useEffect(() => {
    const timer = setInterval(() => {
      setShuffledCards((prev) => {
        const next = [...prev];
        const last = next.pop();
        if (last !== undefined) next.unshift(last);
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Telemetry Typewriter loop
  useEffect(() => {
    let index = 0;
    setTypewriterText('');
    const fullText = `[SYS-LOG] Rastreamento ativo: ${f2}... Status: Executando compilador de integridade. Operação rodando com 100% de precisão.`;

    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypewriterText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        // Reset typing after a pause
        clearInterval(timer);
        setTimeout(() => {
          setTypewriterText('');
          index = 0;
        }, 5000);
      }
    }, 45);

    return () => clearInterval(timer);
  }, [f2]);

  // Scheduler Cursor Simulation Loop
  useEffect(() => {
    // Coordinate maps for simulation steps:
    // 1. Move to Wed (day cell 3)
    // 2. Click (active)
    // 3. Move to Save Button
    // 4. Click Save
    // 5. Reset
    const runSimulation = async () => {
      setCursorOpacity(1);
      setIsSaved(false);
      setActiveDay(null);

      // Go to Wed
      setCursorPos({ x: 90, y: 35 });
      await new Promise((r) => setTimeout(r, 1500));
      setActiveDay(2); // Click Wednesday

      // Go to Save button
      setCursorPos({ x: 100, y: 70 });
      await new Promise((r) => setTimeout(r, 1200));
      setIsSaved(true); // Click Save

      // Fade out
      await new Promise((r) => setTimeout(r, 800));
      setCursorOpacity(0);

      // Re-trigger loop in 4s
      await new Promise((r) => setTimeout(r, 4000));
      runSimulation();
    };

    const initialTimeout = setTimeout(() => {
      runSimulation();
    }, 1000);

    return () => clearTimeout(initialTimeout);
  }, []);

  // Stacking properties calculation based on simulated scroll position
  // 3 sticky cards are at heights roughly ~250px apart
  const getCardStyle = (index: number) => {
    const cardScroll = currentStackScroll - index * 180;
    let scale = 1;
    let blur = 0;
    let opacity = 1;

    if (cardScroll > 50) {
      const factor = Math.min(1, (cardScroll - 50) / 300);
      scale = 1 - factor * 0.1; // scale down to 0.9
      blur = factor * 10;       // blur up to 10px
      opacity = 1 - factor * 0.5; // opacity down to 0.5
    }

    return {
      transform: `scale(${scale})`,
      filter: blur > 0 ? `blur(${blur}px)` : 'none',
      opacity: opacity,
      zIndex: 10 + index,
    };
  };

  // Preset branding text formatting
  const getHeroTitleAndDrama = () => {
    const cleanBrand = brandName.trim();
    if (preset === 'A') {
      return (
        <>
          {cleanBrand} é o portal para a
          <span className="drama-word">Longevidade.</span>
        </>
      );
    } else if (preset === 'B') {
      return (
        <>
          {cleanBrand} encontra a essência da
          <span className="drama-word">Precisão.</span>
        </>
      );
    } else if (preset === 'C') {
      return (
        <>
          Revolucione a sua estrutura de
          <span className="drama-word">Sistemas.</span>
        </>
      );
    } else {
      return (
        <>
          {cleanBrand} além do limite da
          <span className="drama-word">Biotecnologia.</span>
        </>
      );
    }
  };

  // Pricing values map based on Brand
  const getPricingTagline = (tier: string) => {
    if (tier === 'Essencial') return 'Acesso básico e fluxos automatizados.';
    if (tier === 'Performance') return 'Otimização avançada com inteligência profunda.';
    return 'Arquitetura customizada sob medida.';
  };

  return (
    <div 
      className={`gen-site-root gen-preset-${preset}`}
      onScroll={handleScroll}
      ref={containerRef}
      style={{ height: '100%', overflowY: 'auto', scrollBehavior: 'smooth' }}
    >
      {/* Global Noise Overlay */}
      <div className="gen-site-noise">
        <svg width="100%" height="100%">
          <filter id="noiseFilter">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.8" 
              numOctaves="3" 
              stitchTiles="stitch" 
            />
            <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.05 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* A. NAVBAR - Pill shaped fixed navigation */}
      <div className="gen-navbar-wrapper">
        <header className={`gen-navbar ${isScrolled ? 'scrolled' : ''}`}>
          <a href="#" className="gen-logo" onClick={(e) => { e.preventDefault(); containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            {brandName}
          </a>
          <nav className="gen-nav-links">
            <a href="#solucoes" className="gen-nav-link" onClick={(e) => { e.preventDefault(); const el = containerRef.current?.querySelector('#solucoes'); el?.scrollIntoView({ behavior: 'smooth' }); }}>Features</a>
            <a href="#manifesto" className="gen-nav-link" onClick={(e) => { e.preventDefault(); const el = containerRef.current?.querySelector('#manifesto'); el?.scrollIntoView({ behavior: 'smooth' }); }}>Manifesto</a>
            <a href="#processo" className="gen-nav-link" onClick={(e) => { e.preventDefault(); const el = containerRef.current?.querySelector('#processo'); el?.scrollIntoView({ behavior: 'smooth' }); }}>Protocolo</a>
          </nav>
          <button 
            className="gen-nav-btn"
            onClick={() => { const el = containerRef.current?.querySelector('#contato'); el?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            {ctaText}
          </button>
        </header>
      </div>

      {/* B. HERO SECTION - Cinematic 100dvh background */}
      <section className="gen-hero">
        <div 
          className="gen-hero-bg" 
          style={{ backgroundImage: `url(${PRESET_IMAGES[preset]})` }}
        ></div>
        <div className="gen-hero-overlay"></div>
        
        <div className="gen-hero-content">
          <div className="gen-hero-badge">
            <Activity size={12} /> PROTOCOLO DE EXCELÊNCIA VISUAL
          </div>
          <h1 className="gen-hero-title">
            {getHeroTitleAndDrama()}
          </h1>
          <p className="gen-hero-subtitle">
            {brandPurpose}. Projetado com precisão e sofisticação para marcas inovadoras que moldam o futuro.
          </p>
          <button 
            className="gen-hero-btn"
            onClick={() => { const el = containerRef.current?.querySelector('#contato'); el?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            {ctaText} <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* C. FEATURES - 3 Interactive software mockups */}
      <section id="solucoes" className="gen-features-section">
        <div className="gen-features-grid">
          
          {/* Card 1 - Diagnostic Shuffler */}
          <div className="gen-feature-card">
            <div className="gen-feature-head">
              <span className="gen-feature-label">Módulo 01 / Fluxo</span>
              <h3 className="gen-feature-title">Diagnostic Shuffler</h3>
              <p className="gen-feature-desc">{f1}</p>
            </div>
            
            <div className="shuffler-container">
              {shufflerLabels.map((lbl, idx) => {
                const currentPos = shuffledCards.indexOf(idx);
                // Depth calculations: index 0 is on top, 1 middle, 2 back
                const scale = 1 - currentPos * 0.08;
                const translateY = -currentPos * 18;
                const opacity = 1 - currentPos * 0.3;
                const bg = currentPos === 0 ? 'var(--bg-primary)' : currentPos === 1 ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.7)';
                const color = currentPos === 0 ? 'var(--color-bg-base)' : 'var(--color-text-dark)';

                return (
                  <div 
                    key={idx}
                    className="shuffler-card"
                    style={{
                      transform: `translateY(${translateY}px) scale(${scale})`,
                      opacity,
                      backgroundColor: bg,
                      color: color,
                      zIndex: 10 - currentPos,
                    }}
                  >
                    <span className="shuffler-label-mono" style={{ opacity: 0.6 }}>SHUFFLER LEVEL 0{idx + 1}</span>
                    <span className="shuffler-card-text">{lbl}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 2 - Telemetry Typewriter */}
          <div className="gen-feature-card">
            <div className="gen-feature-head">
              <span className="gen-feature-label">Módulo 02 / Telemetria</span>
              <h3 className="gen-feature-title">Telemetry Typewriter</h3>
              <p className="gen-feature-desc">{f2}</p>
            </div>

            <div className="typewriter-container">
              <div className="typewriter-feed-title">
                <div className="typewriter-dot-live"></div>
                <span>LIVE TELEMETRY STREAM</span>
              </div>
              <div className="typewriter-content-feed">
                {typewriterText}
                <span className="typewriter-cursor"></span>
              </div>
            </div>
          </div>

          {/* Card 3 - Cursor Protocol Scheduler */}
          <div className="gen-feature-card">
            <div className="gen-feature-head">
              <span className="gen-feature-label">Módulo 03 / Agendamento</span>
              <h3 className="gen-feature-title">Cursor Scheduler</h3>
              <p className="gen-feature-desc">{f3}</p>
            </div>

            <div className="scheduler-container">
              <div className="scheduler-grid">
                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, idx) => (
                  <div 
                    key={idx} 
                    className={`scheduler-day-cell ${activeDay === idx ? 'active' : ''}`}
                  >
                    {day}
                  </div>
                ))}
              </div>
              
              <div className={`scheduler-save-btn ${isSaved ? 'active' : ''}`}>
                {isSaved ? 'Schedule Confirmed' : 'Sync Protocol'}
              </div>

              {/* Animated Cursor */}
              <motion.div 
                className="scheduler-mouse-svg"
                style={{ opacity: cursorOpacity }}
                animate={{ x: cursorPos.x, y: cursorPos.y }}
                transition={{ type: 'spring', damping: 20, stiffness: 80 }}
              >
                <svg viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.3))' }}>
                  <path d="M4 4L11 20L14 13L21 10L4 4Z" fill="var(--color-accent)" stroke="white" strokeWidth="2"/>
                </svg>
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      {/* D. PHILOSOPHY - Statement contrast and dark banner */}
      <section id="manifesto" className="gen-philosophy">
        <div 
          className="gen-philosophy-bg-texture"
          style={{ backgroundImage: `url(${PRESET_IMAGES[preset]})`, filter: 'grayscale(1) brightness(0.2)' }}
        ></div>
        
        <div className="gen-philosophy-content">
          <div className="gen-philosophy-quote-sm">
            A maioria das empresas do mercado foca em resolver problemas secundários de forma genérica.
          </div>
          <h2 className="gen-philosophy-statement-lg">
            Nós focamos em construir arquitetura impecável de
            <span className="accent-italic"> Design Autônomo.</span>
          </h2>
        </div>
      </section>

      {/* E. PROTOCOLS - Sticky Stacking cards */}
      <section id="processo" className="gen-protocols-wrapper">
        <div className="gen-protocol-section-header">
          <span className="gen-protocol-subtitle">METODOLOGIA CIENTÍFICA</span>
          <h2 className="gen-protocol-main-title">Protocolo de Operação</h2>
        </div>

        <div className="gen-protocols-stack">
          {/* Card 1 - Helix */}
          <div 
            className="gen-protocol-card-sticky" 
            style={getCardStyle(0)}
          >
            <div className="gen-protocol-info">
              <span className="gen-protocol-step-num">ETAPA 01 // ORQUESTRAÇÃO</span>
              <h3 className="gen-protocol-card-title">Estrutura Molecular</h3>
              <p className="gen-protocol-card-desc">
                Definição inicial dos parâmetros operacionais de design com bases tipográficas e geométricas integradas de forma indissociável.
              </p>
            </div>
            <div className="gen-protocol-visual">
              <svg width="150" height="150" viewBox="0 0 100 100">
                <g className="helix-circle">
                  <circle cx="50" cy="50" r="40" stroke="var(--bg-primary)" strokeWidth="1" fill="none" strokeDasharray="4,4" />
                  <circle cx="50" cy="50" r="30" stroke="var(--color-accent)" strokeWidth="2" fill="none" strokeDasharray="8,6" />
                  <circle cx="50" cy="10" r="4" fill="var(--color-accent)" />
                  <circle cx="50" cy="90" r="4" fill="var(--color-accent)" />
                  <circle cx="10" cy="50" r="4" fill="var(--bg-primary)" />
                  <circle cx="90" cy="50" r="4" fill="var(--bg-primary)" />
                </g>
                <circle cx="50" cy="50" r="10" fill="var(--bg-primary)" />
              </svg>
            </div>
          </div>

          {/* Card 2 - Laser Scanner */}
          <div 
            className="gen-protocol-card-sticky" 
            style={getCardStyle(1)}
          >
            <div className="gen-protocol-info">
              <span className="gen-protocol-step-num">ETAPA 02 // SENSORIAMENTO</span>
              <h3 className="gen-protocol-card-title">Escaneamento de Rede</h3>
              <p className="gen-protocol-card-desc">
                Varredura contínua de integridade de sinal para garantir calibração cromática pixel por pixel em tempo real.
              </p>
            </div>
            <div className="gen-protocol-visual" style={{ background: 'rgba(0,0,0,0.03)', borderRadius: '12px', width: '80%', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', width: '100%', height: '100%', padding: '1rem', display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '6px' }}>
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(0,0,0,0.15)', margin: 'auto' }}></div>
                ))}
              </div>
              <div 
                className="laser-line" 
                style={{ width: '100%', height: '2px', background: 'var(--color-accent)', boxShadow: '0 0 8px var(--color-accent)', position: 'absolute', left: 0 }}
              ></div>
            </div>
          </div>

          {/* Card 3 - EKG Wave */}
          <div 
            className="gen-protocol-card-sticky" 
            style={getCardStyle(2)}
          >
            <div className="gen-protocol-info">
              <span className="gen-protocol-step-num">ETAPA 03 // TRANSMISSÃO</span>
              <h3 className="gen-protocol-card-title">Sinal Frequencial</h3>
              <p className="gen-protocol-card-desc">
                Conexão final e envio de ativos em banda larga com controle ativo de ruído ambiental SVG e harmônicas lineares.
              </p>
            </div>
            <div className="gen-protocol-visual">
              <svg width="200" height="100" viewBox="0 0 200 100">
                <path 
                  className="ekg-path"
                  d="M 10 50 L 50 50 L 60 20 L 70 80 L 80 40 L 90 60 L 100 50 L 140 50 L 150 10 L 160 90 L 170 50 L 190 50" 
                  fill="none" 
                  stroke="var(--color-accent)" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* F. PRICING & MEMBERSHIP */}
      <section className="gen-pricing-section">
        <div className="gen-pricing-grid">
          
          <div className="gen-pricing-card">
            <div>
              <div className="pricing-tier">Essencial</div>
              <div className="pricing-price">R$ 2.900<span>/mês</span></div>
              <p style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '1.5rem' }}>{getPricingTagline('Essencial')}</p>
              <ul className="pricing-features-list">
                <li className="pricing-feature-item"><Check size={14} /> Integração de 1 canal operacional</li>
                <li className="pricing-feature-item"><Check size={14} /> Design System básico</li>
                <li className="pricing-feature-item"><Check size={14} /> Suporte via e-mail comercial</li>
              </ul>
            </div>
            <button className="pricing-btn">Começar Protocolo</button>
          </div>

          <div className="gen-pricing-card featured">
            <div>
              <div className="pricing-tier">Performance</div>
              <div className="pricing-price">R$ 5.900<span>/mês</span></div>
              <p style={{ fontSize: '0.8rem', opacity: 0.9, marginBottom: '1.5rem' }}>{getPricingTagline('Performance')}</p>
              <ul className="pricing-features-list">
                <li className="pricing-feature-item"><Check size={14} /> Integração ilimitada de canais</li>
                <li className="pricing-feature-item"><Check size={14} /> Design System Avançado e Código</li>
                <li className="pricing-feature-item"><Check size={14} /> Logs e Automação 24/7</li>
                <li className="pricing-feature-item"><Check size={14} /> Gerente técnico de IA dedicado</li>
              </ul>
            </div>
            <button className="pricing-btn">Escolher Performance</button>
          </div>

          <div className="gen-pricing-card">
            <div>
              <div className="pricing-tier">Enterprise</div>
              <div className="pricing-price">Sob Consulta</div>
              <p style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '1.5rem' }}>{getPricingTagline('Enterprise')}</p>
              <ul className="pricing-features-list">
                <li className="pricing-feature-item"><Check size={14} /> SLA de resposta imediata</li>
                <li className="pricing-feature-item"><Check size={14} /> Modelos neurais customizados</li>
                <li className="pricing-feature-item"><Check size={14} /> On-premise deployment</li>
              </ul>
            </div>
            <button className="pricing-btn">Agendar Consultoria</button>
          </div>

        </div>
      </section>

      {/* G. FOOTER */}
      <footer id="contato" className="gen-footer">
        <div className="gen-footer-content">
          <div className="gen-footer-brand">
            <h4>{brandName}</h4>
            <p>Sistemas automatizados integrados a design systems de alta costura digital.</p>
          </div>
          <div className="gen-footer-links-col">
            <h5>Recursos</h5>
            <ul className="gen-footer-links">
              <li className="gen-footer-link-item"><a href="#">Documentação</a></li>
              <li className="gen-footer-link-item"><a href="#">Design Tokens</a></li>
              <li className="gen-footer-link-item"><a href="#">API Status</a></li>
            </ul>
          </div>
          <div className="gen-footer-links-col">
            <h5>Segurança</h5>
            <ul className="gen-footer-links">
              <li className="gen-footer-link-item"><a href="#">Termos de Uso</a></li>
              <li className="gen-footer-link-item"><a href="#">Diretrizes de IA</a></li>
              <li className="gen-footer-link-item"><a href="#">Suporte Direto</a></li>
            </ul>
          </div>
        </div>

        <div className="gen-footer-bottom">
          <span>&copy; {new Date().getFullYear()} {brandName}. Licenciado via Designer Agent.</span>
          <div className="gen-footer-status">
            <div className="gen-footer-status-dot"></div>
            <span>System Operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
