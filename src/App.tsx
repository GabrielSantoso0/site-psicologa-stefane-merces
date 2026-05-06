import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Menu, ArrowRight, Compass, Cpu, Bot, Check, Lock, LineChart, Zap, Workflow, BarChart } from 'lucide-react';
import logoUrl from '../Vector.png';
import heroVideoUrl from '../magnific_referencia-visual-img1.-g_2927519585.mp4';
import symbolVideoUrl from '../magnific_img1-animar-este-simbolo-_2927311707.mp4';

// Animações baseadas em scroll (como no Imagica)
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Refs para a animação orgânica do texto
  const textRef = useRef<HTMLHeadingElement>(null);
  const isHoveredRef = useRef(false);
  const targetPos = useRef({ x: 50, y: 50 });
  const currentPos = useRef({ x: 50, y: 50 });

  // Refs e Animações para a seção de Soluções Bento Grid
  const solucoesRef = useRef<HTMLElement>(null);
  const { scrollYProgress: solucoesScroll } = useScroll({
    target: solucoesRef,
    offset: ["start 0.85", "center center"]
  });

  // Cone de luz "abrindo" — scaleX faz ele abrir horizontalmente como uma porta
  const lightScaleX = useTransform(solucoesScroll, [0, 1], [0.05, 1]);
  const lightOpacity = useTransform(solucoesScroll, [0, 0.6], [0, 1]);

  // Movimento dos cards para o encaixe perfeito
  const cardLeftTopY = useTransform(solucoesScroll, [0, 1], [60, 0]);
  const cardLeftTopX = useTransform(solucoesScroll, [0, 1], [-40, 0]);
  const cardLeftBotY = useTransform(solucoesScroll, [0, 1], [100, 0]);
  const cardLeftBotX = useTransform(solucoesScroll, [0, 1], [-60, 0]);

  const cardRightTopY = useTransform(solucoesScroll, [0, 1], [60, 0]);
  const cardRightTopX = useTransform(solucoesScroll, [0, 1], [40, 0]);
  const cardRightBotY = useTransform(solucoesScroll, [0, 1], [100, 0]);
  const cardRightBotX = useTransform(solucoesScroll, [0, 1], [60, 0]);

  const cardCenterY = useTransform(solucoesScroll, [0, 1], [150, 0]);
  const cardScale = useTransform(solucoesScroll, [0, 1], [0.95, 1]);

  // Contadores animados por scroll
  const [countEscala, setCountEscala] = useState(0);
  const [countAutonomia, setCountAutonomia] = useState(0);
  const countEscalaVal = useTransform(solucoesScroll, [0.1, 1], [0, 10]);
  const countAutonomiaVal = useTransform(solucoesScroll, [0.1, 1], [0, 24]);
  useMotionValueEvent(countEscalaVal, "change", (v) => setCountEscala(Math.round(v)));
  useMotionValueEvent(countAutonomiaVal, "change", (v) => setCountAutonomia(Math.round(v)));

  // Autoplay do vídeo símbolo quando visível na tela
  const symbolVideoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = symbolVideoRef.current;
    if (!video) return;
    video.playbackRate = 0.6; // Velocidade suave

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8; // Reduz a velocidade do vídeo para 80%
    }
  }, []);

  // Animação fluida e contínua do gradiente do texto
  useEffect(() => {
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.015; // Velocidade do movimento automático
      
      if (!isHoveredRef.current) {
        // Movimento automático orgânico (Lissajous curve)
        targetPos.current.x = 50 + Math.sin(time) * 40;
        targetPos.current.y = 50 + Math.sin(time * 1.5) * 30;
      }

      // Suavização (Lerp) - faz o gradiente deslizar como um fluido atrasado
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.1;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.1;

      if (textRef.current) {
        textRef.current.style.setProperty('--mouse-x', `${currentPos.current.x}%`);
        textRef.current.style.setProperty('--mouse-y', `${currentPos.current.y}%`);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ background: 'var(--bg-main)', minHeight: '100vh', color: '#fff', position: 'relative' }}>

      {/* Grade sutil cobrindo o site inteiro */}
      <div className="grid-bg" style={{ zIndex: 0, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}></div>

      {/* Navbar com efeito Glassmorphism ativo no scroll */}
      <motion.header 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{
        background: scrolled ? 'rgba(10, 10, 10, 0.65)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition: 'background 0.5s ease, backdrop-filter 0.5s ease, border 0.5s ease'
      }}>
        <div className="container nav-content" style={{ position: 'relative' }}>
          <a href="#" className="logo">
            <img src={logoUrl} alt="Sincronia Logo" className="logo-img" style={{ height: '32px' }} />
          </a>
          
          <nav className="nav-links" style={{
            display: mobileMenuOpen ? 'flex' : '',
            flexDirection: mobileMenuOpen ? 'column' : 'row',
            position: mobileMenuOpen ? 'absolute' : 'absolute',
            top: mobileMenuOpen ? '100%' : 'auto',
            left: '50%',
            transform: mobileMenuOpen ? 'translate(-50%, 0)' : 'translateX(-50%)',
            background: mobileMenuOpen ? 'rgba(18, 18, 18, 0.95)' : 'rgba(255,255,255,0.02)',
            padding: mobileMenuOpen ? '2rem' : '0.5rem 2rem',
            backdropFilter: 'blur(16px)',
            borderRadius: mobileMenuOpen ? '16px' : '100px',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
          }}>
            <a href="#solucoes">Soluções</a>
            <a href="#metodo">O Método</a>
            <a href="#sobre">Quem Somos</a>
          </nav>

          <a href="#contato" className="btn btn-primary" style={{ display: mobileMenuOpen ? 'none' : 'inline-flex' }}>
            Iniciar Transformação
          </a>
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ display: 'none', background: 'none', border: 'none', color: '#fff' }}>
            <Menu />
          </button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="hero">
        {/* Full Screen Background Video */}
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline 
          src={heroVideoUrl} 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            opacity: 0.5 // Diminui a opacidade para o texto continuar legível
          }} 
        />
        {/* Gradiente escuro em cima do vídeo para melhorar o contraste do texto e transição suave para a próxima seção */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.5) 70%, rgba(10,10,10,1) 100%)', zIndex: 0 }}></div>
        
        <div className="glow-orb" style={{ zIndex: 1 }}></div>
        <div className="container hero-content" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: -20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1, ease: "easeOut", delay: 0.2 }} className="hero-badge" style={{ backdropFilter: 'blur(10px)' }}>
            Construindo o amanhã, hoje.
          </motion.div>
          <motion.h1 
            ref={textRef}
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }} 
            className="hero-title"
            onMouseEnter={() => { isHoveredRef.current = true; }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
              const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
              targetPos.current = { x: xPercent, y: yPercent };
            }}
            onMouseLeave={() => { isHoveredRef.current = false; }}
            style={{
              background: `radial-gradient(circle 350px at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--primary) 0%, var(--accent-blue) 40%, var(--text-main) 90%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              cursor: 'default'
            }}
          >
            Do caos à clareza.<br />360° mais inteligente.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.6 }} className="hero-subtitle">
            Conectamos pessoas, processos e tecnologias. Uma consultoria premium que acompanha toda a jornada de transformação da sua marca com inteligência artificial e automação.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }} className="hero-actions">
            <a href="#contato" className="btn btn-primary btn-large">Agendar Diagnóstico <ArrowRight size={18} /></a>
            <a href="#solucoes" className="btn btn-secondary btn-large" style={{ backdropFilter: 'blur(10px)' }}>Explorar Soluções</a>
          </motion.div>


        </div>
      </section>

      {/* Services Section Espalhada (Fiel à Referência Bento) */}
      <section id="solucoes" ref={solucoesRef} className="section scatter-section" style={{ position: 'relative', overflow: 'hidden', padding: '10rem 0' }}>
        
        {/* Cone de Luz Ciano — cor do logo Sincronia, preso no topo, abre horizontalmente */}
        <motion.div 
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            x: '-50%',
            width: '100%',
            height: '100%',
            transformOrigin: 'top center',
            scaleX: lightScaleX,
            opacity: lightOpacity,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          {/* Camada principal do cone — gradiente cônico difuso */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            height: '100%',
            background: `
              radial-gradient(ellipse 50% 90% at 50% 0%, rgba(0, 229, 200, 0.5) 0%, rgba(0, 229, 200, 0.15) 35%, transparent 70%)
            `,
            filter: 'blur(40px)',
          }} />
          {/* Camada interna mais intensa — núcleo do cone */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60%',
            height: '80%',
            background: `
              radial-gradient(ellipse 40% 80% at 50% 0%, rgba(0, 229, 200, 0.6) 0%, rgba(0, 229, 200, 0.1) 50%, transparent 75%)
            `,
            filter: 'blur(30px)',
          }} />
        </motion.div>

        {/* Pontinho de origem brilhante no topo */}
        <motion.div 
          style={{
            position: 'absolute',
            top: '-10px',
            left: '50%',
            x: '-50%',
            width: '120px',
            height: '60px',
            background: 'radial-gradient(ellipse, rgba(0, 229, 200, 0.9) 0%, rgba(0, 229, 200, 0.3) 50%, transparent 80%)',
            filter: 'blur(15px)',
            opacity: lightOpacity,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Fundo da seção */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(5, 7, 12, 0.5)', zIndex: -1 }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-header text-center" style={{ marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 className="section-title" style={{ fontSize: '3rem', margin: '1rem 0', fontWeight: '300', letterSpacing: '-1px' }}>Serviços de <span style={{ color: '#fff' }}>Alta Performance</span></h2>
            <p className="section-description" style={{ maxWidth: '500px', textAlign: 'center', fontSize: '0.9rem', color: '#8892B0' }}>Desenvolva produtos digitais escaláveis, colabore com inteligência artificial e garanta resultados precisos.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.3fr 1fr',
            gap: '1.5rem',
            alignItems: 'center',
            maxWidth: '1100px',
            margin: '0 auto',
            '@media (max-width: 768px)': {
              gridTemplateColumns: '1fr'
            }
          }} className="bento-grid-wrapper">
            
            {/* Coluna Esquerda */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <motion.div 
                style={{ 
                  x: cardLeftTopX, y: cardLeftTopY, scale: cardScale, opacity: solucoesScroll,
                  background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(60px)', WebkitBackdropFilter: 'blur(60px)', 
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '1.5rem',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '280px',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(255,255,255,0.04), 0 25px 50px rgba(0,0,0,0.5)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.8rem', color: '#8892B0', fontWeight: '500' }}>Escalabilidade</span>
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.4rem', borderRadius: '50%' }}><BarChart size={14} color="#8892B0" /></div>
                </div>
                <h4 style={{ fontSize: '3.5rem', fontWeight: '300', margin: 0, letterSpacing: '-2px', color: '#fff', fontVariantNumeric: 'tabular-nums' }}>{countEscala}x</h4>
              </motion.div>
              
              <motion.div 
                style={{ 
                  x: cardLeftBotX, y: cardLeftBotY, scale: cardScale, opacity: solucoesScroll,
                  background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(60px)', WebkitBackdropFilter: 'blur(60px)', 
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '1.5rem',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '220px',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(255,255,255,0.04), 0 25px 50px rgba(0,0,0,0.5)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.8rem', color: '#8892B0', fontWeight: '500' }}>Autonomia</span>
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.4rem', borderRadius: '50%' }}><Bot size={14} color="#8892B0" /></div>
                </div>
                <h4 style={{ fontSize: '2.5rem', fontWeight: '300', margin: 0, letterSpacing: '-1.5px', color: '#fff', fontVariantNumeric: 'tabular-nums' }}>{countAutonomia}/7</h4>
              </motion.div>
            </div>

            {/* Coluna Central */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
              <motion.div 
                style={{ 
                  y: cardCenterY, scale: cardScale, opacity: solucoesScroll,
                  background: '#000', 
                  backdropFilter: 'blur(60px)', WebkitBackdropFilter: 'blur(60px)',
                  border: '1px solid rgba(0, 229, 200, 0.35)', borderRadius: '32px', padding: '1.5rem', 
                  height: '420px', width: '100%',
                  boxShadow: '0 0 80px rgba(0,229,200,0.15), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(255,255,255,0.04)',
                  position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'
                }}
              >
                {/* O Vídeo Símbolo Rotativo */}
                <video 
                  ref={symbolVideoRef}
                  src={symbolVideoUrl}
                  muted
                  loop
                  playsInline
                  style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '140%', height: '140%', objectFit: 'contain', zIndex: 0, opacity: 0.9, mixBlendMode: 'screen', filter: 'brightness(0.95) saturate(1.1) contrast(1.15)' }}
                />
                
                {/* Labels sobrepostos ao vídeo */}
                <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(10,15,25,0.6)', padding: '0.3rem 0.6rem', borderRadius: '100px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <img src={logoUrl} alt="Sincronia" style={{ height: '16px', filter: 'brightness(0) invert(1)' }} />
                  <span style={{ fontSize: '0.75rem', color: '#fff', fontWeight: '500' }}>Automação 360°</span>
                </div>
                <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,0.1)', padding: '0.4rem', borderRadius: '50%', backdropFilter: 'blur(10px)' }}><Cpu size={14} color="#fff" /></div>

                <div style={{ position: 'relative', zIndex: 1, paddingBottom: '1.5rem', textAlign: 'center', width: '100%' }}>
                   <span style={{ fontSize: '1.8rem', color: 'var(--primary)', fontWeight: '400', letterSpacing: '-0.5px' }}>Sistema Integrado</span>
                </div>
              </motion.div>

              <motion.div 
                style={{ 
                  y: cardCenterY, scale: cardScale, opacity: solucoesScroll,
                  background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(60px)', WebkitBackdropFilter: 'blur(60px)', 
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '1.5rem',
                  display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '150px', width: '100%',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(255,255,255,0.04), 0 25px 50px rgba(0,0,0,0.5)'
                }}
              >
                <span style={{ fontSize: '0.8rem', color: '#8892B0', fontWeight: '500', marginBottom: '0.5rem' }}>Gargalos Operacionais</span>
                <h4 style={{ fontSize: '2.5rem', fontWeight: '300', margin: 0, letterSpacing: '-1.5px', color: '#fff' }}>0%</h4>
              </motion.div>
            </div>

            {/* Coluna Direita */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <motion.div 
                style={{ 
                  x: cardRightTopX, y: cardRightTopY, scale: cardScale, opacity: solucoesScroll,
                  background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(60px)', WebkitBackdropFilter: 'blur(60px)', 
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '1.5rem',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '280px',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(255,255,255,0.04), 0 25px 50px rgba(0,0,0,0.5)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.8rem', color: '#8892B0', fontWeight: '500' }}>Integrações</span>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.4rem', borderRadius: '50%' }}><Workflow size={14} color="#8892B0" /></div>
                </div>
                <h4 style={{ fontSize: '2.2rem', fontWeight: '300', margin: 0, letterSpacing: '-1px', color: '#fff', lineHeight: '1.1' }}>Infinitas</h4>
              </motion.div>

              <motion.div 
                style={{ 
                  x: cardRightBotX, y: cardRightBotY, scale: cardScale, opacity: solucoesScroll,
                  background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(60px)', WebkitBackdropFilter: 'blur(60px)', 
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '1.5rem',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '220px',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(255,255,255,0.04), 0 25px 50px rgba(0,0,0,0.5)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '0.8rem', color: '#8892B0', fontWeight: '500' }}>Segurança</span>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.4rem', borderRadius: '50%' }}><Lock size={14} color="#8892B0" /></div>
                </div>
                <h4 style={{ fontSize: '2.2rem', fontWeight: '300', margin: 0, letterSpacing: '-1px', color: '#fff', lineHeight: '1.1' }}>Blindada</h4>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="metodo" className="section method-section">
        <div className="container">
          <motion.div 
            variants={fadeInUp} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }} 
            className="method-header"
          >
            <h2 className="section-title">Como adaptamos a IA<br /><span className="primary-text">ao seu negócio</span></h2>
            <p className="section-description">
              Não usamos fórmulas prontas. Mapeamos a anatomia do seu negócio e arquitetamos um ecossistema exclusivo de Inteligência Artificial e Branding para você escalar sem perder a essência.
            </p>
          </motion.div>

          <div className="method-grid">
              
              {/* Card 01 */}
              <div className="method-card">
                <div className="method-card-number">01</div>
                <h3 className="method-card-title">Diagnóstico Cirúrgico</h3>
                <p className="method-card-desc">
                  Nós não adivinhamos, nós investigamos. Mergulhamos no modelo do seu negócio para encontrar os gargalos exatos onde a inteligência artificial fará a maior diferença, seja na sua marca ou na operação diária.
                </p>
              </div>

              {/* Card 02 */}
              <div className="method-card">
                <div className="method-card-number">02</div>
                <h3 className="method-card-title">Arquitetura de Ferramentas</h3>
                <p className="method-card-desc">
                  Esqueça a tentativa e erro. Selecionamos e desenhamos o ecossistema perfeito de IA e automações. Uma infraestrutura que se adapta à sua realidade operacional, e não o contrário.
                </p>
              </div>

              {/* Card 03 */}
              <div className="method-card">
                <div className="method-card-number">03</div>
                <h3 className="method-card-title">Evolução do Branding</h3>
                <p className="method-card-desc">
                  Posicionamento inquestionável. Utilizamos as ferramentas mapeadas para elevar o nível da sua comunicação visual e verbal, criando uma marca impossível de ser ignorada no seu mercado.
                </p>
              </div>

              {/* Card 04 */}
              <div className="method-card">
                <div className="method-card-number">04</div>
                <h3 className="method-card-title">Operação Contínua</h3>
                <p className="method-card-desc">
                  O que antes consumia dias, agora flui em segundos. Implementamos sistemas inteligentes que executam os processos complexos do seu negócio de forma silenciosa, escalável e ininterrupta.
                </p>
              </div>

          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="section" style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
        <div className="container about-grid">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <span className="section-label">[ 03 ] QUEM SOMOS</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '1.5rem', lineHeight: '1.2' }}>
              Devolvendo o seu ativo mais valioso:<br /><span className="primary-text">O Tempo.</span>
            </h2>
            <div style={{ color: '#A0A0A0', fontSize: '1.05rem', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <p>
                Você construiu um negócio promissor, mas hoje ele te consome. O gargalo não é a falta de clientes, é a operação diária que engole suas horas e sufoca o seu crescimento.
              </p>
              <p>
                A Sincronia nasceu para resolver exatamente essa dor. Nossa consultoria não entrega apenas "dicas"; nós <strong style={{color: '#fff', fontWeight: '500'}}>implementamos o futuro</strong> na sua empresa.
              </p>
              <p>
                Ao unir o impacto de um Branding inquestionável com a eficiência implacável da Inteligência Artificial, construímos ecossistemas que rodam no piloto automático. Nosso objetivo? Libertar você para focar no que realmente importa: a visão estratégica e a expansão do seu império.
              </p>
            </div>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 1 } } }} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}>
              {/* Background cover / placeholder */}
              <video 
                src={heroVideoUrl} 
                autoPlay loop muted playsInline
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4, filter: 'grayscale(50%)' }}
              />
              
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(180deg, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.8) 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="play-btn" style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(0, 229, 200, 0.15)', border: '1px solid rgba(0, 229, 200, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
                  <div style={{ width: 0, height: 0, borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderLeft: '18px solid #00E5C8', marginLeft: '6px' }}></div>
                </div>
                <span style={{ marginTop: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#fff', letterSpacing: '1px' }}>VÍDEO MANIFESTO / APRESENTAÇÃO</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contato" className="section cta-section">
        <div className="cta-glow"></div>
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="container cta-container" style={{ background: 'linear-gradient(180deg, rgba(26, 26, 26, 0.6), rgba(10, 10, 10, 0.8))', backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 className="cta-title">Sua marca, evoluída.</h2>
          <p className="cta-text">Está na hora de dar o impulso que o seu negócio necessita. Fale com nossos estrategistas e descubra o poder da Sincronia em sua empresa.</p>
          <form className="cta-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Seu e-mail corporativo" required className="input-field" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)' }} />
            <button type="submit" className="btn btn-primary">Agendar Consultoria <ArrowRight size={18} /></button>
          </form>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container footer-content">
          <div className="footer-brand">
            <a href="#" className="logo">
              <img src={logoUrl} alt="Sincronia Logo" className="logo-img" style={{ height: '32px' }} />
            </a>
            <p style={{ color: '#A0A0A0', marginTop: '1rem' }}>Branding e Automação Premium.<br />Construindo o amanhã, hoje.</p>
          </div>
          <div className="footer-links" style={{ display: 'flex', gap: '2rem' }}>
            <a href="#" style={{ color: '#A0A0A0', textDecoration: 'none' }}>LinkedIn</a>
            <a href="#" style={{ color: '#A0A0A0', textDecoration: 'none' }}>Instagram</a>
            <a href="#" style={{ color: '#A0A0A0', textDecoration: 'none' }}>Dribbble</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
