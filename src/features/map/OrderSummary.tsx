/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { Colors, Fonts } from '@utils/Constants';
import CustomText from '@components/ui/CustomText';

const OrderSummary: FC<{ order: any }> = ({ order }) => {
    // Check if the order and items are defined

    return (
        <View style={styles.container}>
            <CustomText variant='h5' fontFamily={Fonts.SemiBold}>
                Order ID: {order?.orderID|| 'N/A'}
            </CustomText>
           
      
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 15,
        marginVertical: 15,
        padding: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    itemsContainer: {
        marginVertical: 10,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    totalRow: {
        marginTop: 10,
        borderTopWidth: 1,
        borderColor: Colors.border,
        paddingTop: 10,
    },
});

export default OrderSummary;
