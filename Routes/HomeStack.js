import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Micon from 'react-native-vector-icons/MaterialCommunityIcons'
import Home from '../screens/Logged/Home';

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
        component={Home} 
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Micon name="home" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>  
  )
}