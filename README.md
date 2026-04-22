# 🚀 HireHelper – Full Stack Task Hiring Platform

HireHelper is a **full-stack web application** that connects users who need help with everyday tasks to people willing to complete them. Whether you need someone to help with errands, repairs, or any other task, HireHelper makes it easy to post jobs and find reliable helpers in your area.

It provides a complete workflow:  
➡️ **Task Creation** → **Request Sending** → **Accept/Reject** → **Real-time Notifications** → **Task Management**

![LandingPage](./screenshots/HireHelperLandingPage.png)

---

## 📌 Project Overview

HireHelper is designed to simplify task-hiring by connecting task posters with task takers. Users can:

- **Post tasks** with detailed descriptions, locations, and timestamps
- **Browse and request** tasks from other users
- **Manage** incoming and outgoing requests with accept/reject functionality
- **Receive real-time notifications** for all request updates
- **Update profile** information and manage account settings
- **Upload images** for tasks using Cloudinary integration

---

## 🧩 Core Features

- **🔐 Authentication & Profile Management** – Secure JWT-based auth, email OTP verification, password management
- **📌 Task Posting & Discovery** – Create, view, and browse tasks with location and time details
- **🔄 Request Handling System** – Send requests, accept/reject offers, track request status
- **🔔 Real-time Notification System** – Instant alerts for requests, accepts, rejections
- **📊 Dashboard & Navigation** – Organized sidebar, search functionality, notification badge
- **⚙️ Account Settings** – Profile updates, password changes, profile picture management  

---

## 🎯 Features & Screenshots

### 🔐 Authentication System

![Login](./screenshots/LoginPage.png)

- User registration with email verification
- Email-based OTP verification using Nodemailer
- Secure JWT-based authentication
- Protected routes for authenticated users
- Toast notifications for user feedback  

---

### 📊 Dashboard

![Dashboard](./screenshots/DashBoardHeader.png)

- Sidebar navigation with main sections
- Search bar for quick task lookup
- Notification icon with unread badge
- Clean and intuitive UI layout
- Quick access to all main features  

---

### 📌 Task Management

#### ➕ Create New Task

![Add Task](./screenshots/PostTaskPage.png)

- Add task title and detailed description
- Specify location and time availability
- Optional image upload powered by Cloudinary
- Form validation for data integrity
- Clean and user-friendly form interface  

---

#### 📰 Explore Task Feed

![Feed](./screenshots/GetFeed.png)

- Browse all available tasks in real-time
- Quick request button for each task
- Fully responsive design for all devices
- Task details including location and time display
- Infinite scrolling for better UX  

---

#### 📁 My Tasks

![My Tasks](./screenshots/MyTasksPage.png)

- View all tasks you've created
- Manage task images and details
- Organized grid layout for easy browsing
- Quick actions for task management  

---

### 🔄 Request System

#### 📥 Incoming Requests

![Requests](./screenshots/RequestPage.png)

- View all requests for your tasks
- See requester's profile and details
- Accept or reject requests with one click
- Track request status in real-time
- Clear user information for decision making  

---

#### 📤 My Requests

![My Requests](./screenshots/MyRequestPage.png)

- Track all requests you've sent to others
- Monitor request status (Pending/Accepted/Rejected)
- Cancel pending requests if needed
- View task details and requester information  

---

### 🔔 Notifications

![Notifications](./screenshots/NotificationPage.png)

- Real-time alerts for new requests
- Instant notifications for accept/reject updates
- Unread notification badge on icon
- Mark notifications as read
- Clear notification history management  

---

### ⚙️ Account Settings

![Settings](./screenshots/SettingsPAge.png)

- Update profile information (name, email, phone)
- Change password with OTP verification
- Upload and manage profile pictures via Cloudinary
- Delete account functionality
- Secure password management with email verification  

---

## 🔗 API Endpoints

### � Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user account |
| POST | `/api/auth/verify-otp` | Verify email OTP |
| POST | `/api/auth/resend-otp` | Resend OTP to email |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user profile |
| POST | `/api/auth/forgot-password` | Initiate password recovery |
| POST | `/api/auth/reset-password` | Reset password with token |
| DELETE | `/api/auth/delete-account` | Delete user account |

### 📌 Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tasks/create` | Create a new task |
| GET | `/api/tasks/allTasks` | Fetch all available tasks |
| GET | `/api/tasks/myTask` | Get user's created tasks |
| PUT | `/api/tasks/:id` | Update task details |
| DELETE | `/api/tasks/:id` | Delete a task |
| PUT | `/api/tasks/complete/:taskId` | Mark task as completed |
| GET | `/api/tasks/dashboard` | Get dashboard data |

### 🔄 Requests

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/requests/send` | Send request for a task |
| GET | `/api/requests/received` | Get requests for your tasks |
| GET | `/api/requests/myRequests` | Get requests you've sent |
| PUT | `/api/requests/accept/:requestId` | Accept a request |
| PUT | `/api/requests/reject/:requestId` | Reject a request |
| DELETE | `/api/requests/cancel/:requestId` | Cancel sent request |

### 🔔 Notifications

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notifications` | Fetch all notifications |
| PUT | `/api/notifications/read/:id` | Mark notification as read |

