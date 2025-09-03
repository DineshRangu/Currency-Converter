from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

BASE_API_URL = "https://v6.exchangerate-api.com/v6/e880b856f981c34ce83e30e8/latest"

@app.route('/currency/<base_code>', methods=['GET'])
def proxy_currency(base_code):
    url = f"{BASE_API_URL}/{base_code.upper()}"
    try:
        res = requests.get(url)
        res.raise_for_status()
        data = res.json()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000)
