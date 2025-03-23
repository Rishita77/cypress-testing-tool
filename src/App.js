import React, { useState } from "react";
import axios from "axios";

function App() {
  const [responseData, setResponseData] = useState(""); // State to store the API response

  // Function to handle the API call
  const callApi = async () => {
    try {
      const response = await axios.get("http://localhost:5000/"); // Replace with your backend URL
      setResponseData(response.data); // Store the response data
    } catch (error) {
      console.error("Error calling the API:", error.message);
      setResponseData("Failed to fetch data");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>API Call Example</h1>
      <button
        onClick={callApi}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Call Backend API
      </button>
      <p style={{ marginTop: "20px" }}>
        <strong>Response:</strong> {responseData}
      </p>
    </div>
  );
}

export default App;
