import React, { useState } from "react";
import { View, Text, TouchableNativeFeedback, Modal, TextInput } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { styles } from "./StylesCollection";
import { Picker } from '@react-native-picker/picker';
import { handleRegister } from "./functions";
import SucessCreateAcc from "./SucessCreateAcc";

const CreateAccount = ({ visible, close }) => {
  const [successModal, setSuccessModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedDialingCode, setSelectedDialingCode] = useState("+60");

  const dialingCode = [
    { key: "MY", value: "+60" },
    { key: "IDN", value: "+62" },
    { key: "PH", value: "+63" },
    { key: "SG", value: "+65" },
    { key: "TH", value: "+66" },
  ];

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    number: "",
    pwd: "",
    cpwd: ""
  });

  const handleSubmit = () => {
    const phoneDigits = formData.number.replace(/\D/g, ''); 
    const isValid = handleRegister(
      formData.email,
      formData.name,
      phoneDigits, // only digits (no dialing code)
      formData.pwd,
      formData.cpwd,
      setErrors
    );

    if (isValid) {
      setSuccessModal(true);
      close();
      setFormData({
        email: "",
        name: "",
        number: "",
        pwd: "",
        cpwd: ""
      });
    }
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <View>
      <Modal visible={visible} onRequestClose={close} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { height: '85%' }]}>
            {/* Close Button */}
            <TouchableNativeFeedback onPress={close}>
              <View style={styles.closeButton}>
                <AntDesign name="closecircleo" size={24} style={styles.closeButtonText}/>
              </View>
            </TouchableNativeFeedback>

            {/* Title */}
            <Text style={styles.modalTitle}>Register</Text>

            {/* Email */}
            <TextInput
              style={styles.inputStyle}
              placeholder="Email*"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            {/* Name */}
            <TextInput
              style={styles.inputStyle}
              placeholder="Name (as per NRIC)*"
              value={formData.name}
              onChangeText={(text) => handleChange('name', text)}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            {/* Phone Number */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ height: 50, width: 140 }}>
                <Picker
                  selectedValue={selectedDialingCode}
                  onValueChange={(itemValue) => setSelectedDialingCode(itemValue)}>
                  {dialingCode.map((item) => (
                    <Picker.Item 
                      label={`${item.key} ${item.value}`} 
                      value={item.value} 
                      key={item.key} 
                    />
                  ))}
                </Picker>
              </View>
              <TextInput
                style={[styles.inputStyle, { width: 210 }]}
                placeholder="Mobile Number*"
                keyboardType="numeric"
                value={formData.number}
                onChangeText={(text) => handleChange('number', text)}
              />
            </View>
            {errors.mobile && <Text style={styles.errorText}>{errors.mobile}</Text>}

            {/* Password */}
            <TextInput
              style={styles.inputStyle}
              placeholder="Password"
              secureTextEntry={true}
              value={formData.pwd}
              onChangeText={(text) => handleChange('pwd', text)}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            {/* Confirm Password */}
            <TextInput
              style={styles.inputStyle}
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={formData.cpwd}
              onChangeText={(text) => handleChange('cpwd', text)}
            />
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

            {/* Register Button */}
            <TouchableNativeFeedback onPress={handleSubmit}>
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