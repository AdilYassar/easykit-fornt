// import necessary libraries
import 'react-native-gesture-handler'; // ensure this is at the top
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigation from '@navigation/navigation';

// create a component
const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation />
    </GestureHandlerRootView>
  );
};

// make this component available to the app
export default App;
