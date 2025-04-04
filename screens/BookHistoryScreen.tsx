import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import SwipeableScreen from "./SwipeNavigation";
import styles from "./styleSheet";
//import SQLite from "react-native-sqlite-storage";

// const db = SQLite.openDatabase(
//   { name: "BookingDB", location: "default" },
//   () => console.log("Database opened successfully"),
//   error => console.log("Error opening database: ", error)
// );

// BookingItem component displays a single booking record.
const BookingItem = ({ booking }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setExpanded(!expanded)}
      style={itemStyles.bookingContainer}
    >
      {/* Collapsed header view */}
      <View style={itemStyles.header}>
        <Text style={itemStyles.title}>{booking.title}</Text>
        <Text style={itemStyles.date}>{booking.date}</Text>
      </View>
      {/* Expanded details view */}
      {expanded && (
        <View style={itemStyles.details}>
          <Text>Service: {booking.service}</Text>
          <Text>Dentist: {booking.dentist}</Text>
          <Text>Time Slot: {booking.timeSlot}</Text>
          <Text>Price: ${booking.price}</Text>
          {/* Add any additional booking details here */}
        </View>
      )}
    </TouchableOpacity>
  );
};

// Sample booking data
const sampleBookings = [
  {
    id: "1",
    title: "Booking #1",
    date: "2025-04-10",
    service: "Dental Consultation",
    dentist: "Dr Lee Wei",
    timeSlot: "1:30 PM - 3:00 PM",
    price: 50,
  },
  {
    id: "2",
    title: "Booking #2",
    date: "2025-04-12",
    service: "Scaling",
    dentist: "Dr Micheal Thompson",
    timeSlot: "3:30 PM - 5:00 PM",
    price: 100,
  },
  // Add more bookings as needed
];

export const BookHistoryScreen = () => (
  <SwipeableScreen
    screenIndex={2}
    renderContent={() => (
      <FlatList
        data={sampleBookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BookingItem booking={item} />}
        contentContainerStyle={styles.container} // Use your imported styles here if needed
      />
    )}
  />
);

const itemStyles = StyleSheet.create({
  bookingContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  date: {
    color: "#666",
  },
  details: {
    marginTop: 10,
  },
});
