# Primetrade Task API

> A full-stack task management application with JWT authentication and role-based access control.  
> Built as an internship assignment for [Primetrade.ai](https://primetrade.ai)

[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-5.2-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-7.8-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/JWT-Bearer-FF6B6B?logo=json-web-tokens&logoColor=white)](https://jwt.io/)

## Overview

Primetrade Task API is a modern backend service for task management built with **Node.js**, **Express 5**, and **TypeScript**. It provides a secure, RESTful API with JWT-based authentication, role-based access control, and comprehensive API documentation via Swagger/OpenAPI 3.0.

The project demonstrates best practices including:
- Clean architecture with modular MVC structure
- Type-safe database operations with Prisma ORM
- Request validation using Zod schemas
- Centralized error handling
- Security-first authentication approach
- OpenAPI 3.0 documentation

## ✨ Features

- **User Authentication**
  - User registration with email and password
  - Secure JWT-based login
  - Password hashing with bcryptjs (10 salt rounds)
  - Automatic token expiration (7 days)

- **Task Management**
  - Create, read, update, and delete tasks
  - Task status tracking (PENDING, IN_PROGRESS, COMPLETED)
  - Optional task descriptions
  - Timestamps for creation and updates

- **Authorization & Access Control**
  - Role-based access control (USER, ADMIN)
  - Users can only access their own tasks
  - Admins have full visibility and control over all tasks
  - Fine-grained permission checks at service layer

- **API Documentation**
  - Interactive Swagger UI at `/api/docs`
  - OpenAPI 3.0 specification
  - Auto-generated from JSDoc annotations
  - Full request/response examples

- **Production-Ready**
  - Centralized error handling middleware
  - Input validation on all routes
  - Database adapter pattern for connection pooling
  - Graceful shutdown handling
  - CORS enabled

## 🛠 Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Runtime** | Node.js | 20+ | JavaScript runtime |
| **Language** | TypeScript | 6.0 | Type-safe development |
| **Web Framework** | Express.js | 5.2 | HTTP server & routing |
| **Database** | PostgreSQL | 14+ | Relational database |
| **ORM** | Prisma | 7.8 | Type-safe database client |
| **DB Adapter** | @prisma/adapter-pg | 7.8 | PostgreSQL adapter for Prisma 7 |
| **Authentication** | JWT | - | Token-based auth |
| **Password Hashing** | bcryptjs | 3.0 | Secure password storage |
| **Validation** | Zod | 4.4 | Schema validation |
| **Documentation** | Swagger/OpenAPI | 3.0 | Interactive API docs |
| **CORS** | cors | 2.8 | Cross-origin resource sharing |
| **Environment** | dotenv | 17.4 | Environment variable management |

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── swagger.ts                 # Swagger/OpenAPI 3.0 configuration
│   ├── lib/
│   │   └── prisma.ts                  # Shared Prisma client singleton
│   ├── middlewares/
│   │   ├── auth.middleware.ts         # JWT verification & token extraction
│   │   ├── rbac.middleware.ts         # Role-based access control
│   │   └── error.middleware.ts        # Global error handling
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.routes.ts         # Auth endpoint definitions
│   │   │   ├── auth.controller.ts     # Auth request handlers
│   │   │   └── auth.service.ts        # Auth business logic
│   │   └── tasks/
│   │       ├── tasks.routes.ts        # Task endpoint definitions
│   │       ├── tasks.controller.ts    # Task request handlers
│   │       └── tasks.service.ts       # Task business logic
│   ├── utils/
│   │   └── ApiResponse.ts             # Standardized API response class
│   ├── routes/
│   │   └── v1.ts                      # API v1 router
│   └── index.ts                       # Application entry point
├── prisma/
│   ├── schema.prisma                  # Database schema definition
│   └── migrations/                    # Database migrations
├── prisma.config.ts                   # Prisma configuration
├── .env                               # Environment variables (local)
├── .env.example                       # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json                      # TypeScript configuration
└── README.md
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v20 or higher ([Download](https://nodejs.org/))
- **npm** or **yarn**: Package manager
- **PostgreSQL**: v14 or higher (or Supabase PostgreSQL instance)
- **Git**: Version control ([Download](https://git-scm.com/))

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/primetrade/primetrade-task-api.git
cd primetrade-task-api/backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file and update it with your credentials:

```bash
cp .env.example .env
```

Then edit `.env` with your values:

```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
JWT_SECRET="your-super-secret-key-min-32-chars-recommended"
JWT_EXPIRES_IN="7d"
PORT=3000
```

### 4. Generate Prisma Client

```bash
npm run prisma:generate
```

### 5. Run Database Migrations

```bash
npm run prisma:migrate
```

This will create all tables in your database based on the Prisma schema.

### 6. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`

**Access the API Documentation:**
- Swagger UI: `http://localhost:3000/api/docs`

## ⚙️ Environment Variables

| Variable | Default | Required | Description |
|----------|---------|----------|-------------|
| `DATABASE_URL` | - | ✅ Yes | PostgreSQL connection string (Supabase or self-hosted) |
| `JWT_SECRET` | - | ✅ Yes | Secret key for signing JWT tokens (min 32 chars recommended) |
| `JWT_EXPIRES_IN` | `7d` | ⚠️ Optional | JWT token expiration (e.g., `7d`, `24h`, `30000` milliseconds) |
| `PORT` | `3000` | ⚠️ Optional | Server port for Express to listen on |
| `NODE_ENV` | `development` | ⚠️ Optional | Environment mode (development, production, test) |

### Example `.env` File

```env
# Database
DATABASE_URL="postgresql://username:password@host:5432/primetrade_dev"

# JWT Configuration
JWT_SECRET="your-256-bit-secret-key-for-jwt-signing-min-32-chars"
JWT_EXPIRES_IN="7d"

# Server
PORT=3000
NODE_ENV="development"
```

## 📡 API Documentation

### Base URL

```
http://localhost:3000/api/v1
```

### Endpoints Overview

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/auth/register` | Public | Register new user with email & password |
| `POST` | `/auth/login` | Public | Login user and receive JWT token |
| `GET` | `/tasks` | Protected | Get all tasks (Users: own only, Admins: all) |
| `POST` | `/tasks` | Protected | Create new task |
| `PUT` | `/tasks/:id` | Protected | Update task (owner or admin only) |
| `DELETE` | `/tasks/:id` | Protected | Delete task (owner or admin only) |

### Detailed Endpoint Documentation

#### Register User

**Request:**
```http
POST /auth/register HTTP/1.1
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "role": "USER"
}
```

**Response (201 Created):**
```json
{
  "statusCode": 201,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "cl95qk5z00000l108j1h5e8q0",
      "email": "user@example.com",
      "role": "USER",
      "createdAt": "2024-06-09T16:30:00Z"
    }
  },
  "success": true
}
```

#### Login User

**Request:**
```http
POST /auth/login HTTP/1.1
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "cl95qk5z00000l108j1h5e8q0",
      "email": "user@example.com",
      "role": "USER",
      "createdAt": "2024-06-09T16:30:00Z"
    }
  },
  "success": true
}
```

#### Get All Tasks

**Request:**
```http
GET /tasks HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "message": "Tasks retrieved successfully",
  "data": [
    {
      "id": "cl95qk5z00001l108j1h5e8q0",
      "title": "Complete project",
      "description": "Finish the Primetrade API",
      "status": "IN_PROGRESS",
      "userId": "cl95qk5z00000l108j1h5e8q0",
      "createdAt": "2024-06-08T10:00:00Z",
      "updatedAt": "2024-06-09T15:30:00Z"
    }
  ],
  "success": true
}
```

#### Create Task

**Request:**
```http
POST /tasks HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "title": "Review code",
  "description": "Code review for PR #42",
  "status": "PENDING"
}
```

**Response (201 Created):**
```json
{
  "statusCode": 201,
  "message": "Task created successfully",
  "data": {
    "id": "cl95qk5z00002l108j1h5e8q0",
    "title": "Review code",
    "description": "Code review for PR #42",
    "status": "PENDING",
    "userId": "cl95qk5z00000l108j1h5e8q0",
    "createdAt": "2024-06-09T16:45:00Z",
    "updatedAt": "2024-06-09T16:45:00Z"
  },
  "success": true
}
```

#### Update Task

**Request:**
```http
PUT /tasks/cl95qk5z00002l108j1h5e8q0 HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "status": "IN_PROGRESS"
}
```

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "message": "Task updated successfully",
  "data": {
    "id": "cl95qk5z00002l108j1h5e8q0",
    "title": "Review code",
    "description": "Code review for PR #42",
    "status": "IN_PROGRESS",
    "userId": "cl95qk5z00000l108j1h5e8q0",
    "createdAt": "2024-06-09T16:45:00Z",
    "updatedAt": "2024-06-09T17:00:00Z"
  },
  "success": true
}
```

