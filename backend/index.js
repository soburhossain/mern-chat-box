import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
// Load environment variables
dotenv.config();
// Initialize the app
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Connection Error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const User = mongoose.model("User", userSchema);

// Middleware for authentication
const authenticateUser = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({ error: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token is not valid" });
  }
};
const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error registering user" });
  }
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get Current User Data (with Friends and Requests)
router.get("/me", authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user)
      .populate("friends", "username _id")
      .populate("friendRequests", "username _id");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error fetching user data" });
  }
});

// Get All Users Except Current User
router.get("/users", authenticateUser, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user } }).select(
      "username _id"
    );
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error fetching all users" });
  }
});

// Send Friend Request
router.post("/send-friend-request", authenticateUser, async (req, res) => {
  const { friendId } = req.body;

  try {
    const friend = await User.findById(friendId);
    if (!friend) return res.status(404).json({ error: "User not found" });

    if (friend.friendRequests.includes(req.user)) {
      return res.status(400).json({ error: "Friend request already sent" });
    }

    friend.friendRequests.push(req.user);
    await friend.save();

    res.status(200).json({ message: "Friend request sent" });
  } catch (err) {
    res.status(500).json({ error: "Error sending friend request" });
  }
});

// Accept Friend Request
router.post("/accept-friend-request", authenticateUser, async (req, res) => {
  const { friendId } = req.body;

  try {
    const user = await User.findById(req.user);
    const friend = await User.findById(friendId);

    if (!user.friendRequests.includes(friendId)) {
      return res.status(400).json({ error: "No friend request found" });
    }

    user.friendRequests.pull(friendId);
    user.friends.push(friendId);
    friend.friends.push(req.user);
    await user.save();
    await friend.save();
    res.status(200).json({ message: "Friend request accepted" });
  } catch (err) {
    res.status(500).json({ error: "Error accepting friend request" });
  }
});
// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (Update for production security)
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  // Join room
  socket.on("join", (token) => {
    console.log("User joined with token:", token);
    // Optional: Validate and extract user ID from token, then join them to a specific room
  });

  // Receive and broadcast messages
  socket.on("sendMessage", (message) => {
    console.log("Message received:", message);
    io.to(message.receiverId).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.use("/api", router);
// Port
const PORT = process.env.PORT || 5000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
