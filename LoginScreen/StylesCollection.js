import {StyleSheet,Dimensions} from 'react-native';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    backimg: {
        flex:1,
        height: screenHeight,
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
        opacity:0.9,
        backgroundColor:"black",
    },
    logo:{
        marginTop:20,
        flex: 1,
        position: 'absolute',
    },
    buttonContainer:{
        justifyContent: 'center',
        alignContent:'center',
        alignItems: 'center',
        marginTop:20,
    },
    createAccButtonContainer:{
        alignItems: 'center',
        borderRadius:15,
        padding:15,
        backgroundColor:'#15b5b0', 
        marginTop:500,
        width:300,
        height:60,
        overflow:'hidden',
        marginBottom: 10,
    },
    createButtonText:{
        fontSize:18,
        color:"black",
    },
    WelcomeLoginButtonContainer:{
        alignSelf:"center",
        alignItems: 'center',
        borderRadius:15,
        borderColor:'#15b5b0',
        borderWidth:1.5,
        backgroundColor:'rgba(202, 202, 202, 0.3)',
        padding:12,
        width:300,
        height:60,
        overflow:'hidden',
    },
    WelcomeLoginButtonText:{
        color:'#1dac90',
        fontSize:20,
        fontWeight:'bold',
    },
    modalContainer:{
        backgroundColor:'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        position:'relative',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalTitle:{
        fontSize:30,
        alignContent:'flex-start',
        fontWeight:'bold',
        color:'black',
        marginBottom:10,
    },
    inputStyle:{
        borderRadius:12,
        borderColor:'black',
        borderWidth:2,
        marginBottom:20,
    },
    closeButtonText:{
        color:'black',
        alignSelf:'flex-end',
        fontSize:30,
    },
    normalLoginButton:{
        alignItems: 'center',
        borderRadius:15,
        backgroundColor:'black',
        padding:12,
        width:screenWidth-40,
        height:60,
    },
    registerText:{
        color:'black',
        fontSize:16,
    },
    errorText: {
        color: "red",
        fontSize: 16,
    },
    successOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    successContainer: {
        width: 300,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    successText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color:'black'
    },
    successButton: {
        fontSize: 16,
        color: 'black',
        marginTop:10
    },
    logoutPopUpButton:{
        fontSize: 16,
        color: 'black',
        marginTop: 10,
        padding:20,
    },
    googleLogin:{
        justifyContent:'center',
        marginLeft: screenWidth*0.45,
        color:'#DB4437',
    }
});