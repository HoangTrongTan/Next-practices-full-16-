const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { authRoute } = require("./auth-route");
// Nạp các biến từ file .env vào process.env
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // Để đọc được dữ liệu từ Form
app.use(
  cors({
    origin: "http://localhost:3000", // Chỉ cho phép domain của Frontend
    credentials: true, // BẮT BUỘC: Cho phép trình duyệt gửi/nhận Cookie chéo domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
authRoute(app);

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});