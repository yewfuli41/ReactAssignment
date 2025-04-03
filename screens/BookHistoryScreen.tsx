import React from "react";
import{Text, TouchableOpacity, View} from 'react-native';
import SwipeableScreen from "./SwipeNavigation";
import styles from "./styleSheet";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
export const BookHistoryScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
    <View style={{flexDirection: 'row',  alignItems: 'center', justifyContent: 'center',  width: '100%', position: 'relative' }}>
                       <TouchableOpacity 
                       style={{  position: 'absolute', left: -9, alignSelf: 'center' }} 
                           onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                               <Ionicons name="menu" size={28} color="black" />
                   </TouchableOpacity><Text style={{ fontWeight: "bold", fontSize:24}}> Booking History</Text>
    </View>
    </View>
  
    
    );
};