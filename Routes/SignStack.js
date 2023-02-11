import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Start from '../screens/Auth/Signup/Start';
import Signup from '../screens/Auth/Signup/Signup';
import Goal from '../screens/Auth/Signup/Goal';
import Sex from '../screens/Auth/Signup/Sex';
import Birth from '../screens/Auth/Signup/Birth';
import Height from '../screens/Auth/Signup/Height';
import Weight from '../screens/Auth/Signup/Weight';
import Finish from '../screens/Auth/Signup/Finish';
import GWeight from '../screens/Auth/Signup/GWeight';
import System from '../screens/Auth/Signup/System';

export default function SignStack({route}) {
    const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="start" component={Start} />
      <Stack.Screen name="signup" component={Signup} />
      
      <Stack.Screen name="goal" component={Goal} />
      <Stack.Screen name="sex" component={Sex} />
      <Stack.Screen name="system" component={System} />
      <Stack.Screen name="birth" component={Birth} />
      <Stack.Screen name="height" component={Height} />
      <Stack.Screen name="weight" component={Weight} />
      <Stack.Screen name="gweight" component={GWeight} />
      <Stack.Screen name="finish" initialParams={{setLogged: route.params.setLogged}} component={Finish} />
    </Stack.Navigator>
  )
}