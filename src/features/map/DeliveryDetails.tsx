/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { Colors, Fonts } from '@utils/Constants'
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomText from '@components/ui/CustomText'



const DeliveryDetails:FC<{details:any}> = ({details}) => {
  return (
    <View style={styles.contaner}>
     <View style={styles.flexRow}>
        <View style={styles.iconContainer}>
            <Icon name='bike-fast' color={Colors.disabled} size={RFValue(20)} />

        </View>
        <View>
            <CustomText variant='h5' fontFamily={Fonts.SemiBold} >
                your delivery details
            </CustomText>
            <CustomText variant='h8' fontFamily={Fonts.Medium}>
                details of your current order
            </CustomText>
        </View>

     </View>
     <View style={styles.flexRow2}>
        <View style={styles.iconContainer}>
            <Icon name="map-marker-outline" color={Colors.disabled} size={RFValue(20)} />

        </View>
        <View style={{width:'80%'}}>
            <CustomText variant='h8' fontFamily={Fonts.Medium} >
                delivery at your house
            </CustomText>
            <CustomText numberOfLines={2} variant='h8' fontFamily={Fonts.Regular}>
                {details?.address || ' House no. 50 block b nespak phase 3 defense road lahore '}
            </CustomText>
        </View>

     </View>
     <View style={styles.flexRow}>
        <View style={styles.iconContainer}>
            <Icon name='phone-outline' color={Colors.disabled} size={RFValue(20)} />

        </View>
        <View style={{width:'80%'}}>
            <CustomText variant='h5' fontFamily={Fonts.SemiBold} >
               {details?.name}
            </CustomText>
            <CustomText variant='h8' fontFamily={Fonts.Medium}>
              Your contact number : 03447041920
            </CustomText>
            
        </View>

     </View>
    </View>
  )
}
const styles=StyleSheet.create({
    contaner:{
        width:'100%',
        borderRadius:15,
        marginVertical:15,
        paddingVertical:10,
        backgroundColor:'#fff'
    },
    flexRow:{
        flexDirection:'row',
        alignItems:'center',
        gap:10,
        padding:10,
        borderBottomWidth:0.7,
        borderColor:Colors.border

    },
    flexRow2:{
        flexDirection:'row',
        alignItems:'center',
        gap:10,
        padding:10,
       

    },
    iconContainer:{
        backgroundColor:Colors.backgroundSecondary,
        borderRadius:100,
        padding:10,
        justifyContent:'center',
        alignItems:'center'
    }
})
export default DeliveryDetails