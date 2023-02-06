import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import First from './screens/Auth/First';
import Login from './screens/Auth/Login/Login';

import SignStack from './Routes/SignStack';
import HomeStack from './Routes/HomeStack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="first" component={First} />
        <Stack.Screen name="login" component={Login} />
        
        <Stack.Screen name="start" component={SignStack} />

        <Stack.Screen name="home" component={HomeStack} />
        <Stack.Screen name="account" component={AccountStack} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
