import React from "react";
import{Text} from 'react-native';
import SwipeableScreen from "./SwipeNavigation";
import styles from "./styleSheet";

export const ProfileScreen = () => 
(<SwipeableScreen 
  screenIndex={3}
  renderContent = {()=>(
    <>
    <Text style={styles.text}>Profile</Text>
    </>
  )}
   />);