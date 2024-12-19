import { navigate } from '@utils/Navigation';
import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import LottieView from 'lottie-react-native'; // Import LottieView for animations
import CustomButton  from '../components/ui/CustomButton'; // Import CustomButton component
import CustomText from '../components/ui/CustomText'; // Import CustomText component
const IntroductionScreen = () => {
  const handleNext = () => {
    navigate('FeaturesScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Animation for the Introduction Screen */}
      <LottieView
        source={require('../assets/animations/truck.json')} // Replace with your animation file
        autoPlay
        loop
        style={styles.animation}
      />
      <View style={styles.content}>
        <CustomText style={styles.title}>Welcome to EasyKit</CustomText>
        <CustomText style={styles.paragraph}>
          EasyKit is your ultimate solution for managing your grocery needs. Explore a seamless way to shop and manage your essentials.
        </CustomText>
        <CustomButton
          title="Next"
          onPress={handleNext}
          disabled={false}
          loading={false}
        />
      </View>
    </SafeAreaView>
  );
};

const FeaturesScreen = () => {
  const handleNext = () => {
    navigate('GetStartedScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Animation for the Features Screen */}
      <LottieView
        source={require('../assets/animations/delivery_man.json')} // Replace with your animation file
        autoPlay
        loop
        style={styles.animation}
      />
      <View style={styles.content}>
        <CustomText style={styles.title}>Features of EasyKit</CustomText>
        <View style={styles.featureList}>
          <CustomText style={styles.listItem}>- Wide range of products</CustomText>
          <CustomText style={styles.listItem}>- Easy-to-use interface</CustomText>
          <CustomText style={styles.listItem}>- Real-time order tracking</CustomText>
          <CustomText style={styles.listItem}>- Made By Adil, Hamayal, Hamad</CustomText>
        </View>
        <CustomButton
          title="Next"
          onPress={handleNext}
          disabled={false}
          loading={false}
        />
      </View>
    </SafeAreaView>
  );
};

const GetStartedScreen = () => {
  const handleGetStarted = () => {
    navigate('SplashScreen'); // Navigate to the main app screen
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Animation for the Get Started Screen */}
      <LottieView
        source={require('../assets/animations/confirm.json')} // Replace with your animation file
        autoPlay
        loop
        style={styles.animation}
      />
      <View style={styles.content}>
        <CustomText style={styles.title}>Get Started with EasyKit</CustomText>
        <CustomText style={styles.paragraph}>
          Join thousands of users who have simplified their grocery shopping experience. Tap the button below to begin your journey!
        </CustomText>
        <CustomButton
          title="Get Started"
          onPress={handleGetStarted}
          disabled={false}
          loading={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c1ff72',
    padding: 20,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    marginTop: -20,
  },
  animation: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 18,
    lineHeight: 24,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  featureList: {
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  listItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
});

export { IntroductionScreen, FeaturesScreen, GetStartedScreen };
