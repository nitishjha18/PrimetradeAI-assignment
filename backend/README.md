# Primetrade Task API Backend

## Assignment Submission

This project was built as the Backend Developer Intern assignment for Primetrade.ai. All core requirements have been implemented:

| Requirement | Status |
|---|---|
| User registration & login with JWT | ✅ Complete |
| Password hashing with bcryptjs | ✅ Complete |
| Role-based access (USER / ADMIN) | ✅ Complete |
| CRUD APIs for Tasks entity | ✅ Complete |
| API versioning (/api/v1) | ✅ Complete |
| Input validation with Zod | ✅ Complete |
| Global error handling | ✅ Complete |
| API documentation (Swagger UI) | ✅ Complete |
| PostgreSQL database schema | ✅ Complete |
| Basic frontend UI (React.js) | ✅ Complete |
| Protected dashboard (JWT required) | ✅ Complete |
| Security hardening (Helmet, rate limiting) | ✅ Complete |
| Deployment (Railway + Vercel) | ⏳ In Progress |

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env
```

Then fill in the values in `.env`.

3. Generate Prisma client:

```bash
npx prisma generate
```

4. Run database migrations:

```bash
npx prisma migrate dev
```

5. Start the development server:

```bash
npm run dev
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── swagger.ts
│   ├── lib/
│   │   └── prisma.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── role.middleware.ts
│   │   └── error.middleware.ts
│   ├── modules/
│   │   ├── auth/
│   │   └── tasks/
│   ├── routes/
│   │   └── v1.ts
│   └── utils/
│       └── ApiResponse.ts
├── prisma/
│   └── schema.prisma
├── .env
├── .env.example
└── README.md
```

## Auth and Tasks

### Register Response Example

```json
{
  "statusCode": 200,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "clx1a2b3c4d5e6f7g8h9i0j1k2",
      "email": "user@example.com",
      "role": "USER",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  },
  "success": true
}
```

## RBAC

- USER can view, create, update, and delete only their own tasks
- ADMIN can view, create, update, and delete any task

## Security Practices

- Passwords hashed with bcryptjs (10 salt rounds) - plain text never stored
- JWT signed with secret from environment variable, never hardcoded
- Input validated with Zod before any database operation
- Rate limiting on auth routes: 20 requests per 15 minutes (prevents brute force)
- Helmet middleware adds security headers (XSS protection, clickjacking prevention)
- Generic error messages on auth failures prevent user enumeration
- Prisma ORM prevents SQL injection on all queries
- `.env` file excluded from version control via `.gitignore`

## Swagger API Documentation

Swagger UI is available at:

```bash
/api/docs
```

## Scripts

| Script | Command | Purpose |
|---|---|---|
| dev | `ts-node-dev --respawn --transpile-only src/index.ts` | Start development server |
| build | `tsc` | Compile TypeScript |
| start | `node dist/index.js` | Run production build |

Note:
- Generate Prisma client: `npx prisma generate`
- Run migrations: `npx prisma migrate dev --name init`

## Scalability Notes

- Modular architecture: each feature is a self-contained module (auth, tasks)
  making it straightforward to add new modules without touching existing code
- Single Prisma client singleton prevents connection pool exhaustion
- API versioning (/api/v1) allows breaking changes without affecting existing clients
- Rate limiting and Helmet ready for production hardening
- Structure supports Redis caching, structured logging, and Docker with minimal changes
- Horizontal scaling supported behind a load balancer
- Database connection managed via Prisma adapter pattern

## Deployment

### Backend API
TBD (Railway)

### Frontend UI
TBD (Vercel)

## Live Links

- Backend API: TBD (Railway)
- Frontend UI: TBD (Vercel)
- API Documentation: [Backend URL]/api/docs
- GitHub Repository: TBD

## Last Updated

June 2026
