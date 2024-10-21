/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@utils/Constants'
import WalletItem from './WalletItem'

const WalletSection = () => {
  return (
    <View style={styles.walletContainer}>
     <WalletItem icon="wallet-outline" label='wallet' />
     <WalletItem icon="chatbox" label='support' />
     <WalletItem icon="card-outline" label='Payments' />
    </View>
  )
}
const styles = StyleSheet.create({
    walletContainer:{
        justifyContent:'center',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:Colors.backgroundSecondary,
        paddingVertical:15,
        borderRadius:15,
        marginVertical:20
        
    }
})
export default WalletSection