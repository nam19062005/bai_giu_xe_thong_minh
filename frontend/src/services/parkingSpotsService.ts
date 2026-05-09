/**
 * Parking spots service for managing parking spaces
 */

import apiClient from "./api";

export interface ParkingSpot {
  id: string;
  spot_number: string;
  location: string;
  is_available: boolean;
  sensor_id?: string;
  created_at?: string;
  updated_at?: string;
}

class ParkingSpotsService {
  /**
   * Get all parking spots
   */
  async getAll(): Promise<ParkingSpot[]> {
    const response = await apiClient.get<ParkingSpot[]>("/parking-spots");
    return response;
  }

  /**
   * Get parking spot by ID
   */
  async getById(id: string): Promise<ParkingSpot> {
    const response = await apiClient.get<ParkingSpot>(`/parking-spots/${id}`);
    return response;
  }

  /**
   * Create new parking spot
   */
  async create(data: Partial<ParkingSpot>): Promise<ParkingSpot> {
    const response = await apiClient.post<ParkingSpot>("/parking-spots", data);
    return response;
  }

  /**
   * Update parking spot
   */
  async update(id: string, data: Partial<ParkingSpot>): Promise<ParkingSpot> {
    const response = await apiClient.patch<ParkingSpot>(
      `/parking-spots/${id}`,
      data,
    );
    return response;
  }

  /**
   * Delete parking spot
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/parking-spots/${id}`);
  }

  /**
   * Get available spots
   */
  async getAvailable(): Promise<ParkingSpot[]> {
    const spots = await this.getAll();
    return spots.filter((spot) => spot.is_available);
  }
}

export default new ParkingSpotsService();
