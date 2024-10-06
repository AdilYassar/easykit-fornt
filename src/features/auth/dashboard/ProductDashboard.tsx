import { View, Animated as RNAnimated, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import React, { FC, useEffect, useRef } from 'react';
import NoticeAnimations from './NoticeAnimations';
import { NoticeHeight, screenHeight } from '@utils/scaling';
import { SafeAreaView } from 'react-native-safe-area-context';
import Visuals from './Visuals';
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  CollapsibleScrollView,
  useCollapsibleContext,
  withCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import AnimatedHeader from './AnimatedHeader';
import StickySearchBar from './StickySearchBar';
import Content from '@components/dashboard/Content';
import CustomText from '@components/ui/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import { Fonts } from '@utils/Constants';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

const NOTICE_HEIGHT = -(NoticeHeight + 12);

const ProductDashboard: FC = () => {
  const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;
  const { scrollY, expand } = useCollapsibleContext();
  const previousScroll = useRef<number>(0);

  // Use Animated Style for Back-to-Top Button
  const backToTopStyle = useAnimatedStyle(() => {
    const isScrollingUp = scrollY.value < previousScroll.current && scrollY.value > 180;
    const opacity = withTiming(isScrollingUp ? 1 : 0, { duration: 300 });
    const translateY = withTiming(isScrollingUp ? 0 : 10, { duration: 300 });

    previousScroll.current = scrollY.value;

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const slideUp = () => {
    RNAnimated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: false, // Use native driver for performance boost
    }).start();
  };

  const slideDown = () => {
    RNAnimated.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false, // Use native driver for performance boost
    }).start();
  };

  useEffect(() => {
    slideDown();
    const timeoutId = setTimeout(() => {
      slideUp();
    }, 3500);
    return () => clearTimeout(timeoutId);
  });

  return (
    <NoticeAnimations noticePosition={noticePosition}>
      <>
        <Visuals />
        <SafeAreaView />

        {/* Apply animated style to Back-to-Top Button */}
        <Animated.View style={[styles.backToTopButton, backToTopStyle]}>
          <TouchableOpacity
            onPress={() => {
              scrollY.value = 0;
              expand();
            }}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Icon name="arrow-up-circle-outline" color="white" size={RFValue(12)} />
            <CustomText variant="h9" style={{ color: 'white' }} fontFamily={Fonts.SemiBold}>
              Back to Home
            </CustomText>
          </TouchableOpacity>
        </Animated.View>

        <CollapsibleContainer style={styles.panelContain}>
          <CollapsibleHeaderContainer containerStyle={styles.transparent}>
            <AnimatedHeader
              showNotice={() => {
                slideDown();
                const timeoutId = setTimeout(() => {
                  slideUp();
                }, 3500);

                // Returning a cleanup function to clear timeout on component unmount
                return () => clearTimeout(timeoutId);
              }}
            />
            <StickySearchBar />
          </CollapsibleHeaderContainer>
          <CollapsibleScrollView nestedScrollEnabled style={styles.panelContain} showsVerticalScrollIndicator={false}>
            <Content />

            <View style={{ backgroundColor: '#F8F8F8', padding: 20 }}>
              <CustomText fontSize={RFValue(36)} fontFamily={Fonts.Bold} style={{ opacity: 0.2 }}>
                Your Easy Grocery Kit
              </CustomText>
              <CustomText fontFamily={Fonts.Bold} style={{ marginTop: 10, paddingBottom: 100, opacity: 0.2 }}>
                Developed by Adil.
              </CustomText>
            </View>
          </CollapsibleScrollView>
        </CollapsibleContainer>
      </>
    </NoticeAnimations>
  );
};

const styles = StyleSheet.create({
  panelContain: {
    flex: 1,
  },
  backToTopButton: {
    position: 'absolute',
    alignSelf: 'center',
    top: Platform.OS === 'ios' ? screenHeight * 0.18 : 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 999,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
});

export default withCollapsibleContext(ProductDashboard);
