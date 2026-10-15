# PhinFinder ☕ · Cẩm Nang & Bản Đồ Cà Phê Quận 3 (TP. Hồ Chí Minh)

> Nền tảng tìm kiếm, lọc tiện ích và khám phá chi tiết các quán cà phê đặc trưng tại Quận 3, TP. Hồ Chí Minh với bản đồ vị trí trực quan, ảnh chụp thực tế và chỉ đường Google Maps 1 chạm.

---

## 🌟 Tính Năng Nổi Bật

- **Tập trung 100% Quận 3**: Dữ liệu tuyển chọn phong phú từ di sản cà phê vợt Cheo Leo (1938), biệt thự cổ rợp bóng me Tú Xương (Dabao Concept, Casanova), specialty cà phê rang xay (Barista Collective), đến các quán sân vườn tối giản núp hẻm (Cafe Luia, The Seat Cafe, Kho Gạch).
- **Bộ lọc cung đường đặc trưng**: Lọc nhanh theo các trục đường cà phê nổi tiếng (*Tú Xương & Ngô Thời Nhiệm*, *Trương Định & Bà Huyện*, *Lê Văn Sỹ & Trần Quốc Thảo*, *Điện Biên Phủ & Nam Kỳ Khởi Nghĩa*).
- **Bộ lọc đa tiện ích (AND Logic)**: Chọn đồng thời nhiều tiêu chí (*Máy lạnh*, *Chỗ để xe*, *Sân vườn / Ngoài trời*, *Wifi tốc độ cao*, *Ổ cắm điện*, *Thú cưng*) để lọc ra quán thỏa mãn tất cả nhu cầu làm việc hoặc hẹn hò.
- **Bản đồ tương tác Quận 3 (Interactive Map)**: Chuyển đổi linh hoạt giữa dạng danh sách thẻ và bản đồ tọa độ GPS với các pin vị trí và xem trước nhanh thông tin quán.
- **Trang chi tiết quán & Định vị Google Maps**:
  - Tự động đồng bộ URL `?id=[cafe-id]` cho phép sao chép và chia sẻ liên kết trực tiếp.
  - Ảnh chụp thực tế của từng quán gắn liền với địa điểm trên Google Maps.
  - Nhúng Google Maps Iframe chính xác tọa độ thực tế.
  - Nút **"Định vị & Chỉ đường"** mở trực tiếp Google Maps Directions.
- **Lưu quán yêu thích**: Quản lý danh sách quán đã lưu vào `localStorage` của trình duyệt.
- **Tối ưu hóa triển khai Web Tĩnh**: Cấu hình `base: './'` tương thích 100% với **GitHub Pages**, Vercel, Netlify và máy chủ web tĩnh.

---

## 📁 Cấu Trúc Thư Mục Dự Án

```
PhinFinder/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow tự động deploy lên GitHub Pages
├── src/
│   ├── assets/
│   │   └── images/             # Toàn bộ hình ảnh thực tế của từng quán cà phê
│   ├── components/
│   │   ├── Navbar.tsx          # Thanh điều hướng (Top Bar Contract 3 phân vùng)
│   │   ├── HeroSection.tsx     # Banner giới thiệu văn hóa cà phê Quận 3
│   │   ├── FilterBar.tsx       # Tìm kiếm thời gian thực, lọc cung đường & đa tiện ích
│   │   ├── CafeCard.tsx        # Thẻ hiển thị quán (Zero-Pill, ảnh thực tế Google Maps)
│   │   ├── CafeMap.tsx         # Bản đồ vector tương tác định vị các quán Quận 3
│   │   ├── CafeDetailModal.tsx # Chi tiết quán, nhúng Google Maps, nút chỉ đường
│   │   ├── FavoritesDrawer.tsx # Ngăn kéo xem các quán đã lưu
│   │   └── SaigonCoffeeStory.tsx # Câu chuyện văn hóa cà phê & Footer
│   ├── data/
│   │   └── cafes.ts            # Dữ liệu 12 quán cà phê Quận 3 (tọa độ, ảnh, mô tả)
│   ├── types.ts                # Định nghĩa kiểu dữ liệu TypeScript (Cafe, Filters)
│   ├── App.tsx                 # Component trung tâm điều phối trạng thái & URL
│   ├── index.css               # Phong cách Tailwind CSS & Typography
│   └── main.tsx                # Entry point ứng dụng React
├── data.js                     # Dữ liệu tĩnh độc lập (phục vụ web tĩnh truyền thống)
├── index.html                  # File HTML chính với Google Fonts & SEO tags
├── package.json                # Danh sách thư viện và scripts (dev, build, lint)
├── tsconfig.json               # Cấu hình TypeScript
├── vite.config.ts              # Cấu hình Vite (base: './' cho GitHub Pages)
└── README.md                   # Hướng dẫn chi tiết
```

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Trên Máy Tính Với VS Code

