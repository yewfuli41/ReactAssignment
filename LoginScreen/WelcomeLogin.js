import React, { useState } from "react";
import { View, ImageBackground, Image, TouchableNativeFeedback, Text } from "react-native";
import { styles } from "./StylesCollection";
import Login from "./Login";
import CreateAccount from "./CreateAccount";

const WelcomeLogin = () => {
    const [isLoginVisible, setLoginVisible] = useState(false);
    const [isCreateAccountVisible, setCreateAccountVisible] = useState(false);


    return (
        <View>
            <ImageBackground
                source={{ uri: "https://images.pexels.com/photos/4269695/pexels-photo-4269695.jpeg?auto=compress&cs=tinysrgb&w=600" }}
                style={styles.backimg}
            />
            
            <View>
                <Image source={require('../img/Pink_Y2k_Flower_Cute_Streetwear_Logo-removebg-preview.png')} style={styles.logo} />
            </View>
            
            <View style={styles.buttonContainer}>
                <TouchableNativeFeedback onPress={() => setCreateAccountVisible(true)}>
                    <View style={styles.createAccButtonContainer}>
                        <Text style={styles.createButtonText}>Create Account</Text>
                    </View>
                </TouchableNativeFeedback>
                </View>    
               
                <TouchableNativeFeedback onPress={() => setLoginVisible(true)}>
                <View style={styles.WelcomeLoginButtonContainer}>
                        <Text style={styles.WelcomeLoginButtonText}>Login</Text>
                        </View>
                </TouchableNativeFeedback>
               
            
            
            {/* 2 view */}
            <Login visible={isLoginVisible} close={() => setLoginVisible(false)} />
            <CreateAccount visible={isCreateAccountVisible} close={() => setCreateAccountVisible(false)} />
        </View>
    );
};

export default WelcomeLogin;