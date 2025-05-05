import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DriverDashboard: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Icon name="motorcycle" size={40} color="#D4A437" style={styles.bikeIcon} />
        <Text style={styles.header}>Driver Dashboard</Text>
        <Image
          source={{ uri: 'https://example.com/car.png' }}
          style={styles.carImage}
        />
      </View>

      {/* Static Info Block Instead of LineChart */}
      <View style={styles.analyticsContainer}>
        <Text style={styles.analyticsTitle}>Analytics Overview</Text>
        <Text style={styles.analyticsText}>Completed: 10</Text>
        <Text style={styles.analyticsText}>Cancelled: 2</Text>
        <Text style={styles.analyticsText}>In Progress: 5</Text>
        <Text style={styles.analyticsText}>Ongoing: 3</Text>
      </View>

      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Completed Rides</Text>
          <Text style={styles.metricValue}>10</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Cancelled Rides</Text>
          <Text style={styles.metricValue}>2</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Rides In Progress</Text>
          <Text style={styles.metricValue}>5</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Ongoing Rides</Text>
          <Text style={styles.metricValue}>3</Text>
        </View>
      </View>

      <View style={styles.performanceContainer}>
        <Text style={styles.performanceTitle}>Performance Metrics</Text>
        <View style={styles.performanceCard}>
          <Text style={styles.performanceMetric}>Rating: 4.8</Text>
        </View>
        <View style={styles.performanceCard}>
          <Text style={styles.performanceMetric}>Punctuality: 92%</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  bikeIcon: {
    marginRight: 10,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#D4A437',
  },
  carImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  analyticsContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
  },
  analyticsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D4A437',
    marginBottom: 10,
  },
  analyticsText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  metricCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '48%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    alignItems: 'center',
  },
  metricTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D4A437',
  },
  performanceContainer: {
    marginBottom: 30,
  },
  performanceTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#D4A437',
  },
  performanceCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  performanceMetric: {
    fontSize: 18,
    color: '#D4A437',
  },
});

export default DriverDashboard;
