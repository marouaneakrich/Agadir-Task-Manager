# Agadir-Task-Manager

A mobile & backend task-management application built with **React Native** (frontend) + **Express + PostgreSQL** (backend).  
Allows users to register, log in, and manage tasks (create, view, update, delete) — with secure authentication and persistent storage.

## 🚀 Projects Structure

```
/ (root)
├── AGTM-Backend/             # Express + PostgreSQL backend
│    ├── config/
│    │     └── database.js
│    ├── middleware/     # validation, auth etc.
│    ├── routes/         # auth routes (register, login), task routes
│    └── server.js       # main backend entry point
│
└── AGTM-Frontend/            # React Native app
     ├── src/
     │    ├── screens/   # RegisterScreen, LoginScreen, Dashboard, AddTask, TaskDetails,...
     │    ├── context/   # AuthContext, TaskContext
     │    └── api/       # optional API helper 
   files
     └── App.js           # root React Native component & navigation setup
```

*(Adjust paths if your structure differs slightly.)*

## 🔐 Backend — Setup & Usage

1. **Install dependencies**

   ```bash
   cd backend
   npm install
   ```

2. **Environment variables**  
   Create a `.env` file (or set environment variables) with at least:

   ```
   PORT=3000
   DATABASE_URL=postgres://<user>:<password>@<host>:<port>/<db_name>
   JWT_SECRET=<your_jwt_secret>
   ```

3. **Run the backend**

   ```bash
   npm run dev    # or node server.js / whatever your start script is
   ```

4. **Database setup (PostgreSQL)**  
   Ensure you have a `users` table (and `tasks` table if you have tasks). Example SQL for `users`:

   ```sql
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL,
     password TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

   (Add tasks table schema depending on your implementation.)

5. **API Endpoints (as currently implemented)**

   | Method | Endpoint             | Description           |
   |--------|----------------------|-----------------------|
   | POST   | `/auth/register`     | Register new user     |
   | POST   | `/auth/login`        | Login existing user   |
   | (plus your tasks endpoints: GET/POST/PUT/DELETE `/tasks/...`) |

## 📱 Frontend — Setup & Usage

1. **Install dependencies**

   ```bash
   cd frontend
   npm install
   ```

   Ensure you have React Native, React Navigation, and optionally React Query (or you can continue using your AuthContext).

2. **API base URL configuration for React Native**

   - **Android Emulator:** use `http://10.0.2.2:3000`  
   - **iOS Simulator:** use `http://localhost:3000`  
   - **Real device:** use your computer’s LAN IP, e.g. `http://192.168.x.x:3000`

   Update your fetch / API calls accordingly (especially register / login).

3. **Run the frontend**

   ```bash
   npx expo start    # or your usual React Native start command
   ```

4. **Register & Login flow**

   - On the registration screen, user enters name, email, password + confirm password.  
   - On submit, data is POSTed to `/auth/register`. On success, user is redirected.  
   - On login, data is POSTed to `/auth/login`, server returns JWT which you store (in context or async storage).  
   - Use JWT on subsequent requests to access tasks endpoints.

## ✅ What Works / What to Watch

- Backend registration/login logic with hashed password, PostgreSQL and JWT is implemented.  
- You must ensure backend is running, DB is set up, `.env` variables defined, and network URL is correct (especially for React Native).  
- On React Native, address the “localhost vs emulator vs real device” network issue: wrong URL is the #1 cause of “works in Postman but fails in app.”  

## 🛠 Recommended Improvements (optional)

- Use a data-fetching library such as **TanStack React Query** for API calls (mutations + caching + error states).  
- Add better error handling on frontend (show backend error messages).  
- Add logout, token storage/persistence (AsyncStorage), and protected routes/screens.  
- Add a README badge, description, screenshot(s) for better repo presentation.  

## 🎯 How to Get Started (Local Development)

1. Clone repo  
2. Setup PostgreSQL DB & run migrations / create tables  
3. Start backend (`backend/`)  
4. Start frontend (`frontend/`) with correct base URL  
5. Register a new user → Login → Create tasks  

---

