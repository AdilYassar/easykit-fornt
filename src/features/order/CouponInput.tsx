import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '@utils/Constants';

const CompactCouponInput: React.FC = () => {
  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = () => {
    // Add functionality to apply the coupon code
    console.log('Coupon Applied:', couponCode);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={couponCode}
        onChangeText={setCouponCode}
        placeholder="Enter coupon"
        style={styles.input}
        placeholderTextColor="#666"
      />
      <TouchableOpacity style={styles.applyButton} onPress={handleApplyCoupon}>
        <Ionicons name="checkmark" size={24} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    color: '#333',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  applyButton: {
    padding: 5,
  },
});

export default CompactCouponInput;
