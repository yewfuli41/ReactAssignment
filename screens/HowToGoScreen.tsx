import { Link } from "@react-navigation/native";
import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Linking,
    ScrollView,
    Platform
} from "react-native";
import { Directions } from "react-native-gesture-handler";
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../Types';

type HowToGoScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'HowToGo'>;
    route: RouteProp<RootStackParamList, 'HowToGo'>;
};

const HowToGoScreen = ({navigation,route}: HowToGoScreenProps) => {
    const clinicInfo = {
        //same as idk if can hardcode or need to use another file to store the info
        name: "SChneidermain?? Dental",
        address: "let's put utar address here",
        phone: "60-333-333>",
        email: " utar@gmail.com",
        hours: "24/7",
        coordinates:{
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
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Contact Information</Text>

                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Phone:</Text>
                    <TouchableOpacity onPress={openPhone}>
                        <Text style={styles.infoValueLink}>{clinicInfo.phone}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Email:</Text>
                    <TouchableOpacity onPress={openEmail}>
                        <Text style={styles.infoValueLink}>{clinicInfo.email}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Address:</Text>
                    <Text style={styles.infoValueLink}>{clinicInfo.address}</Text>
                </View>

                <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Working Hours::</Text>
                    <Text style={styles.infoValueLink}>{clinicInfo.hours}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Location</Text>

                <View style={styles.mapPlaceholder}>
                    <Text style ={styles.mapPlaceholderText}>
                        put Map API here
                    </Text>
                    <Text style={styles.mapPlaceholderSubText}>
                        React native maps with api
                    </Text>
                    {/* temporary put a random text here, still try to figure out the map API
                        cause wanna free :) */}
                </View>

                <TouchableOpacity style={styles.openMapsButton} onPress={openMaps}>
                    <Text style={styles.openMapsButtonText}>Open in Maps</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Transport</Text>

                <View style={styles.directionItem}>
                    <Text style={styles.directionTitle}>By Public Transport:</Text>
                    <Text style={styles.directionText}>
                        - MRT Bukit Dukung {"\n"}
                        - Take T453 bus {"\n"}
                        - The clinic will be on your left
                    </Text>
                </View>
            </View>
            
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding:20,
        backgroundColor: "#ffffff",
    },
    section: {
        marginBottom:30,
    },
    sectionTitle:{
        fontSize:20,
        fontWeight:"bold",
        marginBottom:15,
        color:"#333",
    },
    infoItem:{
        marginBottom:12,
    },
    infoLabel: {
        fontSize:16,
        fontWeight:"500",
        marginBottom:4,
        color:"#666",
    },
    infoValue:{
        fontSize:16,
        lineHeight:22,
    },
    infoValueLink:{
        fontSize:16,
        color:"#007AFF",
        textDecorationLine:"underline",
    },
    mapPlaceholder:{
        height:200,
        backgroundColor:"#f9f9f9",
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center",
        marginBottom:15,
        borderWidth:1,
        borderColor:"ddd",
        padding:20,
    },
    mapPlaceholderText:{
        fontSize:16,
        fontWeight:"500",
        color:"#666",
        textAlign:"center",
    },
    mapPlaceholderSubText:{
        fontSize:12,
        color:"#999",
        marginTop:5,
        textAlign:"center",
    },
    openMapsButton: {
        backgroundColor: "#007AFF",
        padding:12,
        borderRadius:5,
        alignItems:"center",
    },
    openMapsButtonText:{
        color:"white",
        fontSize:16,
        fontWeight: "500",
    },
    directionItem: {
        marginBottom: 15,
    },
    directionTitle:{
        fontSize:16,
        fontWeight:"500",
        marginBottom:8,
    },
    directionText:{
        fontSize:15,
        lineHeight:22,
    },
});

export default HowToGoScreen;