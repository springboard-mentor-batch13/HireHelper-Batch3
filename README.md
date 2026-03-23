# 🚀 HireHelper-Batch3

## 💼 HireHelper – Smart Task Hiring Platform

HireHelper is a full-stack web application that connects users with helpers for everyday tasks. Users can create tasks, browse available work, and request to help others.

🚀 Completed up to Milestone-3 with full frontend & backend integration

---

## 🚀 Features Implemented

---

### ✅ Milestone-1: User Authentication

- User Registration with validation
- Strong password validation
- Email OTP verification
- Resend OTP functionality
- User Login with JWT authentication
- Protected Dashboard route
- Toast notifications for user feedback

---

### ✅ Milestone-2: Task Management & Feed System

#### 📌 Task Management
- Create tasks with title, description, location
- Upload task images (Cloudinary integration)
- Add start & end date/time
- View user’s tasks (My Tasks)
- Clean task card UI with icons

#### 📰 Task Feed
- View all available tasks
- Responsive grid layout
- Request button to apply for tasks
- Date & time formatted (user-friendly)

#### 🎨 UI/UX Improvements
- Dashboard layout (Sidebar + Header)
- Reusable components (TaskCard, Header, Sidebar)
- Icons using React Icons
- Fully responsive design using Tailwind CSS
- Toast notifications (no alerts)

#### 🔐 Protected System
- Authenticated API calls using JWT
- Protected dashboard routes

---

### ✅ Milestone-3: Request System & Notifications

#### 🔄 Request System
- Send request to any task
- View incoming requests (Requests page)
- Accept or reject requests
- Real-time UI update after action
- Request status tracking (pending / accepted / rejected)
- Prevent duplicate requests

#### 📩 My Requests
- View all requests sent by user
- Track request status in real-time
- Clean card UI with task details
- Date & time properly formatted
- Optional task image support

#### 🔔 Notifications System
- Notification created on:
  - New request received
  - Request accepted
- Notification dropdown in dashboard header
- Unread count badge
- Mark notifications as read
- Click notification → redirect to relevant page

#### 🎯 UX Improvements
- No alerts → fully replaced with Toastify
- Smooth navigation between pages
- Better empty states (No requests / No tasks)
- Image fallback UI (blue background with task title)
- Improved card consistency across pages

---

## 🔗 API Endpoints

### 🔹 Tasks
- `POST /api/tasks/create` → Create a new task
- `GET /api/tasks/allTasks` → Get all tasks (Feed)
- `GET /api/tasks/myTask` → Get logged-in user’s tasks

### 🔹 Requests
- `POST /api/requests/send` → Send request for a task
- `GET /api/requests/received` → Get incoming requests
- `GET /api/requests/myRequests` → Get user’s sent requests
- `PUT /api/requests/accept/:id` → Accept request
- `PUT /api/requests/reject/:id` → Reject request

### 🔹 Notifications
- `GET /api/notifications` → Get user notifications
- `PUT /api/notifications/read/:id` → Mark notification as read

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router DOM
- Axios
- React Toastify
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Nodemailer
- Cloudinary
- Express FileUpload

---

## 📁 Folder Structure


HireHelper/
│
├── frontend/
│ ├── components/
│ ├── pages/
│ ├── services/
│ └── App.jsx
│
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ └── utils/


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/springboard-mentor-batch13/HireHelper-Batch3.git


cd HireHelper-Batch3

2️⃣ Backend Setup
cd backend
npm install
npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

---

🔐 Environment Variables

Create a .env file in the backend folder:

MONGODB_URL=your_mongodb_url
PORT=4000

JWT_SECRET=your_secret

MAIL_USER=your_email
MAIL_PASS=your_email_password

CLOUD_NAME=your_name
API_KEY=your_key
API_SECRET=your_secret