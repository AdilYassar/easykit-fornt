/* eslint-disable @typescript-eslint/no-unused-vars */
//import liraries
import Header from '@components/dashboard/Header';
import {useCollapsibleContext} from '@r0b0t3d/react-native-collapsible';
import React, {Component, FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

// create a component
const AnimatedHeader: FC<{showNotice: () => void}> = ({showNotice}) => {
  const {scrollY} = useCollapsibleContext();
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 120], [1, 0]);
    return {opacity};
  });
  return (
    <Animated.View style={headerAnimatedStyle}>
      <Header showNotice={showNotice} />
    </Animated.View>
  );
};

//make this component available to the app
export default AnimatedHeader;
