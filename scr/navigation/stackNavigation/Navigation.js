import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../../screens/SplashScreen';
import LogIn from '../../screens/LogIn';
import Intro from '../../screens/Intro';
import BottomTabNavigation from '../bottomTabNavigation/BottomTabNavigation';
import AddMarkerScreen from '../../screens/AddMarkerScreen';
import auth from '@react-native-firebase/auth';
import MapScreen from '../../screens/MapScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [initialRouteName, setInitialRouteName] = React.useState(null);
  const [isSplashVisible, setIsSplashVisible] = React.useState(true);

  React.useEffect(() => {
    const checkUserAuth = () => {
      const userId = auth().currentUser?.uid;
      setInitialRouteName(userId ? 'BottomTabNavigation' : 'Intro');
    };

    checkUserAuth();

    const splashTimeout = setTimeout(() => {
      setIsSplashVisible(false);
    }, 3000);

    return () => clearTimeout(splashTimeout);
  }, []);

  if (isSplashVisible) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="AddMarkerScreen" component={AddMarkerScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen
          name="BottomTabNavigation"
          component={BottomTabNavigation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