### 👤 User Settings

| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/api/user/update` | Update profile information |
| PUT | `/api/user/update-profile-pic` | Update profile picture |
| PUT | `/api/user/change-password` | Change password |
| DELETE | `/api/user/remove-profile-pic` | Remove profile picture |
| POST | `/api/user/send-change-password-otp` | Send OTP for password change |
| POST | `/api/user/verify-change-password-otp` | Verify password change OTP |
| PUT | `/api/user/update-password` | Update password with OTP |  

---

## 🛠️ Tech Stack

### Frontend
- **React 19** – Modern UI library
- **Vite** – Fast build tool and dev server
- **Tailwind CSS 4** – Utility-first styling
- **React Router DOM 7** – Client-side routing
- **Axios** – HTTP client for API calls
- **React Toastify** – Toast notifications
- **React Icons** – Icon library
- **React OTP Input** – OTP input component
- **DayJS** – Date/time manipulation

### Backend
- **Node.js** – JavaScript runtime
- **Express.js 5** – Web framework
- **MongoDB** – NoSQL database
- **Mongoose 9** – MongoDB ODM
- **JWT** – Authentication tokens
- **Nodemailer 8** – Email service
- **Cloudinary** – Image hosting and optimization
- **bcryptjs** – Password hashing
- **Dotenv** – Environment variable management
- **CORS** – Cross-origin resource sharing  

---

## 📁 Project Structure

```
HireHelper/
├── frontend/                    # React application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   └── landing/       # Landing page components
│   │   ├── pages/             # Page components (routed)
│   │   ├── services/          # API service layer
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # Entry point
│   ├── public/                # Static assets
│   ├── package.json
│   └── vite.config.js
│
├── Backend/                    # Node.js application
│   ├── config/               # Configuration files (DB, Cloudinary)
│   ├── controllers/          # Business logic handlers
│   ├── models/               # MongoDB schemas
│   ├── routes/               # API route definitions
│   ├── middleware/           # Authentication & other middleware
│   ├── utils/                # Helper functions (email, upload)
│   ├── index.js             # Server entry point
│   └── package.json
│
├── screenshots/             # UI screenshots for documentation
├── README.md               # This file
└── package.json            # Root package management
```

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- MongoDB instance (local or Atlas)
- Cloudinary account (for image uploads)
- Email service credentials (Nodemailer)

### Clone Repository
```bash
git clone https://github.com/your-username/HireHelper.git
cd HireHelper
```

### Backend Setup
```bash
cd Backend
npm install
npm run dev
```

The backend server will start on `http://localhost:5000` (or the PORT from .env)

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:5173` (Vite default)  

---

## 🔐 Environment Variables

### Backend (.env)
```env
# Server Configuration
PORT=5000

# Database
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/hirehelper

# JWT Authentication
JWT_SECRET=your_jwt_secret_key_here

# Email Service (Nodemailer)
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

# CORS
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env or vite.config.js)
```env
VITE_API_URL=http://localhost:5000/api
```

**Note:** For production, update API URLs and use environment-specific configurations.  

---

## ✅ Project Status

### Completed Features
- ✅ User Authentication (Registration, Login, OTP Verification)
- ✅ Task Creation and Management
- ✅ Request System (Send, Accept, Reject)
- ✅ Real-time Notifications
- ✅ User Profile Management
- ✅ Image Upload (Cloudinary Integration)
- ✅ Password Management & Recovery
- ✅ Dashboard with Sidebar Navigation
- ✅ Responsive UI Design

### In Progress / Planned
- 🔄 Real-time Chat System
- 🔄 Advanced Search & Filtering
- 🔄 Task Rating & Reviews
- 🔄 Payment Integration
- 🔄 User Rating System

---

## 🚀 Future Enhancements

1. **Real-time Chat** – Direct messaging between task posters and helpers
2. **Payment Gateway** – Secure payments for completed tasks
3. **Task Rating & Reviews** – Users can rate tasks and helpers
4. **Advanced Search** – Filter by category, price, location, rating
5. **Analytics Dashboard** – Track task statistics and performance
6. **Mobile App** – React Native version for iOS/Android
7. **Social Features** – User profiles, skill endorsements, connections
8. **Admin Panel** – Moderation and platform management
9. **Email Notifications** – Additional email alerts for important events
10. **Video Call Integration** – For detailed task discussions

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License. See the LICENSE file for more details.

---

## 💬 Support & Contact

If you have any questions or need support:
- Open an issue on GitHub
- Email: [your-email@example.com]
- Join our community discussions

---

## 📚 Documentation

- [Frontend Documentation](./frontend/README.md) – Frontend setup, components, and routing
- [Backend Documentation](./Backend/README.md) – Backend API, models, and controllers

---

## 👥 Project Team

- **Frontend Developer** – [DeviPriya and SindhuPriya]
- **Backend Developer** – [Manshi Kumari]


---

## 🙏 Acknowledgments

- Thanks to all contributors and the open-source community
- Special thanks to the libraries and tools used in this project

---

**Last Updated:** April 2026
**Version:** 1.0.0
