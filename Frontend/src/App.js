import React, { useState } from "react";
import { useSocket } from "./hooks/useSocket";

function App() {
  const { sendEvent, messages } = useSocket();
  const [inputValue, setInputValue] = useState("");

  const handleSendClick = () => {
    if (inputValue.trim() !== "") {
      const event = { eventType: "message", content: inputValue, timestamp: new Date().toISOString() };
      sendEvent(event);
      setInputValue(""); // Clear input field
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>WebSocket Chat</h2>
      <input
        type="text"
        placeholder="Type a message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleSendClick}>Send</button>

      <h3>Received Messages:</h3>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.content} - <i>{msg.timestamp}</i></li>
        ))}
      </ul>
    </div>
  );
}

export default App;
