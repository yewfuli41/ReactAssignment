import React from "react";
import{Text,View} from 'react-native';
import SwipeableScreen from "./SwipeNavigation";
import styles from "./styleSheet";

export const HomeScreen = () => 
(<SwipeableScreen 
  screenIndex={0}
  renderContent = {()=>(
    <View style={styles.container}>
    <Text style={{ fontWeight: "bold", fontSize:24}}>Welcome to Schneiderman Dental</Text>
    <Text style={styles.text}>100% Quality Assurance</Text>
    <Text style={styles.text}>Some Certificates</Text>
    </View>
  )}
/>);
