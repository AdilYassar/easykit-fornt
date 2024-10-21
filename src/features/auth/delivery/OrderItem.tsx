/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { Colors, Fonts } from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import { RFValue } from 'react-native-responsive-fontsize';

interface CartItem {
    _id: string | number;
    item: any;
    count: number;
}

interface Order {
    orderID: string;
    items: CartItem[];
    totalPrice: number;
    createdAt: string;
    status: 'confirmed' | 'completed';
}

const OrderItem: FC<{ item: Order; index: number }> = ({ item, index }) => {
    // Determine the background color based on the order status
    const statusColor = item.status === 'confirmed' ? Colors.secondary : Colors.primary;

    return (
        <View style={styles.container}>
            <View style={styles.flexRowBetween}>
                <CustomText variant='h8' fontFamily={Fonts.Medium}>
                    Order #{item.orderID}
                </CustomText>
                <View style={[styles.statusContainer, { backgroundColor: statusColor }]}>
                    <CustomText style={styles.status} fontFamily={Fonts.Medium}>
                        {item.status}
                    </CustomText>
                </View>
                
            </View>

            <View style={styles.itemContainer}>
                <CustomText variant='h9'>Total Price: ${item.totalPrice}</CustomText>
                <CustomText style={styles.dateText}>Created At: {item.createdAt}</CustomText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    statusContainer: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    status: {
        textTransform: 'capitalize',
        color: 'white'
    },
    container: {
        borderWidth: 0.7,
        padding: 10,
        borderColor: Colors.border,
        borderRadius: 10,
        paddingVertical: 15,
        marginVertical: 10,
        backgroundColor: 'white',
    },
    flexRowBetween: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    itemContainer: {
        marginTop: 10,
    },
    dateText: {
        marginTop: 2,
        fontSize: RFValue(8)
    },
});

export default OrderItem;
