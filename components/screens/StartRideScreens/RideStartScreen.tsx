import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking,StatusBar , Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';


type RideRequest = {
    bookingId: string;
    userId: number;
    driverId: number;
    pickupAddress: {
      name: string;
      latitude: number;
      longitude: number;
    };
    dropoffAddress: {
      name: string;
      latitude: number;
      longitude: number;
    };
    totalPrice: number;
    vehicleName: string;
    sender_name: string;
    sender_phone: string;
    receiver_name: string;
    receiver_phone: string;
    otp: string;
    
  };

type RideStartScreenProps = {
  route: RouteProp<ParamListBase, 'RideStartScreen'> & {
    params: {
      rideRequest: RideRequest; 
    };
  };
};

const RideStartScreen: React.FC<RideStartScreenProps> = ({ route }) => {
  const { rideRequest } = route.params;
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();
  const [timeLeft, setTimeLeft] = useState(300); // Time in seconds (5 minutes)
  const pickupLocation = rideRequest.pickupAddress;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleCallSender = () => {
    Linking.openURL(`tel:${rideRequest.sender_phone}`);
  };

  const handleStartRide = () => {
    // Navigate to the next screen or start trip functionality
    navigation.navigate('VerifyOtpScreen', { rideRequest });
  };

  return (
    <View style={styles.container}>
      {/* Set Status Bar color */}
      <StatusBar backgroundColor="#000" barStyle="light-content" />

      {/* Top Navigation Bar */}
      <View style={styles.topBar}>
        <Text style={styles.waitText}>WAIT FOR</Text>
        <Text style={styles.senderName}>{rideRequest.sender_name}</Text>
        <TouchableOpacity onPress={handleCallSender}>
          <Icon name="phone" size={24} color="#000" style={styles.callIcon} />
        </TouchableOpacity>
      </View>

      {/* Location Details */}
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>{pickupLocation.name}</Text>
        <TouchableOpacity>
          <Text style={styles.navigateText}>NAVIGATE</Text>
        </TouchableOpacity>
      </View>

      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: pickupLocation.latitude,
          longitude: pickupLocation.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker
          coordinate={{ latitude: pickupLocation.latitude, longitude: pickupLocation.longitude }}
          title="Pickup Location"
          description={pickupLocation.name}
        />
      </MapView>

      {/* Bottom Container */}
      <View style={styles.bottomContainer}>
        <Text style={styles.arrivalText}>CUSTOMER TO ARRIVE IN</Text>
        <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
        <TouchableOpacity style={styles.startTripButton} onPress={handleStartRide}>
          <Text style={styles.startTripText}>START TRIP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 10,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderColor: '#FFD700',
  },
  waitText: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 16,
  },
  senderName: {
    color: '#FFD700',
    fontSize: 16,
  },
  callIcon: {
    width: 24,
    height: 24,
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#FFD700',
    backgroundColor:"white"
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  navigateText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  map: {
    flex: 1,
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: '#000000',
    borderTopWidth: 1,
    borderColor: '#FFD700',
  },
  arrivalText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
    color: '#FFD700',
  },
  timer: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
  },
  startTripButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  startTripText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RideStartScreen;