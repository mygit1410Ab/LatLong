import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import textStyle from '../../utils/fontStyles';

const CoustomTextInput = ({
  width,
  height,
  placeHolder,
  lable,
  onChangeText,
  onErro,
  errorMess,
  onFocus,
}) => {
  // console.log('onErro====>', onErro);

  return (
    <View style={[styles.Card]}>
      <Text style={textStyle.headerSmall}>{lable}</Text>
      <TextInput
        style={[
          styles.inputStyle,
          {
            width: width,
            height: height,
            borderColor: onErro ? 'red' : '#979797',
          },
          textStyle.subHeaderSmall,
        ]}
        placeholder={placeHolder}
        placeholderTextColor={'#979797'}
        onChangeText={onChangeText}
        onFocus={onFocus}
      />
      {errorMess && <Text style={textStyle.errorText}>{errorMess}</Text>}
    </View>
  );
};

export default CoustomTextInput;

const styles = StyleSheet.create({
  Card: {
    // borderWidth: 1,
    // borderColor: '#FFF',
  },
  inputStyle: {
    borderWidth: 2,
    borderColor: '#E50046',
    backgroundColor: '#FFF',
    borderRadius: 5,
    color: '#FFF',
    paddingHorizontal: 5,
  },
});
