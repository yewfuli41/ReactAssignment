import sqlite3
db = sqlite3.connect('database.sqlite')

db.execute('''CREATE TABLE bookings(
    booking_id integer PRIMARY KEY,
    user_id integer,
    service text NOT NULL,
    dentistName text NOT NULL,
    bookingDate date NOT NULL,
    timeSlot text NOT NULL,
    amount real NOT NULL,
    paymentMethod text NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)      
)''')
db.execute('''CREATE TABLE users(
    user_id integer PRIMARY KEY,
    name text NOT NULL,
    dialingCode text NOT NULL,
    phoneNumber integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    gender text,
    birthDate date
)''')

cursor = db.cursor()

cursor.execute('''INSERT INTO users(name,dialingCode,phoneNumber,email,password,gender,birthDate) VALUES("John Doe","+60","111213141","john.doe@example.com","bro","Male","2000-01-01")''')
cursor.execute('''INSERT INTO users(name,dialingCode,phoneNumber,email,password,gender,birthDate) VALUES("Foo Yoke Wai","+63","161718191", "fooyw@roostermail.com","hmm","Male","2007-09-08")''')
cursor.execute('''INSERT INTO users(name,dialingCode,phoneNumber,email,password,gender,birthDate) VALUES("Ng Mei Mei","+65","12345678","meimei@gmel.com","12345","Female","2003-01-03")''')
cursor.execute('''SELECT user_id FROM users WHERE name = "John Doe"''')
user_id = cursor.fetchone()[0]  
cursor.execute('''INSERT INTO bookings(user_id, service, dentistName, bookingDate, timeSlot, amount, paymentMethod) 
                  VALUES(?, "Dental Consultation", "Dr Micheal Thompson", "2025-04-26", "3:30PM-5:00PM", 50.00, "E-wallet")''', (user_id,))
cursor.execute('''INSERT INTO bookings(user_id, service, dentistName, bookingDate, timeSlot, amount, paymentMethod) 
                  VALUES(?, "Scaling", "Dr Lee Wei", "2025-04-25", "5:30PM-7:00PM", 100.00, "Online Banking")''', (user_id,)) 
cursor.execute('''INSERT INTO bookings(user_id, service, dentistName, bookingDate, timeSlot, amount, paymentMethod) 
                  VALUES(?, "X-Ray", "Dr Muhammad Faizal Ismail", "2025-04-29", "1:30PM-3:00PM", 150.00, "Credit/Debit Card")''', (user_id,))
db.commit()
db.close()