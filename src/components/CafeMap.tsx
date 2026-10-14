import React, { useState } from 'react';
import { Coffee, MapPin, Navigation, Star, ArrowUpRight, Compass, Info, X } from 'lucide-react';
import { Cafe } from '../types';

interface CafeMapProps {
  cafes: Cafe[];
  onSelectCafe: (id: string) => void;
}

export const CafeMap: React.FC<CafeMapProps> = ({ cafes, onSelectCafe }) => {
  const [selectedPinId, setSelectedPinId] = useState<string | null>(cafes[0]?.id || null);
  const [hoveredCafeId, setHoveredCafeId] = useState<string | null>(null);

  // District 3 Coordinates bounding box for SVG projection
  // Lat: min ~10.765 (Nguyễn Thiện Thuật/Nguyễn Đình Chiểu), max ~10.792 (Lê Văn Sỹ/Kênh Nhiêu Lộc)
  // Lng: min ~10.672 (Lê Văn Sỹ/Trần Văn Đang), max ~10.698 (Phạm Ngọc Thạch/Hồ Con Rùa)
  const minLat = 10.764;
  const maxLat = 10.794;
  const minLng = 106.671;
  const maxLng = 106.699;

  // Convert GPS lat/lng to SVG percentage (0 - 100%)
  const projectCoordinates = (lat: number, lng: number) => {
    const x = ((lng - minLng) / (maxLng - minLng)) * 88 + 6; // padding 6%
    const y = ((maxLat - lat) / (maxLat - minLat)) * 84 + 8; // inverted Y
    return { x: Math.max(8, Math.min(92, x)), y: Math.max(10, Math.min(90, y)) };
  };

  const activeCafe = cafes.find((c) => c.id === selectedPinId) || cafes[0];

  return (
    <div className="relative bg-[#FAF7F2] rounded-2xl border border-[#DCD0BE] overflow-hidden shadow-sm">
      {/* Map Header Bar */}
      <div className="p-4 sm:p-5 bg-[#FAF7F2] border-b border-[#E7DEC8] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#3D2518] text-[#E6AF2E]">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-serif text-lg font-bold text-[#231B15]">
              Bản Đồ Cà Phê Quận 3 Tương Tác
            </h2>
            <p className="text-xs text-[#7D6B5C]">
              Định vị không gian các quán theo tọa độ thực tế trên các tuyến đường trung tâm Quận 3
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-[#7D6B5C]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A04818]" />
            <span>Quán cà phê ({cafes.length})</span>
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
            <span>Kênh Nhiêu Lộc</span>
          </span>
        </div>
      </div>

      {/* Main Map Canvas Area */}
      <div className="relative w-full h-[520px] sm:h-[600px] bg-[#F4EFE6] select-none overflow-hidden">
        {/* Styled Vector Map Backdrop (Stylized District 3 Streets & Landmark Canvas) */}
        <svg
          viewBox="0 0 1000 680"
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E6DDCF" strokeWidth="0.8" />
            </pattern>
          </defs>

          {/* Grid background */}
          <rect width="1000" height="680" fill="url(#grid)" />

          {/* District 3 Border Silhouette / Area Shade */}
          <path
            d="M 120 80 L 380 60 L 620 90 L 850 140 L 920 320 L 780 580 L 450 620 L 220 540 L 90 350 Z"
            fill="#ECE4D5"
            stroke="#D8CCB8"
            strokeWidth="2"
            strokeDasharray="6 4"
          />

          {/* Kênh Nhiêu Lộc - Thị Nghè (Curve on North/Northwest) */}
          <path
            d="M 60 70 Q 280 40 520 75 T 890 120"
            fill="none"
            stroke="#93C5FD"
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.85"
          />
          <text x="240" y="52" fill="#3B82F6" fontSize="13" fontWeight="600" opacity="0.85">
            KÊNH NHIÊU LỘC - THỊ NGHÈ
          </text>

          {/* Main Major Streets in District 3 */}
          {/* Nam Kỳ Khởi Nghĩa (Major cross artery) */}
          <line x1="580" y1="70" x2="720" y2="600" stroke="#DFD5C3" strokeWidth="12" strokeLinecap="round" />
          <text x="615" y="240" fill="#998875" fontSize="12" fontWeight="600" transform="rotate(75, 615, 240)">
            NAM KỲ KHỞI NGHĨA
          </text>

          {/* Điện Biên Phủ (Major diagonal boulevard) */}
          <line x1="180" y1="180" x2="880" y2="400" stroke="#DFD5C3" strokeWidth="12" strokeLinecap="round" />
          <text x="320" y="235" fill="#998875" fontSize="12" fontWeight="600" transform="rotate(18, 320, 235)">
            ĐIỆN BIÊN PHỦ
          </text>

          {/* Võ Thị Sáu */}
          <line x1="240" y1="140" x2="860" y2="330" stroke="#E3DACB" strokeWidth="8" strokeLinecap="round" />
          <text x="440" y="210" fill="#998875" fontSize="11" fontWeight="500" transform="rotate(17, 440, 210)">
            VÕ THỊ SÁU
          </text>

          {/* Nguyễn Đình Chiểu */}
          <line x1="200" y1="270" x2="820" y2="480" stroke="#E3DACB" strokeWidth="8" strokeLinecap="round" />
          <text x="380" y="340" fill="#998875" fontSize="11" fontWeight="500" transform="rotate(18, 380, 340)">
            NGUYỄN ĐÌNH CHIỂU
          </text>

          {/* Tú Xương */}
          <line x1="420" y1="210" x2="680" y2="295" stroke="#D5C7B2" strokeWidth="6" strokeLinecap="round" />
          <text x="480" y="240" fill="#7A6855" fontSize="11" fontWeight="bold">
            TÚ XƯƠNG
          </text>

          {/* Ngô Thời Nhiệm */}
          <line x1="450" y1="260" x2="710" y2="345" stroke="#D5C7B2" strokeWidth="6" strokeLinecap="round" />
          <text x="500" y="295" fill="#7A6855" fontSize="11" fontWeight="bold">
            NGÔ THỜI NHIỆM
          </text>

          {/* Trương Định */}
          <line x1="480" y1="120" x2="560" y2="520" stroke="#DFD5C3" strokeWidth="9" strokeLinecap="round" />
          <text x="525" y="440" fill="#998875" fontSize="11" fontWeight="500" transform="rotate(78, 525, 440)">
            TRƯƠNG ĐỊNH
          </text>

          {/* Lê Văn Sỹ */}
          <line x1="100" y1="150" x2="300" y2="340" stroke="#DFD5C3" strokeWidth="9" strokeLinecap="round" />
          <text x="140" y="220" fill="#998875" fontSize="11" fontWeight="500" transform="rotate(45, 140, 220)">
            LÊ VĂN SỸ
          </text>

          {/* Landmark Labels */}
          {/* Hồ Con Rùa (Eastern border) */}
          <circle cx="860" cy="380" r="14" fill="#93C5FD" stroke="#60A5FA" strokeWidth="3" opacity="0.9" />
          <text x="830" y="415" fill="#2563EB" fontSize="11" fontWeight="bold">
            Hồ Con Rùa
          </text>

          {/* Ga Sài Gòn */}
          <rect x="180" y="320" width="18" height="18" rx="3" fill="#A8A29E" />
          <text x="150" y="355" fill="#78716C" fontSize="11" fontWeight="bold">
            Ga Sài Gòn
          </text>
        </svg>

        {/* Cafe GPS Pins on Map */}
        {cafes.map((cafe) => {
          const { x, y } = projectCoordinates(cafe.lat, cafe.lng);
          const isSelected = selectedPinId === cafe.id;
          const isHovered = hoveredCafeId === cafe.id;

          return (
            <div
              key={cafe.id}
              style={{ left: `${x}%`, top: `${y}%` }}
              className="absolute -translate-x-1/2 -translate-y-full z-20 cursor-pointer transition-all duration-200"
              onClick={() => setSelectedPinId(cafe.id)}
              onMouseEnter={() => setHoveredCafeId(cafe.id)}
              onMouseLeave={() => setHoveredCafeId(null)}
            >
              {/* Tooltip on hover */}
              {(isHovered || isSelected) && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-[#231B15] text-white text-[11px] font-medium rounded-lg whitespace-nowrap shadow-md pointer-events-none flex items-center gap-1.5 z-30">
                  <span>{cafe.name}</span>
                  <span className="text-[#E6AF2E] font-bold">★ {cafe.rating}</span>
                </div>
              )}

              {/* Pin Icon */}
              <div
                className={`relative flex items-center justify-center transition-all ${
                  isSelected
                    ? 'w-10 h-10 bg-[#A04818] text-white shadow-xl scale-110 ring-4 ring-[#A04818]/25 rounded-2xl'
                    : 'w-8 h-8 bg-white text-[#3D2518] border-2 border-[#A04818] shadow-md hover:scale-110 rounded-xl'
                }`}
              >
                <Coffee className={isSelected ? 'w-5 h-5 text-amber-200' : 'w-4 h-4 text-[#A04818]'} />
                {/* Pointer tip at bottom */}
                <div
                  className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 ${
                    isSelected ? 'bg-[#A04818]' : 'bg-white border-r-2 border-b-2 border-[#A04818]'
                  }`}
                />
              </div>
            </div>
          );
        })}

        {/* Selected Cafe Floating Card at bottom */}
        {activeCafe && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-30 bg-white/95 backdrop-blur-md rounded-2xl border border-[#DCD0BE] p-4 shadow-xl">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-[#FAF7F2] border border-[#E7DEC8] text-[11px] font-semibold text-[#A04818]">
                  Quận 3
                </span>
                <span className="text-xs text-[#7D6B5C]">·</span>
                <span className="text-xs text-emerald-700 font-medium">{activeCafe.status}</span>
              </div>
              <button
                onClick={() => setSelectedPinId(null)}
                className="text-[#8A7463] hover:text-[#231B15] p-1 sm:hidden cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3 mt-2.5">
              <img
                src={activeCafe.image}
                alt={activeCafe.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-xl object-cover border border-[#E7DEC8] shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h4 className="font-serif text-base font-bold text-[#231B15] truncate">
                  {activeCafe.name}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-[#6F645A] mt-0.5">
                  <span className="font-semibold text-[#A04818]">★ {activeCafe.rating}</span>
                  <span>·</span>
                  <span className="tabular-nums">{activeCafe.price}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#7D6B5C] mt-1 truncate">
                  <MapPin className="w-3 h-3 text-[#A04818] shrink-0" />
                  <span className="truncate">{activeCafe.address}</span>
                </div>
              </div>
            </div>

            <div className="mt-3.5 pt-3 border-t border-[#F1ECE1] flex items-center gap-2">
              <button
                onClick={() => onSelectCafe(activeCafe.id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-[#3D2518] hover:bg-[#2B1910] rounded-xl transition-all cursor-pointer shadow-xs"
              >
                <span>Xem Chi Tiết Quán</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${activeCafe.lat},${activeCafe.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-[#A04818] bg-[#F9F4EC] hover:bg-[#F3EAD9] border border-[#DCD0BE] rounded-xl transition-all whitespace-nowrap cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Chỉ Đường</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
