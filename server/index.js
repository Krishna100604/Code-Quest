import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userroutes from "./routes/user.js";
import questionroutes from "./routes/question.js";
import answerroutes from "./routes/answer.js";
const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Mock user data
// const users = [
//   { id: 1, username: "john_doe" },
//   { id: 2, username: "jane_doe" },
//   { id: 3, username: "user123" },
//   // Add more users as needed
// ];

// Endpoint to fetch user suggestions
app.get("/api/users", (req, res) => {
  const searchQuery = req.query.search.toLowerCase();
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery)
  );
  res.json(filteredUsers);
});

// // Endpoint to send notifications (simplified example)
// app.post("/api/notify", (req, res) => {
//   const { mentionedUsers } = req.body;
//   // Logic to send notifications to mentioned users
//   mentionedUsers.forEach((user) => {
//     console.log(`Notification sent to ${user.username}`);
//   });
//   res.sendStatus(200);
// });

app.use("/user", userroutes);
app.use("/questions", questionroutes);
app.use("/answer", answerroutes);
app.get("/", (req, res) => {
  res.send("Codequest is running perfect");
});

const PORT = process.env.PORT || 5000;
const database_url = process.env.MONGODB_URL;

mongoose
  .connect(database_url)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));
