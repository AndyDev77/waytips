import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LoaderPage from '../src/components/screens/LoaderPage';
import Home from '../src/components/screens/Home/Home';
import Register from '../src/components/screens/Home/RegisterScreen';
import Login from '../src/components/screens/Home/LoginScreen';
import Themes from '../src/components/screens/Themes/ThemeScreen';
import Profile from '../src/components/screens/ProfileUser/ProfileUser';
import UpdatedName from '../src/components/screens/Update/UpdatedName';
import UpdatedEmail from '../src/components/screens/Update/UpdatedEmail';
import UpdatedThemes from '../src/components/screens/Update/UpdatedThemes';
import Present from '../src/components/screens/Present/Present';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoaderPage"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoaderPage" component={LoaderPage} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Themes" component={Themes} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="UpdatedName" component={UpdatedName} />
        <Stack.Screen name="UpdatedEmail" component={UpdatedEmail} />
        <Stack.Screen name="UpdatedThemes" component={UpdatedThemes} />
        <Stack.Screen name="Present" component={Present} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
