import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {images} from '../utils/images';
import {Height, Width} from '../utils/globalwinSize';
import textStyle from '../utils/fontStyles';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        style={styles.animation}
        source={images.splash.applogo}
      />
      <Text
        style={[
          textStyle.headerLarge,
          {color: '#E50046', fontSize: Height * 0.1},
        ]}>
        LatLong
      </Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  animation: {
    width: Width * 0.8,
    height: Width * 0.8,
  },
});
