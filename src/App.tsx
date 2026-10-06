import { useState, useEffect } from 'react';
import { TopProfileCard } from './components/TopProfileCard';
import { Sidebar } from './components/Sidebar';
import type { NavTabId } from './components/Sidebar';
import { AboutView } from './views/AboutView';
import { PortfolioView } from './views/PortfolioView';
import { ResumeView } from './views/ResumeView';
import { JourneyView } from './views/JourneyView';
import { BlogView } from './views/BlogView';
import { ContactView } from './views/ContactView';
import { TerminalView } from './views/TerminalView';
import { InfrastructureView } from './views/InfrastructureView';
import { DesignSystemView } from './views/DesignSystemView';
import { KalaModal } from './components/KalaModal';
import { ResumeModal } from './components/ResumeModal';
import { AdminView } from './views/AdminView';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTabId>('about');
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);
  const [isKalaModalOpen, setIsKalaModalOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(
    window.location.hash === '#admin'
  );

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminOpen(window.location.hash === '#admin');
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        handleSelectTab('terminal');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelectTab = (tab: NavTabId) => {
    setActiveTab(tab);
    // Smooth scroll to top of main content when switching tabs on mobile
    if (window.innerWidth < 992) {
      document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="app">
      <div className="bg-triangles min-h-screen flex flex-col justify-between">
        <div id="scroll-sentinel" className="scroll-sentinel" aria-hidden="true"></div>
        <a href="#main-content" className="sr-only">
          Skip to content
        </a>

        <main className="main flex-1 pb-10">
          <div className="container gutter-top">
            {/* Top Profile Card matching exact reference header */}
            <TopProfileCard onViewResume={() => setIsResumeModalOpen(true)} />

            {/* Two-Column Layout: Sidebar + Main Content Card */}
            <div className="row sticky-parent">
              {/* Left Column: Sidebar Navigation */}
              <Sidebar
                activeTab={activeTab}
                onSelectTab={handleSelectTab}
              />

              {/* Right Column: Main Content Box */}
              <div className="col-12 col-md-12 rack-content-col">
                <div
                  id="main-content"
                  className="box box-content box-entrance box-entrance--content min-h-[580px]"
                >
                  {activeTab === 'about' && (
                    <AboutView onNavigateToPortfolio={() => handleSelectTab('portfolio')} />
                  )}
                  {activeTab === 'portfolio' && (
                    <PortfolioView onOpenKalaModal={() => setIsKalaModalOpen(true)} />
                  )}
                  {activeTab === 'resume' && (
                    <ResumeView
                      onOpenResumeModal={() => setIsResumeModalOpen(true)}
                      onNavigateToPortfolio={() => handleSelectTab('portfolio')}
                    />
                  )}
                  {activeTab === 'journey' && <JourneyView />}
                  {activeTab === 'blog' && <BlogView />}
                  {activeTab === 'contact' && <ContactView />}
                  {activeTab === 'terminal' && <TerminalView />}
                  {activeTab === 'infrastructure' && <InfrastructureView />}
                  {activeTab === 'design-system' && <DesignSystemView />}

                  {/* Reference Footer inside Content Card */}
                  <footer className="footer">
                    <span className="footer__copyright">© 2026 Niraj Dhore</span>
                    <span className="footer__sep" aria-hidden="true">
                      ·
                    </span>
                    <button
                      type="button"
                      onClick={() => handleSelectTab('contact')}
                      className="footer__contact bg-transparent border-0 cursor-pointer"
                    >
                      Contact
                    </button>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Modals */}
        <KalaModal
          isOpen={isKalaModalOpen}
          onClose={() => setIsKalaModalOpen(false)}
        />
        <ResumeModal
          isOpen={isResumeModalOpen}
          onClose={() => setIsResumeModalOpen(false)}
        />
        {isAdminOpen && (
          <AdminView
            onClose={() => {
              setIsAdminOpen(false);
              if (window.location.hash === '#admin') {
                window.location.hash = '';
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
