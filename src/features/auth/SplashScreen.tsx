
import { View, StyleSheet, Image } from 'react-native';
import React from 'react';
import { screenHeight, screenWidth } from '@utils/scaling';
import logo from '@assets/images/logo.png';
import GeoLocation from '@react-native-community/geolocation'



// create a component
const SplashScreen = () => {


    return (
        <View style={styles.container}>
        <Image source = { logo} style = {styles.logoImage}/>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c1ff72',
    },
    logoImage:{
        height: screenHeight * 0.7,
        width:screenWidth * 0.7,
        resizeMode:'contain',


    },
});

//make this component available to the app
export default SplashScreen;
