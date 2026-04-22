# 🔧 HireHelper Backend – API Server

This is the backend server for the HireHelper application, built with Node.js, Express.js, and MongoDB.

---

## 📋 Backend Overview

The HireHelper backend is a RESTful API server that handles:
- User authentication and authorization
- Task management (create, read, update, delete)
- Request processing (send, accept, reject)
- Notification system
- User profile management
- Image uploads via Cloudinary
- Email notifications via Nodemailer

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js 5
- **Database:** MongoDB with Mongoose 9
- **Authentication:** JWT (JSON Web Tokens)
- **Email Service:** Nodemailer 8
- **Image Hosting:** Cloudinary
- **Password Hashing:** bcryptjs
- **Environment Management:** Dotenv
- **File Uploads:** Express File Upload
- **CORS:** CORS middleware

---

## 📁 Folder Structure

```
Backend/
├── config/
│   ├── cloudinary.js       # Cloudinary configuration
│   └── database.js         # MongoDB connection setup
│
├── controllers/
│   ├── auth.js            # Authentication logic (register, login, OTP)
│   ├── taskController.js  # Task CRUD operations
│   ├── requestController.js # Request handling
│   ├── notificationController.js # Notification management
│   └── userController.js  # User profile management
│
├── models/
│   ├── User.js           # User schema
│   ├── Task.js           # Task schema
│   ├── Request.js        # Request schema
│   ├── Notification.js   # Notification schema
│   └── AcceptedTask.js   # Completed task tracking
│
├── routes/
│   ├── auth.js           # Authentication routes
│   ├── taskRoutes.js     # Task routes
│   ├── requestRoutes.js  # Request routes
│   ├── notificationRoutes.js # Notification routes
│   └── userRoutes.js     # User settings routes
│
├── middleware/
│   └── auth.js           # JWT authentication middleware
│
├── utils/
│   ├── mailSender.js     # Email sending utilities
│   └── imageUploader.js  # Image upload helpers
│
├── .env                   # Environment variables (create this)
├── index.js              # Server entry point
└── package.json
```

---

## 🔐 Authentication System

### JWT Token Flow

1. **Registration:** User registers with email
2. **OTP Verification:** Email OTP sent via Nodemailer
3. **Login:** User logs in, JWT token created
4. **Token Storage:** Token stored in localStorage (frontend)
5. **Protected Routes:** JWT token verified on every request

### Middleware

```javascript
// Auth middleware protects routes
const { authMiddleware } = require("../middleware/auth");

router.get("/protected-route", authMiddleware, controllerFunction);
```

---

## 🔗 API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User
```
POST /api/auth/register
Content-Type: application/json

Request Body:
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "secure_password123",
  "phone": "9876543210"
}

Response:
{
  "success": true,
  "message": "OTP sent to email",
  "data": {
    "userId": "64f1a2b3c4d5e6f7g8h9i0"
  }
}
```

#### Verify OTP
```
POST /api/auth/verify-otp
Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "otp": "123456"
}

Response:
{
  "success": true,
  "message": "Account created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "password": "secure_password123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR...",
  "user": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0",
    "firstName": "John",
    "email": "john@example.com"
  }
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>

Response:
{
  "success": true,
  "user": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "profilePic": "cloudinary_url"
  }
}
```

#### Forgot Password
```
POST /api/auth/forgot-password
Content-Type: application/json

Request Body:
{
  "email": "john@example.com"
}

Response:
{
  "success": true,
  "message": "Password reset email sent"
}
```

#### Reset Password
```
POST /api/auth/reset-password
Content-Type: application/json

Request Body:
{
  "token": "reset_token_from_email",
  "newPassword": "new_password123"
}

Response:
{
  "success": true,
  "message": "Password reset successfully"
}
```

### Task Routes (`/api/tasks`)

#### Create Task
```
POST /api/tasks/create
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "title": "Help with moving",
  "description": "Need help moving furniture",
  "location": "123 Main St, City",
  "taskDateTime": "2024-05-20T14:00:00",
  "image": "uploaded_image_url"  // optional
}

Response:
{
  "success": true,
  "message": "Task created successfully",
  "task": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0",
    "title": "Help with moving",
    "description": "Need help moving furniture",
    "location": "123 Main St, City",
    "taskDateTime": "2024-05-20T14:00:00",
    "taskOwner": "user_id",
    "createdAt": "2024-05-10T10:30:00"
  }
}
```

#### Get All Tasks
```
GET /api/tasks/allTasks
Authorization: Bearer <token>
Query Parameters: ?page=1&limit=10

Response:
{
  "success": true,
  "tasks": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0",
      "title": "Help with moving",
      "description": "Need help moving furniture",
      "location": "123 Main St, City",
      "taskDateTime": "2024-05-20T14:00:00",
      "taskOwner": {
        "_id": "user_id",
        "firstName": "John",
        "profilePic": "url"
      },
      "createdAt": "2024-05-10T10:30:00"
    }
  ],
  "totalTasks": 45
}
```

