import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useContext, useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Linking,
    ScrollView,
    Platform,
    PermissionsAndroid
} from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../Types';
import style from "./styleSheet";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ThemeContext } from "../context/ThemeContext";
import Geolocation from "@react-native-community/geolocation";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";

type HowToGoScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'HowToGo'>;
    route: RouteProp<RootStackParamList, 'HowToGo'>;
};


const requestLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location Permission',
                message: 'This app needs access to your location',
                buttonPositive: 'OK',
                buttonNegative: 'Cancel',
            }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location permission granted')
        }
        else {
            console.log('Location permission denied')
        }

        return granted;
    }
    catch (err) {
        console.warn(err);
        return PermissionsAndroid.RESULTS.DENIED;
    }
}

var watchID: any = null;

const HowToGoScreen = (props: any) => {

    const { name, route } = props;
    const navigation = useNavigation();
    const { theme } = useContext(ThemeContext);
    const [granted, setGranted] = useState<any>(PermissionsAndroid.RESULTS.DENIED);
    const [routeCoords, setRouteCoords] = useState([]);
    const [userLocation, setUserLocation] = useState<{ latitude: number, longitude: number } | null>(null);

    useEffect(() => {
        const initLocation = async () => {
            const result = await requestLocationPermission();
            setGranted(result);

            if (result === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                    pos => {
                        const { latitude, longitude } = pos.coords;
                        setUserLocation({ latitude, longitude });
                        getRoute(latitude, longitude);
                    },
                    err => console.log(err),
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
            } else {
                console.log('Location permission is not granted');

            }
        };

        initLocation();

        return () => {
            Geolocation.clearWatch(watchID);
        };
    }, []);



    const getRoute = async (startLat: number, startLon: number) => {
        const endLat = clinicInfo.coordinates.latitude;
        const endLon = clinicInfo.coordinates.longitude;
        const url = `http://192.168.1.43:5001/route?start_lat=${startLat}&start_lon=${startLon}&end_lat=${endLat}&end_lon=${endLon}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const coords = data.routes[0].geometry.coordinates.map(
                    ([lon, lat]: [number, number]) => ({
                        latitude: lat,
                        longitude: lon
                    })
                );
                setRouteCoords(coords);
            })
            .catch(Error => {
                console.error('Error fetching route:', Error);
            });
    };

    const clinicInfo = {
        //same as idk if can hardcode or need to use another file to store the info
        name: "Pearl Dental",
        address: "let's put utar address here",
        phone: "60-333-333>",
        email: " utar@gmail.com",
        hours: "24/7",
        coordinates: {
            latitude: 3.039722,
            longitude: 101.794167
        }
        //fyi this coordinate is UTAR 
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
            ios: `maps:0, 0?q=${label}@${latitude},${longitude}`,
            android: `geo:0, 0?q=${latitude},${longitude}(${label})`
        });

        if (url) {
            Linking.openURL(url);
        }
    };

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
                        <Text style={{ fontWeight: "bold", fontSize: 24, justifyContent: 'center', color: theme.textColor }}>How To Go</Text>
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
                    <Text style={[style.infoLabel, { color: theme.textColor }]}>Working Hours::</Text>
                    <Text style={style.infoValueLink}>{clinicInfo.hours}</Text>
                </View>
            </View>

            <View style={style.section}>
                <Text style={[style.sectionTitle, { color: theme.textColor }]}>Location</Text>

                <View style={style.mapPlaceholder}>
                    <MapView
                        style={{ height: 300 }}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={{
                            latitude: clinicInfo.coordinates.latitude,
                            longitude: clinicInfo.coordinates.longitude,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05
                        }}
                    >
                        {userLocation && (
                            <Marker coordinate={userLocation} title="Your Location" pinColor="blue" />
                        )}
                        <Marker coordinate={clinicInfo.coordinates} title={clinicInfo.name} pinColor="red" />
                        {routeCoords.length > 0 && (
                            <Polyline
                                coordinates={routeCoords}
                                strokeColor="blue"
                                strokeWidth={4}
                            />
                        )}
                    </MapView>

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
                        - MRT Bukit Dukung {"\n"}
                        - Take T453 bus {"\n"}
                        - The clinic will be on your left
                    </Text>
                </View>
            </View>

        </ScrollView>
    )
};


export default HowToGoScreen;