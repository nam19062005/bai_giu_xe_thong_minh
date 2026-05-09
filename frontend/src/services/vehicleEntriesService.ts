/**
 * Vehicle entries service for managing vehicle entry records
 */

import apiClient from "./api";

export interface VehicleEntry {
  id: string;
  user_id: string;
  parking_spot_id: string;
  vehicle_plate: string;
  entry_time: string;
  exit_time?: string;
  duration?: number;
  status: "entered" | "exited";
  created_at?: string;
  updated_at?: string;
}

class VehicleEntriesService {
  /**
   * Get all vehicle entries
   */
  async getAll(): Promise<VehicleEntry[]> {
    const response = await apiClient.get<VehicleEntry[]>("/vehicle-entries");
    return response;
  }

  /**
   * Get vehicle entry by ID
   */
  async getById(id: string): Promise<VehicleEntry> {
    const response = await apiClient.get<VehicleEntry>(
      `/vehicle-entries/${id}`,
    );
    return response;
  }

  /**
   * Create new vehicle entry
   */
  async create(data: Partial<VehicleEntry>): Promise<VehicleEntry> {
    const response = await apiClient.post<VehicleEntry>(
      "/vehicle-entries",
      data,
    );
    return response;
  }

  /**
   * Update vehicle entry
   */
  async update(id: string, data: Partial<VehicleEntry>): Promise<VehicleEntry> {
    const response = await apiClient.patch<VehicleEntry>(
      `/vehicle-entries/${id}`,
      data,
    );
    return response;
  }

  /**
   * Delete vehicle entry
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/vehicle-entries/${id}`);
  }

  /**
   * Get active entries (not exited)
   */
  async getActiveEntries(): Promise<VehicleEntry[]> {
    const entries = await this.getAll();
    return entries.filter((entry) => entry.status === "entered");
  }
}

export default new VehicleEntriesService();
