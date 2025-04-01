import React from "react";
import{View,Text,Button} from 'react-native';
import SwipeableScreen from "./SwipeNavigation";
import styles from "./styleSheet";
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../Types'; 
import BookingDetails  from './BookingDetails';

type Props = StackScreenProps<RootStackParamList, 'BookingHome'>;

const buttons=[ { title: "Dental Consultation",description:"some description" },
    { title: "Scaling", description:"some description"},
    { title: "X-Ray", description:"some description"},
]

const ServiceScreen = ({navigation}: Props) => 
(<View style={styles.container}>
    <Text style={[styles.title]}>Services</Text>
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