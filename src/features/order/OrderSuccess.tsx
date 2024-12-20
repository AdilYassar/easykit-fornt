/* eslint-disable space-infix-ops */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import CustomHeader from '@components/ui/CustomHeader';
import CustomText from '@components/ui/CustomText';
import CustomButton from '@components/ui/CustomButton';
import {Colors, Fonts} from '@utils/Constants';
import {useAuthStore} from '@state/authStore';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation
import {navigate} from '@utils/Navigation';

interface OrderSuccessProps {
  route: {
    params: {
      items?: Array<{
        id: string;
        item: {name: string; price: number};
        count: number;
      }>; // Adjusted item structure
      totalPrice: number;
      address: string; // Adjust according to your address structure
      coupon?: string; // Added coupon field
    };
  };
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({route}) => {
  const {
    items = [],
    totalPrice,
    address = 'Not specified',
    coupon = 'No coupon applied',
  } = route.params; // Default to empty array
  const {user} = useAuthStore();
  const navigation = useNavigation(); // Initialize useNavigation

  return (
    <View style={styles.container}>
      <CustomHeader title="Order Successful" />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <CustomText variant="h2" fontFamily={Fonts.Bold} style={styles.title}>
          Thank you for your order!
        </CustomText>

        {/* Receipt Details Section */}
        <View style={styles.receiptContainer}>
          <CustomText
            variant="h4"
            fontFamily={Fonts.Regular}
            style={styles.subtitle}>
            Order Details
          </CustomText>

          {/* Items Ordered */}
          <View style={styles.detailsContainer}>
            <CustomText variant="h5" fontFamily={Fonts.Medium}>
              Items Ordered:
            </CustomText>
            {items.length > 0 ? (
              items.map(item => (
                <View key={item.id} style={styles.itemRow}>
                  <CustomText style={styles.itemText}>
                    {item.item.name} x {item.count}
                  </CustomText>
                  <CustomText style={styles.itemPrice}>
                    ${(item.item.price * item.count).toFixed(2)}
                  </CustomText>
                </View>
              ))
            ) : (
              <CustomText style={styles.itemText}>No items ordered.</CustomText>
            )}
          </View>

          {/* Coupon Details */}
          <View style={styles.couponContainer}>
            <CustomText variant="h5" fontFamily={Fonts.Medium}>
              Coupon Applied: {coupon}
            </CustomText>
          </View>

          {/* Total Price */}
          <View style={styles.totalContainer}>
            <CustomText variant="h5" fontFamily={Fonts.Medium}>
              Total Price:{' '}
              <CustomText style={styles.totalAmount}>
                ${totalPrice.toFixed(2)}
              </CustomText>
            </CustomText>
          </View>

          {/* Delivery Address */}
          <View style={styles.addressContainer}>
            <CustomText variant="h5" fontFamily={Fonts.Medium}>
              Delivering to:
            </CustomText>
            <CustomText style={styles.addressText}>
              {user?.address || address || 'Address not specified'}
            </CustomText>
          </View>

          {/* Cancellation Policy (Placeholder) */}
          <View style={styles.cancellationContainer}>
            <CustomText variant="h5" fontFamily={Fonts.Medium}>
              Cancellation Policy:
            </CustomText>
            <CustomText style={styles.cancellationText}>
              You can cancel your order within 30 minutes for a full refund.
            </CustomText>
          </View>
        </View>
      </ScrollView>

      {/* Live Tracking Button */}
      <View style={styles.buttonContainer}>
        <View style={styles.trackButton}>
          <CustomButton
            title="Live Tracking"
            onPress={() => {
              navigate('LiveTracking'); // Navigate to the Live Tracking screen
            }}
            disabled={false}
            loading={false}
          />
        </View>

        {/* Back to Home Button */}

        <View style={styles.homeButton}>
          <CustomButton
            title="Back to Home"
            onPress={() => {
              navigate('ProductDashboard'); // Navigate to the home screen
            }}
            disabled={false}
            loading={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
    color: Colors.primary,
  },
  subtitle: {
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.secondary,
  },
  receiptContainer: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.text, // Ensure Colors.shadow is defined
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  itemText: {
    fontSize: 16,
    color: Colors.text,
  },
  itemPrice: {
    fontSize: 16,
    color: Colors.text,
  },
  couponContainer: {
    marginBottom: 10,
  },
  totalContainer: {
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 10,
  },
  totalAmount: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
  addressContainer: {
    marginBottom: 10,
  },
  addressText: {
    color: Colors.secondary,
  },
  cancellationContainer: {
    marginTop: 10,
  },
  cancellationText: {
    color: Colors.secondary,
  },
  buttonContainer: {
    margin: 10,
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  trackButton: {
    //backgroundColor: Colors.primary,
    width: '40%',
    marginBottom: 10,
    right: 5,
  },
  homeButton: {
    width: '40%',
    left: 80,
    // backgroundColor: Colors.secondary,
  },
});

export default OrderSuccess;
