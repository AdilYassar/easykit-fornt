import {View, StyleSheet} from 'react-native';
import React from 'react';
import {adData, categories} from '@utils/dummyData';
import AdCrousal from './AdCrousal';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import CategoryContainer from './CategoryContainer';

const Content = () => {
  return (
    <View style={styles.container}>
      <AdCrousal adData={adData} />
      <CustomText variant="h5" fontFamily={Fonts.Bold} >Home Nessecities</CustomText>
      <CategoryContainer data={categories} />
      <CustomText variant="h5" fontFamily={Fonts.Bold} >Daily needs</CustomText>
      <CategoryContainer data={categories} />
      <CustomText variant="h5" fontFamily={Fonts.Bold} >Sanitary</CustomText>
      <CategoryContainer data={categories} />
      <CustomText variant="h5" fontFamily={Fonts.Bold} >Snacks</CustomText>
      <CategoryContainer data={categories} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
export default Content;
