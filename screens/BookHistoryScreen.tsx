import React, { useState,useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, ScrollView,Alert} from "react-native";
import SwipeableScreen from "./SwipeNavigation";
import styles from "./styleSheet";

type Booking = {
  booking_id: number;
  //user_id: number;
  service: string;
  dentistName: string;
  bookingDate: string;
  timeSlot: string;
  amount: number;
};
//import SQLite from "react-native-sqlite-storage";

// const db = SQLite.openDatabase(
//   { name: "BookingDB", location: "default" },
//   () => console.log("Database opened successfully"),
//   error => console.log("Error opening database: ", error)
// );

// BookingItem component displays a single booking record.
const BookingItem = ({ booking }:{booking:Booking}) => {
  const [expanded, setExpanded] = useState(false)
  
  return (
    <TouchableOpacity
      onPress={() => setExpanded(!expanded)}
      style={styles.bookRecordsContainer}
    >
      {/* Collapsed header view */}
      <View style={styles.bookRecordHeader}>
        <Text style={styles.bookRecordIndex}>{booking.booking_id}</Text>
        <Text style={styles.bookRecordDate}>{booking.bookingDate}</Text>
      </View>
      {/* Expanded details view */}
      {expanded && (
        <View style={styles.bookRecordDetails}>
          <Text>Service: {booking.service}</Text>
          <Text>Dentist: {booking.dentistName}</Text>
          <Text>Time Slot: {booking.timeSlot}</Text>
          <Text>Price: ${booking.amount}</Text>
          {/* Add any additional booking details here */}
        </View>
      )}
    </TouchableOpacity>
  );
};

/*//Sample booking data
const sampleBookings = [
  {
    id: "1",
    date: "2025-04-10",
    service: "Dental Consultation",
    dentist: "Dr Lee Wei",
    timeSlot: "1:30 PM - 3:00 PM",
    price: 50,
  },
  {
    id: "2",
    date: "2025-04-12",
    service: "Scaling",
    dentist: "Dr Micheal Thompson",
    timeSlot: "3:30 PM - 5:00 PM",
    price: 100,
  },
  {
    id: "3",
    date: "2025-04-15",
    service: "X-Ray",
    dentist: "Dr Muhammad Faizal Ismail",
    timeSlot: "5:30 PM - 7:00 PM",
    price: 150,
  },
  {
    id: "4",
    date: "2025-04-17",
    service: "Tooth Extraction",
    dentist: "Dr John Smith",
    timeSlot: "9:00 AM - 10:00 AM",
    price: 200,
  },
  {
    id: "5",
    date: "2025-04-20",
    service: "Dental Filling",
    dentist: "Dr Lisa Ray",
    timeSlot: "10:30 AM - 11:30 AM",
    price: 80,
  },
  {
    id: "6",
    date: "2025-04-22",
    service: "Teeth Whitening",
    dentist: "Dr Megan Fox",
    timeSlot: "12:00 PM - 1:00 PM",
    price: 250,
  },
  {
    id: "7",
    date: "2025-04-24",
    service: "Braces Consultation",
    dentist: "Dr Mike Johnson",
    timeSlot: "2:00 PM - 3:00 PM",
    price: 120,
  },
  {
    id: "8",
    date: "2025-04-26",
    service: "Oral Surgery",
    dentist: "Dr Sarah Connor",
    timeSlot: "3:30 PM - 5:00 PM",
    price: 300,
  },
  {
    id: "9",
    date: "2025-04-28",
    service: "Dental Cleaning",
    dentist: "Dr David Banner",
    timeSlot: "8:30 AM - 9:30 AM",
    price: 60,
  },
  {
    id: "10",
    date: "2025-04-30",
    service: "Implant Consultation",
    dentist: "Dr Bruce Wayne",
    timeSlot: "11:00 AM - 12:00 PM",
    price: 350,
  },
  {
    id: "11",
    date: "2025-05-02",
    service: "Root Canal",
    dentist: "Dr Clark Kent",
    timeSlot: "1:30 PM - 3:00 PM",
    price: 400,
  },
  {
    id: "12",
    date: "2025-05-04",
    service: "Periodontal Treatment",
    dentist: "Dr Diana Prince",
    timeSlot: "3:30 PM - 4:30 PM",
    price: 180,
  },
  {
    id: "13",
    date: "2025-05-04",
    service: "Periodontal Treatment",
    dentist: "Dr Diana Prince",
    timeSlot: "3:30 PM - 4:30 PM",
    price: 180,
  },
  {
    id: "14",
    date: "2025-05-04",
    service: "Periodontal Treatment",
    dentist: "Dr Diana Prince",
    timeSlot: "3:30 PM - 4:30 PM",
    price: 180,
  },
  {
    id: "15",
    date: "2025-05-04",
    service: "Periodontal Treatment",
    dentist: "Dr Diana Prince",
    timeSlot: "3:30 PM - 4:30 PM",
    price: 180,
  },
];*/

export const BookHistoryScreen = () => {
  const [bookings,setBookings] = useState<Booking[]>([]);
  const [isFetching,setIsFetching] = useState(false)
  
  const _load = () =>{
   
    let url = 'http://10.0.2.2:5000/api/bookings'
    setIsFetching(true)
    fetch(url, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        Alert.alert('Error:',response.status.toString())
        throw Error('Error:'+response.status)
      }
      setIsFetching(false)
      return response.json().catch(err => Promise.reject('Failed to parse JSON'))
    })
    .then(booking=>{
      console.log(booking)
      setBookings(booking)}
    )
    .catch(error=>{
      console.log(error)
    })
  }
  useEffect(()=>{
    console.log('Fetching data from API...');
    _load()
  },[])
  return(
  <SwipeableScreen
    screenIndex={2}
    renderContent={() => (
      <View style = {{flex:1}}>
        <Text style={[styles.title]}>History</Text>
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.booking_id.toString()}
          renderItem={({ item }) => <BookingItem booking={item} />}
          contentContainerStyle={styles.bookRecordsContainer}
        />
      </View>
    )}
  />
);
}
