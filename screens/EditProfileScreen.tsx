import React, { useEffect, useState, useContext } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerActions, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../Types';
import DateTimePicker from '@react-native-community/datetimepicker';
import style from './styleSheet';
import { useUser, ValidationErrors, validateUserData } from '../context/UserContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeContext } from '../context/ThemeContext';
let SQLite = require('react-native-sqlite-storage');

type EditProfileScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'EditProfile'>;
    route: RouteProp<RootStackParamList, 'EditProfile'>;
};

const openCallback = () => {
    console.log('database open success');
}

const errorCallback = (err: any) => {
    console.error('Error in opening the database: ' + err);
}

const EditProfileScreen = (props: any) => {
    const navigation = useNavigation();
    const { userData, setUserData } = useUser(); // get data from context
    const [localUserData, setLocalUserData] = useState(userData); // local copy for editing
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const nav = useNavigation();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const { theme } = useContext(ThemeContext);

    let db = SQLite.openDatabase(
        { name: 'database.sqlite', createFromLocation: '~database.sqlite' },
        openCallback,
        errorCallback,
    )

    useEffect(() => {

        if (!localUserData) {
            Alert.alert("Error", "No user data found");
            return;
        }

        const validationErrors = validateUserData(localUserData);
        setErrors(validationErrors);
        setIsFormValid(Object.keys(validationErrors).length === 0);
    }, [localUserData, validateUserData]);

    const handleSave = () => {
        if (!localUserData) {
            Alert.alert("Error", "No user data found");
            return;
        }

        //setUserData(localUserData); // set data as localUserData
        const validationErrors = validateUserData(localUserData);
        setErrors(validationErrors); // set errors to validation errors

        if (Object.keys(validationErrors).length === 0) {
            db.transaction((tx: any) => {
                tx.executeSql(`UPDATE users SET name = ?, email =?, phoneNumber =?, gender = ?, birthDate = ?
                WHERE name = ?`,
                    [localUserData.name, localUserData.email, localUserData.phoneNumber, localUserData.gender, localUserData.dateOfBirth, userData.name],
                    () => {
                        setUserData(localUserData); // set data as localUserData
                        Alert.alert("Success", "Profile updated successfully");
                        console.log("Profile updated successfully");
                    }
                )
            })
        } else {
            Alert.alert("Validation Error", "Please fix the errors");
            console.log("Validation Error", validationErrors);
        }
    };

    // key of extract key oof the type as a union ---> name|email|phorNumber etc
    // type of get the type of the object --> localUserData
    const handleChange = (field: keyof typeof userData, value: string) => {
        setLocalUserData((prev) => {
            if (!prev) return null;
            return {
                ...prev,
                [field]: value,
            };
        });
    };


    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);

        if (selectedDate) {
            handleChange('dateOfBirth', selectedDate.toISOString().split('T')[0]); // use handle change to update date
        }
    };

    return (
        <View style={[style.editProfilecontainer, { backgroundColor: theme.backgroundColor }]}>
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', }}>
                    <TouchableOpacity
                        style={{ marginLeft: -100, alignSelf: 'flex-start' }}
                        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                        <Ionicons name="menu" size={28} color={theme.textColor} />
                    </TouchableOpacity><Text style={{ color: theme.textColor, fontWeight: "bold", fontSize: 24 }}>Edit Profile</Text>
                </View>

                <View style={style.formGroup}>
                    <Text style={[style.label, { color: theme.textColor }]}>Name</Text>
                    <TextInput
                        style={[style.input, { color: theme.textColor }, errors.name ? style.inputError : null]}
                        value={localUserData.name}
                        onChangeText={(text) => handleChange('name', text)}
                    />
                    {errors.name ? <Text style={[style.errorText, { color: theme.textColor }]}>{errors.name}</Text> : null}
                </View>

                <View style={style.formGroup}>
                    <Text style={[style.label, { color: theme.textColor }]}>Gender</Text>
                    <View style={style.radioGroup}>
                        <TouchableOpacity
                            style={style.radioButton}
                            onPress={() => handleChange('gender', 'Male')}>
                            <View style={[
                                style.radio,
                                localUserData.gender === "Male" && style.radioSelected
                            ]} />
                            <Text style={[style.radioLabel, { color: theme.textColor }]}>Male</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={style.radioButton}
                            onPress={() => handleChange('gender', 'Female')}>
                            <View style={[
                                style.radio,
                                localUserData.gender === "Female" && style.radioSelected
                            ]} />
                            <Text style={[style.radioLabel, { color: theme.textColor }]}>Female</Text>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={style.formGroup}>
                    <Text style={[style.label, { color: theme.textColor }]}>Date of Birth</Text>
                    <TouchableOpacity
                        style={[style.input, errors.dateOfBirth ? style.inputError : null]}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text style={{ color: theme.textColor }}>{localUserData.dateOfBirth || "Select date"}</Text>
                    </TouchableOpacity>

                    {errors.dateOfBirth && (
                        <Text style={[style.errorText, { color: theme.textColor }]}>{errors.dateOfBirth}</Text>
                    )}

                    {showDatePicker && (
                        <DateTimePicker
                            value={localUserData.dateOfBirth ? new Date(localUserData.dateOfBirth) : new Date()}
                            mode="date"
                            display='default'
                            onChange={handleDateChange}
                            maximumDate={new Date()}
                        />
                    )}
                </View>

                <View style={style.formGroup}>
                    <Text style={[style.label, { color: theme.textColor }]}>Email</Text>
                    <TextInput
                        style={[style.input, { color: theme.textColor }, errors.email ? style.inputError : null]}
                        value={localUserData?.email || null}
                        onChangeText={(text) => handleChange('email', text)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    {errors.email ? <Text style={[style.errorText, { color: theme.textColor }]}>{errors.email}</Text> : null}
                </View>

                <View style={style.formGroup}>
                    <Text style={[style.label, { color: theme.textColor }]}>Phone Number</Text>
                    <TextInput
                        style={[style.input, { color: theme.textColor }, errors.phoneNumber ? style.inputError : null]}
                        value={String(localUserData?.phoneNumber) || ""}
                        onChangeText={(text) => handleChange('phoneNumber', text)}
                        keyboardType="phone-pad"
                    />
                    {errors.phoneNumber ? <Text style={[style.errorText, { color: theme.textColor }]}>{errors.phoneNumber}</Text> : null}
                </View>

                <View style={style.buttonContainer}>
                    <TouchableOpacity
                        style={style.saveButton}
                        onPress={handleSave}
                    >
                        <Text style={[style.saveButtonText, { color: theme.textColor }]}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};



export default EditProfileScreen;