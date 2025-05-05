import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, Platform } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../Types';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';

type Props = StackScreenProps<RootStackParamList, 'BookingUpdate'>;

const BookingUpdateScreen = ({ route, navigation }: Props) => {
  const { bookingId, service, dentistName, bookingDate, timeSlot, amount, paymentMethod } = route.params;

  const services = ['Dental Consultation', 'Scaling', 'X-Ray'];
  const dentists = [
    'Dr Lee Wei',
    'Dr Micheal Thompson',
    'Dr Muhammad Faizal Ismail',
  ];
  const timeSlots = [
    '1:30 PM - 3:00 PM',
    '3:30 PM - 5:00 PM',
    '5:30 PM - 7:00 PM',
  ];
  const calculateTotal = (updatedService: string) => {
    if (updatedService === "Dental Consultation") return 50;
    if (updatedService === "Scaling") return 100;
    if (updatedService === "X-Ray") return 150;
    return 0;
  }

  const [updatedService, setUpdatedService] = useState(service);
  const [updatedDentist, setUpdatedDentist] = useState(dentistName);
  const [updatedDate, setUpdatedDate] = useState(new Date(bookingDate));
  const [updatedTimeSlot, setUpdatedTimeSlot] = useState(timeSlot);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const totalAmount = amount ? calculateTotal(updatedService) : 0;

  const handleUpdate = () => {
    fetch(`http://10.0.2.2:5000/api/bookings/${bookingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service: updatedService,
        dentistName: updatedDentist,
        bookingDate: updatedDate.toISOString().split('T')[0],
        timeSlot: updatedTimeSlot,
        amount: totalAmount,
        paymentMethod: paymentMethod
      })
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to update booking');
        return response.json();
      })
      .then(() => {
        Alert.alert('Success', 'Booking updated!');
        navigation.goBack();
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Failed to update booking.');
      });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Edit Booking</Text>

      {/* Service Selection */}
      <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Service</Text>
      <RadioButton.Group onValueChange={setUpdatedService} value={updatedService}>
        {services.map((s, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>{s}</Text>
            <RadioButton value={s} />
          </View>
        ))}
      </RadioButton.Group>

      {/* Dentist Selection */}
      <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Dentist</Text>
      <RadioButton.Group onValueChange={setUpdatedDentist} value={updatedDentist}>
        {dentists.map((d, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>{d}</Text>
            <RadioButton value={d} />
          </View>
        ))}
      </RadioButton.Group>

      {/* Date Picker */}
      <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Booking Date</Text>
      <Button
        title={updatedDate.toDateString()}
        color="#FF8F00"
        onPress={() => setShowDatePicker(true)}
      />
      {showDatePicker && (
        <DateTimePicker
          value={updatedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          minimumDate={new Date()}
          onChange={(_, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setUpdatedDate(selectedDate);
          }}
        />
      )}

      {/* Time Slot Selection */}
      <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Time Slot</Text>
      <RadioButton.Group onValueChange={setUpdatedTimeSlot} value={updatedTimeSlot}>
        {timeSlots.map((slot, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text>{slot}</Text>
            <RadioButton value={slot} />
          </View>
        ))}
      </RadioButton.Group>

      {/* Update Button */}
      <View style={{ marginTop: 20 }}>
        <Button title="Update Booking" onPress={handleUpdate} />
      </View>
    </View>
  );
};

export default BookingUpdateScreen;
