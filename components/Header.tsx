import React from 'react';
import { Github, Trophy, Sun, Moon, Search } from 'lucide-react';

interface HeaderProps {
  onTitleClick?: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onTitleClick, 
  theme, 
  toggleTheme,
  searchQuery,
  setSearchQuery
}) => {
  return (
    <header className="bg-github-dark/80 backdrop-blur-xl border-b border-github-border/60 py-4 transition-all duration-300 sticky top-0 z-40 shadow-sm supports-[backdrop-filter]:bg-github-dark/60">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo Section */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-2.5 bg-gradient-to-br from-github-card to-github-btn rounded-xl border border-github-border shadow-sm group-hover:scale-105 transition-transform duration-300">
                 <Trophy className="w-5 h-5 text-yellow-500" />
              </div>
            </div>
            <div 
              onClick={onTitleClick}
              className="cursor-pointer select-none flex flex-col"
            >
              <h1 className="text-xl font-bold text-github-text tracking-tight group-hover:text-github-accent transition-colors duration-300">
                GitHub <span className="text-github-muted font-normal">Achievements</span>
              </h1>
            </div>
          </div>
          
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="md:hidden p-2.5 text-github-text bg-github-btn hover:bg-github-btnHover rounded-lg transition-colors border border-github-border"
          >
             {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
        
        {/* Search Bar - Modern Pill Style */}
        <div className="flex-1 w-full md:max-w-md px-2 md:px-6">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-github-muted group-focus-within:text-github-accent transition-colors duration-300" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-4 py-2.5 bg-github-btn/50 hover:bg-github-btn/80 focus:bg-github-card border border-transparent focus:border-github-accent/30 rounded-full text-sm text-github-text placeholder-github-muted focus:outline-none focus:ring-4 focus:ring-github-accent/10 transition-all duration-300 shadow-sm"
              placeholder="Search badges..."
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
               <span className="text-[10px] bg-github-border/30 text-github-muted px-1.5 py-0.5 rounded border border-github-border/50">/</span>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2.5 text-github-text hover:bg-github-btnHover rounded-lg transition-all duration-300 border border-transparent hover:border-github-border/50 hover:shadow-md"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 bg-github-text text-github-card hover:opacity-90 rounded-lg transition-all duration-300 font-medium text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <Github className="w-4 h-4" />
            <span>Star on GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;