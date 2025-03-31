const fs = require("fs");
const path = require("path");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// Define CSV file path
const csvFilePath = path.join(__dirname, "../logs/events.csv");

// Create CSV writer
const csvWriter = createCsvWriter({
  path: csvFilePath,
  header: [
    { id: "timestamp", title: "Timestamp" },
    { id: "eventType", title: "Event Type" },
    { id: "element", title: "DOM Element" },
    { id: "id", title: "Element ID" },
    { id: "classList", title: "Class List" },
    { id: "value", title: "Value" },
    { id: "url", title: "URL" },
    { id: "method", title: "Method" },
    { id: "status", title: "Status Code" },
  ],
  append: true, // Append to existing file
});

// Function to log an event
const logEventToCSV = async (eventData) => {
  try {
    // Write event to CSV
    await csvWriter.writeRecords([eventData]);
    console.log("Event logged:", eventData);
  } catch (error) {
    console.error("Error logging event to CSV:", error);
  }
};

// Ensure logs directory exists
const ensureLogDirectoryExists = () => {
  const logDir = path.dirname(csvFilePath);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
};

// Ensure directory exists on startup
ensureLogDirectoryExists();

module.exports = logEventToCSV;
