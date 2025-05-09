import React, { useContext } from "react";
import { Text, View, Image, TouchableOpacity } from 'react-native';
import SwipeableScreen from "./SwipeNavigation";
import styles from "./styleSheet";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from "../context/ThemeContext";
import { DrawerActions, useNavigation } from "@react-navigation/native";

export const HomeScreen = () => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);
  return (<SwipeableScreen
    screenIndex={0}
    renderContent={() => (
      <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <TouchableOpacity
            style={{ alignSelf: 'flex-start', marginRight: 5, marginLeft: 5 }}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Ionicons name="menu" size={28} color={theme.textColor} />
          </TouchableOpacity><Text style={{ fontWeight: "bold", fontSize: 20, color: theme.textColor }}> Welcome To Pearl Dental Care</Text>
        </View>
        <Image
          source={require('../img/portrait-female-dentist.jpg')}
          style={{ width: '100%', height: 200, borderRadius: 10, marginTop: 10 }}
          resizeMode="cover"
        />
        <Text style={{
          fontSize: 16,
          color: theme.textColor,
          lineHeight: 22,
          marginBottom: 25,
          textAlign: 'center'
        }}>
          We provide gentle, professional dental care for the whole family
          {"\n"}From regular cleanings to cosmetic treatments
          {"\n"}Your smile is our top priority
        </Text>

        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: 10,
        }}>
          <View style={{
            width: '47%',
            backgroundColor: '#2ecec9',
            borderColor:theme.textColor,
            borderWidth:2,
            borderRadius: 10,
            padding: 15,
            marginBottom: 15,
            alignItems: 'center',
          }} >
            <Text style={{ fontSize: 28, textAlign:'center' }}>🦷</Text>
            <Text style={{ fontSize: 14, textAlign:'center', color:"white" }}>Certified Dentists</Text>
          </View>
          <View style={{
            width: '47%',
            backgroundColor: '#2ecec9',
            borderColor:theme.textColor,
            borderWidth:2,
            borderRadius: 10,
            padding: 15,
            marginBottom: 15,
            alignItems: 'center',
          }} >
            <Text style={{ fontSize: 28, textAlign:'center' }}>💙</Text>
            <Text style={{ fontSize: 14, textAlign:'center', color:"white" }}>Patient-Centered Care</Text>
          </View>
          <View style={{
            width: '47%',
            backgroundColor: '#2ecec9',
            borderColor:theme.textColor,
            borderWidth:2,
            borderRadius: 10,
            padding: 15,
            marginBottom: 15,
            alignItems: 'center',
          }} >
            <Text style={{ fontSize: 28, textAlign:'center' }}>🧼</Text>
            <Text style={{ fontSize: 14, textAlign:'center', color:"white" }}>Sterile Environment</Text>
          </View>
          <View style={{
            width: '47%',
            backgroundColor: '#2ecec9',
            borderColor:theme.textColor,
            borderWidth:2,
            borderRadius: 10,
            padding: 15,
            marginBottom: 15,
            alignItems: 'center',
          }} >
            <Text style={{ fontSize: 28, textAlign:'center' }}>⏱️</Text>
            <Text style={{ fontSize: 14, textAlign:'center', color:"white" }}>Easy Appointments</Text>
          </View>
        </View>
      </View>
    )} />
  )
}
