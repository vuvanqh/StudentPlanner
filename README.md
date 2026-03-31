# SE2
Repo for software engineering 2 project


## Student Planner – Dockerized Setup

This project consists of a multi-service architecture:

- **Frontend** (Vite + Nginx)  
- **Backend** (ASP.NET)  
- **USOS API** (Node.js microservice)  
- **Database** (SQL Server)  

All services are orchestrated using Docker Compose.

---

### Prerequisites

Before running the project, ensure the following:

1. Install Docker Desktop  
2. Start Docker Desktop (it must be running before executing any commands)

---

### Environment Configuration

The application requires **three `.env` files**:

#### 1. Root `.env`

Located in the same directory as `docker-compose.yml`.

There is a template provided:

.env.example

Create a new file:

.env

and fill in required variables (e.g. `SA_PASSWORD`).

---

#### 2. Backend `.env`

Location:

./StudentPlanner.Backend/.env

Create this file based on the backend configuration (JWT settings, environment, etc.).

---

#### 3. USOS API `.env`

Location:

./usos-api/.env

Create this file based on the expected configuration or example.

---

### Running the Application

After configuring all `.env` files, run:

docker compose up --build

This will:

- build all services  
- start containers  
- initialize the database  
- run backend and microservices  
- serve the frontend  

---

### Accessing the Application

Once all services are running:

- Frontend: http://localhost:3001  
- Backend API: http://localhost:8080  
- USOS API: http://localhost:3000  

---

### Notes

- Docker Compose automatically loads the **root `.env`** for variable substitution  
- Service-specific `.env` files are injected using `env_file`  
- If you encounter database issues, reset volumes:

docker compose down -v  
docker compose up --build  

---

### Summary

To run the project:

1. Start Docker Desktop  
2. Create all required `.env` files  
3. Run:

docker compose up --build  

The system should then be fully operational.
