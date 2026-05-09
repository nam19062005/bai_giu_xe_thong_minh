import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ParkingMap from '../components/ParkingMap';
import TransactionHistory from '../components/TransactionHistory';
import { useNavigate } from 'react-router';

type Tab = 'overview' | 'users' | 'sensors' | 'pricing' | 'reports';

interface Sensor {
  id: string;
  zone: string;
  spot: string;
  status: 'online' | 'offline' | 'error';
  lastUpdate: Date;
  battery: number;
}

const mockSensors: Sensor[] = Array.from({ length: 20 }, (_, i) => ({
  id: `SNS${(1000 + i).toString()}`,
  zone: ['A', 'B', 'C', 'D'][i % 4],
  spot: `${['A', 'B', 'C', 'D'][i % 4]}${(i + 1).toString().padStart(2, '0')}`,
  status: Math.random() > 0.9 ? 'offline' : Math.random() > 0.05 ? 'online' : 'error',
  lastUpdate: new Date(Date.now() - Math.random() * 3600000),
  battery: Math.floor(Math.random() * 100),
}));

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [sensors] = useState<Sensor[]>(mockSensors);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const onlineSensors = sensors.filter(s => s.status === 'online').length;
  const offlineSensors = sensors.filter(s => s.status === 'offline').length;
  const errorSensors = sensors.filter(s => s.status === 'error').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Panel Quản trị</h1>
                <p className="text-sm text-gray-600">Quản lý hệ thống bãi đỗ xe</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">{user?.name}</div>
                <div className="text-xs text-gray-500">Quản trị viên</div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            {[
              { id: 'overview', label: 'Tổng quan', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
              { id: 'users', label: 'Người dùng', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
              { id: 'sensors', label: 'Cảm biến IoT', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
              { id: 'pricing', label: 'Bảng giá', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
              { id: 'reports', label: 'Báo cáo', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="text-sm text-gray-600 mb-1">Tổng số chỗ đỗ</div>
                <div className="text-3xl font-bold text-gray-900">100</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="text-sm text-gray-600 mb-1">Đang sử dụng</div>
                <div className="text-3xl font-bold text-gray-900">68</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="text-sm text-gray-600 mb-1">Doanh thu tháng</div>
                <div className="text-3xl font-bold text-gray-900">12.5M</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="text-sm text-gray-600 mb-1">Cảm biến online</div>
                <div className="text-3xl font-bold text-gray-900">{onlineSensors}</div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Tình trạng bãi xe</h2>
              <ParkingMap />
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Giao dịch gần đây</h2>
              <TransactionHistory />
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white border border-gray-200 rounded-lg">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Quản lý người dùng</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Tên</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Vai trò</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Số dư</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Trạng thái</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { name: 'Nguyễn Văn A', email: 'student@hcmut.edu.vn', role: 'Sinh viên', balance: '150,000đ', status: 'active' },
                    { name: 'TS. Trần Thị B', email: 'lecturer@hcmut.edu.vn', role: 'Giảng viên', balance: '-', status: 'active' },
                    { name: 'Lê Văn C', email: 'staff@hcmut.edu.vn', role: 'Nhân viên', balance: '-', status: 'active' },
                  ].map((u, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{u.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{u.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{u.role}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{u.balance}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-700">
                          Hoạt động
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-sm text-blue-600 hover:text-blue-700">Chi tiết</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'sensors' && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{onlineSensors}</div>
                    <div className="text-sm text-gray-600">Online</div>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{offlineSensors}</div>
                    <div className="text-sm text-gray-600">Offline</div>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{errorSensors}</div>
                    <div className="text-sm text-gray-600">Lỗi</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Danh sách cảm biến</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Mã cảm biến</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Vị trí</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Trạng thái</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Pin</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Cập nhật</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sensors.map(sensor => (
                      <tr key={sensor.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{sensor.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{sensor.spot}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded ${
                            sensor.status === 'online' ? 'bg-green-100 text-green-700' :
                            sensor.status === 'offline' ? 'bg-gray-100 text-gray-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {sensor.status === 'online' ? 'Online' : sensor.status === 'offline' ? 'Offline' : 'Lỗi'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  sensor.battery > 50 ? 'bg-green-500' :
                                  sensor.battery > 20 ? 'bg-yellow-500' :
                                  'bg-red-500'
                                }`}
                                style={{ width: `${sensor.battery}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-600">{sensor.battery}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {sensor.lastUpdate.toLocaleTimeString('vi-VN')}
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-sm text-blue-600 hover:text-blue-700">Kiểm tra</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="max-w-3xl">
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Cấu hình bảng giá</h2>
              </div>
              <div className="p-6 space-y-6">
                {[
                  { label: 'Sinh viên (tháng)', value: '50000', editable: true },
                  { label: 'Học viên cao học (tháng)', value: '80000', editable: true },
                  { label: 'Giảng viên (tháng)', value: '0', editable: true },
                  { label: 'Cán bộ - Nhân viên (tháng)', value: '100000', editable: true },
                  { label: 'Khách - Giờ đầu tiên', value: '5000', editable: true },
                  { label: 'Khách - Giờ tiếp theo', value: '3000', editable: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">{item.label}</label>
                    <div className="flex items-center gap-4">
                      <input
                        type="number"
                        defaultValue={item.value}
                        className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-right"
                        disabled={!item.editable}
                      />
                      <span className="text-gray-600">VNĐ</span>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t border-gray-200">
                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition">
                    Lưu thay đổi
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Thống kê theo tháng</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tổng lượt vào:</span>
                    <span className="font-medium text-gray-900">2,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Doanh thu:</span>
                    <span className="font-medium text-gray-900">12,450,000đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thời gian trung bình:</span>
                    <span className="font-medium text-gray-900">3h 24m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tỷ lệ lấp đầy:</span>
                    <span className="font-medium text-gray-900">68%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Xuất báo cáo</h3>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                    Báo cáo tháng (PDF)
                  </button>
                  <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                    Dữ liệu giao dịch (CSV)
                  </button>
                  <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                    Báo cáo cảm biến (Excel)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
