import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import './styles-portfolio.css';

// Import the background portrait image
// @ts-ignore
import portraitImg from '../This_is_a_closeup_studio_portrait_of_a_young_man_w_delpmaspu.png';
// Import the campaign concept video
// @ts-ignore
import campaignVideo from './BA O Som que Você escolhe ouvir 27 11 2025.mp4';

interface PortfolioAppProps {
  onNavigateTo: (route: 'portfolio' | 'pedalboard' | 'psi' | 'designer') => void;
}

interface Project {
  id: string;
  title: string;
  desc: string;
  longDesc: string;
  year: string;
  role: string;
  tags: string[];
}

export default function PortfolioApp({ onNavigateTo: _onNavigateTo }: PortfolioAppProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Play/pause background video dynamically without unmounting it
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (activeVideo) {
      video.muted = isVideoMuted;
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [activeVideo, isVideoMuted]);

  const projects: Project[] = [
    {
      id: 'brastemp-retro',
      title: 'Brastemp Retrô',
      desc: 'Na Dúvida, vai de Retrô',
      longDesc: 'Direção de arte e redesenho conceitual de comunicação de marca para a linha retrô da Brastemp, aliando fotografia nostálgica com tipografias robustas de publicidade.',
      year: '2025',
      role: 'Direção de Arte / Designer',
      tags: ['Publicidade', 'Branding', 'Direção de Arte']
    },
    {
      id: 'brazil-acoustic',
      title: 'Brazil Acoustic',
      desc: 'A jornada da Matéria: Transformando descarte em Som',
      longDesc: 'Estudo conceitual focado em design sustentável e curadoria estética, explorando a conversão de sobras industriais de madeira em dispositivos de áudio acústicos.',
      year: '2025',
      role: 'Direção de Arte / Designer',
      tags: ['Sustentabilidade', 'Design de Produto', 'Direção de Arte']
    }
  ];

  return (
    <div className="portfolio-wrapper">
      {/* Background Portrait Image (Always rendered to prevent black flashes) */}
      <div 
        className="portfolio-bg-image" 
        style={{ backgroundImage: `url(${portraitImg})`, zIndex: 1 }}
      />

      {/* Background Video (Always rendered, overlays the photo when active) */}
      <video 
        ref={videoRef}
        src={campaignVideo} 
        loop 
        playsInline
        className="portfolio-bg-image"
        style={{ 
          objectFit: 'cover',
          zIndex: activeVideo ? 2 : -1,
          opacity: activeVideo ? 1 : 0,
          transition: 'opacity 0.4s ease'
        }}
      />

      {/* Top Header */}
      <header className="portfolio-header">
        <div className="portfolio-brand">
          <h1 className="portfolio-name">Gabriel Oliveira</h1>
          <span className="portfolio-role">Art Director Jr</span>
        </div>
        
        {activeVideo && (
          <button 
            className="portfolio-route-btn" 
            onClick={() => setActiveVideo(null)}
            title="Voltar para a foto de perfil"
          >
            [ VOLTAR PARA FOTO ]
          </button>
        )}
      </header>

      {/* Spaced Grid Mosaic Section */}
      <main className="portfolio-mosaic-container">
        <div className="portfolio-mosaic">
          {/* Row 1: Floating placeholders */}
          <div className="portfolio-cell empty-cell" style={{ gridColumn: 1, gridRow: 1 }} />
          <div className="portfolio-cell empty-cell" style={{ gridColumn: 4, gridRow: 1 }} />

          {/* Row 2: Active project card 1 (Brastemp Retrô) */}
          <div 
            className="portfolio-cell active-project"
            style={{ gridColumn: 1, gridRow: 2 }}
            onClick={() => {
              setActiveVideo(campaignVideo);
              setIsVideoMuted(false);
            }}
          >
            <span className="portfolio-project-year">{projects[0].year}</span>
            <div className="portfolio-project-meta">
              <h3 className="portfolio-project-title">{projects[0].title}</h3>
              <p className="portfolio-project-desc">{projects[0].desc}</p>
            </div>
          </div>

          {/* Row 3: Floating placeholder and Active project card 2 (Brazil Acoustic) */}
          <div className="portfolio-cell empty-cell" style={{ gridColumn: 2, gridRow: 3 }} />
          
          <div 
            className="portfolio-cell active-project"
            style={{ gridColumn: 4, gridRow: 3 }}
            onMouseEnter={() => {
              setActiveVideo(campaignVideo);
              setIsVideoMuted(true);
            }}
            onMouseLeave={() => {
              setActiveVideo(null);
            }}
            onClick={() => setActiveProject(projects[1])}
          >
            <span className="portfolio-project-year">{projects[1].year}</span>
            <div className="portfolio-project-meta">
              <h3 className="portfolio-project-title">{projects[1].title}</h3>
              <p className="portfolio-project-desc">{projects[1].desc}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer / Contact Details */}
      <footer className="portfolio-footer">
        <span className="portfolio-footer-text">
          © {new Date().getFullYear()} Gabriel Oliveira. All rights reserved.
        </span>
        <div className="portfolio-footer-contact">
          <a href="mailto:gabriel@brandex.com.br" className="portfolio-meta-link">
            gabriel@brandex.com.br
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="portfolio-meta-link">
            LinkedIn
          </a>
        </div>
      </footer>

      {/* Details Window / Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div 
            className="portfolio-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div 
              className="portfolio-modal-container"
              initial={{ y: 20, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.98 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="portfolio-modal-close-btn" 
                onClick={() => setActiveProject(null)}
              >
                <X size={14} /> FECHAR
              </button>

              <div className="portfolio-modal-content">
                <div className="portfolio-modal-header">
                  <span className="portfolio-modal-year">{activeProject.year} / {activeProject.role}</span>
                  <h2 className="portfolio-modal-title">{activeProject.title}</h2>
                  <p className="portfolio-modal-subtitle">{activeProject.desc}</p>
                </div>

                <div className="portfolio-modal-body">
                  <div>
                    <h4 className="portfolio-modal-label">Sobre o Trabalho</h4>
                    <p className="portfolio-modal-desc">{activeProject.longDesc}</p>
                  </div>

                  <div>
                    <h4 className="portfolio-modal-label">Foco</h4>
                    <div className="portfolio-modal-tags">
                      {activeProject.tags.map((tag) => (
                        <span key={tag} className="portfolio-modal-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a 
                    href="mailto:gabriel@brandex.com.br"
                    className="portfolio-modal-action-btn"
                  >
                    Entre em contato sobre este projeto <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
