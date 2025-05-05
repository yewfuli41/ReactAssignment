
import React, { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import SwipeableScreen from "./SwipeNavigation";
import { RootStackParamList } from '../Types';
import { StackNavigationProp } from '@react-navigation/stack';
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
  paymentMethod: string;
};

/*add book icons to each record list*/

// BookingItem component displays a single booking record.
const BookingItem = ({ booking, onDelete}: { 
    booking: Booking;
    onDelete: (id: number)=> void;
    }) => {
  const [expanded, setExpanded] = useState(false)
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  
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
          {/* Add any additional booking details here */}
          <Text>Service: {booking.service}</Text>
          <Text>Dentist: {booking.dentistName}</Text>
          <Text>Time Slot: {booking.timeSlot}</Text>
          <Text>Price: ${booking.amount}</Text>
          {/*Update and delete booking record button */}
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <TouchableOpacity onPress={() => 
                  navigation.navigate("BookingUpdate", {
                  bookingId: booking.booking_id,
                  service: booking.service,
                  dentistName: booking.dentistName,
                  bookingDate: booking.bookingDate,
                  timeSlot: booking.timeSlot,
                  amount: booking.amount,
                  paymentMethod: booking.paymentMethod
                })} style={styles.update_button}>
              <Text style={styles.update_delete_buttonText}>Modify</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onDelete(booking.booking_id)} style={[styles.delete_button]}>
              <Text style={styles.update_delete_buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>

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
  const handleDelete = (id: number) => {
    fetch(`http://10.0.2.2:5000/api/bookings/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Delete failed with status ${response.status}`);
        // remove from local state
        setBookings((prev) => prev.filter((b) => b.booking_id !== id));
      })
      .catch((err) => {
        Alert.alert("Delete Failed", err.message);
      });
  };
  
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
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', position: 'relative', marginTop: 10 }}>
            <TouchableOpacity
              style={{ position: 'absolute', left: -1, alignSelf: 'center' }}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
              <Ionicons name="menu" size={28} color="black" />
            </TouchableOpacity><Text style={{ fontWeight: "bold", fontSize:24}}> Booking History</Text>
          </View>
          <FlatList
            data={bookings}
            keyExtractor={(item) => item.booking_id.toString()}
            renderItem={({ item }) => 
              <BookingItem 
                booking={item}
                onDelete={handleDelete}
                />}
            contentContainerStyle={styles.bookRecordsContainer}
          />
          
        </View>
      )}
    />
  );
}

