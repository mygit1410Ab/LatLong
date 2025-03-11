import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import textStyle from '../../utils/fontStyles';
import {Height, Width} from '../../utils/globalwinSize';
import CustomSafeView from '../coustomView/CoustomSafeView';
import {images} from '../../utils/images';
import {handleLogout} from '../../services/servicesCall/servicesCall';
import {useNavigation} from '@react-navigation/native';
import Loader from '../loader/Loader';

const CustomHeader = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const logOutHandler = async () => {
    await handleLogout({navigation, setLoading});
  };

  return (
    <CustomSafeView>
      <View style={styles.headerContainer}>
        <Image
          source={images.header.logo}
          resizeMode="contain"
          style={styles.logoStyle}
        />
        <Text
          style={[textStyle.headerLarge, {marginBottom: 0, color: '#E50046'}]}>
          LatLong
        </Text>
        <TouchableOpacity onPress={logOutHandler} style={styles.logoutCard}>
          <Image
            source={images.header.logOut}
            resizeMode="contain"
            style={styles.logoutBtn}
          />
        </TouchableOpacity>
      </View>
      {loading && <Loader visible={loading} />}
    </CustomSafeView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    height: Height * 0.08,
  },
  logoStyle: {
    height: Height * 0.15,
    width: Width * 0.15,
  },
  logoutBtn: {
    height: Height * 0.07,
    width: Width * 0.07,
    tintColor: 'gray',
  },
  logoutCard: {
    padding: 10,
    right: '5%',
    position: 'absolute',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
