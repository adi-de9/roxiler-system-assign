# RateIt - Store Rating System

A full-stack web application that allows users to browse stores, submit ratings and reviews, and enables store owners to view their store's statistics. Admins can manage users and stores.

## 🎥 Demo Video

[![Watch the video](https://img.youtube.com/vi/sYMqlSiiDtQ/hqdefault.jpg)](https://www.youtube.com/watch?v=sYMqlSiiDtQ)

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (Vite)
- **Tailwind CSS** (Styling)
- **TanStack Query** (State Management & Data Fetching)
- **Lucide React** (Icons)
- **Axios** (API Requests)

### Backend
- **Node.js** & **Express.js**
- **PostgreSQL** (Database)
- **pg** (PostgreSQL Client)
- **JWT** (Authentication)
- **Bcrypt** (Password Hashing)

---

## 🚀 Installation & Local Setup

Follow these steps to run the project locally.

### Prerequisites
- **Node.js** (v16 or higher)
- **PostgreSQL** (installed and running)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd roxiler-system-assign
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the `backend` directory and add the following variables:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/your_database_name
JWT_SECRET=your_super_secret_key
CORS_FRONTEND_URL=http://localhost:5173
PORT=5000
```

Start the backend server:
```bash
npm run dev
```
The backend will run on `http://localhost:5000`.

### 3. Frontend Setup

Navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

(Optional) Create a `.env` file in the `frontend` directory if you want to configure the API URL:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`.

---

## 🔑 Key Features
- **User Role**: Browse stores, rate stores (1-5 stars), write reviews.
- **Owner Role**: View dashboard with total stores, average rating, and recent reviews.
- **Admin Role**: Manage users (create/view), manage stores.
- **Authentication**: Secure Signup/Login with JWT and HttpOnly cookies.
- **Responsive Design**: Built with Tailwind CSS for mobile and desktop.

---

## 📝 API Endpoints

### Auth
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### User
- `GET /api/user/stores` - Get all stores
- `POST /api/user/rate` - Rate a store

### Owner
- `GET /api/owner/owner-stats` - Get owner dashboard stats

### Admin
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users` - Create a user
- `GET /api/admin/stores` - Get all stores
- `POST /api/admin/stores` - Create a store