#### Get User's Tasks
```
GET /api/tasks/myTask
Authorization: Bearer <token>

Response:
{
  "success": true,
  "tasks": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0",
      "title": "Help with moving",
      "description": "Need help moving furniture",
      "location": "123 Main St, City"
    }
  ]
}
```

#### Update Task
```
PUT /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "title": "Updated title",
  "description": "Updated description",
  "location": "New location",
  "taskDateTime": "2024-05-25T14:00:00"
}

Response:
{
  "success": true,
  "message": "Task updated successfully",
  "task": { /* updated task */ }
}
```

#### Delete Task
```
DELETE /api/tasks/:id
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Task deleted successfully"
}
```

#### Mark Task Complete
```
PUT /api/tasks/complete/:taskId
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "status": "completed"
}

Response:
{
  "success": true,
  "message": "Task marked as completed"
}
```

### Request Routes (`/api/requests`)

#### Send Request
```
POST /api/requests/send
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "taskId": "64f1a2b3c4d5e6f7g8h9i0"
}

Response:
{
  "success": true,
  "message": "Request sent successfully",
  "request": {
    "_id": "req_id",
    "taskId": "task_id",
    "requestedBy": "user_id",
    "taskOwner": "task_owner_id",
    "status": "pending",
    "createdAt": "2024-05-10T10:30:00"
  }
}
```

#### Get Received Requests
```
GET /api/requests/received
Authorization: Bearer <token>

Response:
{
  "success": true,
  "requests": [
    {
      "_id": "req_id",
      "taskId": {
        "_id": "task_id",
        "title": "Task title",
        "description": "Task desc"
      },
      "requestedBy": {
        "_id": "user_id",
        "firstName": "John",
        "profilePic": "url"
      },
      "status": "pending",
      "createdAt": "2024-05-10T10:30:00"
    }
  ]
}
```

#### Get My Sent Requests
```
GET /api/requests/myRequests
Authorization: Bearer <token>

Response:
{
  "success": true,
  "requests": [
    {
      "_id": "req_id",
      "taskId": {
        "_id": "task_id",
        "title": "Task title"
      },
      "taskOwner": {
        "_id": "user_id",
        "firstName": "Owner Name"
      },
      "status": "pending",
      "createdAt": "2024-05-10T10:30:00"
    }
  ]
}
```

#### Accept Request
```
PUT /api/requests/accept/:requestId
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Request accepted successfully",
  "request": {
    "_id": "req_id",
    "status": "accepted",
    "updatedAt": "2024-05-11T10:30:00"
  }
}
```

#### Reject Request
```
PUT /api/requests/reject/:requestId
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Request rejected successfully",
  "request": {
    "_id": "req_id",
    "status": "rejected",
    "updatedAt": "2024-05-11T10:30:00"
  }
}
```

#### Cancel Request
```
DELETE /api/requests/cancel/:requestId
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Request cancelled successfully"
}
```

### Notification Routes (`/api/notifications`)

#### Get Notifications
```
GET /api/notifications
Authorization: Bearer <token>

Response:
{
  "success": true,
  "notifications": [
    {
      "_id": "notif_id",
      "type": "new_request",
      "message": "New request for your task",
      "taskId": "task_id",
      "requestId": "request_id",
      "isRead": false,
      "createdAt": "2024-05-10T10:30:00"
    }
  ],
  "unreadCount": 3
}
```

#### Mark as Read
```
PUT /api/notifications/read/:id
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Notification marked as read",
  "notification": {
    "_id": "notif_id",
    "isRead": true
  }
}
```

### User Settings Routes (`/api/user`)

#### Update Profile
```
PUT /api/user/update
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "9876543210",
  "bio": "User bio"
}

Response:
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "_id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "9876543210",
    "email": "john@example.com"
  }
}
```

#### Update Profile Picture
```
PUT /api/user/update-profile-pic
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data:
- file: <image_file>

Response:
{
  "success": true,
  "message": "Profile picture updated",
  "profilePic": "cloudinary_url"
}
```

#### Change Password
```
PUT /api/user/change-password
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "oldPassword": "old_password123",
  "newPassword": "new_password123"
}

Response:
{
  "success": true,
  "message": "Password changed successfully"
}
```

#### Remove Profile Picture
```
DELETE /api/user/remove-profile-pic
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Profile picture removed successfully"
}
```

---

## 📊 Database Models

### User Schema
```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  phone: String,
  profilePic: String,
  bio: String,
  createdAt: Date,
  updatedAt: Date,
  isEmailVerified: Boolean,
  otpToken: String,
  otpExpiry: Date,
  resetPasswordToken: String,
  resetPasswordExpiry: Date
}
```

