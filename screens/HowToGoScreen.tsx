import { DrawerActions, Link, useNavigation } from "@react-navigation/native";
import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Linking,
    ScrollView,
    Platform
} from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../Types';
import style from "./styleSheet";
import Ionicons from "react-native-vector-icons/Ionicons";

type HowToGoScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'HowToGo'>;
    route: RouteProp<RootStackParamList, 'HowToGo'>;
};

const HowToGoScreen = (props:any) => {
   
    const {name,route} = props;
     const navigation = useNavigation();
       

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
        <ScrollView style={style.editProfilecontainer}>
            <View style={style.section}>
    
                           <View style={{flexDirection:'row', flex:1  }}>
                           <TouchableOpacity 
                           style={{ marginLeft:0, alignSelf:'flex-start' }}
                               onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                                   <Ionicons name="menu" size={28} color="black" />
                       </TouchableOpacity> 
                       <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ fontWeight: "bold", fontSize:24, justifyContent:'center'}}>How To Go</Text>
                        </View>
                       </View> 
                     

                <View style={style.infoItem}>
                    <Text style={style.infoLabel}>Phone:</Text>
                    <TouchableOpacity onPress={openPhone}>
                        <Text style={style.infoValueLink}>{clinicInfo.phone}</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.infoItem}>
                    <Text style={style.infoLabel}>Email:</Text>
                    <TouchableOpacity onPress={openEmail}>
                        <Text style={style.infoValueLink}>{clinicInfo.email}</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.infoItem}>
                    <Text style={style.infoLabel}>Address:</Text>
                    <Text style={style.infoValueLink}>{clinicInfo.address}</Text>
                </View>

                <View style={style.infoItem}>
                    <Text style={style.infoLabel}>Working Hours::</Text>
                    <Text style={style.infoValueLink}>{clinicInfo.hours}</Text>
                </View>
            </View>

            <View style={style.section}>
                <Text style={style.sectionTitle}>Location</Text>

                <View style={style.mapPlaceholder}>
                    <Text style ={style.mapPlaceholderText}>
                        put Map API here
                    </Text>
                    <Text style={style.mapPlaceholderSubText}>
                        React native maps with api
                    </Text>
                    {/* temporary put a random text here, still try to figure out the map API
                        cause wanna free :) */}
                </View>

                <TouchableOpacity style={style.openMapsButton} onPress={openMaps}>
                    <Text style={style.openMapsButtonText}>Open in Maps</Text>
                </TouchableOpacity>
            </View>

            <View style={style.section}>
                <Text style={style.sectionTitle}>Transport</Text>

                <View style={style.directionItem}>
                    <Text style={style.directionTitle}>By Public Transport:</Text>
                    <Text style={style.directionText}>
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