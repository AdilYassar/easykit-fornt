//import libraries
import CustomerLogin from '@features/auth/CustomerLogin';
import ProductDashboard from '@features/auth/dashboard/ProductDashboard';
import DeliveryDashboard from '@features/auth/delivery/DeliveryDashboard';
import DeliveryLogin from '@features/auth/DeliveryLogin';
import SplashScreen from '@features/auth/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from '@utils/Navigation';
import { FC } from 'react';
import React from 'react';


const Stack = createNativeStackNavigator();

// create a component
const Navigation: FC = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                initialRouteName="SplashScreen" // Correct placement
                screenOptions={{
                    headerShown: false, // Correct placement and syntax
                }}
            >
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="ProductDashboard" component={ProductDashboard} />
                <Stack.Screen name="DeliveryDashboard" component={DeliveryDashboard} />
                <Stack.Screen
                options={{
                    animation:'fade',
                }}
                name="CustomerLogin" component={CustomerLogin} />
                <Stack.Screen
                options={{
                    animation:'fade',
                }}
                 name="DeliveryLogin" component={DeliveryLogin} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

// define your styles

//make this component available to the app
export default Navigation;
