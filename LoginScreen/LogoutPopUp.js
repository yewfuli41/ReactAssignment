import React, { useState } from "react";
import {View, Text,TouchableNativeFeedback, Modal} from 'react-native';
import { styles } from "./StylesCollection";
import { useNavigation } from '@react-navigation/native'; 



const Logout= ({visible, close})=>{
    const navigation = useNavigation();
    return(
       
                <Modal visible={visible} transparent={true} animationType="fade">
                    <View style={styles.successOverlay}>
                        <View style={styles.successContainer}>
                            <Text style={styles.successText}>Log Out Now?</Text>
                            <View style={[{flexDirection: 'row'}]}>
                            <TouchableNativeFeedback onPress={close}>
                                <View>
                                <Text style={styles.logoutPopUpButton}>No</Text>
                                </View>
                                    
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback onPress={()=>navigation.replace('Preview')}>
                                <View>
                                <Text style={[styles.logoutPopUpButton,{color:'red'}]}>Yes</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                        </View>
                    </View>
                </Modal>
            );
        };

export default React.memo(Logout);