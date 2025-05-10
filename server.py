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
        'paymentMethod' : row[7]
    }
    return booking

app = Flask(__name__)
CORS(app)

@app.route('/api/bookings',methods=['GET'])
def index():
    db = sqlite3.connect(DB)
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
@app.route('/api/bookings', methods=['POST'])
def store():
    if not request.json:
        abort(404)
   

    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('''SELECT user_id FROM users WHERE name = "John Doe"''')
    user_id = cursor.fetchone()[0]  
    new_booking = (
        user_id,
        request.json['service'],
        request.json['dentistName'],
        request.json['bookingDate'],
        request.json['timeSlot'],
        request.json['amount'],
        request.json['paymentMethod']
    )
    cursor.execute('''
        INSERT INTO bookings(user_id,service,dentistName,bookingDate,timeSlot,amount,paymentMethod)
        VALUES(?,?,?,?,?,?,?)
    ''', new_booking)

    booking_id = cursor.lastrowid

    db.commit()

    response = {
        'id': booking_id,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201
if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p','--port',default=5000,type=int,help='port to listen on')
    args = parser.parse_args()
    port=args.port
    app.run(host='0.0.0.0',port=args.port, debug=True)
