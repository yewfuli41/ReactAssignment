import React from 'react';
import { Modal, View, Text, TouchableNativeFeedback, StyleSheet } from 'react-native';
import { styles } from "./StylesCollection";
import AntDesign from 'react-native-vector-icons/AntDesign';

const SuccessModal = ({ visible, close }) => {
    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <View style={styles.successOverlay}>
            <   View style={[styles.successContainer, { height: 200, alignItems: 'center', justifyContent: 'center' }]}>
                
                    {/* Close Button */}
                    <TouchableNativeFeedback onPress={close}>
                    <View style={{ position: 'absolute',  top: 10, right: 10, zIndex: 10,}}>
                        <AntDesign name="closecircleo" style={{ fontSize: 24, color: "black" }} />
                    </View>
                    </TouchableNativeFeedback>
                    
                    <AntDesign name="checkcircle" style={{ color: "green", fontSize: 50, alignSelf: 'center' }} />
                    <Text style={styles.successText}>Registration Successful!</Text>

                </View>
            </View>
        </Modal>
    );
};
export default SuccessModal;
