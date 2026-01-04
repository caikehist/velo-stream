
import React, { useState } from 'react';
import { Search, Loader2, PlayCircle, Clock, HardDrive, Download, CheckCircle2, AlertCircle } from 'lucide-react';
import { analyzeVideoUrl } from '../services/geminiService';
import { VideoMetadata, DownloadStatus } from '../types';

interface DownloaderSectionProps {
  onDownloadStarted: (url: string, title: string) => void;
}

const DownloaderSection: React.FC<DownloaderSectionProps> = ({ onDownloadStarted }) => {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<DownloadStatus>(DownloadStatus.IDLE);
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setStatus(DownloadStatus.ANALYZING);
    setError(null);
    setMetadata(null);

    try {
      const data = await analyzeVideoUrl(url);
      setMetadata(data);
      setStatus(DownloadStatus.READY);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze the URL. Please ensure it is a valid video link.');
      setStatus(DownloadStatus.ERROR);
    }
  };

  const startDownload = (quality: string) => {
    setStatus(DownloadStatus.DOWNLOADING);
    setProgress(0);
    
    // Simulate a download progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus(DownloadStatus.COMPLETED);
          if (metadata) onDownloadStarted(url, metadata.title);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 400);
  };

  const reset = () => {
    setUrl('');
    setMetadata(null);
    setStatus(DownloadStatus.IDLE);
    setError(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
          Universal <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">AI Video Downloader</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
          Download high-quality videos from over 1000+ sites. Powered by Gemini for instant metadata extraction.
        </p>
      </div>

      <form onSubmit={handleAnalyze} className="relative mb-12">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-white/10 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              placeholder="Paste your video URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={status === DownloadStatus.ANALYZING || status === DownloadStatus.DOWNLOADING}
            />
          </div>
          <button
            type="submit"
            disabled={!url || status === DownloadStatus.ANALYZING || status === DownloadStatus.DOWNLOADING}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-2xl font-semibold text-white transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {status === DownloadStatus.ANALYZING ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Download className="w-5 h-5" />
            )}
            {status === DownloadStatus.ANALYZING ? 'Analyzing AI...' : 'Fetch Video'}
          </button>
        </div>
      </form>

      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 mb-8 animate-in fade-in slide-in-from-top-4">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {metadata && (
        <div className="glass rounded-3xl p-6 md:p-8 animate-in zoom-in-95 duration-300">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-72 shrink-0">
              <div className="relative aspect-video lg:aspect-square bg-slate-900 rounded-2xl overflow-hidden shadow-2xl group">
                <img 
                  src={metadata.thumbnailUrl || `https://picsum.photos/seed/${metadata.title}/400/400`} 
                  alt={metadata.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                  <PlayCircle className="w-16 h-16 text-white/80 group-hover:text-white transition-all drop-shadow-xl" />
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 rounded-md text-xs font-mono text-white">
                  {metadata.duration}
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 text-xs font-bold rounded uppercase tracking-wider border border-indigo-500/30">
                    {metadata.platform}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                  {metadata.title}
                </h3>
                <p className="text-slate-400 flex items-center gap-1">
                  by <span className="text-slate-200 font-medium">{metadata.author}</span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Duration</p>
                    <p className="text-sm font-medium text-slate-200">{metadata.duration}</p>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                  <HardDrive className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Est. Size</p>
                    <p className="text-sm font-medium text-slate-200">{metadata.availableQualities[0]?.size || '---'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-slate-400 mb-2">Select Quality</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {metadata.availableQualities.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => startDownload(q.label)}
                      disabled={status === DownloadStatus.DOWNLOADING}
                      className="flex flex-col items-center justify-center p-3 border border-white/10 rounded-xl hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all group"
                    >
                      <span className="text-sm font-bold text-slate-200 group-hover:text-indigo-400">{q.label}</span>
                      <span className="text-[10px] text-slate-500">{q.size} • {q.format}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {status === DownloadStatus.DOWNLOADING && (
            <div className="mt-8 pt-8 border-t border-white/5 animate-in slide-in-from-bottom-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                  <span className="text-sm font-medium text-slate-300">Processing video segments...</span>
                </div>
                <span className="text-sm font-mono text-indigo-400">{Math.round(progress)}%</span>
              </div>
              <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {status === DownloadStatus.COMPLETED && (
            <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom-4">
              <div className="flex items-center gap-3 text-green-400">
                <CheckCircle2 className="w-6 h-6" />
                <span className="font-semibold">Download Simulation Complete!</span>
              </div>
              <div className="flex gap-3">
                <button onClick={reset} className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors">
                  Start New
                </button>
                <button className="px-5 py-2 bg-indigo-600 rounded-xl text-sm font-medium hover:bg-indigo-500 transition-colors">
                  Open File
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DownloaderSection;
