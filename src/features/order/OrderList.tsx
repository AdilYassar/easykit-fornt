/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { useCartStore } from '@state/cartStore';
import CustomText from '@components/ui/CustomText';
import { Colors, Fonts } from '@utils/Constants';
import OrderItem from './OrderItem';

const OrderList = () => {
  const cartItems = useCartStore((state) => state.cart);
  const totalItems = cartItems?.reduce((acc, cart) => acc + cart?.count, 0);

  return (
    <View>
      <View style={styles.flexRow}>
        <View style={styles.imageContainer}>
          <Image source={require('@assets/icons/clock.png')} style={styles.img} />
        </View>
        <View>
          <CustomText variant="h7" fontFamily={Fonts.SemiBold}>
            Delivery in 25 minutes minimum
          </CustomText>
          <CustomText style={{ opacity: 0.5 }} variant="h8" fontFamily={Fonts.SemiBold}>
            Delivery items: {totalItems || 0} item(s)
          </CustomText>
        </View>
      </View>

      {/* Render OrderItem components outside of the delivery info view */}
      {cartItems?.map((item) => (
        <OrderItem key={item._id} item={item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
  },
  img: {
    width: 30,
    height: 30,
  },
  imageContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    borderRadius: 15,
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
});

export default OrderList;
