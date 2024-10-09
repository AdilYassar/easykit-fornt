/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';

interface BillDetailsProps {
  totalItemPrice: number;
}

const BillDetails: FC<BillDetailsProps> = ({ totalItemPrice }) => {
  return (
    <View style={styles.container}>
      <CustomText fontFamily={Fonts.Bold}  style={styles.header}>Bill Details</CustomText >
      <View style={styles.row}>
        <Text style={styles.label}>Total Item Price:</Text>
        <Text style={styles.value}>${totalItemPrice.toFixed(2)}</Text>
      </View>
      {/* Add other details like tax, delivery fee, and total amount here */}
      <View style={styles.row}>
        <Text style={styles.label}>Tax (10%):</Text>
        <Text style={styles.value}>${(totalItemPrice * 0.10).toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Delivery Fee:</Text>
        <Text style={styles.value}>$5.00</Text>
      </View>
      <View style={styles.row}>
        <CustomText fontFamily={Fonts.Bold} style={styles.label}>Grand Total:</CustomText>
        <Text style={styles.value}>${(totalItemPrice * 1.10 + 5).toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default BillDetails;
