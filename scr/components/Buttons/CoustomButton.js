import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import textStyle from '../../utils/fontStyles';

const CoustomButton = ({
  borderWidth,
  borderColor,
  borderRadius,
  width,
  height,
  title,
  backgroundColor,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.mainCard,
        {
          borderWidth,
          borderColor,
          borderRadius,
          width,
          height,
          backgroundColor,
        },
      ]}>
      <Text style={textStyle.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CoustomButton;

const styles = StyleSheet.create({
  mainCard: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    fontSize: 15,
    color: 'blue',
  },
});
