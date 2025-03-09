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

    // Cleanup subscription on unmount
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

// A simple component to show when there's no internet
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

// import {
//   Alert,
//   PermissionsAndroid,
//   Platform,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import MapView, {Marker, Polyline} from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';

// const App = () => {
//   const [location, setLocation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [source, setSource] = useState(null);
//   const [destination, setDestination] = useState(null);
//   const [isChoosingSource, setIsChoosingSource] = useState(false);
//   const [isChoosingDestination, setIsChoosingDestination] = useState(false);
//   const defaultLocation = {
//     latitude: 37.78825,
//     longitude: -122.4324,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   };

//   const getCurrentLocation = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         setLocation({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         });
//         setLoading(false);
//       },
//       error => {
//         Alert.alert(
//           'Error',
//           `Failed to get your location: ${error.message}` +
//             ' Make sure your location is enabled.',
//         );
//         setLocation(defaultLocation);
//         setLoading(false);
//       },
//     );
//   };
//   useEffect(() => {
//     const requestLocationPermission = async () => {
//       if (Platform.OS === 'android') {
//         try {
//           const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           );
//           if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             getCurrentLocation();
//           } else {
//             Alert.alert(
//               'Permission Denied',
//               'Location permission is required to show your current location on the map.',
//             );
//             setLocation(defaultLocation);
//             setLoading(false);
//           }
//         } catch (err) {
//           console.warn(err);
//           setLocation(defaultLocation);
//           setLoading(false);
//         }
//       } else {
//         getCurrentLocation();
//       }
//     };

//     requestLocationPermission();
//   }, [getCurrentLocation, defaultLocation]);

//   return (
//     <View style={styles.mainCard}>
//       <MapView
//         style={styles.mapStyle}
//         initialRegion={{
//           latitude: 37.78825,
//           longitude: -122.4324,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       />
//     </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   mainCard: {
//     ...StyleSheet.absoluteFillObject,
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   mapStyle: {
//     ...StyleSheet.absoluteFillObject,
//   },
// });
