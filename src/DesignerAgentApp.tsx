import { useState, useEffect, useRef } from 'react';
import { Sparkles, Terminal, Code, Palette, Eye, Check, Copy, ArrowLeft, Bot, RefreshCw } from 'lucide-react';
import GeneratedSitePreview from './GeneratedSitePreview';
import './styles-designer.css';

interface DesignerAgentAppProps {
  onNavigateTo: (route: 'portfolio' | 'pedalboard' | 'psi') => void;
}

export default function DesignerAgentApp({ onNavigateTo }: DesignerAgentAppProps) {
  // Input form states
  const [brandName, setBrandName] = useState('Nura Health');
  const [brandPurpose, setBrandPurpose] = useState('medicina de longevidade de precisão impulsionada por dados biológicos.');
  const [preset, setPreset] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [valProps, setValProps] = useState([
    'Medicina de precisão celular avançada',
    'Mapeamento genômico em tempo real 24/7',
    'Acompanhamento clínico remoto automatizado'
  ]);
  const [ctaText, setCtaText] = useState('Solicitar Diagnóstico');

  // Dashboard states
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'tokens'>('preview');
  const [isGenerating, setIsGenerating] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    '[Status] Agente de Design Inicializado.',
    '[Status] Aguardando diretrizes da marca para compilação...'
  ]);
  const [isCopied, setIsCopied] = useState(false);

  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs to bottom
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Run mock generation logs
  const handleGenerate = () => {
    setIsGenerating(true);
    setLogs([`[Agente] Iniciando compilação do site para a marca "${brandName}"...`]);

    const logSteps = [
      `[Agente] Analisando propósito: "${brandPurpose}"`,
      `[Agente] Carregando Preset ${preset}: Carregando design system e assets...`,
      `[Agente] Computando paleta cromática e contrastes de contraste tipográfico...`,
      `[Agente] Mapeando proposta 1 ("${valProps[0]}") para o módulo Diagnostic Shuffler...`,
      `[Agente] Mapeando proposta 2 ("${valProps[1]}") para o módulo Telemetry Typewriter...`,
      `[Agente] Mapeando proposta 3 ("${valProps[2]}") para o módulo Cursor Protocol Scheduler...`,
      `[Agente] Injetando filtros globais de ruído SVG e arredondamentos de 3rem...`,
      `[Agente] Construindo navbar flutuante de ilha e protocols sticky de empilhamento...`,
      `[Agente] Compilando folha de estilos index.css e template React...`,
      `[Agente] Processo concluído com sucesso em 1020ms! Renderizando preview.`
    ];

    let delay = 300;
    logSteps.forEach((step, idx) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, step]);
        if (idx === logSteps.length - 1) {
          setIsGenerating(false);
        }
      }, delay);
      delay += 350;
    });
  };

  // Generate dynamic React + CSS code text for copy-paste
  const getGeneratedCode = () => {
    return `// ==========================================
// COMPILADO POR: AGENTE DE DESIGN IA
// MARCA: ${brandName}
// PRESET: ${preset} (Organic/Luxe/Brutalist/Neon)
// ==========================================

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Check, ArrowRight } from 'lucide-react';
import './index.css';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="gen-site-root gen-preset-${preset}">
      {/* Filtro de Ruído Global SVG */}
      <div className="gen-site-noise">
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Navbar Ilha Flutuante */}
      <header className{\`gen-navbar \${isScrolled ? 'scrolled' : ''}\`}>
        <a href="#" className="gen-logo">${brandName}</a>
        <nav className="gen-nav-links">
          <a href="#features" className="gen-nav-link">Features</a>
          <a href="#manifesto" className="gen-nav-link">Manifesto</a>
          <a href="#protocol" className="gen-nav-link">Protocolo</a>
        </nav>
        <button className="gen-nav-btn">${ctaText}</button>
      </header>

      {/* Hero Cinemático */}
      <section className="gen-hero">
        <div className="gen-hero-bg"></div>
        <div className="gen-hero-overlay"></div>
        <div className="gen-hero-content">
          <div className="gen-hero-badge"><Activity size={12} /> PROTOCOLO MOLDADO POR IA</div>
          <h1 className="gen-hero-title">
            ${brandName} é o canal da <span className="drama-word">Longevidade.</span>
          </h1>
          <p className="gen-hero-subtitle">
            ${brandPurpose}
          </p>
          <button className="gen-hero-btn">${ctaText} <ArrowRight size={14} /></button>
        </div>
      </section>

      {/* Features Interativas */}
      <section id="features" style={{ padding: '8rem 2rem' }}>
        {/* Diagnostic Shuffler, Telemetry Typewriter e Cursor Scheduler */}
      </section>
    </div>
  );
}`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getGeneratedCode());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Get active preset colors to show details in UI
  const getPresetColors = (p: 'A' | 'B' | 'C' | 'D') => {
    if (p === 'A') return { primary: '#2E4036', accent: '#CC5833', bg: '#F2F0E9', text: '#1A1A1A' };
    if (p === 'B') return { primary: '#0D0D12', accent: '#C9A84C', bg: '#FAF8F5', text: '#2A2A35' };
    if (p === 'C') return { primary: '#E8E4DD', accent: '#E63B2E', bg: '#F5F3EE', text: '#111111' };
    return { primary: '#0A0A14', accent: '#7B61FF', bg: '#F0EFF4', text: '#18181B' };
  };

  const activeColors = getPresetColors(preset);

  return (
    <div className="designer-app-wrapper">
      {/* Background decorations */}
      <div className="portfolio-grid-bg"></div>
      <div className="portfolio-glow-orb"></div>

      {/* Header */}
      <header className="portfolio-header scrolled" style={{ background: 'rgba(8, 8, 10, 0.95)' }}>
        <div className="portfolio-container portfolio-nav">
          <a href="#" className="portfolio-logo" onClick={() => onNavigateTo('portfolio')}>
            GABRIEL <span>SANTOSO</span>
          </a>
          <nav className="portfolio-nav-links">
            <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-coral)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bot size={16} /> AGENTE DE DESIGN IA v1.0.4
            </span>
          </nav>
          <button className="portfolio-route-switcher" onClick={() => onNavigateTo('portfolio')}>
            <ArrowLeft size={14} />
            <span>Voltar ao Portfólio</span>
          </button>
        </div>
      </header>

      {/* Dashboard Grid */}
      <main className="designer-dashboard">
        
        {/* Left Control Panel */}
        <section className="designer-controls">
          <div>
            <span className="designer-section-title-sm">Control Panel</span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '0.25rem', textTransform: 'uppercase' }}>Configurar Marca</h2>
          </div>

          <div className="designer-form-group">
            <label className="designer-label">Nome da Marca</label>
            <input 
              type="text" 
              className="designer-input"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              disabled={isGenerating}
            />
          </div>

          <div className="designer-form-group">
            <label className="designer-label">Propósito / Slogan (Em uma frase)</label>
            <textarea 
              className="designer-textarea"
              rows={3}
              value={brandPurpose}
              onChange={(e) => setBrandPurpose(e.target.value)}
              disabled={isGenerating}
            />
          </div>

          {/* Aesthetic Presets Selection */}
          <div className="designer-form-group">
            <label className="designer-label">Presets de Estilo IA</label>
            <div className="designer-presets-grid">
              
              <div 
                className={`designer-preset-card ${preset === 'A' ? 'active' : ''}`}
                onClick={() => !isGenerating && setPreset('A')}
              >
                <div className="designer-preset-name">Organic Tech</div>
                <div className="designer-preset-desc">Boutique Clórica, tons verdes e creme.</div>
                <div className="designer-preset-colors">
                  <div className="designer-color-dot" style={{ backgroundColor: '#2E4036' }}></div>
                  <div className="designer-color-dot" style={{ backgroundColor: '#CC5833' }}></div>
                  <div className="designer-color-dot" style={{ backgroundColor: '#F2F0E9' }}></div>
                </div>
              </div>

              <div 
                className={`designer-preset-card ${preset === 'B' ? 'active' : ''}`}
                onClick={() => !isGenerating && setPreset('B')}
              >
                <div className="designer-preset-name">Midnight Luxe</div>
                <div className="designer-preset-desc">Privado, obsidian e champagne.</div>
                <div className="designer-preset-colors">
                  <div className="designer-color-dot" style={{ backgroundColor: '#0D0D12' }}></div>
                  <div className="designer-color-dot" style={{ backgroundColor: '#C9A84C' }}></div>
                  <div className="designer-color-dot" style={{ backgroundColor: '#FAF8F5' }}></div>
                </div>
              </div>

              <div 
                className={`designer-preset-card ${preset === 'C' ? 'active' : ''}`}
                onClick={() => !isGenerating && setPreset('C')}
              >
                <div className="designer-preset-name">Brutalist Signal</div>
                <div className="designer-preset-desc">Geométrico, papel e sinal vermelho.</div>
                <div className="designer-preset-colors">
                  <div className="designer-color-dot" style={{ backgroundColor: '#E8E4DD' }}></div>
                  <div className="designer-color-dot" style={{ backgroundColor: '#E63B2E' }}></div>
                  <div className="designer-color-dot" style={{ backgroundColor: '#F5F3EE' }}></div>
                </div>
              </div>

              <div 
                className={`designer-preset-card ${preset === 'D' ? 'active' : ''}`}
                onClick={() => !isGenerating && setPreset('D')}
              >
                <div className="designer-preset-name">Vapor Clinic</div>
                <div className="designer-preset-desc">Neon Biotec, roxo plasma e vazio.</div>
                <div className="designer-preset-colors">
                  <div className="designer-color-dot" style={{ backgroundColor: '#0A0A14' }}></div>
                  <div className="designer-color-dot" style={{ backgroundColor: '#7B61FF' }}></div>
                  <div className="designer-color-dot" style={{ backgroundColor: '#F0EFF4' }}></div>
                </div>
              </div>

            </div>
          </div>

          {/* Value Propositions */}
          <div className="designer-form-group" style={{ gap: '0.75rem' }}>
            <label className="designer-label">Propostas de Valor (Features)</label>
            {valProps.map((val, idx) => (
              <input 
                key={idx}
                type="text"
                className="designer-input"
                value={val}
                placeholder={`Proposta 0${idx + 1}`}
                onChange={(e) => {
                  const newProps = [...valProps];
                  newProps[idx] = e.target.value;
                  setValProps(newProps);
                }}
                disabled={isGenerating}
              />
            ))}
          </div>

          <div className="designer-form-group">
            <label className="designer-label">Texto do Botão (CTA)</label>
            <input 
              type="text" 
              className="designer-input"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              disabled={isGenerating}
            />
          </div>

          {/* Terminal Console */}
          <div className="designer-form-group">
            <label className="designer-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Terminal size={14} /> Console de Logs do Agente
            </label>
            <div className="designer-terminal">
              {logs.map((log, i) => (
                <div key={i}>{log}</div>
              ))}
              {isGenerating && <div className="designer-terminal-cursor"></div>}
              <div ref={logsEndRef} />
            </div>
          </div>

          <button 
            className="designer-btn-generate"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="spin-icon" size={16} style={{ animation: 'spin 2s linear infinite' }} />
                <span>Processando...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>Gerar Design Cinematográfico</span>
              </>
            )}
          </button>
        </section>

        {/* Right Output View */}
        <section className="designer-output-area">
          {/* Navigation tabs */}
          <div className="designer-tabs">
            <button 
              className={`designer-tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
              onClick={() => setActiveTab('preview')}
            >
              <Eye size={14} /> Preview
            </button>
            <button 
              className={`designer-tab-btn ${activeTab === 'code' ? 'active' : ''}`}
              onClick={() => setActiveTab('code')}
            >
              <Code size={14} /> Código Gerado
            </button>
            <button 
              className={`designer-tab-btn ${activeTab === 'tokens' ? 'active' : ''}`}
              onClick={() => setActiveTab('tokens')}
            >
              <Palette size={14} /> Design System
            </button>
          </div>

          {/* Content views */}
          {activeTab === 'preview' && (
            <div className="designer-preview-frame">
              <div className="designer-preview-header">
                <div className="designer-preview-dot-group">
                  <div className="designer-preview-dot" style={{ backgroundColor: '#ff5f56' }}></div>
                  <div className="designer-preview-dot" style={{ backgroundColor: '#ffbd2e' }}></div>
                  <div className="designer-preview-dot" style={{ backgroundColor: '#27c93f' }}></div>
                </div>
                <div className="designer-preview-url">
                  https://designer-agent.ai/sandbox/{brandName.toLowerCase().replace(/\s+/g, '-')}
                </div>
                <div>Viewport: Desktop 1080p</div>
              </div>
              <div className="designer-preview-viewport">
                <GeneratedSitePreview 
                  brandName={brandName}
                  brandPurpose={brandPurpose}
                  preset={preset}
                  valProps={valProps}
                  ctaText={ctaText}
                />
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="designer-code-view">
              <button className="designer-btn-copy" onClick={handleCopyCode}>
                {isCopied ? <Check size={12} color="#00ff66" /> : <Copy size={12} />}
                <span>{isCopied ? 'Copiado!' : 'Copiar Código'}</span>
              </button>
              <code>{getGeneratedCode()}</code>
            </div>
          )}

          {activeTab === 'tokens' && (
            <div className="designer-tokens-view">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                Design Tokens - Preset {preset}
              </h3>
              <div className="designer-tokens-grid">
                
                <div className="designer-token-card">
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#8e8e93', marginBottom: '1rem', textTransform: 'uppercase' }}>Cores Ativas</h4>
                  
                  <div className="designer-token-color-row">
                    <div className="designer-token-color-block" style={{ backgroundColor: activeColors.primary }}></div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Cor Primária (Fundo Escuro)</div>
                      <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', opacity: 0.6 }}>{activeColors.primary}</div>
                    </div>
                  </div>

                  <div className="designer-token-color-row">
                    <div className="designer-token-color-block" style={{ backgroundColor: activeColors.accent }}></div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Cor de Acento (Ações)</div>
                      <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', opacity: 0.6 }}>{activeColors.accent}</div>
                    </div>
                  </div>

                  <div className="designer-token-color-row">
                    <div className="designer-token-color-block" style={{ backgroundColor: activeColors.bg }}></div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Fundo de Seção (Base Light)</div>
                      <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', opacity: 0.6 }}>{activeColors.bg}</div>
                    </div>
                  </div>

                  <div className="designer-token-color-row">
                    <div className="designer-token-color-block" style={{ backgroundColor: activeColors.text }}></div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Cor de Texto Escuro</div>
                      <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', opacity: 0.6 }}>{activeColors.text}</div>
                    </div>
                  </div>

                </div>

                <div className="designer-token-card">
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#8e8e93', marginBottom: '1rem', textTransform: 'uppercase' }}>Tipografia</h4>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', color: '#8e8e93' }}>Headings & Estrutura (Sans)</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '0.2rem' }}>
                      {preset === 'A' ? 'Plus Jakarta Sans' : preset === 'B' ? 'Inter' : preset === 'C' ? 'Space Grotesk' : 'Sora'}
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.75rem', color: '#8e8e93' }}>Drama & Expressividade (Serif Italic)</div>
                    <div style={{ fontSize: '1.15rem', fontStyle: 'italic', fontFamily: 'Georgia', marginTop: '0.2rem' }}>
                      {preset === 'A' ? 'Cormorant Garamond' : preset === 'B' ? 'Playfair Display' : preset === 'C' ? 'DM Serif Display' : 'Instrument Serif'}
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontSize: '0.75rem', color: '#8e8e93' }}>Dados & Console (Monospace)</div>
                    <div style={{ fontSize: '0.9rem', fontFamily: 'monospace', marginTop: '0.2rem' }}>
                      {preset === 'A' ? 'IBM Plex Mono' : preset === 'B' ? 'JetBrains Mono' : preset === 'C' ? 'Space Mono' : 'Fira Code'}
                    </div>
                  </div>

                  <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#8e8e93', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Regras de Arte</h4>
                  <ul style={{ fontSize: '0.75rem', color: '#a0a0b0', paddingLeft: '1rem', lineHeight: '1.6' }}>
                    <li>Cantos suaves em containers com raio de <code style={{ color: 'var(--accent-coral)' }}>2rem a 3rem</code>.</li>
                    <li>Sobreposição SVG global de ruído cinza com opacidade <code style={{ color: 'var(--accent-coral)' }}>0.05</code>.</li>
                    <li>Botões com efeito magnético no hover (escala 1.03) e transições cúbicas de velocidade.</li>
                    <li>Curadorias de imagens cinematográficas do Unsplash para clima dinâmico.</li>
                  </ul>

                </div>

              </div>
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
