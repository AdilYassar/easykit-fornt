import { StyleSheet } from "react-native";

export const hocStyle= StyleSheet.create({
    cartContainer:{
        position:'absolute',
        bottom:0,
        width:'100%',
        backgroundColor:'#fff',
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        elevation:10,
        shadowOffset:{width:1, height:1},
        shadowOpacity:0.3,
        shadowRadius:5
    }
})