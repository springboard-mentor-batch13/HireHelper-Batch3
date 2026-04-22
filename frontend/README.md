# 🎨 HireHelper Frontend – React Application

This is the frontend application for HireHelper, built with React 19, Vite, and Tailwind CSS.

---

## 📋 Frontend Overview

The HireHelper frontend is a modern, responsive web application that provides:
- User authentication (registration, login, OTP verification)
- Task posting and browsing interface
- Request management system
- Real-time notifications
- User profile and settings management
- Mobile-responsive design with Tailwind CSS

---

## 🛠️ Tech Stack

- **React 19** – Latest UI library with hooks and concurrent features
- **Vite 7** – Fast build tool and development server
- **Tailwind CSS 4** – Utility-first CSS framework
- **React Router DOM 7** – Client-side routing and navigation
- **Axios** – HTTP client for API requests
- **React Toastify** – Toast notifications
- **React Icons** – Icon library (SVG icons)
- **React OTP Input** – OTP input component
- **React Avatar** – User avatar display
- **DayJS** – Lightweight date manipulation

---

## 📁 Folder Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── landing/
│   │   │   ├── Navbar.jsx       # Navigation bar (home page)
│   │   │   ├── Hero.jsx         # Hero section
│   │   │   ├── Features.jsx     # Features showcase
│   │   │   ├── HowItWorks.jsx   # How the platform works
│   │   │   ├── Testimonials.jsx # User testimonials
│   │   │   ├── CTA.jsx          # Call-to-action section
│   │   │   └── Footer.jsx       # Footer component
│   │   │
│   │   ├── DashBoardHeader.jsx  # Dashboard header/navbar
│   │   ├── SideBar.jsx          # Sidebar navigation
│   │   ├── ProtectedRoute.jsx   # Route protection wrapper
│   │   ├── TaskCard.jsx         # Task card component
│   │   ├── RequestCard.jsx      # Request card component
│   │   └── [other components]
│   │
│   ├── pages/
│   │   ├── LandingPage.jsx      # Home/landing page
│   │   ├── login.jsx            # Login page
│   │   ├── Register.jsx         # Registration page
│   │   ├── VerifyOTP.jsx        # OTP verification
│   │   ├── DashBoard.jsx        # Main dashboard layout
│   │   ├── DashBoardHome.jsx    # Dashboard home/overview
│   │   ├── Feed.jsx             # Task feed/browse
│   │   ├── AddTask.jsx          # Create new task
│   │   ├── MyTasks.jsx          # User's created tasks
│   │   ├── Requests.jsx         # Incoming requests
│   │   ├── MyRequests.jsx       # Outgoing requests
│   │   ├── Settings.jsx         # Account settings
│   │   ├── ForgotPassword.jsx   # Forgot password page
│   │   ├── ChangePasswordEmail.jsx   # Email step
│   │   ├── ChangePasswordOTP.jsx     # OTP step
│   │   ├── ChangePasswordNew.jsx     # New password step
│   │   └── UpdatePassword.jsx        # Reset password
│   │
│   ├── services/
│   │   └── api.js              # Axios API client with interceptors
│   │
│   ├── App.jsx                 # Main app component with routing
│   ├── App.css                 # Global styles
│   ├── index.css               # Base CSS
│   └── main.jsx                # React entry point
│
├── public/                      # Static assets
├── index.html                   # HTML template
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── eslint.config.js            # ESLint configuration
├── vercel.json                 # Vercel deployment config
├── package.json
└── README.md
```

---

## 🔀 Routing Structure

### Route Hierarchy

```
/                                    # Public: Landing page
├── /login                          # Public: Login
├── /register                       # Public: Registration
├── /verify-otp                     # Public: OTP verification
├── /forgot-password                # Public: Forgot password
├── /change-password/email          # Public: Email verification
├── /change-password/otp            # Public: OTP verification
├── /change-password/new            # Public: New password
├── /update-password/:token         # Public: Reset with token
│
└── /dashboard                      # Protected: Main app
    ├── /                          # Dashboard home (overview)
    ├── /feed                      # Browse all tasks
    ├── /add-task                  # Create new task
    ├── /my-tasks                  # User's created tasks
    ├── /requests                  # Incoming requests
    ├── /myRequests               # Outgoing requests
    └── /settings                  # Account settings
