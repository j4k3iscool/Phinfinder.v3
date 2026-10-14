import React from 'react';
import { X, Bookmark, Trash2, ArrowRight, Star, MapPin } from 'lucide-react';
import { Cafe } from '../types';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteCafes: Cafe[];
  onRemoveFavorite: (id: string) => void;
  onSelectCafe: (id: string) => void;
  onExplore: () => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favoriteCafes,
  onRemoveFavorite,
  onSelectCafe,
  onExplore,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E7DEC8] shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#E7DEC8] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 fill-[#A04818] text-[#A04818]" />
              <h2 className="font-serif text-lg font-bold text-[#231B15]">
                Quán Cà Phê Đã Lưu
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#FAF7F2] border border-[#E7DEC8] font-semibold text-[#A04818] tabular-nums">
                {favoriteCafes.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#8A7463] hover:text-[#231B15] rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {favoriteCafes.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#EFE9DF] text-[#A04818] flex items-center justify-center">
                  <Bookmark className="w-8 h-8 opacity-40" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#231B15]">
                    Chưa có quán nào trong danh sách
                  </h3>
                  <p className="text-xs text-[#7D6B5C] mt-1 max-w-xs leading-relaxed">
                    Nhấp vào biểu tượng dấu trang trên các thẻ quán để lưu lại những địa điểm cà phê Quận 3 bạn muốn ghé thăm.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onExplore();
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#3D2518] hover:bg-[#2B1910] rounded-xl transition-all cursor-pointer"
                >
                  Khám phá ngay
                </button>
              </div>
            ) : (
              favoriteCafes.map((cafe) => (
                <div
                  key={cafe.id}
                  className="group relative flex items-center gap-3 p-3 bg-white rounded-2xl border border-[#E7DEC8] hover:border-[#A04818]/60 transition-all shadow-2xs"
                >
                  <img
                    src={cafe.image}
                    alt={cafe.name}
                    referrerPolicy="no-referrer"
                    className="w-18 h-18 rounded-xl object-cover border border-[#E7DEC8] shrink-0 cursor-pointer"
                    onClick={() => {
                      onClose();
                      onSelectCafe(cafe.id);
                    }}
                  />
                  <div
                    className="min-w-0 flex-1 cursor-pointer"
                    onClick={() => {
                      onClose();
                      onSelectCafe(cafe.id);
                    }}
                  >
                    <h4 className="font-serif text-sm font-bold text-[#231B15] group-hover:text-[#A04818] transition-colors truncate">
                      {cafe.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-[#7D6B5C] mt-0.5">
                      <span className="flex items-center text-[#A04818] font-semibold">
                        <Star className="w-3 h-3 fill-current mr-0.5" />
                        {cafe.rating}
                      </span>
                      <span>·</span>
                      <span className="tabular-nums">{cafe.price}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-[#8A7463] mt-1 truncate">
                      <MapPin className="w-3 h-3 text-[#A04818] shrink-0" />
                      <span className="truncate">{cafe.address}</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFavorite(cafe.id);
                    }}
                    className="p-2 text-[#C5B7A5] hover:text-red-600 transition-colors cursor-pointer shrink-0"
                    title="Xóa khỏi danh sách"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {favoriteCafes.length > 0 && (
            <div className="p-4 bg-white border-t border-[#E7DEC8]">
              <div className="text-xs text-[#7D6B5C] text-center">
                Danh sách được lưu an toàn trên trình duyệt của bạn
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
