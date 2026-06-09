import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import PortfolioApp from './PortfolioApp.tsx'
import PsicologiaLanding from './PsicologiaLanding.tsx'
import PedalboardApp from './PedalboardApp.tsx'
import DesignerAgentApp from './DesignerAgentApp.tsx'
import './styles-psi.css'
import './styles-portfolio.css'
import './styles-designer.css'

function MainRouter() {
  const [currentRoute, setCurrentRoute] = useState<'portfolio' | 'psi' | 'pedalboard' | 'designer'>('portfolio');

  return (
    <>
      {currentRoute === 'designer' && (
        <DesignerAgentApp onNavigateTo={setCurrentRoute} />
      )}

      {currentRoute === 'portfolio' && (
        <PortfolioApp onNavigateTo={setCurrentRoute} />
      )}

      {currentRoute === 'psi' && (
        <div style={{ position: 'relative' }}>
          {/* Botões flutuantes discretos para navegação de teste */}
          <div style={{
            position: 'fixed',
            top: '14px',
            left: '20px',
            zIndex: 99999,
            display: 'flex',
            gap: '10px'
          }}>
            <button 
              onClick={() => setCurrentRoute('portfolio')}
              style={{
                background: 'rgba(25, 26, 30, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '8px 16px',
                borderRadius: '9999px',
                color: '#FF3B30',
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                transition: 'all 0.2s ease',
              }}
            >
              ← Voltar ao Portfólio
            </button>
            <button 
              onClick={() => setCurrentRoute('pedalboard')}
              style={{
                background: 'rgba(25, 26, 30, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '8px 16px',
                borderRadius: '9999px',
                color: '#00E5C8',
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                transition: 'all 0.2s ease',
              }}
            >
              🎸 Ir para o Pedalboard
            </button>
          </div>
          <PsicologiaLanding />
        </div>
      )}

      {currentRoute === 'pedalboard' && (
        <div style={{ position: 'relative' }}>
          {/* Botões flutuantes discretos para navegação de teste */}
          <div style={{
            position: 'fixed',
            top: '14px',
            left: '20px',
            zIndex: 99999,
            display: 'flex',
            gap: '10px'
          }}>
            <button 
              onClick={() => setCurrentRoute('portfolio')}
              style={{
                background: 'rgba(25, 26, 30, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '8px 16px',
                borderRadius: '9999px',
                color: '#FF3B30',
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                transition: 'all 0.2s ease',
              }}
            >
              ← Voltar ao Portfólio
            </button>
            <button 
              onClick={() => setCurrentRoute('psi')}
              style={{
                background: 'rgba(25, 26, 30, 0.85)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '8px 16px',
                borderRadius: '9999px',
                color: '#DFBA73',
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                transition: 'all 0.2s ease',
              }}
            >
              🛋️ Ir para Stefane Mercês (Psicóloga)
            </button>
          </div>
          <PedalboardApp onNavigateToPsi={() => setCurrentRoute('psi')} />
        </div>
      )}
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainRouter />
  </React.StrictMode>,
)


