import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const SmallBtn = ({onPress, source, tintColor}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={source}
        resizeMode="contain"
        style={[styles.btn, {tintColor: tintColor}]}
      />
    </TouchableOpacity>
  );
};

export default SmallBtn;

const styles = StyleSheet.create({
  btn: {
    height: 35,
    width: 35,
  },
  card: {
    borderRadius: 100,
  },
});
