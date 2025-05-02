from flask import Flask, request, jsonify
import requests
import os
from argparse import ArgumentParser

app = Flask(__name__)
GOOGLE_API_KEY = os.environ.get('AlzaSybF-jlRbPDr_uHUFddP7qYH1-F7A_tfLXT')  # safer than hardcoding

@app.route('/route')
def get_route():
    start_lat = request.args.get('start_lat')
    start_lon = request.args.get('start_lon')
    end_lat = request.args.get('end_lat')
    end_lon = request.args.get('end_lon')

    if not all([start_lat, start_lon, end_lat, end_lon]):
        return jsonify({'error': 'Missing coordinates'}), 400

    google_url = (
        f"https://www.gomaps.pro/geolocation/v1/geolocate?key=AlzaSybF-jlRbPDr_uHUFddP7qYH1-F7A_tfLXT"
        f"origin={start_lat},{start_lon}&"
        f"destination={end_lat},{end_lon}&"
        f"mode=driving&"
    )

    response = requests.get(google_url)
    if response.status_code != 200:
        return jsonify({'error': 'Failed to fetch directions'}), 500

    return jsonify(response.json())
    

if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p','--port',default=5000, type=int, help='port to listen on')
    args=parser.parse_args()
    port=args.port
    app.run(host='0.0.0.0',debug=True, port=port)