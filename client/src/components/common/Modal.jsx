import React, { useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dynamic Blurred Backdrop */}
      <div
        className="fixed inset-0 bg-obsidian-950/80 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal Dialog Card with 3D Border & Glow */}
      <div
        className={`relative w-full ${maxWidth} glass-panel bg-obsidian-950/90 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-white/15 z-10 overflow-hidden max-h-[90vh] flex flex-col page-fade-in`}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amberAccent-500 shadow-[0_0_8px_rgba(235,184,126,0.8)]" />
            <h3 className="text-base font-bold text-white font-heading tracking-tight">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">{children}</div>

        {/* Subtle Ambient Bottom Flare */}
        <div className="h-1 bg-gradient-to-r from-transparent via-amberAccent-500/40 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default Modal;
