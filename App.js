import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

import First from './screens/Auth/First';
import Login from './screens/Auth/Login/Login';

import SignStack from './Routes/SignStack';
import HomeStack from './Routes/HomeStack';
import AccountStack from './Routes/AccountStack';
import Calories from './screens/Logged/Target/Calories';
import Steps from './screens/Logged/Target/Steps';
import Water from './screens/Logged/Target/Water';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [logged, setLogged] = useState(false)

    // useEffect(() => {
    //     async function getUser(){
    //       const value = await AsyncStorage.getItem('user')
    //       if(value !== null) {
    //           console.log(value);
    //           setLogged(true)
    //       }else {
    //         setLogged(false)
    //       }
    //     }
    //     getUser();
    // }, []) 

    console.log(logged);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!logged ?
          <>
            <Stack.Screen name="first" component={First} />
            <Stack.Screen name="login" initialParams={{setLogged: setLogged}} component={Login} />
            
            <Stack.Screen name="start" initialParams={{setLogged: setLogged}} component={SignStack} />
          </>
        :
          <>
            <Stack.Screen name="home" component={HomeStack} />
            <Stack.Screen name="account" initialParams={{setLogged: setLogged}} component={AccountStack} />

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
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
