# PhinFinder - Bản Đồ Cà Phê Quận 3 (Sài Gòn)

Nền tảng tìm kiếm và khám phá các quán cà phê đặc trưng tại **Quận 3, TP. Hồ Chí Minh** - "thánh địa" cà phê với những con đường rợp bóng cây cổ thụ, biệt thự kiến trúc Pháp cổ kính và văn hóa cà phê vợt lâu đời. Ứng dụng hỗ trợ tìm kiếm thời gian thực, lọc đa tiêu chí tiện ích, bản đồ tương tác định vị chính xác và xem trang chi tiết quán với chỉ đường Google Maps.

## User Review & Critical Decisions

> [!IMPORTANT]
> **Các quyết định đã điều chỉnh theo yêu cầu:**
> - **Phạm vi địa lý độc quyền**: Toàn bộ dữ liệu quán, bản đồ và nội dung được tối ưu hóa chuyên sâu **100% dành cho Quận 3** (loại bỏ hoàn toàn Quận 1 theo yêu cầu).
> - **Phân vùng đường phố Quận 3**: Thay cho bộ lọc quận chung chung, người dùng có thể lọc nhanh theo các cung đường cà phê nức tiếng Quận 3 (Tú Xương & Ngô Thời Nhiệm, Trương Định & Bà Huyện Thanh Quan, Lê Văn Sỹ & Trần Quốc Thảo, Điện Biên Phủ & Nam Kỳ Khởi Nghĩa).
> - **Kiến trúc SPA hiện đại**: Xây dựng dưới dạng React SPA tương thích hoàn hảo với Vite, đồng bộ URL `?id=[cafe-id]` để có thể chia sẻ liên kết trực tiếp và mở trang chi tiết tức thì.
> - **Bản đồ tương tác Quận 3**: Bản đồ trực quan hiển thị vị trí các quán theo tọa độ chuẩn xác trong địa bàn Quận 3 kèm thông tin tóm tắt và chỉ đường Google Maps Directions 1 chạm.

---

## 1. Overview & Core Concept

- **Mục tiêu sản phẩm**: Trở thành cẩm nang cà phê số 1 dành riêng cho Quận 3 — nơi hội tụ từ quán cà phê vợt di sản gần 90 năm tuổi đến các quán Specialty Coffee tối giản và sân vườn biệt thự cổ.
- **Đối tượng người dùng**: Freelancer tìm quán làm việc yên tĩnh có ổ điện & wifi mạnh, bạn trẻ săn lùng không gian sân vườn chụp ảnh/hẹn hò, du khách muốn trải nghiệm văn hóa cà phê Sài Gòn đích thực.
- **Giá trị cốt lõi**:
  - Dữ liệu quán Quận 3 được chọn lọc kỹ càng, đầy đủ địa chỉ thực tế, khoảng giá, giờ mở cửa và tọa độ GPS chuẩn.
  - Lọc đa tiện ích (AND Logic): Tìm quán thỏa mãn đồng thời tất cả tiêu chí cần thiết (Máy lạnh, Chỗ để xe, Ổ cắm điện, Ngoài trời, v.v.).
  - Xem bản đồ trực quan các cụm quán tại Quận 3 và dẫn đường Google Maps không độ trễ.

---

## 2. User Experience & Visual Design

### A. Key User Flows
1. **Khám phá & Bộ lọc thông minh (Trang chủ)**:
   - Header thanh lịch mang phong vị Sài Gòn: Logo "PhinFinder · Quận 3 Coffee Guide".
   - Ô tìm kiếm thời gian thực: Tìm nhanh theo tên quán, tên đường (vd: "Tú Xương", "Trương Định"), hoặc phong cách (vd: "vintage", "vợt", "specialty", "sân vườn").
   - Bộ chọn cung đường Quận 3: "Tất cả" · "Tú Xương & Ngô Thời Nhiệm" · "Bà Huyện Thanh Quan & Trương Định" · "Lê Văn Sỹ & Trần Quốc Thảo" · "Điện Biên Phủ & Nam Kỳ Khởi Nghĩa".
   - Bộ nút chọn tiện ích đa năng: Máy lạnh, Chỗ để xe, Sân vườn / Ngoài trời, Wifi tốc độ cao, Ổ cắm điện, Thú cưng (Pet-friendly). Cho phép chọn nhiều tiện ích cùng lúc.
   - Chuyển đổi hiển thị Lưới thẻ (Grid) và Bản đồ Quận 3 (Map View).
