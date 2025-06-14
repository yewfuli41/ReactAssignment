import React, { useState, useEffect } from "react";
import { Alert, View, Text, TouchableNativeFeedback, Modal, TextInput } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styles } from "./StylesCollection";
import { Picker } from '@react-native-picker/picker';
import { handleRegister, dialingCode } from "./functions";
import SucessCreateAcc from "./SucessCreateAcc";
let SQLite = require('react-native-sqlite-storage');



const openCallback = () => {
  console.log('database open success');
}

const errorCallback = (err) => {
  console.error('Error in opening the database: ' + err);
}


const CreateAccount = ({ visible, close }) => {

  // db open
  let db = SQLite.openDatabase(
    { name: 'database.sqlite', createFromLocation: '~database.sqlite' },
    openCallback,
    errorCallback,
  )

  // use state block
  const [successModal, setSuccessModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedDialingCode, setSelectedDialingCode] = useState("+60"); //default is +60
  const [phoneNum, setPhoneNum] = useState();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    number: "",
    pwd: "",
    cpwd: ""
  });


  // use effect for error msg
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const formaterr = Object.values(errors).map((obj, ind) => `${ind + 1}: ${obj}`).join('\n'); // use map return array to display multi err
      Alert.alert("Error", formaterr);
    }
  }, [errors]);


  const handleSubmit = async() => {
    setPhoneNum(formData.number.replace(/\D/g, ''));
    const isValid = await handleRegister(
      formData.email,
      formData.name,
      phoneNum, // only digits (no dialing code, dialing code part to be handled when stored to db)
      formData.pwd,
      formData.cpwd,
      setErrors // direct update error state 
    );

    if (isValid) {
      try {
        //query is here
        db.transaction(tx => {
          tx.executeSql(
            'INSERT INTO users (name, dialingCode, phoneNumber, email, password) VALUES (?, ?, ?, ?, ?)',
            [formData.name, selectedDialingCode, phoneNum, formData.email, formData.pwd],
            () => {
              // succes call back operations
              setSuccessModal(true); // show success pop-up
              close();
              setFormData({ // reset input fields
                email: "",
                name: "",
                number: "",
                pwd: "",
                cpwd: ""
              });
              console.log("success add new user");
            },
            (error) => {
              //error callback
              Alert.alert('Error', 'Failed to create account: ' + error.message);
            }
          );
          tx.executeSql('SELECT * FROM users', [], (tx, results) => {
            console.log('Users:', results.rows.raw());
          });
        });
      } catch (error) {
        Alert.alert('Error', 'Failed to register user: ' + error.message);
      }
    }
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value })); // update changes using setForm data and spread op, can work
  };

  return (
    <View>
      <Modal
        visible={visible}
        onRequestClose={close}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { height: '85%' }]}>
            {/* close Button */}
            <TouchableNativeFeedback onPress={close}>
              <View style={styles.closeButton}>
                <AntDesign name="closecircleo" size={24} style={styles.closeButtonText} />
              </View>
            </TouchableNativeFeedback>

            {/* title */}
            <Text style={styles.modalTitle}>Register</Text>

            {/* email */}
            <TextInput
              style={styles.inputStyle}
              placeholder=" Email*"
              keyboardType="email-address"
              placeholderTextColor={"#15b5b0"}
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
            />


            {/* name */}
            <TextInput
              style={styles.inputStyle}
              placeholder=" Name (as per NRIC)*"
              placeholderTextColor={"#15b5b0"}
              value={formData.name}
              onChangeText={(text) => handleChange('name', text)}
            />


            {/* phone number */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View>
                <Picker
                  style={{ width: 140 }}
                  selectedValue={selectedDialingCode}
                  onValueChange={(itemValue) => setSelectedDialingCode(itemValue)}
                >
                  {dialingCode.map((item) => (
                    <Picker.Item
                      label={`${String(item.key)} ${String(item.value)}`}
                      value={String(item.value)}
                      key={String(item.key)}
                    />
                  ))}
                </Picker>
              </View>
              <TextInput
                style={[styles.inputStyle, { width: 210 }]}
                placeholder=" Mobile Number*"
                keyboardType="numeric"
                placeholderTextColor={"#15b5b0"}
                value={formData.number}
                onChangeText={(text) => handleChange('number', text)}
              />
            </View>


            {/* pwd */}
            <TextInput
              style={styles.inputStyle}
              placeholder=" Password"
              secureTextEntry={true}
              value={formData.pwd}
              onChangeText={(text) => handleChange('pwd', text)}
            />

            {/* confirm Password */}
            <TextInput
              style={styles.inputStyle}
              placeholder=" Confirm Password"
              secureTextEntry={true}
              value={formData.cpwd}
              onChangeText={(text) => handleChange('cpwd', text)}
            />


            {/* register button */}
            <TouchableNativeFeedback onPress={() => handleSubmit()}>
              <View style={styles.normalLoginButton}>
                <Text style={styles.WelcomeLoginButtonText}>Register</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <SucessCreateAcc
        visible={successModal}
        close={() => setSuccessModal(false)}
      />
    </View>
  );
};

export default CreateAccount;