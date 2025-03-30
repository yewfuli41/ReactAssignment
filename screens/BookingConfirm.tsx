import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../Types'; 
import styles from './styleSheet';
export type Props = StackScreenProps<RootStackParamList, 'BookingConfirm'>;

const App = ( { route, navigation}: Props ) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Second Screen</Text>
        </View>
    );

}
export default App;