### Task Schema
```javascript
{
  title: String (required),
  description: String (required),
  location: String (required),
  taskDateTime: Date (required),
  taskOwner: ObjectId (ref: User, required),
  image: String,
  status: String (enum: ['open', 'in-progress', 'completed'], default: 'open'),
  createdAt: Date,
  updatedAt: Date
}
```

### Request Schema
```javascript
{
  taskId: ObjectId (ref: Task, required),
  requestedBy: ObjectId (ref: User, required),
  taskOwner: ObjectId (ref: User, required),
  status: String (enum: ['pending', 'accepted', 'rejected', 'cancelled'], default: 'pending'),
  createdAt: Date,
  updatedAt: Date
}
```

### Notification Schema
```javascript
{
  userId: ObjectId (ref: User, required),
  type: String (enum: ['new_request', 'request_accepted', 'request_rejected']),
  message: String,
  taskId: ObjectId (ref: Task),
  requestId: ObjectId (ref: Request),
  isRead: Boolean (default: false),
  createdAt: Date
}
```

---

## 🔒 Error Handling

The API returns consistent error responses:

```javascript
// 400 Bad Request
{
  "success": false,
  "message": "Invalid input",
  "errors": ["field": "error message"]
}

// 401 Unauthorized
{
  "success": false,
  "message": "Authentication required",
  "code": "UNAUTHORIZED"
}

// 403 Forbidden
{
  "success": false,
  "message": "Permission denied",
  "code": "FORBIDDEN"
}

// 404 Not Found
{
  "success": false,
  "message": "Resource not found",
  "code": "NOT_FOUND"
}

// 500 Server Error
{
  "success": false,
  "message": "Something went wrong"
}
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB instance
- npm or yarn

### Step 1: Install Dependencies
```bash
cd Backend
npm install
```

### Step 2: Create Environment File
```bash
# Create .env file in Backend directory
touch .env
```

### Step 3: Configure Environment Variables
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Email Service
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_specific_password

# Cloudinary
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

# CORS
CORS_ORIGIN=http://localhost:5173
```

### Step 4: Start Development Server
```bash
# Using npm
npm run dev

# Using yarn
yarn dev
```

The server will start on `http://localhost:5000`

### Step 5: Test API Endpoints
Use tools like Postman or Insomnia to test the API endpoints.

---

## 📖 API Documentation

### Response Format

All API responses follow this format:

```javascript
{
  "success": true/false,
  "message": "Response message",
  "data": { /* optional */ },
  "errors": [ /* optional */ ]
}
```

### Authentication

- Include JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Pagination

For endpoints that return lists, use query parameters:
```
GET /api/tasks/allTasks?page=1&limit=10
```

---

## 🔄 Data Flow

1. **Request:** Frontend sends HTTP request with JWT token
2. **Middleware:** Auth middleware verifies JWT token
3. **Controller:** Business logic processes request
4. **Model:** Database query executed via Mongoose
5. **Response:** JSON response sent back to frontend
6. **Notification:** Real-time notification created (if needed)

---

## 🛡️ Security Best Practices

- ✅ Passwords hashed with bcryptjs
- ✅ JWT tokens for stateless authentication
- ✅ Email verification for new accounts
- ✅ CORS enabled for frontend origin only
- ✅ Environment variables for sensitive data
- ✅ Input validation on all endpoints
- ✅ Rate limiting recommended for production

---

## 🚧 Environment Setup for Production

```bash
# Set NODE_ENV to production
NODE_ENV=production

# Use MongoDB Atlas URL
MONGODB_URL=mongodb+srv://prod_user:prod_password@prod-cluster.mongodb.net/

# Strong JWT secret
JWT_SECRET=generate_strong_random_string_here

# Update CORS origin
CORS_ORIGIN=https://yourdomain.com

# Use production Cloudinary account
CLOUD_NAME=prod_cloud_name
API_KEY=prod_api_key
API_SECRET=prod_api_secret
```

---

## 📝 Deployment

### Deploy to Render.com (Recommended)

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set environment variables
5. Deploy

### Deploy to Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set PORT=5000 --app your-app-name
heroku config:set MONGODB_URL=your_url --app your-app-name
# ... set other variables

# Deploy
git push heroku main
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Verify MONGODB_URL is correct
- Check network access in MongoDB Atlas
- Ensure IP whitelist includes your server

### Email Not Sending
- Enable "Less secure app access" if using Gmail
- Use app-specific passwords for Gmail
- Check Nodemailer configuration

### Cloudinary Upload Issues
- Verify API credentials
- Check file size limits
- Ensure correct cloud name

### JWT Token Errors
- Verify JWT_SECRET is set
- Check token expiration
- Ensure Authorization header format is correct

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Documentation](https://jwt.io/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Nodemailer Documentation](https://nodemailer.com/)

---

## 🤝 Contributing

Please follow the coding standards and submit pull requests for improvements.

---

**Version:** 1.0.0  
**Last Updated:** April 2026
