import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Account } from '../screens/Logged/Account/Account';
import Dietary from '../screens/Logged/Account/Dietary';
import { Personal } from '../screens/Logged/Account/Personal';
import Profile from '../screens/Logged/Account/Profile';

export default function AccountStack({route}) {
    const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="account" initialParams={{user: route.params.user}} component={Account} />
      <Stack.Screen 
        name="personal" 
        options={{
          headerShown: true, 
          headerStyle: {backgroundColor: '#3FC495'}, 
          headerTintColor:"white", title:"PERSONAL DETAILS"
        }} 
        component={Personal} 
      />
      <Stack.Screen 
        name="dietary" 
        component={Dietary} 
        options={{
          headerShown: true, 
          headerStyle: {backgroundColor: '#3FC495'}, 
          headerTintColor:"white", title:"DIETARY NEEDS & PREFERENCES"
        }} 
      />
      <Stack.Screen 
        name="profile" 
        initialParams={{user: route.params.user}}
        component={Profile} 
        options={{
          headerShown: true, 
          headerStyle: {backgroundColor: '#3FC495'}, 
          headerTintColor:"white", title:"ACCOUNT"
        }} 
      /> 
    </Stack.Navigator>
  )
}