### Bước 1: Chuẩn bị môi trường
- Đảm bảo máy tính đã cài đặt [Node.js](https://nodejs.org/) (khuyến nghị phiên bản LTS 18 hoặc 20 trở lên).
- Cài đặt [Visual Studio Code](https://code.visualstudio.com/) và [Git](https://git-scm.com/).

### Bước 2: Mở dự án trong VS Code
1. Mở VS Code, nhấn `File` > `Open Folder...` và chọn thư mục dự án `PhinFinder`.
2. Mở cửa sổ Terminal trong VS Code bằng phím tắt `` Ctrl + ` `` (hoặc `Terminal` > `New Terminal`).

### Bước 3: Cài đặt các thư viện cần thiết
Chạy lệnh sau trong terminal:
```bash
npm install
```

### Bước 4: Chạy thử trên máy (Local Development)
Chạy lệnh:
```bash
npm run dev
```
Terminal sẽ hiển thị đường link nội bộ, thường là:
```
  VITE v8.3.x  ready in 300 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```
Mở trình duyệt và truy cập `http://localhost:3000` để trải nghiệm ứng dụng.

---

## 🌐 Hướng Dẫn Deploy Lên GitHub & GitHub Pages

Dự án đã được tích hợp sẵn file cấu hình tự động `.github/workflows/deploy.yml` và `base: './'` trong `vite.config.ts`. Do đó, khi bạn đẩy code lên GitHub, website sẽ được tự động build và xuất bản online!

### Bước 1: Tạo Repository mới trên GitHub
1. Đăng nhập vào tài khoản [GitHub](https://github.com/).
2. Nhấp vào dấu **`+`** ở góc trên bên phải > chọn **New repository**.
3. Đặt tên repository là: `PhinFinder`.
4. Để chế độ **Public** và **KHÔNG** tích chọn "Add a README file" (vì dự án đã có sẵn).
5. Nhấp nút **Create repository**.

### Bước 2: Đẩy toàn bộ mã nguồn lên GitHub bằng VS Code
Trong cửa sổ Terminal của VS Code, chạy tuần tự các lệnh sau:

```bash
# 1. Khởi tạo Git repository nội bộ
git init

# 2. Đổi nhánh mặc định thành main
git branch -M main

# 3. Thêm tất cả tệp vào danh sách chuẩn bị commit
git add .

# 4. Tạo commit đầu tiên
git commit -m "feat: PhinFinder Quan 3 Saigon Coffee Discovery Website"

# 5. Liên kết với kho lưu trữ GitHub của bạn (thay thế YOUR_USERNAME bằng tên GitHub của bạn)
git remote add origin https://github.com/YOUR_USERNAME/PhinFinder.git

# 6. Đẩy mã nguồn lên GitHub
git push -u origin main
```

*(Nếu GitHub yêu cầu đăng nhập, hãy đăng nhập thông qua trình duyệt hoặc nhập Personal Access Token của bạn).*

### Bước 3: Kích hoạt GitHub Pages (Tự động hóa hoàn toàn)
1. Trên trình duyệt, truy cập vào repository `https://github.com/YOUR_USERNAME/PhinFinder`.
2. Chọn tab **Settings** ở thanh menu trên cùng.
3. Ở menu bên trái, nhấp chọn mục **Pages**.
4. Tại phần **Build and deployment**:
   - Ở mục **Source**: nhấp vào menu thả xuống và chọn **GitHub Actions**.
5. Nhấp vào tab **Actions** ở thanh menu trên cùng, bạn sẽ thấy workflow mang tên *"Deploy PhinFinder to GitHub Pages"* đang tự động chạy.
6. Sau khoảng 1 - 2 phút khi biểu tượng chuyển sang màu xanh lá (Success), đường link website của bạn sẽ hoạt động tại:
   ```
   https://YOUR_USERNAME.github.io/PhinFinder/
   ```

---

## ⚡ Lựa Chọn Thay Thế: Deploy Nhanh Lên Vercel Hoặc Netlify

Nếu muốn có domain tùy biến hoặc deploy chỉ với 1 cú click:

### Cách 1: Deploy lên Vercel (Khuyên dùng)
1. Đăng nhập [Vercel](https://vercel.com/) bằng tài khoản GitHub.
2. Chọn **Add New...** > **Project**.
3. Chọn kho `PhinFinder` vừa đẩy lên.
4. Bấm **Deploy**. Vercel sẽ tự nhận diện Vite và cấp domain `https://phinfinder.vercel.app` tốc độ cực cao.

### Cách 2: Deploy bản build tĩnh bằng Netlify Drop
1. Trong VS Code, chạy lệnh:
   ```bash
   npm run build
   ```
   Lệnh này sẽ tạo ra thư mục `dist/` chứa toàn bộ trang web tĩnh đã được tối ưu hóa.
2. Truy cập [app.netlify.com/drop](https://app.netlify.com/drop).
3. Kéo thả trực tiếp toàn bộ thư mục `dist/` vào khung của Netlify. Website của bạn sẽ online ngay lập tức!
