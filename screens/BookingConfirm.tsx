
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, TouchableOpacity } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../Types';
import styles from './styleSheet';
import { RadioButton } from "react-native-paper";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export type Props = StackScreenProps<RootStackParamList, 'BookingConfirm'>;

const App = ({ route, navigation }: Props) => {
  const paymentMethods = [
    { id: 1, method: 'Online Banking' },
    { id: 2, method: 'Credit/Debit Card' },
    { id: 3, method: 'E-wallet' },
    { id: 4, method: 'Pay cash in counter' }
  ];
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const { serviceName, dentistName, appointmentDate, timeSlot, calculateTotal } = route.params;
  const user = { name: "John Doe", phone: "011-1213141" }
  const totalAmount = calculateTotal ? calculateTotal(serviceName) : 0;
  const _save = () => {
    let url = 'http://10.0.2.2:5000/api/bookings'
    fetch(url, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        service: serviceName,
        dentistName: dentistName,
        bookingDate: appointmentDate,
        timeSlot: timeSlot,
        amount: totalAmount,
        paymentMethod: paymentMethod
      })
    })
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error:', response.status.toString())
          throw Error('Error:' + response.status)
        }
        return response.json().catch(err => Promise.reject('Failed to parse JSON'))
      })
      .then(respondJson => {
        if (respondJson.affected <= 0) {
          Alert.alert('Error in saving')
        }

      }
      )
      .catch(error => {
        console.log(error)
      })
  }
  return (
    <View style={{ flex: 0.9 }}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', position: 'relative', marginTop: 10 }}>
          <TouchableOpacity
            style={{ position: 'absolute', left: 12, alignSelf: 'center' }}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Ionicons name="menu" size={28} color="black" />
          </TouchableOpacity><Text style={{ fontWeight: "bold", fontSize: 24 }}> Booking Confirmation</Text>
        </View>

        <Text style={styles.text}>Name:{user.name}</Text>
        <Text style={styles.text}>Phone:{user.phone}</Text>
        <Text style={styles.text}>Service: {serviceName}</Text>
        <Text style={styles.text}>Dentist: {dentistName}</Text>
        <Text style={styles.text}>Date: {new Date(appointmentDate).toLocaleDateString("en-CA")}</Text>
        <Text style={styles.text}>Time: {timeSlot}</Text>
        <Text style={styles.text}>Total Amount:RM{totalAmount.toFixed(2)}</Text>
      </View>

      <Text style={styles.title}>Payment Method:</Text>

      <RadioButton.Group onValueChange={(value) => setPaymentMethod(value)} value={paymentMethod}>
        {paymentMethods.map((option) => (
          <View key={option.id} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10 }}>
            <View style={{ flexDirection: "column" }}>
              <Text>{option.method}</Text>
            </View>
            <RadioButton value={option.method} />
          </View>
        ))}
      </RadioButton.Group>
      <View style={[styles.buttonRow]}>
        <View style={styles.backButton}>
          <Button title="Back" onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.nextButton}>
          <Button title="Book Now" color='#FF8F00' onPress={() => {
            if (paymentMethod) {
              Alert.alert("", "Booking Successfully!", [
                {
                  text: "OK",
                  onPress: () => {
                    _save();
                    // Reset the navigation stack and navigate to the home screen
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "BookingDetails" }], // Replace "BookingHome" with your home screen route name
                    });
                  },
                },
              ])
            }
            else {
              Alert.alert("Please select a payment method!");
            }
          }} />
        </View>
      </View>
    </View>
  );


}
export default App;