/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FilterBar from './components/FilterBar';
import BadgeCard from './components/BadgeCard';
import BadgeDetailView from './components/BadgeDetailView'; // Updated import
import { achievements, secretAchievement } from './data';
import { FilterType, Rarity, SortOption, OwnershipFilter, Achievement } from './types';
import { User, Loader2, Search, Trophy, History, Sparkles } from 'lucide-react';

// Extend Window interface for confetti
declare global {
  interface Window {
    confetti: any;
  }
}

const App: React.FC = () => {
  // Filters & Sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL');
  const [sortOption, setSortOption] = useState<SortOption>('NAME_ASC');
  const [ownershipFilter, setOwnershipFilter] = useState<OwnershipFilter>('ALL');
  
  // UI State
  const [selectedBadge, setSelectedBadge] = useState<Achievement | null>(null);

  // Easter egg states
  const [titleClickCount, setTitleClickCount] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  // Profile check states
  const [username, setUsername] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [checkedUser, setCheckedUser] = useState<string | null>(null);
  
  // Ownership Sets
  const [detectedBadges, setDetectedBadges] = useState<Set<string>>(new Set());
  const [manualBadges, setManualBadges] = useState<Set<string>>(new Set());
  const [checkError, setCheckError] = useState<string | null>(null);

  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleManualBadge = (id: string) => {
    setManualBadges(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Combined ownership check
  const isBadgeOwned = (id: string) => {
    return detectedBadges.has(id) || manualBadges.has(id);
  };

  const handleTitleClick = () => {
    if (showSecret) return;

    const newCount = titleClickCount + 1;
    setTitleClickCount(newCount);

    if (newCount === 3) {
      setShowSecret(true);
      setActiveFilter('ALL'); 
      setSearchQuery('');
      
      if (window.confetti) {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
        const random = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function() {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) return clearInterval(interval);
          const particleCount = 50 * (timeLeft / duration);
          window.confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
          window.confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
      }
    }
  };

  const handleCheckProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsChecking(true);
    setCheckError(null);
    setDetectedBadges(new Set());
    setManualBadges(new Set()); // Reset manuals on new search
    
    // Simulate a minimum loading time for better UX
    const minLoadTime = new Promise(resolve => setTimeout(resolve, 800));

    try {
      const fetchPromise = fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://github.com/${username}?tab=achievements`)}`);
      
      const [response] = await Promise.all([fetchPromise, minLoadTime]);
      const data = await response.json();
      
      if (!response.ok) throw new Error('Network response was not ok');
      
      const html = data.contents;
      const foundBadges = new Set<string>();
      
      achievements.forEach(achievement => {
           const nameRegex = new RegExp(`alt=["']Achievement: ${achievement.name}["']`, 'i');
           const slugRegex = achievement.slug ? new RegExp(achievement.slug, 'i') : null;
           
           if (nameRegex.test(html) || (slugRegex && slugRegex.test(html))) {
               foundBadges.add(achievement.id);
           }
      });
      
      setDetectedBadges(foundBadges);
      setCheckedUser(username);
    } catch (err) {
      setCheckError("Could not fetch profile. Please check the username and try again.");
    } finally {
      setIsChecking(false);
    }
  };

  const { earnable, retired } = useMemo(() => {
    const allList = showSecret ? [secretAchievement, ...achievements] : achievements;

    // 1. Filter
    let filtered = allList.filter((achievement) => {
      const matchesSearch = achievement.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            achievement.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeFilter === 'ALL' || achievement.rarity === activeFilter;

      // Ownership filter (only applies if user is checked)
      let matchesOwnership = true;
      if (checkedUser) {
        const owned = isBadgeOwned(achievement.id);
        if (ownershipFilter === 'OWNED') matchesOwnership = owned;
        if (ownershipFilter === 'UNOWNED') matchesOwnership = !owned;
      }

      return matchesSearch && matchesCategory && matchesOwnership;
    });

    // 2. Sort
    filtered = filtered.sort((a, b) => {
      switch (sortOption) {
        case 'NAME_ASC':
          return a.name.localeCompare(b.name);
        case 'NAME_DESC':
          return b.name.localeCompare(a.name);
        case 'RARITY_ASC':
          const rarityWeight: Record<string, number> = {
            [Rarity.COMMON]: 1,
            [Rarity.RARE]: 2,
            [Rarity.LEGENDARY]: 3,
            [Rarity.SPECIAL]: 4,
            [Rarity.LEGACY]: 5
          };
          return (rarityWeight[a.rarity] || 0) - (rarityWeight[b.rarity] || 0);
        case 'RARITY_DESC':
           const rarityWeightDesc: Record<string, number> = {
            [Rarity.COMMON]: 1,
            [Rarity.RARE]: 2,
            [Rarity.LEGENDARY]: 3,
            [Rarity.SPECIAL]: 4,
            [Rarity.LEGACY]: 5
          };
          return (rarityWeightDesc[b.rarity] || 0) - (rarityWeightDesc[a.rarity] || 0);
        default:
          return 0;
      }
    });

    return {
      earnable: filtered.filter(a => a.rarity !== Rarity.LEGACY),
      retired: filtered.filter(a => a.rarity === Rarity.LEGACY)
    };
  }, [searchQuery, activeFilter, showSecret, sortOption, ownershipFilter, checkedUser, detectedBadges, manualBadges]);

  const isEmpty = earnable.length === 0 && retired.length === 0;

  return (
    <div className="min-h-screen flex flex-col bg-github-dark font-sans text-github-text selection:bg-github-accent selection:text-white transition-colors duration-300 overflow-x-hidden">
      
      {/* Premium Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Floating Blobs with Fluid Animation */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      </div>

      <Header 
        onTitleClick={handleTitleClick} 
        theme={theme} 
        toggleTheme={toggleTheme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <main className="flex-grow z-10 relative">
        {selectedBadge ? (
          /* Dedicated Detail View */
          <BadgeDetailView 
            achievement={selectedBadge}
            onBack={() => setSelectedBadge(null)}
            isOwned={isBadgeOwned(selectedBadge.id)}
            onToggleStatus={toggleManualBadge}
            canEdit={!!checkedUser}
          />
        ) : (
          /* Gallery View */
          <>
            {/* Hero Section */}
            <div className="pt-16 pb-12 px-4 relative">
              <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in-up">
                <h2 className="text-4xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-github-text via-github-accent to-github-text bg-300% animate-gradient tracking-tight">
                  Unlock Your Potential
                </h2>
                <p className="text-github-muted text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                  GitHub badges celebrate your contributions to the open source community. 
                  Discover how to earn them, track your progress, and level up your profile.
                </p>

                {/* Profile Checker Form */}
                <div className="max-w-lg mx-auto mb-8 relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-github-accent to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                  <form onSubmit={handleCheckProfile} className="relative flex items-center bg-github-card rounded-xl shadow-2xl p-1.5 border border-github-border">
                    <div className="pl-3 pr-2 text-github-muted">
                      <User className="h-5 w-5" />
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter GitHub username..."
                      className="flex-1 bg-transparent border-none focus:ring-0 text-github-text placeholder-github-muted/70 text-base"
                    />
                    <button
                      type="submit"
                      disabled={isChecking || !username.trim()}
                      className="px-6 py-2.5 bg-github-text text-github-card hover:bg-github-text/90 rounded-lg text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg"
                    >
                      {isChecking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                      {isChecking ? 'Checking...' : 'Check'}
                    </button>
                  </form>
                </div>
                
                {/* Results / Error */}
                <div className="h-10">
                  {checkError && (
                    <p className="text-red-500 text-sm animate-fade-in">{checkError}</p>
                  )}
                  
                  {checkedUser && !isChecking && !checkError && (
                    <div className="flex items-center justify-center gap-4 animate-fade-in">
                      <p className="text-green-500 font-medium flex items-center gap-2 bg-green-500/10 px-4 py-1.5 rounded-full border border-green-500/20">
                        <Sparkles className="w-4 h-4" /> 
                        Found <span className="font-bold">{detectedBadges.size + manualBadges.size}</span> badges for {checkedUser}
                      </p>
                      <button 
                        onClick={() => { setCheckedUser(null); setUsername(''); setDetectedBadges(new Set()); setManualBadges(new Set()); setOwnershipFilter('ALL'); }}
                        className="text-xs text-github-muted hover:text-github-text underline transition-colors"
                      >
                        Clear result
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <FilterBar 
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              sortOption={sortOption}
              setSortOption={setSortOption}
              ownershipFilter={ownershipFilter}
              setOwnershipFilter={setOwnershipFilter}
              showOwnershipControls={!!checkedUser}
            />

            <div className="max-w-7xl mx-auto px-4 py-8 min-h-[50vh]">
              {isChecking ? (
                 <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
                   <div className="relative">
                     <div className="absolute inset-0 bg-github-accent blur-xl opacity-20 animate-pulse"></div>
                     <Loader2 className="w-12 h-12 text-github-accent animate-spin relative z-10" />
                   </div>
                   <p className="text-github-text font-medium text-lg mt-6">Scanning profile...</p>
                   <p className="text-github-muted text-sm">Looking for hidden gems 💎</p>
                 </div>
              ) : isEmpty ? (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4 animate-float">👾</div>
                  <h3 className="text-xl font-bold text-github-text mb-2">No achievements found</h3>
                  <p className="text-github-muted">Try adjusting your filters to find what you're looking for.</p>
                  <button 
                    onClick={() => { setSearchQuery(''); setActiveFilter('ALL'); setOwnershipFilter('ALL'); }}
                    className="mt-6 px-6 py-2 bg-github-btn hover:bg-github-btnHover text-github-text rounded-full text-sm font-medium transition-colors border border-github-border"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                <div className="space-y-12">
                  {earnable.length > 0 && (
                    <section className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                      <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 rounded-2xl bg-gradient-to-br from-github-btn to-github-card border border-github-border shadow-sm">
                          <Trophy className="w-6 h-6 text-github-accent" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-github-text">Earnable Achievements</h3>
                          <p className="text-sm text-github-muted mt-1">Badges you can actively work towards unlocking.</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {earnable.map((achievement, idx) => (
                          <div key={achievement.id} className="animate-fade-in-up" style={{ animationDelay: `${0.1 + (idx * 0.05)}s` }}>
                            <BadgeCard 
                              achievement={achievement} 
                              showStatus={!!checkedUser}
                              isLocked={checkedUser ? !isBadgeOwned(achievement.id) : false}
                              onClick={setSelectedBadge}
                            />
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {retired.length > 0 && (
                    <section className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                      <div className="flex items-center gap-4 mb-8 pt-8 border-t border-github-border/40">
                        <div className="p-3 rounded-2xl bg-gradient-to-br from-github-btn to-github-card border border-github-border shadow-sm">
                          <History className="w-6 h-6 text-github-muted" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-github-text">Historical & Retired</h3>
                          <p className="text-sm text-github-muted mt-1">Legacy badges that are no longer obtainable.</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {retired.map((achievement, idx) => (
                          <div key={achievement.id} className="animate-fade-in-up" style={{ animationDelay: `${0.1 + (idx * 0.05)}s` }}>
                            <BadgeCard 
                              achievement={achievement} 
                              showStatus={!!checkedUser}
                              isLocked={checkedUser ? !isBadgeOwned(achievement.id) : false}
                              onClick={setSelectedBadge}
                            />
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;