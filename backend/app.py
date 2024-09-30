import requests
from flask import Flask
import constants as const
import Data_handler.data_handler as data
from Rest.rest import api 

app = Flask(__name__, static_folder='static')

# Register the blueprint for API
app.register_blueprint(api)

def run_flask():
    """Function to run the Flask app."""
    app.run(host=const.FLASK_HOST, port=const.FLASK_PORT, debug=const.FLASK_DEBUG, use_reloader=False)

def listen_for_exit():
    """
    Listen for user input in the main thread.
    If 'exit' is typed, send a shutdown request to the Flask server.
    """
    while True:
        command = input("Type 'exit' to stop the server: ").strip().lower()
        if command == 'exit':
            try:
                # Send a POST request to the shutdown route
                response = requests.post('http://127.0.0.1:5000/shutdown')
                if response.status_code == 200:
                    print("Shutdown initiated.")
                else:
                    print("Failed to shutdown the server.")
            except requests.exceptions.ConnectionError:
                print("Failed to connect to the server. It might already be stopped.")
            break

if __name__ == '__main__':
    # Start the Flask server in the main thread
    print("Server has been started.")
    run_flask()

    # Listen for the shutdown command
    listen_for_exit()
    print("Server has been shut down gracefully.")
