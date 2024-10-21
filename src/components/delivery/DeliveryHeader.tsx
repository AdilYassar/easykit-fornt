/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { useAuthStore } from '@state/authStore';
import { Colors, Fonts } from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import Icon from 'react-native-vector-icons/Ionicons';
import { resetAndNavigate } from '@utils/Navigation';
import { storage, tokenStorage } from '@state/storage';

interface DeliveryHeaderProps{
    name:string;
    email:string;

}
const DeliveryHeader:FC<DeliveryHeaderProps> = ({name,email}) => {
    const {logout} = useAuthStore()
  return (
    <View style={styles.flexRow}>
      <View style={styles.imgContainer}>
      <Image source={{ uri: 'https://tse2.mm.bing.net/th?id=OIP.Y2PaXLLMejDhE8LD8sbYYwHaHa&pid=Api&P=0&h=220' }} style={styles.img} />
      </View>
      <View style={styles.info}>
        <CustomText variant='h4' fontFamily={Fonts.SemiBold}>
            Hello {name} !
        </CustomText>
        <CustomText variant='h8' fontFamily={Fonts.Medium}>
             {email} 
        </CustomText>
      </View>
      <TouchableOpacity onPress={()=>{
        resetAndNavigate("CustomerLogin")
        logout()
        tokenStorage.clearAll()
        storage.clearAll()
      }}>
        <Icon name='log-out-sharp' size={30} color='black' />
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    flexRow:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        padding:10
    },
    imgContainer:{
        padding:4,
        borderRadius:100,
        height:60,
        width:60,
        overflow:'hidden',
        backgroundColor:Colors.backgroundSecondary
    },
    img:{
        width:'100%',
        bottom:-8,
        height:'100%',
        resizeMode:'contain',

    },
    info:{
        width:'70%',

    }
})

export default DeliveryHeader