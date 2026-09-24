import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ArrowRight, MessageCircle, Calendar, Shield, MapPin, Mail, Instagram, Brain, FileText, UserCheck } from 'lucide-react';

// Importação das imagens geradas de alta qualidade
// @ts-ignore
import heroBg from './mude_o_formato_2K_202605151955.jpeg';
// @ts-ignore
import portraitImg from './magnific_fotografia-editorial-cine_3GkSpvQREY.png';
// @ts-ignore
import logoImg from './Ativo 1.png';
// @ts-ignore
import logoSymbol from './Ativo 2.png';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default function PsicologiaLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Inicialização do Google Analytics 4 (GA4) dinâmico
  useEffect(() => {
    const gaId = (import.meta as any).env?.VITE_GA_ID;
    if (!gaId) return;

    // Injeta o script do Google Tag Manager
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script1);

    // Injeta a configuração do gtag
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      window.gtag = function(){window.dataLayer.push(arguments);}
      window.gtag('js', new Date());
      window.gtag('config', '${gaId}', {
        page_path: window.location.pathname,
      });
    `;
    document.head.appendChild(script2);

    return () => {
      if (document.head.contains(script1)) document.head.removeChild(script1);
      if (document.head.contains(script2)) document.head.removeChild(script2);
    };
  }, []);

  const trackConversion = (action: string, label: string) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', action, {
        event_category: 'Conversion',
        event_label: label,
      });
    }
  };

  // Monitorar scroll para efeito na Navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="psi-body">
      {/* Textura sutil global de ruído para sensação tátil/papel */}
      <div className="psi-noise-overlay" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }}></div>

      {/* ===== NAVBAR ("A Ilha Flutuante") ===== */}
      <header className="psi-navbar-wrapper">
        <nav className={`psi-navbar-pill ${scrolled ? 'scrolled' : ''}`}>
          <a href="#inicio" className="psi-nav-logo">
            <img src={logoImg} alt="Dra. Stéfane Mercês Logo" className="psi-nav-logo-img" />
          </a>

          {/* Links Desktop */}
          <div className="psi-nav-links">
            <a href="#inicio">Início</a>
            <a href="#sobre">Sobre Mim</a>
            <a href="#como-funciona">Psicoterapia</a>
            <a href="#neuroavaliacao">Neuroavaliação</a>
            <a href="#contato">Contato</a>
          </div>

          <a 
            href="https://wa.me/5521968892975?text=Olá,%20Stefane!%20Gostaria%20de%20agendar%20uma%20consulta." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="psi-btn psi-btn-primary" 
            style={{ padding: '0.5rem 1.5rem', fontSize: '0.85rem' }}
            onClick={() => trackConversion('click_whatsapp_navbar', 'Navbar Button')}
          >
            Agendar Sessão
            <div className="psi-btn-bg"></div>
          </a>

          {/* Botão Mobile */}
          <button className="psi-mobile-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="psi-mobile-menu"
        >
          <a href="#inicio" onClick={() => setMobileMenuOpen(false)}>Início</a>
          <a href="#sobre" onClick={() => setMobileMenuOpen(false)}>Sobre Mim</a>
          <a href="#como-funciona" onClick={() => setMobileMenuOpen(false)}>Psicoterapia</a>
          <a href="#neuroavaliacao" onClick={() => setMobileMenuOpen(false)}>Neuroavaliação</a>
          <a href="#contato" onClick={() => setMobileMenuOpen(false)}>Contato</a>
          <a 
            href="https://wa.me/5521968892975?text=Olá,%20Stefane!%20Gostaria%20de%20agendar%20uma%20consulta." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="psi-btn psi-btn-primary" 
            style={{ width: '100%', marginTop: '1rem' }}
            onClick={() => trackConversion('click_whatsapp_mobile_menu', 'Mobile Menu Button')}
          >
            Agendar Sessão
          </a>
        </motion.div>
      )}

      {/* ===== HERO SECTION ===== */}
      <section id="inicio" className="psi-hero">
        <div className="psi-hero-bg-container">
          <img src={heroBg} alt="Textura de linho orgânico com sombras de folhas e sol" className="psi-hero-img" />
          <div className="psi-hero-overlay"></div>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="psi-hero-content">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="psi-hero-title psi-title-sans"
            >
              Você passou tanto tempo tentando se adaptar… <br />
              <span className="psi-text-serif-italic" style={{ color: '#FFFFFF', fontWeight: '300' }}>
                que talvez tenha esquecido como é ser você.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="psi-hero-subtitle"
            >
              Um espaço seguro, acolhedor e sem julgamentos para compreender sua forma única de sentir, pensar e existir no mundo.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}
            >
              <a 
                href="https://wa.me/5521968892975?text=Olá,%20Stefane!%20Gostaria%20de%20agendar%20uma%20consulta." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="psi-btn psi-btn-accent"
                onClick={() => trackConversion('click_whatsapp_hero', 'Hero Button')}
              >
                Agende a sua consulta <ArrowRight size={18} />
                <div className="psi-btn-bg"></div>
              </a>
              <a href="#sobre" className="psi-btn psi-btn-glass">
                Conheça a minha trajetória
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO "COMO FUNCIONA O ATENDIMENTO" ===== */}
      <section id="como-funciona" className="psi-how-section">
        <div className="container">
          <div className="psi-how-header">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="psi-how-title psi-text-serif-italic"
            >
              Como funciona o atendimento
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="psi-how-subtitle"
            >
              Um processo simples, leve e acolhedor.
            </motion.p>
          </div>

          <div className="psi-steps-grid">
            {/* Passo 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="psi-step-card"
            >
              <div className="psi-step-icon">
                <MessageCircle size={28} />
              </div>
              <h3 className="psi-step-card-title">Primeiro contato</h3>
              <p className="psi-step-card-text">
                Você entra em contato para tirar dúvidas ou agendar sua primeira sessão. Um início sem burocracias, com escuta atenta desde a primeira mensagem.
              </p>
            </motion.div>

            {/* Passo 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="psi-step-card"
            >
              <div className="psi-step-icon">
                <Calendar size={28} />
              </div>
              <h3 className="psi-step-card-title">Atendimento online</h3>
              <p className="psi-step-card-text">
                As sessões acontecem de forma online, em um ambiente seguro e confortável, permitindo que você seja atendido de onde estiver, sem estresse de deslocamento.
              </p>
            </motion.div>

            {/* Passo 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="psi-step-card"
            >
              <div className="psi-step-icon">
                <Shield size={28} />
              </div>
              <h3 className="psi-step-card-title">Seu espaço seguro</h3>
              <p className="psi-step-card-text">
                Cada processo terapêutico é construído de maneira única, respeitando seu tempo, suas necessidades e sua forma de viver o mundo. Um tratamento sob medida.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO DE NEUROAVALIAÇÃO ===== */}
      <section id="neuroavaliacao" className="psi-neuro-section">
        <div className="container">
          <div className="psi-neuro-header">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="psi-neuro-title psi-text-serif-italic"
            >
              Avaliação Neuropsicológica
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="psi-neuro-subtitle"
            >
              Investigação clínica detalhada e emissão de laudo técnico para crianças e adultos.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="psi-neuro-text-box"
          >
            <p className="psi-neuro-support-text">
              "A avaliação neuropsicológica investiga o funcionamento de funções cognitivas como atenção, memória, funções executivas e regulação emocional. É um processo com início, meio e fim, indicado para esclarecimento diagnóstico de TDAH, Autismo (TEA), dificuldades de aprendizagem ou alterações cognitivas, oferecendo direcionamento claro para médicos, escolas e a própria família."
            </p>
          </motion.div>

          <div className="psi-neuro-cards-grid">
            {/* Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="psi-neuro-card"
            >
              <div className="psi-neuro-card-icon">
                <Brain size={28} />
              </div>
              <h3 className="psi-neuro-card-title">Investigação Estruturada</h3>
              <p className="psi-neuro-card-text">
                Testes padronizados validados pelo Conselho Federal de Psicologia (SATEPSI).
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="psi-neuro-card"
            >
              <div className="psi-neuro-card-icon">
                <FileText size={28} />
              </div>
              <h3 className="psi-neuro-card-title">Laudo Conclusivo</h3>
              <p className="psi-neuro-card-text">
                Documento técnico completo com perfil cognitivo e recomendações clínicas/escolares.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="psi-neuro-card"
            >
              <div className="psi-neuro-card-icon">
                <UserCheck size={28} />
              </div>
              <h3 className="psi-neuro-card-title">Crianças & Adultos</h3>
              <p className="psi-neuro-card-text">
                Protocolos individualizados conforme a fase de vida e a queixa principal.
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            style={{ textAlign: 'center', marginTop: '3.5rem' }}
          >
            <a 
              href="https://wa.me/5521968892975?text=Olá!%20Gostaria%20de%20entender%20melhor%20como%20funciona%20a%20avaliação%20neuropsicológica%20e%20a%20disponibilidade%20de%20datas." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="psi-btn psi-btn-glass"
              onClick={() => trackConversion('click_whatsapp_neuro', 'Neuroavaliação CTA')}
            >
              <MessageCircle size={18} />
              Tirar dúvidas sobre Neuroavaliação via WhatsApp
              <div className="psi-btn-bg"></div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===== SEÇÃO "SOBRE MIM" ===== */}
      <section id="sobre" className="psi-about-section">
        <div className="container">
          <div className="psi-about-grid">
            
            {/* Foto de Perfil */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="psi-about-image-container"
            >
              <img src={portraitImg} alt="Retrato profissional de Stefane Mercês" className="psi-about-img" />
              <div className="psi-about-image-frame"></div>
            </motion.div>

            {/* Texto Descritivo */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="psi-about-content"
            >
              <span className="psi-about-label psi-text-mono">Sobre Mim</span>
              <h2 className="psi-about-title psi-title-sans">
                Prazer, <br />
                <span className="psi-text-serif-italic" style={{ color: 'var(--psi-accent)' }}>Stefane Mercês!</span>
              </h2>

              <p className="psi-about-paragraph">
                Sou psicóloga formada, com especialização em Psicologia Baseada em Evidências, atuando com um olhar acolhedor, ético e individualizado para cada pessoa.
              </p>
              
              <p className="psi-about-paragraph">
                Também sou neuropsicóloga, auxiliando na compreensão de questões relacionadas ao funcionamento cognitivo, emocional e comportamental. Meu trabalho busca unir conhecimento científico e escuta genuína, respeitando a singularidade de cada trajetória.
              </p>

              {/* Bloco de Citação / Frase de Impacto */}
              <div className="psi-quote-box">
                <p className="psi-quote-text psi-text-serif-italic">
                  "O processo terapêutico não é apenas sobre curar feridas, mas sobre florescer em sua própria essência."
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ===== CONTATO & AGENDAMENTOS ===== */}
      <section id="contato" className="psi-cta-section" style={{ position: 'relative', overflow: 'hidden' }}>
        <img src={logoSymbol} alt="Símbolo de fundo" className="psi-cta-watermark" />
        <div className="psi-cta-glow"></div>
        <div className="container">
          <div className="psi-cta-card">
            
            <div className="psi-cta-info-panel">
              <div style={{ position: 'relative', zIndex: 1 }}>
                <span className="psi-text-mono" style={{ color: '#FFFFFF', opacity: 0.7 }}>Pronto para iniciar?</span>
                <h2 className="psi-cta-title psi-text-serif-italic" style={{ color: '#FFFFFF', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                  Dê o primeiro passo rumo ao seu espaço.
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                  Entre em contato para tirar dúvidas, compreender os formatos de atendimento ou agendar a sua consulta com tranquilidade.
                </p>

                {/* Informações Práticas de Contato */}
                <div className="psi-contact-list">
                  <div className="psi-contact-item">
                    <MapPin size={20} color="#FFFFFF" />
                    <div>
                      <strong style={{ color: '#FFFFFF' }}>Atendimento Online</strong>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Para todo o Brasil e brasileiros no exterior</p>
                    </div>
                  </div>

                  <div className="psi-contact-item">
                    <MapPin size={20} color="#FFFFFF" />
                    <div>
                      <strong style={{ color: '#FFFFFF' }}>Localização Local</strong>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Niterói – Rio de Janeiro | Google Business</p>
                    </div>
                  </div>

                  <div className="psi-contact-item">
                    <Mail size={20} color="#FFFFFF" />
                    <div>
                      <strong style={{ color: '#FFFFFF' }}>E-mail</strong>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>psicomstefane@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Painel de Contato Direto via WhatsApp (Outline Branco + 1 Botão Único) */}
            <div className="psi-cta-form-container">
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ 
                  width: '64px', 
                  height: '64px', 
                  borderRadius: '50%', 
                  background: 'rgba(255, 255, 255, 0.12)', 
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#FFFFFF', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}>
                  <MessageCircle size={32} />
                </div>
                <h3 className="psi-form-title">Contato Direto via WhatsApp</h3>
                <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.6', marginTop: '0.5rem' }}>
                  Fale diretamente com a Dra. Stéfane Mercês para tirar dúvidas ou agendar o seu atendimento.
                </p>
              </div>

              <div style={{ marginTop: '2rem' }}>
                {/* Botão Único do WhatsApp */}
                <a 
                  href="https://wa.me/5521968892975?text=Olá,%20Stefane!%20Gostaria%20de%20agendar%20uma%20consulta."
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="psi-whatsapp-single-btn"
                  onClick={() => trackConversion('click_whatsapp_single_contact', 'Contact Section - Single WhatsApp Button')}
                >
                  <MessageCircle size={24} />
                  <span>Falar no WhatsApp</span>
                  <ArrowRight size={20} />
                </a>
              </div>

              <div style={{ marginTop: '2.2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.15)', textAlign: 'center' }}>
                <p style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.75)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <Shield size={15} color="#FFFFFF" /> Atendimento individualizado, ético e sigiloso
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== FOOTER PRINCIPAL ===== */}
      <footer className="psi-footer">
        <div className="container">
          <div className="psi-footer-content">
            <div className="psi-footer-brand">
              <img src={logoImg} alt="Dra. Stéfane Mercês Logo" className="psi-footer-logo-img" />
              <p className="psi-footer-desc">
                Cuidado clínico ético, individualizado e fundamentado em evidências científicas. Dedicação ao seu desenvolvimento e bem-estar.
              </p>
            </div>

            <div className="psi-footer-links">
              <div className="psi-footer-column">
                <span className="psi-footer-column-title">Navegação</span>
                <a href="#inicio">Início</a>
                <a href="#sobre">Sobre Mim</a>
                <a href="#como-funciona">Psicoterapia</a>
                <a href="#neuroavaliacao">Neuroavaliação</a>
                <a href="#contato">Contato</a>
              </div>

              <div className="psi-footer-column">
                <span className="psi-footer-column-title">Redes & Contato</span>
                <a href="https://www.instagram.com/psi.stefanem/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Instagram size={16} /> @psi.stefanem
                </a>
                <a href="https://wa.me/5521968892975" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="psi-footer-bottom">
            <p>
              © 2026 Stefane Mercês · CRP 05/XXXXX · Todos os direitos reservados.
            </p>
            <div className="psi-status-indicator">
              <div className="psi-pulse-dot"></div>
              <span>Atendimento Clínico Ativo</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== BOTÃO FLUTUANTE DE WHATSAPP ===== */}
      <motion.a
        href="https://wa.me/5521968892975?text=Olá!%20Gostaria%20de%20tirar%20uma%20dúvida%20sobre%20os%20atendimentos%20da%20Stefane."
        target="_blank"
        rel="noopener noreferrer"
        className="psi-floating-whatsapp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        onClick={() => trackConversion('click_whatsapp_floating', 'Floating WhatsApp Button')}
        title="Falar no WhatsApp"
        aria-label="Falar no WhatsApp"
      >
        <div className="psi-floating-whatsapp-tooltip">
          Fale diretamente comigo
        </div>
        <div className="psi-floating-whatsapp-icon">
          <MessageCircle size={26} />
        </div>
        <span className="psi-floating-whatsapp-ping"></span>
      </motion.a>
    </div>
  );
}
