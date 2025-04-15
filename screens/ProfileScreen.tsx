import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserProfileScreen from '../screens/UserProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import FAQScreen from '../screens/FAQScreen';
import HowToGoScreen from '../screens/HowToGoScreen';

import { RootStackParamList } from '../Types';
import SwipeableScreen from "./SwipeNavigation";
const Stack = createStackNavigator<RootStackParamList>();

const ProfileScreen = () => {
  return (
   
        <Stack.Navigator initialRouteName="UserProfile">
          <Stack.Screen
            name="UserProfile"
            component={UserProfileScreen}
            options={{ title: 'My Profile', headerShown:false }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{ title: 'Edit Profile' }}
          />
          <Stack.Screen
            name="FAQ"
            component={FAQScreen}
            options={{ title: 'FAQ' }}
          />
          <Stack.Screen
            name="HowToGo"
            component={HowToGoScreen}
            options={{ title: 'How To Go' }}
          />
        </Stack.Navigator>
    );
};

export default ProfileScreen;