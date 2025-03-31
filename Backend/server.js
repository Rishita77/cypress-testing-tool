const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const logEventToCSV = require("./utils/csvLogger");

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// WebSocket Setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow frontend access
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  // Listen for events from the client
  socket.on("logEvent", async (eventData) => {
    console.log("Event received:", eventData);

    // Add a timestamp before saving
    const eventWithTimestamp = {
      ...eventData,
      timestamp: new Date().toISOString(),
    };

    try {
      // Log event to CSV
      await logEventToCSV(eventWithTimestamp);
      console.log("Event logged successfully");
    } catch (err) {
      console.error("Failed to log event:", err);
    }

    // Broadcast event to all connected clients
    io.emit("newEvent", eventData);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// API Endpoint for Logging Events
app.post("/log-event", async (req, res) => {
  const event = req.body;
  console.log("Event received via API:", event);

  try {
    await logEventToCSV({ ...event, timestamp: new Date().toISOString() });
    res.status(200).json({ message: "Event logged successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging event" });
  }
});

// Start Server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
