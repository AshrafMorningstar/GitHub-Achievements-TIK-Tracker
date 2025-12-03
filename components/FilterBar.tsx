import React from 'react';
import { FilterType, Rarity, SortOption, OwnershipFilter } from '../types';
import { Filter, ArrowDownAZ, ArrowUpAZ, ArrowDownUp, CheckCircle2, Circle, LayoutGrid } from 'lucide-react';

interface FilterBarProps {
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  ownershipFilter: OwnershipFilter;
  setOwnershipFilter: (filter: OwnershipFilter) => void;
  showOwnershipControls: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  activeFilter, 
  setActiveFilter,
  sortOption,
  setSortOption,
  ownershipFilter,
  setOwnershipFilter,
  showOwnershipControls
}) => {
  return (
    <div className="sticky top-[73px] z-30 bg-github-dark/80 backdrop-blur-xl border-b border-github-border/60 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 flex flex-col gap-4">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Rarity Filter (Scrollable with fade effect) */}
          <div className="relative w-full md:w-auto overflow-hidden group">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide pr-4">
              <div className="flex items-center gap-2 px-1">
                <LayoutGrid className="w-4 h-4 text-github-muted flex-shrink-0" />
                <div className="h-5 w-px bg-github-border mx-2"></div>
                
                <button
                  onClick={() => setActiveFilter('ALL')}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                    activeFilter === 'ALL' 
                      ? 'bg-github-text text-github-dark shadow-lg scale-105' 
                      : 'bg-github-btn text-github-muted hover:bg-github-btnHover hover:text-github-text border border-transparent'
                  }`}
                >
                  All
                </button>
                
                {Object.values(Rarity).map((rarity) => (
                  <button
                    key={rarity}
                    onClick={() => setActiveFilter(rarity)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 border ${
                      activeFilter === rarity 
                        ? 'bg-github-accent/10 text-github-accent border-github-accent/20 shadow-lg shadow-github-accent/5 scale-105' 
                        : 'bg-github-btn text-github-muted hover:bg-github-btnHover hover:text-github-text border-transparent'
                    }`}
                  >
                    {rarity}
                  </button>
                ))}
              </div>
            </div>
            {/* Fade indicators for scrolling */}
            <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-github-dark to-transparent pointer-events-none md:hidden" />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
             {/* Ownership Toggle */}
             {showOwnershipControls && (
               <div className="flex bg-github-btn/50 rounded-lg p-1 border border-github-border/50 backdrop-blur-sm">
                 <button
                   onClick={() => setOwnershipFilter('ALL')}
                   className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                     ownershipFilter === 'ALL' ? 'bg-github-card shadow-sm text-github-text' : 'text-github-muted hover:text-github-text'
                   }`}
                 >
                   All
                 </button>
                 <button
                   onClick={() => setOwnershipFilter('OWNED')}
                   className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all duration-200 ${
                     ownershipFilter === 'OWNED' ? 'bg-green-500/10 text-green-500 shadow-sm' : 'text-github-muted hover:text-github-text'
                   }`}
                 >
                   <CheckCircle2 className="w-3 h-3" /> Owned
                 </button>
                 <button
                   onClick={() => setOwnershipFilter('UNOWNED')}
                   className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all duration-200 ${
                     ownershipFilter === 'UNOWNED' ? 'bg-github-card shadow-sm text-github-text' : 'text-github-muted hover:text-github-text'
                   }`}
                 >
                   <Circle className="w-3 h-3" /> Missing
                 </button>
               </div>
             )}

             <div className="h-6 w-px bg-github-border hidden md:block"></div>

             {/* Sort Dropdown */}
             <div className="relative group min-w-[140px]">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="w-full appearance-none bg-github-btn/50 hover:bg-github-btn text-github-text text-xs font-semibold pl-9 pr-8 py-2 rounded-lg border border-transparent hover:border-github-border focus:outline-none focus:ring-2 focus:ring-github-accent/20 cursor-pointer transition-all duration-200"
                >
                  <option value="NAME_ASC">Name (A-Z)</option>
                  <option value="NAME_DESC">Name (Z-A)</option>
                  <option value="RARITY_ASC">Rarity (Low)</option>
                  <option value="RARITY_DESC">Rarity (High)</option>
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-github-muted group-hover:text-github-accent transition-colors">
                   {sortOption.includes('NAME') ? (
                     sortOption === 'NAME_ASC' ? <ArrowDownAZ className="w-3.5 h-3.5" /> : <ArrowUpAZ className="w-3.5 h-3.5" />
                   ) : (
                     <ArrowDownUp className="w-3.5 h-3.5" />
                   )}
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FilterBar;