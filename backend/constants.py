import os
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Get the directory of the current file
DATA_FILE_PATH = os.path.join(BASE_DIR, 'data_handler', 'data.json')  # Path to the data.json file

# Flask server configuration
FLASK_HOST = '127.0.0.1'
FLASK_PORT = 5000
FLASK_DEBUG = True

# API Endpoints
API_DATA_ENDPOINT = '/api/data'
API_SHUTDOWN_ENDPOINT = '/shutdown'

# Shutdown command
SHUTDOWN_COMMAND = 'exit'
