/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, StyleSheet } from 'react-native'
import React, { FC, useEffect } from 'react'
import { useAuthStore } from '@state/authStore'
import { getOrderById } from '@service/orderService';
import { Colors, Fonts } from '@utils/Constants';
import LiveHeader from './LiveHeader';
import { ScrollView } from 'react-native-gesture-handler';
import  Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';
import DeliveryDetails from './DeliveryDetails';
import OrderSummary from './OrderSummary';

const Livetracking:FC = () => {


  const {currentOrder, setCurrentOrder} = useAuthStore();
  const fetchOrderDetails =  async()=>{
    const data = await getOrderById (currentOrder?._id as any)
    console.log(data)
    setCurrentOrder(data)
  }

  useEffect(()=>{
fetchOrderDetails();
  },[])

  let msg = "packing your order"
  let time = "arriving in 35 minutes"
  if(currentOrder?.status =='confirmed'){
    msg='arriving soon'
    time='arriving soon'
  }
  else if(currentOrder?.status == 'arriving'){
    msg='order has been given to delivery partner'
    time='arriving soon in 20 minutes'
  }
  else if(currentOrder?.status == 'delivered'){
    msg='order has beendelivered'
    time='delivered'
  }
  return (
    <View style={styles.container}>
      <LiveHeader type='Customer' title={msg} secondtitle={time}   />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
    {/*   <LiveMap />                    */} 

    <View style={styles.flexRow}>
      <View style={styles.iconContainer}>
        <Icon name = {currentOrder?.deliveryPartner ? 'phone':'shopping' } color={Colors.disabled} size={RFValue(20)}/>
        </View>
        <View style={{width:'82%'}}>
        
        <CustomText  numberOfLines={1} variant='h7' fontFamily={Fonts.SemiBold} >
          {currentOrder?.deliveryPartner?.name || "We will soon Assign delivery partner for you"}
        </CustomText>
        
        {currentOrder?.deliveryPartner && 
        <CustomText variant='h7' fontFamily={Fonts.Medium} >
          {currentOrder?.deliveryPartner?.phone}
        </CustomText>
        }
     
        <CustomText variant='h9' fontFamily={Fonts.Medium}>
          {currentOrder?.deliveryPartner? "For Delivery instuctions you can contact here":msg}
        </CustomText>
        
        </View>
   

    </View>
    <DeliveryDetails details={currentOrder?.customer} />
    <OrderSummary order={currentOrder}/>
      </ScrollView>
    </View>
  )
}


const styles= StyleSheet.create({
  flexRow:{
    flexDirection:'row',
    alignItems:'center',
    gap:10,
    width:'100%',
    borderRadius:15,
    marginTop:15,
  padding:10,
  paddingVertical:10,
  backgroundColor:'#fff',
  borderBottomWidth:0.7,
  borderColor:Colors.border
},
  iconContainer:{
    backgroundColor:Colors.backgroundSecondary,
    borderRadius:100,
    padding:10,
  justifyContent:'center',
  alignItems:'center'
  },
  container:{
    flex:1,
    backgroundColor:Colors.secondary
  },
  scrollContent:{
    paddingBottom:150,
    backgroundColor:Colors.backgroundSecondary,
    padding:15
  }
})

export default Livetracking