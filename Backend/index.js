const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const database = require("./config/database");
const fileUpload = require("express-fileupload");

// ================= LOAD ENV =================
dotenv.config();

// ================= CONNECT DATABASE =================
database.connect();

// ================= MIDDLEWARE =================
app.use( cors({
    origin: true, // allow all (safe for now)
    credentials: true,
  }));


// ================= FILE UPLOAD =================
app.use(
 fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
 })
);

app.use(express.json());

// ================= CLOUDINARY =================
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// ================= ROUTES =================
// Auth routes
app.use("/api/auth",require("./routes/auth"));

// Task routes (Milestone-2)
app.use("/api/tasks",require("./routes/taskRoutes"));

// Request routes
app.use("/api/requests", require("./routes/requestRoutes"));

// Notification routes
app.use("/api/notifications", require("./routes/notificationRoutes"));

// Settings routes
app.use("/api/user", require("./routes/userRoutes"));

// ================= DEFAULT ROUTE =================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "HireHelper API is running"
  });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong"
  });
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
  console.log(
    `Server running on port ${PORT}`
  );
});