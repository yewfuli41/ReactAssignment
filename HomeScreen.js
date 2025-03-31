import React, { useEffect, useState} from "react";
import {View,Text, TouchableNativeFeedback} from 'react-native';
import {styles} from "./LoginScreen/StylesCollection";
import LogoutPopUp from './LoginScreen/LogoutPopUp';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native'; 


const HomeScreen=()=>{
     const [logoutPop, setlogoutPopVisible] = useState(false);
     const nav = useNavigation();
    return(
        <View>
            <Text>This is home screen demo.</Text>
                            <View style={styles.normalLoginButton}>
                                <TouchableNativeFeedback onPress={ ()=> setlogoutPopVisible(true)} > 
                                    <View> 
                                        <Text style={styles.WelcomeLoginButtonText}>Logout Example</Text>
                                    </View>
                                    </TouchableNativeFeedback>
                                </View>
                                <LogoutPopUp  visible={logoutPop} close={() => setlogoutPopVisible(false)}/>
                                <View>
                                <Text>This is a chat demo.</Text>
                                <TouchableNativeFeedback onPress={ ()=> nav.navigate('Chat')} > 
                                <Ionicons name="chatbox-ellipses-outline" style={[{color:'#15b5b0',fontSize:50}]}/>
                                </TouchableNativeFeedback>
                                </View>
        </View>
    );
}
export default HomeScreen;