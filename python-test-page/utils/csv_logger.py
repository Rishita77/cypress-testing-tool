import csv
import os

LOG_PATH = "logs/events.csv"

def log_event_to_csv(event):
    file_exists = os.path.isfile(LOG_PATH)
    with open(LOG_PATH, mode="a", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=event.keys())
        if not file_exists:
            writer.writeheader()
        writer.writerow(event)
