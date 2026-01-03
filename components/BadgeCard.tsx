/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import React from 'react';
import { Achievement } from '../types';
import { Lock, CheckCircle2 } from 'lucide-react';

interface BadgeCardProps {
  achievement: Achievement;
  isLocked?: boolean;
  showStatus?: boolean;
  onClick: (achievement: Achievement) => void;
}

const BadgeCard: React.FC<BadgeCardProps> = ({ achievement, isLocked = false, showStatus = false, onClick }) => {
  const isGrayscale = showStatus && isLocked;

  return (
    <div 
      onClick={() => onClick(achievement)}
      className={`group relative bg-github-card border rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-all duration-300 ease-out 
        hover:scale-[1.03] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]
        ${showStatus && isLocked 
          ? 'border-github-border/40 opacity-70 hover:opacity-100 hover:border-github-border' 
          : 'border-github-border hover:border-github-border/80'
      }`}
    >
      
      {/* Soft Hover Glow - Colored by badge identity */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none mix-blend-soft-light"
        style={{ background: `radial-gradient(circle at center, ${achievement.color}, transparent 80%)` }}
      />

      {/* Dynamic Colored Shadow on Hover (Custom tailored) */}
      <div 
        className="absolute -inset-4 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl -z-10"
        style={{ backgroundColor: achievement.color }}
      />

      {/* Tooltip on Hover */}
      <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-github-text text-github-card text-[10px] font-bold rounded-lg whitespace-nowrap z-30 pointer-events-none shadow-xl translate-y-2 group-hover:translate-y-0">
        Click for details
      </div>

      {/* Status Indicator */}
      {showStatus && (
        <div className={`absolute top-4 right-4 z-20 flex items-center justify-center w-8 h-8 rounded-full backdrop-blur-xl border transition-all duration-500 ${
          isLocked 
            ? 'bg-github-card/80 border-github-border text-github-muted' 
            : 'bg-green-500/10 border-green-500/30 text-green-500 shadow-[0_0_15px_rgba(74,222,128,0.3)]'
        }`}>
          {isLocked ? <Lock className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-4 h-4" />}
        </div>
      )}

      {/* Card Content */}
      <div className={`p-6 flex flex-col items-center flex-1 z-10 ${isGrayscale ? 'grayscale' : ''} transition-all duration-500`}>
        
        {/* Image Container with Float Animation */}
        <div 
          className="relative w-32 h-32 mb-6 flex items-center justify-center transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:animate-float"
        >
          {/* Back glow behind image */}
          <div 
            className="absolute inset-0 blur-2xl rounded-full opacity-20 transition-opacity duration-500 group-hover:opacity-40"
            style={{ backgroundColor: achievement.color }}
          />
          
          <img 
            src={achievement.image} 
            alt={achievement.name} 
            className="w-28 h-28 object-contain drop-shadow-lg relative z-10"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://via.placeholder.com/150?text=${achievement.name.charAt(0)}`;
            }}
          />
        </div>
        
        {/* Text Content */}
        <div className="flex flex-col items-center gap-2 w-full">
          <h3 className="text-lg font-bold text-github-text text-center tracking-tight group-hover:text-github-accent transition-colors duration-300">
            {achievement.name}
          </h3>
          
          <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border tracking-wide shadow-sm transition-colors duration-300 ${
            achievement.rarity === 'Legendary' ? 'border-purple-500/30 text-purple-400 bg-purple-500/10 group-hover:bg-purple-500/20' :
            achievement.rarity === 'Rare' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10 group-hover:bg-yellow-500/20' :
            achievement.rarity === 'Special Event' ? 'border-green-500/30 text-green-400 bg-green-500/10 group-hover:bg-green-500/20' :
            achievement.rarity === 'Legacy' ? 'border-red-500/30 text-red-400 bg-red-500/10 group-hover:bg-red-500/20' :
            'border-github-border text-github-muted bg-github-border/10 group-hover:bg-github-border/20'
          }`}>
            {achievement.rarity}
          </span>

          <p className="text-github-muted text-xs text-center line-clamp-2 leading-relaxed px-2 mt-2 group-hover:text-github-text/80 transition-colors">
            {achievement.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BadgeCard;