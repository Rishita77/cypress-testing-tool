import { useEffect } from "react";
import axios from "axios";

const useEventCapture = (sendEvent) => {
  useEffect(() => {
    // Function to capture clicks
    const handleClick = async (event) => {
      const eventData = {
        eventType: "click",
        element: event.target.tagName.toLowerCase(),
        id: event.target.id || null,
        classList: [...event.target.classList],
        timestamp: new Date().toISOString(),
      };
      sendEvent(eventData);

      try {
        const res = await axios.post("http://localhost:5000/log-event", eventData);
        console.log("✅ Event sent successfully:", res.data);
      } catch (err) {
        console.error("❌ Error sending event:", err);
      }
    };


    // Function to capture input changes
    const handleInputChange = (event) => {
      const eventData = {
        eventType: "input",
        element: event.target.tagName.toLowerCase(),
        id: event.target.id || null,
        value: event.target.value,
        timestamp: new Date().toISOString(),
      };
      sendEvent(eventData);
    };

    // Function to capture form submissions
    const handleFormSubmit = (event) => {
      event.preventDefault(); // Prevent default form action
      const eventData = {
        eventType: "submit",
        formId: event.target.id || null,
        timestamp: new Date().toISOString(),
      };
      sendEvent(eventData);
    };


    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const response = await originalFetch(...args);
  
      const eventData = {
        eventType: "fetch",
        url: args[0],
        method: args[1]?.method || "GET",
        status: response.status,
        timestamp: new Date().toISOString(),
      };
      sendEvent(eventData);
  
      return response;
    };


    const originalXHROpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (method, url, ...args) {
      this.addEventListener("load", function () {
        const eventData = {
          eventType: "xhr",
          url,
          method,
          status: this.status,
          timestamp: new Date().toISOString(),
        };
        sendEvent(eventData);
      });
  
      originalXHROpen.apply(this, [method, url, ...args]);
    };

    

    // Attach event listeners
    document.addEventListener("click", handleClick);
    document.addEventListener("input", handleInputChange);
    document.addEventListener("submit", handleFormSubmit);

    // Cleanup on unmount
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("input", handleInputChange);
      document.removeEventListener("submit", handleFormSubmit);
    };
  }, [sendEvent]);
};

export default useEventCapture;
