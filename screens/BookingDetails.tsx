import React from 'react';
import { View, Text, Button} from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../Types'; 
import styles from "./styleSheet";
type Props = StackScreenProps<RootStackParamList, 'BookingDetails'>;

const App = ( { route, navigation}: Props ) => {
    return (
        <View style={styles.container}>
            <Text>First Screen</Text>
            <View style={styles.button}>
            <Button title="Back" onPress={()=>navigation.goBack()}></Button>
            </View>
        </View>
    );
}

export default App;