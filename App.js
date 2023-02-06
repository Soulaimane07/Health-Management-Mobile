import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignStack from './Routes/SignStack';
import First from './screens/Auth/First';
import Login from './screens/Auth/Login/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="first" component={First} />
        <Stack.Screen name="login" component={Login} />
        
        <Stack.Screen name="start" component={SignStack} />

        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
