import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Micon from 'react-native-vector-icons/MaterialCommunityIcons'
import Aicon from 'react-native-vector-icons/AntDesign'
import TodoPage from '../screens/Logged/Account/TodoPage';
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
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Micon name="home" color={color} size={size} />
            ),
          }}
          component={Home} 
      />
      <Tab.Screen 
        name="todo" 
        options={{
          headerShown: false,
          tabBarLabel: 'Todo',
          tabBarIcon: ({color, size}) => (
            <Aicon name="edit" color={color} size={size} />
            ),
          }}
          component={TodoPage} 
      />
    </Tab.Navigator>  
  )
}