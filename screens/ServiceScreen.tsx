import React from "react";
import{View,Text,Button, TouchableOpacity} from 'react-native';
import SwipeableScreen from "./SwipeNavigation";
import styles from "./styleSheet";
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../Types'; 
import BookingDetails  from './BookingDetails';
import Ionicons from "react-native-vector-icons/Ionicons";
import { DrawerActions } from "@react-navigation/native";

type Props = StackScreenProps<RootStackParamList, 'BookingHome'>;

const buttons=[ { title: "Dental Consultation",description:"some description" },
    { title: "Scaling", description:"some description"},
    { title: "X-Ray", description:"some description"},
]

const ServiceScreen = ({navigation}: Props) => 
(<View style={styles.container}>
    <View style={{flexDirection: 'row',  alignItems: 'center', justifyContent: 'center',  width: '100%', position: 'relative' }}>
                       <TouchableOpacity 
                       style={{  position: 'absolute', left: -9, alignSelf: 'center' }} 
                           onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                               <Ionicons name="menu" size={28} color="black" />
                   </TouchableOpacity><Text style={{ fontWeight: "bold", fontSize:24}}> Services</Text>
    </View>
    {buttons.map((button,index) =>(
    <View key={index}>
        <Text>{button.title}</Text>
        <Text>{button.description}</Text>
        <Button
            color='#FF8F00'
            title="Book Now"
            onPress={() => {
                navigation.navigate("BookingDetails",{serviceName:button.title,
                calculateTotal: (serviceName) => {
                    if (serviceName === "Dental Consultation") return 50;
                    if (serviceName === "Scaling") return 100;
                    if (serviceName === "X-Ray") return 150;
                    return 0;
                  }})}
            }
        />
    </View>))}
  </View>
);

export default ServiceScreen;