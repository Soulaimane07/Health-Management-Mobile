import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Birth from '../screens/Auth/Signup/Birth';
import Finish from '../screens/Auth/Signup/Finish';
import Goal from '../screens/Auth/Signup/Goal';
import Height from '../screens/Auth/Signup/Height';
import Sex from '../screens/Auth/Signup/Sex';
import Signup from '../screens/Auth/Signup/Signup';

import Start from '../screens/Auth/Signup/Start';
import Weight from '../screens/Auth/Signup/Weight';


export default function SignStack() {
    const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="start" component={Start} />
      <Stack.Screen name="signup" component={Signup} />
      
      <Stack.Screen name="goal" component={Goal} />
      <Stack.Screen name="sex" component={Sex} />
      <Stack.Screen name="birth" component={Birth} />
      <Stack.Screen name="height" component={Height} />
      <Stack.Screen name="weight" component={Weight} />
      <Stack.Screen name="finish" component={Finish} />
    </Stack.Navigator>
  )
}