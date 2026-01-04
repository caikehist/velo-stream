
import React from 'react';
import { RecentDownload } from '../types';
import { FileVideo, Trash2, ExternalLink } from 'lucide-react';

interface HistoryProps {
  downloads: RecentDownload[];
  onClear: () => void;
}

const History: React.FC<HistoryProps> = ({ downloads, onClear }) => {
  if (downloads.length === 0) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 pb-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Recent Activity</h3>
        <button 
          onClick={onClear}
          className="text-sm text-slate-400 hover:text-red-400 flex items-center gap-1 transition-colors"
        >
          <Trash2 className="w-4 h-4" /> Clear All
        </button>
      </div>
      
      <div className="space-y-3">
        {downloads.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl glass border border-white/5 group hover:border-white/10 transition-all">
            <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center shrink-0">
              <FileVideo className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-200 truncate">{item.title}</p>
              <p className="text-xs text-slate-500 truncate">{item.url}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[10px] text-slate-500 font-mono">
                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <button className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
