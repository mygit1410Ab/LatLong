import React, {useEffect, useState, useCallback} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Tasklist from '../components/list/Tasklist';
import {images} from '../utils/images';
import {Height} from '../utils/globalwinSize';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = auth().currentUser?.uid;

  const updateLocationInFirestore = useCallback(
    async newLocation => {
      if (!userId) return;

      try {
        const userRef = firestore().collection('users').doc(userId);

        const doc = await userRef.get();
        if (doc.exists) {
          const prevLocation = doc.data()?.location;

          if (
            prevLocation?.latitude !== newLocation.latitude ||
            prevLocation?.longitude !== newLocation.longitude
          ) {
            await userRef.update({location: newLocation});
          }
        } else {
          await userRef.set({location: newLocation});
        }
      } catch (error) {
        console.error('Error updating location in Firestore:', error);
      }
    },
    [userId],
  );

  const getCurrentLocation = useCallback(
    (retries = 3) => {
      const options = {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 10000,
      };

      const onSuccess = position => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        console.log('newLocation=====>', newLocation);
        setLocation(newLocation);
        setLoading(false);
        updateLocationInFirestore(newLocation);
      };

      const onError = error => {
        console.log('error=====>', error.message);

        if (retries > 0) {
          console.log(`Retrying... ${retries} attempts left`);
          getCurrentLocation(retries - 1);
        } else {
          let errorMessage = 'Failed to get your location.';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage =
                'Location access was denied. Please enable location permissions in your settings.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage =
                'Location request timed out. Please check your internet connection or try again.';
              break;
            default:
              errorMessage = `An unknown error occurred: ${error.message}`;
          }

          Alert.alert('Error', errorMessage);
          setLoading(false);
        }
      };

      Geolocation.getCurrentPosition(onSuccess, onError, options);
    },
    [updateLocationInFirestore],
  );

  const requestLocationPermission = useCallback(async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        console.log('granted====>', granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          getCurrentLocation();
        } else {
          Alert.alert(
            'Permission Denied',
            'Location permission is required to update your location.',
          );
          setLoading(false);
        }
      } catch (err) {
        console.warn('Error requesting location permission:', err);
        setLoading(false);
      }
    } else {
      getCurrentLocation();
    }
  }, [getCurrentLocation]);

  useEffect(() => {
    requestLocationPermission();

    const watchId = Geolocation.watchPosition(
      position => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };

        setLocation(newLocation);
        updateLocationInFirestore(newLocation);
      },
      error => console.error('Error watching location:', error),
      {enableHighAccuracy: true, distanceFilter: 10},
    );

    return () => Geolocation.clearWatch(watchId);
  }, [requestLocationPermission, updateLocationInFirestore]);

  const addTaskHandler = () => {
    navigation.navigate('AddMarkerScreen', {myLocation: location});
  };

  return (
    <View style={styles.mainCard}>
      <Tasklist />
      <TouchableOpacity onPress={addTaskHandler} style={styles.addBtnCard}>
        <Image
          resizeMode="contain"
          source={images.homeScreen}
          style={styles.addStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainCard: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingTop: '10%',
    backgroundColor: '#FFF',
  },
  addBtnCard: {
    position: 'absolute',
    alignSelf: 'flex-end',
    backgroundColor: '#E50046',
    bottom: '3%',
    right: '3%',
    borderRadius: Height * 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  addStyle: {height: 50, width: 50},
});