2. **Chi tiết quán (Detail View / Modal)**:
   - Tự động đồng bộ URL `?id=[cafe-id]`.
   - Ảnh quán chất lượng cao, tên quán, điểm đánh giá, trạng thái hoạt động (Đang mở/Đang đóng), khoảng giá.
   - Nhãn phong cách và danh sách tiện ích trực quan.
   - Bài viết chia sẻ câu chuyện không gian, gu cà phê và trải nghiệm ngồi quán.
   - Google Maps Iframe vị trí thực tế tại Quận 3.
   - Các nút chức năng: "Chỉ đường Google Maps", "Lưu quán yêu thích", "Sao chép liên kết chia sẻ".
3. **Bộ sưu tập yêu thích**:
   - Lưu trữ danh sách quán yêu thích vào `localStorage`.

### B. Visual Identity & Theme (Cà phê Sài Gòn Ấm Cúng)
- **Bảng màu (60-30-10 Rule)**:
  - 60% Canvas: Nền kem giấy mộc dịu mắt (`#FAF7F2` / `#F5EFEB`).
  - 30% Bề mặt & Đường nét: Thẻ nền trắng ngà trang nhã (`#FFFFFF`), đường viền hairline ấm (`#E7DEC8`), chữ nâu đen espresso sâu lắng (`#231B15`), văn bản phụ nâu khói (`#6F645A`).
  - 10% Điểm nhấn: Màu caramen hổ phách nướng (`#B85D26` / `#A04818`) cho các nút bấm hành động, pin bản đồ và trạng thái kích hoạt.
- **Typography & Zero-Pill**:
  - Tiêu đề & Logo: Phông serif hoài cổ tao nhã, đậm nét ký ức Sài Gòn.
  - Văn bản nội dung: Phông sans-serif hiện đại, tối ưu cho mắt đọc lâu.
  - Thông tin siêu dữ liệu (khoảng giá, đánh giá, lượt xem) hiển thị dạng văn bản tự nhiên kèm dấu chấm giữa (`·`), tuyệt đối không bọc viên thuốc màu mè.

---

## 3. Key Product Decisions & Trade-Offs

- **Quyết định 1: Tập trung độc quyền 100% dữ liệu Quận 3**
  - *Lý do*: Theo yêu cầu của người dùng, việc tập trung sâu vào một quận cho phép xây dựng dữ liệu phong phú hơn, bản đồ tập trung rõ nét hơn và bộ lọc cung đường đặc trưng hơn.
- **Quyết định 2: Lọc theo Cung đường đặc trưng Quận 3 thay vì Quận**
  - *Lý do*: Người đi cà phê Quận 3 thường có thói quen chọn theo khu vực đường (như khu biệt thự Tú Xương hay khu thời trang ẩm thực Lê Văn Sỹ), giúp trải nghiệm tìm kiếm thực tế và hữu ích hơn nhiều.
- **Quyết định 3: Tích hợp Google Maps Iframe & Directions URL**
  - *Lý do*: Hiển thị bản đồ định vị chính xác và mở Google Maps dẫn đường trực tiếp trên điện thoại/máy tính mà không tốn chi phí API key.

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                      App State (Quận 3)                     │
│  - cafes: Cafe[] (100% Quận 3, data/cafes.ts)               │
│  - searchQuery: string                                      │
│  - selectedStreetZone: 'all' | 'tu-xuong' | 'truong-dinh'   │
│  - selectedAmenities: Set<string> (AND logic)               │
│  - viewMode: 'grid' | 'map'                                 │
│  - selectedCafeId: string | null (URL query ?id=...)        │
│  - favorites: Set<string> (localStorage)                    │
└──────────────────────────────┬──────────────────────────────┘
                               │
       ┌───────────────────────┴───────────────────────┐
       ▼                                               ▼
