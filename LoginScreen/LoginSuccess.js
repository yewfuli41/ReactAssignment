import React from 'react';
import { Modal, View, Text} from 'react-native';
import { styles } from "./StylesCollection";
import AntDesign from 'react-native-vector-icons/AntDesign';

const LoginSuccess = ({visible}) => {

    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <View style={styles.successOverlay}>
                <View style={[styles.successContainer, { height: 200, 
    flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}]}>
                    <AntDesign name="checkcircle"style={[{color:"green", fontSize:50, alignSelf:'center'}]}/>
                    <View>
                    <Text style={styles.successText}>Login Successful!</Text>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
export default LoginSuccess;
