# Frontend-Backend Integration Guide

## Overview

This document explains how the frontend and backend are integrated and how to use the API services.

## Architecture

### Backend

- **Framework**: NestJS
- **Port**: 3000 (by default)
- **Database**: PostgreSQL
- **CORS**: Enabled

### Frontend

- **Framework**: React + Vite
- **API Client**: Fetch API with custom wrapper

## API Services

### 1. Authentication Service (`authService.ts`)

Handles user authentication operations.

```typescript
import { authService } from "@/services";

// Login with email and password
const user = await authService.login("student@hcmut.edu.vn", "student123");

// Login with SSO (email only)
const user = await authService.loginSSO("student@hcmut.edu.vn");

// Get user profile
const profile = await authService.getProfile(userId);

// Update profile
const updated = await authService.updateProfile(userId, { name: "New Name" });

// Register new user
const newUser = await authService.register({
  name: "John Doe",
  email: "john@hcmut.edu.vn",
  role: "student",
});
```

### 2. Parking Spots Service (`parkingSpotsService.ts`)

Manages parking space operations.

```typescript
import { parkingSpotsService } from "@/services";

// Get all parking spots
const spots = await parkingSpotsService.getAll();

// Get available spots only
const available = await parkingSpotsService.getAvailable();

// Get specific spot
const spot = await parkingSpotsService.getById(spotId);

// Create parking spot
const newSpot = await parkingSpotsService.create({
  spot_number: "A1",
  location: "Floor 1",
});

// Update spot
const updated = await parkingSpotsService.update(spotId, {
  is_available: false,
});

// Delete spot
await parkingSpotsService.delete(spotId);
```

### 3. Vehicle Entries Service (`vehicleEntriesService.ts`)

Tracks vehicle entry and exit records.

```typescript
import { vehicleEntriesService } from "@/services";

// Get all vehicle entries
const entries = await vehicleEntriesService.getAll();

// Get active entries (vehicles currently in parking)
const active = await vehicleEntriesService.getActiveEntries();

// Create entry
const entry = await vehicleEntriesService.create({
  user_id: userId,
  parking_spot_id: spotId,
  vehicle_plate: "ABC123",
  entry_time: new Date(),
});

// Update entry (mark as exited)
const updated = await vehicleEntriesService.update(entryId, {
  exit_time: new Date(),
  status: "exited",
});
```

### 4. Transactions Service (`transactionsService.ts`)

Manages parking transactions and payments.

```typescript
import { transactionsService } from "@/services";

// Get all transactions
const transactions = await transactionsService.getAll();

// Get user transactions
const userTransactions = await transactionsService.getUserTransactions(userId);

// Create transaction
const transaction = await transactionsService.create({
  user_id: userId,
  parking_spot_id: spotId,
  entry_id: entryId,
  amount: 50000,
  status: "pending",
});

// Update transaction
const updated = await transactionsService.update(transactionId, {
  status: "completed",
});
```

### 5. Sensors Service (`sensorsService.ts`)

Manages IoT sensors for parking spots.

```typescript
import { sensorsService } from "@/services";

// Get all sensors
const sensors = await sensorsService.getAll();

// Get active sensors
const active = await sensorsService.getActiveSensors();

// Create sensor
const sensor = await sensorsService.create({
  sensor_name: "Sensor A1",
  location: "Floor 1 - Zone A",
  status: "active",
});

// Update sensor reading
const updated = await sensorsService.update(sensorId, {
  last_reading: 1,
  reading_time: new Date(),
});
```

## Authentication Context

The `AuthContext` provides authentication state and methods to all components.

```typescript
import { useAuth } from '@/app/contexts/AuthContext';

function MyComponent() {
  const { user, login, loginSSO, loginGuest, logout, isLoading, error } = useAuth();

  const handleLogin = async () => {
    try {
      await login('student@hcmut.edu.vn', 'student123');
      // User is now logged in
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (user) return <div>Welcome, {user.name}!</div>;

  return <button onClick={handleLogin}>Login</button>;
}
```

## Environment Configuration

Configure the API URL and timeout in `.env` file:

```env
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=30000
```

## Error Handling

All services throw errors that can be caught:

```typescript
try {
  const user = await authService.login(email, password);
} catch (error) {
  if (error instanceof Error) {
    console.error("Login failed:", error.message);
  }
}
```

## Running the Application

### Backend

```bash
cd backend
npm install
npm run start:dev
```

Backend will start on `http://localhost:3000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will start on `http://localhost:5173` (or the port shown in terminal)

## Mock Data

The backend seeds mock users on startup if the database is empty:

- **Student**: `student@hcmut.edu.vn` / `student123`
- **Lecturer**: `lecturer@hcmut.edu.vn` / `lecturer123`
- **Staff**: `staff@hcmut.edu.vn` / `staff123`
- **Admin**: `admin@hcmut.edu.vn` / `admin123`

## Troubleshooting

### "CORS Error"

- Make sure backend is running on port 3000
- Check that `app.enableCors()` is set in `backend/src/main.ts`

### "API not responding"

- Verify API URL in `.env` is correct
- Check backend is running: `http://localhost:3000`

### "Database connection error"

- Ensure PostgreSQL is running
- Check database credentials in `.env` or backend configuration

## Common Use Cases

### Login Flow

```typescript
const { login, user, isLoading } = useAuth();

async function handleLoginSubmit(email: string, password: string) {
  try {
    await login(email, password);
    // Navigate to dashboard
  } catch (error) {
    // Show error message
  }
}
```

### Fetch Parking Spots

```typescript
import { parkingSpotsService } from "@/services";

const [spots, setSpots] = useState([]);

useEffect(() => {
  const loadSpots = async () => {
    const data = await parkingSpotsService.getAvailable();
    setSpots(data);
  };
  loadSpots();
}, []);
```

### Create Transaction

```typescript
const { user } = useAuth();
const { create } = transactionsService;

async function createParkingTransaction(spotId: string, entryId: string) {
  const transaction = await create({
    user_id: user?.id,
    parking_spot_id: spotId,
    entry_id: entryId,
    amount: 50000,
    status: "pending",
  });
  return transaction;
}
```
