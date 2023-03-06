import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';

import First from './screens/Auth/First';
import Login from './screens/Auth/Login/Login';

import SignStack from './Routes/SignStack';
import HomeStack from './Routes/HomeStack';
import AccountStack from './Routes/AccountStack';
import Calories from './screens/Logged/Target/Calories';
import StepsPage from './screens/Logged/Target/Steps';
import Water from './screens/Logged/Target/Water';
import Breakfast from './screens/Logged/meals/Breakfast';
import Lunch from './screens/Logged/meals/Lunch';
import Snack from './screens/Logged/meals/Snack';
import Dinner from './screens/Logged/meals/Dinner';
import Info from './screens/Logged/meals/Info';
import { ContextProvider } from './Components/Context';

const Stack = createNativeStackNavigator();

const profiles = [
  {
    image: require("./assets/profiles/1.png"),
    width: 90,
    height: 90,
  },
  {
    image: require("./assets/profiles/2.png"),
    width: 88,
    height: 60,
  },
  {
    image: require("./assets/profiles/3.png"),
    width: 76,
    height: 80,
  },
  {
    image: require("./assets/profiles/4.png"),
    width: 90,
    height: 80,
  },
  {
    image: require("./assets/profiles/5.png"),
    width: 90,
    height: 80,
  },
  {
    image: require("./assets/profiles/6.png"),
    width: 80,
    height: 70,
  },
]

export default function App() {
  const [logged, setLogged] = useState(false)

    async function getUser(){
      const value = await AsyncStorage.getItem('user')
      if(value !== null) {
          setLogged(true)
      }else {
        setLogged(false)
      }
    }

    useEffect(() => {
      getUser();
    }, []) 

    // console.log(user);

  return (
    <ContextProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!logged ?
          <>
            <Stack.Screen name="first" component={First} />
            <Stack.Screen name="login" initialParams={{setLogged: setLogged}} component={Login} />
            <Stack.Screen name="signStack" initialParams={{setLogged: setLogged}} component={SignStack} />
          </>
        :
          <>
            <Stack.Screen name="homeStack" initialParams={{profiles: profiles}} component={HomeStack} />
            <Stack.Screen name="accountStack" initialParams={{setLogged: setLogged, profiles: profiles}} component={AccountStack} />

            <>
              <Stack.Screen name="calories" 
                options={{
                  headerShown: true, 
                  headerStyle: {backgroundColor: '#e71d36'}, 
                  headerTintColor:"white", title:"Calories"
                }}  
                component={Calories} 
              />
              <Stack.Screen name="steps" 
                options={{
                  headerShown: true, 
                  headerStyle: {backgroundColor: '#fdb833'}, 
                  headerTintColor:"white", title:"Steps"
                }}  
                component={StepsPage} 
              />
              <Stack.Screen name="water" 
                options={{
                  headerShown: true, 
                  headerStyle: {backgroundColor: '#5390d9'}, 
                  headerTintColor:"white", title:"Water"
                }}  
                component={Water} 
              />
            </>

            <>
                <Stack.Screen name="breakfast" component={Breakfast} />
                <Stack.Screen name="lunch" component={Lunch} />
                <Stack.Screen name="snack" component={Snack} />
                <Stack.Screen name="dinner" component={Dinner} />
                <Stack.Screen name="info" component={Info} />
            </>
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
    </ContextProvider>
  );
}
