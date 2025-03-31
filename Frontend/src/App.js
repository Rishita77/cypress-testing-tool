import React, { useState } from "react";
import { useSocket } from "./hooks/useSocket";
import useEventCapture from "./hooks/useEventCapture";

function App() {
  const { sendEvent, messages } = useSocket();
  const [inputValue, setInputValue] = useState("");

  // Activate event capturing
  useEventCapture(sendEvent);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Event Capturing System</h2>

      <input
        type="text"
        id="test-input"
        placeholder="Type something..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button id="start-button">Start</button>
      <button id="stop-button">Stop</button>

      <form id="test-form">
        <button type="submit">Submit Form</button>
      </form>

      <h3>Captured Events:</h3>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{JSON.stringify(msg)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
