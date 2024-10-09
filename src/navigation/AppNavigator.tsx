import React from 'react';
import HomeBottomTabNavigator from './HomeBottomTabNavigator';
import {createStackNavigator} from '@react-navigation/stack';
import {AppStackParamList} from './navigationTypes';
import {NoteScreen, SettingsScreen} from '../screens';

const Stack = createStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeBottomTab"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeBottomTab" component={HomeBottomTabNavigator} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Note" component={NoteScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
