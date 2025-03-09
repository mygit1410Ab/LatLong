import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {Height} from '../utils/globalwinSize';
import {images} from '../utils/images';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';

const AddMarkerScreen = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [nickname, setNickname] = useState('');
  const route = useRoute();
  const myLocation = route?.params?.myLocation;

  useEffect(() => {
    console.log('showModal state changed:', showModal);
  }, [showModal]);

  const saveLocationHandler = async () => {
    if (!markerPosition || !nickname.trim()) {
      Alert.alert('Error', 'Please enter a nickname for the location.');
      return;
    }

    const userId = auth().currentUser?.uid;
    if (!userId) {
      Alert.alert('Error', 'User not authenticated.');
      return;
    }

    try {
      await firestore()
        .collection('users')
        .doc(userId)
        .collection('markers')
        .add({
          latitude: markerPosition.latitude,
          longitude: markerPosition.longitude,
          nickname: nickname.trim(),
          timestamp: firestore.FieldValue.serverTimestamp(),
        });

      Snackbar.show({
        text: 'Location saved successfully!',
        duration: Snackbar.LENGTH_SHORT,
      });

      setShowModal(false);
      setNickname('');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'BottomTabNavigation'}],
        }),
      );
    } catch (error) {
      console.error('Error saving location:', error);
      Snackbar.show({
        text: 'Failed to save location. Please try again.',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  const handleMapPress = e => {
    const coordinate = e.nativeEvent.coordinate;
    console.log('coordinate====>', coordinate);
    if (coordinate) {
      setMarkerPosition(coordinate);
    }
  };

  const modalHandler = () => {
    // console.log('Modal handler');
    setShowModal(true);
  };

  return (
    <View style={styles.mainCard}>
      <MapView
        style={styles.mapStyle}
        showsUserLocation={true}
        onPress={handleMapPress}
        initialRegion={myLocation}>
        {myLocation && (
          <Marker
            description="My Location"
            coordinate={myLocation}
            draggable={false}>
            <Image
              source={images.addLocationScreen.mylocation}
              style={styles.markerImage}
            />
          </Marker>
        )}
        {markerPosition && (
          <Marker
            description="Selected Location"
            coordinate={markerPosition}
            draggable={false}
          />
        )}
      </MapView>

      {markerPosition && (
        <TouchableOpacity onPress={modalHandler} style={styles.addBtnCard}>
          <Image
            resizeMode="contain"
            source={images.addLocationScreen.tick}
            style={styles.addStyle}
          />
        </TouchableOpacity>
      )}

      <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Save Location</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter nickname for this location"
              value={nickname}
              onChangeText={setNickname}
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={
                markerPosition
                  ? `Lat: ${markerPosition.latitude.toFixed(
                      4,
                    )}, Lon: ${markerPosition.longitude.toFixed(4)}`
                  : ''
              }
              editable={false}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={saveLocationHandler}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowModal(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddMarkerScreen;

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
  addStyle: {height: 50, width: 50, tintColor: '#FFF'},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#E50046',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#CCC',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  markerImage: {
    width: 35,
    height: 35,
    tintColor: 'red',
  },
});
