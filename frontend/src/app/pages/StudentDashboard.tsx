import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ParkingMap from '../components/ParkingMap';
import TransactionHistory from '../components/TransactionHistory';
import { useNavigate } from 'react-router';

type Tab = 'overview' | 'parking' | 'transactions' | 'payment';

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [paymentAmount, setPaymentAmount] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handlePayment = () => {
    alert(`Đang chuyển đến BKPay để thanh toán ${paymentAmount}đ...`);
    setPaymentAmount('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Hệ thống Bãi đỗ xe HCMUT</h1>
                <p className="text-sm text-gray-600">
                  {user?.role === 'student' ? 'Sinh viên' : user?.role === 'lecturer' ? 'Giảng viên' : 'Khách'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">{user?.name}</div>
                {user?.studentId && (
                  <div className="text-xs text-gray-500">MSSV: {user.studentId}</div>
                )}
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
              { id: 'overview', label: 'Tổng quan', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
              { id: 'parking', label: 'Bãi đỗ xe', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
              { id: 'transactions', label: 'Lịch sử', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
              { id: 'payment', label: 'Thanh toán', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
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
                <div className="text-sm text-gray-600 mb-1">Số dư BKPay</div>
                <div className="text-3xl font-bold text-gray-900">
                  {user?.balance?.toLocaleString('vi-VN')}đ
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="text-sm text-gray-600 mb-1">Lượt vào tháng này</div>
                <div className="text-3xl font-bold text-gray-900">24</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="text-sm text-gray-600 mb-1">Tổng thời gian</div>
                <div className="text-3xl font-bold text-gray-900">48h</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="text-sm text-gray-600 mb-1">Chi phí tháng này</div>
                <div className="text-3xl font-bold text-gray-900">45,000đ</div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Tình trạng bãi xe hiện tại</h2>
              <ParkingMap />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-blue-900 mb-1">Thông báo thanh toán</h3>
                  <p className="text-sm text-blue-700">
                    Chu kỳ thanh toán tháng 4/2026 sẽ kết thúc vào ngày 30/04. Vui lòng thanh toán qua BKPay trước thời hạn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'parking' && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Sơ đồ bãi đỗ xe</h2>
            <ParkingMap />
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Lịch sử giao dịch</h2>
            <TransactionHistory userId={user?.id} />
          </div>
        )}

        {activeTab === 'payment' && (
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Nạp tiền BKPay</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số tiền nạp (VNĐ)
                  </label>
                  <input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder="50000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[50000, 100000, 200000].map(amount => (
                    <button
                      key={amount}
                      onClick={() => setPaymentAmount(amount.toString())}
                      className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                      {amount.toLocaleString('vi-VN')}đ
                    </button>
                  ))}
                </div>
                <button
                  onClick={handlePayment}
                  disabled={!paymentAmount}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
                >
                  Nạp tiền qua BKPay
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Bảng giá</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-700">Sinh viên (tháng)</span>
                  <span className="font-medium text-gray-900">50,000đ</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-700">Giảng viên (tháng)</span>
                  <span className="font-medium text-gray-900">Miễn phí</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-700">Khách (giờ đầu)</span>
                  <span className="font-medium text-gray-900">5,000đ</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-700">Khách (giờ tiếp theo)</span>
                  <span className="font-medium text-gray-900">3,000đ</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
