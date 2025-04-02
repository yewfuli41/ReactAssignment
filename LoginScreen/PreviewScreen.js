import React, { useEffect } from "react";
import {View,Image,ImageBackground,Text} from 'react-native';
import { styles } from "./StylesCollection";

const PreviewScreen = ({navigation})=>{
    // useEffect(callback,dependency list)
    useEffect(()=>{
        const countTime = setTimeout(()=>{
            navigation.replace('LoginMain');
        },2500) //2.5 sec heh
    
        return ()=> clearTimeout(countTime); },
        []);

    return (
        <View>
                    <ImageBackground
                        source={{uri:"https://images.pexels.com/photos/4269695/pexels-photo-4269695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}}
                        style={styles.backimg}/>
                    <View>
                            <Image source={require('../img/Pink_Y2k_Flower_Cute_Streetwear_Logo-removebg-preview.png')}
                                        style={styles.logo}/>
                            
                    </View>
                    <View>
                    <Text style={[{color:"white", fontSize:16, fontWeight:"bold" ,marginTop:180, alignContent:"center", alignSelf:"center"}]}>Your Pearly White, Our Ultimate Care</Text>
                    </View>
        </View>
    );

}

export default PreviewScreen;