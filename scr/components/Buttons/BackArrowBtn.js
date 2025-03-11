import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../../utils/color';
import {Width} from '../../utils/globalwinSize';
import {Image} from 'react-native';
import {images} from '../../utils/images';
const BackArrowBtn = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.backArrowStyle}>
      <Image
        source={images.backButton}
        resizeMode="contain"
        style={styles.btnStyle}
      />
    </TouchableOpacity>
  );
};

export default BackArrowBtn;

const styles = StyleSheet.create({
  backArrowStyle: {
    width: Width * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStyle: {
    height: 40,
    width: 40,
    tintColor: '#000',
  },
});
