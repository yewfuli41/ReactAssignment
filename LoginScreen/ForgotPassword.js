import React from "react";
import {Alert,View, Text,TouchableOpacity,TouchableNativeFeedback, Modal, Button, TextInput} from 'react-native';
import { styles } from "./StylesCollection";
import AntDesign from 'react-native-vector-icons/AntDesign';


/**
7 components in this page: 
1. close button
2.FP title
3. email text input
5. reset button
*/

const ForgotPassword = ({ visible, close }) => {
    return (

         <Modal  visible={visible} onRequestClose={close} animationType="slide" transparent={true}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer.height='30%'}>
                    {/**close button */}
               
                    <TouchableNativeFeedback onPress={close}> 
                        <View> <AntDesign name="closecircleo"style={styles.closeButtonText}/></View>

                    </TouchableNativeFeedback>
                    
                    {/**title */}
                    <View><Text style={styles.modalTitle}>Reset Password</Text></View>
                   
                   {/**input */}
                    <View>
                        <TextInput style={styles.inputStyle} placeholder=" Email" keyboardType="email-address" />
                        <Text>A OTP Code will be sent through this email.</Text>
                    </View>
                    
                    {/**send OTP code button */}
                 
                    <TouchableNativeFeedback> 
                    <View style={styles.normalLoginButton}>
                     <Text style={styles.WelcomeLoginButtonText}>Send Code</Text> </View>
                     </TouchableNativeFeedback>
                   

                    

                </View>
            </View>
        </Modal>

    );
}
export default ForgotPassword;
