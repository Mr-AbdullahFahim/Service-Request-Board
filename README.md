# Service Request Board

A stripped-down full-stack web application where a homeowner can post a service request (e.g., "Need a plumber for a leaking kitchen tap in Glasgow") and tradespeople can browse open requests, view details, and mark them as in progress or closed. Built with Next.js for the frontend and Node.js, Express, and MongoDB for the backend. Features JWT authentication, keyword search, status filtering, and more.

## Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB instance (local or Atlas)

## Setup Instructions

1. **Clone the repository** (if not already done).
2. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```
3. **Install Frontend Dependencies:**
   ```bash
   cd frontend
   npm install
   ```

## Required Environment Variables

You need to create `.env` files in both the `backend` and `frontend` directories.

### Backend (`backend/.env`)

Create a `.env` file in the `backend` folder with the following variables:

```env
# Server configuration (5001 will be used as a fallback if not provided)
PORT=5000

# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/service-requests # Replace with your MongoDB URI

# JWT Secret for authentication
JWT_SECRET=your_super_secret_jwt_key
```

### Frontend Configuration

The frontend does not require an `.env` file by default. The `BACKEND_URL` is configured directly inside `frontend/next.config.ts` using Next.js `env` properties and API rewrites.

If you change the backend port, be sure to update the `BACKEND_URL` constant inside `next.config.ts`.

## Data Seeding

To populate the database with sample service request data, you can run the included seeding script. This will clear any existing job requests and add 5 sample records.

1. Open a terminal and navigate to the `backend` directory.
2. Run the seed command:
   ```bash
   npm run seed
   ```

## Run Instructions

You will need two terminal windows to run both the frontend and backend simultaneously.

### Running the Backend

1. Open a terminal and navigate to the `backend` directory.
2. Start the development server:
   ```bash
   npm run dev
   ```
   The backend will start running on `http://localhost:5000` (or `http://localhost:5001` as a fallback if the PORT environment variable is not set).

### Running the Frontend

1. Open a new terminal and navigate to the `frontend` directory.
2. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   The frontend will start running on `http://localhost:3000`.
3. Open your browser and navigate to `http://localhost:3000`.

## Features

- **JWT Authentication**: Secure user registration and login.
- **Access Control**: Only authenticated users can create, update, or delete requests. Public users can only view.
- **Advanced Filtering**: Filter requests by Category and Status.
- **Search**: Keyword search across titles and descriptions.
- **Modern UI**: Built with Shadcn UI, Tailwind CSS, and Lucide Icons.
