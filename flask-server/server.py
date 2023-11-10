from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/members": {"origins": "http://localhost:3000"}})  # Enable CORS for your app

received_data = {"members": "Hello Testing"}

@app.route('/members', methods=['GET', 'POST'])
def members():
    if request.method == 'GET':
        return jsonify(received_data)

    elif request.method == 'POST':
        try:
            request_data = request.get_json()
            received_data.update(request_data)
            return jsonify({"message": "Data received successfully"})
        except Exception as e:
            return jsonify({"error": str(e)}), 400  # Return a 400 Bad Request status on error

if __name__ == "__main__":
    app.run(debug=True)
