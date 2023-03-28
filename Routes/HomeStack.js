import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Micon from 'react-native-vector-icons/MaterialCommunityIcons'
import IoIcon from 'react-native-vector-icons/Ionicons'

import Home from '../screens/Logged/Home';
import Diet from '../screens/Logged/Diet/Diet';

export default function HomeStack({route}) {
    const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: '#3FC495',
        // tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen 
        name="home" 
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Micon name="home" color={color} size={size} />
            ),
          }}
          initialParams={{profiles: route.params.profiles, user: route.params.user}}
        component={Home} 
      />
      <Tab.Screen 
        name="Diets" 
        options={{
          // headerShown: false,
          tabBarLabel: 'Diets',
          tabBarIcon: ({color, size}) => (
            <IoIcon name="fast-food" color={color} size={size} />
          ),
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: '#3FC495'
          },
        }}
        component={Diet} 
      />
    </Tab.Navigator>  
  )
}