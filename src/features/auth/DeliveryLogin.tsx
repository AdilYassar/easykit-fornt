/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, Alert, StyleSheet } from 'react-native';
import React, { FC, useState } from 'react';
import { resetAndNavigate } from '@utils/Navigation';
import { deliveryLogin } from '@service/authService';
import CustomSafeAreaView from '@components/global/customSafeAreaView';
import { ScrollView } from 'react-native-gesture-handler';
import { screenHeight, screenWidth } from '@utils/scaling';
import LottieView from 'lottie-react-native';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import CustomInput from '@components/ui/CustomInput';
import Icon from "react-native-vector-icons/Ionicons"
import { RFValue } from 'react-native-responsive-fontsize';
import CustomButton from '@components/ui/CustomButton';

const DeliveryLogin:FC = () => {
  const [email,setEmail]=useState('');
  const [password, setPassword]= useState('');
  const [loading, setLoading]= useState(false);
  

  const handleLogin = async() =>{
    setLoading(true);
    try {
      await deliveryLogin(email,password);
      resetAndNavigate('DeliveryDashboard');
    } catch (error) {
      Alert.alert('login failure');

    }finally{
      setLoading(false);
    }
  }
  return (
    <CustomSafeAreaView>
    <ScrollView
    keyboardShouldPersistTaps='handled'
    keyboardDismissMode='on-drag'
    >
      <View style={styles.container}>


        <View style={styles.lottieContainer}>
          <LottieView autoPlay loop style={styles.lottie} source={require('@assets/animations/truck.json.json')}   />
        </View>
        <CustomText variant='h3' fontFamily={Fonts.Bold}>
    Delivery Partner Portal
        </CustomText>
        <CustomText variant='h8' style={styles.text} fontFamily={Fonts.Bold}>
       Faster Than Your Click
        </CustomText>
        <CustomInput 
        onChangeText={setEmail}
        value={email}
        left={<Icon 
          name='mail' 
          color='#F8890E' 
          style={{marginLeft:10}}  
          size={RFValue(18)}   />}
          placeholder='Email'
          inputMode='email'
          right={false}
        />
           <CustomInput 
        onChangeText={setPassword}
        value={password}
        left={<Icon 
          name='key-sharp' 
          color='#F8890E' 
          style={{marginLeft:10}}  
          size={RFValue(18)}   />}
          placeholder='Password'
        secureTextEntry
          right={false}
        />
        <CustomButton 
        disabled={email.length==0 || password.length<5}
        title='Login'
        onPress={handleLogin}
        loading={loading}
        
        />
      </View>
    </ScrollView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({


  container:{
    flex:1,
    padding:20,
    alignItems:'center',

  },
  lottie:{
    height:'100%',
    width:'100%',
  },
  lottieContainer:{
    height:screenHeight*0.12,
    width:'100%'
  },
  text:{
    marginTop:2,
    marginBottom:25,
    opacity:0.8,
  }
})

export default DeliveryLogin;
