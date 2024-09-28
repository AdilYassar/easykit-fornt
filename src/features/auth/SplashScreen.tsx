/* eslint-disable @typescript-eslint/no-unused-vars */

import { View, StyleSheet, Image, Alert } from 'react-native';
import React, { FC, useEffect } from 'react';
import { screenHeight, screenWidth } from '@utils/scaling';
import logo from '@assets/images/logo.png';
import GeoLocation from '@react-native-community/geolocation';
import { useAuthStore } from '@state/authStore';
import { tokenStorage } from '@state/storage';
import { resetAndNavigate } from '@utils/Navigation';

GeoLocation.setRNConfiguration({
    skipPermissionRequests:false,
    authorizationLevel:'always',
    enableBackgroundLocationUpdates:true,
    locationProvider:'auto',
});

// create a component
const SplashScreen: FC = () => {
    const {user, setUser} = useAuthStore();
    const tokenCheck = async()=>{
        const accessToken = tokenStorage.getString('accessToken') as string;
        const refreshToken = tokenStorage.getString('refreshToken') as string;
        if(accessToken){

        }
        resetAndNavigate('CustomerLogin');
        return false;
    };

    useEffect(()=>{
        const fetchUserLocation = async ()=>{
            try {
                GeoLocation.requestAuthorization();
                tokenCheck();

            } catch (error) {
                Alert.alert('sorry we need you location');
            }
        };
        const timeoutId = setTimeout(fetchUserLocation,1000);
        return ()=>clearTimeout(timeoutId);

    },[]);
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
