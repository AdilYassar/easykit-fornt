/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Text, StyleSheet, Animated} from 'react-native';
import React, {FC} from 'react';
import {
  StickyView,
  useCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import {Colors} from '@utils/Constants';
import {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import SearchBar from '../../../components/dashboard/SearchBar';

// Convert StickyView into an Animated component
const AnimatedStickyView = Animated.createAnimatedComponent(StickyView);

const StickySearchBar: FC = () => {
  const {scrollY} = useCollapsibleContext();

  // Apply animated styles using Reanimated's `useAnimatedStyle` hook
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 140], [0, 1]);
    return {
      opacity,
    };
  });

  return (
    <Animated.View /*style={animatedStyle}*/>
      <SearchBar />
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  shadow: {
    height: 15,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
});

export default StickySearchBar;
