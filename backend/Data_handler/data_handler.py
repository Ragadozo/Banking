import constants as const
import json
import os

def read_data ():
    json_path = os.path.join(os.path.dirname(__file__), const.DATA_FILE_PATH)
    try:
        with open(json_path, 'r') as json_file:
            data = json.load(json_file)
        return data
    except FileNotFoundError:
        # If the file doesn't exist, return an empty list
        return []


def write_data_to_file(data_storage):
    """Write the updated data to a JSON file."""
    with open(const.DATA_FILE_PATH, 'w') as f:
        json.dump(data_storage, f, indent=4)    