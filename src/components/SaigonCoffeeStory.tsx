import React from 'react';
import { Coffee, Trees, Sparkles, Heart } from 'lucide-react';

export const SaigonCoffeeStory: React.FC = () => {
  return (
    <section id="saigon-story" className="bg-[#FAF7F2] py-14 border-t border-[#E7DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#A04818] flex items-center gap-1.5">
            <Coffee className="w-3.5 h-3.5" />
            <span>Nét Đẹp Văn Hóa Cà Phê Quận 3</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#231B15] tracking-tight">
            Nơi thời gian ngưng đọng bên ly cà phê nguyên bản
          </h2>
          <p className="text-sm sm:text-base text-[#5C4C3E] leading-relaxed">
            Nếu Quận 1 là sự sầm uất với các tòa tháp kính thì Quận 3 lại là chốn dừng chân bình yên
            với những rặng cây cổ thụ cả trăm năm tuổi, những căn biệt thự Pháp cổ kính núp mình
            dưới tán lá xanh và nhịp sống đậm đà phong vị Sài Gòn xưa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#E7DEC8] space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#F5EFEB] text-[#A04818] flex items-center justify-center">
              <Coffee className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#231B15]">
              Cà Phê Vợt Di Sản
            </h3>
            <p className="text-xs sm:text-sm text-[#6F645A] leading-relaxed">
              Chiếc vợt vải sẫm màu, chiếc siêu đất nung trên bếp than hồng tại hẻm Nguyễn Thiện Thuật
              đã đỏ lửa gần 90 năm, gìn giữ trọn vẹn hương vị cà phê mộc mạc của người Sài Gòn xưa.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E7DEC8] space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#F5EFEB] text-[#A04818] flex items-center justify-center">
              <Trees className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#231B15]">
              Khu Biệt Thự & Bóng Me
            </h3>
            <p className="text-xs sm:text-sm text-[#6F645A] leading-relaxed">
              Những cung đường Tú Xương, Ngô Thời Nhiệm, Trương Định với vỉa hè rộng rợp bóng me bay,
              nơi các quán cà phê sân vườn mở ra khoảng trời tĩnh tại, đón trọn ánh nắng ban mai.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E7DEC8] space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-[#F5EFEB] text-[#A04818] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#231B15]">
              Specialty & Không Gian Làm Việc
            </h3>
            <p className="text-xs sm:text-sm text-[#6F645A] leading-relaxed">
              Quận 3 cũng là nơi hội tụ các barista tài năng với những mẻ rang thủ công tuyển chọn,
              không gian trang bị wifi tốc độ cao và ổ cắm điện đầy đủ phục vụ người làm việc sáng tạo.
            </p>
          </div>
        </div>

        {/* Quiet Clean Footer */}
        <div className="pt-8 border-t border-[#E7DEC8] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7463]">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-[#3D2518]">PhinFinder</span>
            <span>·</span>
            <span>Cẩm nang khám phá cà phê Quận 3, TP. Hồ Chí Minh</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Dữ liệu mở & Tọa độ thực tế</span>
            <span>·</span>
            <span className="flex items-center gap-1 text-[#A04818]">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>for Saigon Coffee Lovers</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
