import sqlite3
from flask import Flask, jsonify, request, abort
from flask_cors import CORS
from argparse import ArgumentParser

DB = 'android/app/src/main/assets/database.sqlite'

def get_booking(row):
    booking = {
        'booking_id' : row[0],
        'user_id' : row[1],
        'service' : row[2],
        'dentistName' : row[3],
        'bookingDate' : row[4],
        'timeSlot' : row[5],
        'amount' : row[6],
    }
    return booking

app = Flask(__name__)
CORS(app)

@app.route('/api/bookings',methods=['GET'])
def index():
    db = sqlite3.connect(DB)
    print("API called")
    cursor = db.cursor()
    cursor.execute('''
    SELECT bookings.* FROM bookings
    JOIN users ON bookings.user_id = users.user_id
    WHERE users.name = "John Doe"
''')
    rows = cursor.fetchall()
    db.close()
    bookings=[]
    for row in rows:
        booking = get_booking(row)
        bookings.append(booking)

    return jsonify(bookings),200

if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p','--port',default=5000,type=int,help='port to listen on')
    args = parser.parse_args()
    port=args.port
    app.run(host='0.0.0.0',port=args.port, debug=True)
