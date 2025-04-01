import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Alert
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types';
import style from './styleSheet';



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
        <View style={style.container}>
            <View style={style.profileImagePlaceholder}>
                <Text style={style.profileImagePlaceholderText}>
                    {userData.name.charAt(0)}
                </Text>
            </View>

            <Text style={style.userName}>{userData.name}</Text>
            <Text style={style.userEmail}>{userData.email}</Text>

            <View style={style.optionsContainer}>
                <TouchableOpacity
                    style={style.optionButton}
                    onPress={() => navigation.navigate('EditProfile', {
                        name: userData.name,
                        email: userData.email,
                        phoneNumber: userData.phoneNumber,
                        gender: userData.gender,
                        dateOfBirth: userData.dateOfBirth,
                    })}
                >
                    <Text style={style.optionText}>Edit Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={style.optionButton}
                    onPress={() => navigation.navigate('FAQ')}
                >
                    <Text style={style.optionText}>FAQ</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={style.optionButton}
                    onPress={() => navigation.navigate('HowToGo')}
                >
                    <Text style={style.optionText}>How To Go</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={style.logoutButton}
                onPress={() => {
                    Alert.alert('Logged out');
                    navigation.navigate('LoginMain');
                }}
            >
                <Text style={style.logoutButtonText}>Log out</Text>
            </TouchableOpacity>

        </View>
    );
};



export default UserProfileScreen;