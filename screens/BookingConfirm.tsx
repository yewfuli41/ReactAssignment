import React,{useState} from 'react';
import { View, Text, Button,Alert} from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../Types'; 
import styles from './styleSheet';
import { RadioButton } from "react-native-paper";
export type Props = StackScreenProps<RootStackParamList, 'BookingConfirm'>;

const App = ( { route, navigation}: Props ) => {
    const paymentMethods=[
        {id:1,method:'Online Banking'},
        {id:2,method:'Credit/Debit Card'},
        {id:3,method:'E-wallet'},
        {id:4,method:'Pay cash in counter'}
    ];
    const [paymentMethod,setPaymentMethod]=useState<string>("");
    const { serviceName, dentistName, appointmentDate,timeSlot,calculateTotal} = route.params;
    const user ={name:"Yew",phone:"0111213141"}
    const totalAmount = calculateTotal?calculateTotal(serviceName):0;
    return (
    <View>
    <View style={styles.container}>
      <Text style={styles.title}>Booking Confirmation</Text>
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
            <View style={{flexDirection:"column"}}>
            <Text>{option.method}</Text>
            </View>
            <RadioButton value={option.method} />
          </View>
        ))}
      </RadioButton.Group>
        <View style={[styles.buttonRow]}>
        <View style={styles.backButton}>
        <Button title="Back" onPress={()=>navigation.goBack()}/>
        </View>
        <View style={styles.nextButton}>
        <Button title="Book Now" color='#FF8F00' onPress={()=>{
        Alert.alert("","Booking Successfully!",[
      {
        text: "OK",
        onPress: () => {
          // Reset the navigation stack and navigate to the home screen
          navigation.reset({
            index: 0,
            routes: [{ name: "BookingHome" }], // Replace "BookingHome" with your home screen route name
          });
        },
      },
    ])}}/>
        </View>
        </View>
    </View>
  );
       

}
export default App;