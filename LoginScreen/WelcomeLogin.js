import React, { useState, useEffect } from "react";
import { View, ImageBackground, Image, TouchableNativeFeedback, Text, Alert, TextInput, Button } from "react-native";
import { styles } from "./StylesCollection";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import onGoogleButtonPress from './GoogleLogin';
let SQLite = require('react-native-sqlite-storage');

import AntDesign from 'react-native-vector-icons/AntDesign';

const openCallback = () => {
    console.log('database open success');
}

const errorCallback = (err) => {
    console.error('Error in opening the database: ' + err);
}

const WelcomeLogin = () => {

    async function OnGoogleButtonPress() {
        onGoogleButtonPress().then(data=>{
            console.log('user data: ' , data);
        });
        
    }
    /**
     * will be back from debugging
     *   // db open 
     *  let db = SQLite.openDatabase(
        { name: 'database.sqlite', createFromLocation: '~database.sqlite' },
        openCallback,
        errorCallback,
    );
     */
  
   

    // use state
    const [isLoginVisible, setLoginVisible] = useState(false);
    const [isCreateAccountVisible, setCreateAccountVisible] = useState(false);
    const [phoneModalVisible, setPhoneModalVisible] = useState(false);
    const [dialingCodeModalVisible, setDialingCodeModalVisible] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dialingCode, setDialingCode] = useState('');
    //const [resolvePhone, setResolvePhone] = useState(null);
   // const [resolveDialingCode, setResolveDialingCode] = useState(null);

    
    return (
        <View>

            <ImageBackground source={{uri:"https://images.pexels.com/photos/4269695/pexels-photo-4269695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}} style={styles.backimg} />

            <View>
                <Image source={require('../img/Pink_Y2k_Flower_Cute_Streetwear_Logo-removebg-preview.png')} style={styles.logo} />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableNativeFeedback onPress={() => setCreateAccountVisible(true)}>
                    <View style={styles.createAccButtonContainer}>
                        <Text style={styles.createButtonText}>Create Account</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>

            <TouchableNativeFeedback onPress={() => setLoginVisible(true)}>
                <View style={styles.WelcomeLoginButtonContainer}>
                    <Text style={styles.WelcomeLoginButtonText}>Login</Text>
                </View>
            </TouchableNativeFeedback>

            {/* Login Modal */}
            <Login visible={isLoginVisible} close={() => setLoginVisible(false)} />

                {/* 2 view */}
            <CreateAccount visible={isCreateAccountVisible} close={() => setCreateAccountVisible(false)} />

            <TouchableNativeFeedback onPress={() => OnGoogleButtonPress()}>
                <AntDesign name="google" size={50} style={styles.googleLogin} />
            </TouchableNativeFeedback>

            {/* Phone Number Modal */}
            {phoneModalVisible && (
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Enter your phone number</Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Phone Number"
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                    <Button title="Submit" onPress={handlePhoneSubmit} />
                </View>
            )}

            {/* Dialing Code Modal */}
            {dialingCodeModalVisible && (
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Enter your dialing code</Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Dialing Code"
                        keyboardType="number-pad"
                        value={dialingCode}
                        onChangeText={setDialingCode}
                    />
                    <Button title="Submit" onPress={handleDialingCodeSubmit} />
                </View>
            )}

        
        </View>
    );
};

export default WelcomeLogin;