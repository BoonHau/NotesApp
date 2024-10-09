import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {Note} from '../redux/slices/notesSlice';

export type AppStackParamList = {
  HomeBottomTab: undefined;
  Settings: undefined;
  Note: {
    note: Note;
  };
};

export type HomeBottomTabParamList = {
  Home: undefined;
  Empty: undefined;
  Summary: undefined;
  Note: undefined;
};

export type AppNavigatorProps = StackNavigationProp<AppStackParamList>;
export type HomeBottoTabNavigatorProps =
  BottomTabNavigationProp<HomeBottomTabParamList>;
