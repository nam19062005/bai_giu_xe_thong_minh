/**
 * Central export point for all API services
 * Import services from here for better organization
 */

export { default as apiClient } from "./api";
export {
  default as authService,
  type User,
  type LoginRequest,
} from "./authService";
export {
  default as parkingSpotsService,
  type ParkingSpot,
} from "./parkingSpotsService";
export {
  default as transactionsService,
  type Transaction,
} from "./transactionsService";
export {
  default as vehicleEntriesService,
  type VehicleEntry,
} from "./vehicleEntriesService";
export { default as sensorsService, type Sensor } from "./sensorsService";