```

### Protected Routes

Routes under `/dashboard` are protected by `ProtectedRoute` component. Users must be authenticated with a valid JWT token to access them.

```jsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashBoard />
    </ProtectedRoute>
  }
>
  {/* nested routes */}
</Route>
```

---

## 🧩 Key Components

### ProtectedRoute
Wrapper component that checks authentication status before rendering child routes.

```jsx
<ProtectedRoute>
  <DashBoard />
</ProtectedRoute>
```

### DashBoardHeader
Navigation bar for the dashboard with search, notifications, and user menu.

### SideBar
Main navigation menu with links to all dashboard sections.

### TaskCard
Reusable component to display task information with request button.

### RequestCard
Component to display request information with accept/reject actions.

---

## 🎨 UI Components Structure

### Landing Page Components
- **Navbar** – Header navigation
- **Hero** – Main banner section
- **Features** – Feature highlights
- **HowItWorks** – Step-by-step process
- **Testimonials** – User reviews
- **CTA** – Call-to-action button
- **Footer** – Footer links and info

### Dashboard Components
- **DashBoardHeader** – Top navigation
- **SideBar** – Left sidebar navigation
- **TaskCard** – Task display card
- **RequestCard** – Request display card
- **ProtectedRoute** – Auth wrapper

---

## 🔗 API Integration

### API Configuration

The frontend uses Axios with a centralized API client in `src/services/api.js`:

```javascript
import API from "./services/api";

// All API calls use this configured instance
API.get("/tasks/allTasks")
API.post("/tasks/create", taskData)
API.put("/requests/accept/:id", {})
// etc.
```

### API Base URL

```javascript
// Development
baseURL: "http://localhost:5000/api"

// Production
baseURL: "https://hirehelper-backend.onrender.com/api"
```

### Request Interceptors
- Automatically adds JWT token to all requests
- Reads token from localStorage

### Response Interceptors
- Handles 401 errors (auto logout)
- Handles 500 errors (server errors)
- Redirects to login on unauthorized

---

## 📡 Data Flow

### Authentication Flow
1. User enters credentials on login page
2. Request sent to `/api/auth/login`
3. JWT token received and stored in localStorage
4. User redirected to dashboard
5. Token automatically sent with every request

### Task Browsing Flow
1. User navigates to `/dashboard/feed`
2. Component makes request to `/api/tasks/allTasks`
3. API returns all available tasks
4. Tasks rendered as TaskCards
5. User can request tasks or filter results

### Request Management Flow
1. User clicks "Request" on a task
2. Request sent to `/api/requests/send` with taskId
3. Notification created for task owner
4. Task owner sees request in `/dashboard/requests`
5. Owner accepts/rejects the request
6. Both parties notified via notifications system

---

## 🔒 Authentication

### JWT Token Management

```javascript
// Token stored in localStorage
localStorage.setItem("token", jwtToken);

// Token retrieved and sent with requests
const token = localStorage.getItem("token");
config.headers.Authorization = `Bearer ${token}`;

// Token removed on logout
localStorage.removeItem("token");
```

### Protected Component

Only authenticated users can access dashboard routes:

```jsx
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  return children;
}
```

---

## 🎯 Page Features

### Landing Page (`/`)
- Responsive layout
- Feature highlights
- How it works section
- User testimonials
- Call-to-action buttons

### Login Page (`/login`)
- Email and password fields
- Error messages
- Toast notifications
- Link to registration
- Forgot password link

### Registration Page (`/register`)
- Multi-field form (firstName, lastName, email, password, phone)
- Client-side validation
- Submit to backend
- Triggers OTP verification

### OTP Verification Page (`/verify-otp`)
- OTP input field
- Resend OTP option
- Timer for resend availability
- Success redirect to login

### Dashboard Home (`/dashboard`)
- Overview of user activities
- Quick stats
- Recent tasks
- Pending requests

### Task Feed (`/dashboard/feed`)
- List of all available tasks
- Search and filter functionality
- Task cards with details
- Quick request button

### Add Task Page (`/dashboard/add-task`)
- Task form with fields:
  - Title
  - Description
  - Location
  - Date & Time
  - Image upload
- Form validation
- Success notification
- Redirect to my tasks

### My Tasks (`/dashboard/my-tasks`)
- List of user's created tasks
- Edit options
- Delete options
- Task status display

### Requests (`/dashboard/requests`)
- Incoming requests for user's tasks
- Requester information
- Accept/Reject buttons
- Request status

### My Requests (`/dashboard/myRequests`)
- Requests user has sent
- Task details
- Status tracking
- Cancel option

### Settings Page (`/dashboard/settings`)
- Profile information update
- Profile picture upload
- Password change options
- Account deletion

### Password Management Pages
- **Change Password Email** – Email verification
- **Change Password OTP** – OTP verification
- **Change Password New** – Enter new password
- **Forgot Password** – Email-based recovery
- **Update Password** – Token-based password reset

---

## 🎨 Styling

### Tailwind CSS

All components use Tailwind utility classes for styling:

```jsx
<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
  Click Me