┌──────────────────────────────┐       ┌──────────────────────────────┐
│       TopBar / Header        │       │      Cafe Detail Modal       │
│ - Brand "PhinFinder Quận 3"  │       │ - Large Gallery Banner       │
│ - Navigation & Quick Stats   │       │ - Rating, Price, Status      │
│ - Favorites drawer toggle    │       │ - Tags & Amenities list      │
└──────────────────────────────┘       │ - Story & Experience         │
               │                       │ - Google Maps Iframe Embed   │
               ▼                       │ - Google Maps Directions CTA │
┌──────────────────────────────┐       └──────────────────────────────┘
│      Filter Controls         │
│ - Live Search Bar            │
│ - Street Zone Tabs           │
│ - Multi-select Amenities     │
│ - View Mode Toggle (Grid/Map)│
└──────────────┬───────────────┘
               │
       ┌───────┴───────┐
       ▼               ▼
┌──────────────┐ ┌──────────────┐
│  Card Grid   │ │ District 3   │
│  View        │ │ Map View     │
│ - 3-col Grid │ │ - GPS Pins   │
│ - Quick info │ │ - Info Card  │
└──────────────┘ └──────────────┘
```

---

## 5. Dữ Liệu Các Quán Cà Phê Tiêu Biểu Quận 3 (100% Thực Tế)

1. **Cà Phê Cheo Leo** - *109/36 Nguyễn Thiện Thuật, P.2, Q.3*
   - Di sản: Quán cà phê vợt lâu đời nhất Sài Gòn (thành lập từ năm 1938), phong cách mộc mạc hoài cổ, cà phê nấu ấm đất thơm nồng nàn.
2. **Dabao Concept - Cố Đô** - *18 Tú Xương, Võ Thị Sáu, Q.3*
   - Phong cách: Biệt thự cổ giao thoa kiến trúc cung đình Huế và hiện đại, sân vườn ngập tràn bóng râm và hoa cỏ.
3. **Ollin Cafe** - *62 Phạm Ngọc Thạch, Võ Thị Sáu, Q.3*
   - Phong cách: Thiết kế Industrial hiện đại, không gian cực kỳ thoáng đãng, nhiều cây xanh, phù hợp làm việc và hội họp.
4. **Cafe Luia** - *195/10A Điện Biên Phủ, P.15 (nay là Võ Thị Sáu), Q.3*
   - Phong cách: Tối giản kiểu Hàn Quốc, sân vườn sỏi trắng, giếng trời tự nhiên, yên tĩnh cho người đọc sách và làm việc.
5. **Little Cà Phê** - *101/1 Trương Định, Võ Thị Sáu, Q.3*
   - Phong cách: Quán nhỏ ấm cúng nép mình trong con ngõ Trương Định, ban công ngắm lá me bay, nhạc êm dịu.
6. **Mơ Đi Hội** - *Tầng 4, 145 Nguyễn Đình Chiểu, P.6, Q.3*
   - Phong cách: Căn gác ấm áp với góc nhìn trọn vẹn rặng cây cổ thụ đường Nguyễn Đình Chiểu, trà thơm và hoa tươi.
7. **Bảo Tàng Cà Phê Trung Nguyên Legend** - *204 Nguyễn Thị Minh Khai, Võ Thị Sáu, Q.3*
   - Phong cách: Không gian văn hóa cà phê năng lượng, sân vườn rợp bóng cây, menu cà phê phin và drip cao cấp.
8. **Kho Gạch Cafe** - *97 Trần Quốc Thảo, Võ Thị Sáu, Q.3*
   - Phong cách: Tường gạch thô, cây dây leo xanh ngắt, bàn gỗ vintage và không gian mở thoáng gió tự nhiên.
9. **Chanchamayo Coffee** - *6A Ngô Thời Nhiệm, Võ Thị Sáu, Q.3*
   - Phong cách: Tông màu trắng ấm và gỗ sồi, sân vườn đón nắng dịu mát trên con đường cà phê lãng mạn Ngô Thời Nhiệm.
10. **The Seat Cafe** - *491/2 Lê Văn Sỹ, P.12, Q.3*
    - Phong cách: Quán cà phê núp hẻm Lê Văn Sỹ với nhiều cây xanh nhiệt đới, góc làm việc có ổ điện riêng và bánh thủ công ngon miệng.
