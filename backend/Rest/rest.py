from flask import Blueprint, request, jsonify, send_from_directory
from Data_handler.data_handler import read_data, write_data_to_file  # Import the read and write functions

api = Blueprint('api', __name__)
data_storage = read_data()

@api.route('/api/data', methods=['GET'])
def get_data():
    """API endpoint to retrieve data from data.json."""
    try:
        return jsonify(data_storage), 200
    except Exception as e:
        # Return error message if something goes wrong
        return jsonify({"error": str(e)}), 500

@api.route('/shutdown', methods=['POST'])
def shutdown():
    """Shutdown the Flask server."""
    shutdown_func = request.environ.get('werkzeug.server.shutdown')
    if shutdown_func is None:
        return jsonify({"error": "Not running with the Werkzeug Server"}), 500
    shutdown_func()
    return jsonify({"message": "Server shutting down..."}), 200

@api.route('/api/update-item', methods=['POST'])
def update_item():
    updated_data = request.json  # Get the JSON data sent from the frontend
    reference = updated_data.get('reference')
    paid_amount = updated_data.get('paid_amount')

    # Find and update the item in your local storage
    for item in data_storage:
        if item['reference'] == reference:
            item['paid_amount'] = paid_amount  # Update the paid amount
            if item['amount'] == paid_amount:
                item['status'] = "PAID"
            else:
                item['status'] = "PARTIALLY_PAID"
            write_data_to_file(jsonify(item))  # Write the updated data to the file
            return True, 200  # Return the updated item

    return jsonify({"error": "Item not found"}), 404