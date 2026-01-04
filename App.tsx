
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DownloaderSection from './components/DownloaderSection';
import Features from './components/Features';
import History from './components/History';
import { RecentDownload, DownloadStatus } from './types';

const App: React.FC = () => {
  const [recentDownloads, setRecentDownloads] = useState<RecentDownload[]>([]);

  // Initialize with some dummy data if empty
  useEffect(() => {
    const saved = localStorage.getItem('velostream_history');
    if (saved) {
      setRecentDownloads(JSON.parse(saved));
    }
  }, []);

  const handleDownloadStarted = (url: string, title: string) => {
    const newDownload: RecentDownload = {
      id: Math.random().toString(36).substr(2, 9),
      url,
      title,
      timestamp: Date.now(),
      status: DownloadStatus.COMPLETED
    };
    
    const updated = [newDownload, ...recentDownloads].slice(0, 10);
    setRecentDownloads(updated);
    localStorage.setItem('velostream_history', JSON.stringify(updated));
  };

  const clearHistory = () => {
    setRecentDownloads([]);
    localStorage.removeItem('velostream_history');
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 bg-slate-950">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 pointer-events-none" />
      </div>

      <Navbar />

      <main className="flex-1">
        <DownloaderSection onDownloadStarted={handleDownloadStarted} />
        
        <div className="max-w-7xl mx-auto px-6 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700 items-center justify-items-center">
             {/* Simulating platform icons for aesthetics */}
             <div className="font-black text-xl italic tracking-tighter">YOUTUBE</div>
             <div className="font-black text-xl italic tracking-tighter">VIMEO</div>
             <div className="font-black text-xl italic tracking-tighter">FACEBOOK</div>
             <div className="font-black text-xl italic tracking-tighter">INSTAGRAM</div>
             <div className="font-black text-xl italic tracking-tighter">TIKTOK</div>
             <div className="font-black text-xl italic tracking-tighter">TWITTER</div>
          </div>
        </div>

        <Features />
        
        <div className="py-24">
          <History downloads={recentDownloads} onClear={clearHistory} />
        </div>
      </main>

      <footer className="py-12 border-t border-white/5 glass">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-white">VeloStream<span className="text-indigo-400">AI</span></span>
            <span className="text-slate-500 text-sm">© 2024. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-slate-400 font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
