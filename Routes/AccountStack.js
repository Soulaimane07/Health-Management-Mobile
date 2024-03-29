import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Account } from '../screens/Logged/Account/Account';
import { Personal } from '../screens/Logged/Account/Personal';
import Profile from '../screens/Logged/Account/Profile';
import { PracticeContext } from '../Components/Context';
import { useContext } from 'react';

export default function AccountStack({route}) {
    const Stack = createNativeStackNavigator();
    const {languageObj} = useContext(PracticeContext)

  return (
    <Stack.Navigator initialRouteName='account' screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="account" 
        initialParams={{setLogged: route.params.setLogged, profiles: route.params.profiles}} 
        component={Account} 
      />
      <Stack.Screen 
        name="profile" 
        options={{
          headerShown: true, 
          headerStyle: {backgroundColor: '#3FC495'}, 
          headerTintColor:"white", title:"ACCOUNT"
        }} 
        initialParams={{profiles: route.params.profiles, setLogged: route.params.setLogged}} 
        component={Profile} 
      /> 
      <Stack.Screen 
        name="personal" 
        options={{
          headerShown: true, 
          headerStyle: {backgroundColor: '#3FC495'}, 
          headerTintColor:"white", title: languageObj.account.box2.personaldetails
        }} 
        component={Personal} 
      />
    </Stack.Navigator>
  )
}