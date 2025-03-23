import React, { useState } from "react";

function App() {
  // State for the URL input and logging app status
  const [url, setUrl] = useState(""); // URL entered by the user
  const [appStatus, setAppStatus] = useState("Idle"); // App state: Idle, Navigating, Capturing, etc.

  // Function to handle input changes
  const handleUrlChange = (event) => {
    setUrl(event.target.value); // Update URL state
  };

  // Function to handle Navigate button click
  const handleNavigate = () => {
    if (url.trim() === "") {
      alert("Please enter a valid URL.");
      return;
    }
    setAppStatus(`Navigating to: ${url}`);
    console.log(`Navigating to: ${url}`);
    // Add your actual navigation logic here
  };

  // Function to handle Start button click
  const handleStartCapture = () => {
    if (appStatus.startsWith("Navigating")) {
      setAppStatus("Capturing Events...");
      console.log("Started capturing events.");
      // Add event capture logic here
    } else {
      alert("Navigate to a URL before starting capture.");
    }
  };

  // Function to handle Stop button click
  const handleStopCapture = () => {
    if (appStatus === "Capturing Events...") {
      setAppStatus("Stopped Capturing.");
      console.log("Stopped capturing events.");
      // Add stop logic here
    } else {
      alert("No event capture in progress to stop.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Web Event Capture Tool</h1>
      {/* URL Input Field */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="url" style={{ marginRight: "10px" }}>
          Enter URL:
        </label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={handleUrlChange}
          placeholder="e.g., https://example.com"
          style={{
            padding: "8px",
            width: "300px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={handleNavigate}
          style={{
            padding: "10px 15px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginRight: "10px",
            cursor: "pointer",
          }}
        >
          Navigate
        </button>
        <button
          onClick={handleStartCapture}
          style={{
            padding: "10px 15px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginRight: "10px",
            cursor: "pointer",
          }}
        >
          Start
        </button>
        <button
          onClick={handleStopCapture}
          style={{
            padding: "10px 15px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Stop
        </button>
      </div>

      {/* App Status */}
      <div style={{ marginTop: "20px" }}>
        <h2>Status: {appStatus}</h2>
      </div>
    </div>
  );
}

export default App;
