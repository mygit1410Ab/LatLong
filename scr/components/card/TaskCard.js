import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import textStyle from '../../utils/fontStyles';
import SmallBtn from '../Buttons/SmallBtn';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {images} from '../../utils/images';

const TeskCard = ({item, onRefresh}) => {
  const navigation = useNavigation();

  const deleteAlert = () => {
    Alert.alert(
      'DELETING MARKER',
      'Are you sure you want to delete this marker?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => deleteHandler(item.id),
        },
      ],
    );
  };

  const deleteHandler = async markerId => {
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
        .doc(markerId)
        .delete();

      Alert.alert('Success', 'Marker deleted successfully!');
      onRefresh();
    } catch (error) {
      console.error('Error deleting marker:', error);
      Alert.alert('Error', 'Failed to delete marker. Please try again.');
    }
  };

  const goToLocation = () => {
    navigation.navigate('MapScreen', {item});
  };

  const headerColor = '#000';
  console.log('item====>', item);
  return (
    <View style={styles.cardView}>
      <View style={styles.headerCard}>
        <Text
          style={[
            textStyle.headerSmall,
            {
              color: headerColor,
            },
          ]}>
          {item?.nickname.length > 20
            ? item?.nickname.slice(0, 19) + '...'
            : item?.nickname}
        </Text>
        <View style={styles.smallBtnCard}>
          <SmallBtn
            onPress={deleteAlert}
            tintColor={'#E50046'}
            source={images.taskCard.delete}
          />
          <SmallBtn
            onPress={goToLocation}
            tintColor={'#E50046'}
            source={images.taskCard.map}
          />
        </View>
      </View>
      <Text style={[textStyle.paragraph, {color: headerColor}]}>
        Latitude:
        {item?.latitude.length > 30
          ? item?.latitude.slice(0, 29) + '...'
          : item?.latitude}
      </Text>
      <Text style={[textStyle.paragraph, {color: headerColor}]}>
        Longitude:
        {item?.longitude.length > 30
          ? item?.longitude.slice(0, 29) + '...'
          : item?.longitude}
      </Text>
    </View>
  );
};

export default TeskCard;

const styles = StyleSheet.create({
  cardView: {
    padding: 5,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#E50046',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallBtnCard: {
    flexDirection: 'row',
    gap: 15,
  },
});
