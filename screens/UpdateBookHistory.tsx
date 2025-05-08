import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, Platform, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../Types';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RadioButton } from 'react-native-paper';
import { paymentMethods } from './paymentMethods'; 

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
  // toggle payment pop ups after user confirm update
  const [modalVisible, setModalVisible] = useState(false);

  // set updated values
  const [updatedService, setUpdatedService] = useState(service);
  const [updatedDentist, setUpdatedDentist] = useState(dentistName);
  const [updatedDate, setUpdatedDate] = useState(new Date(bookingDate));
  const [updatedTimeSlot, setUpdatedTimeSlot] = useState(timeSlot);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethod);
  const [tempSelectedPaymentMethod, setTempSelectedPaymentMethod] = useState(paymentMethod);
  const [hasServiceChanged, setHasServiceChanged] = useState(false);
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
        paymentMethod: selectedPaymentMethod
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

  useEffect(() => {
    if (modalVisible) {
      setTempSelectedPaymentMethod(selectedPaymentMethod);
    }
  }, [modalVisible]);

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
      
      {/* Payment pop up after change of services*/}
      <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Choose Payment Method</Text>
          <RadioButton.Group
            onValueChange={(value) => setTempSelectedPaymentMethod(value)}
            value={tempSelectedPaymentMethod}
          >
            {paymentMethods.map((method) => (
              <View key={method.id} style={styles.radioRow}>
                <Text>{method.method}</Text>
                <RadioButton value={method.method} />
              </View>
            ))}
          </RadioButton.Group>

          <View style={{ marginTop: 10 }}>
            <Button
              title="Confirm"
              color="#4CAF50"
              onPress={() => {
                setSelectedPaymentMethod(tempSelectedPaymentMethod);
                setModalVisible(false);
                handleUpdate(); // <--- Call update here
              }}
            />
            <View style={{ height: 10 }} />
            <Button
              title="Cancel"
              color="red"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </View>
    </Modal>

      {/* Update Button */}
    <View style={{ marginTop: 20 }}>
    <Button
    title="Update Booking"
    onPress={() => {
        if (updatedService != service) {
          // Prompt user to confirm payment if service changed
          setModalVisible(true);
        } else {
          handleUpdate(); // Proceed directly
        }}}
      />
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  selectBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.13)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    elevation: 5
  },
  radioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center'
  }
});

export default BookingUpdateScreen;
