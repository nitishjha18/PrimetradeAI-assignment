# Primetrade Task API Backend

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

## Scalability Notes
- Modular architecture: each feature is a self-contained module (auth, tasks)
  making it straightforward to add new modules without touching existing code
- Single Prisma client singleton prevents connection pool exhaustion
- API versioning (/api/v1) allows breaking changes without affecting existing clients
- Rate limiting on auth routes prevents brute force attacks
- Helmet adds security headers for production hardening
- For further scaling: add Redis caching for frequent reads, horizontal scaling 
  behind a load balancer, and migrate to microservices per module if needed
