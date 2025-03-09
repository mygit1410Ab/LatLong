import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CoustomSafeView from '../components/coustomView/CoustomSafeView';
import {strings} from '../utils/string';
import textStyle from '../utils/fontStyles';
import {Width} from '../utils/globalwinSize';
import {useNavigation} from '@react-navigation/native';
import CoustomButton from '../components/Buttons/CoustomButton';
import BackArrowBtn from '../components/Buttons/BackArrowBtn';
import CoustomTextInput from '../components/InputBox/CoustomTextInput';
import CoustomPasswordBox from '../components/InputBox/CoustomPasswordBox';
import EmailValidator from 'email-validator';
import {handleSignUp} from '../services/servicesCall/servicesCall';
import Loader from '../components/loader/Loader';

const LogIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [emailErrMess, setEmailErrMess] = useState('');
  const [passwordErr, setPasswordErr] = useState(false);
  const [passwordErrMess, setpasswordErrMess] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const backBtnHandler = () => {
    navigation.goBack();
  };

  const logInValidation = () => {
    if (!email) {
      setEmailErr(true);
      setEmailErrMess('Email is required');
      return 'Email is required';
    }

    if (!EmailValidator.validate(email)) {
      setEmailErr(true);
      setEmailErrMess('Invalid email format');
      return 'Invalid email format';
    }

    if (!password) {
      setPasswordErr(true);
      setpasswordErrMess('Password is required');
      return 'Password is required';
    }
    if (password.length < 6) {
      setPasswordErr(true);
      setpasswordErrMess('Password must be at least 6 characters long');
      return 'Password must be at least 6 characters long ';
    }
    logInHandler();
    return null;
  };

  const logInHandler = async () => {
    console.log('logInHandler===>  runing');
    await handleSignUp({
      email,
      password,
      setLoading,
      navigation,
    });
  };

  const emailHandler = text => {
    setEmail(text.trim().toLowerCase());
  };
  const passwordHandler = text => {
    setPassword(text);
  };

  const emailFocusHandler = () => {
    setEmailErr(false);
    setEmailErrMess('');
  };
  const passwordFocusHandler = () => {
    setPasswordErr(false);
    setpasswordErrMess('');
  };

  return (
    <CoustomSafeView>
      <View style={styles.mainCard}>
        <BackArrowBtn onPress={backBtnHandler} />
        <Text
          style={[
            textStyle.headerLarge,
            {
              fontSize: Width * 0.1,
              marginTop: Width * 0.05,
              left: Width * 0.01,
            },
          ]}>
          {strings.logIn.header}
        </Text>
        <View style={styles.inputMainCard}>
          <CoustomTextInput
            onChangeText={emailHandler}
            placeHolder={'Enter Your Email'}
            lable={'Email:'}
            onErro={emailErr}
            errorMess={emailErrMess}
            onFocus={emailFocusHandler}
          />
          <CoustomPasswordBox
            onChangeText={passwordHandler}
            placeHolder={'Enter Your Password'}
            lable={'Password:'}
            onErro={passwordErr}
            errorMess={passwordErrMess}
            onFocus={passwordFocusHandler}
          />
        </View>
        <View style={styles.btnCard}>
          <CoustomButton
            height={40}
            width={'90%'}
            borderRadius={8}
            title={'LOGIN'}
            onPress={logInValidation}
            backgroundColor={'#E50046'}
          />
        </View>
        {loading && <Loader visible={loading} />}
      </View>
    </CoustomSafeView>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  mainCard: {
    flex: 1,
    paddingHorizontal: '3%',
    paddingVertical: '4%',
  },
  inputMainCard: {
    // borderWidth: 1,
    // borderColor: '#FFF',
    gap: 10,
  },
  btnCard: {
    // borderWidth: 1,
    // borderColor: '#FFF',
    marginTop: '30%',
    // padding: '3%',
    alignItems: 'center',
    gap: 15,
  },
});
