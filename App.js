import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import First from './screens/Auth/First';
import Login from './screens/Auth/Login/Login';

import SignStack from './Routes/SignStack';
import HomeStack from './Routes/HomeStack';
import AccountStack from './Routes/AccountStack';
import Calories from './screens/Logged/Target/Calories';
import Steps from './screens/Logged/Target/Steps';
import Water from './screens/Logged/Target/Water';

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

        <Stack.Screen name="calories" 
          options={{
            headerShown: true, 
            headerStyle: {backgroundColor: '#3FC495'}, 
            headerTintColor:"white", title:"Calories"
          }}  
          component={Calories} 
        />
        <Stack.Screen name="steps" 
          options={{
            headerShown: true, 
            headerStyle: {backgroundColor: '#3FC495'}, 
            headerTintColor:"white", title:"Steps"
          }}  
          component={Steps} 
        />
        <Stack.Screen name="water" 
          options={{
            headerShown: true, 
            headerStyle: {backgroundColor: '#3FC495'}, 
            headerTintColor:"white", title:"Water"
          }}  
          component={Water} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
