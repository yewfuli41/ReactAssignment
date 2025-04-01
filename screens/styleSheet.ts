import React from 'react';
import{StyleSheet} from 'react-native';

const style = StyleSheet.create({
    container:{
        padding:20,
        alignItems:'center'
    },
    text:{
        color:'black'
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
      },
    backButton:{
        alignSelf: 'flex-start', 
        width: 100,
        marginTop: 10, 
    },
    nextButton: {
        alignSelf: "flex-end",
        marginTop: 10,
        width: 100,
      },
      buttonRow: {
        flexDirection: "row", // Arrange buttons in a row
        justifyContent: "space-around", // Space between buttons
        marginTop: 20,
      },
    radioButton:{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: 200, // Adjust width as needed
        padding: 8,
        borderWidth:1,
        borderRadius: 4,
        marginBottom: 8,  
    }
})
export default style;