/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text,Animated as RNAnimated  } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useAuthStore } from '@state/authStore';
import NoticeAnimations from './NoticeAnimations';
import { NoticeHeight } from '@utils/scaling';
import { SafeAreaView } from 'react-native-safe-area-context';




const NOTICE_HEIGHT = -(NoticeHeight + 12 );
const ProductDashboard = () => {

  const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;


    const slideUp = ()=>{
      RNAnimated.timing(noticePosition,{
        toValue:NOTICE_HEIGHT,
        duration:1200,
        useNativeDriver:false,
      }).start();
    };

    const slideDown = ()=>{
      RNAnimated.timing(noticePosition,{
        toValue:0,
        duration:1200,
        useNativeDriver:false,
      }).start();
    };

useEffect(()=>{
slideDown();
const timeoutId = setTimeout(()=>{
  slideUp();
},3500);
return ()=> clearTimeout(timeoutId);
},[]);

  return (
    <NoticeAnimations noticePosition={noticePosition}>
      <>
      <SafeAreaView />
    <View style={{flex:1}}>
      <Text>ProductDashboard</Text>
    </View>
    </>
    </NoticeAnimations>
  );
};

export default ProductDashboard;
