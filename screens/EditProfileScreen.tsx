import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../Types';
import DateTimePicker from '@react-native-community/datetimepicker';
import style from './styleSheet';

type EditProfileScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'EditProfile'>;
    route: RouteProp<RootStackParamList, 'EditProfile'>;
};

interface ValidationErrors {
    name?: string;
    email?: string;
    phoneNumber?: string;
    dateOfBirth?: string;
}

const EditProfileScreen = ({ navigation, route }: EditProfileScreenProps) => {
    const { name, email, gender, dateOfBirth, phoneNumber } = route.params;

    const [userData, setUserData] = useState({
        name,
        email,
        phoneNumber,
        gender,
        dateOfBirth,
    });


    const [errors, setErrors] = useState<ValidationErrors>({});

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {validateForm();}, [userData]);

    const handleChange = (field: string, value: string) => {
        setUserData({
            ...userData,
            [field]: value,
        });
    };

    const validateForm = () => {
        const newErrors: ValidationErrors = {};

        if (!userData.name) {
            newErrors.name = "Name is required";
        } else if (!/^[A-Za-z\s]+$/.test(userData.name)) {
            newErrors.name = "Name can only contain letters and spaces";
        }

        if (!userData.email || !userData.email.includes('@')) {
            newErrors.email = "Email address is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
            newErrors.email = "Email format is invalid";
        }

        if (!userData.phoneNumber) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^\d{3}-\d{7}$/.test(userData.phoneNumber)) {
            newErrors.phoneNumber = 'Phone format should be XXX-XXXXXXX';
        }


        setErrors(newErrors);
        setIsFormValid(Object.keys(newErrors).length===0);

        return newErrors;
        
    };


    const handleSave = () => {
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length === 0){
            //here will UPDATE the table in database if no error
            Alert.alert(
                "Success",
                "Profile updated successfully",
                [
                    {
                        text:"OK",
                        onPress: () => {
                            navigation.navigate("UserProfile");
                        }
                    }
                ]
            )
        } else {
            Alert.alert(
                "Validation Error",
                "Please fix the error",
                [
                    {
                        text: "OK"
                    }
                ]
            )
        }
    };

    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);

        if (selectedDate) {
            setUserData({
                ...userData,
                dateOfBirth: selectedDate.toISOString().split('T')[0]
            });
        }
    };

    return (
        <View style={style.editProfilecontainer}>
            <View style={style.formGroup}>
                <Text style={style.label}>Name</Text>
                <TextInput
                    style={[style.input, errors.name ? style.inputError: null]}
                    value={userData.name}
                    onChangeText={(text) => handleChange('name', text )}
                />
                {errors.name ? <Text style={style.errorText}>{errors.name}</Text> : null}
            </View>

            <View style={style.formGroup}>
                <Text style={style.label}>Gender</Text>
                <View style={style.radioGroup}>
                    <TouchableOpacity
                        style={style.radioButton}
                        onPress={() => setUserData({ ...userData, gender: "Male" })}
                    >
                        <View style={[
                            style.radio,
                            userData.gender === "Male" && style.radioSelected
                        ]} />
                        <Text style={style.radioLabel}>Male</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={style.radioButton}
                        onPress={() => setUserData({ ...userData, gender: "Female" })}
                    >
                        <View style={[
                            style.radio,
                            userData.gender === "Female" && style.radioSelected
                        ]} />
                        <Text style={style.radioLabel}>Female</Text>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={style.formGroup}>
                <Text style={style.label}>Date of Birth</Text>
                <TouchableOpacity
                    style={[style.input, errors.dateOfBirth ? style.inputError: null]}
                    onPress={() => setShowDatePicker(true)}
                >
                    <Text>{userData.dateOfBirth || "Select date"}</Text>
                </TouchableOpacity>

                {errors.dateOfBirth && (
                    <Text style={style.errorText}>{errors.dateOfBirth}</Text>
                )}

                {showDatePicker && (
                    <DateTimePicker
                        value={userData.dateOfBirth ? new Date(userData.dateOfBirth) : new Date()}
                        mode="date"
                        display='default'
                        onChange={handleDateChange}
                        maximumDate={new Date()}
                    />
                )}
            </View>

            <View style={style.formGroup}>
                <Text style={style.label}>Email</Text>
                <TextInput
                    style={[style.input, errors.email ? style.inputError: null]}
                    value={userData.email}
                    onChangeText={(text) => handleChange('email', text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                {errors.email ? <Text style={style.errorText}>{errors.email}</Text>: null}
            </View>

            <View style={style.formGroup}>
                <Text style={style.label}>Phone Number</Text>
                <TextInput
                    style={[style.input, errors.phoneNumber ? style.inputError : null]}
                    value={userData.phoneNumber}
                    onChangeText={(text) => handleChange('phoneNumber', text)}
                    keyboardType="phone-pad"
                />
                {errors.phoneNumber ? <Text style={style.errorText}>{errors.phoneNumber}</Text>: null}
            </View>

            <View style={style.buttonContainer}>
                <TouchableOpacity
                    style={style.saveButton}
                    onPress={handleSave}
                >
                    <Text style={style.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};



export default EditProfileScreen;