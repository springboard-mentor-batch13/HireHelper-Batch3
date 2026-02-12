const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const database = require("./config/database");

dotenv.config();
database.connect();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
