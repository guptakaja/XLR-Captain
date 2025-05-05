import React from "react";
import { StatusBar, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./types";

// Screens
import LoginScreen from "../components/screens/Driver_Login/index";
import Otp_form from "../components/screens/Otp/index";
import HomeScreen from "../components/screens/Drive_Home";
import DriverTermsAndConditionsScreen from "../components/screens/Terms&Condition/index";
import DriverDetailsScreen from "../components/screens/Driver_Profile";
import DriverEarningScreen from "../components/screens/Driver_Earnings/index";
import DriverRegistration from "../components/screens/User_SignUp";
import DriverDocuments from "../components/screens/Driver_Documents";
import EarningsScreen from "../components/screens/Driver_Ride_History";
import Pancard from "../components/screens/Driver_Documents/Pancard";
import Rc_document from "../components/screens/Driver_Documents/Rc_document";
import Review_screen from "../components/screens/Driver_Documents/Review_screen";
import Aadhar_document from "../components/screens/Driver_Documents/Aadhar_document";
import Driver_documents from "../components/screens/Driver_Documents/Driver_documents";
import Insurance from "../components/screens/Driver_Documents/Insurance";
import TabsNavigator from "../components/screens/Drive_Home/AppTabs";
import GoToUserLocationScreen from "../components/screens/StartRideScreens/go_to_userLocationScreen";
import VerifyOtpScreen from "../components/screens/StartRideScreens/verifyOtpScreen";
import PaymentScreen from "../components/screens/StartRideScreens/paymentScreen";
import RideStartScreen from "../components/screens/StartRideScreens/RideStartScreen";
import RideEndScreen from "../components/screens/StartRideScreens/RideEndScreen";

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="black" translucent={false} /> */}
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerifyOtp"
          component={Otp_form}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DriverRegistration"
          component={DriverRegistration}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabsNavigator"
          component={TabsNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DriverTermsAndConditions"
          component={DriverTermsAndConditionsScreen}
          options={{}}
        />
        <Stack.Screen
          name="Profile"
          component={DriverDetailsScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="DriverEarningScreen"
          component={DriverEarningScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="EarningsScreen" component={EarningsScreen} />
        <Stack.Screen
          name="DriverDocuments"
          component={DriverDocuments}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Pancard"
          component={Pancard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Aadhar_document"
          component={Aadhar_document}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Rc_document"
          component={Rc_document}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Review_screen"
          component={Review_screen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Driver_documents"
          component={Driver_documents}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Insurance"
          component={Insurance}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GoToUserLocationScreen"
          component={GoToUserLocationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerifyOtpScreen"
          component={VerifyOtpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentScreen"
          component={PaymentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RideStartScreen"
          component={RideStartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RideEndScreen"
          component={RideEndScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </View>
  );
};

export default AppNavigator;