#### Delete Task

**Request:**
```http
DELETE /tasks/cl95qk5z00002l108j1h5e8q0 HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "message": "Task deleted successfully",
  "data": null,
  "success": true
}
```

## 🔐 Authentication Guide

### How Authentication Works

1. **Registration**: User creates account with email and password
2. **Password Hashing**: Password is hashed with bcryptjs (10 salt rounds) before storage
3. **Login**: User receives JWT token upon successful authentication
4. **Token Storage**: Client stores token (typically in secure httpOnly cookie or localStorage)
5. **Authorization**: Client includes token in `Authorization` header for protected requests
6. **Verification**: Server verifies token signature and expiration on each protected request

### Getting Started with Authentication

#### Step 1: Register a New Account

```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "MySecurePassword123!",
    "role": "USER"
  }'
```

**Response:**
```json
{
  "statusCode": 201,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbDk1cWs1ejAwMDAwbDEwOGoxaDVlOHEwIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3MTc5NDI4MDAsImV4cCI6MTcxODU0NzYwMH0.xyz123",
    "user": {
      "id": "cl95qk5z00000l108j1h5e8q0",
      "email": "john@example.com",
      "role": "USER"
    }
  },
  "success": true
}
```

#### Step 2: Login with Existing Credentials

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "MySecurePassword123!"
  }'
