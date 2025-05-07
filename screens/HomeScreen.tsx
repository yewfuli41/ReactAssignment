import React, {useContext} from "react";
import { Text, View, TouchableOpacity } from 'react-native';
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
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <TouchableOpacity
            style={{ alignSelf: 'flex-start', marginRight: 5, marginLeft: 5 }}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Ionicons name="menu" size={28} color={theme.textColor} />
          </TouchableOpacity><Text style={{ fontWeight: "bold", fontSize: 20, color:theme.textColor }}> Welcome To Pearl Dental Care</Text>
        </View>
        <Text style={[styles.text, {color:theme.textColor}]}>100% Quality Assurance</Text>
        <Text style={[styles.text, {color:theme.textColor}]}>Some Certificates</Text>
      </View>
    )} />
  )
}
