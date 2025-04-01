import React from "react";
import{View,Text,Button} from 'react-native';
import SwipeableScreen from "./SwipeNavigation";
import styles from "./styleSheet";
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../Types'; 
import BookingDetails  from './BookingDetails';

type Props = StackScreenProps<RootStackParamList, 'BookingHome'>;

const buttons=[ { title: "Dental Consultation",description:"some description", target: 'BookingDetails' },
    { title: "Scaling", description:"some description",target: 'BookingDetails' },
    { title: "X-Ray", description:"some description",target: 'BookingDetails' },]
    
const ServiceScreen = ({navigation}: Props) => 
(<View style={styles.container}>
    <Text style={[styles.text,{fontWeight:'bold'}]}>Services</Text>
    {buttons.map((button,index) =>(
    <View key={index}>
        <Text>{button.title}</Text>
        <Text>{button.description}</Text>
        <Button
            color='#FF8F00'
            title="Book Now"
            onPress={() => 
                navigation.navigate(button.target as "BookingDetails")
            }
        />
    </View>))}
  </View>
);

export default ServiceScreen;