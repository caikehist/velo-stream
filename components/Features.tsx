
import React from 'react';
import { Shield, Zap, Monitor, Globe, Cloud, Smartphone } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    { icon: Zap, title: 'Turbo Speed', desc: 'Accelerated processing for ultra-fast downloads.' },
    { icon: Shield, title: 'Safe & Secure', desc: 'No trackers, no malware, just pure content.' },
    { icon: Globe, title: '1000+ Sites', desc: 'YouTube, Twitter, TikTok, Vimeo, and many more.' },
    { icon: Monitor, title: 'Up to 8K', desc: 'Support for ultra high definition video quality.' },
    { icon: Cloud, title: 'Direct to Cloud', desc: 'Save files directly to Drive or Dropbox.' },
    { icon: Smartphone, title: 'Mobile Optimized', desc: 'Responsive interface for all your devices.' },
  ];

  return (
    <div className="bg-slate-900/50 py-24 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose VeloStream?</h2>
          <p className="text-slate-400">The most advanced AI-assisted downloader on the web.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/20 transition-all hover:translate-y-[-4px]">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