```

#### Step 3: Use Token for Protected Routes

Save the `token` from the response and use it in subsequent requests:

```bash
curl -X GET http://localhost:3000/api/v1/tasks \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbDk1cWs1ejAwMDAwbDEwOGoxaDVlOHEwIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3MTc5NDI4MDAsImV4cCI6MTcxODU0NzYwMH0.xyz123"
```

### Token Structure

JWT tokens are composed of three parts: **Header.Payload.Signature**

**Payload Example:**
```json
{
  "userId": "cl95qk5z00000l108j1h5e8q0",
  "role": "USER",
  "iat": 1717942800,      // Issued at
  "exp": 1718547600       // Expiration (7 days)
}
```

### Token Expiration

- **Default Duration**: 7 days
- **Configurable Via**: `JWT_EXPIRES_IN` environment variable
- **Format**: Can be in milliseconds (e.g., `604800000`), seconds (e.g., `604800`), or human-readable (e.g., `7d`, `24h`)

## 👥 Role-Based Access Control (RBAC)

### Overview

The API implements two user roles with different permission levels:

### USER Role

A regular user account with limited permissions:

| Action | Permission | Details |
|--------|-----------|---------|
| View own tasks | ✅ Allowed | Users can list and view only their own tasks |
| Create tasks | ✅ Allowed | Users can create new tasks assigned to themselves |
| Update own tasks | ✅ Allowed | Users can modify only their own tasks |
| Delete own tasks | ✅ Allowed | Users can delete only their own tasks |
| View other users' tasks | ❌ Denied | Users cannot access tasks owned by other users |
| Manage user accounts | ❌ Denied | Users cannot create/modify other accounts |

### ADMIN Role

An administrator account with full permissions:

| Action | Permission | Details |
|--------|-----------|---------|
| View all tasks | ✅ Allowed | Admins can view tasks from all users |
| Create tasks | ✅ Allowed | Admins can create tasks for themselves |
| Update any task | ✅ Allowed | Admins can modify any task in the system |
| Delete any task | ✅ Allowed | Admins can delete any task |
| View all users | ✅ Allowed | Admins can see all user accounts (future feature) |
| Manage user roles | ✅ Allowed | Admins can change user roles (future feature) |

### Example: Permission Enforcement

**USER trying to update another USER's task:**
```bash
curl -X PUT http://localhost:3000/api/v1/tasks/other-user-task-id \
  -H "Authorization: Bearer [USER_TOKEN]" \
  -H "Content-Type: application/json" \
  -d '{"status": "COMPLETED"}'
