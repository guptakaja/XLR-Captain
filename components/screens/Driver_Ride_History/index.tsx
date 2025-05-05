import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { getCompletedOrderByDriverId, getMissedOrderByDriverId } from '../../../api-requests/rideRequest';

const EarningsScreen: React.FC = () => {
  const driver_id = 27;
  
  // Update state variables to hold counts
  const [completedOrdersCount, setCompletedOrdersCount] = useState<number>(0);
  const [missedOrdersCount, setMissedOrdersCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const [completedOrdersData, missedOrdersData] = await Promise.all([
  //         getCompletedOrderByDriverId(driver_id),
  //         getMissedOrderByDriverId(driver_id),
  //       ]);
        
  //       console.log("completedOrders", completedOrdersData);
  //       setCompletedOrdersCount(completedOrdersData.completedOrdersCount);

  //       console.log("missedOrders", missedOrdersData);
  //       setMissedOrdersCount(missedOrdersData.MissedOrdersCount);
  //     } catch (err: any) {
  //       console.log("error", err);
  //       setError('Failed to fetch orders. Please try again.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchOrders();
  // }, [driver_id]);

  // if (loading) {
  //   return <Text>Loading...</Text>;
  // }

  // if (error) {
  //   return <Text>{error}</Text>;
  // }
  return (
    <>
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Screen Heading */}
        <View style={styles.screenHeadingContainer}>
          <Text style={styles.screenHeading}>Earnings</Text>
        </View>

        {/* Today's Earnings */}
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headerText}>₹ 0.0</Text>
            <Text style={styles.headerText}>Today's Earnings</Text>
            <TouchableOpacity>
              <Text style={styles.headerText}>→</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Completed Orders */}
        <View style={styles.card}>
          <View style={styles.orderSection}>
            <View style={styles.orderCompleted}>
              <Text style={[styles.orderCompletedNumber, styles.greenText]}>
                {completedOrdersCount}
              </Text>
              <Text style={[styles.orderCompletedTitle, styles.greenText]}>
                Completed orders
              </Text>
            </View>
            <View style={styles.orderCompletedValues}>
              <Text style={[styles.orderCompletedValue, styles.greenText]}>0.0</Text>
              <Text style={[styles.orderCompletedValue, styles.greenText]}>₹ 0.0</Text>
            </View>
          </View>

          <View style={styles.orderDetails}>
            <View style={styles.orderDetail}>
              <Text style={styles.orderDetailTitle}>Total KM</Text>
              <Text style={styles.orderDetailValue}>0.0 km</Text>
            </View>
            <View style={styles.orderDetail}>
              <Text style={styles.orderDetailTitle}>Order + Extra earnings</Text>
              <Text style={styles.orderDetailValue}>₹ 0.00</Text>
            </View>
            <View style={styles.orderDetail}>
              <Text style={styles.orderDetailTitle}>Penalty</Text>
              <Text style={styles.orderDetailValue}>-</Text>
            </View>
            <TouchableOpacity style={styles.orderDetailAction}>
              <Text style={styles.orderDetailActionText}>→</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Missed Orders */}
        <View style={styles.card}>
          <View style={styles.orderSection}>
            <View style={styles.orderCompleted}>
              <Text style={[styles.orderCompletedNumber, styles.redText]}>
                {missedOrdersCount}
              </Text>
              <Text style={[styles.orderCompletedTitle, styles.redText]}>
                Missed orders
              </Text>
            </View>
            <View style={styles.orderCompletedValues}>
              <Text style={[styles.orderCompletedValue, styles.redText]}>₹ 0.0</Text>
            </View>
          </View>

          <View style={styles.orderDetails}>
            <View style={styles.orderDetail}>
              <Text style={styles.orderDetailTitle}>Adjustment</Text>
              <Text style={styles.orderDetailValue}>₹ 0.0</Text>
            </View>
            <View style={styles.orderDetail}>
              <Text style={styles.orderDetailTitle}>Penalty</Text>
              <Text style={styles.orderDetailValue}>₹ 0.0</Text>
            </View>
            <TouchableOpacity style={styles.orderDetailAction}>
              <Text style={styles.orderDetailActionText}>→</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#000000',
    height:"100%"
  },
  screenHeadingContainer: {
    marginBottom: 16,
  },
  screenHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  card: {
    backgroundColor: '#000000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFD700',
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  orderSection: {
    marginTop: 16,
  },
  orderCompleted: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderCompletedNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 8,
    color: '#FFD700',
  },
  orderCompletedTitle: {
    fontSize: 14,
    color: '#FFD700',
  },
  orderCompletedValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderCompletedValue: {
    fontSize: 14,
    marginRight: 16,
    color: '#FFD700',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  orderDetail: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  orderDetailTitle: {
    fontSize: 12,
    color: '#FFD700',
  },
  orderDetailValue: {
    fontSize: 12,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  orderDetailAction: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  orderDetailActionText: {
    fontSize: 16,
    color: '#FFD700',
  },
  redText: {
    color: '#FFD700',
  },
  greenText: {
    color: '#FFD700',
  },
});

export default EarningsScreen;