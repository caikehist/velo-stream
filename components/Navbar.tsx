
import React from 'react';
import { Download, Github, HelpCircle, Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Download className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">VeloStream<span className="text-indigo-400">AI</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
          <a href="#" className="hover:text-white transition-colors">Supported Sites</a>
          <a href="#" className="hover:text-white transition-colors">API</a>
          <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
            <Github className="w-4 h-4" /> Github
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-white md:hidden">
            <Menu className="w-6 h-6" />
          </button>
          <button className="hidden md:block px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-medium transition-all">
            Login
          </button>
          <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-full text-sm font-medium transition-all shadow-lg shadow-indigo-500/20">
            Get Pro
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
