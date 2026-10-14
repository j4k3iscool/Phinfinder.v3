import React from 'react';
import { Bookmark, Coffee, MapPin } from 'lucide-react';
import { ViewMode } from '../types';

interface NavbarProps {
  favoritesCount: number;
  onOpenFavorites: () => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onScrollToExplore: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  favoritesCount,
  onOpenFavorites,
  viewMode,
  onViewModeChange,
  onScrollToExplore,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E7DEC8] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', window.location.pathname);
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="group flex items-center gap-2.5 text-xl font-bold tracking-tight text-[#231B15] whitespace-nowrap hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-[#3D2518] text-[#F5EFEB] flex items-center justify-center shadow-xs">
              <Coffee className="w-4 h-4 text-[#E6AF2E]" />
            </div>
            <span className="font-serif text-2xl tracking-normal">PhinFinder</span>
            <span className="hidden sm:inline-block text-xs font-sans uppercase tracking-widest text-[#8A7463] font-medium border-l border-[#D6C7B2] pl-2.5">
              Quận 3
            </span>
          </a>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#5C4C3E]">
          <button
            onClick={() => {
              onViewModeChange('grid');
              onScrollToExplore();
            }}
            className={`hover:text-[#231B15] transition-colors whitespace-nowrap cursor-pointer ${
              viewMode === 'grid' ? 'text-[#231B15] font-semibold' : ''
            }`}
          >
            Danh Sách Quán
          </button>
          <button
            onClick={() => {
              onViewModeChange('map');
              onScrollToExplore();
            }}
            className={`flex items-center gap-1.5 hover:text-[#231B15] transition-colors whitespace-nowrap cursor-pointer ${
              viewMode === 'map' ? 'text-[#231B15] font-semibold' : ''
            }`}
          >
            <MapPin className="w-4 h-4 text-[#A04818]" />
            <span>Bản Đồ Quận 3</span>
          </button>
          <a
            href="#story"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('saigon-story')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-[#231B15] transition-colors whitespace-nowrap cursor-pointer"
          >
            Văn Hóa Cà Phê
          </a>
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onOpenFavorites}
            className="group flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium text-[#231B15] bg-[#FFFFFF] border border-[#DCD0BE] rounded-lg hover:border-[#A04818] hover:bg-[#F5EFEB] transition-all whitespace-nowrap shadow-xs cursor-pointer"
            aria-label="Xem danh sách quán đã lưu"
          >
            <Bookmark className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-[#A04818] text-[#A04818]' : 'text-[#7D6B5C]'}`} />
            <span className="hidden sm:inline">Quán Đã Lưu</span>
            {favoritesCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#A04818] text-white text-[11px] font-bold flex items-center justify-center tabular-nums">
                {favoritesCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
