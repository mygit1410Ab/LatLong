import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import {CommonActions} from '@react-navigation/native';

export const handleSignUp = async ({
  email,
  password,
  setLoading,
  navigation,
}) => {
  try {
    console.log('Signing up with:', email, password);
    setLoading(true);

    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    const userId = userCredential.user.uid;

    if (userId) {
      console.log('User account created & signed in!', userId);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'BottomTabNavigation'}],
        }),
      );

      Snackbar.show({
        text: 'Account created successfully!',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  } catch (error) {
    console.log('Signup Failed:', error.message);

    if (error.code === 'auth/email-already-in-use') {
      console.log('Email already in use. Attempting login...');

      try {
        const loginCredential = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        console.log('Login successful!', loginCredential.user.uid);

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'BottomTabNavigation'}],
          }),
        );

        Snackbar.show({
          text: 'Logged in successfully!',
          duration: Snackbar.LENGTH_SHORT,
        });
      } catch (loginError) {
        console.error('Auto-login failed:', loginError.message);
        Snackbar.show({
          text: 'Login failed! Please check your credentials.',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    } else {
      let errorMessage = 'Signup Failed';
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'That email address is invalid!';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters!';
      }

      Snackbar.show({
        text: errorMessage,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  } finally {
    setLoading(false);
  }
};

export const handleLogout = async ({navigation, setLoading}) => {
  try {
    setLoading(true);
    await auth().signOut();

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Intro'}],
      }),
    );
    Snackbar.show({
      text: 'Logged out successfully!',
      duration: Snackbar.LENGTH_SHORT,
    });
  } catch (error) {
    console.error('Logout Failed:', error.message);
    Snackbar.show({
      text: 'Logout failed. Please try again.',
      duration: Snackbar.LENGTH_SHORT,
    });
  } finally {
    false;
  }
};
