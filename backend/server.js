import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();
app.use(cors());
app.use(express.json());

// Create HTTP server for Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (adjust as needed)
    methods: ["GET", "POST"],
  },
});

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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

// Message Schema
const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

// Middleware for authentication
const authenticateUser = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token is not valid" });
  }
};

// API Routes
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

// Get Current User Data
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

// Fetch All Users Except Current
router.get("/users", authenticateUser, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user } }).select(
      "username _id"
    );
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

// Friend Request Handling
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

// Chat Messages
router.post("/messages", authenticateUser, async (req, res) => {
  const { receiverId, content } = req.body;

  try {
    const newMessage = new Message({
      sender: req.user,
      receiver: receiverId,
      content,
    });
    await newMessage.save();
    io.to(receiverId).emit("receiveMessage", newMessage);
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: "Error sending message" });
  }
});

router.get("/messages/:receiverId", authenticateUser, async (req, res) => {
  const { receiverId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user, receiver: receiverId },
        { sender: receiverId, receiver: req.user },
      ],
    })
      .sort({ timestamp: 1 })
      .populate("sender", "username")
      .populate("receiver", "username");

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Error fetching messages" });
  }
});

app.use("/api", router);

// Socket.IO Real-Time Chat
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  socket.on("sendMessage", async ({ sender, receiver, content }) => {
    try {
      const newMessage = new Message({ sender, receiver, content });
      await newMessage.save();

      io.to(receiver).emit("receiveMessage", newMessage);
      io.to(sender).emit("messageSent", newMessage);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