```

**Response (403 Forbidden):**
```json
{
  "statusCode": 403,
  "message": "Unauthorized to update this task",
  "data": null,
  "success": false
}
```

**ADMIN doing the same:**
```bash
curl -X PUT http://localhost:3000/api/v1/tasks/other-user-task-id \
  -H "Authorization: Bearer [ADMIN_TOKEN]" \
  -H "Content-Type: application/json" \
  -d '{"status": "COMPLETED"}'
```

**Response (200 OK):** ✅ Succeeds

## 📚 Swagger API Documentation

### Interactive API Explorer

The API documentation is automatically generated and served at:

```
http://localhost:3000/api/docs
```

### Features

- **Interactive Testing**: Try endpoints directly from the browser
- **Request/Response Examples**: See example payloads and responses
- **Schema Documentation**: View data models and their properties
- **Authorization**: Set Bearer token in Swagger UI for testing protected routes
- **Real-time Updates**: Documentation updates automatically as code changes (in dev mode)

### Accessing Swagger UI

1. Start the development server: `npm run dev`
2. Navigate to: `http://localhost:3000/api/docs`
3. Click on any endpoint to view details
4. Click "Try it out" to make test requests
5. Set the Bearer token via the "Authorize" button (key icon) at the top

## 📦 Available Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `ts-node-dev --respawn --transpile-only src/index.ts` | Start development server with hot reload |
| `build` | `tsc` | Compile TypeScript to JavaScript |
| `start` | `node dist/index.js` | Run compiled production build |
| `test` | `npm run test` | Run test suite (placeholder) |
| `prisma:generate` | `prisma generate` | Generate Prisma client |
| `prisma:migrate` | `prisma migrate dev` | Create and run migrations |
| `prisma:studio` | `prisma studio` | Open Prisma visual database browser |

## 🚢 Deployment

### Backend Deployment (Node.js)

#### Option 1: Railway (Recommended)

1. Connect your GitHub repository to [Railway](https://railway.app)
2. Add environment variables in Railway dashboard
3. Deploy automatically on git push

#### Option 2: Heroku

```bash
npm run build
git push heroku main
```

#### Option 3: Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Database (Supabase PostgreSQL)

1. Create a free account at [Supabase](https://supabase.com)
2. Create a new PostgreSQL project
3. Copy the connection string to `DATABASE_URL`
4. Run migrations: `npm run prisma:migrate`

### Frontend Deployment (Next.js)

Deploy to [Vercel](https://vercel.com):

1. Push code to GitHub
2. Import repository in Vercel
3. Set environment variables
4. Deploy automatically

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Coding Standards

- Use TypeScript for type safety
- Follow existing code structure and naming conventions
- Add JSDoc comments for complex functions
- Write clear commit messages
- Test your changes locally before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support & Contact

- **Project Repository**: [GitHub](https://github.com/primetrade/primetrade-task-api)
- **Issues**: Please open an issue on GitHub for bug reports or feature requests
- **Internship Program**: [Primetrade.ai](https://primetrade.ai)

## 🙏 Acknowledgments

- Built as part of the Primetrade.ai internship program
- Thanks to the Express.js, Prisma, and TypeScript communities
- API design inspired by REST best practices and RESTful conventions

---

**Last Updated**: June 9, 2024  
**Version**: 1.0.0  
**Status**: Active Development
