import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPassword from '../screens/ForgotPasswordScreen';
import Verification from '../screens/VerificationScreen';
import ResetPassword from '../screens/ResetPasswordScreen';
import TermsAndConditions from '../screens/TermsAndConditionsScreen';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
