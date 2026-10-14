import React from 'react';
import { Search, X, LayoutGrid, Map, Check, RotateCcw, Snowflake, Car, Trees, Wifi, Zap, PawPrint } from 'lucide-react';
import { ZoneFilterId, ViewMode } from '../types';
import { ZONE_OPTIONS, AMENITY_OPTIONS } from '../data/cafes';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedZone: ZoneFilterId;
  onZoneChange: (zone: ZoneFilterId) => void;
  selectedAmenities: string[];
  onToggleAmenity: (amenity: string) => void;
  onClearFilters: () => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  totalFiltered: number;
}

const getAmenityIcon = (iconName: string) => {
  switch (iconName) {
    case 'Snowflake':
      return <Snowflake className="w-3.5 h-3.5" />;
    case 'Car':
      return <Car className="w-3.5 h-3.5" />;
    case 'Trees':
      return <Trees className="w-3.5 h-3.5" />;
    case 'Wifi':
      return <Wifi className="w-3.5 h-3.5" />;
    case 'Zap':
      return <Zap className="w-3.5 h-3.5" />;
    case 'PawPrint':
      return <PawPrint className="w-3.5 h-3.5" />;
    default:
      return null;
  }
};

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedZone,
  onZoneChange,
  selectedAmenities,
  onToggleAmenity,
  onClearFilters,
  viewMode,
  onViewModeChange,
  totalFiltered,
}) => {
  const isFiltered = searchQuery.trim() !== '' || selectedZone !== 'all' || selectedAmenities.length > 0;

  return (
    <div id="filter-controls" className="bg-[#FAF7F2] py-6 border-b border-[#E7DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        {/* Row 1: Search Bar & View Mode Toggle */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7463]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Tìm theo tên quán, đường (Tú Xương, Nguyễn Thiện Thuật), phong cách..."
              className="w-full pl-10 pr-9 py-2.5 text-sm bg-white border border-[#DCD0BE] rounded-xl text-[#231B15] placeholder:text-[#8A7463] focus:outline-none focus:ring-2 focus:ring-[#A04818]/30 focus:border-[#A04818] transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A7463] hover:text-[#231B15] p-1 cursor-pointer"
                aria-label="Xóa nội dung tìm kiếm"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* View Mode Toggle: Grid vs Map */}
          <div className="flex items-center self-end sm:self-auto bg-[#EFE9DF] p-1 rounded-xl border border-[#DCD0BE] shrink-0">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-[#231B15] shadow-xs font-semibold'
                  : 'text-[#6F645A] hover:text-[#231B15]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Dạng Thẻ</span>
            </button>
            <button
              onClick={() => onViewModeChange('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                viewMode === 'map'
                  ? 'bg-white text-[#231B15] shadow-xs font-semibold'
                  : 'text-[#6F645A] hover:text-[#231B15]'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Bản Đồ Quận 3</span>
            </button>
          </div>
        </div>

        {/* Row 2: Street Zone Tabs */}
        <div className="space-y-1.5">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#7D6B5C]">
            Cung đường & Khu vực tại Quận 3
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {ZONE_OPTIONS.map((zone) => {
              const isActive = selectedZone === zone.id;
              return (
                <button
                  key={zone.id}
                  onClick={() => onZoneChange(zone.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all border cursor-pointer ${
                    isActive
                      ? 'bg-[#3D2518] text-white border-[#3D2518] shadow-xs'
                      : 'bg-white text-[#5C4C3E] border-[#DCD0BE] hover:border-[#A04818] hover:bg-[#F5EFEB]'
                  }`}
                  title={zone.description}
                >
                  {zone.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 3: Multi-select Amenities Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7D6B5C]">
              <span>Bộ lọc tiện ích (Chọn nhiều)</span>
              {selectedAmenities.length > 0 && (
                <span className="text-[#A04818] font-bold">
                  (Đã chọn {selectedAmenities.length} tiêu chí)
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {AMENITY_OPTIONS.map((amenity) => {
                const isSelected = selectedAmenities.includes(amenity.id);
                return (
                  <button
                    key={amenity.id}
                    onClick={() => onToggleAmenity(amenity.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#A04818] text-white border-[#A04818] shadow-xs'
                        : 'bg-white text-[#5C4C3E] border-[#DCD0BE] hover:border-[#8A7463] hover:bg-[#F5EFEB]'
                    }`}
                  >
                    {isSelected ? <Check className="w-3.5 h-3.5" /> : getAmenityIcon(amenity.icon)}
                    <span>{amenity.label}</span>
                  </button>
                );
              })}

              {isFiltered && (
                <button
                  onClick={onClearFilters}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[#8A7463] hover:text-[#A04818] transition-colors cursor-pointer ml-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Đặt lại bộ lọc</span>
                </button>
              )}
            </div>
          </div>

          {/* Results Summary Counter */}
          <div className="text-xs text-[#7D6B5C] font-medium self-end md:self-center shrink-0">
            Hiển thị <span className="font-bold text-[#231B15] tabular-nums">{totalFiltered}</span> quán cà phê phù hợp
          </div>
        </div>
      </div>
    </div>
  );
};
