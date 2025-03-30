import React from "react";
import{Text} from 'react-native';
import SwipeableScreen from "./SwipeNavigation";

import styles from "./styleSheet";

export const BookHistoryScreen = () => 
(<SwipeableScreen 
  screenIndex={2}
  renderContent = {()=>(

    <>
    <Text style={styles.text}>Booking History</Text>
    </>
  )}
   />);