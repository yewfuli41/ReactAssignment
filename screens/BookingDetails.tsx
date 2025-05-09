import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, Alert, Platform, TouchableOpacity } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../Types';
import styles from "./styleSheet";
import { RadioButton } from "react-native-paper";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
type Props = StackScreenProps<RootStackParamList, 'BookingDetails'>;
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from "../context/ThemeContext";

const App = ({ route, navigation }: Props) => {
  const options = [
    { id: 1, name: "Dr Lee Wei", speciality: "Speciality: General Dentistry, Cosmetic Dentistry", experience:"Experience: 12 years" },
    { id: 2, name: "Dr Micheal Thompson", speciality: "Speciality: Orthodontics, Pediatric Dentistry", experience: "Experience: 8 years" },
    { id: 3, name: "Dr Muhammad Faizal Ismail", speciality: "Speciality: Endodontics, Root Canal Therapy", experience: "Experience: 9 years" },
  ];
  const [dentist, setDentist] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<"selectService" | "selectDentist" | "selectDateTime">("selectService");
  const [date, setDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [holidays, setHolidays] = useState<string[]>([]); // holiday checking
  const {theme} = useContext(ThemeContext);

  const timeSlots = [
    { id: 1, startTime: "1:30 PM", endTime: "3:00 PM" },
    { id: 2, startTime: "3:30 PM", endTime: "5:00 PM" },
    { id: 3, startTime: "5:30 PM", endTime: "7:00 PM" }
  ]
  const buttons = [{ title: "Dental Consultation", description: "Routine check-ups or specific dental concerns. "},
  { title: "Scaling", description: "Removing plaque and tartar build-up" },
  { title: "X-Ray", description: "Advanced imaging technique to view oral environment" },
  ]
  const isoDate = date.toISOString().split("T")[0]
  const handleDateChange = (event: any, selectedDate?: Date) => {
  setShowPicker(false);
  if (selectedDate) {
    const today = new Date();
    const selectedIsoDate = selectedDate.toISOString().split("T")[0]; // Format selected date to YYYY-MM-DD

    // Check if the selected date is in the past
    if (selectedDate < today) {
      Alert.alert("Invalid Date", "You cannot select a date before today.");
      setDate(today); // Optionally reset to today's date
    } 
    // Check if the selected date is a holiday
    else if (holidays.includes(selectedIsoDate)) {
      Alert.alert("Holiday", "The selected date is a public holiday. Please choose another date.");
      setDate(today); // Optionally reset to today's date or another default
      console.log("Selected ISO date:", selectedIsoDate, "Is holiday?", holidays.includes(selectedIsoDate));
    } 
    // Valid date that is not a holiday
    else {
      setDate(selectedDate);
    }}
  };

  useEffect(() => {
  const fetchHolidays = async () => {
    try {
    const response = await fetch("https://openholidaysapi.org/PublicHolidays?countryIsoCode=DE&languageIsoCode=EN&validFrom=2024-01-01&validTo=2024-12-31");
    const data = await response.json();
    console.log("Fetched holidays:", data);

    if (Array.isArray(data)) {
      const holidayDates = data.map(holiday => holiday.startDate);
      console.log("Holiday startDates:", holidayDates);
      setHolidays(holidayDates);  // Make sure to use this correctly
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    console.error("Failed to fetch holidays:", error);
  }
  };

  fetchHolidays();
  }, []);

  return (
    <>
      {currentStep === "selectService" && (
        <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', position: 'relative' }}>
            <TouchableOpacity
              style={{ position: 'absolute', left: -9, alignSelf: 'center' }}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
              <Ionicons name="menu" size={28} color={theme.textColor} />
            </TouchableOpacity><Text style={{ fontWeight: "bold", fontSize: 24, color:theme.textColor }}> Services</Text>
          </View>
          {buttons.map((button, index) => (
            <View key={index}>

              <Text style={[styles.cardTitle, { color: theme.textColor }]}>{button.title}</Text>
              <Text style={[styles.cardDescription, { color: theme.textColor }]}>{button.description}</Text>
              
                <TouchableOpacity
                    style={[styles.bookNowButton, { backgroundColor: '#FF8F00' }]}
                    onPress={() => {
                      setService(button.title);
                      setCurrentStep("selectDentist");
                    }}
                    activeOpacity={0.9}
                  >
                    <Text style={styles.bookNowButtonText}>Book Now</Text>
                </TouchableOpacity>

            </View>))}
        </View>
      )

      }
      {currentStep === "selectDentist" && (
        <View>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', position: 'relative', marginTop: 10 }}>
              <TouchableOpacity
                style={{ position: 'absolute', left: 12, alignSelf: 'center' }}
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                <Ionicons name="menu" size={28} color={theme.textColor} />
              </TouchableOpacity><Text style={{ fontWeight: "bold", fontSize: 24 }}> Choose Doctor</Text>
            </View>
            <RadioButton.Group onValueChange={(value) => setDentist(value)} value={dentist}>
              {options.map((option) => (
                <View key={option.id} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10 }}>
                  <View style={{ flexDirection: "column" }}>
                    <Text>{option.name}</Text>
                    <Text>{option.speciality}</Text>
                    <Text>{option.experience}</Text>
                  </View>
                  <RadioButton value={option.name} />
                </View>
              ))}
            </RadioButton.Group>
            <View style={styles.buttonRow}>
              <View style={styles.backButton} >
                <Button title="Back" onPress={() => setCurrentStep("selectService")} />
              </View>
              <View style={styles.nextButton}>
                <Button
                  title="Next"
                  onPress={() => {
                    if (dentist) {
                      setCurrentStep("selectDateTime");
                    } else {
                      Alert.alert("Please select a dentist first.");
                    }
                  }}
                />
              </View>
            </View>
          </View>
        </View>)}
      {currentStep === "selectDateTime" && (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', position: 'relative', marginTop: 10 }}>
            <TouchableOpacity
              style={{ position: 'absolute', left: 12, alignSelf: 'center' }}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
              <Ionicons name="menu" size={28} color="black" />
            </TouchableOpacity><Text style={{ fontWeight: "bold", fontSize: 24 }}> Choose Date and Time</Text>
          </View>
          <View>
            <Text style={styles.text}>Date: {date.toLocaleDateString("en-CA")}</Text>
            <View style={[styles.nextButton, { alignSelf: 'center' }]}>
              <Button
                title="Pick Date"
                onPress={() => { setShowPicker(true); }}
                color="#FF8F00"
              />
            </View>
          </View>
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
          <Text style={styles.title}>Time Slots:</Text>
          <RadioButton.Group onValueChange={(value) => setSelectedTimeSlot(value)} value={selectedTimeSlot}>
            {timeSlots.map((option) => (
              <View key={option.id} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10 }}>
                <View style={{ flexDirection: "column" }}>
                  <Text>{option.startTime}-{option.endTime}</Text>
                </View>
                <RadioButton value={`${option.startTime}-${option.endTime}`} />
              </View>
            ))}
          </RadioButton.Group>
          <View style={styles.buttonRow}>
            <View style={[styles.backButton]}>
              <Button
                title="Back"
                onPress={() =>
                  setCurrentStep("selectDentist")
                }
              />
            </View>
            <View style={[styles.nextButton]}>
              <Button
                title="Next"
                onPress={() => {
                  if (date && selectedTimeSlot) {
                    navigation.navigate("BookingConfirm", {
                      serviceName: service,
                      dentistName: dentist,
                      appointmentDate: isoDate,
                      timeSlot: selectedTimeSlot,
                      calculateTotal: (service) => {
                        if (service === "Dental Consultation") return 50;
                        if (service === "Scaling") return 100;
                        if (service === "X-Ray") return 150;
                        return 0;
                      }

                    })
                  }
                  else if (date) {
                    Alert.alert("Please select a time slot!");
                  }
                  else {
                    Alert.alert("Please pick a date!");
                  }
                }
                }
              />
            </View>
          </View>
        </>
      )}
    </>
  );
}

export default App;