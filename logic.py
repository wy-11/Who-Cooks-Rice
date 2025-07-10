import json

cookers = []
saved_data_file = "rice_data.json"

def save_data():
    with open(saved_data_file, "w", encoding="utf-8") as f:
        json.dump(cookers, f)

def load_data():
    global cookers
    try:
        with open(saved_data_file, "r", encoding="utf-8") as f:
            cookers = json.load(f)
    except FileNotFoundError:
        cookers = []

def reset_data():
    global cookers
    cookers = []
    save_data()



def has_cookers():
    return len(cookers) > 0

def add_cooker(name):
    cookers.append({"name": name, "count": 0})
    save_data()

def decide_cooker():
    min_count = min(c["count"] for c in cookers)
    for c in cookers:
        if c["count"] == min_count:
            c["count"] += 1
            save_data()
            return c["name"]

def reset_cookers():
    cookers.clear()