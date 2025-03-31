import {StyleSheet,Dimensions} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container:{
        flex:1,
        alignContent:'center',
        justifyContent:'center',
        flexDirection:'column',
        justifyContent:'flex-start',
    },
    header:{
        fontWeight:'bold',
        color:'black',
        fontSize:36,
        alignSelf:'center',
        backgroundColor:'#15b5b0'
    },
    headerContainer:{
        justifyContent:'center',
        backgroundColor:'#15b5b0',
    },
    optionsContainer: {
        alignItems:'flex-end',
        alignContent:'center',
        padding: 10,
        backgroundColor: '#f8f8f8',
    },
    optionButton: {
        padding: 12,
        backgroundColor: '#15b5b0',
        borderRadius: 8,
        marginVertical: 5,
        alignItems: 'center',
    },
    optionText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
