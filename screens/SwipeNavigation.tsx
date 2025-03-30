import React from "react";
import HomeScreen from "./HomeScreen";
import ServiceScreen from "./ServiceScreen";
import BookHistoryScreen from "./BookHistoryScreen";
import ProfileScreen from "./ProfileScreen";

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const SwipeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ServiceScreen" component={ServiceScreen} />
      <Stack.Screen name="BookHistoryScreen" component={BookHistoryScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
export default SwipeNavigator;