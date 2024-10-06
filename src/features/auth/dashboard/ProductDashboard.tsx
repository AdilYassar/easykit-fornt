/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Animated as RNAnimated, StyleSheet} from 'react-native';
import React, {useEffect, useRef} from 'react';
import NoticeAnimations from './NoticeAnimations';
import {NoticeHeight} from '@utils/scaling';
import {SafeAreaView} from 'react-native-safe-area-context';
import Visuals from './Visuals';
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  withCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import AnimatedHeader from './AnimatedHeader';
import StickySearchBar from './StickySearchBar';

const NOTICE_HEIGHT = -(NoticeHeight + 12);

const ProductDashboard = () => {
  const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;

  const slideUp = () => {
    RNAnimated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: false, // useNativeDriver true for animations
    }).start();
  };

  const slideDown = () => {
    RNAnimated.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false, // useNativeDriver true for animations
    }).start();
  };

  useEffect(() => {
    slideDown();
    const timeoutId = setTimeout(() => {
      slideUp();
    }, 3500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <NoticeAnimations noticePosition={noticePosition}>
      <>
        <Visuals />
        <SafeAreaView />
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
        </CollapsibleContainer>
      </>
    </NoticeAnimations>
  );
};

const styles = StyleSheet.create({
  panelContain: {
    flex: 1,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
});

export default withCollapsibleContext(ProductDashboard);
