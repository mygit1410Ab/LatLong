import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import textStyle from '../../utils/fontStyles';
import {Height} from '../../utils/globalwinSize';
import {images} from '../../utils/images';

const CoustomPasswordBox = ({
  width,
  height,
  placeHolder,
  lable,
  onChangeText,
  onErro,
  errorMess,
  onFocus,
}) => {
  const [hide, setHide] = useState(true);

  const hideHandler = () => {
    console.log('pressed====>');
    setHide(prev => !prev);
    false;
  };

  return (
    <View style={[styles.Card]}>
      <Text style={textStyle.headerSmall}>{lable}</Text>
      <View
        style={[styles.inputCard, {borderColor: onErro ? 'red' : '#979797'}]}>
        <TextInput
          style={[styles.inputStyle, textStyle.subHeaderSmall]}
          placeholder={placeHolder}
          placeholderTextColor={'#979797'}
          onChangeText={onChangeText}
          secureTextEntry={hide}
          onFocus={onFocus}
        />
        <TouchableOpacity style={styles.eyeCard} onPress={hideHandler}>
          <Image
            source={hide ? images.passWordCard.hide : images.passWordCard.show}
            style={styles.eyeStyle}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      {errorMess && <Text style={textStyle.errorText}>{errorMess}</Text>}
    </View>
  );
};

export default CoustomPasswordBox;

const styles = StyleSheet.create({
  inputCard: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 2,
    height: Height * 0.065,
    backgroundColor: '#FFF',
    borderColor: '#979797',
    borderRadius: 5,
  },
  inputStyle: {
    paddingHorizontal: 5,
    width: '80%',
    height: '100%',
  },
  eyeStyle: {
    height: 25,
    width: 25,
    tintColor: 'gray',
  },
  eyeCard: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
