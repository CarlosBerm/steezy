import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import TricksScreen from '../screens/TricksScreen';
import ProgressScreen from '../screens/ProgressScreen';
import SocialScreen from '../screens/SocialScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TrickDetailScreen from '../screens/TrickDetailScreen';
import FriendsScreen from '../screens/FriendsScreen';

import {RootStackParamList} from '../types';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName = '';

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Tricks':
              iconName = 'sports';
              break;
            case 'Progress':
              iconName = 'trending-up';
              break;
            case 'Social':
              iconName = 'people';
              break;
            case 'Profile':
              iconName = 'person';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Tricks" component={TricksScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen name="Social" component={SocialScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="MainTabs">
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TrickDetail"
        component={TrickDetailScreen}
        options={{title: 'Trick Details'}}
      />
      <Stack.Screen
        name="Friends"
        component={FriendsScreen}
        options={{title: 'Friends'}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
