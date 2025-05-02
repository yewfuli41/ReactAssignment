import React, { useContext, useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Linking,
    ScrollView,
    Platform,
    PermissionsAndroid
} from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../Types';
import style from "./styleSheet";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ThemeContext } from "../context/ThemeContext";
import MapView, { Marker } from 'react-native-maps';
import Geolocation from "@react-native-community/geolocation";
import { createMapLink } from "react-native-open-maps";
import WebView from "react-native-webview";

type HowToGoScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'HowToGo'>;
    route: RouteProp<RootStackParamList, 'HowToGo'>;
};


const HowToGoScreen: React.FC<HowToGoScreenProps> = ({ navigation }) => {
    const { theme } = useContext(ThemeContext);
    const [position, setPosition] = useState<{ latitude: number; longitude: number }>({ latitude: 0, longitude: 0 });

    useEffect(() => {
        const requestLocationPermission = async () => {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Location Permission",
                        message: "App needs access to your location to show directions.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    console.warn("Location permission denied");
                    return;
                }
            }

            Geolocation.getCurrentPosition(
                pos => setPosition(pos.coords),
                err => console.log("Geo error:", err),
                {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 1000
                }
            );
        };

        requestLocationPermission();
    }, []);

    const clinicInfo = {
        name: "Schneidermain Dental",
        address: "Universiti Tunku Abdul Rahman (UTAR), Jalan Sungai Long",
        phone: "+60-3-1234-5678",
        email: "utar@gmail.com",
        hours: "24/7",
        coordinates: {
            latitude: 3.039722,
            longitude: 101.794167
        }
    };

    const openPhone = () => {
        Linking.openURL(`tel:${clinicInfo.phone}`);
    };

    const openEmail = () => {
        Linking.openURL(`mailto:${clinicInfo.email}`);
    };

    const openMaps = () => {
        const { latitude, longitude } = clinicInfo.coordinates;
        const label = encodeURIComponent(clinicInfo.name);
        const url = Platform.select({
            ios: `maps:0,0?q=${label}@${latitude},${longitude}`,
            android: `geo:0,0?q=${latitude},${longitude}(${label})`
        });
        if (url) Linking.openURL(url);
    };

    const getDirectionLink = (userLat: number, userLng: number) => {
        const { latitude, longitude } = clinicInfo.coordinates;
        return `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${latitude},${longitude}&travelmode=driving`;
    }

    return (
        <ScrollView style={[style.editProfilecontainer, { backgroundColor: theme.backgroundColor }]}>
            <View style={style.section}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                    <TouchableOpacity
                        style={{ marginLeft: 0, alignSelf: 'flex-start' }}
                        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                        <Ionicons name="menu" size={28} color={theme.textColor} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ fontWeight: "bold", fontSize: 24, justifyContent: 'center', color: theme.textColor }}>
                            How To Go
                        </Text>
                    </View>
                </View>

                <View style={style.infoItem}>
                    <Text style={[style.infoLabel, { color: theme.textColor }]}>Phone:</Text>
                    <TouchableOpacity onPress={openPhone}>
                        <Text style={style.infoValueLink}>{clinicInfo.phone}</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.infoItem}>
                    <Text style={[style.infoLabel, { color: theme.textColor }]}>Email:</Text>
                    <TouchableOpacity onPress={openEmail}>
                        <Text style={style.infoValueLink}>{clinicInfo.email}</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.infoItem}>
                    <Text style={[style.infoLabel, { color: theme.textColor }]}>Address:</Text>
                    <Text style={style.infoValueLink}>{clinicInfo.address}</Text>
                </View>

                <View style={style.infoItem}>
                    <Text style={[style.infoLabel, { color: theme.textColor }]}>Working Hours:</Text>
                    <Text style={style.infoValueLink}>{clinicInfo.hours}</Text>
                </View>
            </View>

            <View style={style.section}>
                <Text style={[style.sectionTitle, { color: theme.textColor }]}>Location</Text>

                <View>
                    <WebView
                        source={{ uri: getDirectionLink(position.latitude, position.longitude) }}
                        style={{ width: '100%', height: 600 }}
                        scalesPageToFit={true}
                    />
                </View>

                <TouchableOpacity style={style.openMapsButton} onPress={openMaps}>
                    <Text style={style.openMapsButtonText}>Open in Maps</Text>
                </TouchableOpacity>
            </View>

            <View style={style.section}>
                <Text style={[style.sectionTitle, { color: theme.textColor }]}>Transport</Text>
                <View style={style.directionItem}>
                    <Text style={[style.directionTitle, { color: theme.textColor }]}>By Public Transport:</Text>
                    <Text style={[style.directionText, { color: theme.textColor }]}>
                        - MRT Bukit Dukung{"\n"}
                        - Take T453 bus{"\n"}
                        - The clinic will be on your left
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default HowToGoScreen;
