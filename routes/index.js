import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoaderPage from '../src/components/screens/LoaderPage';
import Home from '../src/components/screens/Home/Home';
import Register from '../src/components/screens/Home/RegisterScreen';
import Login from '../src/components/screens/Home/LoginScreen';
import Themes from '../src/components/screens/Themes/ThemeScreen';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoaderPage" component={LoaderPage} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Themes" component={Themes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;