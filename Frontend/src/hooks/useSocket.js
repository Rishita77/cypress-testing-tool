import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000"; // Update if different

export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Establish WebSocket connection
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    // Listen for events from the backend
    newSocket.on("newEvent", (data) => {
      console.log("New event received:", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Clean up on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Function to send an event to the backend
  const sendEvent = (event) => {
    if (socket) {
      socket.emit("logEvent", event);
    }
  };

  return { socket, sendEvent, messages };
};
