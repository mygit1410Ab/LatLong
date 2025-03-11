import React, {useEffect, useState} from 'react';
import {StatusBar, Alert, View, Text} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Navigation from './scr/navigation/stackNavigation/Navigation';
import textStyle from './scr/utils/fontStyles';

const App = () => {
  const [isConnected, setIsConnected] = useState(true);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const connected = state.isConnected && state.isInternetReachable;
      setIsConnected(connected);

      if (!connected) {
        Alert.alert(
          'No Internet Connection',
          'Please check your internet connection and try again.',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'light-content'}
      />
      {isConnected ? <Navigation /> : <NoInternetScreen />}
    </>
  );
};

const NoInternetScreen = () => {
  return (
    <View style={styles.noInternetContainer}>
      <Text style={textStyle.headerMedium}>No Internet Connection</Text>
      <Text style={textStyle.paragraph}>
        Please check your internet connection and try again.
      </Text>
    </View>
  );
};

const styles = {
  noInternetContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
};

export default App;
