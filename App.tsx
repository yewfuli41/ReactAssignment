/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Button, Text, View } from 'react-native';
import SwipeableScreen from './screens/SwipeNavigation';
import { NavigationContainer } from '@react-navigation/native';
import{createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from './screens/HomeScreen';
import ServiceScreen from './screens/ServiceScreen';
import {BookHistoryScreen} from './screens/BookHistoryScreen';
import {ProfileScreen} from './screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LogBox} from 'react-native';
LogBox.ignoreLogs (['EventEmitter.removeListener']);
import { RootStackParamList } from './Types';
import BookingDetails from './screens/BookingDetails';
import BookingConfirm from './screens/BookingConfirm';
import { GestureHandlerRootView } from "react-native-gesture-handler";
const Tab = createBottomTabNavigator ();
const Stack = createStackNavigator<RootStackParamList>();
function ServiceStack() {
    return (
      <SwipeableScreen
      screenIndex={1} // Index for the "Service" tab
      renderContent={() => (
        <Stack.Navigator initialRouteName="BookingHome"  screenOptions={{ headerShown: false }}>
          <Stack.Screen name="BookingHome" component={ServiceScreen}/>
          <Stack.Screen name="BookingDetails" component={BookingDetails}/>
          <Stack.Screen name="BookingConfirm" component={BookingConfirm}/>
        </Stack.Navigator>)}
      />
    );
  }
const App = () =>{
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
     
      <Tab.Navigator
        initialRouteName={'Home'}
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
          tabBarActiveBackgroundColor: 'pink',
          tabBarInactiveBackgroundColor: 'white',
          tabBarLabelStyle: {
            fontSize: 22,
          },
          tabBarStyle: {
          backgroundColor: 'lightgrey',
          borderRadius:50
        },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown:false,
            tabBarIcon: () => {
              return <Ionicons name="home" size={20} color={'red'} />;
            },
          }}
        />
        <Tab.Screen
          name="Service"
          component={ServiceStack}
          options={{
            headerShown:false,
            tabBarIcon: () => {
              return <Ionicons name="medkit" size={20} color={'red'} />;
            },
          }}
        />
        <Tab.Screen
          name="Booking History"
          component={BookHistoryScreen}
          options={{
            headerShown:false,
            tabBarIcon: () => {
              return <Ionicons name="calendar" size={20} color={'blue'} />;
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown:false,
            tabBarIcon: () => {
              return <Ionicons name="person" size={20} color={'blue'} />;
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}
export default App;

 




