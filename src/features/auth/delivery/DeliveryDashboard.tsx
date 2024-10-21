/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, StyleSheet, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '@utils/Constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuthStore } from '@state/authStore'
import DeliveryHeader from '@components/delivery/DeliveryHeader'
import TabBar from './TabBar'
import { fetchOrders } from '@service/orderService'
import CustomText from '@components/ui/CustomText'
import OrderItem from './OrderItem'

const DeliveryDashboard = () => {
  const { user } = useAuthStore()
  const [selectedTab, setSelectedTab] = useState<'available' | 'delivered'>('available')
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any[]>([])
  const [refreshing, setRefreshing] = useState(false)

  const renderOrderItem = ({ item, index }: any) => {
    return (
      <OrderItem index={index} item={item} />
    )
  }

  const fetchData = async () => {
    try {
      setRefreshing(true)
      setLoading(true)
      const orders = await fetchOrders(selectedTab, user?._id, user?.branch)
      setData(orders)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setRefreshing(false)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [selectedTab])

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <DeliveryHeader name={user?.name} email={user?.email} />
      </SafeAreaView>
      <View style={styles.subContainer}>
        <TabBar selectedTab={selectedTab} onTabChange={setSelectedTab} />
        <FlatList
          data={data}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
          }
          ListEmptyComponent={() => {
            if (loading) {
              return (
                <View style={styles.center}>
                  <ActivityIndicator color={Colors.secondary} size="small" />
                </View>
              )
            }
            return (
              <View style={styles.center}>
                <CustomText>
                  No orders right now
                </CustomText>
              </View>
            )
          }}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.orderID || item.id} // Fallback to item.id
          contentContainerStyle={styles.FlatListContainer}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  subContainer: {
    backgroundColor: Colors.backgroundSecondary,
    flex: 1,
    padding: 6,
  },
  FlatListContainer: {
    padding: 2,
  },
  center: {
    flex: 1,
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default DeliveryDashboard;
