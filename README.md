# Hệ thống Bãi đỗ xe Thông minh HCMUT

Ứng dụng quản lý bãi đỗ xe thông minh cho Trường Đại học Bách Khoa TP.HCM.

## Tổng quan

Hệ thống gồm:
- **Backend**: NestJS API Server (Port 3000)
- **Frontend**: React + Vite (Port 5173)
- **Database**: PostgreSQL

## Tính năng

- ✅ Đăng nhập SSO / Manual / Khách vãng lai
- ✅ Quản lý thông tin bãi đỗ xe
- ✅ Theo dõi lịch sử đỗ xe
- ✅ Quản lý thanh toán
- ✅ Cảm biến IoT tích hợp

## Yêu cầu

- Node.js 18+
- npm hoặc pnpm
- PostgreSQL 12+

## Cài đặt

### Backend

```bash
cd backend
npm install
npm run start:dev
```

Backend chạy trên: `http://localhost:3000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend chạy trên: `http://localhost:5173`

## Tài liệu

Xem [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) để biết chi tiết về API integration.

## Tài khoản Test

- **Student**: `student@hcmut.edu.vn` / `student123`
- **Lecturer**: `lecturer@hcmut.edu.vn` / `lecturer123`
- **Staff**: `staff@hcmut.edu.vn` / `staff123`
- **Admin**: `admin@hcmut.edu.vn` / `admin123`

## Cấu trúc

```
.
├── backend/          # NestJS API
├── frontend/         # React Vite App
├── INTEGRATION_GUIDE.md
├── README.md
└── .gitignore
```

## Tác giả

Đội phát triển HCMUT Parking System

## License

UNLICENSED
