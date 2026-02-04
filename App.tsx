
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Store } from './pages/Store';
import { Videos } from './pages/Videos';
import { Login } from './pages/Login';
import { Admin } from './pages/Admin';
import { putItem, getAll } from './db';
import { Software } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('auth_session'));

  useEffect(() => {
    // 1. Basic Security: Disable Right Click
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);

    // 2. DevTools Detection
    const detectDevTools = () => {
      const threshold = 160;
      const isDevToolsOpen = 
        window.outerWidth - window.innerWidth > threshold || 
        window.outerHeight - window.innerHeight > threshold;
      
      if (isDevToolsOpen) {
        console.warn("Nexus Security: Developer tools detected.");
        // Optional: Could trigger a redirection or wipe sensitive session data if needed
      }
    };
    window.addEventListener('resize', detectDevTools);

    // 3. Initial Database Population (Seeds)
    const seedData = async () => {
      try {
        const softwareCount = (await getAll<Software>('software')).length;
        if (softwareCount === 0) {
          const initialSoftware: Software[] = [
            {
              id: '1',
              name: 'Apex Predator Toolkit',
              description: 'Professional precision tools for elite competitive gaming. Optimized for modern CPUs.',
              downloadUrl: '#',
              isLicensed: true,
              expiryDays: 30,
              maxDownloads: 5,
              isVisible: true,
              thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800'
            },
            {
              id: '2',
              name: 'Cyber Frame Gen 4',
              description: 'AI-driven frame generation and latency reduction for ultra-smooth visuals.',
              downloadUrl: '#',
              isLicensed: false,
              expiryDays: 0,
              maxDownloads: 0,
              isVisible: true,
              thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800'
            }
          ];
          for (const s of initialSoftware) {
            await putItem('software', s);
          }
        }
      } catch (e) {
        console.error("DB Initialization failed", e);
      }
    };
    seedData();

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('resize', detectDevTools);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col relative">
        {/* Animated Ambient Background (Apple Style) */}
        <div className="fixed inset-0 pointer-events-none -z-10 bg-[#0b0f14]">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
            <Route 
              path="/admin" 
              element={isAuthenticated ? <Admin /> : <Navigate to="/login" />} 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <footer className="py-16 px-6 border-t border-white/5 bg-black/20 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h4 className="text-white font-bold text-lg mb-2">Nexus Cyber Hub</h4>
              <p className="text-gray-500 text-sm max-w-xs">Premium software engineering for the next generation of digital athletes.</p>
            </div>
            <div className="flex gap-8 text-sm text-gray-500">
              <a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 text-center text-xs text-gray-600">
            &copy; 2024 NEXUS HUB. CRAFTED FOR PERFORMANCE.
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
