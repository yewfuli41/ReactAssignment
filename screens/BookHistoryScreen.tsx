
import React, { useState, useCallback, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, ScrollView, Alert } from "react-native";
import SwipeableScreen from "./SwipeNavigation";
import { RootStackParamList } from '../Types';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from "./styleSheet";
import { useFocusEffect, DrawerActions, useNavigation } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { ThemeContext } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";
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
const BookingItem = ({ booking, onDelete }: {
  booking: Booking;
  onDelete: (id: number) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { theme } = useContext(ThemeContext);

  // Check if booking date has passed
  const bookingDateObj = new Date(booking.bookingDate);
  const now = new Date();
  const isPast = bookingDateObj < new Date(now.toDateString()); // ignore time, just compare dates

  // highlight background color for active or non active booking items
  const bookRecordHighlight = {
    backgroundColor: isPast ? theme.highlight.past : theme.highlight.active,
    borderColor: isPast ? theme.highlightBorder.past : theme.highlightBorder.active,
    borderWidth: 1,
  };

  return (
    <TouchableOpacity
      onPress={() => setExpanded(!expanded)}
      style={[styles.bookRecordsContainer, bookRecordHighlight]}
    >
      <View style={[styles.bookRecordHeader, { backgroundColor: theme.backgroundColor }]}>
        <Text style={[styles.bookRecordIndex, { color: theme.textColor }]}>{booking.booking_id}</Text>
        <Text style={[styles.bookRecordDate, { color: theme.textColor }]}>{booking.bookingDate}</Text>
      </View>

      {expanded && (
        <View style={styles.bookRecordDetails}>
          <Text>Service: {booking.service}</Text>
          <Text>Dentist: {booking.dentistName}</Text>
          <Text>Time Slot: {booking.timeSlot}</Text>
          <Text>Price: ${booking.amount}</Text>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            {/* Only allow modify if booking is upcoming */}
            {!isPast && (
              <TouchableOpacity
                onPress={() => navigation.navigate("BookingUpdate", {
                  bookingId: booking.booking_id,
                  service: booking.service,
                  dentistName: booking.dentistName,
                  bookingDate: booking.bookingDate,
                  timeSlot: booking.timeSlot,
                  amount: booking.amount,
                  paymentMethod: booking.paymentMethod
                })}
                style={styles.update_button}
              >
                <Text style={styles.update_delete_buttonText}>Modify</Text>
              </TouchableOpacity>
            )}

            {/* Always allow delete */}
            <TouchableOpacity onPress={() => {
              if (!isPast) {
                // Active booking — show refund warning
                Alert.alert(
                  "Warning",
                  "Deleting an active booking will not be refunded. Are you sure you want to proceed?",
                  [
                    { text: "Cancel", style: "cancel" },
                    { text: "Delete", style: "destructive", onPress: () => onDelete(booking.booking_id) }
                  ]
                );
              } else {
                // Past booking — delete immediately
                onDelete(booking.booking_id);
              }
            }}
              style={styles.delete_button}>
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
  const { theme } = useContext(ThemeContext);
  const { userData } = useUser(); // Get the logged-in user's details
  const userName = userData?.name; // Use the user's name
 
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
  const fetchBookings = async () => {
    if (!userName) return;

    try {
      const response = await fetch(`http://10.0.2.2:5000/api/bookings?name=${encodeURIComponent(userName)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setBookings(data);
      console.log("Bookings:", bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchBookings();    // reload from server
    }, [])
  );

  return (
    <SwipeableScreen
      screenIndex={2}
      renderContent={() => (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', position: 'relative', marginTop: 10 }}>
            <TouchableOpacity
              style={{ position: 'absolute', left: -1, alignSelf: 'center' }}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
              <Ionicons name="menu" size={28} color={theme.textColor} />
            </TouchableOpacity><Text style={{ fontWeight: "bold", fontSize: 24, color: theme.textColor }}> Booking History</Text>
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

