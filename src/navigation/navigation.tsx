//import libraries
import CustomerLogin from '@features/auth/CustomerLogin';
import ProductDashboard from '@features/auth/dashboard/ProductDashboard';
import DeliveryDashboard from '@features/auth/delivery/DeliveryDashboard';
import DeliveryLogin from '@features/auth/DeliveryLogin';
import Detail from '@features/category/Detail';

import SplashScreen from '@features/auth/SplashScreen';
import ProductCategories from '@features/category/ProductCategories';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from '@utils/Navigation';
import { FC } from 'react';
import React from 'react';
import ProductOrder from '@features/order/ProductOrder';
import OrderSuccess from '@features/order/OrderSuccess';
import Profile from '@features/profile/Profile';
import DeliveryMap from '@features/auth/delivery/DeliveryMap';
import LiveTracking from '@features/map/Livetracking';
import News from '@features/News';
import NewsDetail from '@features/NewsDetail';
import { FeaturesScreen, GetStartedScreen, IntroductionScreen } from '@features/Introduction';
import Search from '@features/search/Search';




const Stack = createNativeStackNavigator();

// create a component
const Navigation: FC = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                initialRouteName="IntroductionScreen" // Correct placement
                screenOptions={{
                    headerShown: false, // Correct placement and syntax
                }}
            >
                <Stack.Screen name="GetStartedScreen" component={GetStartedScreen} />
                <Stack.Screen name="FeaturesScreen" component={FeaturesScreen} />
                <Stack.Screen name="IntroductionScreen" component={IntroductionScreen} />
                <Stack.Screen name="Search" component={Search} />
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="ProductDashboard" component={ProductDashboard} />
                <Stack.Screen name="DeliveryMap" component={DeliveryMap} />
                <Stack.Screen name="Detail" component={Detail} />
                <Stack.Screen name="ProductOrder" component={ProductOrder} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
                <Stack.Screen name="LiveTracking" component={LiveTracking} />
                <Stack.Screen name=" ProductCategories" component={ ProductCategories} />
                <Stack.Screen name="DeliveryDashboard" component={DeliveryDashboard} />
                <Stack.Screen 
                    name="News" 
                    component={News} 
                    options={{ title: 'Food & Grocery News' }} 
                />
                <Stack.Screen 
                    name="NewsDetail" 
                    component={NewsDetail} 
                 
                />

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
