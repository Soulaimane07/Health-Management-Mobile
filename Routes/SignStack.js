import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Start from '../screens/Auth/Signup/Start';
import Signup from '../screens/Auth/Signup/Signup';
import Goal from '../screens/Auth/Signup/Goal';
import Sex from '../screens/Auth/Signup/Sex';
import Birth from '../screens/Auth/Signup/Birth';
import Height from '../screens/Auth/Signup/Height';
import Weight from '../screens/Auth/Signup/Weight';
import Finish from '../screens/Auth/Signup/Finish';

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