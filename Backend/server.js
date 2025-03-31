const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// WebSocket Setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow frontend access
    methods: ["GET", "POST"]
  }
});

// Handle WebSocket Connection

const fs = require("fs");
const path = require("path");

io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  // Listen for events from the client
  socket.on("logEvent", (eventData) => {
    console.log("Event received:", eventData);

    const logFilePath = path.join(__dirname, "event_logs.csv");
    const logEntry = `${data.timestamp},${data.eventType},${data.element || "N/A"},${data.url || "N/A"}\n`;

    fs.appendFile(logFilePath, logEntry, (err) => {
      if (err) console.error("Failed to log event:", err);
    });



    // Broadcast event to all connected clients
    io.emit("newEvent", eventData);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// API Endpoint for Logging Events
app.post("/log-event", (req, res) => {
  const event = req.body;
  console.log("Event received:", event);

  // Simulate storing event data (e.g., save to database)
  res.status(200).json({ message: "Event logged successfully" });
});

// Start Server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
