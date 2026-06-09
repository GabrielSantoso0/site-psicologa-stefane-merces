import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ArrowRight, MessageCircle, Calendar, Shield, MapPin, Mail, Instagram } from 'lucide-react';

// Importação das imagens geradas de alta qualidade
// @ts-ignore
import heroBg from './mude_o_formato_2K_202605151955.jpeg';
// @ts-ignore
import portraitImg from './magnific_fotografia-editorial-cine_3GkSpvQREY.png';
// @ts-ignore
import logoImg from './Ativo 1.png';
// @ts-ignore
import logoSymbol from './Ativo 2.png';

export default function PsicologiaLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <div className="psi-nav-links" style={{ display: 'flex', gap: '2.5rem' }}>
            <a href="#inicio">Home</a>
            <a href="#sobre">Sobre mim</a>
            <a href="#como-funciona">Sessões</a>
            <a href="#contato">Agendamentos</a>
          </div>

          <a href="https://wa.me/5521968892975?text=Olá,%20Stefane!%20Gostaria%20de%20agendar%20uma%20consulta." target="_blank" rel="noopener noreferrer" className="psi-btn psi-btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.85rem' }}>
            Agendar Sessão
            <div className="psi-btn-bg"></div>
          </a>

          {/* Botão Mobile */}
          <button className="psi-mobile-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ display: 'none' }}>
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
          <a href="#inicio" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#sobre" onClick={() => setMobileMenuOpen(false)}>Sobre mim</a>
          <a href="#como-funciona" onClick={() => setMobileMenuOpen(false)}>Sessões</a>
          <a href="#contato" onClick={() => setMobileMenuOpen(false)}>Agendamentos</a>
          <a 
            href="https://wa.me/5521968892975?text=Olá,%20Stefane!%20Gostaria%20de%20agendar%20uma%20consulta." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="psi-btn psi-btn-primary" 
            style={{ width: '100%', marginTop: '1rem' }}
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
              <a href="https://wa.me/5521968892975?text=Olá,%20Stefane!%20Gostaria%20de%20agendar%20uma%20consulta." target="_blank" rel="noopener noreferrer" className="psi-btn psi-btn-accent">
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
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                  Entre em contato para tirar dúvidas, compreender os formatos de atendimento ou agendar a sua primeira sessão com tranquilidade.
                </p>

                {/* Informações Práticas de Contato */}
                <div className="psi-contact-list">
                  <div className="psi-contact-item">
                    <MapPin size={20} color="var(--psi-accent)" />
                    <div>
                      <strong style={{ color: '#FFFFFF' }}>Atendimento Online</strong>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Para todo o Brasil e brasileiros no exterior</p>
                    </div>
                  </div>

                  <div className="psi-contact-item">
                    <MapPin size={20} color="var(--psi-accent)" />
                    <div>
                      <strong style={{ color: '#FFFFFF' }}>Localização Local</strong>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Niterói – Rio de Janeiro | Google Business</p>
                    </div>
                  </div>

                  <div className="psi-contact-item">
                    <Mail size={20} color="var(--psi-accent)" />
                    <div>
                      <strong style={{ color: '#FFFFFF' }}>E-mail</strong>
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>psicomstefane@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulário de Lead Integrado */}
            <div className="psi-cta-form-container">
              <h3 className="psi-form-title">Enviar Mensagem</h3>
              <form className="psi-cta-form" onSubmit={(e) => {
                e.preventDefault();
                // Ação de envio do formulário: abre o WhatsApp com a mensagem estruturada
                const form = e.target as HTMLFormElement;
                const name = (form.elements.namedItem('name') as HTMLInputElement).value;
                const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
                const whatsappUrl = `https://wa.me/5521968892975?text=Olá,%20Stefane!%20Meu%20nome%20é%20${encodeURIComponent(name)}.%20${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}>
                <div className="psi-input-group">
                  <label className="psi-input-label" htmlFor="name">Seu Nome</label>
                  <input type="text" id="name" name="name" required placeholder="Como prefere ser chamado?" className="psi-input" />
                </div>

                <div className="psi-input-group">
                  <label className="psi-input-label" htmlFor="email">Seu E-mail</label>
                  <input type="email" id="email" name="email" required placeholder="Ex: nome@dominio.com" className="psi-input" />
                </div>

                <div className="psi-input-group">
                  <label className="psi-input-label" htmlFor="message">Como posso te ajudar?</label>
                  <textarea id="message" name="message" rows={4} required placeholder="Fale brevemente sobre o que te traz à terapia..." className="psi-input" style={{ resize: 'none' }}></textarea>
                </div>

                <button type="submit" className="psi-btn psi-btn-accent" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}>
                  Agende a sua consulta <ArrowRight size={18} />
                  <div className="psi-btn-bg"></div>
                </button>
              </form>
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
                <a href="#inicio">Home</a>
                <a href="#sobre">Sobre mim</a>
                <a href="#como-funciona">Sessões</a>
                <a href="#contato">Agendamentos</a>
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
    </div>
  );
}
