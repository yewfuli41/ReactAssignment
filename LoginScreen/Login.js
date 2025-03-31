import React, { useState, useEffect } from "react";
import {View,Text,TouchableNativeFeedback,Modal,TextInput, TouchableOpacity} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { styles } from "./StylesCollection";
import {authentication} from './functions';
import CreateAccount from "./CreateAccount";
import { useNavigation } from '@react-navigation/native'; 
import LoginSuccess from "./LoginSuccess";

const Login = ({ visible, close }) => {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState('');
const [successPopUp, setSuccessPopUp] = useState(false);
const [reg, setRegVisible] = useState(false);

const nav = useNavigation();

const handleLogin = () => {
  const isAuthenticated = authentication(email, password, setError);
  if (isAuthenticated) {
    setSuccessPopUp(true);
  }
};
    useEffect(() => {
      if (successPopUp) {
      const countTime = setTimeout(() => {
        setSuccessPopUp(false);  
        nav.navigate('Home'); // bring to homepage
      }, 2500); // display for 2.5 sec heh

      return () => clearTimeout(countTime);
      }
    }, [successPopUp]);

  return (
<Modal visible={visible} onRequestClose={close} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { height: "60%" }]}>

            {/** close button */}

            <TouchableNativeFeedback onPress={close} >
              <View><AntDesign name="closecircleo" style={styles.closeButtonText} /></View>
            </TouchableNativeFeedback>
            
            {/** Title */}
            <View>
              <Text style={styles.modalTitle}>Login</Text>
            </View>
            
            {/** input */}
            <View>
              <TextInput
                style={styles.inputStyle}
                placeholder=" Email"
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
             
            </View>
            
            <View>
              <TextInput
                style={styles.inputStyle}
                placeholder=" Password"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>

            {/** err msg area */}
            <View style={{ marginBottom: 10 }}>
            {error ? <Text style={{ color: 'red', fontSize: 18 }}>{error}</Text> : null}
            </View>

            {/** button */}
            <TouchableNativeFeedback onPress={()=>handleLogin()}>
            <View style={styles.normalLoginButton}>
                <Text style={styles.WelcomeLoginButtonText}>Login</Text>
            </View>
            </TouchableNativeFeedback>
            <LoginSuccess visible={successPopUp}/>

          {/**link to create account */}
          <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center", alignSelf:'center' }}>
              <Text style={{ color: "black", fontSize: 16 }}>No account?</Text>
              <TouchableOpacity onPress={() => setRegVisible(true)}>
                <View><Text style={{ color: "#15b5b0", fontSize: 18, fontWeight: "bold" }}> Register </Text></View>
              </TouchableOpacity>
              <Text style={{ color: "black", fontSize: 16 }}>here</Text>
              </View>
        <CreateAccount visible={reg} close={() => {setRegVisible(false); close();}} />

    </View>
    </View>
  </Modal>
  );
};

export default Login;
