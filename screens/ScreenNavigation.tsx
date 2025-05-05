import React, { useState, useContext } from 'react';
import SwipeableScreen from './SwipeNavigation';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, } from "@react-navigation/drawer";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './HomeScreen';
import ServiceScreen from './ServiceScreen';
import { BookHistoryScreen } from './BookHistoryScreen';
import ProfileScreen from './ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Alert, LogBox, Switch } from 'react-native';
LogBox.ignoreLogs(['EventEmitter.removeListener']);
LogBox.ignoreLogs([
  "The action 'NAVIGATE' with payload", // Ignore navigation warnings
  "Do you have a screen named", // Ignore duplicate name warning
  "Home, Home > Home",  // Ignore duplicate screen name warning
]);
import { RootStackParamList } from '../Types';
import BookingDetails from './BookingDetails';
import BookingConfirm from './BookingConfirm';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ChatScreen from '../ChatFeature/ChatScreen';
import { TouchableOpacity, Text, View, ImageBackground, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import UserProfileScreen from './UserProfileScreen';
import EditProfileScreen from "./EditProfileScreen";
import HowToGoScreen from "./HowToGoScreen";
import FAQscreen from "./FAQScreen";
import { useUser } from '../context/UserContext';
import style from './styleSheet';
import { ThemeContext, ThemeProvider } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();


const MyDrawerComponent = (props: any) => {

  const { userData } = useUser();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { resetTheme } = useContext(ThemeContext);
  const isDark = theme.backgroundColor === '#000000';

  return (
    <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: theme.backgroundColor }}>
        <ImageBackground source={require('../img/pexels-photo-6502307.webp')} style={style.profileBackground}>
          <TouchableOpacity onPress={() => props.navigation.navigate('UserProfile')}>
          <Image
            style={style.profileImage}
            source={require('../img/pexels-photo-6502307.webp')}
          />
          </TouchableOpacity>
          <Text style={[style.profileName, { color: theme.textColor }]}>
            {userData.name}
          </Text>
        </ImageBackground>

        <View style={[style.drawerItemsContainer]}>
          <DrawerItemList {...props} />
        </View>

        <View style={style.themeSwitcher}>
          <Text style={{ color: theme.textColor, fontSize: 15 }}>Dark mode</Text>
          <Switch value={isDark} onValueChange={toggleTheme} />
        </View>

        <TouchableOpacity
          style={{ padding: 15 }}
          onPress={() => {
            resetTheme();
            Alert.alert('Theme Reset', 'Theme has been reset to default.');
          }}
        >      
            <Text style={{ color: theme.textColor }}>Reset Theme</Text>
        </TouchableOpacity>

      </DrawerContentScrollView>

      <View style={style.footer}>

        <TouchableOpacity style={{ paddingVertical: 10 }} onPress={() => {
          Alert.alert(
            'Bye',
            'You have been logged out.',
            [{ text: 'OK', onPress: () => props.navigation.navigate('Preview') }]);
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="exit-outline" size={20} color={theme.textColor} />
            <Text style={{ marginLeft: 10, fontSize: 15, color: theme.textColor }}>Log out</Text>
          </View>
        </TouchableOpacity>

      </View>
    </View>
  );
};





function MainTabs() {
  const { theme } = useContext(ThemeContext);
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarActiveBackgroundColor: 'pink',
        tabBarInactiveBackgroundColor: theme.backgroundColor,
        tabBarLabelStyle: {
          fontSize: 16,
          color: theme.textColor,
        },
        tabBarStyle: {
          backgroundColor: 'lightgrey',
          borderRadius: 50
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return <Ionicons name="home" size={25} color={'orange'} />;
          },
        }}
      />
      <Tab.Screen
        name="Service"
        component={ServiceScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return <Ionicons name="medkit" size={25} color={'orange'} />;
          },
        }}
      />
      <Tab.Screen
        name="Booking History"
        component={BookHistoryScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return <Ionicons name="calendar" size={25} color={'orange'} />;
          },
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen as any}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return <Ionicons name="chatbox-ellipses" size={25} color={'orange'} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}


const NavigationScreen = () => {

  const { theme } = useContext(ThemeContext);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <Drawer.Navigator
        drawerContent={props => <MyDrawerComponent {...props} />}
        screenOptions={{
          drawerActiveTintColor: theme.textColor,
          drawerActiveBackgroundColor: '#15b5b0',
          drawerLabelStyle: { marginLeft: 0 },
          headerShown: false,
          headerTintColor: 'red',
        }}
      >
        <Drawer.Screen
         name="UserProfile"
         component={UserProfileScreen}
        />
        <Drawer.Screen
          name="Main"
          component={MainTabs}
          options={{ drawerLabel: 'Home' }}
        />
        <Drawer.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{ drawerLabel: 'Edit Profile' }}

        />
        <Drawer.Screen
          name='FAQ'
          component={FAQscreen}
          options={{ drawerLabel: 'FAQ' }}
        />
        <Drawer.Screen
          name="HowToGo"
          component={HowToGoScreen}
          options={{ drawerLabel: 'How To Go' }}
        />
      </Drawer.Navigator>

    </GestureHandlerRootView>
  );
};

export default NavigationScreen;