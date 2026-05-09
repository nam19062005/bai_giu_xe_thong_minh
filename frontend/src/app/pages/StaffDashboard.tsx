import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ParkingMap, { ParkingSpot } from '../components/ParkingMap';
import { useNavigate } from 'react-router';

interface VehicleEntry {
  id: string;
  vehicle: string;
  zone: string;
  spot: string;
  entryTime: Date;
  owner?: string;
  type: 'student' | 'lecturer' | 'staff' | 'guest';
}

export default function StaffDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'monitor' | 'entry' | 'exit'>('monitor');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [recentEntries] = useState<VehicleEntry[]>([
    {
      id: 'E001',
      vehicle: '59A-12345',
      zone: 'A',
      spot: 'A12',
      entryTime: new Date(Date.now() - 1800000),
      owner: 'Nguyễn Văn A',
      type: 'student',
    },
    {
      id: 'E002',
      vehicle: '51F-67890',
      zone: 'B',
      spot: 'B05',
      entryTime: new Date(Date.now() - 3600000),
      owner: 'TS. Trần Thị B',
      type: 'lecturer',
    },
    {
      id: 'E003',
      vehicle: '50G-11111',
      zone: 'C',
      spot: 'C08',
      entryTime: new Date(Date.now() - 7200000),
      type: 'guest',
    },
  ]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleEntry = () => {
    alert(`Đã đăng ký xe ${vehicleNumber} vào bãi`);
    setVehicleNumber('');
  };

  const handleExit = () => {
    if (searchQuery) {
      alert(`Xử lý xe ${searchQuery} ra bãi. Tính phí...`);
      setSearchQuery('');
    }
  };

  const handleSpotClick = (spot: ParkingSpot) => {
    setSelectedSpot(spot);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Panel Nhân viên</h1>
                <p className="text-sm text-gray-600">Quản lý bãi đỗ xe</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">{user?.name}</div>
                <div className="text-xs text-gray-500">Nhân viên vận hành</div>
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
              { id: 'monitor', label: 'Giám sát', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
              { id: 'entry', label: 'Vào bãi', icon: 'M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' },
              { id: 'exit', label: 'Ra bãi', icon: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-green-600 text-green-600'
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
        {activeTab === 'monitor' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Sơ đồ bãi đỗ xe</h2>
                <ParkingMap interactive onSpotClick={handleSpotClick} />
              </div>
            </div>

            <div className="space-y-6">
              {selectedSpot && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Chi tiết chỗ đỗ</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-gray-600">Vị trí</div>
                      <div className="text-lg font-bold text-gray-900">{selectedSpot.id}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Khu vực</div>
                      <div className="font-medium text-gray-900">Khu {selectedSpot.zone}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Trạng thái</div>
                      <div className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                        selectedSpot.occupied ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {selectedSpot.occupied ? 'Đã đỗ' : 'Trống'}
                      </div>
                    </div>
                    {selectedSpot.vehicle && (
                      <>
                        <div>
                          <div className="text-xs text-gray-600">Biển số</div>
                          <div className="font-medium text-gray-900">{selectedSpot.vehicle}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600">Thời gian vào</div>
                          <div className="text-sm text-gray-900">
                            {selectedSpot.entryTime?.toLocaleString('vi-VN')}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Xe vào gần đây</h3>
                <div className="space-y-3">
                  {recentEntries.map(entry => (
                    <div key={entry.id} className="pb-3 border-b border-gray-200 last:border-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium text-gray-900">{entry.vehicle}</div>
                        <div className={`px-2 py-0.5 text-xs font-medium rounded ${
                          entry.type === 'student' ? 'bg-blue-100 text-blue-700' :
                          entry.type === 'lecturer' ? 'bg-purple-100 text-purple-700' :
                          entry.type === 'staff' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {entry.type === 'student' ? 'SV' :
                           entry.type === 'lecturer' ? 'GV' :
                           entry.type === 'staff' ? 'CB' : 'Khách'}
                        </div>
                      </div>
                      <div className="text-xs text-gray-600">{entry.spot}</div>
                      <div className="text-xs text-gray-500">
                        {entry.entryTime.toLocaleTimeString('vi-VN')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'entry' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Đăng ký xe vào bãi</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Biển số xe
                  </label>
                  <input
                    type="text"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                    placeholder="59A-12345"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg font-medium focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={handleEntry}
                  disabled={!vehicleNumber}
                  className="w-full bg-green-600 text-white py-4 rounded-lg text-lg font-medium hover:bg-green-700 transition disabled:opacity-50"
                >
                  Xác nhận vào bãi
                </button>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-sm text-blue-700">
                    Hệ thống sẽ tự động nhận diện thẻ thành viên qua HCMUT_DATACORE.
                    Với khách vãng lai, vui lòng phát vé tạm thời.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'exit' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Xử lý xe ra bãi</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Biển số xe hoặc mã vé
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
                    placeholder="59A-12345"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg font-medium focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {searchQuery && (
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Biển số:</span>
                      <span className="font-medium text-gray-900">{searchQuery}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vị trí:</span>
                      <span className="font-medium text-gray-900">A12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Thời gian vào:</span>
                      <span className="text-gray-900">12/04/2026 08:30</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Thời lượng:</span>
                      <span className="text-gray-900">2h 15m</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-3">
                      <span className="font-medium text-gray-900">Phí gửi xe:</span>
                      <span className="text-xl font-bold text-gray-900">5,000đ</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleExit}
                  disabled={!searchQuery}
                  className="w-full bg-green-600 text-white py-4 rounded-lg text-lg font-medium hover:bg-green-700 transition disabled:opacity-50"
                >
                  Xác nhận ra bãi
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
