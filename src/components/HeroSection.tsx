import React from 'react';
import { Compass, Sparkles, MapPin, Coffee } from 'lucide-react';
import { heroTerraceImg } from '../data/cafes';

interface HeroSectionProps {
  totalCount: number;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ totalCount, onExploreClick }) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] border-b border-[#E7DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Headline & Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A04818]">
              <Coffee className="w-3.5 h-3.5" />
              <span>Chuyên Mục Cà Phê Quận 3 · TP. Hồ Chí Minh</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#231B15] leading-[1.18] text-balance">
              Không gian cà phê lắng đọng giữa lòng Sài Gòn
            </h1>

            <p className="text-base sm:text-lg text-[#5C4C3E] leading-relaxed max-w-2xl">
              Từ tiếng reo ấm đất của quán cà phê vợt gần 90 năm tuổi tại hẻm Nguyễn Thiện Thuật,
              đến những biệt thự Pháp cổ kính rợp bóng me đường Tú Xương và quán Specialty tĩnh lặng.
              PhinFinder giúp bạn tìm đúng nơi để ngồi lại, làm việc và thưởng thức từng giọt cà phê.
            </p>

            {/* Quick Proof Metrics Row */}
            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-[#E7DEC8]/70 max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-serif text-[#231B15] tabular-nums">
                  {totalCount}+
                </div>
                <div className="text-xs text-[#7D6B5C] mt-0.5">Quán cà phê tuyển chọn</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-serif text-[#231B15] tabular-nums">
                  100%
                </div>
                <div className="text-xs text-[#7D6B5C] mt-0.5">Địa chỉ & Tọa độ thực</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-serif text-[#231B15] tabular-nums">
                  1 Chạm
                </div>
                <div className="text-xs text-[#7D6B5C] mt-0.5">Chỉ đường Google Maps</div>
              </div>
            </div>

            {/* CTA row */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#3D2518] hover:bg-[#2B1910] rounded-lg shadow-sm transition-all cursor-pointer hover:translate-y-[-1px]"
              >
                <Compass className="w-4 h-4 text-[#E6AF2E]" />
                <span>Tìm Quán Theo Nhu Cầu</span>
              </button>
              <div className="text-xs text-[#7D6B5C] flex items-center gap-2 pl-2">
                <span>·</span>
                <span>Lọc Máy Lạnh, Ổ Cắm Điện, Sân Vườn</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Saigon Cafe Photo */}
          <div className="lg:col-span-5 flex items-stretch">
            <div className="relative w-full rounded-2xl overflow-hidden border border-[#DCD0BE] shadow-md bg-[#EFE9DF] min-h-[300px] lg:min-h-[420px]">
              <img
                src={heroTerraceImg}
                alt="Quán cà phê sân vườn phong cách Sài Gòn xưa tại Quận 3"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-2 text-xs font-medium text-amber-200">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Khu Biệt Thự Cổ Tú Xương - Ngô Thời Nhiệm</span>
                </div>
                <p className="text-sm font-medium mt-1 text-white/90">
                  Nơi bóng me cổ thụ giao hòa cùng hương cà phê phin đậm vị
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
