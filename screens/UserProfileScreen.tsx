import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Alert
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types';
import { RouteProp } from '@react-navigation/native';


type UserProfileScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'UserProfile'>;
}

const UserProfileScreen = ({ navigation }: UserProfileScreenProps) => {
    const [userData, setUserData] =useState(
        {
            //hardcode, later see what to do with database
            name: 'John Doe',
            email: 'john.doe@example.com',
            dateOfBirth: "2000-01-01",
            phoneNumber: "011-1111111",
            gender: "Male",
        }); 

    return (
        <View style={styles.container}>
            <View style={styles.profileImagePlaceholder}>
                <Text style={styles.profileImagePlaceholderText}>
                    {userData.name.charAt(0)}
                </Text>
            </View>

            <Text style={styles.userName}>{userData.name}</Text>
            <Text style={styles.userEmail}>{userData.email}</Text>

            <View style={styles.optionsContainer}>
                <TouchableOpacity
                    style={styles.optionButton}
                    onPress={() => navigation.navigate('EditProfile', {
                        name: userData.name,
                        email: userData.email,
                        phoneNumber: userData.phoneNumber,
                        gender: userData.gender,
                        dateOfBirth: userData.dateOfBirth,
                    })}
                >
                    <Text style={styles.optionText}>Edit Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.optionButton}
                    onPress={() => navigation.navigate('FAQ')}
                >
                    <Text style={styles.optionText}>FAQ</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.optionButton}
                    onPress={() => navigation.navigate('HowToGo')}
                >
                    <Text style={styles.optionText}>How To Go</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => Alert.alert('Logged out')}
            >
                <Text style={styles.logoutButtonText}>Log out</Text>
            </TouchableOpacity>
            {/* the button here should navigate to the LoginScreen? */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    profileImagePlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    profileImagePlaceholderText: {
        fontSize: 60,
        color: '#888',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    userEmail: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },
    optionsContainer: {
        width: '100%',
        marginBottom: 40,
    },
    optionButton: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    optionText: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
    logoutButton: {
        backgroundColor: '#ff4d4d',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default UserProfileScreen;