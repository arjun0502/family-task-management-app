# Family Task Management App

A web application that allows family members to create, view, and manage tasks together. The app includes sections for adding new tasks, viewing existing tasks, and browsing suggested tasks.

## Directory Structure

The project is organized into two main folders: `frontend` and `backend`.

- **`backend/`**: Contains the server-side code built using Node.js and Express. It connects to a Supabase database for storing and retrieving tasks.
- **`frontend/`**: Contains the client-side code built using React. The frontend allows users to interact with the app, manage tasks, and view suggested tasks.

## Database Schema

The application uses Supabase with four tables:

### `families`
- `id` (Primary Key)
- `surname`

### `users`
- `id` (Primary Key)
- `family_id` (Foreign Key)
- `name`
- `role`

### `tasks`
- `id` (Primary Key)
- `family_id` (Foreign Key)
- `name`
- `description`
- `status`

### `suggestedtasks`
- `id` (Primary Key)
- `name`
- `description`
- `status`
- `estimated_cost`

## Backend API Endpoints
- **`GET /tasks/:familyId`**: Fetch all tasks for a specific family.
- **`POST /tasks`**: Add a new task.
- **`PUT /tasks/:id`**: Update a task's status.
- **`GET /suggested-tasks`**: Fetch all suggested tasks.

## Frontend Features
- **Task List View**: Displays all tasks with their statuses.
- **Suggested Tasks View**: Displays suggested tasks for upselling.
- **Task Detail View**: Shows detailed information when a task is clicked.
- **Add New Task Form**: Allows users to create a new task.


## Setup and How to Run

### 1. Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/arjun0502/family-task-management-app.git
cd family-task-management-app

### 2 Install Backend Dependencies
Navigate to the `backend` folder and install the required packages:

```bash
cd backend
npm install

### 3. Install Frontend Dependencies
Navigate to the `frontend` folder and install the required packages:

```bash
cd ../frontend
npm install

### 4. Start Backend Server 

```bash
cd ../backend
node server.js

The server should now be running on http://localhost:3000.

### 5. Start Frontend React App 

```bash
cd ../frontend
npm start

The frontend should now be running on http://localhost:3001.



