/* eslint-disable space-infix-ops */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, StyleSheet, ScrollView, Platform, Image, Alert } from 'react-native';
import React, { FC, useState } from 'react';
import CustomHeader from '@components/ui/CustomHeader';
import { Colors, Fonts } from '@utils/Constants';
import OrderList from './OrderList';
import CouponInput from './CouponInput';
import BillDetails from './BillDetails';
import { useCartStore } from '@state/cartStore';
import CancellationPolicy from './CancellationPolicy';
import CustomButton from '@components/ui/CustomButton';
import { hocStyle } from '@styles/GlobalStyles';
import CustomText from '@components/ui/CustomText';
import { useAuthStore } from '@state/authStore';
import { navigate } from '@utils/Navigation';
import { createOrder } from '@service/orderService';


const ProductOrder: FC = () => {
  const getTotalPrice = useCartStore((state) => state.getTotalPrice); // Correctly call getTotalPrice from the store
  const totalItemPrice = getTotalPrice(); // Call the function to get the total price
  const { user, currentOrder, setCurrentOrder } = useAuthStore(); // Fetch user details
  const { cart, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false); // State for loading status

  // A function to handle what happens when the button is pressed
  const handlePlaceOrder = async () => {
  

    const formattedData = cart.map(item => ({
      id: item._id,
      item: item._id,
      count: item.count,
    }));

    if (formattedData.length === 0) {
      Alert.alert("Add any items so that you can order it");
      return;
    }

    setLoading(true); // Set loading state to true
    try {
      const data = await createOrder(formattedData, totalItemPrice);
      if (data !== null) {
        setCurrentOrder(data);
        clearCart();
        navigate('OrderSuccess', { ...data });
      }
    } catch (error) {
      Alert.alert("An error occurred while placing the order. Please try again.");
      console.error(error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Checkout" />
      <ScrollView style={styles.scrollContainer}>
        <OrderList />
        <CouponInput />
        <BillDetails totalItemPrice={totalItemPrice} />
        <CancellationPolicy />

        {/* Address Container */}
        <View style={hocStyle.cartContainer}>
          <View style={styles.absoluteContainer}>
            <View style={styles.addressContainer}>
              <View style={styles.flexRow}>
                <Image
                  source={require('@assets/icons/home.png')}
                  style={{ width: 20, height: 20 }}
                />
                <View style={{ width: '75%' }}>
                  <CustomText variant="h8" fontFamily={Fonts.Medium}>
                    Delivering to your doorstep
                  </CustomText>
                  <CustomText variant="h9" numberOfLines={2} style={{ opacity: 0.5 }}>
                    {user?.address}
                  </CustomText>
                </View>
              </View>
            </View>

            {/* Place Order Button */}
            <View style={styles.buttonContainer}>
              <CustomButton
                title="Place Order"
                onPress={handlePlaceOrder} // Function to call when button is pressed
                disabled={loading} // Disable the button while loading
                loading={loading} // Show loading indicator
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  addressContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
  absoluteContainer: {
    marginVertical: 15,
    marginBottom: Platform.OS === 'ios' ? 30 : 10,
  },
  container: {
    flex: 1,
    left: -5,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    backgroundColor: '#fff',
    padding: 10,
    paddingBottom: 250,
  },
  buttonContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
});

export default ProductOrder;
