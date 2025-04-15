import React from "react";
import { Text, View, TouchableOpacity } from 'react-native';
import SwipeableScreen from "./SwipeNavigation";
import styles from "./styleSheet";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerActions, useNavigation } from "@react-navigation/native";
export const HomeScreen = () => {
  const navigation = useNavigation();
  return (<SwipeableScreen
    screenIndex={0}
    renderContent={() => (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <TouchableOpacity
            style={{ alignSelf: 'flex-start', marginRight: 5, marginLeft: 5 }}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Ionicons name="menu" size={28} color="black" />
          </TouchableOpacity><Text style={{ fontWeight: "bold", fontSize: 24 }}> Welcome To Pearl Dental Care</Text>
        </View>
        <Text style={styles.text}>100% Quality Assurance</Text>
        <Text style={styles.text}>Some Certificates</Text>
      </View>
    )} />
  )
}
