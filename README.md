# Task Management Application

## Live Deployment

Frontend (Vercel)
[https://task-manager-gilt-six.vercel.app/](https://task-manager-gilt-six.vercel.app/)

Backend API (Render)
[https://task-manager-qz81.onrender.com](https://task-manager-qz81.onrender.com)

---

## Project Overview

This project is a full-stack Task Management Application built as part of a Full Stack Developer Technical Assessment .

The objective was to build and deploy a production-ready system demonstrating:

- Clean backend architecture
- JWT-based authentication
- Secure cookie handling
- Database modeling and query handling
- API design with proper error handling
- Frontend integration with protected routes
- Deployment on cloud platforms

The application allows users to register, login, and manage their own tasks securely.

---

## Tech Stack

### Frontend

- React (Vite)
- React Router
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## Features

### Authentication & Security

- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Access token stored in HTTP-only cookies
- Secure cookie configuration (Secure + SameSite in production)
- AES encryption applied to task description before storing in database
- CORS configured for secure cross-origin communication
- Environment variables used for all secrets
- Proper HTTP status codes and structured error responses

### Authorization

- Each user can access only their own tasks
- All task routes are protected using authentication middleware
- JWT is verified on every protected request

### Task Management

- Create task (title, description, status)
- Update task
- Delete task
- Get task list
- Pagination support
- Filter by status
- Search by title
- Sorted by created date (latest first)

### Frontend

- Login and Register pages
- Protected Dashboard route
- Task creation and editing
- Search and filter UI
- Pagination controls
- Logout functionality
- Clean and minimal UI

---

## Architecture Overview

The backend follows a layered architecture to maintain clean separation of concerns.

### Backend Structure

```
backend/
 └── src/
     ├── config/
     ├── models/
     ├── utils/
     ├── middlewares/
     ├── services/
     ├── controllers/
     ├── routes/
     ├── app.js
     └── server.js
```

Layered flow:

Route → Controller → Service → Model → Database

- Routes handle endpoint mapping
- Controllers manage request/response logic
- Services contain business logic
- Models define database schema
- Middlewares handle authentication and errors
- Utilities handle JWT and encryption

This ensures maintainability and scalability.

---

## Database Design

### User Schema

- name
- email (unique)
- password (hashed)
- createdAt
- updatedAt

### Task Schema

- title
- description (AES encrypted)
- status (PENDING | IN_PROGRESS | COMPLETED)
- user (ObjectId reference to User)
- createdAt
- updatedAt

Each task references a specific user to enforce proper authorization.

---

## API Endpoints

### Auth

POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout

### Tasks

POST /api/tasks
GET /api/tasks?page=1&limit=10&status=COMPLETED&search=react
PUT /api/tasks/:id
DELETE /api/tasks/:id

All task routes require authentication.

---

## Sample Request / Response

### Register

POST /api/auth/register

Request:

```
{
  "name": "John",
  "email": "john@example.com",
  "password": "password123"
}
```

Response:

```
{
  "success": true,
  "message": "User registered successfully"
}
```

---

### Create Task

POST /api/tasks

Request:

```
{
  "title": "Complete assignment",
  "description": "Finish backend integration",
  "status": "PENDING"
}
```

Response:

```
{
  "success": true,
  "data": { ...taskObject }
}
```

---

## Environment Variables

### Backend (.env)

```
PORT=5000
NODE_ENV=production
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
JWT_EXPIRES=1d
AES_SECRET=your_32_character_secret
FRONTEND_URL=https://task-manager-gilt-six.vercel.app
```

### Frontend (.env)

```
VITE_API_URL=https://task-manager-qz81.onrender.com/api
```

---

## Security Considerations

- Passwords are hashed using bcrypt
- JWT stored in HTTP-only cookies
- Cookies configured with:
  - httpOnly
  - secure (production)
  - sameSite="none" for cross-site requests

- AES encryption for sensitive task description
- CORS configured with explicit origin
- No secrets hardcoded in source code

---

## Deployment Notes

- Backend deployed on Render with dynamic PORT handling
- MongoDB Atlas configured with IP access control
- Frontend deployed on Vercel with SPA rewrite configuration
- Production cookie settings adjusted for HTTPS and cross-domain requests

---

## How to Run Locally

### Backend

```
cd backend
npm install
npm run dev
```

### Frontend

```
cd frontend
npm install
npm run dev
```

Make sure environment variables are properly configured before running.
