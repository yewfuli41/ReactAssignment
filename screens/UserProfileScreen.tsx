import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Alert
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Types';
import style from './styleSheet';
import { ThemeContext } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { DrawerActions } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';



type UserProfileScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'UserProfile'>;
}

const UserProfileScreen = ({ navigation }: UserProfileScreenProps) => {

    const { theme } = useContext(ThemeContext);
    const { userData, setUserData } = useUser();

    return (

        <View style={[style.container, { backgroundColor: theme.backgroundColor }]}>

            <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                <TouchableOpacity
                    style={{ marginLeft: -150, marginTop:2 ,alignSelf: 'center' }}
                    onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                    <Ionicons name="menu" size={28} color={theme.textColor} />
                </TouchableOpacity><Text style={{ color: theme.textColor, fontWeight: "bold", fontSize: 24, paddingLeft:10, alignSelf:'center' }}>User Profile</Text>
            </View>

            <View style={[style.profileImagePlaceholder, { backgroundColor: theme.backgroundColor }]}>
                <Text style={[style.profileImagePlaceholderText, {color: theme.textColor }]}>
                    {userData.name.charAt(0)}
                </Text>
            </View>

            <Text style={[style.userName, { color: theme.textColor }]}>{userData.name}</Text>
            <Text style={[style.userEmail, { color: theme.textColor }]}>{userData.email}</Text>

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



        </View>
    );
};



export default UserProfileScreen;