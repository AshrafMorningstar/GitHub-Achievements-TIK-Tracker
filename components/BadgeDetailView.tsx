/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import React, { useEffect } from 'react';
import { Achievement } from '../types';
import { ArrowLeft, Star, CheckCircle2, Lock, Trophy, ExternalLink } from 'lucide-react';

interface BadgeDetailViewProps {
  achievement: Achievement;
  onBack: () => void;
  isOwned: boolean;
  onToggleStatus: (id: string) => void;
  canEdit: boolean;
}

const BadgeDetailView: React.FC<BadgeDetailViewProps> = ({
  achievement,
  onBack,
  isOwned,
  onToggleStatus,
  canEdit
}) => {
  // Scroll to top when view opens
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-[80vh] w-full max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      {/* Navigation */}
      <button 
        onClick={onBack}
        className="group flex items-center gap-2 text-github-muted hover:text-github-text transition-colors mb-8 px-4 py-2 rounded-full hover:bg-github-btn border border-transparent hover:border-github-border/50"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="font-medium">Back to Gallery</span>
      </button>

      {/* Main Glass Card */}
      <div className="bg-github-card/50 backdrop-blur-xl border border-github-border rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row relative z-10">
        
        {/* Visual Showcase (Left/Top) */}
        <div className="relative lg:w-2/5 bg-gradient-to-br from-github-btn to-github-card p-12 flex flex-col items-center justify-center text-center border-b lg:border-b-0 lg:border-r border-github-border overflow-hidden group">
          
          {/* Ambient Background Glow */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 blur-[100px] transition-opacity duration-1000"
            style={{ 
              background: `radial-gradient(circle at center, ${achievement.color}, transparent 70%)` 
            }}
          />
          
          {/* Badge Image */}
          <div className="relative z-10 w-64 h-64 mb-8 transition-transform duration-700 hover:scale-105">
            <img 
              src={achievement.image} 
              alt={achievement.name}
              className={`w-full h-full object-contain drop-shadow-2xl ${isOwned ? 'animate-float' : 'grayscale opacity-80'}`}
            />
          </div>

          <h1 className="relative z-10 text-3xl md:text-4xl font-black text-github-text mb-4 tracking-tight">
            {achievement.name}
          </h1>

          {/* Tags */}
          <div className="relative z-10 flex flex-wrap justify-center gap-3">
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-md shadow-sm transition-colors duration-300 ${
               achievement.rarity === 'Legendary' ? 'border-purple-500/50 text-purple-400 bg-purple-500/10' :
               achievement.rarity === 'Rare' ? 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10' :
               achievement.rarity === 'Special Event' ? 'border-green-500/50 text-green-400 bg-green-500/10' :
               achievement.rarity === 'Legacy' ? 'border-red-500/50 text-red-400 bg-red-500/10' :
               'border-github-border text-github-muted bg-github-border/10'
             }`}>
               {achievement.rarity}
            </span>
            {isOwned && (
              <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-green-500/30 text-green-400 bg-green-500/10 flex items-center gap-1.5 shadow-[0_0_15px_rgba(74,222,128,0.2)]">
                <CheckCircle2 className="w-3 h-3" /> Owned
              </span>
            )}
          </div>
        </div>

        {/* Content Details (Right/Bottom) */}
        <div className="flex-1 p-8 lg:p-12 flex flex-col bg-github-card/30">
          <div className="flex-1 space-y-10">
            
            {/* Description Section */}
            <div>
               <h3 className="text-xs font-bold text-github-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  Overview
               </h3>
               <p className="text-xl md:text-2xl text-github-text font-medium leading-relaxed">
                 {achievement.description}
               </p>
            </div>

            {/* Unlock Criteria Box */}
            <div className="bg-github-btn/50 rounded-2xl p-6 border border-github-border/50 hover:border-github-accent/20 transition-colors duration-300">
               <h3 className="text-xs font-bold text-github-text uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-github-accent" />
                  How to Unlock
               </h3>
               <p className="text-github-muted leading-relaxed text-sm md:text-base">
                 {achievement.howToEarn}
               </p>
            </div>

            {/* Tiers Grid */}
            {achievement.tiers && achievement.tiers.length > 0 && (
              <div className="animate-fade-in-up">
                <h3 className="text-xs font-bold text-github-muted uppercase tracking-widest mb-6">
                  Achievement Tiers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {achievement.tiers.map((tier, idx) => (
                    <div 
                      key={tier.name} 
                      className="group/tier relative p-4 rounded-xl bg-github-btn/30 border border-github-border hover:bg-github-btn hover:border-github-accent/30 transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 flex-shrink-0 rounded-lg bg-github-card p-2 shadow-sm border border-github-border/50 group-hover/tier:border-github-accent/20 transition-colors">
                          <img src={tier.image} alt={tier.name} className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <span className="block font-bold text-github-text text-sm group-hover/tier:text-github-accent transition-colors">{tier.name}</span>
                          {idx === achievement.tiers!.length - 1 && (
                            <span className="text-[10px] text-yellow-500 font-medium bg-yellow-500/10 px-1.5 py-0.5 rounded">Max Tier</span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-github-muted pl-16 leading-relaxed">{tier.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="mt-12 pt-8 border-t border-github-border flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-sm text-github-muted font-mono bg-github-btn/50 px-4 py-2 rounded-lg border border-github-border/50">
              <span className="opacity-50">ID:</span>
              <span className="text-github-text">{achievement.id}</span>
              {achievement.slug && (
                <>
                  <span className="w-px h-4 bg-github-border"></span>
                  <a 
                    href={`https://github.com/search?q=${achievement.slug}&type=users`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-github-accent transition-colors font-sans font-medium"
                  >
                    View on GitHub <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </>
              )}
            </div>

            {canEdit && (
              <button
                onClick={() => onToggleStatus(achievement.id)}
                className={`w-full sm:w-auto px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${
                  isOwned 
                    ? 'bg-github-card border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50' 
                    : 'bg-github-text text-github-card hover:bg-github-text/90'
                }`}
              >
                {isOwned ? (
                  <>
                    <Lock className="w-4 h-4" />
                    Mark as Locked
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Mark as Earned
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeDetailView;