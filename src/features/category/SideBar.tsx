/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { FC, useEffect, useRef } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import CustomText from '@components/ui/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '@utils/Constants';

interface Category {
  _id: string;
  name: string;
  image: string;
}

interface SideBarProps {
  selectedCategory: Category | null;
  categories: Category[]; // Ensure this is an array
  onCategoryPress: (category: Category) => void;
}

const SideBar: FC<SideBarProps> = ({ selectedCategory, categories = [], onCategoryPress }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const indicatorPosition = useSharedValue(0);
  const animatedValues = categories.map(() => useSharedValue(0));

  useEffect(() => {
    let targetIndex = -1;
    const itemHeight = 120; // Adjust based on your category item height

    // Corrected forEach loop to handle categories properly
    categories?.forEach((category: Category, index: number) => {
      const isSelected = selectedCategory?._id === category._id;
      animatedValues[index].value = withTiming(isSelected ? 2 : -20, { duration: 500 });
      if (isSelected) {
        targetIndex = index;
      }
    });

    if (targetIndex !== -1) {
      // Ensure the indicator moves by the correct distance based on item height
      indicatorPosition.value = withTiming(targetIndex * itemHeight, { duration: 500 });

      runOnJS(() => {
        scrollViewRef.current?.scrollTo({
          y: targetIndex * itemHeight,
          animated: true,
        });
      });
    }
  }, [selectedCategory]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: indicatorPosition.value }],
  }));

  return (
    <View style={styles.sideBar}>
      <ScrollView ref={scrollViewRef} contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
        <Animated.View>
          {categories.length > 0 ? (
            categories.map((category: Category, index: number) => (
              <TouchableOpacity
                key={category._id} // Ensure a unique key for each item
                activeOpacity={1}
                style={styles.categoryButton}
                onPress={() => onCategoryPress(category)}
              >
                <View style={styles.imgContainer}>
                  <Animated.Image source={{ uri: category.image }} style={[styles.image]} />
                </View>
                <CustomText
                  fontSize={RFValue(7)}
                  style={{
                    textAlign: 'center',
                    color: selectedCategory?._id === category._id ? Colors.secondary : '#333', // Change color based on selection
                  }}
                >
                  {category?.name}
                </CustomText>
              </TouchableOpacity>
            ))
          ) : (
            <CustomText fontSize={RFValue(10)} style={{ textAlign: 'center' }}>
              No categories available
            </CustomText>
          )}
        </Animated.View>
      </ScrollView>
      <Animated.View style={[styles.indicator, indicatorStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    alignItems: 'center', // Center the images
    marginBottom: 10, // Add spacing between images and text
  },
  image: {
    width: 100, // Set desired image width
    height: 100, // Set desired image height
    borderRadius: 25, // Make the image circular
  },
  categoryButton: {
    paddingVertical: 15,
    alignItems: 'center', // Center content within the button
  },
  sideBar: {
    width: '24%',
    backgroundColor: '#fff',
    borderRightWidth: 0.8,
    borderRightColor: '#eee',
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    right: 0,
    width: 4,
    height: 100, // Adjusted to match item height more closely
    backgroundColor: Colors.secondary,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
});

export default SideBar;
