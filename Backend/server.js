const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const logEventToCSV = require("./utils/csvLogger");
const fs = require("fs");
const path = require("path");

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

app.post("/log-event", (req, res) => {
  const event = req.body;
  console.log("✅ Received event:", event); // Log incoming event data

  const testCode = `
  describe("Generated Test", () => {
    it("Tests ${event.eventType} event on ${event.element}", () => {
      cy.visit("http://localhost:3000");
  
      // Ensure the element exists before interacting
      cy.get("${event.id ? `#${event.id}` : event.element}").should("exist")${event.eventType === "input" ? `.type("Test input")` : ".click()"};
    });
  });
  `;

  const testFilePath = path.join(
    __dirname,
    "../Frontend/cypress/e2e/generatedTest.cy.js"
  );

  fs.writeFile(testFilePath, testCode, (err) => {
    if (err) {
      console.error("❌ Failed to write test file:", err);
      return res.status(500).json({ message: "Failed to write test" });
    }
    console.log("✅ Test file successfully created at:", testFilePath);
    res.status(200).json({ message: "Test logged successfully" });
  });
});

// Start Server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
