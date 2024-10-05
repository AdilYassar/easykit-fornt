/* eslint-disable @typescript-eslint/no-unused-vars */

import { View, StyleSheet, Image, Alert, CursorValue } from 'react-native';
import React, { FC, useEffect } from 'react';
import { screenHeight, screenWidth } from '@utils/scaling';
import logo from '@assets/images/logo.png';
import GeoLocation from '@react-native-community/geolocation';
import { useAuthStore } from '@state/authStore';
import { tokenStorage } from '@state/storage';
import { resetAndNavigate } from '@utils/Navigation';
import { jwtDecode } from 'jwt-decode';
import { refetchUSer, refresh_tokens } from '@service/authService';

GeoLocation.setRNConfiguration({
    skipPermissionRequests:false,
    authorizationLevel:'always',
    enableBackgroundLocationUpdates:true,
    locationProvider:'auto',
});
interface DecodedToken {
    exp:number;
}
// create a component
const SplashScreen: FC = () => {
    const {user, setUser} = useAuthStore();
    const tokenCheck = async()=>{
        const accessToken = tokenStorage.getString('accessToken') as string;
        const refreshToken = tokenStorage.getString('refreshToken') as string;
        if(accessToken){
            const decodedAccessToken = jwtDecode<DecodedToken>(accessToken);
            const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken);
            const currentTime = Date.now() / 1000;
            if(decodedRefreshToken?.exp < currentTime){
                resetAndNavigate('CustomerLogin');
                Alert.alert('session expired login again');
                return false;
            }
            if(decodedAccessToken?.exp < currentTime){
                try {
                    refresh_tokens();
                    await refetchUSer(setUser);
                } catch (error) {
                    console.log(error);
                    Alert.alert('there was an error, refreshing token');
                    return false;
                }
            }

            if(user?.role === 'Customer'){
                resetAndNavigate('ProductDashboard');
            }else{
                resetAndNavigate('DeliveryDashboard');
            }
            return true;
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

    });
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
