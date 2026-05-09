/**
 * Sensors service for managing IoT sensors
 */

import apiClient from "./api";

export interface Sensor {
  id: string;
  sensor_name: string;
  location: string;
  status: "active" | "inactive" | "error";
  last_reading?: number;
  reading_time?: string;
  created_at?: string;
  updated_at?: string;
}

class SensorsService {
  /**
   * Get all sensors
   */
  async getAll(): Promise<Sensor[]> {
    const response = await apiClient.get<Sensor[]>("/sensors");
    return response;
  }

  /**
   * Get sensor by ID
   */
  async getById(id: string): Promise<Sensor> {
    const response = await apiClient.get<Sensor>(`/sensors/${id}`);
    return response;
  }

  /**
   * Create new sensor
   */
  async create(data: Partial<Sensor>): Promise<Sensor> {
    const response = await apiClient.post<Sensor>("/sensors", data);
    return response;
  }

  /**
   * Update sensor
   */
  async update(id: string, data: Partial<Sensor>): Promise<Sensor> {
    const response = await apiClient.patch<Sensor>(`/sensors/${id}`, data);
    return response;
  }

  /**
   * Delete sensor
   */
  async delete(id: string): Promise<void> {
    await apiClient.delete(`/sensors/${id}`);
  }

  /**
   * Get active sensors
   */
  async getActiveSensors(): Promise<Sensor[]> {
    const sensors = await this.getAll();
    return sensors.filter((s) => s.status === "active");
  }
}

export default new SensorsService();
