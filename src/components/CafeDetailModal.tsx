import React, { useState, useEffect } from 'react';
import {
  X,
  Star,
  MapPin,
  Clock,
  Bookmark,
  Share2,
  Navigation,
  Check,
  CheckCircle2,
  Coffee,
  Camera,
  ExternalLink,
  Map,
} from 'lucide-react';
import { Cafe } from '../types';

interface CafeDetailModalProps {
  cafe: Cafe;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const CafeDetailModal: React.FC<CafeDetailModalProps> = ({
  cafe,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  const [copied, setCopied] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?id=${cafe.id}`;
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // Fallback
      }
    }
  };

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${cafe.lat},${cafe.lng}`;
  const googleMapsPlaceUrl =
    cafe.googleMapsPlaceUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cafe.name + ' ' + cafe.address)}`;
  const mapEmbedUrl =
    cafe.googleMapsEmbedUrl ||
    `https://maps.google.com/maps?q=${cafe.lat},${cafe.lng}&hl=vi&z=17&output=embed`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="fixed inset-0 -z-10" onClick={onClose} aria-hidden="true" />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl border border-[#DCD0BE] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Floating Control Bar */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <a
            href={googleMapsPlaceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-white/90 backdrop-blur-md text-[#231B15] hover:bg-white shadow-md transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            title="Mở Google Maps của quán"
          >
            <Camera className="w-4 h-4 text-[#A04818]" />
            <span className="hidden sm:inline">Ảnh Google Maps</span>
            <ExternalLink className="w-3 h-3 text-[#7D6B5C]" />
          </a>

          <button
            onClick={handleShare}
            className="p-2.5 rounded-full bg-white/90 backdrop-blur-md text-[#231B15] hover:bg-white shadow-md transition-all cursor-pointer"
            title="Sao chép liên kết quán"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => onToggleFavorite(cafe.id)}
            className="p-2.5 rounded-full bg-white/90 backdrop-blur-md text-[#231B15] hover:bg-white shadow-md transition-all cursor-pointer"
            title={isFavorite ? 'Bỏ lưu yêu thích' : 'Lưu vào danh sách'}
          >
            <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-[#A04818] text-[#A04818]' : 'text-[#231B15]'}`} />
          </button>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/90 backdrop-blur-md text-[#231B15] hover:bg-white shadow-md transition-all cursor-pointer"
            title="Đóng cửa sổ"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          {/* Hero Image Section */}
          <div className="relative h-72 sm:h-84 md:h-96 w-full bg-[#EFE9DF]">
            <img
              src={cafe.image}
              alt={`Ảnh thực tế ${cafe.name} trên Google Maps`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

            {/* Top Left Verified Badge */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium border border-white/15">
              <Camera className="w-3.5 h-3.5 text-[#E6AF2E]" />
              <span>Ảnh thực tế chuẩn xác địa điểm</span>
            </div>

            {/* Bottom Scrim Header Info */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-white/90">
                <span className="font-semibold text-amber-300">Quận 3 · Sài Gòn</span>
                <span>·</span>
                <span className="flex items-center text-[#F6C358] font-bold">
                  <Star className="w-3.5 h-3.5 fill-current mr-1" />
                  {cafe.rating.toFixed(1)} ({cafe.reviewCount} đánh giá)
                </span>
                <span>·</span>
                <span className={cafe.status === 'Đang mở' ? 'text-emerald-300 font-semibold' : 'text-amber-200'}>
                  {cafe.status}
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
                {cafe.name}
              </h1>

              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-white/85">
                <MapPin className="w-4 h-4 text-amber-300 shrink-0" />
                <span>{cafe.address}</span>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-8 bg-[#FAF7F2]">
            {/* Quick Summary Pill-Free Spec Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white border border-[#E7DEC8]">
              <div>
                <div className="text-xs text-[#7D6B5C]">Khoảng giá</div>
                <div className="text-sm font-semibold text-[#231B15] mt-0.5 tabular-nums">{cafe.price}</div>
              </div>
              <div>
                <div className="text-xs text-[#7D6B5C]">Giờ mở cửa</div>
                <div className="text-sm font-semibold text-[#231B15] mt-0.5">{cafe.openingHours}</div>
              </div>
              <div>
                <div className="text-xs text-[#7D6B5C]">Lượt xem</div>
                <div className="text-sm font-semibold text-[#231B15] mt-0.5 tabular-nums">{cafe.views}</div>
              </div>
              <div>
                <div className="text-xs text-[#7D6B5C]">Liên hệ</div>
                <div className="text-sm font-semibold text-[#A04818] mt-0.5">{cafe.phone || 'Đang cập nhật'}</div>
              </div>
            </div>

            {/* Google Maps Real Photos Banner Action */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#F5EFEB] border border-[#DCD0BE]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#3D2518] text-[#E6AF2E] flex items-center justify-center shrink-0">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#231B15]">
                    Hình ảnh thực tế từ khách hàng & chủ quán
                  </h3>
                  <p className="text-xs text-[#6F645A]">
                    Xem hàng trăm góc chụp không gian, quầy pha chế và món nước mới nhất trên Google Maps
                  </p>
                </div>
              </div>

              <a
                href={googleMapsPlaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#3D2518] hover:bg-[#231B15] rounded-xl transition-all whitespace-nowrap cursor-pointer shadow-xs"
              >
                <span>Mở ảnh Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#E6AF2E]" />
              </a>
            </div>

            {/* Tags & Phong Cách */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#7D6B5C] mb-2.5">
                Phong cách & Loại hình
              </h2>
              <div className="flex flex-wrap items-center gap-2">
                {cafe.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium bg-white text-[#3D2518] border border-[#DCD0BE] rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Amenities Grid */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#7D6B5C] mb-2.5">
                Tiện ích sẵn có tại quán
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {cafe.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-[#E7DEC8] text-xs font-medium text-[#3D2518]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#A04818] shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Space & Experience Story */}
            <div className="space-y-3">
              <h2 className="font-serif text-xl font-bold text-[#231B15]">
                Không Gian & Trải Nghiệm
              </h2>
              <p className="text-sm sm:text-base text-[#5C4C3E] leading-relaxed">
                {cafe.description}
              </p>
            </div>

            {/* Google Maps Interactive Iframe Embed */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-bold text-[#231B15] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#A04818]" />
                  <span>Vị Trí Google Maps</span>
                </h2>
                <span className="text-xs text-[#7D6B5C]">
                  Tọa độ: {cafe.lat.toFixed(5)}, {cafe.lng.toFixed(5)}
                </span>
              </div>

              {/* Embedded Map Container */}
              <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-[#DCD0BE] shadow-xs bg-[#EFE9DF]">
                <iframe
                  title={`Bản đồ vị trí ${cafe.name}`}
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#E7DEC8] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#7D6B5C]">
            <Coffee className="w-4 h-4 text-[#A04818]" />
            <span>PhinFinder · Dữ liệu chuẩn xác vị trí & hình ảnh thực tế Quận 3</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="px-4 py-2.5 text-xs font-semibold text-[#3D2518] bg-[#F5EFEB] hover:bg-[#EBE2D4] rounded-xl transition-all cursor-pointer"
            >
              {copied ? 'Đã sao chép liên kết!' : 'Chia sẻ quán'}
            </button>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#A04818] hover:bg-[#883B11] rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>Định vị & Chỉ đường Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
