/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, StyleSheet, Animated, Image, Text, Keyboard, Alert } from 'react-native';
import React, { FC, useEffect, useRef, useState } from 'react';
import { GestureHandlerRootView, PanGestureHandler, State, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import CustomSafeAreaView from '@components/global/customSafeAreaView';
import ProductSlider from '@components/login/ProductSlider';
import { resetAndNavigate } from '@utils/Navigation';
import CustomText from '@components/ui/CustomText';
import { Colors, Fonts, lightColors } from '@utils/Constants';
import CustomInput from '@components/ui/CustomInput';
import CustomButton from '@components/ui/CustomButton';
import useKeyboardOffsetHeight from '@utils/UseKeyboardOffsetHeight';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import { customerLogin } from '@service/authService';

const bottomColors = [...lightColors].reverse();
const CustomerLogin: FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const keyboardOffsetHeight = useKeyboardOffsetHeight(); // Corrected casing of the hook
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Handle animation based on keyboard visibility
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: keyboardOffsetHeight === 0 ? 0 : -keyboardOffsetHeight * 0.84,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [keyboardOffsetHeight, animatedValue]);

  const handleAuth = async () => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      await customerLogin(phoneNumber);
      resetAndNavigate('ProductDashboard');
    } catch (error) {
      Alert.alert('login Failed');
    }finally{
    setLoading(false);
    }
  };

  const [gestureSequence, setGestureSequence] = useState<string[]>([]);

  const handleGesture = (event: PanGestureHandlerGestureEvent) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX, translationY } = event.nativeEvent;
      let direction = '';

      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? 'right' : 'left';
      } else {
        direction = translationY > 0 ? 'down' : 'up';
      }

      const newSequence = [...gestureSequence, direction].slice(-5);
      setGestureSequence(newSequence);

      if (newSequence.join(' ') === 'up down left right up') {
        setGestureSequence([]);
        resetAndNavigate('DeliveryLogin');
      }
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <CustomSafeAreaView>
          <ProductSlider />
          <PanGestureHandler onHandlerStateChange={handleGesture}>
            <Animated.ScrollView
              bounces={false}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.subContainer}
              style={{ transform: [{ translateY: animatedValue }] }}
            >
            <LinearGradient colors={bottomColors} style={styles.gradient} />
              <View style={styles.content}>
                <Image source={require('@assets/images/logo.png')} style={styles.logo} />
                <CustomText fontFamily={Fonts.Bold}>Pakistan's first easy grocery app</CustomText>
                <CustomText fontFamily={Fonts.SemiBold} style={styles.text}>
                  Log in or Sign up
                </CustomText>

                <CustomInput
                  onChangeText={(text) => setPhoneNumber(text.slice(0, 10))}
                  onClear={() => setPhoneNumber('')}
                  value={phoneNumber}
                  left={
                    <CustomText style={styles.phoneText} fontFamily={Fonts.SemiBold}>
                      +92
                    </CustomText>
                  }
                  placeholder="Enter your Phone Number"
                  inputMode="numeric"
                />
                <CustomButton
                  disabled={phoneNumber.length !== 10 || loading}
                  onPress={handleAuth}
                  loading={loading}
                  title="Continue"
                />
              </View>
            </Animated.ScrollView>
          </PanGestureHandler>
        </CustomSafeAreaView>
        <View style={styles.footer}>
<SafeAreaView>
<Text>By Continuing you are agreeing to our terms and conditions
</Text>
    </SafeAreaView>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  gradient:{
 paddingTop:60,
 width: '100%',

  },

  footer:{
    borderTopWidth:0.8,
    borderColor:Colors.border,
    paddingBottom:0,
    zIndex:22,
    position:'absolute',
    bottom:0,
    justifyContent:'center',
    alignItems:'center',
    padding:10,
    backgroundColor:'#fff',
    width:'100%',

  },

  logo: {
    height: 50,
    width: 50,
    borderRadius: 20,
    marginVertical: 10,
  },
  phoneText: {
    marginLeft: 10,
  },
  text: {
    margin: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default CustomerLogin;
