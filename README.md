# Landing + Admin Full-stack App

This archive contains a ready scaffold for a landing page and admin panel.

## Quick start

### Backend
1. `cd backend`
2. `npm install`
3. Run MongoDB locally or set `MONGO_URI` environment variable.
4. `npm run seed` (optional, seeds example projects/clients)
5. `npm run dev` (requires nodemon) or `npm start`

### Frontend
1. `cd frontend`
2. `npm install`
3. Create `.env` with `VITE_API_URL=http://localhost:5000/api` (if backend runs on 5000)
4. `npm run dev`

Open the frontend in browser (Vite will show port, typically 5173). Add `#/admin` to path for admin.

Notes:
- Images are stored as base64 strings for simplicity.
- No authentication is included — add JWT/sessions for production.
