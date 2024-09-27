//import libraries
import SplashScreen from '@features/auth/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FC } from 'react';
import React from 'react';


const Stack = createNativeStackNavigator();

// create a component
const Navigation: FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="SplashScreen" // Correct placement
                screenOptions={{
                    headerShown: false, // Correct placement and syntax
                }}
            >
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

// define your styles

//make this component available to the app
export default Navigation;
