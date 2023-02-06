import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import { Account } from '../Screens/Logged/Account/Account';
// import { Personal } from '../Screens/Logged/Account/Personal';
// import Dietary from '../Screens/Logged/Account/Dietary';
// import Profile from '../Screens/Logged/Account/Profile';

export default function AccountStack() {
    const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="account" component={Account} /> */}
        {/* <Stack.Screen 
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
          component={Profile} 
          options={{
            headerShown: true, 
            headerStyle: {backgroundColor: '#3FC495'}, 
            headerTintColor:"white", title:"ACCOUNT"
          }} 
        /> */}
    </Stack.Navigator>
  )
}