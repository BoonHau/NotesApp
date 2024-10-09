import React from 'react';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  HomeBottomTabParamList,
  HomeBottoTabNavigatorProps,
} from './navigationTypes';
import AppFooter from '../components/AppFooter/AppFooter';
import {Image, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {EmptyScreen} from '../screens/EmptyScreen';
import colors from '../utils/colors';
import {HomeScreen, SummaryScreen} from '../screens';

const Tab = createBottomTabNavigator<HomeBottomTabParamList>();

export default function HomeBottomTabNavigator() {
  const navigation = useNavigation<HomeBottoTabNavigatorProps>();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
      tabBar={props => (
        <AppFooter containerStyle={styles.tabBarContainer}>
          <BottomTabBar {...props} />
        </AppFooter>
      )}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBarButton}>
              <Image
                source={
                  focused
                    ? require('../assets/icons/ic_home_active.png')
                    : require('../assets/icons/ic_home_inactive.png')
                }
                style={styles.icon}
              />
              <Text
                style={{
                  color: focused ? colors.icon.default : colors.icon.inactive,
                }}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Empty"
        component={EmptyScreen}
        options={{
          tabBarButton: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Note')}
              style={styles.tabBarButton}>
              <Image
                source={require('../assets/icons/ic_add.png')} // Your button icon
                style={styles.icon}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Summary"
        component={SummaryScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabBarButton}>
              <Image
                source={
                  focused
                    ? require('../assets/icons/ic_summary_active.png')
                    : require('../assets/icons/ic_summary_inactive.png')
                }
                style={styles.icon}
              />
              <Text
                style={{
                  color: focused ? colors.icon.default : colors.icon.inactive,
                }}>
                Summary
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarButton: {
    flex: 1,
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
  },
  icon: {
    width: 48,
    height: 48,
  },
  tabBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 120,
    justifyContent: 'center',
  },
  tabBar: {
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: 'transparent',
    top: 20,
  },
});
