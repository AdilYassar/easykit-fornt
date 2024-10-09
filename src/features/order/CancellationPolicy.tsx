import React, { FC } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors, Fonts } from '@utils/Constants';

const CancellationPolicy: FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cancellation Policies</Text>
      <ScrollView>
        <View style={styles.policyItem}>
          <Text style={styles.policyTitle}>1. Free Cancellation</Text>
          <Text style={styles.policyDescription}>
            Orders can be canceled free of charge up to 24 hours before the scheduled delivery time.
          </Text>
        </View>

        <View style={styles.policyItem}>
          <Text style={styles.policyTitle}>2. Partial Refund</Text>
          <Text style={styles.policyDescription}>
            Cancellations made between 12 to 24 hours before the delivery time will be eligible for a 50% refund.
          </Text>
        </View>

        <View style={styles.policyItem}>
          <Text style={styles.policyTitle}>3. No Refund</Text>
          <Text style={styles.policyDescription}>
            Cancellations made within 12 hours of the delivery time will not be eligible for a refund.
          </Text>
        </View>

        <View style={styles.policyItem}>
          <Text style={styles.policyTitle}>4. Special Cases</Text>
          <Text style={styles.policyDescription}>
            If an order is canceled due to unforeseen circumstances like natural disasters, you may be eligible for a full refund.
          </Text>
        </View>

        <View style={styles.policyItem}>
          <Text style={styles.policyTitle}>5. How to Cancel</Text>
          <Text style={styles.policyDescription}>
            You can cancel your order by visiting the "My Orders" section of the app or by contacting customer support.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    fontSize: 18,
    fontFamily: Fonts.Bold,
    marginBottom: 10,
    color: Colors.primary,
  },
  policyItem: {
    marginBottom: 15,
  },
  policyTitle: {
    fontSize: 16,
    fontFamily: Fonts.SemiBold,
    color: Fonts.Bold,
    marginBottom: 5,
  },
  policyDescription: {
    fontSize: 14,
    fontFamily: Fonts.Regular,
    color: Colors.text,
  },
});

export default CancellationPolicy;
