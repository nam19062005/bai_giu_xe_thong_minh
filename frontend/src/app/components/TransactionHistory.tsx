import { useState, useEffect } from 'react';

export interface Transaction {
  id: string;
  type: 'entry' | 'exit' | 'payment';
  amount?: number;
  timestamp: Date;
  vehicle?: string;
  zone?: string;
  duration?: number;
  status: 'completed' | 'pending' | 'failed';
}

interface TransactionHistoryProps {
  userId?: string;
}

const generateMockTransactions = (): Transaction[] => {
  const types: Transaction['type'][] = ['entry', 'exit', 'payment'];
  const statuses: Transaction['status'][] = ['completed', 'pending'];
  const vehicles = ['59A-12345', '51F-67890', '50G-11111'];
  const zones = ['A', 'B', 'C', 'D'];

  return Array.from({ length: 20 }, (_, i) => {
    const type = types[Math.floor(Math.random() * types.length)];
    const timestamp = new Date(Date.now() - i * 3600000 * Math.random() * 24);

    return {
      id: `TXN${(1000 + i).toString()}`,
      type,
      amount: type === 'payment' ? Math.floor(Math.random() * 20000 + 5000) : undefined,
      timestamp,
      vehicle: vehicles[Math.floor(Math.random() * vehicles.length)],
      zone: zones[Math.floor(Math.random() * zones.length)],
      duration: type === 'exit' ? Math.floor(Math.random() * 300 + 30) : undefined,
      status: statuses[Math.floor(Math.random() * statuses.length)],
    };
  }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export default function TransactionHistory({ userId }: TransactionHistoryProps) {
  const [transactions, setTransactions] = useState<Transaction[]>(generateMockTransactions());
  const [filter, setFilter] = useState<'all' | 'entry' | 'exit' | 'payment'>('all');

  const filteredTransactions = filter === 'all'
    ? transactions
    : transactions.filter(t => t.type === filter);

  const totalPaid = transactions
    .filter(t => t.type === 'payment' && t.status === 'completed')
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const formatDuration = (minutes?: number) => {
    if (!minutes) return '-';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return '-';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getTypeIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'entry':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
        );
      case 'exit':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        );
      case 'payment':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
    }
  };

  const getTypeLabel = (type: Transaction['type']) => {
    switch (type) {
      case 'entry': return 'Vào bãi';
      case 'exit': return 'Ra bãi';
      case 'payment': return 'Thanh toán';
    }
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed': return 'text-green-700 bg-green-50';
      case 'pending': return 'text-yellow-700 bg-yellow-50';
      case 'failed': return 'text-red-700 bg-red-50';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {(['all', 'entry', 'exit', 'payment'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {f === 'all' ? 'Tất cả' : getTypeLabel(f)}
            </button>
          ))}
        </div>

        <div className="text-right">
          <div className="text-sm text-gray-600">Tổng chi phí tháng này</div>
          <div className="text-xl font-bold text-gray-900">{formatCurrency(totalPaid)}</div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Mã GD</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Loại</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Biển số</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Khu</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Thời gian</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Thời lượng</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Số tiền</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map(txn => (
                <tr key={txn.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{txn.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-gray-700">
                      {getTypeIcon(txn.type)}
                      <span className="text-sm">{getTypeLabel(txn.type)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{txn.vehicle}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{txn.zone}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {txn.timestamp.toLocaleString('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{formatDuration(txn.duration)}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{formatCurrency(txn.amount)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(txn.status)}`}>
                      {txn.status === 'completed' ? 'Hoàn thành' : txn.status === 'pending' ? 'Chờ xử lý' : 'Thất bại'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
