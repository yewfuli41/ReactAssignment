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
        <View style={styles.container}>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={[styles.input, errors.name ? styles.inputError: null]}
                    value={userData.name}
                    onChangeText={(text) => handleChange('name', text )}
                />
                {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Gender</Text>
                <View style={styles.radioGroup}>
                    <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => setUserData({ ...userData, gender: "Male" })}
                    >
                        <View style={[
                            styles.radio,
                            userData.gender === "Male" && styles.radioSelected
                        ]} />
                        <Text style={styles.radioLabel}>Male</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => setUserData({ ...userData, gender: "Female" })}
                    >
                        <View style={[
                            styles.radio,
                            userData.gender === "Female" && styles.radioSelected
                        ]} />
                        <Text style={styles.radioLabel}>Female</Text>
                    </TouchableOpacity>

                </View>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Date of Birth</Text>
                <TouchableOpacity
                    style={[styles.input, errors.dateOfBirth ? styles.inputError: null]}
                    onPress={() => setShowDatePicker(true)}
                >
                    <Text>{userData.dateOfBirth || "Select date"}</Text>
                </TouchableOpacity>

                {errors.dateOfBirth && (
                    <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
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

            <View style={styles.formGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={[styles.input, errors.email ? styles.inputError: null]}
                    value={userData.email}
                    onChangeText={(text) => handleChange('email', text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                {errors.email ? <Text style={styles.errorText}>{errors.email}</Text>: null}
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={[styles.input, errors.phoneNumber ? styles.inputError : null]}
                    value={userData.phoneNumber}
                    onChangeText={(text) => handleChange('phoneNumber', text)}
                    keyboardType="phone-pad"
                />
                {errors.phoneNumber ? <Text style={styles.errorText}>{errors.phoneNumber}</Text>: null}
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}
                >
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 12,
        fontSize: 16,
    },
    radioGroup: {
        flexDirection: 'row',
        marginTop: 5,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    radio: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    radioSelected: {
        backgroundColor: '#007AFF',
    },
    radioLabel: {
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 40,
    },
    saveButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    cancelButton: {
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    cancelButtonText: {
        fontSize: 16,
    },
    inputError:{
        borderColor: '#ff4d4d',
        borderWidth:1,
    },
    errorText:{
        color:'#ff4d4d',
        fontSize: 14,
        marginTop:4,
    },
});

export default EditProfileScreen;