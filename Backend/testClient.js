const io = require("socket.io-client");

// Connect to the WebSocket server
const socket = io("http://localhost:5000");

// Listen for messages from the server
socket.on("connect", () => {
  console.log("Connected to WebSocket server");

  // Send a test event
  socket.emit("logEvent", { event: "Test Click", timestamp: Date.now() });
});

socket.on("newEvent", (data) => {
  console.log("Received from server:", data);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
