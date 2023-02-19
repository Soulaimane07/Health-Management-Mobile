import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Account } from '../screens/Logged/Account/Account';
import Dietary from '../screens/Logged/Account/Dietary';
import { Personal } from '../screens/Logged/Account/Personal';
import Profile from '../screens/Logged/Account/Profile';

export default function AccountStack({route}) {
    const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName='account' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="account" initialParams={{setLogged: route.params.setLogged}} component={Account} />
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
        options={{
          headerShown: true, 
          headerStyle: {backgroundColor: '#3FC495'}, 
          headerTintColor:"white", title:"DIETARY NEEDS & PREFERENCES"
        }} 
        component={Dietary} 
      />
      <Stack.Screen 
        name="profile" 
        options={{
          headerShown: true, 
          headerStyle: {backgroundColor: '#3FC495'}, 
          headerTintColor:"white", title:"ACCOUNT"
        }} 
        component={Profile} 
      /> 
    </Stack.Navigator>
  )
}