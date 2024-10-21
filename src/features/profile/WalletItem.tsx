/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import Icon  from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts } from '@utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';

const WalletItem:FC<{icon:string; label:string}>= ({icon,label}) => {
  return (
    <View style={styles.WalletItemContainer}>
        <Icon name={icon} color={Colors.text} size={RFValue(20)}   />
        <CustomText variant='h8' fontFamily={Fonts.Medium} style={{right:-10}}>
    {label}
        </CustomText>
      
    </View>
  )
}
const styles = StyleSheet.create({
    WalletItemContainer: {
        flexDirection: 'row', // To position icon and text horizontally
        alignItems: 'center', // Align them vertically
        padding: RFValue(10), // Add some padding around the container
        marginBottom: RFValue(10), // Add margin between wallet items if needed
        
      }
})

export default WalletItem