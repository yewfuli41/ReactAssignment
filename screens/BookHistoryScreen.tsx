
import React, { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, ScrollView, Alert } from "react-native";
import SwipeableScreen from "./SwipeNavigation";
import styles from "./styleSheet";
import { useFocusEffect, DrawerActions, useNavigation } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";

type Booking = {
  booking_id: number;
  user_id: number;
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
const BookingItem = ({ booking }: { booking: Booking }) => {
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




export const BookHistoryScreen = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const navigation = useNavigation();
  const _load = () => {

    let url = 'http://10.0.2.2:5000/api/bookings'
    fetch(url, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error:', response.status.toString())
          throw Error('Error:' + response.status)
        }
        return response.json().catch(err => Promise.reject('Failed to parse JSON'))
      })
      .then(booking => {
        setBookings(booking)
      }
      )
      .catch(error => {
        console.log(error)
      })
  }
  useFocusEffect(
    useCallback(() => {
      _load();    // reload from server
    }, [])
  );
  return (
    <SwipeableScreen
      screenIndex={2}
      renderContent={() => (
        <View style={{ flex: 1 }}>
          <Text style={[styles.title]}>History</Text>
          <FlatList
            data={bookings}
            keyExtractor={(item) => item.booking_id.toString()}
            renderItem={({ item }) => <BookingItem booking={item} />}
            contentContainerStyle={styles.bookRecordsContainer}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', position: 'relative', marginTop: 10 }}>
            <TouchableOpacity
              style={{ position: 'absolute', left: -9, alignSelf: 'center' }}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
              <Ionicons name="menu" size={28} color="black" />
            </TouchableOpacity><Text style={{ fontWeight: "bold", fontSize:24}}> Booking History</Text>
          </View>
        </View>
      )}
    />
  );
}

