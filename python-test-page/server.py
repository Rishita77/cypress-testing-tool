from flask import Flask, request, send_from_directory
import os
from utils.csv_logger import log_event_to_csv

app = Flask(__name__, static_folder="static")
LOG_DIR = "logs"
os.makedirs(LOG_DIR, exist_ok=True)

@app.route("/")
def index():
    return send_from_directory("static", "index.html")

@app.route("/log-event", methods=["POST"])
def log_event():
    data = request.json
    log_event_to_csv(data)
    return {"message": "Event logged"}, 200

if __name__ == "__main__":
    app.run(port=8080, debug=True)
