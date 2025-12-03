import React from 'react';
import { Achievement } from '../types';
import { X, Star, CheckCircle2, Circle, Lock, Trophy, ExternalLink } from 'lucide-react';

interface BadgeDetailModalProps {
  achievement: Achievement | null;
  isOpen: boolean;
  onClose: () => void;
  isOwned: boolean;
  onToggleStatus: (id: string) => void;
  canEdit: boolean;
}

const BadgeDetailModal: React.FC<BadgeDetailModalProps> = ({ 
  achievement, 
  isOpen, 
  onClose, 
  isOwned,
  onToggleStatus,
  canEdit
}) => {
  if (!isOpen || !achievement) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Premium Backdrop with Blur */}
      <div 
        className="absolute inset-0 bg-github-dark/60 backdrop-blur-md transition-all duration-300 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal Content - Card Layout */}
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-github-card border border-github-border/80 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden animate-fade-in-up">
        
        {/* Left Side: Visual Showcase (Sidebar) */}
        <div className="w-full md:w-2/5 relative bg-gradient-to-b from-github-btn to-github-card border-r border-github-border/50 p-8 flex flex-col items-center justify-center text-center overflow-hidden">
          {/* Ambient Glow */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 blur-[100px] rounded-full opacity-30 pointer-events-none"
            style={{ backgroundColor: achievement.color }}
          />

          <div className="relative z-10 mb-6">
            <img 
              src={achievement.image} 
              alt={achievement.name}
              className={`w-48 h-48 object-contain drop-shadow-2xl transition-all duration-500 ${isOwned ? 'animate-float' : 'grayscale opacity-80'}`}
            />
          </div>

          <h2 className="relative z-10 text-2xl font-bold text-github-text mb-2">{achievement.name}</h2>
          
          <div className="relative z-10 flex gap-2 mb-6">
             <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border bg-github-card shadow-sm ${
               achievement.rarity === 'Legendary' ? 'border-purple-500/50 text-purple-500' :
               achievement.rarity === 'Rare' ? 'border-yellow-500/50 text-yellow-500' :
               achievement.rarity === 'Special Event' ? 'border-green-500/50 text-green-500' :
               achievement.rarity === 'Legacy' ? 'border-red-500/50 text-red-500' :
               'border-github-border text-github-muted'
             }`}>
               {achievement.rarity}
             </span>
          </div>

          {canEdit && (
            <button
              onClick={() => onToggleStatus(achievement.id)}
              className={`relative z-10 w-full max-w-[200px] py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2 border ${
                isOwned 
                  ? 'bg-github-card text-red-400 border-red-500/20 hover:bg-red-500/10' 
                  : 'bg-github-text text-github-card border-transparent hover:opacity-90 shadow-lg shadow-github-accent/20'
              }`}
            >
              {isOwned ? (
                <>
                  <Lock className="w-3 h-3" />
                  Mark Locked
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3 h-3" />
                  Mark Earned
                </>
              )}
            </button>
          )}
        </div>

        {/* Right Side: Details & Data */}
        <div className="flex-1 flex flex-col bg-github-card relative">
            {/* Close Button */}
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 text-github-muted hover:text-github-text hover:bg-github-btn rounded-full transition-colors"
            >
                <X className="w-5 h-5" />
            </button>

            <div className="flex-1 overflow-y-auto p-8 scrollbar-thin">
                <div className="mb-8">
                    <h3 className="text-xs font-bold text-github-muted uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Star className="w-3 h-3 text-yellow-500" />
                        Description
                    </h3>
                    <p className="text-github-text text-lg leading-relaxed font-medium">
                        {achievement.description}
                    </p>
                </div>

                <div className="mb-8 p-5 bg-github-btn/50 rounded-2xl border border-github-border/50">
                    <h3 className="text-xs font-bold text-github-text uppercase tracking-widest mb-2">How to Unlock</h3>
                    <p className="text-github-muted leading-relaxed text-sm">
                        {achievement.howToEarn}
                    </p>
                </div>

                {achievement.tiers && achievement.tiers.length > 0 && (
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        <h3 className="text-xs font-bold text-github-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Trophy className="w-3 h-3" />
                            Tiers
                        </h3>
                        <div className="space-y-3">
                            {achievement.tiers.map((tier, idx) => (
                                <div 
                                    key={tier.name} 
                                    className="group flex items-center gap-4 p-3 rounded-xl bg-github-card border border-github-border hover:border-github-accent/30 hover:shadow-md transition-all duration-300"
                                >
                                    <div className="w-10 h-10 flex-shrink-0 bg-github-btn rounded-lg p-1.5 flex items-center justify-center border border-github-border/50">
                                        <img src={tier.image} alt={tier.name} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-bold text-github-text text-sm">{tier.name}</span>
                                            {idx === 0 && <span className="text-[10px] bg-github-border/30 px-1.5 rounded text-github-muted">Start</span>}
                                            {idx === achievement.tiers!.length - 1 && <span className="text-[10px] bg-yellow-500/10 text-yellow-500 px-1.5 rounded">Max</span>}
                                        </div>
                                        <p className="text-xs text-github-muted">{tier.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Meta */}
            <div className="p-4 border-t border-github-border/50 bg-github-btn/30 flex justify-between items-center text-xs text-github-muted">
                <span className="font-mono opacity-50">ID: {achievement.id}</span>
                {achievement.slug && (
                    <a 
                        href={`https://github.com/search?q=${achievement.slug}&type=users`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-github-accent transition-colors"
                    >
                        View on GitHub <ExternalLink className="w-3 h-3" />
                    </a>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeDetailModal;