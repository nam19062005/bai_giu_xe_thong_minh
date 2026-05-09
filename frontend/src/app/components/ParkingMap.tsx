import { useState, useEffect } from 'react';

export interface ParkingSpot {
  id: string;
  zone: string;
  occupied: boolean;
  vehicle?: string;
  entryTime?: Date;
}

interface ParkingMapProps {
  interactive?: boolean;
  onSpotClick?: (spot: ParkingSpot) => void;
}

const generateMockSpots = (): ParkingSpot[] => {
  const zones = ['A', 'B', 'C', 'D'];
  const spots: ParkingSpot[] = [];

  zones.forEach(zone => {
    for (let i = 1; i <= 25; i++) {
      const occupied = Math.random() > 0.4;
      spots.push({
        id: `${zone}${i.toString().padStart(2, '0')}`,
        zone,
        occupied,
        vehicle: occupied ? `${Math.floor(Math.random() * 90 + 10)}A-${Math.floor(Math.random() * 90000 + 10000)}` : undefined,
        entryTime: occupied ? new Date(Date.now() - Math.random() * 3600000 * 5) : undefined,
      });
    }
  });

  return spots;
};

export default function ParkingMap({ interactive = false, onSpotClick }: ParkingMapProps) {
  const [spots, setSpots] = useState<ParkingSpot[]>(generateMockSpots());
  const [selectedZone, setSelectedZone] = useState<string>('all');

  useEffect(() => {
    const interval = setInterval(() => {
      setSpots(prev => {
        const newSpots = [...prev];
        const randomIndex = Math.floor(Math.random() * newSpots.length);
        newSpots[randomIndex] = {
          ...newSpots[randomIndex],
          occupied: Math.random() > 0.5,
        };
        return newSpots;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const zones = ['all', 'A', 'B', 'C', 'D'];
  const filteredSpots = selectedZone === 'all'
    ? spots
    : spots.filter(s => s.zone === selectedZone);

  const occupied = filteredSpots.filter(s => s.occupied).length;
  const total = filteredSpots.length;
  const available = total - occupied;
  const occupancyRate = Math.round((occupied / total) * 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {zones.map(zone => (
            <button
              key={zone}
              onClick={() => setSelectedZone(zone)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                selectedZone === zone
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {zone === 'all' ? 'Tất cả' : `Khu ${zone}`}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-600">Trống</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-gray-600">Đã đỗ</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-700">{available}</div>
          <div className="text-sm text-green-600">Chỗ trống</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-700">{occupied}</div>
          <div className="text-sm text-red-600">Đang sử dụng</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-700">{occupancyRate}%</div>
          <div className="text-sm text-blue-600">Tỷ lệ lấp đầy</div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid grid-cols-10 gap-2">
          {filteredSpots.map(spot => (
            <button
              key={spot.id}
              onClick={() => interactive && onSpotClick && onSpotClick(spot)}
              disabled={!interactive}
              className={`
                aspect-square rounded text-xs font-medium transition
                ${spot.occupied ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}
                ${interactive ? 'hover:opacity-80 cursor-pointer' : 'cursor-default'}
              `}
              title={spot.occupied ? `${spot.id} - ${spot.vehicle}` : `${spot.id} - Trống`}
            >
              {spot.id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