</button>
```

### Configuration

Tailwind CSS configured in `tailwind.config.js`:
- Custom colors
- Custom fonts
- Responsive breakpoints
- Theme extensions

### Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg, xl, 2xl
- Flexible layouts with Flexbox/Grid

---

## 📦 State Management

### Local State (React Hooks)

Components use React hooks for local state:

```javascript
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

### Async Operations

- Axios for API calls
- Loading states during requests
- Error handling and display
- Toast notifications for feedback

---

## 🔔 Notifications

### Toast Notifications

Using react-toastify for user feedback:

```javascript
import { toast } from 'react-toastify';

toast.success("Task created successfully!");
toast.error("Failed to create task");
toast.info("Please verify your email");
```

### In-App Notifications

- Real-time notification badge
- Notification page with history
- Mark as read functionality
- Different notification types

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Environment Variables
Create `.env` file in frontend directory (if needed):

```env
VITE_API_URL=http://localhost:5000/api
```

### Step 3: Start Development Server
```bash
npm run dev
```

Frontend will be available at `http://localhost:5173`

### Step 4: Build for Production
```bash
npm run build
```

Output files in `dist/` directory ready for deployment.

### Step 5: Preview Production Build
```bash
npm run preview
```

---

## 📱 Responsive Breakpoints

- **Mobile:** < 640px (sm)
- **Tablet:** 640px - 1024px (md, lg)
- **Desktop:** > 1024px (xl, 2xl)

All components are designed to be responsive across these breakpoints.

---

## 🔄 Component Lifecycle

### Page Load Flow
1. App component renders
2. Routes defined
3. User navigates to path
4. Corresponding page component loads
5. Component mounts and fetches data
6. Data rendered to UI
7. User can interact with page

### API Request Flow
1. User action (click, form submit)
2. Event handler triggered
3. API call via axios
4. Loading state set to true
5. Response received
6. Loading state set to false
7. Data updated in state
8. Component re-renders
9. User sees updated UI

---

## 🛠️ Development Workflow

### File Organization
- One component per file
- Logical folder structure
- Consistent naming conventions
- Clear file relationships

### Code Style
- Functional components with hooks
- JSX formatting
- Clean prop passing
- Proper error handling

### Debugging
- React DevTools browser extension
- Console logging
- Network tab inspection
- Component profiling

---

## 🚀 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Automatic deployments on git push with Vercel integration.

### Deploy to Netlify

```bash
# Build
npm run build

# Deploy dist folder to Netlify
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

## 🐛 Troubleshooting

### Port 5173 Already in Use
```bash
# Kill process on port 5173
# Windows: netstat -ano | findstr :5173
# Mac/Linux: lsof -i :5173

# Or use different port
npm run dev -- --port 5174
```

### API Connection Issues
- Verify backend is running on correct port
- Check VITE_API_URL in environment
- Check browser console for CORS errors
- Ensure API base URL is correct

### Build Errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`
- Check for TypeScript errors
- Verify all imports are correct

### Auth Token Issues
- Clear localStorage
- Re-login to get new token
- Check token expiration time
- Verify JWT_SECRET on backend

---

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React Router Documentation](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction)

---

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test locally
4. Submit pull request

---

## 📝 Performance Optimization

### Recommended Optimizations
- Code splitting with React.lazy()
- Image optimization
- Bundle analysis
- Lazy loading routes
- Memoization with useMemo/useCallback

### Current Optimizations
- Vite for fast HMR
- Tailwind CSS purging
- Responsive images

---

**Version:** 1.0.0  
**Last Updated:** April 2026
