# server — Mugen-Train Backend

Quick notes for the backend API (Node + Express).

## Setup

1. Install dependencies

```bash
cd server
npm install
```

2. Create a `.env` file with required variables:

```
PORT=5000
MONGO_URI=<your-mongo-uri>
JWT_SECRET=<your-jwt-secret>
```

3. Run in development

```bash
npm run dev
```

4. Production

```bash
npm start
```

## Notes

- Dev script uses `nodemon`.
- Inspect controllers in `server/controllers/` for endpoints and request/response shapes.

---
File maintained as part of the main project. If you need Docker or test coverage, open an issue or PR.
