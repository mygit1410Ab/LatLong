import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const MarkersScreen = () => {
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const userId = auth().currentUser?.uid;

  // Fetch user's current location
  useEffect(() => {
    const fetchUserLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        error => {
          console.error('Error fetching user location:', error);
          Alert.alert(
            'Error',
            'Failed to fetch your location. Please enable location services.',
          );
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };

    fetchUserLocation();
  }, []);

  // Fetch markers from Firestore
  useEffect(() => {
    const fetchMarkers = async () => {
      if (!userId) return;

      try {
        const markersSnapshot = await firestore()
          .collection('users')
          .doc(userId)
          .collection('markers')
          .get();

        const markersData = markersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMarkers(markersData);
      } catch (error) {
        console.error('Error fetching markers:', error);
        Alert.alert('Error', 'Failed to fetch markers. Please try again.');
      }
    };

    fetchMarkers();
  }, [userId]);

  // Calculate the initial region
  const initialRegion =
    markers.length > 0
      ? {
          latitude: markers[0]?.latitude,
          longitude: markers[0]?.longitude,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }
      : userLocation
      ? {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }
      : {
          latitude: 37.78825, // Default latitude
          longitude: -122.4324, // Default longitude
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        };

  return (
    <View style={styles.mainCard}>
      <MapView style={styles.mapStyle} initialRegion={initialRegion}>
        {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.nickname}
            description={`Lat: ${marker.latitude.toFixed(
              4,
            )}, Lon: ${marker.longitude.toFixed(4)}`}
          />
        ))}
        {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Your Location"
            pinColor="blue" // Customize the marker color for the user's location
          />
        )}
      </MapView>
    </View>
  );
};

export default MarkersScreen;

const styles = StyleSheet.create({
  mainCard: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
  },
});
