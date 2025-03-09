import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import {useRoute} from '@react-navigation/native';

const MapScreen = () => {
  const route = useRoute();
  const item = route?.params?.item;
  return (
    <MapView
      style={styles.mapStyle}
      // showsUserLocation={true}
      // onPress={handleMapPress}
      initialRegion={{
        latitude: item?.latitude,
        longitude: item?.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}>
      {item && (
        <Marker
          description="Selected Location"
          coordinate={{
            latitude: item?.latitude,
            longitude: item?.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          draggable={false}
        />
      )}
    </MapView>
  );
};

export default MapScreen;

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
