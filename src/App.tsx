/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FilterBar } from './components/FilterBar';
import { CafeCard } from './components/CafeCard';
import { CafeMap } from './components/CafeMap';
import { CafeDetailModal } from './components/CafeDetailModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { SaigonCoffeeStory } from './components/SaigonCoffeeStory';
import { CAFE_DATA } from './data/cafes';
import { Cafe, ZoneFilterId, ViewMode } from './types';
import { Coffee, RotateCcw } from 'lucide-react';

export default function App() {
  const [cafes] = useState<Cafe[]>(CAFE_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState<ZoneFilterId>('all');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedCafeId, setSelectedCafeId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('phinfinder_favorites_q3');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Sync state with URL parameter `?id=[cafe-id]` for direct links and browser back/forward support
  useEffect(() => {
    const handleUrlSync = () => {
      const params = new URLSearchParams(window.location.search);
      const idFromUrl = params.get('id');
      if (idFromUrl && CAFE_DATA.some((c) => c.id === idFromUrl)) {
        setSelectedCafeId(idFromUrl);
      } else {
        setSelectedCafeId(null);
      }
    };

    handleUrlSync();
    window.addEventListener('popstate', handleUrlSync);
    return () => window.removeEventListener('popstate', handleUrlSync);
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('phinfinder_favorites_q3', JSON.stringify(favorites));
    } catch {
      // Ignore write errors
    }
  }, [favorites]);

  const handleSelectCafe = (id: string) => {
    setSelectedCafeId(id);
    const newUrl = `${window.location.pathname}?id=${id}`;
    window.history.pushState({ cafeId: id }, '', newUrl);
  };

  const handleCloseDetail = () => {
    setSelectedCafeId(null);
    window.history.pushState({}, '', window.location.pathname);
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedZone('all');
    setSelectedAmenities([]);
  };

  const handleScrollToExplore = () => {
    const el = document.getElementById('filter-controls');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter cafes based on Search, Zone, and Amenities (AND logic)
  const filteredCafes = useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase().trim();

    return cafes.filter((cafe) => {
      // Zone match
      if (selectedZone !== 'all' && cafe.zone !== selectedZone) {
        return false;
      }

      // Amenities match (AND Logic: must contain ALL selected amenities)
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every((amenity) =>
          cafe.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      // Search query match
      if (normalizedQuery) {
        const matchesName = cafe.name.toLowerCase().includes(normalizedQuery);
        const matchesAddress = cafe.address.toLowerCase().includes(normalizedQuery);
        const matchesDescription = cafe.description.toLowerCase().includes(normalizedQuery);
        const matchesTags = cafe.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));
        const matchesAmenities = cafe.amenities.some((a) =>
          a.toLowerCase().includes(normalizedQuery)
        );

        if (!matchesName && !matchesAddress && !matchesDescription && !matchesTags && !matchesAmenities) {
          return false;
        }
      }

      return true;
    });
  }, [cafes, searchQuery, selectedZone, selectedAmenities]);

  const activeCafe = useMemo(
    () => cafes.find((c) => c.id === selectedCafeId) || null,
    [cafes, selectedCafeId]
  );

  const favoriteCafesList = useMemo(
    () => cafes.filter((c) => favorites.includes(c.id)),
    [cafes, favorites]
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#231B15]">
      {/* Top Bar Navigation */}
      <Navbar
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onScrollToExplore={handleScrollToExplore}
      />

      {/* Hero Presentation */}
      <HeroSection
        totalCount={cafes.length}
        onExploreClick={handleScrollToExplore}
      />

      {/* Search & Multi-Criteria Filter Bar */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedZone={selectedZone}
        onZoneChange={setSelectedZone}
        selectedAmenities={selectedAmenities}
        onToggleAmenity={handleToggleAmenity}
        onClearFilters={handleClearFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalFiltered={filteredCafes.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'grid' ? (
          <div>
            {filteredCafes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredCafes.map((cafe) => (
                  <CafeCard
                    key={cafe.id}
                    cafe={cafe}
                    isFavorite={favorites.includes(cafe.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onSelectCafe={handleSelectCafe}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center space-y-4 max-w-md mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-[#EFE9DF] text-[#A04818] flex items-center justify-center mx-auto">
                  <Coffee className="w-8 h-8 opacity-40" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#231B15]">
                  Không tìm thấy quán phù hợp
                </h3>
                <p className="text-sm text-[#7D6B5C] leading-relaxed">
                  Không có quán cà phê nào tại Quận 3 thỏa mãn đồng thời tất cả các tiêu chí bạn vừa chọn.
                  Hãy thử giảm bớt tiện ích hoặc xóa từ khóa tìm kiếm.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#3D2518] hover:bg-[#2B1910] rounded-xl transition-all cursor-pointer shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Xóa tất cả bộ lọc</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <CafeMap
              cafes={filteredCafes.length > 0 ? filteredCafes : cafes}
              onSelectCafe={handleSelectCafe}
            />
          </div>
        )}
      </main>

      {/* District 3 Heritage Coffee Story & Clean Footer */}
      <SaigonCoffeeStory />

      {/* Cafe Detail Modal (Synced with ?id=...) */}
      {activeCafe && (
        <CafeDetailModal
          cafe={activeCafe}
          isOpen={Boolean(activeCafe)}
          onClose={handleCloseDetail}
          isFavorite={favorites.includes(activeCafe.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* Bookmarked Favorites Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favoriteCafes={favoriteCafesList}
        onRemoveFavorite={handleToggleFavorite}
        onSelectCafe={handleSelectCafe}
        onExplore={handleScrollToExplore}
      />
    </div>
  );
}
