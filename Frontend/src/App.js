import React, { useState } from "react";
import { useSocket } from "./hooks/useSocket";
import useEventCapture from "./hooks/useEventCapture";
import './App.css'; // Import the CSS file for styles

function App() {
  const { sendEvent, messages } = useSocket();
  const [inputValue, setInputValue] = useState("");

  // Activate event capturing
  useEventCapture(sendEvent);

  return (
    <div className="app-container">
      <h2 className="app-title">Event Capturing System</h2>

      <div className="input-container">
        <input
          type="text"
          id="test-input"
          placeholder="Type something..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="input-field"
        />
        <div className="button-group">
          <button id="start-button" className="action-button">Start</button>
          <button id="stop-button" className="action-button">Stop</button>
        </div>
      </div>

      <form id="test-form" className="form-container">
        <button type="submit" className="submit-button">Submit Form</button>
      </form>

      <h3 className="captured-events-title">Captured Events:</h3>
      <ul className="events-list">
        {messages.map((msg, index) => (
          <li key={index} className="event-item">{JSON.stringify(msg)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;