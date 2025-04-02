import React from "react";
import SwipeableScreen from "./SwipeNavigation";
import { RootStackParamList } from '../Types'; 
import BookingDetails  from './BookingDetails';
import { createStackNavigator } from '@react-navigation/stack';
import BookingConfirm from './BookingConfirm';


const Stack = createStackNavigator<RootStackParamList>();
const ServiceScreen = () => 
{
    return(
        <SwipeableScreen
        screenIndex={1} // Index for the "Service" tab
        renderContent={() => (
            <Stack.Navigator initialRouteName="BookingDetails" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="BookingDetails" component={BookingDetails} />
                <Stack.Screen name="BookingConfirm" component={BookingConfirm} />
            </Stack.Navigator>)}
    />
    )
};

export default ServiceScreen;