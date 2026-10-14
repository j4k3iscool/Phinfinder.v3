import React, { useState } from 'react';
import { Star, MapPin, Bookmark, ArrowUpRight, Eye, Camera, ExternalLink } from 'lucide-react';
import { Cafe } from '../types';

interface CafeCardProps {
  cafe: Cafe;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectCafe: (id: string) => void;
}

export const CafeCard: React.FC<CafeCardProps> = ({
  cafe,
  isFavorite,
  onToggleFavorite,
  onSelectCafe,
}) => {
  const [imgError, setImgError] = useState(false);

  const googleMapsUrl =
    cafe.googleMapsPlaceUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cafe.name + ' ' + cafe.address)}`;

  return (
    <article
      onClick={() => onSelectCafe(cafe.id)}
      className="group relative flex flex-col bg-white rounded-2xl border border-[#E7DEC8] overflow-hidden hover:border-[#A04818]/60 hover:shadow-lg transition-all duration-200 cursor-pointer"
    >
      {/* Card Visual Header with Scrim */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#EFE9DF]">
        {!imgError ? (
          <img
            src={cafe.image}
            alt={`Ảnh chụp thực tế quán ${cafe.name} tại Quận 3 trên Google Maps`}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#E5DCCF] text-[#8A7463] p-4 text-center">
            <span className="font-serif text-lg font-bold text-[#3D2518]">{cafe.name}</span>
            <span className="text-xs text-[#7D6B5C] mt-1">Quận 3 · Sài Gòn</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

        {/* Top Left: Google Maps Verified Photo Indicator */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[10px] font-medium tracking-wide border border-white/10">
          <Camera className="w-3 h-3 text-[#E6AF2E]" />
          <span>Ảnh Google Maps</span>
        </div>

        {/* Top Right: Favorite Bookmark Button & Google Maps Direct Link */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/65 transition-colors cursor-pointer"
            title="Xem địa điểm và ảnh trên Google Maps"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(cafe.id);
            }}
            className="p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/65 transition-colors cursor-pointer"
            aria-label={isFavorite ? 'Bỏ lưu yêu thích' : 'Lưu vào danh sách yêu thích'}
          >
            <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-[#E6AF2E] text-[#E6AF2E]' : 'text-white'}`} />
          </button>
        </div>

        {/* Unboxed Metadata Overlay at bottom of image */}
        <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="flex items-center text-[#F6C358] font-bold">
              <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
              {cafe.rating.toFixed(1)}
            </span>
            <span className="text-white/60">·</span>
            <span className="text-white/90">({cafe.reviewCount})</span>
          </div>

          <div className="flex items-center gap-1.5 text-white/90">
            <span className="tabular-nums font-semibold">{cafe.price}</span>
            <span className="text-white/60">·</span>
            <span className={cafe.status === 'Đang mở' ? 'text-emerald-300 font-semibold' : 'text-amber-200'}>
              {cafe.status}
            </span>
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Cafe Name & Arrow */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#231B15] group-hover:text-[#A04818] transition-colors leading-snug">
              {cafe.name}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-[#8A7463] group-hover:text-[#A04818] shrink-0 mt-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>

          {/* Address Line */}
          <div className="flex items-center gap-1.5 text-xs text-[#6F645A] mt-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#A04818] shrink-0" />
            <span className="truncate">{cafe.address}</span>
          </div>

          {/* Tags as Clean Text with middle dots (Zero-Pill) */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#8A7463] mt-2.5 font-medium">
            {cafe.tags.map((tag, idx) => (
              <React.Fragment key={tag}>
                <span>{tag}</span>
                {idx < cafe.tags.length - 1 && <span className="text-[#C5B7A5]">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Footer of Card: Amenities Summary & Action */}
        <div className="pt-3 border-t border-[#F1ECE1] flex items-center justify-between text-xs text-[#7D6B5C]">
          <div className="flex items-center gap-2 truncate pr-2">
            <span className="font-medium text-[#5C4C3E]">Tiện ích:</span>
            <span className="truncate text-[#6F645A]">{cafe.amenities.slice(0, 3).join(', ')}</span>
            {cafe.amenities.length > 3 && (
              <span className="text-[#8A7463] shrink-0">+{cafe.amenities.length - 3}</span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[#8A7463] shrink-0 tabular-nums">
            <Eye className="w-3.5 h-3.5" />
            <span>{cafe.views}</span>
          </div>
        </div>
      </div>
    </article>
  );
};
