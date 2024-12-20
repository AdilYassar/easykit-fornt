
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import  Icon  from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts } from '@utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import RollingBar from 'react-native-rolling-bar';
import CustomText from '@components/ui/CustomText';
import { navigate } from '@utils/Navigation';

const SearchBar:FC = () => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <Icon name="search" color={Colors.text} size={RFValue(20)} 
      onPress={()=>navigate('Search')}
      />
      <RollingBar interval={3000} defaultStyle={false} customStyle={styles.textContainer} >
        <CustomText variant="h6" fontFamily={Fonts.Medium}> Search "Nachos Machos"</CustomText>
        <CustomText variant="h6" fontFamily={Fonts.Medium}> Search "Milk"</CustomText>
        <CustomText variant="h6" fontFamily={Fonts.Medium}> Search "IceCream"</CustomText>
        <CustomText variant="h6" fontFamily={Fonts.Medium}> Search "Protien bars"</CustomText>
        <CustomText variant="h6" fontFamily={Fonts.Medium}> Search "Namkeen"</CustomText>
        <CustomText variant="h6" fontFamily={Fonts.Medium}> Search "butter"</CustomText>
      </RollingBar>
      <View style={styles.divide} />
      <Icon name="mic" color={Colors.text} size={RFValue(20)} />

    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container:{
    backgroundColor:'#F3F4F7',
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-between',
    borderRadius:10,
    borderWidth:0.6,
    borderColor:Colors.border,
    marginTop:15,
    overflow: 'hidden',
    marginHorizontal:10,
    paddingHorizontal:10,
  },
  textContainer:{
    width:'90%',
    paddingLeft:10,
    height:50,
  },
  divide:{
    width:1,
    height:24,
    backgroundColor:'#ddd',
    marginHorizontal:10,
  },
});
export default SearchBar;
